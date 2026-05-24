// app/india/east/andaman-and-nicobar/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

/**
 * Andaman & Nicobar Islands index page — lists major islands / locations,
 * provides quick "Create Itinerary (Auto)" and "Personalize Itinerary" actions,
 * and individual "Plan <location>" buttons that open planner with params.
 *
 * Path suggestion: save as app/india/east/andaman-and-nicobar/page.tsx
 */

const DATA = {
  name: "Andaman & Nicobar Islands",
  image: "/images/east-india/andaman.jpg",
  bestSeason: "Oct – May",
  highlights:
    "Pristine beaches, coral reefs, historic sites and unique island communities — from Port Blair to Havelock (Swaraj) and the remote Nicobar islands.",
};

const LOCATIONS = [
  "Port Blair (Capital & Cellular Jail)",
  "Havelock Island / Swaraj Dweep (Radhanagar Beach, diving)",
  "Neil Island / Shaheed Dweep (beaches & snorkeling)",
  "Ross Island (historic British-era ruins)",
  "North Bay Island (coral snorkelling & water sports)",
  "Baratang Island (limestone caves & mangrove creeks)",
  "Little Andaman (surfing & waterfalls)",
  "Diglipur (Ross & Smith Island day trip, Saddle Peak)",
  "Mayabunder (quiet beaches & mud volcanoes)",
  "Rangat (rural island experiences)",
  "Long Island (Laxmanpur beach & boating)",
  "Cinque Island (pristine coral sanctuary — permit required)",
  "Barren Island (active volcano — boat/permit required, distant view)",
  "Great Nicobar (Campbell Bay — remote, tribal areas)",
  "Little Nicobar (remote, limited access)",
  "Campbell Bay (southern Nicobar access & biodiversity)",
  "Nancowry & Katchal (remote Nicobar group — permits required)",
];

const DOS = [
  "Respect local tribal rules and restricted zones — several areas need permits.",
  "Book marine activities (diving/snorkelling) with registered operators only.",
  "Carry sunscreen, reef-safe products, and reef shoes for coral areas.",
  "Prefer public ferry schedules & plan inter-island transfers in advance (monsoon reduces services).",
];

const DONT_S = [
  "Don't attempt to visit restricted tribal reserves or protected Nicobar islands without the necessary permissions.",
  "Avoid touching or standing on corals — they are fragile and protected.",
  "Don't litter beaches — pack out what you bring in, especially plastics.",
  "Avoid loudnight parties near nesting sites during season (turtle nesting in some areas).",
];

export default function AndamanPage() {
  const openContact = () => window.dispatchEvent(new Event("open-contact-expert"));

  const openPlannerWith = (state: string, location?: string) => {
    try {
      window.dispatchEvent(new CustomEvent("open-planner-with", { detail: { state, location } }));
    } catch {
      // noop if custom event isn't handled
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
          <h3 className="font-semibold mb-3">Major Islands & Locations</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {LOCATIONS.map((loc) => (
              <div key={loc} className="rounded-lg p-4 bg-white border border-gray-100 shadow-sm">
                <div className="font-medium text-emerald-800">{shortLabel(loc)}</div>
                <div className="text-sm text-gray-600 mt-1">{getShortDescriptionFor(loc)}</div>
                <div className="mt-3 flex flex-wrap gap-2">
                  <button
                    onClick={() => openPlannerWith(DATA.name, shortLabel(loc))}
                    className="text-sm px-3 py-1 rounded-full border border-emerald-200 text-emerald-800 hover:bg-emerald-50"
                  >
                    Plan {shortLabel(loc)}
                  </button>
                  <button
                    onClick={openContact}
                    className="text-sm px-3 py-1 rounded-full border border-amber-200 text-amber-700 hover:bg-amber-50"
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
          <h4 className="font-semibold mb-2">Plan your Andaman & Nicobar trip</h4>
          <p className="text-gray-600 mb-4">
            Island-hopping, coral reefs and colonial history — tell us your dates and preferences and we’ll
            create a safe, permit-aware itinerary with transfers and activities.
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
    "Port Blair (Capital & Cellular Jail)": "Capital city and gateway — Cellular Jail, museums and ferry hub for inter-island transfers.",
    "Havelock Island / Swaraj Dweep (Radhanagar Beach, diving)": "Famous for Radhanagar Beach (often listed among Asia's best), diving, snorkelling and vibrant marine life.",
    "Neil Island / Shaheed Dweep (beaches & snorkeling)": "Quieter island with natural rock formations, clear waters and good snorkelling spots.",
    "Ross Island (historic British-era ruins)": "Historical island with atmospheric ruins from the colonial era and short boat trips from Port Blair.",
    "North Bay Island (coral snorkelling & water sports)": "Popular day-trip for coral snorkelling, glass-bottom boats and water sports.",
    "Baratang Island (limestone caves & mangrove creeks)": "Known for limestone caves, mangrove creeks and unique geology — often a full-day excursion from Middle Andaman.",
    "Little Andaman (surfing & waterfalls)": "Known for long beaches, waterfalls and surf spots (less touristy than Havelock).",
    "Diglipur (Ross & Smith Island day trip, Saddle Peak)": "Northern Andaman region — Ross & Smith sandy connection and Saddle Peak trekking.",
    "Mayabunder (quiet beaches & mud volcanoes)": "Quiet northern hub with mud volcanoes and peaceful beaches.",
    "Rangat (rural island experiences)": "Gateway to quieter rural island life and local markets.",
    "Long Island (Laxmanpur beach & boating)": "Scenic island with Laxmanpur beach, lagoons and boating options.",
    "Cinque Island (pristine coral sanctuary — permit required)": "Remote coral sanctuary best visited via organized boat trips — strict permit rules apply.",
    "Barren Island (active volcano — boat/permit required, distant view)": "India's only active volcano; visits are highly regulated and typically limited to distant boat views.",
    "Great Nicobar (Campbell Bay — remote, tribal areas)": "Remote southernmost island with biodiversity; access is restricted and requires permits.",
    "Little Nicobar (remote, limited access)": "Part of Nicobar group — remote, restricted and culturally sensitive.",
    "Campbell Bay (southern Nicobar access & biodiversity)": "Main administrative town of Great Nicobar (Campbell Bay) — biodiversity hotspot.",
    "Nancowry & Katchal (remote Nicobar group — permits required)": "Remote Nicobar islands; travel is regulated and often requires special permissions.",
  };
  return map[loc] || "Explore the islands' beaches, coral reefs and unique island culture — plan with permits and local guides.";
}
