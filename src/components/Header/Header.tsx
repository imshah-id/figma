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
      transition={{ duration: 0.15, ease: [0.23, 1, 0.32, 1] }}
      className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between"
    >
      {/* --- MOBILE & TABLET TOP ROW --- */}
      <div className="flex items-center justify-between lg:hidden">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img
            src="/Ellipse 11.png"
            alt="DeepcampusAI Logo"
            className="h-9 w-9 object-contain md:h-11 md:w-11"
          />
          <span className="text-lg font-bold tracking-tight text-text-primary md:text-xl">
            DeepcampusAI
          </span>
        </div>

        {/* Action Group for Mobile & Tablet */}
        <div className="flex items-center gap-3">
          {/* Compact AI Icon Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-black text-white shadow-md transition-all active:shadow-inner"
          >
            <Sparkles size={18} />
          </motion.button>

          <MobileNav />
        </div>
      </div>

      {/* Identity Section (Welcome Text) - Always shown, but layout changes at lg */}
      <div className="flex flex-col lg:pt-4">
        <h1 className="mb-0.5 text-2xl font-bold tracking-tight text-text-primary md:text-3xl lg:text-4xl lg:mb-1 lg:text-[34px] lg:leading-[40px]">
          Welcome back, Student
        </h1>
        <p className="text-sm text-text-secondary md:text-base lg:text-lg">
          Here&apos;s your study abroad journey overview
        </p>
      </div>

      {/* --- DESKTOP ONLY ACTION GROUP --- */}
      <div className="hidden items-center lg:pt-4 gap-3 lg:flex">
        <motion.button
          whileHover={{ y: -2, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center justify-center gap-2.5 rounded-[16.4px] bg-black px-6 py-3 text-base font-medium text-white shadow-lg transition-all hover:shadow-xl"
        >
          <Sparkles size={18} />
          Talk to AI Counsellor
        </motion.button>
      </div>
    </motion.header>
  );
}
