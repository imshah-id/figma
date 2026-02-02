"use client";
import React from "react";
import {
  ArrowRight,
  BookOpen,
  FileText,
  GraduationCap,
  LockKeyhole,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { motion } from "framer-motion";

import { useRouter } from "next/navigation";

interface Task {
  id: string;
  title: string;
  status: string;
  type: string;
  dueDate?: string;
}

export default function DashboardGrid({
  profile,
  stats = { shortlisted: 0, locked: 0, completedTasks: 0, totalTasks: 3 },
  tasks = [],
}: {
  profile?: any;
  stats?: {
    shortlisted: number;
    locked: number;
    completedTasks: number;
    totalTasks: number;
  };
  tasks?: Task[];
}) {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-6">
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
                status: profile?.gpa ? "Strong" : "Pending",
                type: profile?.gpa ? "success" : "gray",
              },
              {
                icon: FileText,
                label: "Exams",
                status: profile?.testScore ? "Done" : "Pending",
                type: profile?.testScore ? "success" : "gray",
              },
              {
                icon: GraduationCap,
                label: "SOP",
                status:
                  profile?.sopStatus === "completed"
                    ? "Done"
                    : profile?.sopStatus === "drafting"
                      ? "Drafting"
                      : "Not Started",
                type: profile?.sopStatus === "completed" ? "success" : "gray",
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
                  className={`rounded-full px-5 py-2 text-xs font-bold shadow-sm min-w-[100px] text-center flex justify-center ${
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
          <div className="mt-6 flex gap-3">
            {profile?.currentStage === "PROFILE" ? (
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={async () => {
                  try {
                    await fetch("/api/profile/advance", {
                      method: "POST",
                      body: JSON.stringify({ targetStage: "DISCOVERY" }),
                      headers: { "Content-Type": "application/json" },
                    });
                    router.refresh();
                  } catch (e) {
                    console.error(e);
                  }
                }}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-black text-white text-base font-bold shadow-md transition-all hover:bg-gray-800"
              >
                Complete & Unlock Discovery <ArrowRight size={14} />
              </motion.button>
            ) : (
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => router.push("/profile")}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-[#E5E7EB] bg-white text-base font-bold text-gray-700 shadow-sm transition-all hover:bg-gray-50"
              >
                View Full Profile <ArrowRight size={14} />
              </motion.button>
            )}
          </div>
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
            {stats.locked > 0 ? (
              <div className="flex items-start gap-3 rounded-xl border border-emerald-100 bg-emerald-50 p-4 shadow-sm">
                <CheckCircle2
                  size={20}
                  className="mt-0.5 shrink-0 text-emerald-600"
                />
                <p className="text-base font-medium leading-relaxed text-emerald-800">
                  Great job! You've locked a university. Proceed to your tasks.
                </p>
              </div>
            ) : (
              <div className="flex items-start gap-3 rounded-xl border border-[#E5E7EB]/50 bg-[#F9FAFB] p-4 shadow-sm">
                <LockKeyhole
                  size={20}
                  className="mt-0.5 shrink-0 text-gray-400"
                />
                <p className="text-base font-medium leading-relaxed text-gray-500">
                  Lock at least 1 university to proceed to the next stage
                </p>
              </div>
            )}
          </div>
          {profile?.currentStage === "DISCOVERY" && stats.shortlisted > 0 ? (
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={async () => {
                try {
                  await fetch("/api/profile/advance", {
                    method: "POST",
                    body: JSON.stringify({ targetStage: "SHORTLIST" }),
                    headers: { "Content-Type": "application/json" },
                  });
                  router.refresh();
                } catch (e) {
                  console.error(e);
                }
              }}
              className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-black text-white text-base font-bold shadow-md transition-all hover:bg-gray-800"
            >
              Finish Discovery <ArrowRight size={14} />
            </motion.button>
          ) : (
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={() => router.push("/universities")}
              className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-[#E5E7EB] bg-white text-base font-bold text-gray-700 shadow-sm transition-all hover:bg-gray-50"
            >
              Explore Universities <ArrowRight size={14} />
            </motion.button>
          )}
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
                {stats.completedTasks}/{stats.totalTasks}
              </span>
            </div>
          </div>

          {/* Custom Segmented Progress Bar */}
          <div className="mb-6 flex gap-1.5">
            <div className="h-1.5 flex-1 rounded-full bg-gray-200">
              <div
                className="h-full rounded-full bg-black shadow-sm transition-all duration-500"
                style={{
                  width: `${stats.totalTasks > 0 ? (stats.completedTasks / stats.totalTasks) * 100 : 0}%`,
                }}
              />
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-2.5">
            {(() => {
              const toggleTask = async (
                taskId: string,
                currentStatus: string,
              ) => {
                try {
                  const newStatus =
                    currentStatus === "completed" ? "pending" : "completed";
                  await fetch("/api/guidance", {
                    method: "PATCH",
                    body: JSON.stringify({ taskId, status: newStatus }),
                    headers: { "Content-Type": "application/json" },
                  });
                  router.refresh();
                } catch (e) {
                  console.error("Task update failed:", e);
                }
              };

              // If no tasks, show a placeholder
              if (tasks.length === 0) {
                return (
                  <div className="flex flex-col items-center justify-center p-8 text-center text-gray-400">
                    <AlertCircle size={32} className="mb-2 opacity-20" />
                    <p className="text-sm">
                      No tasks yet. Lock a university to see your guidance
                      tasks.
                    </p>
                  </div>
                );
              }

              // Display top 3 real tasks
              return tasks.slice(0, 3).map((task) => {
                const isCompleted = task.status === "completed";
                return (
                  <div
                    key={task.id}
                    onClick={() => toggleTask(task.id, task.status)}
                    className={`group flex items-center gap-4 rounded-xl border p-4 transition-all cursor-pointer ${
                      isCompleted
                        ? "bg-emerald-50 border-emerald-100 opacity-70"
                        : "bg-[#F9FAFB] border-[#E5E7EB]/50 hover:bg-gray-50 hover:shadow-sm"
                    }`}
                  >
                    <div
                      className={`h-5 w-5 rounded-full border-2 flex items-center justify-center transition-colors shrink-0 ${
                        isCompleted
                          ? "bg-emerald-500 border-emerald-500"
                          : "bg-white border-slate-300 group-hover:border-slate-400"
                      }`}
                    >
                      {isCompleted && (
                        <CheckCircle2 size={12} className="text-white" />
                      )}
                    </div>
                    <div className="flex flex-col">
                      <span
                        className={`text-base font-bold leading-tight ${
                          isCompleted
                            ? "text-emerald-900 line-through"
                            : "text-gray-900"
                        }`}
                      >
                        {task.title}
                      </span>
                      <span className="text-[11px] font-black uppercase tracking-widest text-gray-400 mt-1">
                        {task.type || "TASK"}{" "}
                        {task.dueDate
                          ? `• DUE ${task.dueDate.toUpperCase()}`
                          : ""}
                      </span>
                    </div>
                  </div>
                );
              });
            })()}
          </div>

          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push("/tasks")}
            className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-[#E5E7EB] bg-white text-base font-bold text-gray-700 shadow-sm transition-all hover:bg-gray-50"
          >
            View All Tasks <ArrowRight size={14} />
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
