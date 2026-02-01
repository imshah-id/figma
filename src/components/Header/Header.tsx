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
      className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between"
    >
      {/* --- MOBILE & TABLET TOP ROW --- */}
      <div className="flex items-center justify-between xl:hidden">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img
            src="/Ellipse 11.png"
            alt="DeepcampusAI Logo"
            className="h-10 w-10 object-contain md:h-12 md:w-12"
          />
          <span className="text-xl font-black tracking-tight text-text-primary md:text-2xl">
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
      <div className="flex flex-col xl:pt-4">
        <h1 className="mb-0.5 text-2xl font-bold tracking-tight text-text-primary md:text-3xl lg:text-4xl xl:mb-1 xl:text-[34px] xl:leading-[40px]">
          Welcome back, Student
        </h1>
        <p className="text-sm text-text-secondary md:text-base lg:text-lg">
          Here&apos;s your study abroad journey overview
        </p>
      </div>

      {/* --- DESKTOP ONLY ACTION GROUP --- */}
      <div className="hidden items-center xl:pt-4 gap-3 xl:flex">
        <motion.button
          whileHover={{ y: -2, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center justify-center gap-2.5 rounded-[16.4px] bg-black px-6 py-3 text-base font-medium text-white shadow-lg transition-all hover:shadow-xl"
        >
          <Sparkles size={18} />
          Talk to AI Counsellor
        </motion.button>

        <MobileNav />
      </div>
    </motion.header>
  );
}
