"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import OnboardingLayout from "@/components/Onboarding/OnboardingLayout";
import { toast } from "sonner";
import Step1Identity from "@/components/Onboarding/Step1Identity";
import Step2StudyIntent from "@/components/Onboarding/Step2StudyIntent";
import Step3Budget from "@/components/Onboarding/Step3Budget";
import Step4Academic from "@/components/Onboarding/Step4Academic";
import Step5Exams from "@/components/Onboarding/Step5Exams";
import Step6Documents from "@/components/Onboarding/Step6Documents";
import Step7Preferences from "@/components/Onboarding/Step7Preferences";
import StepSelection from "@/components/Onboarding/StepSelection";
import CalibrationIntro from "@/components/Onboarding/CalibrationIntro";
import LiveInterview from "@/components/Onboarding/LiveInterview";

export default function OnboardingPage() {
  const router = useRouter();
  // using 0 for Selection, 0.5 for Calibration, 1+ for Standard Flow
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    // Step 0
    setupMethod: "manual", // manual | voice
    // Step 1
    role: "",
    dob: "",
    gradYear: "",
    // Step 2
    degree: "",
    major: "",
    startYear: "",
    // Step 3
    budget: "",
    financialAid: false,
    // Step 4
    gradingScale: "",
    gpa: "",
    // Step 5
    exams: {},
    // Step 6
    sopStatus: "",
    lorCount: "",
    // Step 7
    preferences: [],
  });

  const totalSteps = 7;

  const updateFormData = (data: any) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo(0, 0);
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    if (currentStep === 0.5) {
      setCurrentStep(0);
    } else if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    } else if (currentStep === 1) {
      // If manual was selected, go back to Selection screen (0)
      // If voice was selected, go back to Calibration screen (0.5)
      if (formData.setupMethod === "voice") {
        setCurrentStep(0.5);
      } else {
        setCurrentStep(0);
      }
    }
  };

  const handleStepSelection = (method: "manual" | "voice") => {
    updateFormData({ setupMethod: method });
    if (method === "voice") {
      // AI Voice Input path goes to Calibration Intro
      setCurrentStep(0.5);
    } else {
      // Manual path goes directly to Step 1
      setCurrentStep(1);
    }
  };

  const handleCalibrationStart = () => {
    if (formData.setupMethod === "voice") {
      setCurrentStep(0.6);
    } else {
      setCurrentStep(1);
    }
  };

  const handleCalibrationBack = () => {
    setCurrentStep(0);
  };

  const handleSkip = () => {
    router.push("/");
  };

  const handleComplete = async () => {
    // Submit data to API
    try {
      const response = await fetch("/api/onboarding", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData, // Spread all fields
          isFinal: true, // Mark as final submission

          // Map frontend fields to backend schema expectation if needed
          targetDegree: formData.degree,
          targetMajor: formData.major,
          targetIntake: formData.startYear,
          gpa: formData.gpa,
          budget: formData.budget,
          preferredCountries: formData.preferences,
          // Add default or mapped fields
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save profile");
      }

      console.log("Onboarding Complete!");
      router.push("/dashboard");
    } catch (error) {
      console.error("Submission error", error);
      // Fallback redirect for now, or show error
      router.push("/dashboard");
    }
  };

  const renderStep = () => {
    const props = {
      formData,
      updateFormData,
      onNext: handleNext,
      onBack: handleBack,
    };
    switch (currentStep) {
      case 1:
        return <Step1Identity {...props} />;
      case 2:
        return <Step2StudyIntent {...props} />;
      case 3:
        return <Step3Budget {...props} />;
      case 4:
        return <Step4Academic {...props} />;
      case 5:
        return <Step5Exams {...props} />;
      case 6:
        return <Step6Documents {...props} />;
      case 7:
        return <Step7Preferences {...props} />;
      default:
        return null;
    }
  };

  // Intro Steps (Pre-Onboarding Layout)
  if (currentStep === 0) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center p-4 bg-[url('/background.png')] bg-cover bg-center relative overflow-hidden">
        {/* Light overlay for better contrast */}
        <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px]"></div>
        <StepSelection
          onSelectMethod={handleStepSelection}
          onBack={() => router.push("/")}
        />
      </div>
    );
  }

  if (currentStep === 0.5) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center p-4 bg-[url('/background.png')] bg-cover bg-center relative overflow-hidden">
        {/* Light overlay for better contrast */}
        <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px]"></div>
        <CalibrationIntro
          onStart={handleCalibrationStart}
          onBack={handleCalibrationBack}
        />
      </div>
    );
  }

  if (currentStep === 0.6) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center p-4 bg-[url('/background.png')] bg-cover bg-center relative overflow-hidden">
        <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px]"></div>
        <LiveInterview
          onNext={() => setCurrentStep(1)}
          onBack={() => setCurrentStep(0.5)}
        />
      </div>
    );
  }

  // Main Flow
  return (
    <OnboardingLayout
      currentStep={currentStep}
      totalSteps={totalSteps}
      onBack={currentStep >= 1 ? handleBack : undefined}
      onSkip={handleSkip}
    >
      <AnimatePresence mode="wait">{renderStep()}</AnimatePresence>
    </OnboardingLayout>
  );
}
