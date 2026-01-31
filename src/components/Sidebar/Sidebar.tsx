import React from "react";
import Link from "next/link";
import {
  LayoutGrid,
  MessageSquare,
  School,
  CheckSquare,
  User,
  LogOut,
  Sparkles,
} from "lucide-react";
import styles from "./Sidebar.module.css";
import clsx from "clsx";

export default function Sidebar() {
  const navItems = [
    { label: "Dashboard", icon: LayoutGrid, active: true },
    { label: "AI Counsellor", icon: MessageSquare, active: false },
    { label: "Universities", icon: School, active: false },
    { label: "Tasks", icon: CheckSquare, active: false },
    { label: "Profile", icon: User, active: false },
  ];

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <div className={styles.logoIcon}>
          {/* Using Sparkles as a placeholder for the custom logo icon */}
          <Sparkles size={20} fill="white" />
        </div>
        <span>DeepcampusAI</span>
      </div>

      <nav className={styles.nav}>
        {navItems.map((item) => (
          <Link
            key={item.label}
            href="#"
            className={clsx(
              styles.navItem,
              item.active && styles.navItemActive,
            )}
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className={styles.bottomAction}>
        <Link href="#" className={styles.navItem}>
          <LogOut size={20} />
          <span>Log out</span>
        </Link>
      </div>
    </aside>
  );
}
