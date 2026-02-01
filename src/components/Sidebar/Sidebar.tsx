"use client";
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
import { motion } from "framer-motion";

export default function Sidebar() {
  const navItems = [
    { label: "Dashboard", icon: LayoutGrid, active: true },
    { label: "AI Counsellor", icon: MessageSquare, active: false },
    { label: "Universities", icon: School, active: false },
    { label: "Tasks", icon: CheckSquare, active: false },
    { label: "Profile", icon: User, active: false },
  ];

  return (
    <motion.aside
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: 0 }}
      className="sticky top-8 z-[100] hidden h-[60vh] w-[248px] flex-col rounded-[20px] border border-card-border bg-[#f4f2f2] px-5 py-7 shadow-md xl:flex"
    >
      {/* Logo */}
      <div className="mb-8 flex items-center gap-2.5 rounded-lg px-3 py-2">
        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600">
          <Sparkles size={16} fill="white" strokeWidth={0} />
        </div>
        <span className="text-base font-bold text-text-primary">
          DeepcampusAI
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex flex-1 flex-col gap-1">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href="#"
            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-[15px] transition-all ${
              item.active
                ? "bg-black font-medium text-white shadow-md hover:bg-gray-900"
                : "font-normal text-gray-500 hover:bg-gray-100 hover:text-text-primary"
            }`}
          >
            <item.icon size={18} strokeWidth={2} />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* Bottom Action */}
      <div className="mt-auto border-t border-card-border pt-4">
        <Link
          href="#"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-[15px] font-normal text-gray-500 transition-all hover:bg-gray-100 hover:text-text-primary"
        >
          <LogOut size={18} strokeWidth={2} />
          <span>Log out</span>
        </Link>
      </div>
    </motion.aside>
  );
}
