import React from "react";
import {
  ArrowRight,
  BookOpen,
  FileText,
  GraduationCap,
  LockKeyhole,
  AlertCircle,
} from "lucide-react";

export default function DashboardGrid() {
  return (
    <div className="grid flex-1 grid-cols-1 items-start gap-4 xl:grid-cols-3">
      {/* Profile Strength Widget */}
      <div className="flex h-full max-h-[340px] flex-col rounded-xl border border-card-border bg-card p-5 xl:max-h-none">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-lg font-bold text-text-primary">
            Profile Strength
          </h3>
        </div>
        <div className="flex flex-1 flex-col">
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between text-[15px] font-medium text-text-primary">
              <div className="flex items-center gap-3">
                <BookOpen size={20} className="text-gray-400" />
                <span>Academics</span>
              </div>
              <span className="rounded-md bg-accent-green-light px-3 py-1.5 text-xs font-semibold text-accent-green">
                Strong
              </span>
            </div>
            <div className="flex items-center justify-between text-[15px] font-medium text-text-primary">
              <div className="flex items-center gap-3">
                <FileText size={20} className="text-gray-400" />
                <span>Exams</span>
              </div>
              <span className="rounded-md bg-secondary px-3 py-1.5 text-xs font-semibold text-text-secondary">
                Not Started
              </span>
            </div>
            <div className="flex items-center justify-between text-[15px] font-medium text-text-primary">
              <div className="flex items-center gap-3">
                <GraduationCap size={20} className="text-gray-400" />
                <span>SOP</span>
              </div>
              <span className="rounded-md bg-secondary px-3 py-1.5 text-xs font-semibold text-text-secondary">
                Not Started
              </span>
            </div>
          </div>
        </div>
        <button className="mt-auto flex w-full items-center justify-center gap-2 rounded-full border border-card-border bg-transparent px-3.5 py-3.5 text-sm font-semibold text-text-primary transition-all hover:border-text-secondary hover:bg-secondary">
          View Full Profile <ArrowRight size={16} />
        </button>
      </div>

      {/* Universities Widget */}
      <div className="flex h-full max-h-[340px] flex-col rounded-xl border border-card-border bg-card p-5 xl:max-h-none">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-lg font-bold text-text-primary">Universities</h3>
        </div>
        <div className="flex flex-1 flex-col">
          <div className="mb-8 flex gap-4">
            <div className="flex flex-1 flex-col items-center rounded-2xl bg-gray-50 px-4 py-8 text-center">
              <div className="mb-1 text-[28px] font-extrabold text-text-primary">
                0
              </div>
              <div className="text-[13px] font-medium text-text-secondary">
                Shortlisted
              </div>
            </div>
            <div className="flex flex-1 flex-col items-center rounded-2xl bg-gray-50 px-4 py-8 text-center">
              <div className="mb-1 text-[28px] font-extrabold text-text-primary">
                0
              </div>
              <div className="text-[13px] font-medium text-text-secondary">
                Locked
              </div>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-lg bg-gray-50 p-4 text-[13px] leading-relaxed text-text-secondary">
            <LockKeyhole size={20} className="flex-shrink-0" />
            <span>Lock at least 1 university to proceed to the next stage</span>
          </div>
        </div>
        <button className="mt-auto flex w-full items-center justify-center gap-2 rounded-full border border-card-border bg-transparent px-3.5 py-3.5 text-sm font-semibold text-text-primary transition-all hover:border-text-secondary hover:bg-secondary">
          Explore Universities <ArrowRight size={16} />
        </button>
      </div>

      {/* Tasks Widget */}
      <div className="flex h-full max-h-[340px] flex-col rounded-xl border border-card-border bg-card p-5 xl:max-h-none">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-lg font-bold text-text-primary">Your Tasks</h3>
          <span className="text-sm font-medium text-text-tertiary">0/3</span>
        </div>
        <div className="flex flex-1 flex-col">
          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-3 rounded-2xl bg-gray-50 p-5">
              <AlertCircle size={20} className="flex-shrink-0 text-black" />
              <div className="flex flex-col">
                <div className="text-sm font-semibold text-text-primary">
                  Complete IELTS registration
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-2xl bg-gray-50 p-5">
              <AlertCircle size={20} className="flex-shrink-0 text-black" />
              <div className="flex flex-col">
                <div className="text-sm font-semibold text-text-primary">
                  Start SOP first draft
                </div>
                <div className="text-[10px] font-bold uppercase tracking-wide text-text-tertiary">
                  HIGH PRIORITY
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-2xl bg-gray-50 p-5">
              <AlertCircle size={20} className="flex-shrink-0 text-black" />
              <div className="flex flex-col">
                <div className="text-sm font-semibold text-text-primary">
                  Research scholarship options
                </div>
                <div className="text-[10px] font-bold uppercase tracking-wide text-text-tertiary">
                  MEDIUM PRIORITY
                </div>
              </div>
            </div>
          </div>
        </div>
        <button className="mt-auto flex w-full items-center justify-center gap-2 rounded-full border border-card-border bg-transparent px-3.5 py-3.5 text-sm font-semibold text-text-primary transition-all hover:border-text-secondary hover:bg-secondary">
          View All Tasks <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
