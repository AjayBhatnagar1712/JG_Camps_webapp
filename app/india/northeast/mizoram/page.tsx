// app/india/northeast/mizoram/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

/**
 * Mizoram index page — lists major destinations, quick actions to:
 * - auto-create an itinerary (opens the global itinerary builder.
 * - open contact modal for a personalised itinerary (dispatches global event "open-contact-expert")
 *
 * Matches the Bihar / Meghalaya pattern for consistent site structure.
 */

const DATA = {
  name: "Mizoram",
  image: "/images/northeast-india/mizoram.jpg",
  bestSeason: "Oct – May",
  highlights:
    "Rolling hills, bamboo forests, vibrant Mizo culture, living villages and calm lakes — Mizoram is ideal for offbeat hill-country travel and cultural immersion.",
};

const LOCATIONS = [
  "Aizawl (Capital & lookout points)",
  "Lunglei (Tea gardens & scenic viewpoints)",
  "Champhai (Border town & vineyards)",
  "Siaha / Saiha (Lakes & tribal culture)",
  "Kolasib (Hills & rural life)",
  "Mamit (Dampa Tiger Reserve gateway)",
  "Lawngtlai (Cultural villages & hills)",
  "Serchhip (Waterfalls & viewpoints)",
  "Hnahthial (Churches & rural scenery)",
  "Saitual (Plateau views & trekking access)",
  "Khawzawl (Lakes and village trails)",
  "Champhai Valley (farms & cross-border trade)",
  "Vaphai / Zokhawthar (border villages & traditional crafts)",
  "Lengteng Wildlife Sanctuary (cloud forests & trekking)",
  "Dampa Tiger Reserve (wildlife & lowland forests)",
  "Phawngpui (Blue Mountain — high-altitude meadows)",
  "Reiek (Cultural village & sunset viewpoints)",
  "Thingsai/Ngopa (tribal villages & homestays)",
  "Buhchang (riverside camps & rural experiences)",
  "Khawbung (hilltop viewpoints & village trails)",
];

const DOS = [
  "Respect local village customs and always ask before photographing people or private homes.",
  "Hire local guides for wildlife zones (Dampa) and remote treks (Phawngpui/Lengteng).",
  "Carry layered clothing — hills can be cool in mornings/evenings even during warm months.",
  "Try local Mizo cuisine and support village homestays to benefit communities.",
];

const DONT_S = [
  "Don’t enter protected forest areas without permits or an authorised guide.",
  "Avoid loud music or disruptive behaviour in villages and sacred sites.",
  "Don’t leave litter — waste disposal infrastructure is limited in remote spots.",
  "Don’t drive after dark on remote hill roads unless you are experienced and properly equipped.",
];

export default function MizoramPage() {
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
          <h3 className="font-semibold mb-3">Top Destinations in Mizoram</h3>
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
          <h4 className="font-semibold mb-2">Plan your Mizoram trip</h4>
          <p className="text-gray-600 mb-4">
            From Aizawl’s hilltop views to the blue meadows of Phawngpui and the wildlife of Dampa — tell us your travel preferences and we’ll craft an authentic Mizoram itinerary.
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

/* Helper: small descriptions */
function getShortDescriptionFor(loc: string) {
  const map: Record<string, string> = {
    "Aizawl (Capital & lookout points)": "Hilltop capital with markets, viewpoints and lively local culture — a good base to explore Mizoram.",
    "Lunglei (Tea gardens & scenic viewpoints)": "Second-largest town with lovely river views and access to rural hills.",
    "Champhai (Border town & vineyards)": "Agricultural valley near Myanmar with vineyards, farms and traditional villages.",
    "Siaha / Saiha (Lakes & tribal culture)": "Southern district with lakes and tribal cultural experiences.",
    "Kolasib (Hills & rural life)": "Quiet hill town with easy access to villages and local markets.",
    "Mamit (Dampa Tiger Reserve gateway)": "Gateway for Dampa Reserve — good for wildlife enthusiasts and forest treks.",
    "Lawngtlai (Cultural villages & hills)": "Rugged highlands and traditional village life in south Mizoram.",
    "Serchhip (Waterfalls & viewpoints)": "Small town known for scenic viewpoints and peaceful hillscapes.",
    "Hnahthial (Churches & rural scenery)": "Pleasant hill town with village trails and viewpoints.",
    "Saitual (Plateau views & trekking access)": "Plateau region offering short treks and village stays.",
    "Khawzawl (Lakes and village trails)": "Rising hill town with local lakes and outdoor trails.",
    "Champhai Valley (farms & cross-border trade)": "Productive valley famous for large agricultural fields and border trade routes.",
    "Vaphai / Zokhawthar (border villages & traditional crafts)": "Borderland villages with traditional crafts and cross-border culture.",
    "Lengteng Wildlife Sanctuary (cloud forests & trekking)": "Cloud forest sanctuary with endemic species and remote trekking options.",
    "Dampa Tiger Reserve (wildlife & lowland forests)": "One of Mizoram’s key protected areas — requires guided safaris and permits.",
    "Phawngpui (Blue Mountain — high-altitude meadows)": "State’s highest peak with alpine meadows and panoramic vistas — seasonal trekking.",
    "Reiek (Cultural village & sunset viewpoints)": "Popular viewpoint with an ethnographic village and sunset vistas over Aizawl plains.",
    "Thingsai/Ngopa (tribal villages & homestays)": "Authentic village experiences and homestays — ideal for cultural immersion.",
    "Buhchang (riverside camps & rural experiences)": "Riverside camping spots and rural village trails.",
    "Khawbung (hilltop viewpoints & village trails)": "Quiet hilltop village offering walking trails and scenic outlooks.",
  };
  return map[loc] || "Explore this beautiful Mizoram destination with guided local experiences and village homestays.";
}
