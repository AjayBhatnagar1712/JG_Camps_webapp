// app/india/northeast/manipur/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

/**
 * Manipur index page — lists major destinations and provides quick actions:
 * - Create Itinerary (Auto) -> navigates to /india/northeast/plan with state & optional location
 * - Personalize Itinerary -> dispatches global event "open-contact-expert"
 *
 * Follows the same structure as other regional pages (Bihar / Assam).
 */

const DATA = {
  name: "Manipur",
  image: "/images/northeast-india/manipur.jpg",
  bestSeason: "Oct – Mar",
  highlights:
    "Manipur is a highland state of rich tribal culture, scenic lakes (Loktak), classical Manipuri dance, vibrant markets in Imphal and offbeat hill villages.",
};

const LOCATIONS = [
  "Imphal (Capital — Kangla Fort, INA Memorial, local markets)",
  "Loktak Lake (Floating phumdis & Keibul Lamjao National Park)",
  "Bishnupur (Handloom, ancient martial traditions & temples)",
  "Ukhrul (Tangkhul Naga hills, Shirui Lily region)",
  "Moreh (Border gateway to Myanmar, trade & culture)",
  "Churachandpur (Hill-town markets & tribal craft)",
  "Thoubal (Rural villages & riverine life)",
  "Tamenglong (Rolling hills, waterfalls and mahseer rivers)",
  "Senapati (Hill views & tribal festivals)",
  "Jiribam (Gateway on Imphal-Jiribam route)",
  "Kamjong (Remote tribal landscapes & trekking)",
  "Pherzawl (Scenic highland pockets)",
  "Chandel (Valley & hillscapes, access to Myanmar border areas)",
  "Heinoupokpa (Local village experiences and craft)",
  "Phubala (Rural stays & nature trails)",
  "Kanglatongbi (Wetland pockets & birdwatching)",
  "Nongmaiching / Langol Hills (Short hikes and panoramas near Imphal)",
  "Andro (Heritage village & pottery, Meitei culture workshops)",
];

const DOS = [
  "Respect local tribal customs and festival timings — ask before photographing people in ceremonies.",
  "Visit Loktak and Keibul Lamjao with licensed guides; boat rides on the lake are the best way to explore.",
  "Try local Manipuri cuisine — singju, chakhao (black rice) dishes and smoked fish specialties.",
  "Carry warm clothes for hill pockets (Ukhrul / Tamenglong) during winter nights.",
];

const DONT_S = [
  "Don't enter restricted border zones near Myanmar without permits and guided escorts.",
  "Avoid loud behaviour at sacred sites and traditional village gatherings.",
  "Don't assume road connectivity — some hill routes are seasonal or slow; plan extra travel time.",
  "Avoid bringing plastic into protected wetland areas; follow local waste rules.",
];

export default function ManipurPage() {
  const openContact = () => window.dispatchEvent(new Event("open-contact-expert"));

  const openPlannerWith = (state: string, location?: string) => {
    try {
      window.dispatchEvent(new CustomEvent("open-planner-with", { detail: { state, location } }));
    } catch {
      // noop
    }
    const params = new URLSearchParams({ state });
    if (location) params.append("location", location);
    // navigate to the regional planner page with params
    window.location.href = `/india/northeast/plan?${params.toString()}`;
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
          <h3 className="font-semibold mb-3">Top Destinations in Manipur</h3>
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
          <h4 className="font-semibold mb-2">Plan your Manipur trip</h4>
          <p className="text-gray-600 mb-4">
            From Imphal’s heritage and Loktak Lake's floating islands to hill villages and tribal festivals — tell us your travel style and dates, and we’ll craft a tailored Manipur itinerary.
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
    "Imphal (Capital — Kangla Fort, INA Memorial, local markets)": "Political and cultural capital — visit Kangla Fort, Ima Keithel market and war memorials.",
    "Loktak Lake (Floating phumdis & Keibul Lamjao National Park)": "Largest freshwater lake in NE India — famous for floating islands (phumdis) and the unique Keibul Lamjao floating national park.",
    "Bishnupur (Handloom, ancient martial traditions & temples)": "Cultural village known for handloom crafts and martial history; small museums and traditional performances.",
    "Ukhrul (Tangkhul Naga hills, Shirui Lily region)": "Hilly district with Tangkhul culture; Shirui Lily habitat and highland vistas.",
    "Moreh (Border gateway to Myanmar, trade & culture)": "Border town with trade links to Myanmar and multicultural markets.",
    "Churachandpur (Hill-town markets & tribal craft)": "Gateway to many hill regions; lively markets and tribal arts.",
    "Thoubal (Rural villages & riverine life)": "Agrarian district with scenic riverine settlements and local craft traditions.",
    "Tamenglong (Rolling hills, waterfalls and mahseer rivers)": "Remote highland district with waterfalls, dense forests and tribal culture.",
    "Senapati (Hill views & tribal festivals)": "Scenic upland district with strong tribal identity and colourful festivals.",
    "Jiribam (Gateway on Imphal-Jiribam route)": "Important transport gateway and entry point from the south of the state.",
    "Kamjong (Remote tribal landscapes & trekking)": "Less-visited tribal landscapes; trekking and authentic village stays.",
    "Pherzawl (Scenic highland pockets)": "Rural hill district with viewpoints and forested valleys.",
    "Chandel (Valley & hillscapes, access to Myanmar border areas)": "Valley landscapes, cultural villages and proximity to border areas.",
    "Heinoupokpa (Local village experiences and craft)": "Traditional village stays and craft demonstrations.",
    "Phubala (Rural stays & nature trails)": "Quiet rural area for short hikes and village immersion.",
    "Kanglatongbi (Wetland pockets & birdwatching)": "Wetlands and small waterbodies; good for birdwatching near Imphal.",
    "Nongmaiching / Langol Hills (Short hikes and panoramas near Imphal)": "Easy hikes and panoramic viewpoints close to the city.",
    "Andro (Heritage village & pottery, Meitei culture workshops)": "Heritage village known for pottery, traditional craft and a cultural museum.",
  };
  return map[loc] || "Explore the landscapes, festivals, and living cultures of this destination.";
}