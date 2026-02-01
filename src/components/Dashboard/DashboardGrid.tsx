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

export default function DashboardGrid() {
  return (
    <div className="grid flex-1 grid-cols-1 items-start gap-6 md:grid-cols-2 xl:grid-cols-3">
      {/* Profile Strength Widget */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.15, delay: 0.0, ease: [0.23, 1, 0.32, 1] }}
        whileHover={{ y: -4 }}
        className="flex h-[452.5px] xl:h-full flex-col overflow-hidden rounded-2xl border border-[#E5E7EB] bg-gradient-to-b from-white to-gray-50 p-6 shadow-[0px_1px_2px_-1px_#0000001a,0px_1px_3px_#0000001a] transition-all duration-300 hover:shadow-[0px_12px_24px_-12px_rgba(0,0,0,0.1)]"
      >
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-[#101727]">
            Profile Strength
          </h3>
        </div>
        <div className="flex flex-1 flex-col gap-4">
          <div className="flex h-12 items-center justify-between rounded-[10px] bg-gray-50/50 px-3">
            <div className="flex items-center gap-3">
              <div className="flex h-[18px] w-[18px] items-center justify-center">
                <BookOpen size={18} className="text-gray-400" />
              </div>
              <span className="text-base font-medium text-[#354152]">
                Academics
              </span>
            </div>
            <span className="rounded-full bg-green-100 px-2.5 py-1 text-xs font-semibold text-[#008235]">
              Strong
            </span>
          </div>
          <div className="flex h-12 items-center justify-between rounded-[10px] bg-gray-50/50 px-3">
            <div className="flex items-center gap-3">
              <div className="flex h-[18px] w-[18px] items-center justify-center">
                <FileText size={18} className="text-gray-400" />
              </div>
              <span className="text-base font-medium text-[#354152]">
                Exams
              </span>
            </div>
            <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold text-[#697282]">
              Not Started
            </span>
          </div>
          <div className="flex h-12 items-center justify-between rounded-[10px] bg-gray-50/50 px-3">
            <div className="flex items-center gap-3">
              <div className="flex h-[18px] w-[18px] items-center justify-center">
                <GraduationCap size={18} className="text-gray-400" />
              </div>
              <span className="text-base font-medium text-[#354152]">SOP</span>
            </div>
            <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold text-[#697282]">
              Not Started
            </span>
          </div>
        </div>
        <motion.button
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="mt-auto flex h-[42px] w-full items-center justify-center gap-2 rounded-[16.4px] border border-gray-200 bg-transparent text-sm font-semibold text-[#354152] transition-all hover:bg-gray-50"
        >
          View Full Profile <ArrowRight size={14} />
        </motion.button>
      </motion.div>

      {/* Universities Widget */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.15, delay: 0.03, ease: [0.23, 1, 0.32, 1] }}
        whileHover={{ y: -4 }}
        className="flex h-[452.5px] xl:h-full flex-col overflow-hidden rounded-2xl border border-[#E5E7EB] bg-gradient-to-b from-white to-gray-50 p-6 shadow-[0px_1px_2px_-1px_#0000001a,0px_1px_3px_#0000001a] transition-all duration-300 hover:shadow-[0px_12px_24px_-12px_rgba(0,0,0,0.1)]"
      >
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-[#101727]">Universities</h3>
        </div>
        <div className="flex flex-1 flex-col gap-6">
          <div className="grid h-20 grid-cols-2 gap-4">
            <div className="flex flex-col items-start rounded-[16.4px] bg-gray-50 px-4 py-4">
              <div className="mb-0 text-2xl font-bold text-[#101727]">0</div>
              <div className="text-xs font-medium text-[#697282]">
                Shortlisted
              </div>
            </div>
            <div className="flex flex-col items-start rounded-[16.4px] bg-gray-50 px-4 py-4">
              <div className="mb-0 text-2xl font-bold text-[#101727]">0</div>
              <div className="text-xs font-medium text-[#697282]">Locked</div>
            </div>
          </div>
          <div className="flex h-[65px] items-start gap-3 rounded-[10px] border border-[#F2F4F6] bg-gray-50 px-4 py-3.5">
            <LockKeyhole
              size={18}
              className="mt-0.5 flex-shrink-0 text-gray-400"
            />
            <p className="text-xs font-medium leading-[19.5px] text-[#697282]">
              Lock at least 1 university to proceed to the next stage
            </p>
          </div>
        </div>
        <motion.button
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="mt-auto flex h-[42px] w-full items-center justify-center gap-2 rounded-[16.4px] border border-gray-200 bg-transparent text-sm font-semibold text-[#354152] transition-all hover:bg-gray-50"
        >
          Explore Universities <ArrowRight size={14} />
        </motion.button>
      </motion.div>

      {/* Tasks Widget */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.15, delay: 0.06, ease: [0.23, 1, 0.32, 1] }}
        whileHover={{ y: -4 }}
        className="flex h-[452.5px] xl:h-full flex-col overflow-hidden rounded-2xl border border-[#E5E7EB] bg-gradient-to-b from-white to-gray-50 p-6 shadow-[0px_1px_2px_-1px_#0000001a,0px_1px_3px_#0000001a] transition-all duration-300 hover:shadow-[0px_12px_24px_-12px_rgba(0,0,0,0.1)]"
      >
        <div className="mb-4 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-[#101727]">Your Tasks</h3>
            <span className="text-sm font-medium text-[#697282]">0/3</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6 flex h-1.5 w-full flex-col items-start rounded-full bg-gray-100">
          <div
            className="relative h-1.5 w-full rounded-full bg-black"
            style={{ width: "1%" }}
          />
        </div>

        <div className="flex flex-col gap-3">
          {/* Task 1 */}
          <div className="relative flex min-h-20 w-full items-start rounded-[16.4px] bg-gray-50 border border-transparent pb-3 pr-3">
            <div className="absolute left-[13px] top-[15px] flex h-[18px] w-[18px] items-center justify-center">
              <AlertCircle
                size={18}
                strokeWidth={2}
                className="text-[#101727]"
              />
            </div>
            <div className="ml-[43px] mt-[13px] flex flex-col items-start gap-1">
              <div className="text-sm font-medium leading-[17.5px] tracking-[0] text-[#101727]">
                Complete IELTS registration
              </div>
              <div className="whitespace-nowrap text-[10px] font-medium leading-[15px] tracking-[0.25px] text-[#697282]">
                HIGH PRIORITY
              </div>
            </div>
          </div>

          {/* Task 2 */}
          <div className="relative flex min-h-[62.5px] w-full items-start rounded-[16.4px] bg-gray-50 border border-transparent pb-3 pr-3">
            <div className="absolute left-[13px] top-[15px] flex h-[18px] w-[18px] items-center justify-center">
              <AlertCircle
                size={18}
                strokeWidth={2}
                className="text-[#101727]"
              />
            </div>
            <div className="ml-[43px] mt-[13px] flex flex-col items-start gap-1">
              <div className="text-sm font-medium leading-[17.5px] tracking-[0] text-[#101727]">
                Start SOP first draft
              </div>
              <div className="whitespace-nowrap text-[10px] font-medium leading-[15px] tracking-[0.25px] text-[#697282]">
                HIGH PRIORITY
              </div>
            </div>
          </div>

          {/* Task 3 */}
          <div className="relative flex min-h-20 w-full items-start rounded-[16.4px] bg-gray-50 border border-transparent pb-3 pr-3">
            <div className="absolute left-[13px] top-[15px] flex h-[18px] w-[18px] items-center justify-center">
              <AlertCircle
                size={18}
                strokeWidth={2}
                className="text-[#101727]"
              />
            </div>
            <div className="ml-[43px] mt-[13px] flex flex-col items-start gap-1">
              <div className="text-sm font-medium leading-[17.5px] tracking-[0] text-[#101727]">
                Research scholarship options
              </div>
              <div className="whitespace-nowrap text-[10px] font-medium leading-[15px] tracking-[0.25px] text-[#697282]">
                MEDIUM PRIORITY
              </div>
            </div>
          </div>
        </div>

        <button className="all-[unset] box-border mt-auto flex h-[42px] w-full items-center justify-center gap-[6.8px] rounded-[16.4px] border border-solid border-gray-200 transition-all hover:bg-gray-50">
          <span className="text-center text-sm font-semibold leading-5 tracking-[0] text-[#354152]">
            View All Tasks
          </span>
          <ArrowRight size={14} className="text-[#354152]" />
        </button>
      </motion.div>
    </div>
  );
}
