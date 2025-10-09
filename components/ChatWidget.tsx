// components/ChatWidget.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import { MessageCircle, X, Copy, Loader2 } from "lucide-react";

type StructuredItin = {
  summary?: string;
  suggested_days?: string; // e.g. "3-4 days"
  best_season?: string;
  budget_guidance?: { economy?: string; mid?: string; premium?: string };
  itinerary?: { day: string; highlights: string[] }[];
};

type Msg = {
  id: string;
  role: "user" | "assistant";
  text: string;
  at: string;
  structured?: StructuredItin | null;
};

const CONTACT_LINE =
  "For stay bookings and accommodation options, contact JG Camps & Resorts at 📞 8595167227 / 8076874150 or ✉️ jgadven@gmail.com.";

const SYSTEM_PROMPT = `
You are "Travel Assistant", the official conversational guide for JG Camps & Resorts.
Rules & tone:
- Be a professional, friendly travel planner. Do NOT say you are an AI.
- Keep answers concise and structured.
- WHENEVER possible, return a short machine-readable JSON block wrapped in \`\`\`json ... \`\`\`
  **with the following schema**:
{
  "summary": "Single-line summary / suggestion",
  "suggested_days": "e.g. 3-4 days",
  "best_season": "Oct–Mar",
  "budget_guidance": {"economy":"₹X-₹Y","mid":"₹X-₹Y","premium":"₹X+"},
  "itinerary": [
    {"day":"Day 1","highlights":["one or two short phrases"]},
    {"day":"Day 2","highlights":["..."]}
  ]
}
- Also include a short human-readable paragraph (max 6 sentences) BEFORE the JSON to show to the user, but keep it brief.
- Do NOT mention or recommend any hotel, resort, Airbnb, or stay property by name. If you would otherwise include a property name, replace it with the contact instruction (see below).
- The assistant must NOT repeat the contact instruction more than once in its entire reply.
- If you cannot produce JSON, return a short bullet list (3-6 bullets).
`;

/** Attempt to extract a JSON block from a reply (fenced ```json or inline braces) */
function extractJson(candidate: string): StructuredItin | null {
  if (!candidate) return null;
  // First try fenced ```json
  const fenced = candidate.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
  let payload = fenced ? fenced[1] : candidate;

  // find first { and last } to avoid stray text
  const start = payload.indexOf("{");
  const end = payload.lastIndexOf("}");
  if (start >= 0 && end > start) {
    const jsonStr = payload.slice(start, end + 1);
    try {
      const parsed = JSON.parse(jsonStr);
      return parsed as StructuredItin;
    } catch (e) {
      // fallback: try to sanitize common mistakes (remove trailing commas)
      const san = jsonStr.replace(/,\s*}/g, "}").replace(/,\s*\]/g, "]");
      try {
        return JSON.parse(san) as StructuredItin;
      } catch {
        return null;
      }
    }
  }
  return null;
}

