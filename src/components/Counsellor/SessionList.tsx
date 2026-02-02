"use client";

import React from "react";
import { MessageSquare, Trash2, Plus } from "lucide-react";
import { motion } from "framer-motion";

interface Session {
  id: string;
  title: string;
  updatedAt: string;
  personality?: string;
}

interface SessionListProps {
  sessions: Session[];
  currentSessionId: string | null;
  onSelectSession: (id: string) => void;
  onDeleteSession: (id: string) => void;
  onNewChat: () => void;
}

export default function SessionList({
  sessions,
  currentSessionId,
  onSelectSession,
  onDeleteSession,
  onNewChat,
}: SessionListProps) {
  return (
    <div className="flex flex-col h-full w-64 border-r border-gray-300 bg-[#F9FAFB] p-4">
      <button
        onClick={onNewChat}
        className="mb-6 flex w-full items-center justify-center gap-2 rounded-xl bg-black px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-gray-800 hover:shadow-lg active:scale-95"
      >
        <Plus size={18} />
        New Chat
      </button>

      <div className="mb-2 px-2 text-xs font-bold uppercase tracking-wider text-gray-400">
        History
      </div>

      <div className="flex-1 overflow-y-auto space-y-1 pr-1 scrollbar-thin">
        {sessions.map((session) => (
          <div
            key={session.id}
            onClick={() => onSelectSession(session.id)}
            className={`group flex items-center justify-between rounded-lg px-3 py-2.5 text-sm transition-all cursor-pointer ${
              currentSessionId === session.id
                ? "bg-white text-gray-900 shadow-sm border border-gray-200"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            }`}
          >
            <div className="flex items-center gap-3 overflow-hidden">
              <MessageSquare size={16} className="shrink-0" />
              <div className="flex flex-col overflow-hidden">
                <span className="truncate font-medium">{session.title}</span>
                <span className="text-[10px] text-gray-400 truncate capitalize">
                  {session.personality || "Friendly"} •{" "}
                  {new Date(session.updatedAt).toLocaleDateString()}
                </span>
              </div>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDeleteSession(session.id);
              }}
              className="opacity-0 transition-opacity hover:text-red-600 group-hover:opacity-100 p-1 rounded hover:bg-red-50"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
        {sessions.length === 0 && (
          <div className="px-3 py-4 text-center text-xs text-gray-400">
            No history yet
          </div>
        )}
      </div>
    </div>
  );
}
