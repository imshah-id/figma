"use client";
import React, { useState } from "react";
import {
  Menu,
  X,
  LayoutGrid,
  MessageSquare,
  School,
  CheckSquare,
  User,
  LogOut,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "Dashboard", icon: LayoutGrid, active: true },
    { label: "AI Counsellor", icon: MessageSquare, active: false },
    { label: "Universities", icon: School, active: false },
    { label: "Tasks", icon: CheckSquare, active: false },
    { label: "Profile", icon: User, active: false },
  ];

  return (
    <div className="xl:hidden">
      <button
        onClick={() => setIsOpen(true)}
        className="flex h-10 w-10 items-center justify-center rounded-lg border border-card-border bg-card text-text-primary"
      >
        <Menu size={24} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[110] bg-black/40 backdrop-blur-sm"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 top-0 z-[120] flex w-[280px] flex-col bg-[#f4f2f2] p-6 shadow-2xl"
            >
              <div className="mb-8 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600">
                    <Sparkles size={16} fill="white" strokeWidth={0} />
                  </div>
                  <span className="text-base font-bold text-text-primary">
                    DeepcampusAI
                  </span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg p-1 text-text-secondary hover:bg-gray-200"
                >
                  <X size={24} />
                </button>
              </div>

              <nav className="flex flex-1 flex-col gap-1">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    href="#"
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 rounded-lg px-3 py-3 text-[15px] transition-all ${
                      item.active
                        ? "bg-black font-medium text-white shadow-md"
                        : "font-normal text-gray-500 hover:bg-gray-200 hover:text-text-primary"
                    }`}
                  >
                    <item.icon size={18} strokeWidth={2} />
                    <span>{item.label}</span>
                  </Link>
                ))}
              </nav>

              <div className="mt-auto border-t border-card-border pt-4">
                <Link
                  href="#"
                  className="flex items-center gap-3 rounded-lg px-3 py-3 text-[15px] font-normal text-gray-500 transition-all hover:bg-gray-200 hover:text-text-primary"
                >
                  <LogOut size={18} strokeWidth={2} />
                  <span>Log out</span>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
