import React from "react";
import { motion } from "framer-motion";
import { Mic } from "lucide-react";

interface Step3BudgetProps {
  formData: any;
  updateFormData: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
}

const Step3Budget: React.FC<Step3BudgetProps> = ({
  formData,
  updateFormData,
  onNext,
  onBack,
}) => {
  const budgets = ["$10k", "$50k", "$100k+"];

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
            Budget & Finance
          </h1>
          <p className="text-slate-500 text-lg">
            Tell us a bit about yourself so our AI can guide you better.
          </p>
        </div>
        <button className="p-3 bg-slate-100 rounded-full text-slate-400 hover:bg-slate-200 transition-colors">
          <Mic className="w-6 h-6" />
        </button>
      </div>

      <div className="space-y-10">
        {/* Budget Selection */}
        <div className="space-y-6">
          <label className="text-base font-semibold text-slate-800">
            Annual Budget (USD)
          </label>
          <div className="flex justify-between items-center px-2">
            {budgets.map((budget) => (
              <button
                key={budget}
                onClick={() => updateFormData({ budget })}
                className={`text-base font-bold transition-all duration-200 ${
                  formData.budget === budget
                    ? "text-blue-600 scale-110"
                    : "text-slate-400 hover:text-slate-600"
                }`}
              >
                {budget}
              </button>
            ))}
          </div>
        </div>

        {/* Scholarship Option Card */}
        <div
          onClick={() =>
            updateFormData({ financialAid: !formData.financialAid })
          }
          className={`p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer flex items-center gap-5 ${
            formData.financialAid
              ? "border-blue-500 bg-blue-50/30"
              : "border-slate-100 bg-white hover:border-slate-200"
          }`}
        >
          <div
            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
              formData.financialAid ? "border-blue-600" : "border-slate-300"
            }`}
          >
            {formData.financialAid && (
              <div className="w-3 h-3 rounded-full bg-blue-600" />
            )}
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-slate-900">
              I need financial aid / scholarships
            </h3>
            <p className="text-slate-500">
              We'll prioritize universities with good aid packages.
            </p>
          </div>
        </div>
      </div>

      <div className="pt-4">
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
      </div>
    </motion.div>
  );
};

export default Step3Budget;
