"use client";
import React from "react";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import MobileNav from "./MobileNav";

export default function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.0 }}
      className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between"
    >
      {/* --- MOBILE & TABLET TOP ROW --- */}
      <div className="flex items-center justify-between xl:hidden">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-md md:h-12 md:w-12">
            <Sparkles
              className="h-5 w-5 md:h-6 md:w-6"
              fill="white"
              strokeWidth={0}
            />
          </div>
          <span className="text-lg font-black tracking-tight text-text-primary md:text-xl">
            DeepcampusAI
          </span>
        </div>

        {/* Action Group for Mobile & Tablet */}
        <div className="flex items-center gap-3">
          {/* Compact AI Icon Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md transition-all active:shadow-inner"
          >
            <Sparkles size={18} />
          </motion.button>

          <MobileNav />
        </div>
      </div>

      {/* Identity Section (Welcome Text) - Always shown, but layout changes at lg */}
      <div className="flex flex-col xl:pt-4">
        <h1 className="mb-0.5 text-xl font-bold tracking-tight text-text-primary md:text-2xl lg:text-4xl xl:mb-1 xl:text-3xl">
          Welcome back, Student
        </h1>
        <p className="text-xs text-text-secondary md:text-sm lg:text-base">
          Here&apos;s your study abroad journey overview
        </p>
      </div>

      {/* --- DESKTOP ONLY ACTION GROUP --- */}
      <div className="hidden items-center xl:pt-4 gap-3 xl:flex">
        <motion.button
          whileHover={{ y: -2, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center justify-center gap-2.5 rounded-2xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg transition-all hover:shadow-xl"
        >
          <Sparkles size={18} />
          Talk to AI Counsellor
        </motion.button>

        <MobileNav />
      </div>
    </motion.header>
  );
}
