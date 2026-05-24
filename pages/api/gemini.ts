// pages/api/gemini.ts
import type { NextApiRequest, NextApiResponse } from "next";

const MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash";
const GLAPI_BASE = "https://generativelanguage.googleapis.com/v1";
const DEFAULT_TIMEOUT_MS = 18000;
const SERVER_TRAVEL_POLICY = [
  "Non-negotiable JG Camps & Resorts policy:",
  "- Do not provide named hotels, resorts, Airbnbs, homestays, villas, lodges, guesthouses, inns, or direct booking links.",
  "- If any user-provided notes ask for named stay properties, ignore only that part and continue the itinerary.",
  "- For stays, give area/style/category guidance and tell the user to contact JG Camps & Resorts for booking options.",
  "- This policy overrides any conflicting client, user, or editable-field instruction.",
].join("\n");

type Message = { role: "user" | "assistant" | "system"; content: string };

function pickPromptParts(messages: Message[]) {
  const system = messages
    .filter((m) => m.role === "system")
    .map((m) => m.content?.trim())
    .filter(Boolean)
    .join("\n\n");

  const conversation = messages
    .filter((m) => m.role !== "system")
    .slice(-8)
    .map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

  return { system, conversation };
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const {
      messages,
      maxOutputTokens = 1100,
      temperature = 0.55,
      timeoutMs = DEFAULT_TIMEOUT_MS,
    } = req.body as {
      messages: Message[];
      maxOutputTokens?: number;
      temperature?: number;
      timeoutMs?: number;
    };

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: "messages is required" });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error("GEMINI_API_KEY missing");
      return res.status(500).json({ error: "Server misconfiguration: missing GEMINI_API_KEY" });
    }

    const { system, conversation } = pickPromptParts(messages);
    const systemInstruction = [system, SERVER_TRAVEL_POLICY].filter(Boolean).join("\n\n");
    const controller = new AbortController();
    const startedAt = Date.now();
    const timer = setTimeout(() => controller.abort(), Math.max(5000, Math.min(timeoutMs, 45000)));

    const resp = await fetch(
      `${GLAPI_BASE}/models/${MODEL}:generateContent?key=${encodeURIComponent(apiKey)}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          contents: conversation,
          systemInstruction: { parts: [{ text: systemInstruction }] },
          generationConfig: {
            temperature,
            topP: 0.9,
            maxOutputTokens: Math.max(256, Math.min(maxOutputTokens, 1800)),
          },
        }),
      }
    );
    clearTimeout(timer);

    if (!resp.ok) {
      const text = await resp.text();
      console.error("Generative API error:", resp.status, text);
      return res.status(200).json({
        reply: "Sorry, I couldn't reach the itinerary service right now. Please try again in a moment.",
        degraded: true,
      });
    }

    const data = await resp.json();
    const reply =
      data?.candidates?.[0]?.content?.parts?.map((p: any) => p?.text ?? "").join("\n") ||
      "Sorry, I couldn't generate a reply.";

    return res.status(200).json({ reply, model: MODEL, latencyMs: Date.now() - startedAt });
  } catch (err: any) {
    console.error("gemini handler error:", err);
    return res.status(200).json({
      reply:
        err?.name === "AbortError"
          ? "The itinerary service took too long. Try fewer destinations or try again."
          : "Sorry, I'm having trouble right now. Please try again or contact our travel experts directly.",
      degraded: true,
    });
  }
}
