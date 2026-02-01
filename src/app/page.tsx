import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-slate-900">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 md:px-12 lg:px-20 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <img
            src="/Ellipse 11.png"
            alt="DeepcampusAI Logo"
            className="h-12 w-12 object-contain"
          />
          <span className="text-xl font-bold tracking-tight">DeepCampusAI</span>
        </div>
        <div className="hidden items-center gap-8 md:flex">
          <Link
            href="/about"
            className="text-sm font-medium text-slate-600 hover:text-slate-900"
          >
            About
          </Link>
          <Link
            href="/features"
            className="text-sm font-medium text-slate-600 hover:text-slate-900"
          >
            Features
          </Link>
          <Link
            href="/universities"
            className="text-sm font-medium text-slate-600 hover:text-slate-900"
          >
            Universities
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="text-sm font-bold text-slate-700 hover:text-slate-900"
          >
            Log In
          </Link>
          <Link
            href="/signup"
            className="flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-bold text-white transition-all hover:bg-slate-800 hover:shadow-lg hover:scale-105"
          >
            Get Started <ArrowRight size={16} />
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex flex-1 flex-col items-center justify-center px-6 py-20 text-center md:px-12 lg:py-32">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-1.5 text-sm font-medium text-slate-600">
          <Sparkles size={14} className="text-blue-600" />
          <span>Updates 2.0 is live</span>
        </div>
        <h1 className="mx-auto mb-6 max-w-4xl text-5xl font-black tracking-tight text-slate-900 md:text-7xl lg:leading-tight">
          Supercharge your <br />
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Study Abroad
          </span>{" "}
          Journey.
        </h1>
        <p className="mx-auto mb-10 max-w-2xl text-lg text-slate-500 md:text-xl">
          AI-powered guidance, university shortlisting, and application
          management. All in one place.
        </p>

        <div className="flex flex-col gap-4 sm:flex-row">
          <Link
            href="/signup"
            className="flex h-14 items-center justify-center gap-2 rounded-full bg-slate-900 px-8 text-lg font-bold text-white transition-all hover:bg-slate-800 hover:shadow-xl hover:scale-105"
          >
            Start for Free <ArrowRight size={20} />
          </Link>
          <Link
            href="/about"
            className="flex h-14 items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-8 text-lg font-bold text-slate-700 transition-all hover:bg-slate-50"
          >
            Learn more
          </Link>
        </div>

        {/* Feature Grid / Social Proof */}
        <div className="mt-24 grid w-full max-w-5xl grid-cols-1 gap-8 md:grid-cols-3">
          {[
            { title: "2,500+", subtitle: "Universities Tracked" },
            { title: "98%", subtitle: "Acceptance Rate" },
            { title: "AI", subtitle: "Personalized Guidance" },
          ].map((stat, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"
            >
              <span className="text-4xl font-black text-slate-900">
                {stat.title}
              </span>
              <span className="text-sm font-medium text-slate-500 uppercase tracking-widest mt-1">
                {stat.subtitle}
              </span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
