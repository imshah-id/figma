import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Sidebar from "@/components/Sidebar/Sidebar";
import Header from "@/components/Header/Header";
import JourneySection from "@/components/Journey/JourneySection";
import DashboardGrid from "@/components/Dashboard/DashboardGrid";
import RecommendationBanner from "@/components/Recommendation/RecommendationBanner";

export default async function Home() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  // Fetch Profile & Data with Error Handling/Fallback
  let profile = null;
  let shortlistedCount = 0;
  let lockedCount = 0;

  try {
    profile = await prisma.profile.findUnique({
      where: { userId: session.userId },
      include: { user: true },
    });

    shortlistedCount = await prisma.shortlist.count({
      where: { userId: session.userId },
    });

    lockedCount = await prisma.shortlist.count({
      where: { userId: session.userId, isLocked: true },
    });
  } catch (error) {
    console.warn("Database connection failed, using fallback data:", error);
    // Silent failure for UI demo purposes
  }

  // Fetch tasks
  let tasks: any[] = [];
  try {
    tasks = await prisma.guidanceTask.findMany({
      where: {
        shortlist: {
          userId: session.userId,
          isLocked: true,
        },
      },
    });
  } catch (error) {
    console.warn("Failed to fetch tasks:", error);
  }

  const stats = {
    shortlisted: shortlistedCount,
    locked: lockedCount,
    completedTasks: tasks.filter((t) => t.status === "completed").length,
    totalTasks: tasks.length || 0,
  };

  return (
    <div className="flex min-h-screen items-start justify-center bg-white">
      <div className="relative flex w-full max-w-[1800px] justify-center gap-6 px-4 py-6 md:gap-12 md:px-6 md:py-8 lg:pl-8 lg:pr-8 lg:py-4">
        <Sidebar />
        <main className="w-full max-w-[1440px]">
          <div className="flex flex-1 flex-col overflow-y-auto pl-0 lg:pl-4 gap-12">
            <Header
              userName={profile?.user?.fullName || session.email.split("@")[0]}
            />
            <JourneySection currentStage={profile?.currentStage || "PROFILE"} />
            <DashboardGrid profile={profile} stats={stats} tasks={tasks} />
            <RecommendationBanner />
          </div>
        </main>
      </div>
    </div>
  );
}
