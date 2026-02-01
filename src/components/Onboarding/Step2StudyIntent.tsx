import React from "react";
import { motion } from "framer-motion";
import { Mic } from "lucide-react";

interface Step2StudyIntentProps {
  formData: any;
  updateFormData: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
}

const Step2StudyIntent: React.FC<Step2StudyIntentProps> = ({
  formData,
  updateFormData,
  onNext,
  onBack,
}) => {
  const degrees = ["Bachelor's", "Master's", "MBA", "PhD"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            Study Intent
          </h1>
          <p className="text-slate-500 text-lg">
            Tell us a bit about yourself so our AI can guide you better.
          </p>
        </div>
        <button className="p-3 bg-slate-100 rounded-full text-slate-400 hover:bg-slate-200 transition-colors">
          <Mic className="w-6 h-6" />
        </button>
      </div>

      <div className="space-y-6">
        {/* Degree Selection */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-slate-700 uppercase tracking-wider">
            Degree to pursue
          </label>
          <div className="flex flex-row flex-wrap gap-2">
            {degrees.map((degree) => (
              <button
                key={degree}
                onClick={() => updateFormData({ degree })}
                className={`py-2 px-4 rounded-lg border-2 text-center transition-all duration-200 text-sm ${
                  formData.degree === degree
                    ? "border-blue-600 bg-blue-50 text-slate-900 shadow-sm"
                    : "border-slate-200 bg-white text-slate-900 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                <span className="font-bold">{degree}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Major and Start Year - now in two rows (stacked) */}
        <div className="space-y-6">
          <div className="space-y-3">
            <label className="text-sm font-semibold text-slate-700 uppercase tracking-wider">
              Intended Major
            </label>
            <input
              type="text"
              placeholder="e.g. Computer Science"
              value={formData.major || ""}
              onChange={(e) => updateFormData({ major: e.target.value })}
              className="w-full p-4 rounded-xl border-2 border-slate-200 bg-white text-slate-900 focus:border-blue-500 focus:ring-0 outline-none transition-all"
            />
          </div>
          <div className="space-y-3">
            <label className="text-sm font-semibold text-slate-700 uppercase tracking-wider">
              Target Start Year
            </label>
            <input
              type="number"
              placeholder="2025"
              value={formData.startYear || ""}
              onChange={(e) => updateFormData({ startYear: e.target.value })}
              className="w-full p-4 rounded-xl border-2 border-slate-200 bg-white text-slate-900 focus:border-blue-500 focus:ring-0 outline-none transition-all"
            />
          </div>
        </div>
      </div>

      <div className="pt-4 flex gap-4">
        <button
          onClick={onBack}
          className="flex-1 bg-white border-2 border-slate-200 text-slate-600 font-bold px-8 py-4 rounded-xl hover:bg-slate-50 transition-all"
        >
          Back
        </button>
        <button
          onClick={onNext}
          className="flex-[2] bg-[#2563EB] text-white font-bold px-8 py-4 rounded-xl hover:bg-blue-600 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
        >
          Next Step <span className="text-xl">→</span>
        </button>
      </div>
    </motion.div>
  );
};

export default Step2StudyIntent;
