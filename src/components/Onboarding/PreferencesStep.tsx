"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight, ArrowLeft } from "lucide-react";

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

export default function PreferencesStep() {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleOption = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  return (
    <div className="flex min-h-screen flex-col bg-background text-text-primary">
      {/* Header */}
      <header className="flex h-16 items-center justify-between border-b border-card-border bg-white px-8">
        <div className="flex items-center gap-2 text-base font-semibold">
          <span className="text-text-primary">Setup Profile</span>
          <span className="text-text-secondary font-normal">/</span>
          <span className="text-text-secondary font-normal">Step 7 of 7</span>
        </div>
        <button className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">
          Skip for now
        </button>
      </header>

      {/* Progress Bar Container */}
      <div className="w-full bg-[#E2E8F0]">
        <div className="h-1 w-full bg-accent-blue" />
      </div>

      {/* Main Content */}
      <main className="flex flex-1 items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-[672px] rounded-2xl border border-card-border bg-white p-12 shadow-[0_1px_2px_rgba(0,0,0,0.1),0_1px_3px_rgba(0,0,0,0.1)]"
        >
          <div className="mb-8">
            <h1 className="mb-2 text-[24px] font-bold tracking-tight text-text-primary">
              Preferences
            </h1>
            <p className="text-base text-text-secondary">
              Tell us a bit about yourself so our AI can guide you better.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="mb-3 text-base font-medium text-[#314158]">
              What matters most to you?
            </h2>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {PREFERENCE_OPTIONS.map((option) => (
                <button
                  key={option.id}
                  onClick={() => toggleOption(option.id)}
                  className={`flex h-[46px] items-center justify-between rounded-xl border px-4 transition-all ${
                    selected.includes(option.id)
                      ? "border-primary bg-primary/5 ring-1 ring-primary"
                      : "border-card-border bg-white hover:border-text-secondary"
                  }`}
                >
                  <span className="text-sm font-medium">{option.label}</span>
                  <div
                    className={`flex h-4.5 w-4.5 items-center justify-center rounded-full border ${
                      selected.includes(option.id)
                        ? "border-primary bg-primary"
                        : "border-card-border bg-white"
                    }`}
                  >
                    {selected.includes(option.id) && (
                      <div className="h-1.5 w-1.5 rounded-full bg-white" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-4 sm:flex-row">
            <button className="flex h-[50px] flex-1 items-center justify-center rounded-xl border border-card-border bg-white text-base font-medium text-[#45556E] hover:bg-gray-50 transition-colors">
              Back
            </button>
            <button className="flex h-[50px] flex-1 items-center justify-center gap-2 rounded-xl bg-primary text-base font-semibold text-white shadow-lg transition-all hover:bg-primary/90 hover:shadow-xl active:scale-[0.98]">
              Complete Profile
              <ChevronRight size={20} />
            </button>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
