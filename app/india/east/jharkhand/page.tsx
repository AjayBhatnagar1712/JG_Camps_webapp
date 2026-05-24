// app/india/east/jharkhand/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

/**
 * Jharkhand index page — lists major destinations, quick actions to:
 * - auto-create an itinerary (opens the global itinerary builder.
 * - open contact modal for a personalised itinerary (dispatches global event "open-contact-expert")
 *
 * Matches the style/pattern used for Bihar page.
 */

const DATA = {
  name: "Jharkhand",
  image: "/images/east-india/jharkhand.jpg",
  bestSeason: "Oct – Mar",
  highlights:
    "Jharkhand is a land of forests, waterfalls and tribal culture — from the capital Ranchi to the steel city of Jamshedpur and pilgrimage hubs like Deoghar.",
};

const LOCATIONS = [
  "Ranchi (Capital & Rock Gardens)",
  "Jamshedpur (Steel City & Tata Steel Garden)",
  "Deoghar (Baidyanath Jyotirlinga)",
  "Hazaribagh (National Park & lakes)",
  "Netarhat (Sunrise point & viewpoints)",
  "Dhanbad (Coalfields & Maithon nearby)",
  "Giridih (Parasnath & waterfalls)",
  "Palamu (Palamu Fort & wildlife)",
  "Betla (Betla National Park & Palamu Reserve)",
  "Parasnath (Jain pilgrimage hill)",
  "Rajrappa (Rajrappa Temple & river confluence)",
  "Gumla (Hillscapes & tribal villages)",
  "Lohardaga (Bauxite country & scenic hills)",
  "Khunti (Rock art & tribal culture)",
  "Saraikela (Cultural town known for Chhau dance)",
  "Chaibasa (West Singhbhum gateway)",
  "Dumka (Santal Parganas historic town)",
  "Godda (Pilgrimage & scenic pockets)",
  "Pakur (Granite & riverine beauty)",
  "Sahibganj (Ghats on the Ganges & ferry points)",
  "Latehar (Waterfalls & forest treks)",
  "Simdega (Waterfalls & tribal festivals)",
];

const DOS = [
  "Respect tribal customs and local rules when visiting villages and protected zones.",
  "Plan for Oct–Mar for comfortable weather and clear skies at hill viewpoints.",
  "Hire local guides for forest safaris and Parasnath treks — they know safe routes and history.",
  "Carry water, insect repellent and sturdy footwear for waterfall/forest trails.",
];

const DONT_S = [
  "Don't enter protected areas or reserve zones without permission or a guide.",
  "Avoid littering at scenic spots and river ghats; use designated disposal points.",
  "Don't assume frequent public transport in remote areas — arrange private transfer if needed.",
  "Avoid photographing people in villages without asking; be culturally sensitive.",
];

