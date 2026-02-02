import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { model } from "@/lib/ai/gemini";

export async function POST(req: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { universityId } = await req.json();

    if (!universityId) {
      return NextResponse.json(
        { error: "Missing universityId" },
        { status: 400 },
      );
    }

    // 1. Check if university exists and has cached analysis
    const university = await prisma.university.findUnique({
      where: { id: universityId },
    });

    if (!university) {
      return NextResponse.json(
        { error: "University not found" },
        { status: 404 },
      );
    }

    // Get cache directly or check if it's a valid JSON string
    if (university.aiAnalysis) {
      try {
        const cachedAnalysis = JSON.parse(university.aiAnalysis);
        // Basic validation to ensure it's not empty/malformed
        if (cachedAnalysis.strengths && cachedAnalysis.strengths.length > 0) {
          console.log("Returning cached AI analysis for", university.name);
          return NextResponse.json(cachedAnalysis);
        }
      } catch (e) {
        console.warn("Cached analysis was invalid JSON, regenerating...", e);
      }
    }

    // 2. If no cache, fetch user profile for personalization
    const profile = await prisma.profile.findUnique({
      where: { userId: session.userId },
      include: { user: true },
    });

    // 3. Generate Analysis with AI
    console.log("Generating fresh AI analysis for", university.name);

    const prompt = `
      Analyze the suitability of ${university.name} located in ${university.location} for a student with the following profile:
      - Target Degree: ${profile?.targetDegree || "Master's"}
      - Major: ${profile?.targetMajor || "Computer Science"}
      - GPA: ${profile?.gpa || "Unknown"}
      - Test Scores: ${profile?.testScore || "Unknown"}
      
      The university has these stats:
      - Rank: ${university.rank}
      - Acceptance Rate: ${university.acceptanceRate}
      - Fees: ${university.fees}

      Provide a JSON response with the following structure (strictly JSON, no markdown code blocks):
      {
        "strengths": [
           { "text": "A concise bullet point about why the student is a good fit." },
           { "text": "Another strength point." }
        ],
        "focusAreas": [
           { "text": "A specific recommendation on what to improve or highlight in the application." }
        ],
        "alumniInsights": "A short, realistic quote or insight attributed to alumni about the program culture or outcomes."
      }
      
      Keep it professional, encouraging, but realistic.
    `;

    const result = await model.generateContent(prompt);
    const response = result.response;
    let text = response.text();

    // Clean up potential markdown formatting from AI
    text = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const analysisData = JSON.parse(text);

    // 4. Cache the result in the database
    // Note: We are caching personalized results globally for now as per "update them in db so in case another users wnats to check the same we dont have to call ai that time"
    // This is a trade-off: The first user's profile biases the cached result for everyone.
    // For a real prod app, we might separate "University General Analysis" from "Personal Match Analysis".
    // But adhering to the user's specific request to "update them in db... for other users".
    // To make it slightly more generic for reuse, we could prompt the AI to give "General Strengths" instead of "Your Strengths".
    // However, the UI says "Your Strengths".
    // I will stick to the user's request to CACHE it.

    await prisma.university.update({
      where: { id: universityId },
      data: { aiAnalysis: JSON.stringify(analysisData) },
    });

    return NextResponse.json(analysisData);
  } catch (error) {
    console.error("Analysis generation error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
