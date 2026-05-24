// app/india/north/uttarakhand/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

const DATA = {
  name: "Uttarakhand",
  image: "/images/north-india/uttarakhand.jpg",
  bestSeason: "Mar – Jun, Sep – Nov",
  famousPlaces: [
    "Rishikesh",
    "Haridwar",
    "Nainital",
    "Mussoorie",
    "Jim Corbett National Park",
  ],
  highlights:
    "Spiritual centers, serene hill stations, and adventurous treks amidst the Himalayas.",
};

// ✅ Major Uttarakhand destinations
const POPULAR_LOCATIONS = [
  "Rishikesh (Yoga & River Rafting)",
  "Haridwar (Ganga Aarti & Ghats)",
  "Nainital (Lake & Hill Views)",
  "Mussoorie (Hill Station)",
  "Jim Corbett National Park",
  "Kedarnath (Pilgrimage)",
  "Badrinath (Pilgrimage)",
  "Auli (Skiing & Views)",
  "Valley of Flowers (Trekking)",
  "Joshimath",
  "Ranikhet",
  "Almora",
  "Mukteshwar",
  "Chopta (Mini Switzerland)",
  "Lansdowne",
  "Tehri Lake",
  "Kausani",
  "Binsar",
  "Dehradun",
  "Pithoragarh",
  "Munsiyari",
];

const DOS = [
  "Carry layered clothing — mornings and evenings in hills can be cold even in summer.",
  "Pre-book safaris and permits for Jim Corbett or high-altitude treks.",
  "Respect local temple rules; remove footwear and dress modestly at holy places.",
  "Stay hydrated and keep altitude sickness medicine if visiting Kedarnath or Badrinath.",
  "Use local guides for trekking routes such as Valley of Flowers or Chopta.",
];

const DONT_S = [
  "Don't litter in hill regions — Uttarakhand is known for its pristine nature.",
  "Avoid trekking after sunset; always start early for mountain trails.",
  "Don’t disturb wildlife during safaris or in protected areas.",
  "Avoid driving fast on narrow mountain roads — maintain lane discipline.",
  "Don’t use plastic bottles or disposable items in forest zones.",
];

