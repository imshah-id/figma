"use client";
import React from "react";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.0 }}
      className="flex flex-shrink-0 flex-col gap-4 md:flex-row md:items-start md:justify-between md:gap-4"
    >
      <div>
        <h1 className="mb-1 text-3xl font-extrabold tracking-tight text-text-primary">
          Welcome back, Student
        </h1>
        <p className="text-base text-text-secondary">
          Here&apos;s your study abroad journey overview
        </p>
      </div>
      <motion.button
        whileHover={{ y: -2, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="flex items-center gap-2.5 rounded-2xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg transition-all hover:shadow-xl"
      >
        <Sparkles size={18} />
        Talk to AI Counsellor
      </motion.button>
    </motion.header>
  );
}
