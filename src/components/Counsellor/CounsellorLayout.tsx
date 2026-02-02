"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar/Sidebar";
import Header from "@/components/Header/Header";
import ChatInterface from "@/components/Counsellor/ChatInterface";
import SessionList from "@/components/Counsellor/SessionList";

export default function CounsellorLayout({ userName }: { userName: string }) {
  const [sessions, setSessions] = useState([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [initialMessages, setInitialMessages] = useState([]);

  const fetchSessions = async () => {
    try {
      const res = await fetch("/api/chat/sessions");
      if (res.ok) {
        const data = await res.json();
        setSessions(data.sessions);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  const handleSelectSession = async (id: string) => {
    setCurrentSessionId(id);
    try {
      const res = await fetch(`/api/chat/sessions/${id}`);
      if (res.ok) {
        const data = await res.json();
        setInitialMessages(JSON.parse(data.session.messages));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleNewChat = () => {
    setCurrentSessionId(null);
    setInitialMessages([]);
    // Optionally create session immediately here, but we let first message do it or ChatInterface handle it?
    // Based on ChatInterface logic, it sends sessionId=null for new chat.
  };

  const handleDeleteSession = async (id: string) => {
    try {
      await fetch(`/api/chat/sessions/${id}`, { method: "DELETE" });
      setSessions((prev) => prev.filter((s: any) => s.id !== id));
      if (currentSessionId === id) {
        handleNewChat();
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex min-h-screen items-start justify-center bg-white">
      <div className="relative flex w-full max-w-[1800px] justify-center gap-6 px-4 py-6 md:gap-12 md:px-6 md:py-8 lg:pl-8 lg:pr-8 lg:py-4">
        <Sidebar />
        <main className="w-full max-w-[1440px]">
          <div className="flex flex-1 flex-col h-[calc(100vh-6rem)] gap-6">
            <Header
              userName={userName}
              showWelcome={false}
              showAction={false}
            />
            <div className="flex flex-1 overflow-hidden rounded-2xl border border-gray-300 bg-white shadow-md">
              <SessionList
                sessions={sessions}
                currentSessionId={currentSessionId}
                onSelectSession={handleSelectSession}
                onDeleteSession={handleDeleteSession}
                onNewChat={handleNewChat}
              />
              <div className="flex-1 animate-fade-in">
                <ChatInterface
                  userName={userName}
                  sessionId={currentSessionId}
                  initialMessages={initialMessages}
                  onMessageSent={fetchSessions} // Refresh list to show new chat or update title
                  onSessionCreated={(id) => setCurrentSessionId(id)}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
