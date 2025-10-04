"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

type Msg = { id: string; role: "user" | "assistant" | "system"; text: string };

export default function ChatWidget() {
  const [open, setOpen] = useState(true);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([
    {
      id: "sys",
      role: "system",
      text: `
You are JG Camps & Resorts travel assistant.
Rules:
- NEVER mention hotel, resort, homestay or property names.
- For any stay or booking requests, always say:
  "For accommodation and personalized plans, please contact JG Camps & Resorts at 📞 8595167227 / 8076874150 or ✉️ jgadven@gmail.com."
- Be short, helpful, and travel-focused.`,
    },
    {
      id: "welcome",
      role: "assistant",
      text: "👋 Hi there! I’m your JG Camps & Resorts travel assistant. Ask me about itineraries, best times to visit, or adventure ideas.",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  const pushMessage = (m: Msg) => setMessages((prev) => [...prev, m]);

  async function sendMessage() {
    const text = input.trim();
    if (!text) return;

    const userMsg: Msg = { id: `u-${Date.now()}`, role: "user", text };
    pushMessage(userMsg);
    setInput("");
    setLoading(true);

    try {
      const system = messages.find((m) => m.role === "system")?.text ?? "";

      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            { role: "system", content: system },
            { role: "user", content: text },
          ],
        }),
      });

      const json = await res.json();
      const replyText =
        (json?.reply ?? "Sorry — I couldn’t generate a reply.") +
        "\n\n📩 *For stay bookings or packages, please contact JG Camps & Resorts — 8595167227 / 8076874150 or jgadven@gmail.com*";

      pushMessage({ id: `a-${Date.now()}`, role: "assistant", text: replyText });
    } catch (err) {
      pushMessage({
        id: `err-${Date.now()}`,
        role: "assistant",
        text: "⚠️ Sorry — there was an issue connecting. Please try again in a moment.",
      });
    } finally {
      setLoading(false);
    }
  }

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const quickAsk = async (q: string) => {
    setInput(q);
    await new Promise((r) => setTimeout(r, 50));
    sendMessage();
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 text-slate-800 font-sans">
      {/* Chat box */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-[370px] bg-white shadow-2xl rounded-2xl overflow-hidden border border-slate-200"
      >
        {/* Header */}
        <div className="flex justify-between items-center px-4 py-3 bg-gradient-to-r from-emerald-800 to-emerald-700 text-white">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 rounded-full p-2">💬</div>
            <div>
              <div className="font-semibold">Travel Assistant</div>
              <div className="text-xs opacity-75">Online • replies instantly</div>
            </div>
          </div>
          <button
            onClick={() => setOpen((o) => !o)}
            className="hover:bg-white/10 rounded-full px-2 text-lg"
          >
            {open ? "▾" : "▴"}
          </button>
        </div>

        {open && (
          <>
            {/* Messages */}
            <div ref={scrollRef} className="h-[320px] overflow-y-auto p-3 space-y-3 bg-gray-50">
              {messages
                .filter((m) => m.role !== "system")
                .map((m) => (
                  <motion.div
                    key={m.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${m.role === "assistant" ? "justify-start" : "justify-end"}`}
                  >
                    <div
                      className={`px-3 py-2 rounded-xl text-sm whitespace-pre-wrap leading-relaxed shadow-sm ${
                        m.role === "assistant"
                          ? "bg-white text-slate-800 border border-slate-200"
                          : "bg-emerald-700 text-white"
                      }`}
                      style={{ maxWidth: "85%" }}
                    >
                      {m.text}
                    </div>
                  </motion.div>
                ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white border rounded-xl px-3 py-2 text-sm text-slate-500 animate-pulse">
                    Typing...
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-3 border-t bg-white">
              <div className="flex items-center gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  placeholder="Type your message..."
                  className="flex-1 border rounded-full px-3 py-2 text-sm focus:ring-1 focus:ring-emerald-600"
                />
                <button
                  onClick={sendMessage}
                  disabled={loading}
                  className="bg-emerald-700 text-white px-4 py-2 rounded-full text-sm hover:bg-emerald-800 disabled:opacity-60"
                >
                  {loading ? "…" : "Send"}
                </button>
              </div>

              {/* Quick Ask */}
              <div className="flex flex-wrap gap-2 mt-3 text-xs">
                <button
                  onClick={() => quickAsk("3-day itinerary for Shimla")}
                  className="border border-slate-200 px-3 py-1 rounded-full hover:bg-slate-100"
                >
                  Shimla itinerary
                </button>
                <button
                  onClick={() => quickAsk("Best time to visit Manali")}
                  className="border border-slate-200 px-3 py-1 rounded-full hover:bg-slate-100"
                >
                  Best time: Manali
                </button>
                <button
                  onClick={() => quickAsk("Adventure trip in Himachal")}
                  className="border border-slate-200 px-3 py-1 rounded-full hover:bg-slate-100"
                >
                  Himachal adventure
                </button>
              </div>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}
