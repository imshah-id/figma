import React from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, MessageSquare, ArrowLeft } from "lucide-react";
// Assuming we might substitute the avatar image with a placeholder or generate one,
// but for now I'll use a div or a standard placeholder if no asset provided.
// The user provided uploaded images, I'll use a placeholder for the avatar in code
// and they can replace it or I can try to access the uploaded one if known,
// using a generic robot/AI icon for now to be safe.

interface CalibrationIntroProps {
  onStart: () => void;
  onBack: () => void;
}

const CalibrationIntro: React.FC<CalibrationIntroProps> = ({
  onStart,
  onBack,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-4xl w-full bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row items-stretch relative z-10"
    >
      {/* Left Side: Avatar & Name */}
      <div className="flex-1 bg-gradient-to-b from-[#BEDBFF]/50 to-[#E9D4FF]/50 p-8 md:p-12 flex flex-col items-center justify-center text-center">
        <div className="w-48 h-48 rounded-full bg-white/20 border-4 border-white/30 shadow-2xl flex items-center justify-center mb-6 overflow-hidden relative group">
          <img
            src="/Image (AI Assistant).png"
            alt="AI Assistant"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">
          DeepCampus Assistant
        </h2>
        <div className="flex items-center gap-2 text-sm font-semibold text-blue-600 bg-white/50 backdrop-blur-sm px-4 py-1.5 rounded-full shadow-sm">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          Online • AI Powered
        </div>
      </div>

      {/* Right Side: Content */}
      <div className="flex-[1.5] w-full p-8 md:p-12 space-y-8">
        <div>
          <div className="flex items-center gap-2 text-[#2563EB] font-bold text-sm tracking-wider uppercase mb-3">
            <Sparkles size={16} />
            Personalization
          </div>
          <h1 className="text-4xl font-bold text-slate-900 leading-tight mb-2">
            Let's calibrate your profile for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              DeepCampusAI
            </span>
          </h1>
        </div>

        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 flex gap-4">
          <div className="shrink-0 mt-1">
            <MessageSquare className="text-blue-500" size={24} />
          </div>
          <p className="text-slate-600 text-lg leading-relaxed">
            "I'll ask you a few quick questions about your interests and goals.
            This helps me formulate accurate insights about your future
            prospects."
          </p>
        </div>

        <div className="flex justify-between items-center pt-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-slate-500 hover:text-slate-800 font-medium px-4 py-2 rounded-lg transition-colors"
          >
            <ArrowLeft size={18} />
            Back
          </button>

          <button
            onClick={onStart}
            className="bg-[#2563EB] text-white font-bold px-8 py-3.5 rounded-xl hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-200 flex items-center gap-2"
          >
            Let's Start <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default CalibrationIntro;
