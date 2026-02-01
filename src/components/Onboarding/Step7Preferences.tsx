import React from "react";
import { motion } from "framer-motion";
import { Mic } from "lucide-react";

interface Step7PreferencesProps {
  formData: any;
  updateFormData: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
}

interface PreferenceOption {
  id: string;
  label: string;
}

const PREFERENCE_OPTIONS: PreferenceOption[] = [
  { id: "prestige", label: "Prestige / Ranking" },
  { id: "cost", label: "Low Cost" },
  { id: "career", label: "Career Outcomes" },
  { id: "campus", label: "Campus Life" },
  { id: "location", label: "Location / Safety" },
  { id: "research", label: "Research Opportunities" },
];

const Step7Preferences: React.FC<Step7PreferencesProps> = ({
  formData,
  updateFormData,
  onNext,
  onBack,
}) => {
  const selected = formData.preferences || [];

  const toggleOption = (id: string) => {
    const newSelected = selected.includes(id)
      ? selected.filter((item: string) => item !== id)
      : [...selected, id];
    updateFormData({ preferences: newSelected });
  };

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
            Preferences
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
        <p className="text-base font-semibold text-slate-800">
          What matters most to you?
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PREFERENCE_OPTIONS.map((option) => {
            const isSelected = selected.includes(option.id);
            return (
              <button
                key={option.id}
                onClick={() => toggleOption(option.id)}
                className={`p-4 rounded-xl border-2 flex items-center gap-4 transition-all duration-300 ${
                  isSelected
                    ? "border-blue-500 bg-blue-50/30"
                    : "border-slate-100 bg-white hover:border-slate-200 shadow-sm"
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                    isSelected ? "border-blue-600" : "border-slate-300"
                  }`}
                >
                  {isSelected && (
                    <div className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                  )}
                </div>
                <span
                  className={`font-semibold text-slate-700 ${
                    isSelected ? "text-blue-900" : ""
                  }`}
                >
                  {option.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="pt-4 flex gap-4">
        <button
          onClick={onBack}
          className="flex-1 bg-white border-2 border-slate-100 text-slate-600 font-bold px-8 py-4 rounded-xl hover:bg-slate-50 transition-all font-sans"
        >
          Back
        </button>
        <button
          onClick={onNext}
          className="flex-[2] bg-[#2563EB] text-white font-bold px-8 py-4 rounded-xl hover:bg-blue-600 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
        >
          Complete Profile
        </button>
      </div>
    </motion.div>
  );
};

export default Step7Preferences;
