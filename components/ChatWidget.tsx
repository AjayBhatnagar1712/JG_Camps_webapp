// components/ChatWidget.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import { MessageCircle, X } from "lucide-react";

type Msg = { id: string; role: "user" | "assistant"; text: string; at: string };

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Msg[]>(() => [
    {
      id: "welcome",
      role: "assistant",
      text:
        "👋 Hi! I’m your JG Camps & Resorts assistant. Ask about itineraries, best time to visit, or travel ideas.",
      at: new Date().toISOString(),
    },
  ]);

  const scrollRef = useRef<HTMLDivElement | null>(null);

  // compute offsets so widget sits above global CTAs (if present)
  const [bottomOffset, setBottomOffset] = useState(20);
  const [rightOffset, setRightOffset] = useState(20);

  useEffect(() => {
    function computeOffsets() {
      const globalCTAs = document.querySelector("#global-ctas"); // your Contact Expert container id (if any)
      const safe = 14;
      let bottom = 20;
      if (globalCTAs instanceof HTMLElement) {
        const r = globalCTAs.getBoundingClientRect();
        bottom = Math.max(16, r.height + safe);
      } else {
        bottom = 20;
      }
      // keep a slightly larger right offset on desktop
      const right = window.innerWidth > 768 ? 24 : 12;
      setBottomOffset(bottom);
      setRightOffset(right);
    }
    computeOffsets();
    window.addEventListener("resize", computeOffsets);
    return () => window.removeEventListener("resize", computeOffsets);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight + 200;
    }
  }, [messages, open]);

  function pushMessage(role: Msg["role"], text: string) {
    const m: Msg = {
      id: Math.random().toString(36).slice(2),
      role,
      text,
      at: new Date().toISOString(),
    };
    setMessages((s) => [...s, m]);
    return m;
  }

  async function handleSend(e?: React.FormEvent) {
    e?.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;
    pushMessage("user", trimmed);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [{ role: "user", content: trimmed }] }),
      });
      const data = await res.json();
      let reply = data?.reply || "Sorry — I couldn’t generate a reply.";

      // Replace any hotel/resort names in reply with contact instruction (as requested)
      reply = reply.replace(
        /\b(hotel|resort|villa|lodge|guesthouse|homestay|accommodation)\b/gi,
        "please contact JG Camps & Resorts for stay bookings (📞 8595167227 / 8076874150 • ✉️ jgadven@gmail.com)"
      );

      pushMessage("assistant", reply);
    } catch (err) {
      console.error("Chat send error:", err);
      pushMessage(
        "assistant",
        "Sorry — something went wrong. Please try again or contact us directly at 8595167227 / 8076874150 or jgadven@gmail.com."
      );
    } finally {
      setLoading(false);
      setOpen(true);
    }
  }

  const containerStyle: React.CSSProperties = {
    position: "fixed",
    right: `${rightOffset}px`,
    bottom: `${bottomOffset}px`,
    zIndex: 9999,
  };

  return (
    <div style={containerStyle} className="pointer-events-auto">
      {/* Collapsed button (compact) */}
      {!open ? (
        <button
          aria-label="Open chat"
          onClick={() => setOpen(true)}
          className="flex items-center justify-center rounded-full bg-emerald-700 hover:bg-emerald-800 text-white shadow-lg w-12 h-12 md:w-14 md:h-14"
          title="Chat with us"
          style={{ boxShadow: "0 6px 18px rgba(10,40,20,0.35)" }}
        >
          <MessageCircle className="h-5 w-5" />
        </button>
      ) : (
        <div className="w-[92vw] max-w-[420px] md:w-96 bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
          <div className="flex items-center justify-between px-4 py-3 bg-emerald-800 text-white">
            <div className="flex items-center gap-3">
              <MessageCircle className="h-5 w-5" />
              <div>
                <div className="font-semibold">Travel Assistant</div>
                <div className="text-xs opacity-90">Online · replies instantly</div>
              </div>
            </div>

            <button
              onClick={() => setOpen(false)}
              aria-label="Minimize"
              className="rounded-full p-1 hover:bg-white/10"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages area */}
          <div
            ref={scrollRef}
            className="p-4 max-h-[55vh] overflow-auto flex flex-col gap-3 bg-white"
          >
            {messages.map((m) =>
              m.role === "assistant" ? (
                <div
                  key={m.id}
                  className="self-start max-w-[86%] bg-emerald-50 p-3 rounded-lg text-sm text-gray-800"
                >
                  <div className="whitespace-pre-wrap">{m.text}</div>
                  <div className="text-xs text-gray-400 mt-1">
                    {new Date(m.at).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              ) : (
                <div
                  key={m.id}
                  className="self-end max-w-[86%] bg-emerald-700 text-white p-3 rounded-lg text-sm text-right"
                >
                  <div className="whitespace-pre-wrap">{m.text}</div>
                  <div className="text-xs text-emerald-200 mt-1">
                    {new Date(m.at).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              )
            )}
          </div>

          {/* Input area */}
          <div className="p-4 border-t border-gray-100">
            <form onSubmit={handleSend} className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 rounded-full border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-600"
                aria-label="Type your message"
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2 rounded-full disabled:opacity-60"
              >
                {loading ? "…" : "Send"}
              </button>
            </form>

            <div className="mt-3 flex flex-wrap gap-2">
              <button
                onClick={() => {
                  setInput("3-day itinerary for Shimla");
                  setTimeout(() => handleSend(), 80);
                }}
                className="text-xs rounded-full border px-3 py-1 hover:bg-gray-50"
              >
                3-day Shimla
              </button>
              <button
                onClick={() => {
                  setInput("Best time to visit Manali");
                  setTimeout(() => handleSend(), 80);
                }}
                className="text-xs rounded-full border px-3 py-1 hover:bg-gray-50"
              >
                Best time: Manali
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
