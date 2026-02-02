import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Sidebar from "@/components/Sidebar/Sidebar";
import Header from "@/components/Header/Header";
import StageGuard from "@/components/StageGuard";
import { STAGES } from "@/lib/constants";
import TaskChecklist from "@/components/TaskChecklist";

export default async function TasksPage() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  let profile = await prisma.profile.findUnique({
    where: { userId: session.userId },
    include: { user: true },
  });

  const lockedUniversities = await prisma.shortlist.findMany({
    where: {
      userId: session.userId,
      isLocked: true,
    },
    include: {
      university: true,
      guidanceTasks: {
        orderBy: { title: "asc" },
      },
    },
  });

  const documents = await prisma.document.findMany({
    where: { userId: session.userId },
    orderBy: { createdAt: "desc" },
  });

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
              requiredStage={STAGES.GUIDANCE}
            >
              <div className="flex flex-col gap-8">
                <div>
                  <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                    Application Guidance
                  </h1>
                  <p className="text-slate-500 mt-2">
                    Complete these tasks to finalize your applications for your
                    selected universities.
                  </p>
                </div>

                <TaskChecklist
                  lockedUniversities={lockedUniversities}
                  profile={profile}
                  documents={documents}
                />
              </div>
            </StageGuard>
          </div>
        </main>
      </div>
    </div>
  );
}
