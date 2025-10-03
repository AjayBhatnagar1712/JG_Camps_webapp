// pages/api/gemini.ts
import type { NextApiRequest, NextApiResponse } from "next";

const MODEL = "gemini-1.5-flash";
const SYSTEM = `
You are Travel Assistant for JG Camps & Resorts.
- Be concise, friendly, and helpful.
- If itinerary requested: give day-wise plan, approx travel times, and 2–3 stay tiers with INR hints.
- For "best time": give months + pros/cons + weather + crowd levels.
- For budgets: rough costs for stay/food/transport/activities in INR.
- Use bullet points and short paragraphs. Ask a 1-line clarifier if ambiguous.
`;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { messages } = req.body as {
      messages: Array<{ role: "user" | "assistant" | "system"; content: string }>;
    };

    if (!messages?.length) return res.status(400).json({ error: "messages is required" });

    // Convert to Gemini "contents" format (role: user/model). Add system as a leading user part.
    const contents = [
      { role: "user", parts: [{ text: SYSTEM }] },
      ...messages.map((m) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      })),
    ];

    const resp = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents }),
      }
    );

    const data = await resp.json();
    // Optional: log once during dev
    // console.log("Gemini:", JSON.stringify(data, null, 2));

    const text =
      data?.candidates?.[0]?.content?.parts?.map((p: any) => p?.text).join("\n") ||
      "Sorry — I couldn't generate a reply.";

    return res.status(200).json({ reply: text });
  } catch (error) {
    console.error("Gemini API Error:", error);
    return res.status(200).json({ reply: "Sorry — I’m having trouble right now. Please try again." });
  }
}
