"use client";
import React from "react";
import { Sparkles, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

import { useRouter } from "next/navigation";

export default function RecommendationBanner() {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.1, ease: [0.23, 1, 0.32, 1] }}
      className="relative flex w-full flex-col justify-between gap-8 overflow-hidden rounded-3xl border border-[#E5E7EB] bg-[linear-gradient(90deg,#E5E7EB_0%,#FFFFFF_50%,#E5E7EB_100%)] p-10 shadow-[0px_1px_2px_rgba(0,0,0,0.05),0px_12px_24px_-4px_rgba(0,0,0,0.12)] md:flex-row md:items-center"
    >
      <div className="relative z-10 flex flex-1 flex-col items-center gap-6 text-center md:flex-row md:items-start md:text-left">
        {/* Icon Container */}
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-black shadow-lg transition-transform group-hover:scale-110">
          <Sparkles className="text-white" size={28} />
        </div>

        <div className="max-w-2xl space-y-1">
          <h2 className="text-xl font-black tracking-tight text-gray-900">
            AI Recommendation
          </h2>
          <p className="text-lg font-bold leading-relaxed text-gray-600">
            Based on your profile, I recommend focusing on locking more
            university options and strengthening your applications.
          </p>
        </div>
      </div>

      <div className="relative z-10 flex w-full flex-col items-center gap-3 md:w-auto md:flex-row">
        <motion.button
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => router.push("/counsellor")}
          className="h-12 w-full rounded-xl bg-black px-8 text-base font-bold text-white shadow-md transition-all hover:bg-neutral-800 md:w-auto"
        >
          Get Personalized Guidance
        </motion.button>
        <motion.button
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => router.push("/universities")}
          className="flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-[#E5E7EB] bg-white px-8 text-base font-bold text-gray-700 shadow-sm transition-all hover:bg-gray-50 md:w-auto"
        >
          <BookOpen size={18} className="text-gray-700" />
          View Recommended Universities
        </motion.button>
      </div>
    </motion.div>
  );
}
