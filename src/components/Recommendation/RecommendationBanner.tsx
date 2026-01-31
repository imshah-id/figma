import React from "react";
import { Sparkles, BookOpen } from "lucide-react";

export default function RecommendationBanner() {
  return (
    <div className="flex flex-shrink-0 flex-col gap-8 rounded-[20px] border border-card-border bg-[#F8F9FA] p-6 md:flex-row md:items-center">
      <div className="flex flex-1 items-start gap-5">
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-black text-white">
          <Sparkles size={24} fill="currentColor" />
        </div>
        <div className="flex flex-col">
          <h2 className="mb-2 text-xl font-bold text-text-primary">
            AI Recommendation
          </h2>
          <p className="max-w-md text-base leading-[1.6] text-text-secondary">
            Based on your profile, I recommend focusing on completing your lock
            more university options and strengthen your applications.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button className="rounded-xl bg-black px-6 py-4 text-base font-bold text-white transition-all hover:bg-gray-900 active:scale-[0.98]">
          Get Personalized Guidance
        </button>
        <button className="flex items-center gap-2.5 rounded-xl border border-card-border bg-white px-6 py-4 text-base font-bold text-text-primary transition-all hover:bg-gray-50 active:scale-[0.98]">
          <BookOpen size={18} />
          View Recommended Universities
        </button>
      </div>
    </div>
  );
}
