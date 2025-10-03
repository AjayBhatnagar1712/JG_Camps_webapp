"use client";

import React from "react";
import ReactMarkdown from "react-markdown";

type DaySection = { day: string; content: string };

interface ItineraryDisplayProps {
  itinerary: string | DaySection[];
}

/**
 * Safely normalize any itinerary into DaySection[]
 * - If it's already an array, return as-is
 * - If it's a string, try to split by "Day X" headings
 * - If no "Day" headings, return empty and render the raw markdown instead
 */
function normalize(itinerary: string | DaySection[]): {
  sections: DaySection[];
  rawMarkdown?: string;
} {
  if (Array.isArray(itinerary)) {
    return { sections: itinerary };
  }

  const text = itinerary?.toString?.() ?? "";
  if (!text.trim()) return { sections: [], rawMarkdown: "" };

  // Split by headings like "Day 1:", "Day 2 –", "Day 3 ..."
  const parts = text.split(/(Day\s*\d+[^\n:–-]*[:–-]?)/gi).filter(Boolean);

  const sections: DaySection[] = [];
  for (let i = 0; i < parts.length; i++) {
    const label = parts[i];
    if (/^Day\s*\d+/i.test(label)) {
      sections.push({
        day: label.trim(),
        content: (parts[i + 1] || "").trim(),
      });
      i++;
    }
  }

  // If we couldn't find any day sections, render the whole thing as markdown
  if (sections.length === 0) {
    return { sections: [], rawMarkdown: text };
  }
  return { sections };
}

const ItineraryDisplay: React.FC<ItineraryDisplayProps> = ({ itinerary }) => {
  const { sections, rawMarkdown } = normalize(itinerary);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mt-6">
      <h2 className="text-2xl font-bold text-emerald-700 mb-4">
        Suggested Itinerary
      </h2>

      {sections.length > 0 ? (
        <div className="space-y-4">
          {sections.map((s, idx) => (
            <div
              key={`${s.day}-${idx}`}
              className="bg-emerald-50/40 border border-emerald-100 rounded-xl p-4"
            >
              <h3 className="text-lg font-semibold text-emerald-700">
                {s.day}
              </h3>
              <div className="mt-2 prose max-w-none">
                <ReactMarkdown>{s.content}</ReactMarkdown>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="prose max-w-none">
          <ReactMarkdown>{rawMarkdown || "_No details available._"}</ReactMarkdown>
        </div>
      )}
    </div>
  );
};

export default ItineraryDisplay;
