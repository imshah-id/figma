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
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.1, delay: 0.0 }}
        whileHover={{ y: -4 }}
        className="flex h-[350px] flex-col overflow-hidden rounded-xl border border-card-border bg-card p-4 transition-shadow hover:shadow-lg"
      >
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-lg font-bold text-text-primary">
            Profile Strength
          </h3>
        </div>
        <div className="flex flex-1 flex-col pr-1">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between text-sm font-medium text-text-primary">
              <div className="flex items-center gap-2">
                <BookOpen size={18} className="text-gray-400" />
                <span>Academics</span>
              </div>
              <span className="rounded-md bg-accent-green-light px-2 py-1 text-xs font-semibold text-accent-green">
                Strong
              </span>
            </div>
            <div className="flex items-center justify-between text-sm font-medium text-text-primary">
              <div className="flex items-center gap-2">
                <FileText size={18} className="text-gray-400" />
                <span>Exams</span>
              </div>
              <span className="rounded-md bg-secondary px-2 py-1 text-xs font-semibold text-text-secondary">
                Not Started
              </span>
            </div>
            <div className="flex items-center justify-between text-sm font-medium text-text-primary">
              <div className="flex items-center gap-2">
                <GraduationCap size={18} className="text-gray-400" />
                <span>SOP</span>
              </div>
              <span className="rounded-md bg-secondary px-2 py-1 text-xs font-semibold text-text-secondary">
                Not Started
              </span>
            </div>
          </div>
        </div>
        <motion.button
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-full border border-card-border bg-transparent px-3 py-2.5 text-sm font-semibold text-text-primary transition-all hover:border-text-secondary hover:bg-secondary"
        >
          View Full Profile <ArrowRight size={14} />
        </motion.button>
      </motion.div>

      {/* Universities Widget */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.1, delay: 0.0 }}
        whileHover={{ y: -4 }}
        className="flex h-[350px] flex-col overflow-hidden rounded-xl border border-card-border bg-card p-4 transition-shadow hover:shadow-lg"
      >
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-lg font-bold text-text-primary">Universities</h3>
        </div>
        <div className="flex flex-1 flex-col pr-1">
          <div className="mb-5 flex gap-3">
            <div className="flex flex-1 flex-col items-center rounded-2xl bg-gray-50 px-3 py-5 text-center">
              <div className="mb-0.5 text-[28px] font-extrabold text-text-primary">
                0
              </div>
              <div className="text-[13px] font-medium text-text-secondary">
                Shortlisted
              </div>
            </div>
            <div className="flex flex-1 flex-col items-center rounded-2xl bg-gray-50 px-3 py-5 text-center">
              <div className="mb-0.5 text-[28px] font-extrabold text-text-primary">
                0
              </div>
              <div className="text-[13px] font-medium text-text-secondary">
                Locked
              </div>
            </div>
          </div>
          <div className="flex items-start gap-2.5 rounded-lg bg-gray-50 p-3.5 text-sm leading-relaxed text-text-secondary">
            <LockKeyhole size={18} className="flex-shrink-0" />
            <span>Lock at least 1 university to proceed to the next stage</span>
          </div>
        </div>
        <motion.button
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-full border border-card-border bg-transparent px-3 py-2.5 text-sm font-semibold text-text-primary transition-all hover:border-text-secondary hover:bg-secondary"
        >
          Explore Universities <ArrowRight size={14} />
        </motion.button>
      </motion.div>

      {/* Tasks Widget */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.1, delay: 0.0 }}
        whileHover={{ y: -4 }}
        className="flex h-[350px] flex-col overflow-hidden rounded-xl border border-card-border bg-card p-4 transition-shadow hover:shadow-lg"
      >
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-lg font-bold text-text-primary">Your Tasks</h3>
          <span className="text-sm font-medium text-text-tertiary">0/3</span>
        </div>
        <div className="flex flex-1 flex-col pr-1">
          <div className="flex flex-col gap-3">
            <div className="flex items-start gap-2.5 rounded-2xl bg-gray-50 p-3.5">
              <AlertCircle size={18} className="flex-shrink-0 text-black" />
              <div className="flex flex-col">
                <div className="text-sm font-semibold text-text-primary">
                  Complete IELTS registration
                </div>
              </div>
            </div>
            <div className="flex items-start gap-2.5 rounded-2xl bg-gray-50 p-3.5">
              <AlertCircle size={18} className="flex-shrink-0 text-black" />
              <div className="flex flex-col">
                <div className="text-sm font-semibold text-text-primary">
                  Start SOP first draft
                </div>
                <div className="text-[11px] font-bold uppercase tracking-wide text-text-tertiary">
                  HIGH PRIORITY
                </div>
              </div>
            </div>
            <div className="flex items-start gap-2.5 rounded-2xl bg-gray-50 p-3.5">
              <AlertCircle size={18} className="flex-shrink-0 text-black" />
              <div className="flex flex-col">
                <div className="text-sm font-semibold text-text-primary">
                  Research scholarship options
                </div>
                <div className="text-[11px] font-bold uppercase tracking-wide text-text-tertiary">
                  MEDIUM PRIORITY
                </div>
              </div>
            </div>
          </div>
        </div>
        <motion.button
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-full border border-card-border bg-transparent px-3 py-2.5 text-sm font-semibold text-text-primary transition-all hover:border-text-secondary hover:bg-secondary"
        >
          View All Tasks <ArrowRight size={14} />
        </motion.button>
      </motion.div>
    </div>
  );
}
