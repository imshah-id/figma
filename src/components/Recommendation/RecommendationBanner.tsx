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
      className="relative flex w-full flex-col justify-between gap-6 overflow-hidden rounded-2xl bg-[linear-gradient(90deg,#E5E7EB_0%,#FFFFFF_50%,#E5E7EB_100%)] outline outline-1 outline-offset-[-1px] outline-gray-200 p-6 md:h-48 xl:h-40 md:flex-row md:items-center"
    >
      {/* Decorative Blur - positioned to match "left-[758px] top-[70.75px]" responsive approximation */}
      <div className="pointer-events-none absolute -right-10 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-gradient-to-br from-gray-200 to-transparent opacity-50 blur-2xl" />

      <div className="relative z-10 flex flex-1 items-start gap-4">
        {/* Icon Container - w-10 h-10 rounded-[10px] shadow-lg */}
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-black text-white shadow-lg">
          <Sparkles size={18} className="text-white" strokeWidth={2} />
        </div>

        <div className="flex flex-col gap-1">
          <h2 className="font-['Inter'] text-base font-bold leading-6 tracking-[0] text-gray-900">
            AI Recommendation
          </h2>
          <div className="max-w-[481px]">
            <p className="font-['Inter'] text-sm font-normal leading-6 text-gray-600">
              Based on your profile, I recommend focusing on completing your
              lock more university options and strengthen your applications.
            </p>
          </div>
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-center gap-3 md:flex-row">
        {/* Get Personalized Guidance - w-52 h-10 */}
        <button className="all-[unset] box-border flex h-10 w-full cursor-pointer items-center justify-center rounded-[10px] bg-black shadow-[0px_2px_4px_-2px_rgba(0,0,0,0.05),0px_4px_6px_-1px_rgba(0,0,0,0.05)] transition-all hover:bg-gray-900 md:w-52">
          <span className="font-['Inter'] text-sm font-medium leading-5 text-white">
            Get Personalized Guidance
          </span>
        </button>

        {/* View Recommended Universities - flex-1 h-10 outline */}
        <button className="all-[unset] box-border flex h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-[10px] bg-white outline outline-1 outline-offset-[-1px] outline-gray-200 transition-all hover:bg-gray-50 md:flex-1 md:px-4">
          <BookOpen size={16} className="text-gray-700" />
          <span className="font-['Inter'] text-sm font-medium leading-5 text-gray-700">
            View Recommended Universities
          </span>
        </button>
      </div>
    </motion.div>
  );
}
