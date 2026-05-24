// app/india/south/karnataka/page.tsx
"use client";

import slugify from "@/lib/slugify";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const DATA = {
  name: "Karnataka",
  image: "/images/south-india/karnataka.jpg",
  bestSeason: "Oct – Mar",
  highlights:
    "Rich heritage cities like Mysuru & Hampi, lush Western Ghats, waterfalls, wildlife and pristine beaches.",
};

const LOCATIONS = [
  "Bengaluru (City & Tech Hub)",
  "Mysuru (Palace City)",
  "Coorg (Madikeri & Abbey Falls)",
  "Chikmagalur (Coffee Hills)",
  "Hampi (UNESCO Heritage Site)",
  "Badami, Aihole & Pattadakal",
  "Gokarna (Beaches & Temples)",
  "Udupi (Sri Krishna Temple & Coastal Drive)",
  "Murudeshwar (Shiva Statue & Beach)",
  "Jog Falls (Sharavathi River)",
  "Kabini Wildlife Sanctuary",
  "Bandipur National Park",
  "Sringeri & Agumbe (Rainforest Belt)",
  "Sakleshpur (Plantations & Forts)",
  "Belur & Halebidu (Hoysala Temples)",
  "Shimoga (Tyavarekoppa & Forest Trails)",
  "Kudremukh (Trekking & Western Ghats)",
  "Bijapur (Gol Gumbaz & Mosques)",
  "Karwar (Beaches & Naval Museum)",
];

const DOS = [
  "Book wildlife safaris (Kabini, Bandipur) well in advance.",
  "Carry rain gear if visiting Western Ghats (Coorg, Chikmagalur, Agumbe).",
  "Respect local traditions at temple towns like Udupi and Murudeshwar.",
  "Hire government-certified guides at heritage sites like Hampi and Badami.",
];

const DONT_S = [
  "Don’t enter forest areas or waterfalls during heavy monsoon without permission.",
  "Avoid plastic waste — Karnataka promotes eco-tourism strongly.",
  "Don’t feed animals or approach wildlife during safaris.",
];

export default function KarnatakaPage() {
  const openContact = () => window.dispatchEvent(new Event("open-contact-expert"));

  // global planner trigger
  const openPlannerWith = (state: string, location?: string) => {
    try {
      window.dispatchEvent(new CustomEvent("open-planner-with", { detail: { state, location } }));
    } catch (e) {}
  };

  const createItineraryAuto = () => openPlannerWith(DATA.name);

  return (
    <main className="bg-white text-slate-800 min-h-screen">
      {/* HERO SECTION */}
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
          <h3 className="font-semibold mb-3">Top Destinations & Experiences</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {LOCATIONS.map((loc) => (
              <div
                key={loc}
                className="rounded-lg p-4 bg-white border border-gray-100 shadow-sm"
              >
                <div className="font-medium text-emerald-800">{loc}</div>
                <div className="text-sm text-gray-600 mt-1">
                  {getShortDescriptionFor(loc)}
                </div>
                <div className="mt-3">
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
          <h4 className="font-semibold mb-2">Plan your Karnataka trip</h4>
          <p className="text-gray-600 mb-4">
            From beaches to coffee estates and heritage towns — tell us your preferences,
            and our experts will craft your perfect itinerary.
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
              href="/india/south"
              className="inline-flex items-center px-6 py-3 rounded-2xl border border-emerald-200 text-emerald-800"
            >
              Back to South India
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

/* Helper: short display label */
function shortLabel(loc: string) {
  const match = loc.match(/^([^(,—]+)/);
  return match ? match[1].trim() : loc;
}

/* Helper: short descriptions for Karnataka destinations */
function getShortDescriptionFor(loc: string) {
  const map: Record<string, string> = {
    "Bengaluru (City & Tech Hub)":
      "The Silicon Valley of India — lively nightlife, parks, and local markets.",
    "Mysuru (Palace City)":
      "Royal heritage city with Mysore Palace, Chamundi Hills and silk industries.",
    "Coorg (Madikeri & Abbey Falls)":
      "Coffee estates, waterfalls, homestays and trekking trails.",
    "Chikmagalur (Coffee Hills)":
      "Scenic hill station famous for coffee plantations and Western Ghats views.",
    "Hampi (UNESCO Heritage Site)":
      "Vijayanagara Empire ruins, boulder landscapes and temple architecture.",
    "Badami, Aihole & Pattadakal":
      "Historic Chalukyan cave temples and UNESCO monuments.",
    "Gokarna (Beaches & Temples)":
      "Laid-back coastal town — beach treks and peaceful temples.",
    "Udupi (Sri Krishna Temple & Coastal Drive)":
      "Temple town with authentic coastal cuisine and serene beaches.",
    "Murudeshwar (Shiva Statue & Beach)":
      "Home to one of the tallest Shiva statues overlooking the sea.",
    "Jog Falls (Sharavathi River)":
      "One of India’s tallest waterfalls — best during monsoon.",
    "Kabini Wildlife Sanctuary":
      "Popular safari destination with tigers, elephants and tranquil backwaters.",
    "Bandipur National Park":
      "Renowned tiger reserve along the Mysuru–Ooty route.",
    "Sringeri & Agumbe (Rainforest Belt)":
      "Spiritual centers surrounded by dense forests and waterfalls.",
    "Sakleshpur (Plantations & Forts)":
      "Scenic drive destination with fort ruins and hilltop stays.",
    "Belur & Halebidu (Hoysala Temples)":
      "Ornate temple architecture showcasing intricate carvings.",
    "Shimoga (Tyavarekoppa & Forest Trails)":
      "Gateway to waterfalls, forests and eco-tourism experiences.",
    "Kudremukh (Trekking & Western Ghats)":
      "Biodiversity hotspot with beautiful treks and grassland views.",
    "Bijapur (Gol Gumbaz & Mosques)":
      "Historical city with magnificent Deccan Sultanate architecture.",
    "Karwar (Beaches & Naval Museum)":
      "Quiet beach town ideal for water sports and seafood lovers.",
  };
  return map[loc] || "Discover local culture, nature, and experiences unique to this region.";
}
