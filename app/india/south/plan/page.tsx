"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import ItineraryDisplay from "@/components/ItineraryDisplay";

/* Steps/prompt logic follows the Himalaya planner you shared.
   States are South India specific. The AI call is identical:
   POST -> /api/gemini with a system prompt enforcing the JG Camps booking rule.
*/

const steps = ["Duration", "Trip Type", "State", "Cities / Famous Spots", "Budget", "Review"];

const SOUTH_STATES = [
  "Andhra Pradesh",
  "Telangana",
  "Karnataka",
  "Kerala",
  "Tamil Nadu",
  "Puducherry",
  "Lakshadweep",
] as const;

const POPULAR_SPOTS: Record<(typeof SOUTH_STATES)[number], string[]> = {
  "Andhra Pradesh": ["Tirupati", "Visakhapatnam", "Vijayawada"],
  Telangana: ["Hyderabad", "Warangal", "Nizamabad"],
  Karnataka: ["Bengaluru", "Mysore", "Coorg", "Hampi"],
  Kerala: ["Kochi", "Alleppey", "Munnar", "Kovalam"],
  "Tamil Nadu": ["Chennai", "Madurai", "Thanjavur", "Pondicherry"],
  Puducherry: ["French Quarter", "Auroville", "Promenade"],
  Lakshadweep: ["Agatti", "Bangaram", "Kavaratti"],
};

