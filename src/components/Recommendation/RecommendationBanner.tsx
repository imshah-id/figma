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
      className="flex flex-shrink-0 flex-col gap-8 rounded-[20px] border border-card-border bg-[#F8F9FA] p-6 md:flex-row md:items-center"
    >
      <div className="flex flex-1 items-start gap-5">
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-black text-white">
          <Sparkles size={24} fill="currentColor" />
        </div>
        <div className="flex flex-col">
          <h2 className="mb-2 text-xl font-bold md:text-xl  text-text-primary">
            AI Recommendation
          </h2>
          <p className="max-w-md text-base leading-[1.6] md:text-sm  text-text-secondary">
            Based on your profile, I recommend focusing on completing your lock
            more university options and strengthen your applications.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center sm:flex-col lg:flex-row gap-4">
        <motion.button
          whileHover={{ y: -2, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="rounded-xl  md:px-4  sm:text-sm  md:py-2 bg-black px-6 py-4 text-base font-bold text-white transition-all hover:bg-gray-900"
        >
          Get Personalized Guidance
        </motion.button>
        <motion.button
          whileHover={{ y: -2, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-2.5 rounded-xl border border-card-border bg-white md:px-4 md:py-2 md:text-sm px-6 py-4 text-base font-bold text-text-primary transition-all hover:bg-gray-50"
        >
          <BookOpen size={18} />
          View Recommended Universities
        </motion.button>
      </div>
    </motion.div>
  );
}
