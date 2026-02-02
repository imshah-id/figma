"use client";

import React, { useState } from "react";
import { X, Save, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: any;
}

export default function EditProfileModal({
  isOpen,
  onClose,
  user,
}: EditProfileModalProps) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user.fullName || "",
    citizenship: user.citizenship || "",
    highestQualification: user.highestQualification || "",
    fieldOfStudy: user.fieldOfStudy || "",
    gpa: user.gpa || "",
    gpaScale: user.gpaScale || "4.0",
    testScore: user.testScore || "",
    englishTest: user.englishTest || "None",
    targetDegree: user.targetDegree || "Masters",
    targetMajor: user.targetMajor || "",
    targetIntake: user.targetIntake || "Fall 2025",
    budget: user.budget || "",
    sopStatus: user.sopStatus || "",
    lorCount: user.lorCount || "",
    preferredCountries: parseCountries(user.preferredCountries),
  });

  function parseCountries(jsonString: any) {
    try {
      if (Array.isArray(jsonString)) return jsonString;
      return JSON.parse(jsonString || "[]");
    } catch {
      return [];
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const res = await fetch("/api/user/me", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to update");

      router.refresh(); // Reload server data
      onClose();
    } catch (error) {
      console.error(error);
      alert("Failed to save changes. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-white/50 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="pointer-events-auto w-full max-w-2xl flex flex-col max-h-[85vh] rounded-[2.5rem] bg-white/70 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-white/50 overflow-hidden ring-1 ring-white/60">
              {/* Header - Transparent & Sticky */}
              <div className="shrink-0 flex items-center justify-between px-8 py-6 border-b border-white/30 bg-white/10 backdrop-blur-sm">
                <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                  Edit Profile
                </h2>
                <button
                  onClick={onClose}
                  className="rounded-full p-2 text-gray-500 transition-all hover:bg-black/5 hover:text-black active:scale-95"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="overflow-y-auto p-8 scrollbar-hide">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Section 1: Personal */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500">
                      Personal Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-gray-700">
                          Full Name
                        </label>
                        <input
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-900 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-gray-700">
                          Citizenship
                        </label>
                        <input
                          name="citizenship"
                          value={formData.citizenship}
                          onChange={handleChange}
                          className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-900 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Section 2: Academic */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500">
                      Academic History
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-gray-700">
                          Highest Qualification
                        </label>
                        <select
                          name="highestQualification"
                          value={formData.highestQualification}
                          onChange={handleChange}
                          className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-900 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                        >
                          <option value="High School">High School</option>
                          <option value="Bachelors">Bachelors</option>
                          <option value="Masters">Masters</option>
                          <option value="PhD">PhD</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-gray-700">
                          Field of Study
                        </label>
                        <input
                          name="fieldOfStudy"
                          value={formData.fieldOfStudy}
                          onChange={handleChange}
                          className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-900 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-gray-700">
                          GPA
                        </label>
                        <input
                          name="gpa"
                          value={formData.gpa}
                          onChange={handleChange}
                          className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-900 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-gray-700">
                          GPA Scale
                        </label>
                        <select
                          name="gpaScale"
                          value={formData.gpaScale}
                          onChange={handleChange}
                          className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-900 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                        >
                          <option value="4.0">4.0 Scale</option>
                          <option value="5.0">5.0 Scale</option>
                          <option value="10.0">10.0 Scale</option>
                          <option value="Percentage">Percentage</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Section 3: Study Goals */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500">
                      Study Goals
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-gray-700">
                          Target Degree
                        </label>
                        <select
                          name="targetDegree"
                          value={formData.targetDegree}
                          onChange={handleChange}
                          className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-900 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                        >
                          <option value="Bachelors">Bachelors</option>
                          <option value="Masters">Masters</option>
                          <option value="PhD">PhD</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-gray-700">
                          Target Major
                        </label>
                        <input
                          name="targetMajor"
                          value={formData.targetMajor}
                          onChange={handleChange}
                          className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-900 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-gray-700">
                          Target Intake
                        </label>
                        <input
                          name="targetIntake"
                          value={formData.targetIntake}
                          onChange={handleChange}
                          className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-900 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-gray-700">
                          Budget
                        </label>
                        <input
                          name="budget"
                          value={formData.budget}
                          onChange={handleChange}
                          className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-900 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Section 4: Application Readiness */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500">
                      Application Readiness
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-gray-700">
                          SOP Status
                        </label>
                        <input
                          name="sopStatus"
                          placeholder="e.g. Drafting, Done"
                          value={formData.sopStatus}
                          onChange={handleChange}
                          className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-900 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-gray-700">
                          LOR Count
                        </label>
                        <input
                          name="lorCount"
                          type="number"
                          placeholder="e.g. 2"
                          value={formData.lorCount}
                          onChange={handleChange}
                          className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-900 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Section 5: Preferences */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500">
                      Preferences
                    </h3>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-gray-700">
                        Preferred Countries (Comma separated)
                      </label>
                      <input
                        name="preferredCountries"
                        placeholder="e.g. USA, UK, Canada"
                        value={
                          Array.isArray(formData.preferredCountries)
                            ? formData.preferredCountries.join(", ")
                            : formData.preferredCountries
                        }
                        onChange={(e) => {
                          const val = e.target.value;
                          const list = val.split(",").map((s) => s.trim());
                          setFormData((prev) => ({
                            ...prev,
                            preferredCountries: list,
                          }));
                        }}
                        className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-900 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                      />
                    </div>
                  </div>

                  {/* Footer Actions */}
                  <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                    <button
                      type="button"
                      onClick={onClose}
                      className="rounded-xl px-5 py-2.5 text-sm font-bold text-gray-600 transition-colors hover:bg-gray-100"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSaving}
                      className="flex items-center gap-2 rounded-xl bg-black px-6 py-2.5 text-sm font-bold text-white shadow-lg transition-all hover:bg-neutral-800 disabled:opacity-50"
                    >
                      {isSaving ? (
                        <Loader2 size={16} className="animate-spin" />
                      ) : (
                        <Save size={16} />
                      )}
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