export default function SouthPlanTrip() {
  // wizard state
  const [currentStep, setCurrentStep] = useState(0);

  // user inputs
  const [duration, setDuration] = useState<string>("");
  const [tripType, setTripType] = useState<string>("");
  const [selectedStates, setSelectedStates] = useState<string[]>([]);
  const [selectedSpots, setSelectedSpots] = useState<string[]>([]);
  const [customSpot, setCustomSpot] = useState<string>(""); // user-typed city/spot
  const [budget, setBudget] = useState<string>("");

  // output
  const [showItinerary, setShowItinerary] = useState(false);
  const [itineraryText, setItineraryText] = useState("");
  const [generating, setGenerating] = useState(false);
  const [genError, setGenError] = useState<string | null>(null);

  const canGoNext = () => {
    if (currentStep === 0) return !!duration;
    if (currentStep === 1) return !!tripType;
    if (currentStep === 2) return selectedStates.length > 0;
    if (currentStep === 3) return selectedSpots.length > 0 || customSpot.trim().length > 0;
    if (currentStep === 4) return !!budget;
    return true;
  };

  const handleNext = async () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((s) => s + 1);
      return;
    }

    setGenError(null);
    setGenerating(true);
    try {
      const plan = await buildAIItinerary();
      setItineraryText(plan);
      setShowItinerary(true);
    } catch (err: any) {
      console.error("AI itinerary error:", err);
      setGenError(err?.message || "Failed to generate itinerary. Please try again.");
    } finally {
      setGenerating(false);
    }
  };

  const handleBack = () => setCurrentStep((s) => Math.max(0, s - 1));

  const toggleState = (state: string) => {
    setSelectedStates((prev) =>
      prev.includes(state) ? prev.filter((s) => s !== state) : [...prev, state]
    );
    // also clear dependent spots when removing a state
    if (selectedStates.includes(state)) {
      const toRemove = new Set(POPULAR_SPOTS[state as keyof typeof POPULAR_SPOTS] ?? []);
      setSelectedSpots((prev) => prev.filter((p) => !toRemove.has(p)));
    }
  };

  const toggleSpot = (spot: string) => {
    setSelectedSpots((prev) =>
      prev.includes(spot) ? prev.filter((s) => s !== spot) : [...prev, spot]
    );
  };

  // Build the spot list from selected states
  const spotsFromSelectedStates = selectedStates.flatMap(
    (st) => POPULAR_SPOTS[st as keyof typeof POPULAR_SPOTS] || []
  );

  /** Gemini AI Integration with JG Camps & Resorts rule */
  async function buildAIItinerary(): Promise<string> {
    const days = parseInt(duration) || 4;
    const allSpots = [...selectedSpots, ...(customSpot.trim() ? [customSpot.trim()] : [])];
    const stateList = selectedStates.join(", ") || "South Indian states";
    const destinationList = allSpots.join(", ") || "regional highlights";

    const systemPrompt = `You are a professional travel planner for **JG Camps & Resorts**.
Rules:
- DO NOT mention or recommend any hotel, resort, Airbnb, or stay property by name.
- Instead, clearly say: "For stay bookings and accommodation options, contact JG Camps & Resorts at 📞 8595167227 / 8076874150 or ✉️ jgadven@gmail.com."
- Produce a clean Markdown itinerary with "Day 1", "Day 2", etc.
- Mention approximate travel times, 2–3 activity highlights, and café or food suggestions.
- Include short cost guidance (Economy / Mid / Premium) but no property names.
- End with a one-line summary encouraging users to contact JG Camps & Resorts.
- Keep the tone concise, elegant, and informative.`;

    const userPrompt = `Plan a ${days}-day ${tripType || "South Indian"} itinerary.
States: ${stateList}
Spots / regions: ${destinationList}
Budget tier: ${budget || "flexible"}
Keep it balanced and traveller-friendly.`;

    const res = await fetch("/api/gemini", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
      }),
    });

    if (!res.ok) throw new Error(`Server error: ${res.status}`);
    const data = await res.json();
    if (!data?.reply) throw new Error("No AI reply");
    return data.reply;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900">Build Your South India Itinerary</h1>
        <p className="text-lg text-gray-600 mt-3">
          Generate a fully AI-powered plan — no random hotel names, just routes and our contact info for bookings.
        </p>
      </div>

      {/* Progress */}
      <div className="flex justify-center mb-8">
        {steps.map((step, i) => (
          <div
            key={step}
            className={`px-4 py-2 rounded-full mx-1 md:mx-2 text-sm md:text-base ${
              i === currentStep ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
            }`}
          >
            {step}
          </div>
        ))}
      </div>

      {/* Card */}
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-lg">
        {!showItinerary ? (
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            {/* Step 0 */}
            {currentStep === 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-4">How many days?</h2>
                <div className="flex flex-wrap gap-3">
                  {["3", "4", "5", "7", "10+"].map((d) => (
                    <Button key={d} variant={duration === d ? "default" : "outline"} onClick={() => setDuration(d)}>
                      {d} Days
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 1 */}
            {currentStep === 1 && (
              <div>
                <h2 className="text-xl font-semibold mb-4">What kind of trip?</h2>
                <div className="flex flex-wrap gap-3">
                  {["Adventure", "Spiritual", "Family", "Wellness", "Group", "Leisure"].map((t) => (
                    <Button key={t} variant={tripType === t ? "default" : "outline"} onClick={() => setTripType(t)}>
                      {t}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2 */}
            {currentStep === 2 && (
              <div>
                <h2 className="text-xl font-semibold mb-2">Choose your state(s)</h2>
                <p className="text-sm text-gray-500 mb-4">You can pick more than one.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {SOUTH_STATES.map((st) => (
                    <label key={st} className="flex items-center gap-2 border rounded-lg px-3 py-2">
                      <input
                        type="checkbox"
                        checked={selectedStates.includes(st)}
                        onChange={() => toggleState(st)}
                      />
                      <span>{st}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3 */}
            {currentStep === 3 && (
              <div>
                <h2 className="text-xl font-semibold mb-2">Select cities / famous spots</h2>
                <p className="text-sm text-gray-500 mb-4">Based on your selected state(s). Add custom places below if needed.</p>

                {spotsFromSelectedStates.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                    {spotsFromSelectedStates.map((spot) => (
                      <label key={spot} className="flex items-center gap-2 border rounded-lg px-3 py-2">
                        <input
                          type="checkbox"
                          checked={selectedSpots.includes(spot)}
                          onChange={() => toggleSpot(spot)}
                        />
                        <span>{spot}</span>
                      </label>
                    ))}
                  </div>
                ) : (
                  <div className="text-sm text-gray-500 mb-4">
                    Select at least one state to see popular spots.
                  </div>
                )}

                <div className="mt-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Add your own city/spot (optional)
                  </label>
                  <input
                    value={customSpot}
                    onChange={(e) => setCustomSpot(e.target.value)}
                    placeholder="Type a city or place that's not listed"
                    className="w-full border rounded-lg px-3 py-2"
                  />
                </div>
              </div>
            )}

            {/* Step 4 */}
            {currentStep === 4 && (
              <div>
                <h2 className="text-xl font-semibold mb-4">What’s your budget?</h2>
                <div className="flex flex-wrap gap-3">
                  {["Economy", "Premium", "Luxury"].map((b) => (
                    <Button key={b} variant={budget === b ? "default" : "outline"} onClick={() => setBudget(b)}>
                      {b}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 5 */}
            {currentStep === 5 && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Review your selections</h2>
                <ul className="text-gray-700 space-y-2">
                  <li><strong>Duration:</strong> {duration || "—"} Days</li>
                  <li><strong>Trip Type:</strong> {tripType || "—"}</li>
                  <li><strong>State(s):</strong> {selectedStates.join(", ") || "—"}</li>
                  <li>
                    <strong>Chosen Spots:</strong>{" "}
                    {selectedSpots.length ? selectedSpots.join(", ") : "—"}
                    {customSpot ? (selectedSpots.length ? `, ${customSpot}` : customSpot) : ""}
                  </li>
                  <li><strong>Budget:</strong> {budget || "—"}</li>
                </ul>
                <p className="text-xs text-gray-500 mt-3">
                  Click “Generate Itinerary” to preview a suggested plan. You can finalize bookings with us later.
                </p>
              </div>
            )}

            <div className="flex justify-between mt-6">
              <Button variant="outline" onClick={handleBack} disabled={currentStep === 0 || generating}>
                Back
              </Button>
              <Button onClick={handleNext} disabled={!canGoNext() || generating}>
                {generating ? "Generating..." : currentStep === steps.length - 1 ? "Generate Itinerary" : "Next"}
              </Button>
            </div>

            {genError && <p className="mt-3 text-sm text-red-600">{genError}</p>}
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
            <h2 className="text-2xl font-bold mb-4 text-center">Your South India Itinerary</h2>

            {/* Markdown-rendered string; keep your ItineraryDisplay component */}
            <ItineraryDisplay itinerary={itineraryText} />

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Button variant="outline" onClick={() => setShowItinerary(false)}>
                Edit Preferences
              </Button>
              <a href="tel:+918595167227" className="inline-flex items-center justify-center rounded-md px-4 py-2 bg-emerald-600 text-white hover:bg-emerald-700">
                📞 8595167227
              </a>
              <a href="tel:+918076874150" className="inline-flex items-center justify-center rounded-md px-4 py-2 bg-emerald-600 text-white hover:bg-emerald-700">
                📞 8076874150
              </a>
              <a href="mailto:jgadven@gmail.com" className="inline-flex items-center justify-center rounded-md px-4 py-2 bg-yellow-500 text-black hover:bg-yellow-400">
                ✉️ jgadven@gmail.com
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
