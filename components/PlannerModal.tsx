"use client";

import { useMemo, useState } from "react";
import {
  X, Loader2, Calendar, MapPin, IndianRupee, Sparkles, Phone, Mail, ChevronRight, Plus, XCircle
} from "lucide-react";

type Props = { open: boolean; onClose: () => void };
type ItinState = "idle" | "loading" | "done" | "error";

function splitDays(text: string) {
  const lines = text.split(/\r?\n/);
  const days: { title: string; body: string }[] = [];
  let currentTitle = "Overview";
  let buf: string[] = [];

  const push = () => {
    if (buf.join("").trim()) days.push({ title: currentTitle, body: buf.join("\n").trim() });
    buf = [];
  };

  for (const ln of lines) {
    if (/^\s*(?:\*\*|##|#)?\s*day\s*\d+/i.test(ln)) {
      push();
      currentTitle = ln.replace(/^[#\*\s]*/g, "").trim();
    } else {
      buf.push(ln);
    }
  }
  push();
  return days;
}

function diffNights(start?: string, end?: string) {
  if (!start || !end) return undefined;
  const a = new Date(start);
  const b = new Date(end);
  const ms = b.getTime() - a.getTime();
  if (isNaN(ms) || ms <= 0) return undefined;
  return Math.round(ms / (1000 * 60 * 60 * 24));
}

export default function PlannerModal({ open, onClose }: Props) {
  const [state, setState] = useState<ItinState>("idle");
  const [result, setResult] = useState("");
  const [err, setErr] = useState("");

  // form fields
  const [arrive, setArrive] = useState("");
  const [depart, setDepart] = useState("");
  const [destinations, setDestinations] = useState<string[]>([]);
  const [destInput, setDestInput] = useState("");
  const [budget, setBudget] = useState("");
  const [startCity, setStartCity] = useState("");
  const [theme, setTheme] = useState("Adventure");
  const [notes, setNotes] = useState("");

  const todayISO = useMemo(() => new Date().toISOString().split("T")[0], []);
  const datesInvalid = arrive && depart && new Date(depart) <= new Date(arrive);

  function onArriveChange(v: string) {
    setArrive(v);
    if (depart && v && new Date(depart) <= new Date(v)) {
      const d = new Date(v);
      d.setDate(d.getDate() + 1);
      setDepart(d.toISOString().split("T")[0]);
    }
  }

  const nights = diffNights(arrive, depart);
  const canSubmit = useMemo(
    () => destinations.length > 0 && !!arrive && !!depart && (nights ?? 0) > 0,
    [destinations, arrive, depart, nights]
  );

  const days = useMemo(() => (state === "done" ? splitDays(result) : []), [state, result]);

  function addDestination() {
    const raw = destInput.trim();
    if (!raw) return;
    const parts = raw.split(",").map((s) => s.trim()).filter(Boolean);
    const next = Array.from(new Set([...destinations, ...parts]));
    setDestinations(next);
    setDestInput("");
  }

  function removeDestination(name: string) {
    setDestinations((d) => d.filter((x) => x.toLowerCase() !== name.toLowerCase()));
  }

  function handleDestKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addDestination();
    }
  }

  function buildSystemPrompt() {
    return `You are Travel Assistant for JG Camps & Resorts.
Return a clean markdown itinerary that:
- Covers multiple destinations with a smart route order (minimize backtracking).
- Allocates nights per destination based on total trip nights and typical drive times.
- Shows **Day 1/2/3...** with approx drive times between places, 2–3 highlight spots per day, and 1–2 café/restaurant ideas.
- Suggest 2–3 stay tiers (₹/mid/premium) with rough INR where helpful.
- Keep it concise, scannable, and traveler-friendly. End with a 1-line summary.`;
  }

  async function generate() {
    if (!canSubmit) return;
    setState("loading");
    setErr("");

    const when =
      arrive && depart
        ? `Arrive **${new Date(arrive).toLocaleDateString()}**, depart **${new Date(depart).toLocaleDateString()}** (${nights} nights).`
        : "";

    const list = destinations.map((d) => `**${d}**`).join(", ");

    const system = buildSystemPrompt();
    const user =
      [
        `Plan a combined itinerary for ${list}.`,
        when ? ` ${when}` : "",
        startCity ? ` Starting city: **${startCity}**.` : "",
        budget ? ` Budget: **${budget}**.` : "",
        theme ? ` Theme: **${theme}**.` : "",
        notes ? ` Notes: ${notes}` : "",
        "\nPlease propose the best route order and allocate nights accordingly.",
      ].join("");

    try {
      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            { role: "system", content: system },
            { role: "user", content: user },
          ],
        }),
      });

      const data = await res.json();
      if (!data || !data.reply) {
        setErr(data?.error || "No reply from AI");
        setState("error");
        return;
      }

      setResult(data.reply);
      setState("done");
    } catch (e: any) {
      setErr(e?.message || "Failed to generate itinerary.");
      setState("error");
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60]">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute inset-0 grid place-items-center p-4">
        <div className="w-full max-w-3xl rounded-3xl bg-white/95 border border-border shadow-2xl backdrop-blur overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-primary/90 to-primary text-primary-foreground">
            <div>
              <h3 className="text-lg font-bold">Get Your Free Itinerary (Multi-Destination)</h3>
              <p className="text-xs opacity-90">Pick dates and places — we’ll propose the route and nights per stop.</p>
            </div>
            <button onClick={onClose} className="h-9 w-9 grid place-items-center rounded-full hover:bg-white/20" aria-label="Close">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-4 px-6 py-5 md:max-h-[75vh] overflow-auto">
            <div className="grid gap-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="grid gap-1">
                  <label className="text-xs font-medium">Arrival</label>
                  <input
                    type="date"
                    min={todayISO}
                    className={`rounded-xl border px-3 py-2 text-sm ${datesInvalid ? "border-red-500" : "border-border"}`}
                    value={arrive}
                    onChange={(e) => onArriveChange(e.target.value)}
                  />
                </div>
                <div className="grid gap-1">
                  <label className="text-xs font-medium">Departure</label>
                  <input
                    type="date"
                    min={arrive || todayISO}
                    className={`rounded-xl border px-3 py-2 text-sm ${datesInvalid ? "border-red-500" : "border-border"}`}
                    value={depart}
                    onChange={(e) => setDepart(e.target.value)}
                  />
                </div>
              </div>
              {datesInvalid && <p className="text-xs text-red-600 -mt-1">Departure must be after Arrival. I’ve nudged it automatically if needed.</p>}

              <div className="grid gap-1">
                <label className="text-xs font-medium">Destinations (add multiple)</label>
                <div className="flex gap-2">
                  <input
                    className="flex-1 rounded-xl border border-border px-3 py-2 text-sm"
                    placeholder="e.g., Manali, Ladakh"
                    value={destInput}
                    onChange={(e) => setDestInput(e.target.value)}
                    onKeyDown={handleDestKey}
                  />
                  <button type="button" onClick={addDestination} className="inline-flex items-center gap-1 rounded-xl border border-border px-3 py-2 text-sm hover:bg-muted">
                    <Plus className="h-4 w-4" /> Add
                  </button>
                </div>

                {destinations.length > 0 && <div className="flex flex-wrap gap-2 pt-1">{destinations.map((d) => (
                  <span key={d} className="inline-flex items-center gap-1 rounded-full border border-border px-3 py-1 text-xs">
                    <MapPin className="h-3.5 w-3.5" /> {d}
                    <button onClick={() => removeDestination(d)} className="ml-1 opacity-70 hover:opacity-100" aria-label={`Remove ${d}`}>
                      <XCircle className="h-3.5 w-3.5" />
                    </button>
                  </span>
                ))}</div>}
              </div>

              <input className="rounded-xl border border-border px-3 py-2 text-sm" placeholder="Starting City (optional)" value={startCity} onChange={(e) => setStartCity(e.target.value)} />

              <div className="grid grid-cols-2 gap-3">
                <input className="rounded-xl border border-border px-3 py-2 text-sm" placeholder="Budget (₹/mid/premium)" value={budget} onChange={(e) => setBudget(e.target.value)} />
                <select className="rounded-xl border border-border px-3 py-2 text-sm bg-background" value={theme} onChange={(e) => setTheme(e.target.value)}>
                  <option>Adventure</option><option>Family</option><option>Honeymoon</option><option>Wellness</option><option>Heritage</option><option>Budget Backpacking</option><option>Luxury</option>
                </select>
              </div>

              <textarea className="rounded-xl border border-border px-3 py-2 text-sm min-h-[84px]" placeholder="Anything specific? (e.g., high passes, ropeway, café crawls, sunrise points)" value={notes} onChange={(e) => setNotes(e.target.value)} />

              <div className="flex gap-2 items-center">
                <button onClick={generate} disabled={!canSubmit || state === "loading"} className="mt-1 inline-flex items-center justify-center gap-2 rounded-2xl bg-primary text-primary-foreground px-4 py-2.5 font-semibold shadow hover:opacity-90 disabled:opacity-50" aria-disabled={!canSubmit || state === "loading"}>
                  {state === "loading" ? <><Loader2 className="h-4 w-4 animate-spin" /> Creating itinerary…</> : <><Sparkles className="h-4 w-4" /> Build Itinerary <ChevronRight className="h-4 w-4" /></>}
                </button>

                {state === "error" && <div className="text-sm text-red-600"><div>Couldn't generate itinerary: {err}</div><button onClick={generate} className="mt-2 px-3 py-1 rounded-md bg-amber-400 text-black font-semibold">Retry</button></div>}
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-4 shadow-sm min-h-[260px]">
              {state === "idle" && <div className="text-center text-muted-foreground py-10"><Sparkles className="h-6 w-6 mx-auto mb-2" />Add your <b>dates</b> and <b>destinations</b>, then click <span className="font-semibold">Build Itinerary</span>.</div>}
              {state === "loading" && <div className="space-y-3 animate-pulse"><div className="h-5 w-2/5 rounded bg-muted/60" /><div className="h-16 w-full rounded bg-muted/40" /><div className="h-5 w-1/3 rounded bg-muted/60" /><div className="h-16 w-full rounded bg-muted/40" /></div>}
              {state === "error" && <div className="text-sm text-red-600 p-3">{err || "Something went wrong."}</div>}

              {state === "done" && <div className="space-y-5">
                <div className="flex flex-wrap items-center gap-2">
                  {arrive && depart && <span className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-xs"><Calendar className="h-4 w-4" /> {new Date(arrive).toLocaleDateString()} → {new Date(depart).toLocaleDateString()} {nights ? `• ${nights} nights` : ""}</span>}
                  {destinations.length > 0 && <span className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-xs"><MapPin className="h-4 w-4" /> {destinations.join(" • ")}</span>}
                  {budget && <span className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-xs"><IndianRupee className="h-4 w-4" /> {budget}</span>}
                  {theme && <span className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-xs">✨ {theme}</span>}
                </div>

                {days.map((d, i) => (<div key={i} className="rounded-xl border border-border overflow-hidden"><div className="px-3 py-2 bg-primary/10 border-b border-border"><h4 className="font-semibold text-sm">{d.title}</h4></div><div className="p-3 prose prose-sm max-w-none text-foreground [&_ul]:list-disc [&_ul]:ml-5">{d.body.split("\n").map((ln, idx) => (<p key={idx} className={ln.startsWith("•") || ln.startsWith("-") ? "ml-3" : ""}>{ln}</p>))}</div></div>))}

                <div className="rounded-xl bg-primary text-primary-foreground p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div><h5 className="font-bold">Want us to book & fine-tune this?</h5><p className="text-xs opacity-90">Talk to a travel expert now — quick recommendations & best rates.</p></div>
                  <div className="flex flex-wrap gap-2">
                    <a href="tel:+918076874156" className="inline-flex items-center gap-2 rounded-lg bg-white text-foreground px-3 py-2 font-semibold shadow hover:bg-muted"><Phone className="h-4 w-4" /> 8076874156</a>
                    <a href="tel:+918595167227" className="inline-flex items-center gap-2 rounded-lg bg-white text-foreground px-3 py-2 font-semibold shadow hover:bg-muted"><Phone className="h-4 w-4" /> 8595167227</a>
                    <a href="mailto:jgadven@gmail.com?subject=Itinerary%20help" className="inline-flex items-center gap-2 rounded-lg border border-white/40 px-3 py-2 font-semibold hover:bg-white/10"><Mail className="h-4 w-4" /> jgadven@gmail.com</a>
                  </div>
                </div>
              </div>}
            </div>
          </div>

          <div className="px-6 pb-5">
            <button onClick={onClose} className="w-full sm:w-auto rounded-xl border border-border px-4 py-2 text-sm hover:bg-muted">Close</button>
          </div>
        </div>
      </div>
    </div>
  );
}
