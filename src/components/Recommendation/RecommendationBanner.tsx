"use client";
import React from "react";
import { Sparkles, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

export default function RecommendationBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.15, ease: [0.23, 1, 0.32, 1] }}
      className="relative flex w-full flex-col justify-between gap-8 overflow-hidden rounded-3xl border border-[#E5E7EB] bg-[linear-gradient(90deg,#E5E7EB_0%,#FFFFFF_50%,#E5E7EB_100%)] p-10 shadow-[0px_1px_2px_rgba(0,0,0,0.05),0px_12px_24px_-4px_rgba(0,0,0,0.12)] md:flex-row md:items-center"
    >
      <div className="relative z-10 flex flex-1 flex-col items-center gap-6 text-center md:flex-row md:items-start md:text-left">
        {/* Icon Container */}
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-gray-100 transition-transform group-hover:scale-110">
          <Sparkles className="text-gray-900" size={28} />
        </div>

        <div className="max-w-2xl space-y-1">
          <h2 className="text-2xl font-black tracking-tight text-gray-900">
            AI Recommendation
          </h2>
          <p className="text-lg font-bold leading-relaxed text-gray-600">
            Enhance your profile by adding your extracurricular activities to
            increase your admission chances.
          </p>
        </div>
      </div>

      <div className="relative z-10 flex w-full items-center gap-3 md:w-auto">
        <motion.button
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="h-12 flex-1 rounded-xl border border-gray-200 bg-white px-6 text-base font-bold text-gray-700 shadow-sm transition-all hover:bg-gray-50 md:flex-none"
        >
          Later
        </motion.button>
        <motion.button
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="h-12 flex-1 rounded-xl bg-black px-6 text-base font-bold text-white shadow-md transition-all hover:bg-neutral-800 md:flex-none"
        >
          Add Now
        </motion.button>
      </div>
    </motion.div>
  );
}
