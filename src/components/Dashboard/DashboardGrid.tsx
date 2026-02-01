"use client";
import React from "react";
import {
  ArrowRight,
  BookOpen,
  FileText,
  GraduationCap,
  LockKeyhole,
  AlertCircle,
} from "lucide-react";
import { motion } from "framer-motion";

export default function DashboardGrid({
  profile,
  stats = { shortlisted: 0, locked: 0, completedTasks: 0, totalTasks: 3 },
}: {
  profile?: any;
  stats?: {
    shortlisted: number;
    locked: number;
    completedTasks: number;
    totalTasks: number;
  };
}) {
  return (
    <div className="grid flex-1 grid-cols-1 items-start gap-6 md:grid-cols-2 lg:grid-cols-3">
      {/* Profile Strength Widget */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.1, delay: 0.0, ease: [0.23, 1, 0.32, 1] }}
        whileHover={{ y: -4 }}
        className="flex min-h-[480px] h-full flex-col overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-[0px_1px_2px_rgba(0,0,0,0.05),0px_8px_16px_-4px_rgba(0,0,0,0.1)] transition-all duration-300 hover:shadow-[0px_12px_24px_-12px_rgba(0,0,0,0.15)]"
      >
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-gray-900 tracking-tight">
            Profile Strength
          </h3>
        </div>
        <div className="flex flex-1 flex-col gap-2">
          {[
            {
              icon: BookOpen,
              label: "Academics",
              status: "Strong",
              type: "success",
            },
            {
              icon: FileText,
              label: "Exams",
              status: "Not Started",
              type: "gray",
            },
            {
              icon: GraduationCap,
              label: "SOP",
              status: "Not Started",
              type: "gray",
            },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between rounded-xl bg-white border border-[#E5E7EB]/50 p-4 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <item.icon size={22} className="text-gray-400" />
                <span className="text-lg font-semibold text-gray-700">
                  {item.label}
                </span>
              </div>
              <span
                className={`rounded-full px-5 py-2 text-xs font-bold shadow-sm ${
                  item.type === "success"
                    ? "bg-[#B5FFCF] text-[#166534]"
                    : "bg-[#F3F4F6] text-gray-800"
                }`}
              >
                {item.status}
              </span>
            </div>
          ))}
        </div>
        <motion.button
          whileTap={{ scale: 0.98 }}
          className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-[#E5E7EB] bg-white text-base font-bold text-gray-700 shadow-sm transition-all hover:bg-gray-50"
        >
          View Full Profile <ArrowRight size={14} />
        </motion.button>
      </motion.div>

      {/* Universities Widget */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.1, delay: 0.01, ease: [0.23, 1, 0.32, 1] }}
        whileHover={{ y: -4 }}
        className="flex min-h-[480px] h-full flex-col overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-[0px_1px_2px_rgba(0,0,0,0.05),0px_8px_16px_-4px_rgba(0,0,0,0.1)] transition-all duration-300 hover:shadow-[0px_12px_24px_-12px_rgba(0,0,0,0.15)]"
      >
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-gray-900 tracking-tight">
            Universities
          </h3>
        </div>
        <div className="flex flex-1 flex-col gap-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col items-center justify-center rounded-2xl bg-[#F9FAFB] border border-[#E5E7EB]/50 py-6 text-center shadow-sm">
              <span className="text-4xl font-black text-gray-900">
                {stats.shortlisted}
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400 mt-1">
                Shortlisted
              </span>
            </div>
            <div className="flex flex-col items-center justify-center rounded-2xl bg-[#F9FAFB] border border-[#E5E7EB]/50 py-6 text-center shadow-sm">
              <span className="text-4xl font-black text-gray-900">
                {stats.locked}
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400 mt-1">
                Locked
              </span>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-xl border border-[#E5E7EB]/50 bg-[#F9FAFB] p-4 shadow-sm">
            <LockKeyhole size={20} className="mt-0.5 shrink-0 text-gray-400" />
            <p className="text-base font-medium leading-relaxed text-gray-500">
              Lock at least 1 university to proceed to the next stage
            </p>
          </div>
        </div>
        <motion.button
          whileTap={{ scale: 0.98 }}
          className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-[#E5E7EB] bg-white text-base font-bold text-gray-700 shadow-sm transition-all hover:bg-gray-50"
        >
          Explore Universities <ArrowRight size={14} />
        </motion.button>
      </motion.div>

      {/* Your Tasks Widget */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.1, delay: 0.02, ease: [0.23, 1, 0.32, 1] }}
        whileHover={{ y: -4 }}
        className="flex min-h-[480px] h-full flex-col overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-[0px_1px_2px_rgba(0,0,0,0.05),0px_8px_16px_-4px_rgba(0,0,0,0.1)] transition-all duration-300 hover:shadow-[0px_12px_24px_-12px_rgba(0,0,0,0.15)]"
      >
        <div className="mb-4">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-gray-900 tracking-tight">
              Your Tasks
            </h3>
            <span className="text-lg font-bold text-gray-400 font-mono">
              0/3
            </span>
          </div>
        </div>

        {/* Custom Segmented Progress Bar */}
        <div className="mb-6 flex gap-1.5">
          <div className="h-1.5 flex-1 rounded-full bg-gray-200">
            <div className="h-full w-[1%] rounded-full bg-black shadow-sm" />
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-2.5">
          {[
            { label: "Complete IELTS registration", priority: "HIGH PRIORITY" },
            { label: "Start SOP first draft", priority: "HIGH PRIORITY" },
            {
              label: "Research scholarship options",
              priority: "MEDIUM PRIORITY",
            },
          ].map((task) => (
            <div
              key={task.label}
              className="group flex items-center gap-4 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB]/50 p-4 transition-all hover:bg-gray-50 hover:shadow-sm"
            >
              <AlertCircle size={22} className="shrink-0 text-gray-900" />
              <div className="flex flex-col">
                <span className="text-base font-bold leading-tight text-gray-900">
                  {task.label}
                </span>
                <span className="text-[11px] font-black uppercase tracking-widest text-gray-400 mt-1">
                  {task.priority}
                </span>
              </div>
            </div>
          ))}
        </div>

        <motion.button
          whileTap={{ scale: 0.98 }}
          className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-[#E5E7EB] bg-white text-base font-bold text-gray-700 shadow-sm transition-all hover:bg-gray-50"
        >
          View All Tasks <ArrowRight size={14} />
        </motion.button>
      </motion.div>
    </div>
  );
}
