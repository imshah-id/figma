import Sidebar from "@/components/Sidebar/Sidebar";
import Header from "@/components/Header/Header";
import JourneySection from "@/components/Journey/JourneySection";
import DashboardGrid from "@/components/Dashboard/DashboardGrid";
import RecommendationBanner from "@/components/Recommendation/RecommendationBanner";

export default function Home() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="ml-0 h-screen overflow-y-auto overflow-x-hidden bg-background p-4 md:p-6 xl:ml-[280px] xl:p-[30px_46px_30px_4px]">
        <div className="mx-auto flex h-full max-w-[1280px] flex-col gap-5">
          <Header />
          <JourneySection />
          <DashboardGrid />
          <RecommendationBanner />
        </div>
      </main>
    </div>
  );
}
