import Sidebar from "@/components/Sidebar/Sidebar";
import Header from "@/components/Header/Header";
import JourneySection from "@/components/Journey/JourneySection";
import DashboardGrid from "@/components/Dashboard/DashboardGrid";
import RecommendationBanner from "@/components/Recommendation/RecommendationBanner";

export default function Home() {
  return (
    <div className="flex min-h-screen items-start justify-center bg-background">
      <div className="relative flex w-full max-w-[1800px] justify-center gap-12 px-6 py-8 xl:pl-8 xl:pr-8">
        <Sidebar />
        <main className="w-full max-w-[1440px]">
          <div className="flex flex-col gap-6">
            <Header />
            <JourneySection />
            <DashboardGrid />
            <div className="mt-6">
              <RecommendationBanner />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
