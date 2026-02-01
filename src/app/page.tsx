import Sidebar from "@/components/Sidebar/Sidebar";
import Header from "@/components/Header/Header";
import JourneySection from "@/components/Journey/JourneySection";
import DashboardGrid from "@/components/Dashboard/DashboardGrid";
import RecommendationBanner from "@/components/Recommendation/RecommendationBanner";

export default function Home() {
  return (
    <div className="flex min-h-screen items-start justify-center bg-background">
      <div className="relative flex w-full max-w-[1800px] justify-center gap-6 px-4 py-6 md:gap-12 md:px-6 md:py-8 xl:pl-8 xl:pr-8 xl:py-4">
        <Sidebar />
        <main className="w-full max-w-[1440px]">
          <div className="flex flex-col gap-4 md:gap-6">
            <Header />
            <JourneySection />
            <DashboardGrid />
            <RecommendationBanner />
          </div>
        </main>
      </div>
    </div>
  );
}
