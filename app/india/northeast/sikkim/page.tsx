// app/india/northeast/sikkim/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

/**
 * Sikkim index page — lists major destinations, quick actions to:
 * - auto-create an itinerary (opens the global itinerary builder.
 * - open contact modal for a personalised itinerary (dispatches global event "open-contact-expert")
 *
 * Matches the Bihar / Nagaland / Mizoram layout.
 */

const DATA = {
  name: "Sikkim",
  image: "/images/northeast-india/sikkim.jpg",
  bestSeason: "Mar – Jun, Oct – Dec",
  highlights:
    "Nestled in the Himalayas, Sikkim blends Buddhist monasteries, snow-capped peaks, glacial lakes, and adventure with deep cultural roots. From Gangtok to Gurudongmar, it’s a paradise for mountain lovers.",
};

const LOCATIONS = [
  "Gangtok (Capital & MG Marg)",
  "Tsomgo Lake (Glacial lake near Nathula)",
  "Nathula Pass (Indo-China border route)",
  "Rumtek Monastery (Golden Stupa & Buddhist centre)",
  "Pelling (Kanchenjunga views & Pemayangtse Monastery)",
  "Yuksom (Base for Goechala trek)",
  "Ravangla (Buddha Park & scenic views)",
  "Namchi (Char Dham & Tendong Hill)",
  "Lachen (Gateway to Gurudongmar Lake)",
  "Lachung (Base for Yumthang Valley)",
  "Yumthang Valley (Valley of Flowers, North Sikkim)",
  "Gurudongmar Lake (Sacred high-altitude lake)",
  "Zuluk (Silk Route village & hairpin bends)",
  "Rinchenpong (Heritage village & monastery)",
  "Mangan (Music capital of Sikkim & offbeat stays)",
  "Gyalshing (Pelling region access)",
  "Temi Tea Garden (Scenic tea estate)",
  "Rongli (Silk Route entry village)",
  "Rangpo (Gateway to Sikkim)",
  "Borong (Hot springs & nature trails)",
  "Dentam (Singshore Bridge & local craft)",
  "Soreng (Adventure & homestays)",
  "Sombaria (Hillside villages & monasteries)",
  "Hee-Bermiok (Cultural eco-tourism hub)",
  "Dzongu (Reserved Lepcha heritage region)",
];

const DOS = [
  "Carry valid permits for restricted areas like Nathula, Gurudongmar and Yumthang — apply via registered tour operators.",
  "Respect monastery rules: remove shoes, dress modestly, and maintain silence inside prayer halls.",
  "Plan acclimatization time before visiting high-altitude zones like Lachen or Gurudongmar.",
  "Support local homestays, monasteries and eco-villages for authentic experiences.",
];

const DONT_S = [
  "Don’t photograph military installations near Nathula or border areas.",
  "Avoid littering near lakes, monasteries, or treks — Sikkim enforces strict eco-guidelines.",
  "Don’t underestimate the altitude — stay hydrated and travel gradually uphill.",
  "Avoid visiting during heavy monsoon (July–Sept) due to landslides and road closures.",
];

export default function SikkimPage() {
  const openContact = () => window.dispatchEvent(new Event("open-contact-expert"));

  const openPlannerWith = (state: string, location?: string) => {
    try {
      window.dispatchEvent(new CustomEvent("open-planner-with", { detail: { state, location } }));
    } catch {
      // noop — safe fallback
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
          <h3 className="font-semibold mb-3">Top Destinations in Sikkim</h3>
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
          <h4 className="font-semibold mb-2">Plan your Sikkim trip</h4>
          <p className="text-gray-600 mb-4">
            From the glacial lakes of North Sikkim to monasteries in West and the valleys of South — tell us your travel
            preferences and we’ll design a perfect Sikkim itinerary for you.
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
              href="/india/northeast"
              className="inline-flex items-center px-6 py-3 rounded-2xl border border-emerald-200 text-emerald-800"
            >
              Back to North-East India
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

/* Helper: shorten display name */
function shortLabel(loc: string) {
  const match = loc.match(/^([^(,—]+)/);
  return match ? match[1].trim() : loc;
}

/* Short descriptions for major destinations */
function getShortDescriptionFor(loc: string) {
  const map: Record<string, string> = {
    "Gangtok (Capital & MG Marg)": "Vibrant capital city — monasteries, viewpoints and lively MG Marg market.",
    "Tsomgo Lake (Glacial lake near Nathula)": "High-altitude lake surrounded by snow peaks; often frozen in winter.",
    "Nathula Pass (Indo-China border route)": "Historic Silk Route pass with spectacular snow views — permit required.",
    "Rumtek Monastery (Golden Stupa & Buddhist centre)": "Seat of the Karmapa — major Buddhist monastery near Gangtok.",
    "Pelling (Kanchenjunga views & Pemayangtse Monastery)": "Hill town with stunning Himalayan views and sacred monasteries.",
    "Yuksom (Base for Goechala trek)": "Historic capital and base for popular high-altitude treks.",
    "Ravangla (Buddha Park & scenic views)": "Peaceful town with a towering Buddha statue and tea estates nearby.",
    "Namchi (Char Dham & Tendong Hill)": "Spiritual hub featuring replica of India’s Char Dhams and scenic mountain trails.",
    "Lachen (Gateway to Gurudongmar Lake)": "Base village for exploring Gurudongmar — prepare for altitude.",
    "Lachung (Base for Yumthang Valley)": "Charming village stay on way to the Valley of Flowers.",
    "Yumthang Valley (Valley of Flowers, North Sikkim)": "Blooming valley with rhododendrons and alpine pastures.",
    "Gurudongmar Lake (Sacred high-altitude lake)": "Sacred glacial lake at 17,000 ft — breathtaking views.",
    "Zuluk (Silk Route village & hairpin bends)": "Picturesque mountain drive along historic trade route.",
    "Rinchenpong (Heritage village & monastery)": "Quiet heritage village with traditional homes and monastery views.",
    "Mangan (Music capital of Sikkim & offbeat stays)": "Laid-back town known for music festivals and offbeat stays.",
    "Gyalshing (Pelling region access)": "Administrative centre offering access to monasteries and gardens.",
    "Temi Tea Garden (Scenic tea estate)": "Sikkim’s only tea garden — scenic estate drives and tastings.",
    "Rongli (Silk Route entry village)": "Permit check and entry point for East Sikkim route.",
    "Rangpo (Gateway to Sikkim)": "Major entry town connecting West Bengal and Sikkim.",
    "Borong (Hot springs & nature trails)": "Small hamlet with natural hot springs and nature walks.",
    "Dentam (Singshore Bridge & local craft)": "Famous for Asia’s 2nd-highest suspension bridge and handicrafts.",
    "Soreng (Adventure & homestays)": "Adventure destination with ziplining, hiking and eco-stays.",
    "Sombaria (Hillside villages & monasteries)": "Cluster of peaceful hill villages and monasteries.",
    "Hee-Bermiok (Cultural eco-tourism hub)": "Village known for eco-homestays and heritage cultural programs.",
    "Dzongu (Reserved Lepcha heritage region)": "Culturally protected region home to the indigenous Lepcha people.",
  };
  return map[loc] || "Discover the scenic landscapes and monasteries of this Sikkim destination.";
}
