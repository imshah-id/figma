"use client";

import React from "react";
import { Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { STAGES, getStageIndex, STAGE_LABELS } from "@/lib/constants";

interface StageGuardProps {
  currentStage: string;
  requiredStage: string;
  children: React.ReactNode;
}

export default function StageGuard({
  currentStage,
  requiredStage,
  children,
}: StageGuardProps) {
  const router = useRouter();
  const currentIndex = getStageIndex(currentStage);
  const requiredIndex = getStageIndex(requiredStage);

  if (currentIndex >= requiredIndex) {
    return <>{children}</>;
  }

  return (
    <div className="flex h-[60vh] w-full flex-col items-center justify-center rounded-[2rem] border border-dashed border-gray-200 bg-gray-50/50 p-8 text-center">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-gray-200">
        <Lock className="h-8 w-8 text-gray-400" />
      </div>
      <h2 className="mb-2 text-2xl font-bold text-gray-900">Stage Locked</h2>
      <p className="mb-8 max-w-md text-gray-500">
        You need to reach the{" "}
        <strong>
          {STAGE_LABELS[requiredStage as keyof typeof STAGE_LABELS]}
        </strong>{" "}
        stage to access this section. Please complete the previous steps first.
      </p>

      <div className="flex flex-col gap-3">
        <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
          Current Stage:{" "}
          {STAGE_LABELS[currentStage as keyof typeof STAGE_LABELS] ||
            currentStage}
        </span>
        <button
          onClick={() => router.push("/dashboard")}
          className="rounded-xl bg-black px-6 py-3 text-sm font-bold text-white shadow-lg transition-transform active:scale-95"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
}
