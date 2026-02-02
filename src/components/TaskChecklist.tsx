"use client";

import React, { useState } from "react";
import {
  CheckCircle2,
  Circle,
  FileText,
  ExternalLink,
  MessageSquare,
  UploadCloud,
  Plus,
  Sparkles,
  MapPin,
  Clock,
} from "lucide-react";

interface Task {
  id: string;
  label: string;
  completed: boolean;
}

interface TaskChecklistProps {
  lockedUniversities: Array<{
    id: string;
    university: {
      name: string;
      location: string;
    };
  }>;
  profile: any;
}

// Dynamic Task Generator
const generateTasks = (university: any, profile: any) => {
  const tasks = [
    {
      id: "sop",
      label: `Draft Statement of Purpose for ${profile?.targetDegree || "Degree"} in ${profile?.targetMajor || "your field"}`,
      completed: false,
    },
    {
      id: "lor1",
      label: "Request Recommendation Letter (Academic)",
      completed: false,
    },
    {
      id: "lor2",
      label: "Request Recommendation Letter (Professional)",
      completed: false,
    },
    {
      id: "transcripts",
      label: "Order & Scan Official Transcripts",
      completed: false,
    },
    { id: "resume", label: "Update CV / Resume", completed: false },
    { id: "passport", label: "Verify Passport Validity", completed: false },
  ];

  // Conditional Tasks based on Profile & Criteria

  // English Proficiency
  if (profile?.englishTest === "IELTS") {
    tasks.push({
      id: "english",
      label: "Submit IELTS Scores",
      completed: false,
    });
  } else if (profile?.englishTest === "TOEFL") {
    tasks.push({
      id: "english",
      label: "Submit TOEFL Scores",
      completed: false,
    });
  } else {
    tasks.push({
      id: "english",
      label: "Submit English Proficiency Scores (IELTS/TOEFL)",
      completed: false,
    });
  }

  // Aptitude Tests
  if (
    profile?.targetDegree?.includes("Master") ||
    profile?.targetDegree?.includes("PhD")
  ) {
    tasks.push({
      id: "tests",
      label: "Submit GRE/GMAT Scores",
      completed: false,
    });
  } else {
    tasks.push({
      id: "tests",
      label: "Submit SAT/ACT Scores",
      completed: false,
    });
  }

  // Country Specifics (Mock Logic)
  if (university?.country === "USA") {
    tasks.push({
      id: "finance",
      label: "Prepare Financial Documents (I-20)",
      completed: false,
    });
  } else if (university?.country === "UK") {
    tasks.push({
      id: "finance",
      label: "Prepare Financial Documents (CAS)",
      completed: false,
    });
  } else {
    tasks.push({
      id: "finance",
      label: "Prepare Financial Proof Documents",
      completed: false,
    });
  }

  tasks.push({ id: "fee", label: "Pay Application Fee", completed: false });

  return tasks;
};

