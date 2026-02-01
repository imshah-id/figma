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
      transition={{ duration: 0.15, ease: [0.23, 1, 0.32, 1] }}
      className="sticky top-6 z-[100] hidden h-[calc(100vh-3rem)] w-60 flex-col rounded-[32px] border border-[#f2f4f6] bg-[#f2f2f2] p-6 shadow-sm lg:flex"
    >
      {/* Logo */}
      <div className="mb-8 flex items-center px-1">
        <Link href="/" className="flex items-center gap-3">
          <img
            src="/Ellipse 11.png"
            alt="DeepcampusAI Logo"
            className="h-10 w-10 object-contain"
          />
          <span className="whitespace-nowrap font-['Inter'] text-xl font-bold tracking-[-0.50px] leading-7 text-neutral-950">
            DeepcampusAI
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex w-full flex-1 flex-col gap-2">
        {navItems.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.15,
              delay: index * 0.03,
              ease: [0.23, 1, 0.32, 1],
            }}
          >
            <Link
              href="#"
              className={`flex h-12 w-full items-center gap-3 rounded-[16.4px] px-4 transition-all duration-200 ${
                item.active
                  ? "bg-black text-white shadow-[0px_4px_6px_-4px_#0000001a,0px_10px_15px_-3px_#0000001a]"
                  : "text-[#697282] hover:bg-white hover:text-text-primary hover:shadow-sm"
              }`}
            >
              <motion.div
                whileHover={!item.active ? { scale: 1.1 } : {}}
                className="relative flex h-5 w-5 items-center justify-center"
              >
                <item.icon
                  size={20}
                  strokeWidth={1.5}
                  className={item.active ? "text-white" : "text-currentColor"}
                />
              </motion.div>
              <span className="whitespace-nowrap font-['Inter'] text-base font-medium leading-6">
                {item.label}
              </span>
              {item.active && (
                <motion.div
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 0.6, x: 0 }}
                  className="ml-auto"
                >
                  <span className="text-xs">›</span>
                </motion.div>
              )}
            </Link>
          </motion.div>
        ))}
      </nav>

      {/* Bottom Action */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.2 }}
        className="mt-auto flex w-full flex-col items-start border-t border-solid border-[#f2f4f6] pt-6"
      >
        <Link
          href="#"
          className="flex h-5 w-full items-center gap-2 rounded-[16.4px] px-4 text-[#697282] transition-all hover:text-text-primary"
        >
          <div className="relative h-4 w-4">
            <LogOut size={16} strokeWidth={1.5} />
          </div>
          <span className="whitespace-nowrap font-['Inter'] text-sm font-normal leading-5">
            Log out
          </span>
        </Link>
      </motion.div>
    </motion.aside>
  );
}
