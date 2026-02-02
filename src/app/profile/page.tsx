import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Sidebar from "@/components/Sidebar/Sidebar";
import Header from "@/components/Header/Header";
import ProfileActions from "@/components/Profile/ProfileActions";
import {
  User as UserIcon,
  Mail,
  GraduationCap,
  BookOpen,
  Globe,
  Wallet,
  FileText,
  Award,
  Calendar,
} from "lucide-react";

export default async function ProfilePage() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  const profile = await prisma.profile.findUnique({
    where: { userId: session.userId },
    include: { user: true },
  });

  if (!profile) {
    // Should ideally not happen if onboarding is done, but safe fallback
    redirect("/onboarding");
  }

  const user = profile.user;

  // Helper to parse JSON strings safely
  const getPreferredCountries = () => {
    try {
      return JSON.parse(profile.preferredCountries || "[]");
    } catch {
      return [];
    }
  };

  const countries = getPreferredCountries();

  // Merge profile data directly onto user for cleaner passing to client
  const fullUserData = { ...user, ...profile };

  return (
    <div className="flex min-h-screen items-start justify-center bg-white">
      <div className="relative flex w-full max-w-[1800px] justify-center gap-6 px-4 py-6 md:gap-12 md:px-6 md:py-8 lg:pl-8 lg:pr-8 lg:py-4">
        <Sidebar />
        <main className="w-full max-w-[1440px]">
          <div className="flex flex-1 flex-col overflow-y-auto pl-0 lg:pl-4 gap-8">
            <Header
              userName={user.fullName}
              showWelcome={false}
              showAction={false}
            />

            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                  My Profile
                </h1>
                <ProfileActions user={fullUserData} />
              </div>

              {/* Personal Info Card */}
              <div className="rounded-2xl border border-gray-300 bg-white p-6 shadow-sm">
                <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <UserIcon className="w-5 h-5 text-blue-600" />
                  Personal Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                  <div className="space-y-1">
                    <p className="text-gray-500 font-medium">Full Name</p>
                    <p className="text-gray-900 font-semibold text-base">
                      {user.fullName}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-gray-500 font-medium">Email Address</p>
                    <div className="flex items-center gap-2 text-gray-900 font-semibold text-base">
                      <Mail className="w-4 h-4 text-gray-400" />
                      {user.email}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-gray-500 font-medium">Citizenship</p>
                    <p className="text-gray-900 font-semibold text-base">
                      {profile.citizenship || "Not specified"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Academic Profile */}
                <div className="rounded-2xl border border-gray-300 bg-white p-6 shadow-sm">
                  <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-blue-600" />
                    Academic Profile
                  </h2>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                      <span className="text-gray-600 font-medium">
                        Qualifications
                      </span>
                      <span className="text-gray-900 font-bold">
                        {profile.highestQualification}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                      <span className="text-gray-600 font-medium">
                        Current Field
                      </span>
                      <span className="text-gray-900 font-bold">
                        {profile.fieldOfStudy}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                      <span className="text-gray-600 font-medium">GPA</span>
                      <span className="text-gray-900 font-bold">
                        {profile.gpa} / {profile.gpaScale || "4.0"}
                      </span>
                    </div>
                    {profile.testScore && (
                      <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                        <span className="text-gray-600 font-medium">
                          Test Score
                        </span>
                        <span className="text-gray-900 font-bold">
                          {profile.testScore}
                        </span>
                      </div>
                    )}
                    {profile.englishTest && profile.englishTest !== "None" && (
                      <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                        <span className="text-gray-600 font-medium">
                          English Test
                        </span>
                        <span className="text-gray-900 font-bold">
                          {profile.englishTest}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Study Goals */}
                <div className="rounded-2xl border border-gray-300 bg-white p-6 shadow-sm">
                  <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                    Study Goals
                  </h2>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                      <span className="text-gray-600 font-medium">
                        Target Degree
                      </span>
                      <span className="text-gray-900 font-bold">
                        {profile.targetDegree}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                      <span className="text-gray-600 font-medium">
                        Target Major
                      </span>
                      <span className="text-gray-900 font-bold">
                        {profile.targetMajor}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                      <span className="text-gray-600 font-medium">
                        Target Intake
                      </span>
                      <div className="flex items-center gap-2 text-gray-900 font-bold">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        {profile.targetIntake}
                      </div>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                      <span className="text-gray-600 font-medium">Budget</span>
                      <div className="flex items-center gap-2 text-gray-900 font-bold">
                        <Wallet className="w-4 h-4 text-gray-400" />
                        {profile.budget}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Preferences */}
                <div className="rounded-2xl border border-gray-300 bg-white p-6 shadow-sm">
                  <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <Globe className="w-5 h-5 text-blue-600" />
                    Preferences
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <p className="text-gray-500 font-medium mb-3">
                        Preferred Destinations
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {countries.length > 0 ? (
                          countries.map((c: string) => (
                            <span
                              key={c}
                              className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-semibold border border-blue-100"
                            >
                              {c}
                            </span>
                          ))
                        ) : (
                          <span className="text-gray-400 italic">
                            No Specific Preference
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Application Status */}
                <div className="rounded-2xl border border-gray-300 bg-white p-6 shadow-sm">
                  <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <Award className="w-5 h-5 text-blue-600" />
                    Application Readiness
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4 p-3 rounded-xl bg-gray-50 border border-gray-100">
                      <div className="p-2 bg-white rounded-lg shadow-sm">
                        <FileText className="w-5 h-5 text-purple-500" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900">
                          Statement of Purpose
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          {profile.sopStatus || "No status update"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-3 rounded-xl bg-gray-50 border border-gray-100">
                      <div className="p-2 bg-white rounded-lg shadow-sm">
                        <FileText className="w-5 h-5 text-orange-500" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900">
                          Letters of Recommendation
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          {profile.lorCount
                            ? `${profile.lorCount} Letters`
                            : "None recorded"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
