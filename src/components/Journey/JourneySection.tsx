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
      <h3 className="mb-4 text-lg font-bold text-text-primary">Your Journey</h3>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
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
                className={`flex h-[130px] flex-col rounded-xl border bg-card p-4 transition-all ${isActive ? "border-text-primary bg-gray-50" : "border-card-border"}`}
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
