import Sidebar from "@/components/Sidebar/Sidebar";
import Header from "@/components/Header/Header";
import JourneySection from "@/components/Journey/JourneySection";
import DashboardGrid from "@/components/Dashboard/DashboardGrid";
import RecommendationBanner from "@/components/Recommendation/RecommendationBanner";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Sidebar />
      <main className={styles.main}>
        <div className={styles.contentWrapper}>
          <Header />
          <JourneySection />
          <DashboardGrid />
          <RecommendationBanner />
        </div>
      </main>
    </div>
  );
}
