"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Loader2, Send } from "lucide-react";
import ReactMarkdown from "react-markdown";

export default function DashboardAIInsight({
  userName = "Student",
  compact = false,
}: {
  userName?: string;
  compact?: boolean;
}) {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    setIsLoading(true);
    const question = input;
    setInput("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        body: JSON.stringify({
          message: question,
          sessionId: sessionId,
          stream: false, // Use non-streaming for simple widget interaction
        }),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error("Failed");

      const data = await res.json();
      setResponse(data.reply);
      if (data.sessionId) {
        setSessionId(data.sessionId);
      }
    } catch (err) {
      setResponse("I'm having a bit of trouble connecting. Try again!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.1, delay: 0.05, ease: [0.23, 1, 0.32, 1] }}
      whileHover={{ y: -4 }}
      className={`flex flex-col overflow-hidden rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50 to-white p-6 shadow-sm transition-all duration-300 hover:shadow-md ${
        compact ? "h-auto" : "min-h-[480px] h-full"
      }`}
    >
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-indigo-950 tracking-tight flex items-center gap-2">
            AI Counsellor
          </h3>
          <p className="text-sm text-indigo-900/60 font-medium">
            Ask me anything about your application
          </p>
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-4">
        {/* Chat Area */}
        <div className="flex-1 rounded-xl bg-white/60 border border-indigo-100 p-4 overflow-y-auto max-h-[300px]">
          {response ? (
            <div className="prose prose-sm text-indigo-950">
              <ReactMarkdown>{response}</ReactMarkdown>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center text-indigo-300 gap-2">
              <Sparkles className="w-8 h-8 opacity-50" />
              <p className="text-sm font-medium">
                "How do I improve my SOP?"
                <br />
                "What's a good safety school?"
              </p>
            </div>
          )}
        </div>

        {/* Input */}
        <form onSubmit={handleAsk} className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask your question..."
            disabled={isLoading}
            className="w-full bg-white border border-indigo-200 rounded-xl pl-4 pr-12 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm placeholder:text-indigo-300"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="absolute right-2 top-1.5 p-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:hover:bg-indigo-600 transition-colors"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </button>
        </form>
      </div>

      {!compact && (
        <div className="mt-6">
          <button className="w-full py-3 rounded-xl border border-indigo-200 text-indigo-700 font-bold text-sm hover:bg-indigo-50 transition-colors flex items-center justify-center gap-2">
            Open Full Chat <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </motion.div>
  );
}
