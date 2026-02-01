"use client";
import React from "react";
import { Sparkles, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

export default function RecommendationBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="flex flex-shrink-0 flex-col gap-6 rounded-[24px] border border-card-border bg-[#F8F9FA] p-5 shadow-sm md:items-center md:p-8 xl:flex-row xl:items-start xl:gap-8"
    >
      <div className="flex flex-1 flex-col items-start gap-4 md:items-center md:text-center lg:flex-row lg:items-start lg:gap-6 lg:text-left">
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-black text-white md:h-14 md:w-14">
          <Sparkles size={20} fill="currentColor" className="md:h-7 md:w-7" />
        </div>
        <div className="flex flex-col">
          <h2 className="mb-1 text-lg font-bold text-text-primary md:mb-2 md:text-xl">
            AI Recommendation
          </h2>
          <p className="max-w-medium text-sm leading-relaxed text-text-secondary md:text-base lg:max-w-md">
            Based on your profile, I recommend focusing on completing your lock
            more university options and strengthen your applications.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center lg:flex-nowrap lg:justify-start">
        <motion.button
          whileHover={{ y: -2, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full rounded-xl bg-black px-6 py-3.5 text-sm font-bold text-white transition-all hover:bg-gray-900 sm:w-auto md:px-5 md:py-3"
        >
          Get Personalized Guidance
        </motion.button>
        <motion.button
          whileHover={{ y: -2, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-card-border bg-white px-6 py-3.5 text-sm font-bold text-text-primary transition-all hover:bg-gray-50 sm:w-auto md:px-5 md:py-3"
        >
          <BookOpen size={16} />
          View Recommended Universities
        </motion.button>
      </div>
    </motion.div>
  );
}
