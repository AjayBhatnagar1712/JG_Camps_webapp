// app/india/northeast/arunachal-pradesh/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

/**
 * Arunachal Pradesh index page — lists major destinations, quick actions to:
 * - auto-create an itinerary (opens the global itinerary builder.
 * - open contact modal for a personalised itinerary (dispatches global event "open-contact-expert")
 *
 * Pattern matches the Bihar page structure used across the site.
 */

const DATA = {
  name: "Arunachal Pradesh",
  image: "/images/northeast-india/arunachal.jpg",
  bestSeason: "Mar – Oct (varies by altitude)",
  highlights:
    "Pristine mountain landscapes, Buddhist monasteries (Tawang), tribal cultures, alpine lakes, and remote rainforests — ideal for offbeat journeys and high-altitude culture & nature trips.",
};

const LOCATIONS = [
  "Itanagar (Capital & Ita Fort)",
  "Tawang (Monasteries, Tawang War Memorial, Sela Pass)",
  "Ziro Valley (Apatani culture & rice fields)",
  "Bomdila (Monasteries & scenic viewpoints)",
  "Pasighat (Riverfront, Siang river activities)",
  "Daporijo (Hill town & nearby circuits)",
  "Along / Aalo (Tribal culture & scenic hills)",
  "Roing (Gateway to Dibang Valley & waterfalls)",
  "Tezu (Riverfront town with local markets)",
  "Changlang (Tribal landscapes & forests)",
  "Miao (Namdapha access & wildlife)",
  "Anini (Remote Dibang Valley — tribal & treks)",
  "Hayuliang (Eastern gateway & highland views)",
  "Mechuka / Gelling (Valley with monasteries & homestays)",
  "Zemithang (near Tawang; scenic highlands)",
  "Pangsau Pass (Wakro area — historic border pass)",
  "Namsai (Brahmaputra tributary region & monasteries)",
  "Bhalukpong (entry point from Assam; river & forests)",
  "Dirang (Hot springs, apple orchards & monk festivals)",
  "Tirap Valley (Lohit region — tribal experiences)",
];

const DOS = [
  "Respect local customs, especially in tribal villages — always ask before photographing people.",
  "Hire local guides where recommended (Tawang, Namdapha, Anini) for safety and context.",
  "Carry warm layers — mountain nights (Tawang, Dirang) can be cold even in summer.",
  "Plan travel permits (ILP) in advance; carry copies during travel.",
];

const DONT_S = [
  "Don’t enter restricted military/forward areas without permission.",
  "Avoid trekking alone in remote valleys — permit and guide recommended.",
  "Don’t assume mobile/Internet will be available everywhere; be prepared for spotty connectivity.",
  "Avoid disrespecting local religious sites (monasteries) — remove shoes when required and follow signage.",
];

export default function ArunachalPradeshPage() {
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
          <h3 className="font-semibold mb-3">Top Destinations in Arunachal Pradesh</h3>
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
          <h4 className="font-semibold mb-2">Plan your Arunachal trip</h4>
          <p className="text-gray-600 mb-4">
            From the monasteries of Tawang to the rice terraces of Ziro and the rainforests near Namdapha — tell us your travel style and dates, and we’ll craft a remote & authentic itinerary.
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

/* Helper: shorten display name (remove parenthetical extra) */
function shortLabel(loc: string) {
  const match = loc.match(/^([^(,—]+)/);
  return match ? match[1].trim() : loc;
}

/* Helper: small summaries per destination */
function getShortDescriptionFor(loc: string) {
  const map: Record<string, string> = {
    "Itanagar (Capital & Ita Fort)": "State capital with Ita Fort ruins, Ganga Lake and museum introductions to local tribes.",
    "Tawang (Monasteries, Tawang War Memorial, Sela Pass)": "High-altitude town with a major monastery, war memorial and dramatic passes (Sela).",
    "Ziro Valley (Apatani culture & rice fields)": "Famed for rolling rice terraces, Apatani tribal villages and Ziro Music Festival.",
    "Bomdila (Monasteries & scenic viewpoints)": "Hill town with views towards the high Himalaya and access to local markets & monasteries.",
    "Pasighat (Riverfront, Siang river activities)": "Gateway to river activities on the Siang and access point to eastern Arunachal circuits.",
    "Daporijo (Hill town & nearby circuits)": "Local hub for exploring northern West Siang landscapes and community visits.",
    "Along / Aalo (Tribal culture & scenic hills)": "Tribal heartland with cultural experiences, landscapes and local handicrafts.",
    "Roing (Gateway to Dibang Valley & waterfalls)": "River-valley town serving access to Dibang and nearby natural spots.",
    "Tezu (Riverfront town with local markets)": "Lohit district town with markets and nearby historical temples and forests.",
    "Changlang (Tribal landscapes & forests)": "Eastern Arunachal with tribal diversity, forest trails and cultural interaction.",
    "Miao (Namdapha access & wildlife)": "Entry town for Namdapha National Park — great for wildlife & eco-tours.",
    "Anini (Remote Dibang Valley — tribal & treks)": "One of the most remote district headquarters with unique tribal cultures and highland treks.",
    "Hayuliang (Eastern gateway & highland views)": "Eastern highland area with sweeping views, river valleys and village circuits.",
    "Mechuka / Gelling (Valley with monasteries & homestays)": "Picturesque valley known for monasteries, scenic homestays and river views.",
    "Zemithang (near Tawang; scenic highlands)": "Remote highland area near the Tawang frontier, quiet valleys and passes.",
    "Pangsau Pass (Wakro area — historic border pass)": "Historic pass near Arunachal/Assam border; scenic and culturally significant.",
    "Namsai (Brahmaputra tributary region & monasteries)": "Cultural junction with monasteries, local cuisine and river access.",
    "Bhalukpong (entry point from Assam; river & forests)": "Popular entry point for forest and river activities en route to western Arunachal.",
    "Dirang (Hot springs, apple orchards & monk festivals)": "Known for hot springs, apple orchards, and a calm mountain ambience.",
    "Tirap Valley (Lohit region — tribal experiences)": "Forested tribal landscapes, remote villages and cultural visits (guide recommended).",
  };
  return map[loc] || "Explore the natural beauty, tribal cultures and highland routes of this destination.";
}
