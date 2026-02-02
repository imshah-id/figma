import React from "react";
// We need to import the server component parts or convert this to server component
// This file will be a Server Component

import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Sidebar from "@/components/Sidebar/Sidebar";
import Header from "@/components/Header/Header";
import UniversityCard from "@/components/UniversityCard";
import ShortlistGrid from "@/components/ShortlistGrid";
import StageGuard from "@/components/StageGuard";
import { STAGES } from "@/lib/constants";

export default async function ShortlistPage() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  let profile = await prisma.profile.findUnique({
    where: { userId: session.userId },
    include: { user: true },
  });

  const shortlist = await prisma.shortlist.findMany({
    where: { userId: session.userId },
    include: { university: true },
  });

  return (
    <div className="flex min-h-screen items-start justify-center bg-white">
      <div className="relative flex w-full max-w-[1800px] justify-center gap-6 px-4 py-6 md:gap-12 md:px-6 md:py-8 lg:pl-8 lg:pr-8 lg:py-4">
        <Sidebar />
        <main className="w-full max-w-[1440px]">
          <div className="flex flex-1 flex-col overflow-y-auto pl-0 lg:pl-4 gap-8">
            <Header
              userName={profile?.user?.fullName || session.email.split("@")[0]}
              showWelcome={false}
              showAction={false}
            />

            <StageGuard
              currentStage={profile?.currentStage || STAGES.PROFILE}
              requiredStage={STAGES.DISCOVERY}
            >
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-8">
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                      <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                        My Shortlist
                      </h1>
                      <p className="text-slate-500 mt-2 text-lg">
                        Manage your university selections and track your
                        application eligibility.
                      </p>
                    </div>

                    {shortlist.length > 0 && (
                      <div className="flex items-center gap-2 text-sm font-medium text-slate-600 bg-slate-50 px-4 py-2 rounded-lg border border-slate-100">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                        {shortlist.length} Universities Saved
                      </div>
                    )}
                  </div>

                  {/* Summary Stats Cards */}
                  {shortlist.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-1">
                        <span className="text-xs font-bold text-rose-500 uppercase tracking-wider">
                          Ambitious
                        </span>
                        <span className="text-2xl font-bold text-slate-900">
                          {
                            shortlist.filter(
                              (s) => parseInt(s.university.acceptanceRate) < 20,
                            ).length
                          }
                        </span>
                        <span className="text-xs text-slate-400">
                          Low acceptance rate
                        </span>
                      </div>
                      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-1">
                        <span className="text-xs font-bold text-blue-500 uppercase tracking-wider">
                          Target
                        </span>
                        <span className="text-2xl font-bold text-slate-900">
                          {
                            shortlist.filter(
                              (s) =>
                                parseInt(s.university.acceptanceRate) >= 20 &&
                                parseInt(s.university.acceptanceRate) < 50,
                            ).length
                          }
                        </span>
                        <span className="text-xs text-slate-400">
                          Matches your profile
                        </span>
                      </div>
                      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-1">
                        <span className="text-xs font-bold text-emerald-500 uppercase tracking-wider">
                          Safe
                        </span>
                        <span className="text-2xl font-bold text-slate-900">
                          {
                            shortlist.filter(
                              (s) =>
                                parseInt(s.university.acceptanceRate) >= 50,
                            ).length
                          }
                        </span>
                        <span className="text-xs text-slate-400">
                          High probability
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Comparative Insights Section */}
                  {shortlist.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Financial Overview */}
                      <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex flex-col gap-1">
                            <h3 className="text-lg font-bold text-slate-800">
                              Financial Overview
                            </h3>
                            <p className="text-sm text-slate-500">
                              Estimated annual tuition for your shortlist
                            </p>
                          </div>
                          <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                            <span className="text-xl font-bold">$</span>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="flex justify-between items-end border-b border-slate-50 pb-2">
                            <span className="text-slate-600 font-medium text-sm">
                              Average Tuition
                            </span>
                            <span className="text-xl font-bold text-slate-900">
                              $
                              {Math.round(
                                shortlist.reduce(
                                  (acc, curr) =>
                                    acc +
                                    (parseInt(
                                      curr.university.fees.replace(
                                        /[^0-9]/g,
                                        "",
                                      ),
                                    ) || 0),
                                  0,
                                ) / shortlist.length,
                              ).toLocaleString()}
                            </span>
                          </div>
                          <div className="flex justify-between items-end">
                            <span className="text-slate-600 font-medium text-sm">
                              Highest Fee
                            </span>
                            <span className="text-base font-bold text-slate-900">
                              $
                              {Math.max(
                                ...shortlist.map(
                                  (s) =>
                                    parseInt(
                                      s.university.fees.replace(/[^0-9]/g, ""),
                                    ) || 0,
                                ),
                              ).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Timeline / Deadlines */}
                      <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex flex-col gap-1">
                            <h3 className="text-lg font-bold text-slate-800">
                              Upcoming Deadlines
                            </h3>
                            <p className="text-sm text-slate-500">
                              Key dates for Fall 2026 intake
                            </p>
                          </div>
                          <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <circle cx="12" cy="12" r="10" />
                              <polyline points="12 6 12 12 16 14" />
                            </svg>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-center gap-3">
                            <div className="flex-col flex items-center bg-rose-50 text-rose-600 px-2 py-1 rounded border border-rose-100 min-w-[50px]">
                              <span className="text-[10px] uppercase font-bold">
                                DEC
                              </span>
                              <span className="text-lg font-bold leading-none">
                                01
                              </span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-sm font-bold text-slate-900">
                                Early Action
                              </span>
                              <span className="text-xs text-slate-500">
                                Most US Universities
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 opacity-60">
                            <div className="flex-col flex items-center bg-slate-50 text-slate-500 px-2 py-1 rounded border border-slate-200 min-w-[50px]">
                              <span className="text-[10px] uppercase font-bold">
                                JAN
                              </span>
                              <span className="text-lg font-bold leading-none">
                                15
                              </span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-sm font-bold text-slate-900">
                                Regular Decision
                              </span>
                              <span className="text-xs text-slate-500">
                                Standard Deadline
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="h-px bg-slate-100 w-full"></div>

                  {shortlist.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 bg-slate-50 rounded-[2rem] border border-dashed border-slate-200">
                      <div className="h-16 w-16 mb-4 rounded-full bg-slate-100 flex items-center justify-center">
                        <span className="text-2xl">🎓</span>
                      </div>
                      <h3 className="text-lg font-bold text-slate-900">
                        No universities shortlisted yet
                      </h3>
                      <p className="text-slate-500 mt-1 mb-6 text-center max-w-md">
                        Explore our database and heart your favorite
                        universities to add them here.
                      </p>
                      <a
                        href="/universities"
                        className="px-6 py-3 rounded-xl bg-black text-white font-bold text-sm shadow-md hover:-translate-y-0.5 transition-transform"
                      >
                        Explore Universities
                      </a>
                    </div>
                  ) : (
                    <ShortlistGrid shortlist={shortlist} />
                  )}
                </div>
              </div>
            </StageGuard>
          </div>
        </main>
      </div>
    </div>
  );
}
