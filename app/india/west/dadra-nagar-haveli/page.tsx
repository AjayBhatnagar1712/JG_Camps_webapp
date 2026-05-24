// app/india/west/dadra-and-nagar-haveli/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

/**
 * Dadra and Nagar Haveli index page — lists major destinations, quick actions to:
 * - auto-create an itinerary (opens the global itinerary builder.
 * - open contact modal for a personalised itinerary (dispatches global event "open-contact-expert")
 *
 * Structure mirrors other state/region pages (e.g. Bihar) for consistent UX.
 */

const DATA = {
  name: "Dadra and Nagar Haveli",
  image: "/images/west-india/dadra-nagar-haveli.jpg",
  bestSeason: "Oct – Mar",
  highlights:
    "Quiet nature escapes, tribal villages, lakes and relaxed riverside picnics — great for short nature breaks and gentle outdoor activities.",
};

const LOCATIONS = [
  "Silvassa (Capital — Vanganga Garden & Riverfront)",
  "Vanganga Lake & Garden (Boating, nature walk)",
  "Khanvel (Forest trails & tribal villages)",
  "Dudhani / Dudhni (Riverside picnics & local boat rides)",
  "Tribal Museums & Cultural Centers (Local art & crafts)",
  "Hirwa Van / Eco trails (Easy hikes & birding)",
  "Gondia / Nearby waterfalls (Seasonal cascades & swimming spots)",
  "Piresad (Rural homestays & local experiences)",
  "Local Market (Silvassa weekly markets & street-food)",
];

const DOS = [
  "Respect tribal customs and ask before photographing people in villages.",
  "Carry water, sunscreen and light rain gear in the monsoon months (Jul–Sep).",
  "Hire a local guide for village walks to learn about arts, crafts and local history.",
  "Use authorised guides/vehicles inside protected areas or eco-trails.",
];

const DONT_S = [
  "Don't litter at lakes, ghats or eco-trails — carry your waste back with you.",
  "Avoid entering private tribal homes without invitation; many are sacred/private spaces.",
  "Do not attempt unmarked off-trail routes during monsoon — trails get slippery.",
];

export default function DadraAndNagarHaveliPage() {
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
          <h3 className="font-semibold mb-3">Top Destinations & Experiences</h3>
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
          <h4 className="font-semibold mb-2">Plan your Dadra &amp; Nagar Haveli trip</h4>
          <p className="text-gray-600 mb-4">
            Ideal for short nature getaways and cultural immersion — choose activities, dates and we'll craft a practical itinerary with transport and stays.
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
              href="/india/west"
              className="inline-flex items-center px-6 py-3 rounded-2xl border border-emerald-200 text-emerald-800"
            >
              Back to West India
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
    "Silvassa (Capital — Vanganga Garden & Riverfront)": "Silvassa — lakeside gardens, riverside promenades, parks and easy access to local markets.",
    "Vanganga Lake & Garden (Boating, nature walk)": "Popular lake with boating, landscaped gardens and family-friendly picnic spots.",
    "Khanvel (Forest trails & tribal villages)": "Forest-edge trails, tribal hamlets and authentic local craft demonstrations.",
    "Dudhani / Dudhni (Riverside picnics & local boat rides)": "Calm river stretches ideal for picnics and short boat rides (seasonal).",
    "Tribal Museums & Cultural Centers (Local art & crafts)": "Small museums and cultural centres showcasing tribal arts, handloom and local history.",
    "Hirwa Van / Eco trails (Easy hikes & birding)": "Short eco-trails perfect for birdwatching and gentle hikes.",
    "Gondia / Nearby waterfalls (Seasonal cascades & swimming spots)": "Small seasonal waterfalls and natural swimming pockets (best post-monsoon).",
    "Piresad (Rural homestays & local experiences)": "Opportunity for homestays and village experiences to learn local life and cuisine.",
    "Local Market (Silvassa weekly markets & street-food)": "Silvassa markets offering local snacks, handicrafts and weekly produce.",
  };
  return map[loc] || "Explore local nature, markets and cultural heritage at this destination.";
}
