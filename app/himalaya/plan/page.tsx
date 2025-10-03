"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import ItineraryDisplay from "@/components/ItineraryDisplay";

// --- Steps: Duration → Trip Type → State → Cities/Spots → Budget → Review ---
const steps = ["Duration", "Trip Type", "State", "Cities / Famous Spots", "Budget", "Review"];

// Top-level states in the Indian Himalaya
const HIMALAYA_STATES = [
  "Himachal Pradesh",
  "Uttarakhand",
  "Jammu & Kashmir",
  "Ladakh",
  "Sikkim",
  "Arunachal Pradesh",
] as const;

// Popular cities / famous spots per state (non-exhaustive & editable)
const POPULAR_SPOTS: Record<(typeof HIMALAYA_STATES)[number], string[]> = {
  "Himachal Pradesh": ["Shimla", "Kufri", "Manali", "Kasol", "Spiti Valley", "Dharamshala", "Bir Billing"],
  Uttarakhand: ["Nainital", "Rishikesh", "Haridwar", "Mussoorie", "Auli", "Jim Corbett"],
  "Jammu & Kashmir": ["Srinagar", "Gulmarg", "Pahalgam", "Sonmarg", "Doodhpathri"],
  Ladakh: ["Leh", "Pangong Tso", "Nubra Valley", "Turtuk", "Tso Moriri", "Hemis"],
  Sikkim: ["Gangtok", "Tsomgo Lake", "Yumthang Valley", "Pelling", "Nathula", "Lachung"],
  "Arunachal Pradesh": ["Tawang", "Ziro Valley", "Bomdila", "Mechuka", "Sela Pass", "Dirang"],
};

