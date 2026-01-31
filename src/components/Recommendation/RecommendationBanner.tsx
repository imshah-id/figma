import React from "react";
import { Sparkles, BookOpen } from "lucide-react";
import styles from "./RecommendationBanner.module.css";

export default function RecommendationBanner() {
  return (
    <div className={styles.banner}>
      <div className={styles.content}>
        <div className={styles.iconBox}>
          <Sparkles size={24} fill="currentColor" />
        </div>
        <div className={styles.textGroup}>
          <h4 className={styles.title}>AI Recommendation</h4>
          <p className={styles.description}>
            Based on your profile, I recommend focusing on completing your lock
            more university options and strengthen your applications.
          </p>
        </div>
      </div>
      <div className={styles.actions}>
        <button className={styles.primaryButton}>
          Get Personalized Guidance
        </button>
        <button className={styles.secondaryButton}>
          <BookOpen size={16} />
          View Recommended Universities
        </button>
      </div>
    </div>
  );
}