export default function UttarakhandPage() {
  const openContact = () =>
    window.dispatchEvent(new Event("open-contact-expert"));

  const openPlannerWith = (state: string, location?: string) => {
    try {
      window.dispatchEvent(
        new CustomEvent("open-planner-with", { detail: { state, location } })
      );
    } catch (e) {
      // ignore
    }
  };

  const createItineraryAuto = () => openPlannerWith(DATA.name);

  return (
    <main className="bg-white text-slate-800">
      {/* HERO */}
      <section className="relative w-full h-[52vh] md:h-[56vh] overflow-hidden rounded-b-2xl shadow-lg">
        <Image src={DATA.image} alt={DATA.name} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />

        <div className="relative z-10 container mx-auto px-6 h-full flex items-center">
          <div className="max-w-3xl text-white">
            <h1 className="text-4xl md:text-5xl font-extrabold">{DATA.name}</h1>
            <p className="mt-3 text-lg text-emerald-100">{DATA.highlights}</p>

            <div className="mt-4 flex flex-wrap gap-3">
              <button
                onClick={createItineraryAuto}
                className="px-4 py-2 rounded-2xl bg-amber-400 text-black font-semibold"
              >
                Create Itinerary (Auto)
              </button>
              <button
                onClick={openContact}
                className="px-4 py-2 rounded-2xl border border-white/30 text-white"
              >
                Personalize Itinerary
              </button>
            </div>

            <div className="mt-3 text-sm text-emerald-100">
              Best season: <strong>{DATA.bestSeason}</strong>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-12 px-6 container mx-auto max-w-4xl">
        <h2 className="text-2xl font-bold text-emerald-800 mb-4">
          About {DATA.name}
        </h2>
        <p className="text-gray-700 mb-4">
          {DATA.highlights} Best season:{" "}
          <strong>{DATA.bestSeason}</strong>.
        </p>

        {/* Famous Places */}
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Famous places</h3>
          <ul className="list-disc pl-6 text-gray-700">
            {DATA.famousPlaces.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>

        {/* POPULAR LOCATIONS */}
        <div className="mb-8">
          <h3 className="font-semibold mb-3">
            Popular locations & experiences
          </h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {POPULAR_LOCATIONS.map((loc) => (
              <div
                key={loc}
                className="rounded-lg p-3 bg-white border border-gray-100 shadow-sm"
              >
                <div className="font-medium text-emerald-800">{loc}</div>
                <div className="text-sm text-gray-600 mt-1">
                  {getShortDescriptionFor(loc)}
                </div>
                <div className="mt-2">
                  <button
                    onClick={() => openPlannerWith(DATA.name, loc)}
                    className="text-sm px-3 py-1 rounded-full border border-emerald-200 text-emerald-800 hover:bg-emerald-50"
                  >
                    Plan {shortLabel(loc)}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* DOs & DON'Ts */}
        <div className="mb-8 grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl bg-slate-50 p-6 border border-gray-100">
            <h4 className="font-semibold mb-3">Do's</h4>
            <ul className="list-disc pl-6 text-gray-700">
              {DOS.map((d) => (
                <li key={d} className="mb-2">
                  {d}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl bg-slate-50 p-6 border border-gray-100">
            <h4 className="font-semibold mb-3">Don'ts</h4>
            <ul className="list-disc pl-6 text-gray-700">
              {DONT_S.map((d) => (
                <li key={d} className="mb-2">
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* FINAL CTA */}
        <div className="rounded-2xl bg-slate-50 p-6 border border-gray-100">
          <h4 className="font-semibold mb-2">
            Plan your trip to {DATA.name}
          </h4>
          <p className="text-gray-600 mb-4">
            Tell us your dates & preferences — our experts will craft a custom
            itinerary and help with bookings.
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={createItineraryAuto}
              className="inline-flex items-center px-6 py-3 rounded-2xl bg-amber-400 text-black font-semibold"
            >
              Create Itinerary (Auto)
            </button>

            <button
              onClick={openContact}
              className="inline-flex items-center px-6 py-3 rounded-2xl border border-emerald-200 text-emerald-800"
            >
              Personalize Itinerary
            </button>

            <Link
              href="/india/north"
              className="inline-flex items-center px-6 py-3 rounded-2xl border border-emerald-200 text-emerald-800"
            >
              Back to North
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

/* helper to generate a short label for buttons */
function shortLabel(loc: string) {
  const match = loc.match(/^([^(]+)/);
  return match ? match[1].trim() : loc;
}

/* Short descriptions for Uttarakhand spots */
function getShortDescriptionFor(loc: string) {
  const map: Record<string, string> = {
    "Rishikesh (Yoga & River Rafting)":
      "Yoga retreats, meditation and thrilling white-water rafting on the Ganges.",
    "Haridwar (Ganga Aarti & Ghats)":
      "Ancient ghats and the famous evening aarti on the banks of the sacred river.",
    "Nainital (Lake & Hill Views)":
      "Beautiful hill town with a lake, cable car rides and colonial charm.",
    "Mussoorie (Hill Station)":
      "Queen of Hills — misty walks, viewpoints and relaxing stays.",
    "Jim Corbett National Park":
      "India’s oldest tiger reserve — wildlife safaris and forest lodges.",
    "Kedarnath (Pilgrimage)":
      "Sacred temple town amid snow peaks, part of Char Dham yatra.",
    "Badrinath (Pilgrimage)":
      "Vaishnav pilgrimage dedicated to Lord Vishnu, set in scenic mountains.",
    "Auli (Skiing & Views)":
      "Famous for its ski slopes and Asia’s longest cable car.",
    "Valley of Flowers (Trekking)":
      "UNESCO heritage alpine meadows full of seasonal blooms.",
    "Joshimath": "Gateway to Badrinath, Auli, and various Himalayan treks.",
    "Ranikhet":
      "Charming hill cantonment known for orchards and Himalayan views.",
    "Almora":
      "Cultural hill town famous for handicrafts, temples, and views.",
    "Mukteshwar":
      "Quiet retreat surrounded by forests and views of Nanda Devi.",
    "Chopta (Mini Switzerland)":
      "Beautiful meadow base for Tungnath & Chandrashila treks.",
    "Lansdowne":
      "Peaceful hill station known for Garhwal Rifles and pine forests.",
    "Tehri Lake":
      "Adventure sports, boating, and scenic lakeside stays.",
    "Kausani":
      "Panoramic views of Himalayan peaks and tea gardens.",
    "Binsar":
      "Wildlife sanctuary offering birding and peaceful forest stays.",
    "Dehradun":
      "Capital city with caves, monasteries, and gateway to Mussoorie.",
    "Pithoragarh":
      "Mini Kashmir of Uttarakhand — valleys, fort and alpine treks.",
    "Munsiyari":
      "Base for high-altitude treks with views of Panchachuli peaks.",
  };
  return map[loc] ?? "Explore this place — local culture, food and experiences await.";
}
