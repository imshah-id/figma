"use client";

import React, { useState, useEffect } from "react";
import UniversityCard from "@/components/UniversityCard";
import { X, TrendingUp, Users, Award, BookOpen, Loader2 ,ArrowRight} from "lucide-react";

interface UniversitiesGridProps {
  universities: any[];
  initialShortlistedIds: string[];
}

export default function UniversitiesGrid({
  universities,
  initialShortlistedIds,
}: UniversitiesGridProps) {
  const [selectedUni, setSelectedUni] = useState<any | null>(null);
  const [shortlistedSet, setShortlistedSet] = useState<Set<string>>(
    new Set(initialShortlistedIds),
  );

  // Analysis State
  const [analysis, setAnalysis] = useState<any>(null);
  const [loadingAnalysis, setLoadingAnalysis] = useState(false);

  // Fetch analysis when selectedUni changes
  useEffect(() => {
    if (selectedUni) {
      setLoadingAnalysis(true);
      setAnalysis(null);

      fetch("/api/universities/analyze", {
        method: "POST",
        body: JSON.stringify({ universityId: selectedUni.id }),
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((data) => {
          setAnalysis(data);
        })
        .catch((err) => {
          console.error("Failed to load analysis", err);
        })
        .finally(() => {
          setLoadingAnalysis(false);
        });
    }
  }, [selectedUni]);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {universities.map((uni: any, index: number) => (
          <div key={uni.id} className="h-full">
            <UniversityCard
              uni={uni}
              index={index}
              initialIsShortlisted={shortlistedSet.has(uni.id)}
              onAnalyzeClick={() => setSelectedUni(uni)}
            />
          </div>
        ))}
      </div>

      {/* Analysis Modal */}
      {selectedUni && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
            onClick={() => setSelectedUni(null)}
          />
          <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col md:flex-row animate-in zoom-in-95 duration-200">
            {/* Close Button */}
            <button
              onClick={() => setSelectedUni(null)}
              className="absolute top-4 right-4 p-2 bg-white/50 hover:bg-white rounded-full text-slate-500 hover:text-slate-900 transition-colors z-10"
            >
              <X size={20} />
            </button>

            {/* Left Panel: Uni Summary */}
            <div className="w-full md:w-1/3 bg-slate-50 border-r border-slate-100 p-8 flex flex-col">
              <div className="h-20 w-20 rounded-2xl bg-white shadow-md flex items-center justify-center text-3xl font-bold text-slate-900 mb-6 border border-slate-100">
                {selectedUni.name.charAt(0)}
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2 leading-tight">
                {selectedUni.name}
              </h2>
              <p className="text-slate-500 font-medium mb-6">
                {selectedUni.location}
              </p>

              <div className="space-y-4 mt-auto">
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Match Score
                  </div>
                  <div className="text-3xl font-black text-emerald-600">
                    {selectedUni.matchScore}%
                  </div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Acceptance
                  </div>
                  <div className="text-xl font-bold text-slate-900">
                    {selectedUni.acceptanceRate}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Panel: Analysis Details */}
            <div className="w-full md:w-2/3 p-8 overflow-y-auto bg-white min-h-[400px]">
              <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <TrendingUp className="text-indigo-600" /> AI Application
                Analysis
              </h3>

              {loadingAnalysis ? (
                <div className="flex flex-col items-center justify-center h-64 gap-4 text-slate-400">
                  <Loader2 size={40} className="animate-spin text-indigo-500" />
                  <p className="text-sm font-medium animate-pulse">
                    Analyzing with Gemini AI...
                  </p>
                </div>
              ) : analysis ? (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  {/* Strengths */}
                  <div>
                    <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2 text-sm uppercase tracking-wide">
                      <Award size={16} className="text-amber-500" /> Your
                      Strengths
                    </h4>
                    <ul className="space-y-3">
                      {analysis.strengths?.map((item: any, i: number) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 bg-emerald-50/50 p-3 rounded-lg border border-emerald-100"
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 mt-2 shrink-0"></span>
                          <span className="text-slate-700 text-sm leading-relaxed">
                            {item.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Areas for Improvement / Focus */}
                  <div>
                    <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2 text-sm uppercase tracking-wide">
                      <BookOpen size={16} className="text-blue-500" />{" "}
                      Recommended Focus
                    </h4>
                    <ul className="space-y-3">
                      {analysis.focusAreas?.map((item: any, i: number) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 bg-blue-50/50 p-3 rounded-lg border border-blue-100"
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-2 shrink-0"></span>
                          <span className="text-slate-700 text-sm leading-relaxed">
                            {item.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Alumni Insights */}
                  <div>
                    <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2 text-sm uppercase tracking-wide">
                      <Users size={16} className="text-purple-500" /> Alumni
                      Insights
                    </h4>
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                      <p className="text-slate-600 text-sm leading-relaxed italic relative">
                        <span className="text-4xl text-slate-200 absolute -top-2 -left-2">
                          "
                        </span>
                        {analysis.alumniInsights}
                        <span className="text-4xl text-slate-200 absolute -bottom-4 right-0">
                          "
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-slate-400">
                  <p>Unable to generate analysis.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
