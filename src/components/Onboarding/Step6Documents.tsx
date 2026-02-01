import React from "react";
import { motion } from "framer-motion";
import { Mic } from "lucide-react";

interface Step6DocumentsProps {
  formData: any;
  updateFormData: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
}

const Step6Documents: React.FC<Step6DocumentsProps> = ({
  formData,
  updateFormData,
  onNext,
  onBack,
}) => {
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
            Documents
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
        {/* SOP Status */}
        <div className="space-y-3">
          <label className="text-base font-semibold text-slate-800">
            Statement of Purpose (SOP) Status
          </label>
          <input
            type="text"
            value={formData.sopStatus || ""}
            onChange={(e) => updateFormData({ sopStatus: e.target.value })}
            className="w-full p-4 rounded-xl border-2 border-slate-100 bg-white text-slate-900 focus:border-blue-500 focus:ring-0 outline-none transition-all placeholder:text-slate-300"
            placeholder=""
          />
        </div>

        {/* LOR Count */}
        <div className="space-y-3">
          <label className="text-base font-semibold text-slate-800">
            Letters of Recommendation (LORs)
          </label>
          <input
            type="text"
            placeholder="How many do you have?"
            value={formData.lorCount || ""}
            onChange={(e) => updateFormData({ lorCount: e.target.value })}
            className="w-full p-4 rounded-xl border-2 border-slate-100 bg-white text-slate-900 focus:border-blue-500 focus:ring-0 outline-none transition-all placeholder:text-slate-300"
          />
        </div>
      </div>

      <div className="pt-4 flex gap-4">
        <button
          onClick={onBack}
          className="flex-1 bg-white border-2 border-slate-100 text-slate-600 font-bold px-8 py-4 rounded-xl hover:bg-slate-50 transition-all"
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

export default Step6Documents;
