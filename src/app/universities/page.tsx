import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Sidebar from "@/components/Sidebar/Sidebar";
import Header from "@/components/Header/Header";
import { getUniversities } from "@/lib/universities";
import { Sparkles, MapPin, DollarSign, GraduationCap } from "lucide-react";

export default async function UniversitiesPage() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  let profile = null;
  try {
    profile = await prisma.profile.findUnique({
      where: { userId: session.userId },
      include: { user: true },
    });
  } catch (e) {
    // Fallback if needed, though getUniversities handles offline better if we use it directly?
    // Actually getUniversities also uses prisma, so it might fail with P1001.
    // We should allow it to fail gracefully or use mock data if DB is down?
    // relying on getUniversities internal error handling which returns []
  }

  const universities = await getUniversities(1, 100);

  return (
    <div className="flex min-h-screen items-start justify-center bg-white">
      <div className="relative flex w-full max-w-[1800px] justify-center gap-6 px-4 py-6 md:gap-12 md:px-6 md:py-8 lg:pl-8 lg:pr-8 lg:py-4">
        <Sidebar />
        <main className="w-full max-w-[1440px]">
          <div className="flex flex-1 flex-col overflow-y-auto pl-0 lg:pl-4 gap-8">
            <Header
              userName={profile?.user?.fullName || session.email.split("@")[0]}
            />

            <div className="flex flex-col gap-6">
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                  Explore Universities
                </h1>
                <p className="text-slate-500 mt-2">
                  Discover top universities matched to your profile and
                  preferences.
                </p>
              </div>

              {universities.length === 0 ? (
                <div className="p-12 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                  <p className="text-slate-500">
                    No universities found or database is offline.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {universities.map((uni: any) => (
                    <div
                      key={uni.id}
                      className="group relative flex flex-col rounded-2xl border border-slate-200 bg-white p-5 transition-all hover:shadow-lg hover:-translate-y-1"
                    >
                      {/* Match Score Badge */}
                      <div className="absolute top-4 right-4 z-10">
                        <div
                          className={`px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${
                            uni.matchScore >= 80
                              ? "bg-green-100 text-green-700"
                              : uni.matchScore >= 60
                                ? "bg-amber-100 text-amber-700"
                                : "bg-slate-100 text-slate-700"
                          }`}
                        >
                          <Sparkles size={12} />
                          {uni.matchScore}% Match
                        </div>
                      </div>

                      {/* Content */}
                      <div className="mt-2 mb-4">
                        <h3 className="text-lg font-bold text-slate-900 line-clamp-1">
                          {uni.name}
                        </h3>
                        <div className="flex items-center gap-1 text-slate-500 text-sm mt-1">
                          <MapPin size={14} />
                          {uni.location}
                        </div>
                      </div>

                      <div className="mt-auto space-y-3">
                        <div className="flex items-center justify-between text-sm py-2 border-t border-slate-100">
                          <div className="flex items-center gap-1.5 text-slate-600 font-medium">
                            <DollarSign size={14} className="text-slate-400" />
                            <span>Fees</span>
                          </div>
                          <span className="text-slate-900">
                            {uni.fees || "N/A"}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm py-2 border-t border-slate-100">
                          <div className="flex items-center gap-1.5 text-slate-600 font-medium">
                            <GraduationCap
                              size={14}
                              className="text-slate-400"
                            />
                            <span>Rank</span>
                          </div>
                          <span className="font-bold text-slate-900">
                            #{uni.rank}
                          </span>
                        </div>

                        <button className="w-full py-2.5 rounded-xl bg-slate-900 text-white text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