export default function TaskChecklist({
  lockedUniversities,
  profile,
}: TaskChecklistProps) {
  const [taskStates, setTaskStates] = useState<
    Record<string, Record<string, boolean>>
  >({});
  const [noteStates, setNoteStates] = useState<Record<string, string>>({});

  const toggleTask = (uniId: string, taskId: string) => {
    setTaskStates((prev) => ({
      ...prev,
      [uniId]: {
        ...prev[uniId],
        [taskId]: !prev[uniId]?.[taskId],
      },
    }));
  };

  const updateNote = (uniId: string, text: string) => {
    setNoteStates((prev) => ({
      ...prev,
      [uniId]: text,
    }));
  };

  if (lockedUniversities.length === 0) {
    return (
      <div className="p-12 text-center bg-amber-50 rounded-2xl border border-amber-100">
        <h3 className="text-lg font-bold text-amber-900">
          No Universities Locked
        </h3>
        <p className="text-amber-700 mt-2">
          You need to lock at least one university in your Shortlist to see
          application tasks.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6">
      {lockedUniversities.map((item) => {
        const tasks = generateTasks(item.university, profile);
        const uniTaskState = taskStates[item.id] || {};
        const completedCount = tasks.filter((t) => uniTaskState[t.id]).length;
        const progress = Math.round((completedCount / tasks.length) * 100);

        return (
          <div
            key={item.id}
            className="bg-white rounded-3xl border border-slate-100 p-8 shadow-xl shadow-slate-200/40 relative overflow-hidden group"
          >
            {/* Decorative Top Gradient */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600"></div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-10 mt-2">
              {/* Header Info */}
              <div className="flex items-center gap-5">
                <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white flex items-center justify-center text-3xl font-bold shadow-2xl shadow-slate-400/50 ring-4 ring-white">
                  {item.university.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                    {item.university.name}
                  </h3>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="flex items-center gap-1.5 text-slate-500 font-medium bg-slate-100 px-3 py-1 rounded-full text-sm">
                      <MapPin size={14} /> {item.university.location}
                    </span>
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-300"></span>
                    <span className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
                      Fall 2025 Intake
                    </span>
                  </div>
                </div>
              </div>

              {/* Progress & Deadline Widget */}
              <div className="flex items-center gap-8 bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                {/* Deadline */}
                <div className="pr-8 border-r border-slate-100">
                  <span className="font-bold text-slate-400 text-xs uppercase tracking-wider mb-1 block">
                    Deadline Warning
                  </span>
                  <div className="text-slate-900 font-black text-lg flex items-center gap-2">
                    <Clock size={18} className="text-rose-500" />
                    Oct 15, 2025
                  </div>
                </div>

                {/* Progress Circle */}
                <div className="flex items-center gap-4">
                  <div className="relative h-14 w-14">
                    <svg
                      className="h-full w-full -rotate-90 transform"
                      viewBox="0 0 36 36"
                    >
                      <path
                        className="text-slate-100"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="4"
                        strokeLinecap="round"
                      />
                      <path
                        className="text-blue-600 transition-all duration-1000 ease-out"
                        strokeDasharray={`${progress}, 100`}
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="4"
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center text-sm font-black text-slate-900">
                      {progress}%
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-slate-900 leading-tight">
                      Application
                      <br />
                      Health
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-3">
                <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-slate-400" />
                  Required Tasks
                </h4>
                {tasks.map((task) => {
                  const isCompleted = uniTaskState[task.id] || false;
                  return (
                    <div
                      key={task.id}
                      className={`flex items-center justify-between p-4 rounded-xl transition-all border group ${
                        isCompleted
                          ? "bg-emerald-50/50 border-emerald-100"
                          : "bg-white hover:bg-slate-50 border-slate-100 hover:border-slate-200 shadow-sm hover:shadow-md"
                      }`}
                    >
                      <div
                        className="flex items-center gap-4 cursor-pointer flex-1"
                        onClick={() => toggleTask(item.id, task.id)}
                      >
                        <div
                          className={`h-6 w-6 rounded-full border-2 flex items-center justify-center transition-colors flex-shrink-0 ${
                            isCompleted
                              ? "bg-emerald-500 border-emerald-500"
                              : "bg-white border-slate-300 group-hover:border-slate-400"
                          }`}
                        >
                          {isCompleted && (
                            <CheckCircle2 size={14} className="text-white" />
                          )}
                        </div>
                        <span
                          className={`text-sm font-medium transition-colors ${
                            isCompleted
                              ? "text-emerald-900 line-through opacity-70"
                              : "text-slate-700 group-hover:text-slate-900"
                          }`}
                        >
                          {task.label}
                        </span>
                      </div>

                      {!isCompleted && (
                        <button
                          className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg"
                          onClick={(e) => {
                            e.stopPropagation();
                            // In a real app, this would open the AI chat with a prompt
                            alert(
                              `AI Helper: I can help you with "${task.label}". Opening chat...`,
                            );
                          }}
                        >
                          <Sparkles size={14} /> AI Help
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Sidebar Resources & Notes */}
              <div className="space-y-6">
                {/* AI Strategic Advisory Card */}
                <div className="bg-indigo-600 rounded-2xl p-6 text-white shadow-xl shadow-indigo-200/40 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                    <Sparkles size={40} />
                  </div>
                  <h4 className="font-bold text-indigo-100 mb-2 text-xs uppercase tracking-widest flex items-center gap-2">
                    <Sparkles size={14} className="text-white fill-white/20" />{" "}
                    Strategic AI Insight
                  </h4>
                  <div className="text-lg font-black mb-3 leading-[1.3] text-white">
                    {progress < 30
                      ? "Focus on your SOP foundation"
                      : progress < 70
                        ? "Polish your technical projects"
                        : "Final review of your financial docs"}
                  </div>
                  <p className="text-[12px] text-indigo-100/90 leading-relaxed mb-4 font-medium">
                    {progress < 30
                      ? "Your profile is strong, but your Statement of Purpose needs to clearly link your undergrad projects to this program's research."
                      : "Midway through! Remember to ask your professional referees to highlight your leadership skills specifically."}
                  </p>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-[11px] font-bold border border-white/20 text-indigo-50">
                    <span className="text-amber-300 mr-1">Pro Tip:</span>{" "}
                    Mention the recent grant the{" "}
                    {item.university.name.split(" ")[0]} CS department received.
                  </div>
                </div>

                {/* Quick Resources */}
                <div className="bg-blue-50/50 rounded-xl p-6 border border-blue-100">
                  <h4 className="font-bold text-blue-900 mb-4">
                    Quick Resources
                  </h4>
                  <ul className="space-y-3">
                    <li>
                      <a
                        href="#"
                        className="flex items-center gap-2 text-sm text-blue-700 hover:text-blue-900 hover:underline"
                      >
                        <FileText size={16} /> Program Requirements
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="flex items-center gap-2 text-sm text-blue-700 hover:text-blue-900 hover:underline"
                      >
                        <ExternalLink size={16} /> Official Website
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="flex items-center gap-2 text-sm text-blue-700 hover:text-blue-900 hover:underline"
                      >
                        <MessageSquare size={16} /> Chat with Alumni
                      </a>
                    </li>
                  </ul>
                </div>

                {/* My Notes */}
                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex flex-col">
                      <h4 className="font-bold text-slate-900">
                        Application Notes
                      </h4>
                      <span className="text-[10px] text-slate-400 font-medium">
                        Auto-saves as you type
                      </span>
                    </div>
                    <div className="h-8 w-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400">
                      <FileText size={16} />
                    </div>
                  </div>
                  <textarea
                    className="w-full h-32 text-sm p-4 bg-slate-50 rounded-xl border-transparent focus:bg-white focus:border-indigo-200 focus:ring-4 focus:ring-indigo-50/50 resize-none transition-all placeholder:text-slate-400 text-slate-700 font-medium"
                    placeholder="Jot down specific questions, contact names, or reminders for this application..."
                    value={noteStates[item.id] || ""}
                    onChange={(e) => updateNote(item.id, e.target.value)}
                  ></textarea>
                  <div className="mt-3 flex items-center justify-end">
                    {noteStates[item.id] && (
                      <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-1">
                        <CheckCircle2 size={10} /> Saved to drafts
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Document Vault Section */}
            <div className="mt-8 pt-8 border-t border-slate-100">
              <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <UploadCloud size={18} className="text-slate-400" />
                Document Vault
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border border-dashed border-slate-300 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:bg-slate-50 transition-colors cursor-pointer group">
                  <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <FileText size={18} className="text-slate-500" />
                  </div>
                  <span className="text-sm font-bold text-slate-700">
                    Statement of Purpose
                  </span>
                  <span className="text-xs text-slate-400 mt-1">
                    Drag & drop or browse
                  </span>
                </div>
                <div className="border border-dashed border-slate-300 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:bg-slate-50 transition-colors cursor-pointer group">
                  <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <FileText size={18} className="text-slate-500" />
                  </div>
                  <span className="text-sm font-bold text-slate-700">
                    CV / Resume
                  </span>
                  <span className="text-xs text-slate-400 mt-1">
                    Drag & drop or browse
                  </span>
                </div>
                <div className="border border-dashed border-slate-300 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:bg-slate-50 transition-colors cursor-pointer group">
                  <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <UploadCloud size={18} className="text-slate-500" />
                  </div>
                  <span className="text-sm font-bold text-slate-700">
                    Upload Other Docs
                  </span>
                  <span className="text-xs text-slate-400 mt-1">
                    PDF, DOCX up to 10MB
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
