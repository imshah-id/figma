"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mic, Send, Sparkles } from "lucide-react";

interface LiveInterviewProps {
  onNext: () => void;
  onBack: () => void;
}

const LiveInterview: React.FC<LiveInterviewProps> = ({ onNext, onBack }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-[900px] w-full bg-[#F8FAFC] rounded-[32px] shadow-2xl overflow-hidden flex flex-col relative z-10"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-slate-50 bg-white">
        <div className="flex items-center gap-3">
          <div className="relative p-[2px] rounded-full bg-gradient-to-tr from-[#2563EB] to-[#A855F7] shadow-sm">
            <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-white bg-white">
              <img
                src="/Image (AI Assistant).png"
                alt="DeepCampus Assistant"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold text-slate-900">
              DeepCampus Assistant
            </span>
            <span className="text-xs font-semibold text-[#2563EB]">
              Interviewing
            </span>
          </div>
        </div>

        {/* Progress Dots */}
        <div className="flex gap-1.5 items-center">
          <div className="h-1.5 w-6 list-none rounded-full bg-[#2563EB]" />
          <div className="h-1.5 w-6 list-none rounded-full bg-slate-100" />
          <div className="h-1.5 w-6 list-none rounded-full bg-slate-100" />
          <div className="h-1.5 w-6 list-none rounded-full bg-slate-100" />
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 p-10 min-h-[400px] flex flex-col items-start">
        <div className="flex items-start gap-4 w-full">
          <div className="w-10 h-10 rounded-full bg-[#E5EDFF] flex items-center justify-center shrink-0 mt-1">
            <Sparkles size={20} className="text-[#2563EB]" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-[80%] bg-white rounded-3xl p-6 shadow-sm border border-slate-100"
          >
            <p className="text-slate-600 text-lg leading-relaxed font-medium">
              What specific field of study or major are you most interested in
              pursuing?
            </p>
          </motion.div>
        </div>
      </div>

      {/* Footer / Input Area */}
      <div className="p-6 border-t border-slate-50 bg-white">
        <div className="flex items-center gap-4">
          <button className="p-3 text-slate-400 hover:text-[#2563EB] transition-colors">
            <Mic size={24} />
          </button>

          <div className="flex-1 flex items-center gap-3">
            <input
              type="text"
              placeholder="Type your answer..."
              className="flex-1 bg-[#F1F5F9] border-none rounded-2xl py-4 px-6 text-slate-700 placeholder:text-slate-400 focus:ring-2 focus:ring-[#2563EB]/20 transition-all text-base"
              onKeyDown={(e) => {
                if (e.key === "Enter") onNext();
              }}
            />
            <button
              onClick={onNext}
              className="shrink-0 w-12 h-12 bg-[#F1F5F9] hover:bg-[#2563EB] text-[#2563EB] hover:text-white rounded-xl flex items-center justify-center transition-all shadow-sm hover:shadow-md group"
            >
              <Send
                size={18}
                strokeWidth={2.5}
                className="group-hover:scale-110 transition-transform"
              />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LiveInterview;
