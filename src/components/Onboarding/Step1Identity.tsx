import React from "react";
import { motion } from "framer-motion";
import { Mic } from "lucide-react";

interface Step1IdentityProps {
  formData: any;
  updateFormData: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
}

const Step1Identity: React.FC<Step1IdentityProps> = ({
  formData,
  updateFormData,
  onNext,
  onBack,
}) => {
  const roles = [
    "High School Student",
    "Undergraduate Student",
    "Parent",
    "Counselor",
  ];

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
            Basic Identity
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
        {/* Role Selection */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-slate-700 uppercase tracking-wider">
            I am a...
          </label>
          <div className="relative">
            <select
              value={formData.role || ""}
              onChange={(e) => updateFormData({ role: e.target.value })}
              className="w-full p-4 rounded-xl border-2 border-slate-100 bg-white text-slate-900 focus:border-blue-500 focus:ring-0 outline-none transition-all appearance-none cursor-pointer"
            >
              <option value="" disabled>
                &nbsp;
              </option>
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* DOB and Graduation Year in one row */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-3">
            <label className="text-sm font-semibold text-slate-700 uppercase tracking-wider">
              Date of Birth
            </label>
            <input
              type={formData.dob ? "date" : "text"}
              onFocus={(e) => (e.target.type = "date")}
              onBlur={(e) => {
                if (!e.target.value) e.target.type = "text";
              }}
              value={formData.dob || ""}
              onChange={(e) => updateFormData({ dob: e.target.value })}
              className="w-full p-4 rounded-xl border-2 border-slate-100 bg-white text-slate-900 focus:border-blue-500 focus:ring-0 outline-none transition-all"
            />
          </div>
          <div className="space-y-3">
            <label className="text-sm font-semibold text-slate-700 uppercase tracking-wider">
              Graduation Year
            </label>
            <input
              type="number"
              placeholder="2024"
              value={formData.gradYear || ""}
              onChange={(e) => updateFormData({ gradYear: e.target.value })}
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

export default Step1Identity;
