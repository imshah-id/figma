"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Sparkles,
  TrendingUp,
  ArrowUpRight,
  Loader2,
  Check,
  X,
  Star,
  Heart,
  ArrowRight,
} from "lucide-react";

interface UniversityProps {
  id: string;
  name: string;
  location: string;
  rank: number;
  fees: string;
  acceptanceRate: string;
  matchScore: number;
  matchCategory?: string;
  matchChance?: string;
  website?: string;
  tags?: string; // JSON string
  country?: string;
  reasons?: string[];
  isExternal?: boolean;
  web_pages?: string[];
}

export default function UniversityCard({
  uni,
  index,
  initialIsShortlisted = false,
  showLockAction = false,
  initialIsLocked = false,
  onLockToggle,
  onGuidanceClick,
  onAnalyzeClick,
  onShortlistToggle,
}: {
  uni: UniversityProps;
  index: number;
  initialIsShortlisted?: boolean;
  showLockAction?: boolean;
  initialIsLocked?: boolean;
  onLockToggle?: (val: boolean) => void;
  onGuidanceClick?: () => void;
  onAnalyzeClick?: () => void;
  onShortlistToggle?: (isShortlisted: boolean) => void;
}) {
  const [isLiked, setIsLiked] = useState(initialIsShortlisted);
  const [isLockedState, setIsLockedState] = useState(initialIsLocked);

  return (
    <motion.div
      layoutId={uni.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className={`bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-indigo-500/30 transition-all group relative hover:shadow-xl hover:shadow-indigo-500/10 hover:scale-[1.02] flex flex-col h-full ${
        uni.isExternal ? "border-blue-200/60 bg-blue-50/30" : ""
      }`}
    >
      {/* External Data Badge - Sleek Version */}
      {uni.isExternal && (
        <div
          className={`absolute top-4 ${showLockAction ? "right-14" : "right-4"} bg-blue-50 backdrop-blur-md border border-blue-200 px-3 py-1 rounded-full flex items-center gap-1.5 z-10 shadow-sm transition-all`}
        >
          <Sparkles className="w-3 h-3 text-blue-600" />
          <span className="text-xs font-bold text-blue-700">AI Discovery</span>
        </div>
      )}

      {/* Remove Button (Top Right X) - Only when managing shortlist */}
      {showLockAction && (
        <button
          onClick={async (e) => {
            e.preventDefault();
            e.stopPropagation();
            const invalidating = true; // Always removing
            setIsLiked(false); // Optimistic

            try {
              const url = `/api/shortlist?universityId=${uni.id}`;
              await fetch(url, { method: "DELETE" });
              if (onShortlistToggle) onShortlistToggle(false);
            } catch (error) {
              setIsLiked(true); // Revert
            }
          }}
          className="absolute top-4 right-4 z-20 p-1.5 bg-white/80 hover:bg-rose-50 text-slate-400 hover:text-rose-600 rounded-full shadow-sm backdrop-blur-md transition-all border border-transparent hover:border-rose-200"
          title="Remove from Shortlist"
        >
          <X size={18} />
        </button>
      )}

      {/* Dynamic Gradient Header */}
      <div
        className={`h-32 relative p-6 flex items-end shrink-0 ${
          uni.isExternal
            ? "bg-gradient-to-br from-blue-50 to-indigo-50/50"
            : (uni.matchScore || 0) >= 80
              ? "bg-gradient-to-br from-emerald-50 via-teal-50/50 to-white"
              : (uni.matchScore || 0) >= 50
                ? "bg-gradient-to-br from-amber-50 via-orange-50/50 to-white"
                : "bg-gradient-to-br from-slate-100 via-gray-50 to-white"
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-white/80 to-transparent" />

        {/* Category Badge (Top Left) */}
        {!uni.isExternal && (
          <div
            className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold shadow-sm ${
              (uni.matchScore || 0) >= 80
                ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                : (uni.matchScore || 0) >= 50
                  ? "bg-amber-100 text-amber-800 border border-amber-200"
                  : "bg-rose-100 text-rose-800 border border-rose-200"
            }`}
          >
            {(uni.matchScore || 0) >= 80
              ? "🎯 Safe"
              : (uni.matchScore || 0) >= 50
                ? "✨ Target"
                : "🚀 Dream"}
          </div>
        )}

        <div className="relative z-10 flex flex-col gap-2.5 items-start">
          <h3 className="text-xl font-bold leading-tight text-slate-900 line-clamp-2">
            {uni.name}
          </h3>

          {/* Match Score Badge (Moved here) */}
          {!uni.isExternal && uni.matchScore !== undefined && (
            <div
              className={`bg-white/90 backdrop-blur-md border border-slate-200 px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm`}
            >
              <div
                className={`w-2 h-2 rounded-full animate-pulse ${
                  (uni.matchScore || 0) >= 80
                    ? "bg-emerald-500"
                    : (uni.matchScore || 0) >= 50
                      ? "bg-amber-500"
                      : "bg-slate-400"
                }`}
              />
              <span
                className={`text-xs font-bold ${
                  (uni.matchScore || 0) >= 80
                    ? "text-emerald-700"
                    : (uni.matchScore || 0) >= 50
                      ? "text-amber-700"
                      : "text-slate-500"
                }`}
              >
                {uni.matchScore || 0}% Match
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1 gap-4 relative">
        {/* Location & AI Insight */}
        <div>
          <div className="flex items-center gap-2 text-sm text-slate-500 mb-2 font-medium">
            <MapPin className="w-4 h-4 text-slate-400" />{" "}
            {uni.location || uni.country || "Unknown Location"}
          </div>
          {!uni.isExternal && uni.reasons && uni.reasons.length > 0 && (
            <div className="flex items-start gap-2 text-xs text-indigo-700 bg-indigo-50 p-3 rounded-xl border border-indigo-100/50">
              <Sparkles className="w-3.5 h-3.5 mt-0.5 text-indigo-500 shrink-0" />
              <span className="italic leading-relaxed font-medium">
                "{uni.reasons[0]}"
              </span>
            </div>
          )}
        </div>

        {/* Enhanced Stats Grid */}
        {!uni.isExternal ? (
          <div className="grid grid-cols-2 gap-3 py-4 border-t border-slate-100 border-b">
            <div>
              <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-0.5">
                Global Rank
              </div>
              <div className="font-bold text-slate-900 text-sm">
                #{uni.rank || "N/A"}
              </div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-0.5">
                Est. Fees
              </div>
              <div className="font-bold text-emerald-600 text-sm">
                {uni.fees}
              </div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-0.5">
                Acceptance
              </div>
              <div className="font-bold text-slate-900 text-sm">
                {uni.acceptanceRate || "TBD"}
              </div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-0.5">
                Odds
              </div>
              <div
                className={`font-bold text-sm flex items-center gap-1 ${
                  uni.matchChance === "High"
                    ? "text-emerald-600"
                    : uni.matchChance === "Medium"
                      ? "text-amber-600"
                      : "text-rose-600"
                }`}
              >
                <TrendingUp className="w-3 h-3" />
                {uni.matchChance || "TBD"}
              </div>
            </div>
          </div>
        ) : (
          // External Data - Locked State
          <div className="relative py-4 border-y border-slate-100 space-y-2">
            {/* Blurred Fake Data for Effect */}
            <div className="grid grid-cols-2 gap-3 blur-sm select-none opacity-40">
              <div>
                <div className="h-2 w-16 bg-slate-300 rounded mb-1"></div>
                <div className="h-4 w-10 bg-slate-200 rounded"></div>
              </div>
              <div>
                <div className="h-2 w-16 bg-slate-300 rounded mb-1"></div>
                <div className="h-4 w-12 bg-emerald-100 rounded"></div>
              </div>
            </div>

            {/* Overlay Call to Action */}
            <div className="absolute inset-0 flex items-center justify-center flex-col z-10">
              <div className="text-xs font-bold text-blue-700 bg-blue-50/90 px-3 py-1.5 rounded-full border border-blue-200 flex items-center gap-2 shadow-sm backdrop-blur-sm">
                <Sparkles className="w-3 h-3 text-blue-500 animate-pulse" />
                Analyze to Reveal Data
              </div>
            </div>
          </div>
        )}

        {/* Footer / Buttons */}
        <div className="flex flex-col gap-3 mt-auto">
          {/* Website Link (Subtle) for External */}
          {uni.isExternal && uni.web_pages?.[0] && (
            <a
              href={uni.web_pages[0]}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-[10px] text-slate-400 hover:text-blue-600 flex items-center gap-1 mx-auto transition-colors font-medium"
            >
              Visit {new URL(uni.web_pages[0]).hostname}{" "}
              <ArrowUpRight className="w-3 h-3" />
            </a>
          )}
          {!uni.isExternal && (
            <div className="flex flex-wrap gap-1.5">
              {(() => {
                try {
                  const tags = JSON.parse(uni.tags || "[]");
                  return tags.slice(0, 3).map((tag: string) => (
                    <span
                      key={tag}
                      className="text-[10px] font-semibold px-2 py-1 bg-slate-50 text-slate-600 rounded-md border border-slate-100"
                    >
                      {tag}
                    </span>
                  ));
                } catch (e) {
                  return null;
                }
              })()}
            </div>
          )}

          <div className="flex gap-2">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                if (onAnalyzeClick) onAnalyzeClick();
              }}
              className={`flex-1 ${
                uni.isExternal
                  ? "bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200"
                  : "bg-slate-900 hover:bg-slate-800 text-white shadow-md shadow-slate-200 border-transparent"
              } py-2.5 rounded-xl font-bold text-xs transition-all border cursor-pointer flex items-center justify-center gap-2`}
            >
              {uni.isExternal ? (
                <>
                  <Sparkles className="w-3 h-3" /> AI Analyze
                </>
              ) : (
                "View Analysis"
              )}
            </motion.button>
            {/* Only show Shortlist button if NOT in Manage/Lock mode */}
            {!uni.isExternal && !showLockAction && (
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={async (e) => {
                  e.preventDefault();
                  const invalidating = isLiked;
                  setIsLiked(!isLiked); // Optimistic

                  try {
                    const method = invalidating ? "DELETE" : "POST";
                    let url = "/api/shortlist";
                    if (invalidating) url += `?universityId=${uni.id}`;

                    await fetch(url, {
                      method: method,
                      body: invalidating
                        ? undefined
                        : JSON.stringify({ universityId: uni.id }),
                      headers: invalidating
                        ? {}
                        : { "Content-Type": "application/json" },
                    });

                    if (onShortlistToggle) onShortlistToggle(!invalidating);
                  } catch (error) {
                    setIsLiked(invalidating); // Revert
                  }
                }}
                className={`flex-1 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1 cursor-pointer group/btn ${
                  isLiked
                    ? "bg-emerald-50 text-emerald-700 hover:bg-rose-50 hover:text-rose-600 border border-emerald-200 hover:border-rose-200 shadow-sm"
                    : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:text-slate-900 shadow-sm"
                }`}
              >
                {isLiked ? (
                  <>
                    <span className="flex items-center gap-1 group-hover/btn:hidden">
                      <Check className="w-3 h-3" /> Saved
                    </span>
                    <span className="hidden group-hover/btn:flex items-center gap-1">
                      <X className="w-3 h-3" /> Remove
                    </span>
                  </>
                ) : (
                  <>
                    <Heart className="w-3 h-3" /> Shortlist
                  </>
                )}
              </motion.button>
            )}

            {showLockAction && (
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={async (e) => {
                  e.preventDefault();

                  // Toggle Lock State
                  const newLocked = !isLockedState;
                  setIsLockedState(newLocked);
                  if (onLockToggle) onLockToggle(newLocked);

                  try {
                    await fetch("/api/shortlist/lock", {
                      method: "POST",
                      body: JSON.stringify({
                        universityId: uni.id,
                        isLocked: newLocked,
                      }),
                      headers: { "Content-Type": "application/json" },
                    });

                    // If unlocking, maybe refresh or toast?
                  } catch (err) {
                    setIsLockedState(!newLocked); // Revert on failure
                  }
                }}
                className={`flex-1 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1 cursor-pointer text-white shadow-md group/lock ${
                  isLockedState
                    ? "bg-emerald-600 hover:bg-rose-600 shadow-emerald-200 hover:shadow-rose-200"
                    : "bg-slate-900 hover:bg-indigo-600 shadow-indigo-200"
                }`}
              >
                {isLockedState ? (
                  <>
                    <span className="flex items-center gap-1 group-hover/lock:hidden">
                      <Check className="w-3 h-3" /> Locked
                    </span>
                    <span className="hidden group-hover/lock:flex items-center gap-1">
                      <X className="w-3 h-3" /> Unlock
                    </span>
                  </>
                ) : (
                  "Lock University"
                )}
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