export default function HimalayaPlanTrip() {
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

  const canGoNext = () => {
    // (optional) simple validations to avoid empty steps
    if (currentStep === 0) return !!duration;
    if (currentStep === 1) return !!tripType;
    if (currentStep === 2) return selectedStates.length > 0;
    if (currentStep === 3) return selectedSpots.length > 0 || customSpot.trim().length > 0;
    if (currentStep === 4) return !!budget;
    return true;
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((s) => s + 1);
    } else {
      // Finalize itinerary
      const text = buildItinerary();
      setItineraryText(text);
      setShowItinerary(true);
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

  // Build a simple itinerary text using the selections (you can swap this with your /api/gemini call if you prefer)
  const buildItinerary = () => {
    const days = parseInt(duration) || 4; // fallback 4D/3N vibe
    const allSpots = [
      ...selectedSpots,
      ...(customSpot.trim() ? [customSpot.trim()] : []),
    ];

    const primary = allSpots[0] || (selectedStates[0] ? `${selectedStates[0]} Base` : "Himalaya Base");
    const secondary = allSpots[1] || "scenic viewpoints";
    const another = allSpots[2] || "local markets & cultural stops";

    const header =
`## ${days}-Day ${tripType || "Himalayan"} Itinerary
**States:** ${selectedStates.join(", ") || "—"}
**Focus Spots:** ${allSpots.length ? allSpots.join(", ") : "—"}
**Budget:** ${budget || "—"}`;

    const body =
`**Day 1: Arrival at ${primary}**
- Check-in & rest
- Easy stroll nearby, sunset viewpoint
- Local dinner

**Day 2: Explore ${secondary}**
- Guided sightseeing / light trek (based on preference)
- Café stop & photo points
- Evening bonfire/music (subject to destination)

**Day 3: ${another}**
- Optional adventure (rafting / paragliding / ATV — where available)
- Culture & food tasting
- Shopping for souvenirs

**Day ${Math.max(days, 4)}: Departure**
- Breakfast with a view
- Last-minute shopping
- Transfer / check-out`;

    const footer =
`
---
### Bookings & Availability
For stays, transfers, permits, or a fully custom itinerary, contact **JG Camps & Resorts**:
- 📞 **8595167227**, **8076874150**
- ✉️ **jgadven@gmail.com**

> To get an actual, confirmed day-by-day plan with rates and availability, please reach us on the above contacts.`;

    return `${header}\n\n${body}\n${footer}`;
  };

  // Build the spot list from selected states
  const spotsFromSelectedStates = selectedStates.flatMap(
    (st) => POPULAR_SPOTS[st as keyof typeof POPULAR_SPOTS] || []
  );

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      {/* Hero */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900">
          Build Your Himalayan Itinerary
        </h1>
        <p className="text-lg text-gray-600 mt-3">
          Answer a few quick questions and preview a tailored plan. You can always contact us to finalize bookings.
        </p>
      </div>

      {/* Progress */}
      <div className="flex justify-center mb-8">
        {steps.map((step, index) => (
          <div
            key={step}
            className={`px-4 py-2 rounded-full mx-1 md:mx-2 text-sm md:text-base ${
              index === currentStep ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
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
            {/* Step 0: Duration */}
            {currentStep === 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-4">How many days?</h2>
                <div className="flex flex-wrap gap-3">
                  {["3", "4", "5", "7", "10+"].map((d) => (
                    <Button
                      key={d}
                      variant={duration === d ? "default" : "outline"}
                      onClick={() => setDuration(d)}
                    >
                      {d} Days
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 1: Trip Type */}
            {currentStep === 1 && (
              <div>
                <h2 className="text-xl font-semibold mb-4">What kind of trip?</h2>
                <div className="flex flex-wrap gap-3">
                  {["Adventure", "Spiritual", "Family", "Wellness", "Group", "Leisure"].map((t) => (
                    <Button
                      key={t}
                      variant={tripType === t ? "default" : "outline"}
                      onClick={() => setTripType(t)}
                    >
                      {t}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: State(s) */}
            {currentStep === 2 && (
              <div>
                <h2 className="text-xl font-semibold mb-2">Choose your state(s)</h2>
                <p className="text-sm text-gray-500 mb-4">You can pick more than one.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {HIMALAYA_STATES.map((st) => (
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

            {/* Step 3: Cities / Famous Spots + custom spot */}
            {currentStep === 3 && (
              <div>
                <h2 className="text-xl font-semibold mb-2">Select cities / famous spots</h2>
                <p className="text-sm text-gray-500 mb-4">
                  Based on your selected state(s). Don’t see your place? Add it below.
                </p>

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

            {/* Step 4: Budget */}
            {currentStep === 4 && (
              <div>
                <h2 className="text-xl font-semibold mb-4">What’s your budget?</h2>
                <div className="flex flex-wrap gap-3">
                  {["Economy", "Premium", "Luxury"].map((b) => (
                    <Button
                      key={b}
                      variant={budget === b ? "default" : "outline"}
                      onClick={() => setBudget(b)}
                    >
                      {b}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 5: Review */}
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

            {/* Nav buttons */}
            <div className="flex justify-between mt-6">
              <Button variant="outline" onClick={handleBack} disabled={currentStep === 0}>
                Back
              </Button>
              <Button onClick={handleNext} disabled={!canGoNext()}>
                {currentStep === steps.length - 1 ? "Generate Itinerary" : "Next"}
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            <h2 className="text-2xl font-bold mb-4 text-center">Your Himalayan Itinerary</h2>

            {/* Markdown-rendered string; keep your ItineraryDisplay component */}
            <ItineraryDisplay itinerary={itineraryText} />

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Button variant="outline" onClick={() => setShowItinerary(false)}>
                Edit Preferences
              </Button>
              <a
                href="tel:+918595167227"
                className="inline-flex items-center justify-center rounded-md px-4 py-2 bg-emerald-600 text-white hover:bg-emerald-700"
              >
                Call: 8595167227
              </a>
              <a
                href="tel:+918076874150"
                className="inline-flex items-center justify-center rounded-md px-4 py-2 bg-emerald-600 text-white hover:bg-emerald-700"
              >
                Call: 8076874150
              </a>
              <a
                href="mailto:jgadven@gmail.com?subject=JG%20Camps%20Itinerary%20Request"
                className="inline-flex items-center justify-center rounded-md px-4 py-2 bg-yellow-500 text-black hover:bg-yellow-400"
              >
                Email: jgadven@gmail.com
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
