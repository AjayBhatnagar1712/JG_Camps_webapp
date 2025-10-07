// components/ChatWidget.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import { MessageCircle, X } from "lucide-react";

type Msg = { id: string; role: "user" | "assistant"; text: string; at: string };

// System prompt ensures branded, on-point replies even if server side didn't enforce it.
// (You can also keep a canonical system prompt server-side; this duplicates it client-side
// as a safety net.)
const SYSTEM_PROMPT = `
You are "Travel Assistant", the official conversational guide for JG Camps & Resorts.
Rules & tone:
- Speak as a professional, friendly human travel planner (never say you are an AI or model).
- When asked about JG Camps & Resorts, explain the brand and services concisely.
- DO NOT mention or recommend any hotel, resort, Airbnb, or staying property by name.
- If any accommodation or property name appears in the output, replace it with:
  "For stay bookings and accommodation options, contact JG Camps & Resorts at 📞 8595167227 / 8076874150 or ✉️ jgadven@gmail.com."
- Provide short destination overviews, suggested durations, best seasons, and simple budget guidance.
- Use a warm, elegant and helpful tone. End helpful suggestions with an offer to create a tailored itinerary or connect to travel experts.
`;

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Msg[]>(() => [
    {
      id: "welcome",
      role: "assistant",
      text:
        "👋 Hi! I’m your JG Camps & Resorts assistant. Ask about itineraries, best time to visit, or travel ideas. For bookings, we can connect you to our travel experts.",
      at: new Date().toISOString(),
    },
  ]);

  const scrollRef = useRef<HTMLDivElement | null>(null);

  // compute offsets so widget sits above global CTAs (if present)
  const [bottomOffset, setBottomOffset] = useState(20);
  const [rightOffset, setRightOffset] = useState(16);

  useEffect(() => {
    function computeOffsets() {
      const globalCTAs = document.querySelector("#global-ctas"); // your Contact Expert container id (if any)
      const safe = 14;
      let bottom = 20;
      if (globalCTAs instanceof HTMLElement) {
        const r = globalCTAs.getBoundingClientRect();
        // If global CTAs are anchored to the bottom, use their height + safe margin.
        bottom = Math.max(16, r.height + safe);
      } else {
        bottom = 18;
      }
      // slightly larger right offset on desktop to avoid edge UI
      const right = window.innerWidth > 768 ? 22 : 10;
      setBottomOffset(bottom);
      setRightOffset(right);
    }
    computeOffsets();
    window.addEventListener("resize", computeOffsets);
    return () => window.removeEventListener("resize", computeOffsets);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      // always scroll down when new messages arrive
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

  // replace mentions of properties/stay words with contact instruction
  function redactStayNames(text: string) {
    const contactLine =
      "For stay bookings and accommodation options, contact JG Camps & Resorts at 📞 8595167227 / 8076874150 or ✉️ jgadven@gmail.com.";
    // When certain terms appear, replace the whole mention with contact line.
    // This simple approach avoids exposing property names returned by the model.
    return text.replace(
      /\b(hotel|resort|villa|lodge|guesthouse|homestay|accommodation|bnb|inn)\b/gi,
      contactLine
    );
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
        // include system prompt as first message (this is a client-side safety net).
        body: JSON.stringify({
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: trimmed },
          ],
        }),
      });

      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }

      const data = await res.json();
      let reply = data?.reply || data?.answer || "Sorry — I couldn’t generate a reply right now.";

      // sanitize / redact property names and enforce contact instruction
      reply = redactStayNames(reply);

      // If the assistant itself didn't include contact details anywhere, append a small booking line.
      if (!/8595167227|8076874150|jgadven@gmail\.com/.test(reply)) {
        reply = `${reply.trim()}\n\nFor bookings & confirmed stays, please contact JG Camps & Resorts at 📞 8595167227 / 8076874150 or ✉️ jgadven@gmail.com.`;
      }

      pushMessage("assistant", reply);
    } catch (err) {
      console.error("Chat send error:", err);
      pushMessage(
        "assistant",
        "Sorry — something went wrong. Please try again or contact our travel experts directly at 📞 8595167227 / 8076874150 or ✉️ jgadven@gmail.com."
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
      {/* Collapsed button (compact, small) */}
      {!open ? (
        <button
          aria-label="Open chat"
          onClick={() => setOpen(true)}
          className="flex items-center justify-center rounded-full bg-emerald-700/95 hover:bg-emerald-800 text-white shadow-2xl w-11 h-11 md:w-12 md:h-12"
          title="Chat with us"
          style={{ boxShadow: "0 8px 20px rgba(6, 95, 70, 0.28)" }}
        >
          <MessageCircle className="h-5 w-5" />
        </button>
      ) : (
        <div
          className="w-[92vw] max-w-[420px] md:w-96 rounded-2xl shadow-2xl overflow-hidden border border-white/10"
          // glassy look
          style={{
            backdropFilter: "saturate(140%) blur(8px)",
            background: "linear-gradient(180deg, rgba(255,255,255,0.72), rgba(255,255,255,0.66))",
            boxShadow: "0 10px 30px rgba(10,40,20,0.18)",
            border: "1px solid rgba(255,255,255,0.5)",
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-emerald-900/95 text-white">
            <div className="flex items-center gap-3">
              <div className="bg-emerald-100/10 rounded-full p-2">
                <MessageCircle className="h-5 w-5 text-white" />
              </div>
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
            className="p-4 max-h-[58vh] overflow-auto flex flex-col gap-3"
            style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.86), rgba(250,250,250,0.96))" }}
          >
            {messages.map((m) =>
              m.role === "assistant" ? (
                <div
                  key={m.id}
                  className="self-start max-w-[86%] bg-emerald-50/80 p-3 rounded-lg text-sm text-gray-800"
                >
                  <div className="whitespace-pre-wrap">{m.text}</div>
                  <div className="text-xs text-gray-400 mt-1">
                    {new Date(m.at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </div>
                </div>
              ) : (
                <div
                  key={m.id}
                  className="self-end max-w-[86%] bg-emerald-800 text-white p-3 rounded-lg text-sm text-right"
                >
                  <div className="whitespace-pre-wrap">{m.text}</div>
                  <div className="text-xs text-emerald-200 mt-1">
                    {new Date(m.at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </div>
                </div>
              )
            )}
          </div>

          {/* Input area */}
          <div
            className="p-4 border-t"
            style={{
              background: "linear-gradient(180deg, rgba(255,255,255,0.9), rgba(248,249,250,0.95))",
            }}
          >
            <form onSubmit={handleSend} className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 rounded-full border border-gray-200 px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-600"
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
                  // small delay to let state update
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
