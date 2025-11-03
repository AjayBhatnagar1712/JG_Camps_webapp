// app/india/north/haryana/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

const DATA = {
  name: "Haryana",
  image: "/images/north-india/haryana.jpg",
  bestSeason: "Oct – Mar",
  famousPlaces: ["Kurukshetra", "Sultanpur Bird Sanctuary", "Panipat"],
  highlights: "Rural heritage, historical sites and quick city escapes.",
};

const POPULAR_LOCATIONS = [
  "Kurukshetra",
  "Panipat (Battleground & Weavers)",
  "Sultanpur Bird Sanctuary",
  "Gurugram (Gurgaon)",
  "Faridabad",
  "Panchkula",
  "Karnal",
  "Hisar (Forts & Museums)",
  "Jind",
  "Kurukshetra Jyotisar",
  "Pinjore Gardens (Yadavindra Gardens)",
];

const DOS = [
  "Respect local customs at temples, gurudwaras and sacred spots.",
  "Carry light clothing and sun protection during day trips; evenings can be cool in winter.",
  "Use authorised guides for historical sites and large heritage complexes.",
  "Try local Haryanvi cuisine and sweets at recommended eateries.",
];

const DONT_S = [
  "Don't litter at sacred or protected locations (e.g. bird sanctuaries).",
  "Avoid unregulated wildlife approaches at the bird sanctuary—keep distance and quiet.",
  "Don't trespass into restricted heritage restoration zones.",
  "Avoid driving on small rural tracks at night without local guidance.",
];

export default function HaryanaPage() {
  const openContact = () => window.dispatchEvent(new Event("open-contact-expert"));

  // open planner with fallback navigation (same pattern used across other pages)
  const openPlannerWith = (state: string, location?: string) => {
    try {
      window.dispatchEvent(new CustomEvent("open-planner-with", { detail: { state, location } }));
    } catch (e) {
      // ignore errors
    }

    const params = new URLSearchParams({ state });
    if (location) params.append("location", location);
    window.location.href = `/india/north/plan?${params.toString()}`;
  };

  const createItineraryAuto = () => openPlannerWith("Haryana");

  return (
    <main className="bg-white text-slate-800">
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

      <section className="py-12 px-6 container mx-auto max-w-4xl">
        <h2 className="text-2xl font-bold text-emerald-800 mb-4">About {DATA.name}</h2>
        <p className="text-gray-700 mb-4">
          {DATA.highlights} Best season: <strong>{DATA.bestSeason}</strong>.
        </p>

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
          <h3 className="font-semibold mb-3">Popular locations & experiences</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {POPULAR_LOCATIONS.map((loc) => (
              <div key={loc} className="rounded-lg p-3 bg-white border border-gray-100 shadow-sm">
                <div className="font-medium text-emerald-800">{loc}</div>
                <div className="text-sm text-gray-600 mt-1">{getShortDescriptionFor(loc)}</div>
                <div className="mt-2">
                  <button
                    onClick={() => openPlannerWith("Haryana", loc)}
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
          <h4 className="font-semibold mb-2">Plan your trip to {DATA.name}</h4>
          <p className="text-gray-600 mb-4">
            Tell us your dates & preferences — our experts will craft a custom itinerary and help with bookings.
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

            <Link href="/india/north" className="inline-flex items-center px-6 py-3 rounded-2xl border border-emerald-200 text-emerald-800">
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

/* Short descriptions for Haryana spots */
function getShortDescriptionFor(loc: string) {
  const map: Record<string, string> = {
    "Kurukshetra": "Historic Bhagwan Krishna-related sites, temples and the sacred tank at Jyotisar.",
    "Panipat (Battleground & Weavers)": "Famous for the historic battlefields and traditional textile/weaving heritage.",
    "Sultanpur Bird Sanctuary": "A popular birding wetland near Gurugram — seasonal migrants and resident waterbirds.",
    "Gurugram (Gurgaon)": "Modern business hub with malls, dining, and nearby rural heritage experiences.",
    "Faridabad": "Industrial city with nearby eco-parks and local markets.",
    "Panchkula": "Planned township adjacent to Chandigarh with access to Pinjore Gardens and hill approaches.",
    "Karnal": "Known for its agricultural research centres and nearby rural attractions.",
    "Hisar (Forts & Museums)": "Historic fort, archaeology and nearby rural craft centres.",
    "Jind": "Small historic town with local temples and regional fairs.",
    "Kurukshetra Jyotisar": "Legendary site associated with the Mahabharata; spiritual heritage and museums.",
    "Pinjore Gardens (Yadavindra Gardens)": "Well-kept Mughal-style terraced gardens — popular for day trips and picnics.",
  };
  return map[loc] ?? "Explore this place — local culture, food and experiences await.";
}
