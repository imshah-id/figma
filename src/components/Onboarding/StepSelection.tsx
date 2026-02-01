import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mic, ListChecks, Check, ArrowRight } from "lucide-react";

interface StepSelectionProps {
  onSelectMethod: (method: "manual" | "voice") => void;
  onBack: () => void;
}

const StepSelection: React.FC<StepSelectionProps> = ({
  onSelectMethod,
  onBack,
}) => {
  const [selected, setSelected] = useState<"manual" | "voice" | null>(null);

  const handleContinue = () => {
    if (selected) {
      onSelectMethod(selected);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-4xl w-full bg-white rounded-3xl shadow-xl p-8 md:p-12 relative z-10"
    >
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
          How would you like to start?
        </h1>
        <p className="text-slate-500 text-lg max-w-xl mx-auto">
          Choose the method that works best for you. We can guide you manually
          or let AI handle the heavy lifting.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 relative">
        {/* Manual Setup Card */}
        <div
          onClick={() => setSelected("manual")}
          className={`relative p-8 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
            selected === "manual"
              ? "border-blue-500 bg-blue-50 shadow-md ring-1 ring-blue-500"
              : "border-slate-200 hover:border-blue-300 hover:bg-slate-50"
          }`}
        >
          <div className="flex justify-between items-start mb-6">
            <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
              <ListChecks size={24} />
            </div>
            <div
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                selected === "manual"
                  ? "border-blue-500 bg-blue-500 text-white"
                  : "border-slate-300"
              }`}
            >
              {selected === "manual" && <Check size={14} strokeWidth={3} />}
            </div>
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">
            Manual Setup
          </h3>
          <p className="text-slate-500 leading-relaxed">
            Follow a detailed step-by-step guide to configure everything exactly
            how you want it.
          </p>
        </div>

        {/* AI Voice Input Card */}
        <div
          onClick={() => setSelected("voice")}
          className={`relative p-8 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
            selected === "voice"
              ? "border-blue-500 bg-blue-50 shadow-md ring-1 ring-blue-500"
              : "border-slate-200 hover:border-blue-300 hover:bg-slate-50"
          }`}
        >
          {/* Recommended Badge */}
          <div className="absolute -top-3 right-8 bg-[#2563EB] text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg z-10">
            Recommended
          </div>

          <div className="flex justify-between items-start mb-6">
            <div className="w-12 h-12 rounded-xl bg-[#2563EB] flex items-center justify-center text-white">
              <Mic size={24} />
            </div>
            <div
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                selected === "voice"
                  ? "border-blue-500 bg-blue-500 text-white"
                  : "border-slate-300"
              }`}
            >
              {selected === "voice" && <Check size={14} strokeWidth={3} />}
            </div>
          </div>
          <h3 className="text-xl font-bold text-[#2563EB] mb-2">
            AI Voice Input
          </h3>
          <p className="text-slate-500 leading-relaxed">
            Simply speak your preferences and let our advanced AI configure the
            settings for you.
          </p>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <button
          onClick={onBack}
          className="text-slate-500 hover:text-slate-800 font-medium px-4 py-2 rounded-lg transition-colors"
        >
          Back
        </button>

        {selected && (
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={handleContinue}
            className="bg-[#2563EB] text-white font-semibold px-8 py-3 rounded-xl hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-200 flex items-center gap-2"
          >
            Next <ArrowRight size={18} />
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export default StepSelection;
