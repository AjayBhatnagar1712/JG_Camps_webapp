// app/india/northeast/nagaland/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

/**
 * Nagaland index page — lists major destinations, quick actions to:
 * - auto-create an itinerary (opens the global itinerary builder.
 * - open contact modal for a personalised itinerary (dispatches global event "open-contact-expert")
 *
 * Follows the same structure as Bihar/Mizoram pages for consistency across the site.
 */

const DATA = {
  name: "Nagaland",
  image: "/images/northeast-india/nagaland.jpg",
  bestSeason: "Oct – Mar",
  highlights:
    "Nagaland — live tribal culture, colourful festivals (Hornbill), rolling hills, highland villages, and spectacular treks like Dzukou Valley. Ideal for cultural immersion and offbeat trekking.",
};

const LOCATIONS = [
  "Kohima (Capital & Hornbill Festival)",
  "Dimapur (Gateway, ruins & markets)",
  "Mokokchung (Ao cultural hub & festivals)",
  "Tuensang (Eastern highlands & tribal culture)",
  "Mon (Konyak headhunter villages & Aos)",
  "Zunheboto (Sumi Naga region & hills)",
  "Wokha (Lotha Naga region & rural life)",
  "Phek (Chakhesang culture & scenic valleys)",
  "Peren (Lowland villages & community tourism)",
  "Kiphire (Remote hills & waterfalls)",
  "Longleng (Tribal villages & viewpoints)",
  "Noklak (Eastern frontier & tribal culture)",
  "Dzukou Valley (iconic trek & alpine meadow)",
  "Khonoma (Conservation village & living heritage)",
  "Tseminyu (Cultural festivals & viewpoints)",
  "Tizu Valley (river routes & rural trails)",
  "Changtongya (Markets & scenic hill views)",
  "Aoleang / Monger (Ao cultural festivals in Mokokchung)",
  "Nagaland State Museum (Kohima — tribal artefacts & history)",
  "Dikhu / Tuensang outskirts (traditional villages & drives)",
];

const DOS = [
  "Respect village customs: always ask before photographing people or private property.",
  "Attend Hornbill (Kohima) or local festivals to see tribal dances & crafts — plan tickets early for Hornbill (Dec).",
  "Hire local guides for treks like Dzukou Valley and remote village visits for safety and context.",
  "Carry cash in smaller towns — ATMs can be sparse in remote areas.",
];

const DONT_S = [
  "Don't enter private or sacred village areas without permission.",
  "Avoid loud, disrespectful behaviour during festivals or ceremonies.",
  "Do not attempt remote treks alone — weather can change quickly and trails are remote.",
  "Don't leave litter; pack out what you carry in remote natural areas.",
];

export default function NagalandPage() {
  const openContact = () => window.dispatchEvent(new Event("open-contact-expert"));

  const openPlannerWith = (state: string, location?: string) => {
    try {
      window.dispatchEvent(new CustomEvent("open-planner-with", { detail: { state, location } }));
    } catch {
      // noop — best-effort
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
          <h3 className="font-semibold mb-3">Top Destinations in Nagaland</h3>
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
          <h4 className="font-semibold mb-2">Plan your Nagaland trip</h4>
          <p className="text-gray-600 mb-4">
            From the Hornbill Festival in Kohima to the alpine meadows of Dzukou Valley and the living heritage of Khonoma — tell us your travel style and dates, and we’ll craft an authentic Nagaland itinerary.
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

/* Helper: shorten display name (remove parenthetical extras) */
function shortLabel(loc: string) {
  const match = loc.match(/^([^(,—]+)/);
  return match ? match[1].trim() : loc;
}

/* Small descriptions per destination */
function getShortDescriptionFor(loc: string) {
  const map: Record<string, string> = {
    "Kohima (Capital & Hornbill Festival)": "State capital and cultural hub — famous for the Hornbill Festival and Nagaland State Museum.",
    "Dimapur (Gateway, ruins & markets)": "Main transit hub with markets, historical ruins and access to other districts.",
    "Mokokchung (Ao cultural hub & festivals)": "Cultural center for the Ao Naga with traditional festivals and vibrant town life.",
    "Tuensang (Eastern highlands & tribal culture)": "Eastern highlands offering remote cultural experiences and village visits.",
    "Mon (Konyak headhunter villages & Aos)": "Home to Konyak tribes, distinctive murals and traditional warrior heritage.",
    "Zunheboto (Sumi Naga region & hills)": "Sumi region known for terraced hills, festivals and rural life.",
    "Wokha (Lotha Naga region & rural life)": "Lotha Naga areas — scenic hills and agricultural valleys.",
    "Phek (Chakhesang culture & scenic valleys)": "Chakhesang cultural area with pretty valleys and rice terraces.",
    "Peren (Lowland villages & community tourism)": "Lowland district with community-based tourism and village stays.",
    "Kiphire (Remote hills & waterfalls)": "Remote hilly district with waterfalls and rustic village routes.",
    "Longleng (Tribal villages & viewpoints)": "Less-visited district with superb viewpoints and village life.",
    "Noklak (Eastern frontier & tribal culture)": "Frontier region with tribal culture and remote vistas.",
    "Dzukou Valley (iconic trek & alpine meadow)": "Iconic trek with seasonal wildflowers and dramatic meadows — trekking season Oct–May.",
    "Khonoma (Conservation village & living heritage)": "Famous conservation village with community forests and cultural trails.",
    "Tseminyu (Cultural festivals & viewpoints)": "Town known for local festivals and nearby scenic outlooks.",
    "Tizu Valley (river routes & rural trails)": "River valley with scenic drives and rural experiences.",
    "Changtongya (Markets & scenic hill views)": "Hill town with local markets and easy access to rural walks.",
    "Aoleang / Monger (Ao cultural festivals in Mokokchung)": "Ao festival experiences centred around Mokokchung; great for cultural timing.",
    "Nagaland State Museum (Kohima — tribal artefacts & history)": "Best place to learn about Naga tribes, crafts and history.",
    "Dikhu / Tuensang outskirts (traditional villages & drives)": "Remote drives with authentic village stops and local hospitality.",
  };
  return map[loc] || "Explore this Nagaland destination for culture, trekking and village stays.";
}
