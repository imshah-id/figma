import React from "react";
import { Sparkles } from "lucide-react";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div>
        <h1 className={styles.title}>Welcome back, Student</h1>
        <p className={styles.subtitle}>
          Here's your study abroad journey overview
        </p>
      </div>
      <button className={styles.aiButton}>
        <Sparkles size={18} />
        Talk to AI Counsellor
      </button>
    </header>
  );
}
