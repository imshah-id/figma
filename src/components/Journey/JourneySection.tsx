"use client";
import React from "react";
import { CircleCheck, Circle, Clock } from "lucide-react";
import { motion } from "framer-motion";

export default function JourneySection() {
  const steps = [
    {
      id: 1,
      title: "Building Profile",
      description: "Complete your information",
      status: "completed",
    },
    {
      id: 2,
      title: "Discovering Universities",
      description: "Explore your options",
      status: "active",
    },
    {
      id: 3,
      title: "Finalizing Universities",
      description: "Lock your choices",
      status: "upcoming",
    },
    {
      id: 4,
      title: "Preparing Applications",
      description: "Submit your applications",
      status: "upcoming",
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.0 }}
      className="flex-shrink-0"
    >
      <h3 className="mb-6 text-lg font-bold tracking-tight text-text-primary">
        Your Journey
      </h3>

      {/* Premium Vertical Timeline for Mobile */}
      <div className="md:hidden">
        <div className="relative flex flex-col gap-0 pl-1">
          {/* Vertical Track with Gradient */}
          <div className="absolute left-[19px] top-6 bottom-6 w-[1.5px] bg-gradient-to-b from-gray-200 via-gray-300 to-gray-200" />

          {steps.map((step, index) => {
            const isCompleted = step.status === "completed";
            const isActive = step.status === "active";

            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="relative flex items-stretch gap-6 pb-8 last:pb-0"
              >
                {/* Indicator Container */}
                <div className="relative z-10 flex shrink-0 items-start justify-center pt-1.5">
                  {isActive ? (
                    <div className="relative">
                      {/* Active Glow Effect */}
                      <motion.div
                        animate={{
                          scale: [1, 1.4, 1],
                          opacity: [0.3, 0.6, 0.3],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute -inset-2 rounded-full bg-primary/20 blur-sm"
                      />
                      <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary bg-white shadow-sm transition-all duration-300">
                        <motion.div
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="h-3 w-3 rounded-full bg-primary shadow-[0_0_8px_rgba(0,0,0,0.2)]"
                        />
                      </div>
                    </div>
                  ) : (
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full border-[1.5px] shadow-sm transition-all duration-300
                      ${isCompleted ? "border-accent-green bg-accent-green/5 text-accent-green" : "border-gray-200 bg-white text-gray-400"}`}
                    >
                      {isCompleted ? (
                        <CircleCheck size={18} />
                      ) : (
                        <Circle size={8} fill="currentColor" strokeWidth={0} />
                      )}
                    </div>
                  )}
                </div>

                {/* Content Card with Glassmorphism feel */}
                <div
                  className={`group relative flex flex-1 flex-col rounded-2xl border p-5 transition-all duration-300 
                    ${
                      isActive
                        ? "border-primary/20 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.06)] ring-1 ring-primary/5"
                        : "border-gray-100 bg-white/50 hover:bg-white hover:shadow-md"
                    }`}
                >
                  <div className="mb-1.5 flex items-center justify-between">
                    <span
                      className={`text-[10px] font-black uppercase tracking-[0.1em] 
                      ${isCompleted ? "text-accent-green" : isActive ? "text-primary" : "text-gray-400"}`}
                    >
                      Stage {step.id}
                    </span>
                    {isActive && (
                      <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">
                        CURRENT STAGE
                      </span>
                    )}
                  </div>
                  <h4
                    className={`text-base font-bold tracking-tight transition-colors 
                    ${isActive ? "text-text-primary" : "text-gray-600"}`}
                  >
                    {step.title}
                  </h4>
                  <p className="mt-1 text-[13px] leading-relaxed text-text-secondary/80">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Desktop Grid Layout (hidden on mobile) */}
      <div className="hidden grid-cols-1 gap-6 md:grid md:grid-cols-2 xl:grid-cols-4">
        {steps.map((step, index) => {
          const isCompleted = step.status === "completed";
          const isActive = step.status === "active";

          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.1, delay: 0.0 + index * 0.05 }}
              whileHover={{ y: -4 }}
              className="flex flex-col gap-4"
            >
              {isActive ? (
                <motion.div
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="h-1 w-full rounded-sm bg-text-primary"
                />
              ) : (
                <div
                  className={`h-1 w-full rounded-sm ${isCompleted ? "bg-text-primary" : "bg-gray-200"}`}
                />
              )}
              <div
                className={`flex min-h-[110px] flex-col rounded-xl border bg-card p-4 transition-all md:h-[130px] ${isActive ? "border-text-primary bg-gray-50" : "border-card-border"}`}
              >
                <div
                  className={`mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wide ${isCompleted ? "text-accent-green" : isActive ? "text-text-primary" : "text-text-tertiary"}`}
                >
                  {isCompleted ? (
                    <CircleCheck size={14} />
                  ) : isActive ? (
                    <Circle size={14} fill="currentColor" />
                  ) : (
                    <Clock size={14} />
                  )}
                  <span>Stage {step.id}</span>
                </div>
                <h4 className="mb-2 text-[17px] font-bold text-text-primary">
                  {step.title}
                </h4>
                <p className="text-sm leading-relaxed text-text-secondary">
                  {step.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}
