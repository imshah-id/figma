import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

interface OnboardingLayoutProps {
  currentStep: number;
  totalSteps: number;
  onBack?: () => void;
  onSkip?: () => void;
  children: React.ReactNode;
}

const OnboardingLayout: React.FC<OnboardingLayoutProps> = ({
  currentStep,
  totalSteps,
  onBack,
  onSkip,
  children,
}) => {
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="min-h-screen bg-[url('/background.png')] bg-cover bg-center flex flex-col font-sans text-slate-900 relative">
      {/* Light overlay for better contrast */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px] z-0"></div>

      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 md:px-12 md:py-6 relative z-10 bg-white border-b border-slate-100">
        <div className="flex items-center gap-4">
          <span className="text-lg font-bold text-slate-900">
            Setup Profile
          </span>
          {currentStep > 0 && (
            <span className="text-lg text-slate-400">
              / Step {currentStep} of {totalSteps}
            </span>
          )}
        </div>

        <button
          onClick={onSkip}
          className="text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors px-3 py-1.5 rounded-lg hover:bg-slate-50"
        >
          Skip for now
        </button>
      </header>

      {/* Progress Bar (Optional - keeping if desired, but making it subtle or removing if not in screenshot. Screenshot doesn't show a top progress bar, just Step X of 7 text. I will keep it simple/hidden for now or move it to top of card?) */}
      <div className="h-1 bg-slate-200/30 w-full relative overflow-hidden z-10">
        <motion.div
          className="absolute left-0 top-0 bottom-0 bg-blue-600"
          initial={{ width: 0 }}
          animate={{ width: `${progressPercentage}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-6 w-full relative z-10">
        <div className="bg-white rounded-3xl shadow-xl w-full max-w-4xl p-8 md:p-12 min-h-[600px] flex flex-col justify-center">
          {onBack && currentStep > 1 && (
            <button
              onClick={onBack}
              className="self-start mb-6 flex items-center gap-2 text-slate-400 hover:text-slate-600 transition-colors"
            ></button>
          )}
          {/* The Back button is often inside the steps in the screenshots (e.g. "Back" button next to "Next Step"). 
                I will remove the top-left back button from here if the steps provide it. 
                Existing steps define their own structure but might need a wrapper adjustments. 
                Actually, the screenshots show "Back" and "Next Step" buttons at the bottom.
                I will render content here.
            */}
          <div className="w-full">{children}</div>
        </div>
      </main>
    </div>
  );
};

export default OnboardingLayout;