export default function JharkhandPage() {
  const openContact = () => window.dispatchEvent(new Event("open-contact-expert"));

  const openPlannerWith = (state: string, location?: string) => {
    try {
      window.dispatchEvent(new CustomEvent("open-planner-with", { detail: { state, location } }));
    } catch {
      // noop
    }
  };

  const createItineraryAuto = () => openPlannerWith(DATA.name);

  return (
    <main className="bg-white text-slate-800 min-h-screen">
      {/* HERO */}
      <section className="relative w-full h-[56vh] md:h-[64vh] overflow-hidden rounded-b-2xl shadow-lg">
        <Image src={DATA.image} alt={DATA.name} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/30 to-transparent" />
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

      {/* MAIN CONTENT */}
      <section className="py-12 px-6 container mx-auto max-w-6xl">
        <h2 className="text-2xl font-bold text-emerald-800 mb-4">About {DATA.name}</h2>
        <p className="text-gray-700 mb-4">
          {DATA.highlights} Best season: <strong>{DATA.bestSeason}</strong>.
        </p>

        {/* LOCATIONS GRID */}
        <div className="mb-8">
          <h3 className="font-semibold mb-3">Top Destinations in Jharkhand</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {LOCATIONS.map((loc) => (
              <div key={loc} className="rounded-lg p-4 bg-white border border-gray-100 shadow-sm">
                <div className="font-medium text-emerald-800">{shortLabel(loc)}</div>
                <div className="text-sm text-gray-600 mt-1">{getShortDescriptionFor(loc)}</div>
                <div className="mt-3">
                  <button
                    onClick={() => openPlannerWith(DATA.name, shortLabel(loc))}
                    className="text-sm px-3 py-1 rounded-full border border-emerald-200 text-emerald-800 hover:bg-emerald-50"
                  >
                    Plan {shortLabel(loc)}
                  </button>
                  <button
                    onClick={openContact}
                    className="ml-2 text-sm px-3 py-1 rounded-full border border-amber-200 text-amber-700 hover:bg-amber-50"
                  >
                    Personalize
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
          <h4 className="font-semibold mb-2">Plan your Jharkhand trip</h4>
          <p className="text-gray-600 mb-4">
            From the cultural and tribal hubs to waterfalls and wildlife, Jharkhand offers an offbeat and rewarding travel experience.
            Tell us your travel style and dates, and we’ll craft an itinerary that fits.
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
              href="/india/east"
              className="inline-flex items-center px-6 py-3 rounded-2xl border border-emerald-200 text-emerald-800"
            >
              Back to East India
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

/* Helper: shorten display name (remove parenthetical extra) */
function shortLabel(loc: string) {
  const match = loc.match(/^([^(,—]+)/);
  return match ? match[1].trim() : loc;
}

/* Helper: small summaries per destination */
function getShortDescriptionFor(loc: string) {
  const map: Record<string, string> = {
    "Ranchi (Capital & Rock Gardens)": "Ranchi — capital city with rock gardens, waterfalls (Jonha, Hundru) and pleasant hilltop views.",
    "Jamshedpur (Steel City & Tata Steel Garden)": "Industrial city with parks, Tata Steel Garden and nearby Dalma Wildlife Sanctuary.",
    "Deoghar (Baidyanath Jyotirlinga)": "Major pilgrimage town home to the Baidyanath (Jyotirlinga) temple attracting devotees year-round.",
    "Hazaribagh (National Park & lakes)": "Hazaribagh National Park, scenic lakes and quiet hill retreats.",
    "Netarhat (Sunrise point & viewpoints)": "Famous for sunrise points, pine forests and peaceful hill walks.",
    "Dhanbad (Coalfields & Maithon nearby)": "Coal-mining region with Maithon Dam nearby and local industrial heritage.",
    "Giridih (Parasnath & waterfalls)": "Gateway to Parasnath hill (Jain pilgrimage) and scenic waterfalls.",
    "Palamu (Palamu Fort & wildlife)": "Historic fort town with access to forested Palamu wildlife country.",
    "Betla (Betla National Park & Palamu Reserve)": "Known for Betla National Park — safaris, tribal villages and wildlife.",
    "Parasnath (Jain pilgrimage hill)": "Sacred Jain tirtha — a prominent trekking and pilgrimage destination.",
    "Rajrappa (Rajrappa Temple & river confluence)": "Pilgrimage temple at a river confluence with scenic surroundings.",
    "Gumla (Hillscapes & tribal villages)": "Hilly district rich in tribal culture, waterfalls and rural landscapes.",
    "Lohardaga (Bauxite country & scenic hills)": "Known for bauxite deposits and quiet hill scenery.",
    "Khunti (Rock art & tribal culture)": "Tribal heartland with ancient rock art sites and cultural experiences.",
    "Saraikela (Cultural town known for Chhau dance)": "Cultural town famed for Chhau dance and local festivals.",
    "Chaibasa (West Singhbhum gateway)": "Gateway to West Singhbhum with access to tribal areas and forest treks.",
    "Dumka (Santal Parganas historic town)": "Historic Dumka region — cultural and rural landscapes of Santal Parganas.",
    "Godda (Pilgrimage & scenic pockets)": "Emerging district with pilgrimage centres and countryside charm.",
    "Pakur (Granite & riverine beauty)": "Known for stone quarries and riverside pockets along the Ganges tributaries.",
    "Sahibganj (Ghats on the Ganges & ferry points)": "Ghats along the Ganges, river ferries and local markets.",
    "Latehar (Waterfalls & forest treks)": "Waterfalls, forest trails and offbeat trekking opportunities.",
    "Simdega (Waterfalls & tribal festivals)": "Waterfalls, tribal festivals and rural cultural experiences.",
  };
  return map[loc] || "Explore the natural beauty, cultural heritage and tribal traditions of this destination.";
}
