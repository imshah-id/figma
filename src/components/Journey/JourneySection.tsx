import React from "react";
import { CircleCheck, Circle, Clock } from "lucide-react";
import styles from "./Journey.module.css";
import clsx from "clsx";

export default function JourneySection() {
  const steps = [
    {
      id: 1,
      title: "Building Profile",
      description: "Complete your information",
      status: "completed",
    },
    {
      id: 2,
      title: "Discovering Universities",
      description: "Explore your options",
      status: "active",
    },
    {
      id: 3,
      title: "Finalizing Universities",
      description: "Lock your choices",
      status: "upcoming",
    },
    {
      id: 4,
      title: "Preparing Applications",
      description: "Submit your applications",
      status: "upcoming",
    },
  ];

  return (
    <section className={styles.container}>
      <h3 className={styles.sectionTitle}>Your Journey</h3>
      <div className={styles.grid}>
        {steps.map((step) => {
          const isCompleted = step.status === "completed";
          const isActive = step.status === "active";

          return (
            <div key={step.id} className={styles.cardWrapper}>
              <div
                className={clsx(
                  styles.progressBar,
                  (isCompleted || isActive) && styles.progressBarFilled,
                )}
              />
              <div className={clsx(styles.card, isActive && styles.cardActive)}>
                <div
                  className={clsx(
                    styles.stageHeader,
                    isCompleted && styles.stageHeaderCompleted,
                    isActive && styles.stageHeaderActive,
                  )}
                >
                  {isCompleted ? (
                    <CircleCheck size={14} />
                  ) : isActive ? (
                    <Circle size={14} fill="currentColor" />
                  ) : (
                    <Clock size={14} />
                  )}
                  <span>Stage {step.id}</span>
                </div>
                <h4 className={styles.cardTitle}>{step.title}</h4>
                <p className={styles.cardDescription}>{step.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
