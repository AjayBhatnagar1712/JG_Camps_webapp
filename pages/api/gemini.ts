// pages/api/gemini.ts
import type { NextApiRequest, NextApiResponse } from "next";

const MODEL = "gemini-2.5-flash"; // use the model you prefer (gemini-2.5-flash is available in your account)
const GLAPI_BASE = "https://generativelanguage.googleapis.com/v1";

type Message = { role: "user" | "assistant" | "system"; content: string };

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { messages } = req.body as { messages: Message[] };

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: "messages is required" });
    }

    // Convert to GL "contents" format
    const contents = messages.map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    // Use server-side env var
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error("GEMINI_API_KEY missing");
      return res.status(500).json({ error: "Server misconfiguration: missing GEMINI_API_KEY" });
    }

    const resp = await fetch(
      `${GLAPI_BASE}/models/${MODEL}:generateContent?key=${encodeURIComponent(apiKey)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ contents }),
      }
    );

    if (!resp.ok) {
      const text = await resp.text();
      console.error("Generative API error:", resp.status, text);
      // return 200 to the client with error reply to avoid UI crash; frontend can inspect reply
      return res.status(200).json({ reply: "Sorry — I couldn't reach the AI service right now." });
    }

    const data = await resp.json();

    // The GL response holds candidate content in data.candidates[0].content.parts[].text
    const reply =
      data?.candidates?.[0]?.content?.parts?.map((p: any) => p?.text ?? "").join("\n") ||
      "Sorry — I couldn't generate a reply.";

    return res.status(200).json({ reply });
  } catch (err) {
    console.error("gemini handler error:", err);
    return res.status(200).json({ reply: "Sorry — I'm having trouble right now. Please try again." });
  }
}
