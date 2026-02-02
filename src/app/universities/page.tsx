import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Sidebar from "@/components/Sidebar/Sidebar";
import Header from "@/components/Header/Header";
import { getUniversities } from "@/lib/universities";
import { Sparkles, MapPin, DollarSign, GraduationCap } from "lucide-react";
import UniversitiesGrid from "@/components/UniversitiesGrid";
import StageGuard from "@/components/StageGuard";
import { STAGES } from "@/lib/constants";

export default async function UniversitiesPage() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  let profile = null;
  try {
    profile = await prisma.profile.findUnique({
      where: { userId: session.userId },
      include: { user: true },
    });
  } catch (e) {
    // Fallback if needed, though getUniversities handles offline better if we use it directly?
    // Actually getUniversities also uses prisma, so it might fail with P1001.
    // We should allow it to fail gracefully or use mock data if DB is down?
    // relying on getUniversities internal error handling which returns []
  }

  /* Fetch shortlist status */
  let shortlistedIds = new Set();
  try {
    const shortlist = await prisma.shortlist.findMany({
      where: { userId: session.userId },
      select: { universityId: true },
    });
    shortlistedIds = new Set(shortlist.map((s) => s.universityId));
  } catch (e) {}

  const universities = await getUniversities(1, 100);

  return (
    <div className="flex min-h-screen items-start justify-center bg-white">
      <div className="relative flex w-full max-w-[1800px] justify-center gap-6 px-4 py-6 md:gap-12 md:px-6 md:py-8 lg:pl-8 lg:pr-8 lg:py-4">
        <Sidebar />
        <main className="w-full max-w-[1440px]">
          <div className="flex flex-1 flex-col overflow-y-auto pl-0 lg:pl-4 gap-8">
            <Header
              userName={profile?.user?.fullName || session.email.split("@")[0]}
              showWelcome={false}
              showAction={false}
            />

            <StageGuard
              currentStage={profile?.currentStage || STAGES.PROFILE}
              requiredStage={STAGES.DISCOVERY}
            >
              <div className="flex flex-col gap-6">
                <div>
                  <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                    Explore Universities
                  </h1>
                  <p className="text-slate-500 mt-2">
                    Discover top universities matched to your profile and
                    preferences.
                  </p>
                </div>

                {universities.length === 0 ? (
                  <div className="p-12 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                    <p className="text-slate-500">
                      No universities found or database is offline.
                    </p>
                  </div>
                ) : (
                  <UniversitiesGrid
                    universities={universities}
                    initialShortlistedIds={
                      Array.from(shortlistedIds) as string[]
                    }
                  />
                )}
              </div>
            </StageGuard>
          </div>
        </main>
      </div>
    </div>
  );
}
