import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import {
  createCanonicalProfile,
  createCanonicalUniversity,
  evaluateUniversity,
} from "@/lib/matching-engine";

import {
  normalizeHipoUniversity,
  searchHipoUniversities,
} from "./external/hipo";

export async function getUniversities(page: number = 1, limit: number = 50) {
  try {
    const session = await getSession();
    let userProfile: any = null;

    if (session) {
      userProfile = await prisma.profile.findUnique({
        where: { userId: session.userId },
      });
    }

    // --- Hippo Labs API Integration ---
    // Fetch generic or tailored list based on profile
    let hipoResults: any[] = [];

    let targetCountry = "United States"; // Default
    if (userProfile) {
      try {
        const prefs = JSON.parse(userProfile.preferredCountries || "[]");
        if (Array.isArray(prefs) && prefs.length > 0) {
          targetCountry = prefs[0];
        }
      } catch (e) {}
    }

    try {
      console.log(`Fetching universities for country: ${targetCountry}`);
      hipoResults = await searchHipoUniversities("", targetCountry);
      // Hipo might return too many, mimic pagination manually if API doesn't support it (it doesn't)
      // Just slice it for now to avoid processing thousands
      // Randomize slightly? No, keep it deterministic.
      // Actually slice *after* scoring is better? No, expensive.
      // Slice top 100 raw results.
      if (hipoResults.length > 200) hipoResults = hipoResults.slice(0, 200);
    } catch (e) {
      console.error("Hipo fetch failed", e);
    }

    // Convert Hipo to Internal Structure
    const universities = hipoResults.map(normalizeHipoUniversity);
    // ----------------------------------

    // Score and Sort
    const scoredUniversities = universities.map((uni: any) => {
      let score = 0;
      let reasons: string[] = [];
      let matchCategory = "TARGET";
      let matchChance = "Medium";

      if (userProfile && session) {
        // ... (existing scoring logic) ...
        // Need to replicate scoring logic here or refactor.
        // Since I can't easily import the complex scoring block without re-writing it in this tool,
        // and I am replacing the whole block, I will re-write the scoring block.
        // Convert User & Uni to Canonical Format
        const canonicalProfile = createCanonicalProfile(
          session.userId,
          userProfile.gpa || "0",
          userProfile.gpaScale || "4.0",
          userProfile.englishTest || "",
          userProfile.testScore || "0",
          userProfile.budget || "0",
          userProfile.targetDegree || "Bachelors",
          [],
        );
        try {
          const prefs = JSON.parse(userProfile.preferredCountries || "[]");
          canonicalProfile.profile.preferences.preferred_countries =
            Array.isArray(prefs) ? prefs : [prefs];
        } catch (e) {}

        const canonicalUni = createCanonicalUniversity(uni);

        // Run Evaluation
        try {
          const result = evaluateUniversity(canonicalProfile, canonicalUni);
          score = Math.round((result.score / 12) * 100);
          if (score > 100) score = 100;

          matchCategory = result.match_category;
          matchChance = result.acceptance_chance;
          reasons = result.why_it_fits;
        } catch (err) {
          //   console.error("Scoring error", err);
          score = 50;
        }
      } else {
        score = 70; // Default for guests
      }

      return {
        ...uni,
        fees: uni.fees ? uni.fees.toString() : "Check Website", // Hipo doesn't have fees
        matchScore: score,
        matchCategory,
        matchChance,
        reasons,
        tags: uni.tags || "[]",
      };
    });

    // Client-side pagination simulation
    scoredUniversities.sort((a: any, b: any) => b.matchScore - a.matchScore);

    // Apply pagination to the *processed* list
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    return scoredUniversities.slice(startIndex, endIndex);
  } catch (error) {
    console.error("Failed to fetch universities:", error);
    return [];
  }
}
