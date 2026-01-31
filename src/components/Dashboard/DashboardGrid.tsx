import React from "react";
import {
  ArrowRight,
  BookOpen,
  FileText,
  GraduationCap,
  Lock,
  LockKeyhole,
  AlertCircle,
} from "lucide-react";
import styles from "./DashboardGrid.module.css";
import clsx from "clsx";

export default function DashboardGrid() {
  return (
    <div className={styles.grid}>
      {/* Profile Strength Widget */}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h3 className={styles.cardTitle}>Profile Strength</h3>
        </div>
        <div className={styles.content}>
          <div className={styles.profileList}>
            <div className={styles.profileItem}>
              <div className={styles.iconLabel}>
                <BookOpen size={20} className="text-gray-400" />
                <span>Academics</span>
              </div>
              <span className={clsx(styles.tag, styles.tagGreen)}>Strong</span>
            </div>
            <div className={styles.profileItem}>
              <div className={styles.iconLabel}>
                <FileText size={20} className="text-gray-400" />
                <span>Exams</span>
              </div>
              <span className={clsx(styles.tag, styles.tagGray)}>
                Not Started
              </span>
            </div>
            <div className={styles.profileItem}>
              <div className={styles.iconLabel}>
                <GraduationCap size={20} className="text-gray-400" />
                <span>SOP</span>
              </div>
              <span className={clsx(styles.tag, styles.tagGray)}>
                Not Started
              </span>
            </div>
          </div>
        </div>
        <button className={styles.footerButton}>
          View Full Profile <ArrowRight size={16} />
        </button>
      </div>

      {/* Universities Widget */}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h3 className={styles.cardTitle}>Universities</h3>
        </div>
        <div className={styles.content}>
          <div className={styles.statsRow}>
            <div className={styles.statBox}>
              <div className={styles.statValue}>0</div>
              <div className={styles.statLabel}>Shortlisted</div>
            </div>
            <div className={styles.statBox}>
              <div className={styles.statValue}>0</div>
              <div className={styles.statLabel}>Locked</div>
            </div>
          </div>
          <div className={styles.infoBox}>
            <LockKeyhole size={20} className="flex-shrink-0" />
            <span>Lock at least 1 university to proceed to the next stage</span>
          </div>
        </div>
        <button className={styles.footerButton}>
          Explore Universities <ArrowRight size={16} />
        </button>
      </div>

      {/* Tasks Widget */}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h3 className={styles.cardTitle}>Your Tasks</h3>
          <span className={styles.counter}>0/3</span>
        </div>
        <div className={styles.content}>
          <div className={styles.taskList}>
            <div className={styles.taskItem}>
              <AlertCircle size={20} className="text-black flex-shrink-0" />
              <div className={styles.taskContent}>
                <div className={styles.taskTitle}>
                  Complete IELTS registration
                </div>
              </div>
            </div>
            <div className={styles.taskItem}>
              <AlertCircle size={20} className="text-black flex-shrink-0" />
              <div className={styles.taskContent}>
                <div className={styles.taskTitle}>Start SOP first draft</div>
                <div className={styles.priorityTag}>HIGH PRIORITY</div>
              </div>
            </div>
            <div className={styles.taskItem}>
              <AlertCircle size={20} className="text-black flex-shrink-0" />
              <div className={styles.taskContent}>
                <div className={styles.taskTitle}>
                  Research scholarship options
                </div>
                <div className={styles.priorityTag}>MEDIUM PRIORITY</div>
              </div>
            </div>
          </div>
        </div>
        <button className={styles.footerButton}>
          View All Tasks <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