/** Replace property/stay keywords with contact line and avoid repeating contact line */
function redactAndEnsureContact(text: string) {
  const stayRegex = /\b(hotel|resort|villa|lodge|guesthouse|homestay|accommodation|bnb|inn)\b/gi;
  let replaced = text.replace(stayRegex, ""); // simple remove mentions
  // ensure single contact line present
  if (!/8595167227|8076874150|jgadven@gmail\.com/.test(replaced)) {
    replaced = `${replaced.trim()}\n\n${CONTACT_LINE}`;
  }
  return replaced.trim();
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Msg[]>(() => [
    {
      id: "welcome",
      role: "assistant",
      text:
        "👋 Hi! I’m your JG Camps & Resorts assistant. Ask about itineraries, best time to visit, or travel ideas. I can produce a compact itinerary you can use immediately.",
      at: new Date().toISOString(),
      structured: null,
    },
  ]);

  const scrollRef = useRef<HTMLDivElement | null>(null);

  // offsets so widget sits above global CTAs (if present)
  const [bottomOffset, setBottomOffset] = useState(20);
  const [rightOffset, setRightOffset] = useState(16);

  useEffect(() => {
    function computeOffsets() {
      const globalCTAs = document.querySelector("#global-ctas");
      const safe = 14;
      let bottom = 20;
      if (globalCTAs instanceof HTMLElement) {
        const r = globalCTAs.getBoundingClientRect();
        bottom = Math.max(16, r.height + safe);
      } else {
        bottom = 18;
      }
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
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight + 200;
    }
  }, [messages, open]);

  function pushMessage(role: Msg["role"], text: string, structured: StructuredItin | null = null) {
    const m: Msg = {
      id: Math.random().toString(36).slice(2),
      role,
      text,
      at: new Date().toISOString(),
      structured: structured ?? null,
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
    setOpen(true);

    try {
      // send system prompt + user prompt
      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: trimmed },
          ],
          // optional: suggest model params if your server supports them
        }),
      });

      if (!res.ok) throw new Error(`Server ${res.status}`);

      const data = await res.json();
      const reply = (data?.reply || data?.answer || "").trim();

      // try extract JSON and render structured UI
      const structured = extractJson(reply);

      if (structured) {
        // create a short assistant text (human paragraph) drawn from structured.summary or first lines
        const shortText =
          (structured.summary && structured.summary.length < 240
            ? structured.summary
            : reply.split("\n").find((l: string) => l.trim().length > 10) || "Here is a short plan.") || "";

        // ensure contact line appended inside structured UI only once (we will render contact CTA separately)
        pushMessage("assistant", shortText, structured);
      } else {
        // fallback: sanitize large reply, remove duplicate contact lines, and shorten to max ~600 chars for widget
        let sanitized = redactAndEnsureContact(reply);
        // shorten for overview view (keep full reply available by expanding)
        if (sanitized.length > 1200) sanitized = sanitized.slice(0, 1200) + "...";
        pushMessage("assistant", sanitized, null);
      }
    } catch (err) {
      console.error("Chat send error:", err);
      pushMessage(
        "assistant",
        "Sorry — something went wrong. Please try again or contact our travel experts directly at 📞 8595167227 / 8076874150 or ✉️ jgadven@gmail.com.",
        null
      );
    } finally {
      setLoading(false);
    }
  }

  const containerStyle: React.CSSProperties = {
    position: "fixed",
    right: `${rightOffset}px`,
    bottom: `${bottomOffset}px`,
    zIndex: 9999,
  };

  function renderStructuredCard(s: StructuredItin) {
    return (
      <div className="bg-white/95 rounded-lg p-3 shadow-sm border border-gray-100">
        {s.summary && <div className="font-semibold text-sm mb-1">{s.summary}</div>}
        <div className="flex gap-2 text-xs text-gray-600 mb-2">
          {s.suggested_days && <div className="px-2 py-1 bg-gray-50 rounded">{s.suggested_days}</div>}
          {s.best_season && <div className="px-2 py-1 bg-gray-50 rounded">Best: {s.best_season}</div>}
        </div>

        {Array.isArray(s.itinerary) && (
          <div className="space-y-2 mb-2">
            {s.itinerary.slice(0, 4).map((d, i) => (
              <div key={i} className="text-sm">
                <div className="font-semibold text-xs">{d.day}</div>
                <div className="text-xs text-gray-700">{d.highlights.slice(0, 2).join(" • ")}</div>
              </div>
            ))}
          </div>
        )}

        {s.budget_guidance && (
          <div className="text-xs text-gray-700 mb-2">
            <div><strong>Budget:</strong></div>
            <div className="flex gap-3 text-xs">
              <div>Economy: {s.budget_guidance.economy || "—"}</div>
              <div>Mid: {s.budget_guidance.mid || "—"}</div>
              <div>Premium: {s.budget_guidance.premium || "—"}</div>
            </div>
          </div>
        )}

        <div className="mt-2 flex items-center gap-2">
          <a href="tel:+918076874156" className="inline-flex items-center gap-2 rounded-lg bg-emerald-700 text-white px-2 py-1 text-xs">Call 8076874156</a>
          <a href="tel:+918595167227" className="inline-flex items-center gap-2 rounded-lg bg-emerald-700 text-white px-2 py-1 text-xs">Call 8595167227</a>
          <a href="mailto:jgadven@gmail.com" className="inline-flex items-center gap-2 rounded-lg border px-2 py-1 text-xs">Email</a>
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle} className="pointer-events-auto">
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
          style={{
            backdropFilter: "saturate(140%) blur(8px)",
            background: "linear-gradient(180deg, rgba(255,255,255,0.92), rgba(255,255,255,0.86))",
            boxShadow: "0 10px 30px rgba(10,40,20,0.18)",
            border: "1px solid rgba(255,255,255,0.5)",
          }}
        >
          <div className="flex items-center justify-between px-4 py-3 bg-emerald-900/95 text-white">
            <div className="flex items-center gap-3">
              <div className="bg-emerald-100/10 rounded-full p-2">
                <MessageCircle className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="font-semibold">Travel Assistant</div>
                <div className="text-xs opacity-90">Online · concise replies</div>
              </div>
            </div>

            <button onClick={() => setOpen(false)} aria-label="Minimize" className="rounded-full p-1 hover:bg-white/10">
              <X className="h-4 w-4" />
            </button>
          </div>

          <div ref={scrollRef} className="p-4 max-h-[58vh] overflow-auto flex flex-col gap-3" style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.88), rgba(250,250,250,0.96))" }}>
            {messages.map((m) =>
              m.role === "assistant" ? (
                <div key={m.id} className="self-start max-w-[86%] bg-emerald-50/80 p-3 rounded-lg text-sm text-gray-800">
                  {/* If we have structured data render card */}
                  {m.structured ? (
                    <>
                      <div className="mb-2 text-xs text-gray-700">{m.text}</div>
                      {renderStructuredCard(m.structured)}
                    </>
                  ) : (
                    <>
                      <div className="whitespace-pre-wrap">{m.text}</div>
                    </>
                  )}

                  <div className="text-xs text-gray-400 mt-1">
                    {new Date(m.at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </div>
                </div>
              ) : (
                <div key={m.id} className="self-end max-w-[86%] bg-emerald-800 text-white p-3 rounded-lg text-sm text-right">
                  <div className="whitespace-pre-wrap">{m.text}</div>
                  <div className="text-xs text-emerald-200 mt-1">
                    {new Date(m.at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </div>
                </div>
              )
            )}

            {loading && (
              <div className="self-start max-w-[86%] bg-white/40 p-3 rounded-lg text-sm text-gray-600 flex items-center gap-2">
                <Loader2 className="animate-spin" /> Generating — short summary will appear when ready.
              </div>
            )}
          </div>

          <div className="p-4 border-t" style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.9), rgba(248,249,250,0.95))" }}>
            <form onSubmit={handleSend} className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 rounded-full border border-gray-200 px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-600"
                aria-label="Type your message"
              />
              <button type="submit" disabled={loading} className="bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2 rounded-full disabled:opacity-60">
                {loading ? "…" : "Send"}
              </button>
            </form>

            <div className="mt-3 flex flex-wrap gap-2">
              <button onClick={() => { setInput("3-day itinerary for Shimla"); setTimeout(() => handleSend(), 80); }} className="text-xs rounded-full border px-3 py-1 hover:bg-gray-50">3-day Shimla</button>
              <button onClick={() => { setInput("Best time to visit Manali"); setTimeout(() => handleSend(), 80); }} className="text-xs rounded-full border px-3 py-1 hover:bg-gray-50">Best time: Manali</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
