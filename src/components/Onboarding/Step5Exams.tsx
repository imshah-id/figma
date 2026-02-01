import React from "react";
import { motion } from "framer-motion";
import { Mic } from "lucide-react";

interface Step5ExamsProps {
  formData: any;
  updateFormData: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
}

const Step5Exams: React.FC<Step5ExamsProps> = ({
  formData,
  updateFormData,
  onNext,
  onBack,
}) => {
  const examsList = [
    { id: "sat", label: "SAT" },
    { id: "act", label: "ACT" },
    { id: "gre", label: "GRE" },
    { id: "gmat", label: "GMAT" },
    { id: "ielts", label: "IELTS" },
    { id: "toefl", label: "TOEFL" },
  ];

  const handleScoreChange = (examId: string, score: string) => {
    const currentExams = formData.exams || {};
    updateFormData({
      exams: { ...currentExams, [examId]: { taken: !!score, score } },
    });
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
            Exams
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
          Have you taken any of these exams?
        </p>

        <div className="space-y-3">
          {examsList.map((exam) => (
            <div
              key={exam.id}
              className="p-4 rounded-lg border-2 border-slate-100 bg-white flex items-center justify-between"
            >
              <span className="font-bold text-slate-700 text-lg">
                {exam.label}
              </span>
              <div className="w-1/3">
                <input
                  type="text"
                  placeholder="Score (if taken)"
                  value={formData.exams?.[exam.id]?.score || ""}
                  onChange={(e) => handleScoreChange(exam.id, e.target.value)}
                  className="w-full p-2.5 rounded-md border border-slate-200 bg-slate-50/50 focus:border-blue-500 focus:bg-white outline-none text-sm font-semibold text-slate-900 placeholder:text-slate-400 text-center"
                />
              </div>
            </div>
          ))}
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

export default Step5Exams;
