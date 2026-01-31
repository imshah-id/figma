import React from "react";
import { Sparkles } from "lucide-react";

export default function Header() {
  return (
    <header className="flex flex-shrink-0 flex-col gap-4 md:flex-row md:items-start md:justify-between md:gap-4">
      <div>
        <h1 className="mb-1 text-2xl font-extrabold tracking-tight text-text-primary">
          Welcome back, Student
        </h1>
        <p className="text-sm text-text-secondary">
          Here&apos;s your study abroad journey overview
        </p>
      </div>
      <button className="flex items-center gap-2.5 rounded-2xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl">
        <Sparkles size={18} />
        Talk to AI Counsellor
      </button>
    </header>
  );
}
