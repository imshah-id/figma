import React from "react";
import { Sparkles, BookOpen } from "lucide-react";

export default function RecommendationBanner() {
  return (
    <div className="flex flex-shrink-0 flex-col items-start gap-6 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 p-5 md:flex-row md:items-center md:justify-between md:p-6">
      <div className="flex flex-1 items-start gap-5">
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-black text-white">
          <Sparkles size={24} fill="currentColor" />
        </div>
        <div className="flex flex-col">
          <h4 className="mb-2 text-base font-bold text-text-primary">
            AI Recommendation
          </h4>
          <p className="max-w-[480px] text-sm leading-relaxed text-text-secondary">
            Based on your profile, I recommend focusing on completing your lock
            more university options and strengthen your applications.
          </p>
        </div>
      </div>
      <div className="flex w-full flex-col gap-3 md:w-auto md:flex-row md:items-center">
        <button className="rounded-lg bg-primary px-6 py-3.5 text-[13px] font-semibold text-primary-foreground transition-opacity hover:opacity-90">
          Get Personalized Guidance
        </button>
        <button className="flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-3.5 text-[13px] font-semibold text-text-primary shadow-sm transition-colors hover:bg-gray-50">
          <BookOpen size={16} />
          View Recommended Universities
        </button>
      </div>
    </div>
  );
}
