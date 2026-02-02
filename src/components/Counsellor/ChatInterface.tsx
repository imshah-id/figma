"use client";

import React, { useState, useRef, useEffect } from "react";
import { Send, User as UserIcon, Bot, Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Message {
  role: "user" | "assistant" | "system";
  content: string;
}

const PERSONALITIES = [
  { id: "friendly", label: "Friendly Mentor", emoji: "😊" },
  { id: "strict", label: "Strict Interviewer", emoji: "🤨" },
  { id: "professional", label: "Professional Counsellor", emoji: "👔" },
];

export default function ChatInterface({
  userName,
  sessionId,
  initialMessages,
  onMessageSent,
}: {
  userName: string;
  sessionId: string | null;
  initialMessages?: Message[];
  onMessageSent: () => void;
}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [personality, setPersonality] = useState("friendly");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize messages when switching sessions
  useEffect(() => {
    if (initialMessages && initialMessages.length > 0) {
      // Filter out system messages for display
      const displayMessages = initialMessages.filter(
        (m) => m.role !== "system",
      );
      setMessages(displayMessages);
    } else {
      setMessages([
        {
          role: "assistant",
          content: `Hello ${userName}! I'm your AI Counsellor. Choose a personality above if you'd like a different style. How can I help today?`,
        },
      ]);
    }
  }, [sessionId, initialMessages, userName]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      // If we have a sessionId, the backend handles history.
      // If NOT, we send client history (this logic is simplified for now).
      // Ideally, creating a session first is better, but this works for hybrid.
      const payloadMessages = sessionId ? [] : messages;

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage,
          messages: payloadMessages, // Send specific history if needed
          sessionId,
          personality,
          stream: true,
        }),
      });

      if (!response.ok) throw new Error("Failed to fetch response");

      // Notify parent to refresh session list if it's a new chat to get title update
      // But actually title update on new chat is tricky without polling.
      // We'll rely on onMessageSent event.
      onMessageSent();

      // Handle Streaming Response
      if (response.body) {
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let botReply = "";

        // Add placeholder message
        setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          botReply += chunk;

          // Update the last message with the accumulated chunk
          setMessages((prev) => {
            const newMessages = [...prev];
            newMessages[newMessages.length - 1].content = botReply;
            return newMessages;
          });
        }
      } else {
        // Fallback for non-streaming
        const data = await response.json();
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.reply },
        ]);
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I'm having trouble connecting right now. Please try again later.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-full flex-col bg-white overflow-hidden">
      {/* Header / Personality Selector */}
      <div className="flex items-center justify-between border-b border-gray-300 px-4 py-3 bg-gray-50/50">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            Personality:
          </span>
          <div className="flex bg-gray-200 rounded-lg p-1">
            {PERSONALITIES.map((p) => (
              <button
                key={p.id}
                onClick={() => !sessionId && setPersonality(p.id)} // Disable switching mid-session for consistency if desired, or allow dynamic
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                  personality === p.id
                    ? "bg-white text-black shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                } ${sessionId ? "cursor-not-allowed opacity-80" : ""}`}
                title={sessionId ? "Start new chat to change personality" : ""}
              >
                <span>{p.emoji}</span>
                <span className="hidden sm:inline">{p.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-gray-200">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex gap-4 ${
              msg.role === "user" ? "flex-row-reverse" : "flex-row"
            }`}
          >
            <div
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border ${
                msg.role === "user"
                  ? "bg-blue-100 border-blue-200"
                  : "bg-purple-100 border-purple-200"
              }`}
            >
              {msg.role === "user" ? (
                <UserIcon className="h-5 w-5 text-blue-600" />
              ) : (
                <Bot className="h-5 w-5 text-purple-600" />
              )}
            </div>

            <div
              className={`max-w-[80%] rounded-2xl px-5 py-3.5 text-sm leading-6 shadow-sm ${
                msg.role === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-[#F9FAFB] border border-[#E5E7EB] text-gray-800"
              }`}
            >
              {msg.role === "assistant" ? (
                <div className="prose prose-sm max-w-none prose-p:leading-6 prose-li:marker:text-gray-400">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {msg.content}
                  </ReactMarkdown>
                </div>
              ) : (
                <p className="whitespace-pre-wrap">{msg.content}</p>
              )}
            </div>
          </div>
        ))}
        {isLoading && messages[messages.length - 1]?.role === "user" && (
          <div className="flex gap-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border bg-purple-100 border-purple-200">
              <Bot className="h-5 w-5 text-purple-600" />
            </div>
            <div className="flex items-center gap-2 rounded-2xl bg-[#F9FAFB] border border-[#E5E7EB] px-5 py-3.5 shadow-sm">
              <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
              <span className="text-sm text-gray-500">Thinking...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-300 bg-white p-4">
        <form
          onSubmit={handleSubmit}
          className="relative flex items-center rounded-xl border border-gray-300 bg-white shadow-sm focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              sessionId
                ? "Continue conversation..."
                : "Start a new conversation..."
            }
            className="flex-1 bg-transparent px-4 py-3.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="mr-2 rounded-lg p-2 text-blue-600 hover:bg-blue-50 disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
          >
            <Send className="h-5 w-5" />
          </button>
        </form>
        <p className="mt-2 text-center text-xs text-gray-400">
          AI can make mistakes. Verify important information.
        </p>
      </div>
    </div>
  );
}
