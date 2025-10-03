"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { MessageCircle, Send, ChevronDown, Sparkles, X, Loader2 } from "lucide-react";

/**
 * Premium floating chat widget
 * - Glassmorphism panel, gradient header, elegant bubbles
 * - Calls /api/gemini with a short message history (App or Pages router supported)
 * - Debounces duplicate rapid sends; auto-scroll; suggestion chips
 * - Uses your Tailwind + token palette (primary, border, muted-foreground)
 */

type Msg = { id: string; role: "user" | "assistant"; text: string; time?: string };

function timeNow() {
  const d = new Date();
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function normalize(s: string) {
  return s.toLowerCase().replace(/\s+/g, " ").trim();
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    {
      id: "m0",
      role: "assistant",
      text: "Hi! I'm your travel assistant. How can I help you today?",
      time: timeNow(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const listRef = useRef<HTMLDivElement>(null);
  const lastSentRef = useRef<string>(""); // prevents accidental duplicate sends

  // Smooth autoscroll whenever messages change or panel opens
  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  // Helpful quick-start prompts (edit freely)
  const suggestions = useMemo(
    () => [
      "3-day itinerary for Shimla",
      "Best time to visit Manali",
      "Budget trip to Goa",
      "Family trip in Rajasthan",
    ],
    []
  );

  async function sendMessage(text: string) {
    const clean = text.trim();
    if (!clean) return;

    // Basic de-dupe protection
    if (normalize(clean) === normalize(lastSentRef.current)) return;
    lastSentRef.current = clean;

    const userMsg: Msg = { id: crypto.randomUUID(), role: "user", text: clean, time: timeNow() };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);

    try {
      // Build a short history for context
      const payload = {
        messages: [
          // keep the chat tight; last few turns are usually enough
          ...messages.slice(-8).map((m) => ({ role: m.role, content: m.text })),
          { role: "user", content: clean },
        ],
      };

      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      const assistantText: string =
        data?.reply || "Sorry — I couldn't generate a reply. Please try again.";

      const botMsg: Msg = {
        id: crypto.randomUUID(),
        role: "assistant",
        text: assistantText,
        time: timeNow(),
      };
      setMessages((m) => [...m, botMsg]);
    } catch (e) {
      const err: Msg = {
        id: crypto.randomUUID(),
        role: "assistant",
        text: "Sorry — I couldn’t reach the server. Please try again.",
        time: timeNow(),
      };
      setMessages((m) => [...m, err]);
    } finally {
      setLoading(false);
      // Clear the de-dupe key shortly after send
      setTimeout(() => (lastSentRef.current = ""), 300);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    sendMessage(input);
  }

  return (
    <>
      {/* Floating launcher button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-3 shadow-xl hover:opacity-90"
          aria-label="Open chat"
        >
          <MessageCircle className="h-5 w-5" />
          <span className="hidden sm:inline font-medium">Ask Travel Expert</span>
        </button>
      )}

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-6 right-6 z-50 w-[92vw] max-w-md rounded-3xl overflow-hidden border border-border shadow-2xl bg-white/70 dark:bg-neutral-900/70 backdrop-blur-xl">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-primary/90 to-primary text-primary-foreground">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-white/30 grid place-items-center">
                <Sparkles className="h-4 w-4" />
              </div>
              <div className="leading-tight">
                <p className="text-sm font-semibold">Travel Assistant</p>
                <p className="text-[11px] opacity-90">Online • replies instantly</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setOpen(false)}
                className="grid place-items-center h-8 w-8 rounded-full hover:bg-white/20 transition"
                aria-label="Minimize"
                title="Minimize"
              >
                <ChevronDown className="h-4 w-4" />
              </button>
              <button
                onClick={() => setOpen(false)}
                className="grid place-items-center h-8 w-8 rounded-full hover:bg-white/20 transition"
                aria-label="Close"
                title="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div
            ref={listRef}
            className="max-h-[60vh] overflow-y-auto px-3 py-4 space-y-3 scrollbar-thin scrollbar-thumb-black/10 dark:scrollbar-thumb-white/10"
          >
            {messages.map((m) =>
              m.role === "assistant" ? (
                <div key={m.id} className="flex items-start gap-2">
                  <div className="h-7 w-7 shrink-0 rounded-full bg-primary/15 grid place-items-center text-primary">
                    <Sparkles className="h-3.5 w-3.5" />
                  </div>
                  <div className="rounded-2xl rounded-tl-sm bg-white/80 dark:bg-neutral-800/80 backdrop-blur border border-border px-3 py-2 shadow-sm max-w-[80%]">
                    <p className="text-sm whitespace-pre-wrap leading-relaxed">{m.text}</p>
                    <span className="mt-1 block text-[10px] text-muted-foreground">{m.time}</span>
                  </div>
                </div>
              ) : (
                <div key={m.id} className="flex justify-end">
                  <div className="max-w-[80%]">
                    <div className="rounded-2xl rounded-tr-sm bg-primary text-primary-foreground px-3 py-2 shadow">
                      <p className="text-sm whitespace-pre-wrap leading-relaxed">{m.text}</p>
                    </div>
                    <span className="mt-1 block text-right text-[10px] text-muted-foreground">{m.time}</span>
                  </div>
                </div>
              )
            )}

            {/* Typing indicator */}
            {loading && (
              <div className="flex items-center gap-2 pl-9">
                <div className="h-7 w-7 shrink-0 rounded-full bg-primary/15 grid place-items-center text-primary">
                  <Sparkles className="h-3.5 w-3.5" />
                </div>
                <div className="rounded-2xl bg-white/80 dark:bg-neutral-800/80 border border-border px-3 py-2 shadow-sm">
                  <div className="flex items-center gap-2 text-sm">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Typing…
                  </div>
                </div>
              </div>
            )}

            {/* Quick suggestion chips */}
            {!loading && (
              <div className="flex flex-wrap gap-2 pt-1 pl-9">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => sendMessage(s)}
                    className="text-xs rounded-full border border-border px-3 py-1 hover:bg-white/60 dark:hover:bg-neutral-800/60 transition"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-3 border-t border-border bg-white/70 dark:bg-neutral-900/70 backdrop-blur">
            <div className="flex items-center gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message…"
                className="flex-1 rounded-full border border-border bg-white/80 dark:bg-neutral-800/80 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30"
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-primary text-primary-foreground shadow disabled:opacity-50"
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
