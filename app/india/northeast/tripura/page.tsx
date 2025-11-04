// app/india/northeast/tripura/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

/**
 * Tripura index page — lists major destinations, quick actions to:
 * - auto-create an itinerary (navigates to /india/northeast/plan with params)
 * - open contact modal for a personalised itinerary (dispatches global event "open-contact-expert")
 *
 * Follows the same structure as the other state pages (Bihar / Sikkim pattern).
 */

const DATA = {
  name: "Tripura",
  image: "/images/northeast-india/tripura.jpg",
  bestSeason: "Oct – Mar",
  highlights:
    "Tripura is a lush, lesser-travelled northeastern state with royal heritage, hilltop views, ancient rock carvings, unique tribal culture and wildlife pockets — ideal for offbeat travellers.",
};

const LOCATIONS = [
  "Agartala (Capital & Ujjayanta Palace)",
  "Udaipur (Historical town & Lake Rudrasagar)",
  "Neermahal (Water palace in Rudrasagar Lake)",
  "Unakoti (Rock-cut Shaivite reliefs & mystic hill shrine)",
  "Jampui Hills (Apple orchards, viewpoints & tribal villages)",
  "Sepahijala (Wildlife sanctuary & botanical gardens)",
  "Pilak (Archaeological ruins with Buddhist & Hindu relics)",
  "Kalyan Sagar (Scenic lakes & picnic spots)",
  "Dhanpur (Royal temples and terracotta art)",
  "Khowai (Gateway to scenic rural Tripura)",
  "Amarpur (Hilltop views & Tirthamukh)",
  "Kailashahar (Ancient ruins & local markets)",
  "Dharmanagar (Commercial hub & nearby picnic spots)",
  "Gomati River Ghats (Riverine life & local markets)",
  "Rajnagar (Local temples & craft bazaars)",
  "Boxanagar (Local cultural stops and village trails)",
  "Panisagar (Hilltop views & access to northern Tripura)",
  "Bishalgarh (Rural crafts and temples)",
  "Chabimura (Rock-cut sculptures along Gomati River)",
  "Jolaibari (Access to southern tribal areas)",
  "Teliamura (Eco trails & botanical spots)",
  "Ranganath (Local temples & craft villages)",
  "Pilak Archaeological Site (Pilak Park detailed visit)",
  "Satchand / Comilla border markets (nearby cross-border trading culture)",
];

const DOS = [
  "Carry valid ID and respect local tribal community norms in restricted / protected villages.",
  "Hire local guides where recommended (Unakoti, Pilak) to get context and preserve sites.",
  "Try local Tripuri cuisine and handicrafts — support local artisans and co-ops.",
  "Plan travel during Oct–Mar for pleasant weather and clear hilltop views.",
];

const DONT_S = [
  "Don't enter protected forest or wildlife areas without a guide or permit.",
  "Avoid loud behaviour at sacred sites such as Unakoti rock shrines and temple precincts.",
  "Don't litter at lakes or river ghats; bring reusable water bottles.",
  "Avoid unregulated border crossings — stay on official roads and checkpoints.",
];

export default function TripuraPage() {
  const openContact = () => window.dispatchEvent(new Event("open-contact-expert"));

  const openPlannerWith = (state: string, location?: string) => {
    try {
      window.dispatchEvent(new CustomEvent("open-planner-with", { detail: { state, location } }));
    } catch {
      // noop
    }
    const params = new URLSearchParams({ state });
    if (location) params.append("location", location);
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
          <h3 className="font-semibold mb-3">Top Destinations in Tripura</h3>
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
          <h4 className="font-semibold mb-2">Plan your Tripura trip</h4>
          <p className="text-gray-600 mb-4">
            From royal palaces and lake palaces to mysterious rock-carved shrines and hilltop vistas — tell us your travel preferences and we’ll design a Tripura itinerary for you.
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

/* Short descriptions for major destinations */
function getShortDescriptionFor(loc: string) {
  const map: Record<string, string> = {
    "Agartala (Capital & Ujjayanta Palace)": "Capital city with the historic Ujjayanta Palace, local bazaars and a calm riverside atmosphere.",
    "Udaipur (Historical town & Lake Rudrasagar)": "Historic town known for scenic Lake Rudrasagar and the nearby water palace Neermahal.",
    "Neermahal (Water palace in Rudrasagar Lake)": "A unique water palace set in Rudrasagar lake — best viewed at sunrise or during festivals.",
    "Unakoti (Rock-cut Shaivite reliefs & mystic hill shrine)": "Ancient rock-cut sculptures carved into cliffs — a mystical archaeological site.",
    "Jampui Hills (Apple orchards, viewpoints & tribal villages)": "Hill range with panoramic viewpoints, small orchards and tribal hospitality.",
    "Sepahijala (Wildlife sanctuary & botanical gardens)": "Sanctuary with primate enclosures, botanical gardens and walking trails.",
    "Pilak (Archaeological ruins with Buddhist & Hindu relics)": "Important archaeological park with relics from Buddhist and Hindu traditions.",
    "Kalyan Sagar (Scenic lakes & picnic spots)": "Peaceful lake area ideal for short visits and picnics.",
    "Dhanpur (Royal temples and terracotta art)": "Known for local temple architecture and terracotta craftsmanship.",
    "Khowai (Gateway to scenic rural Tripura)": "Regional town offering access to rural trails and markets.",
    "Amarpur (Hilltop views & Tirthamukh)": "Quiet hill town with sweeping views and nearby natural spots.",
    "Kailashahar (Ancient ruins & local markets)": "Historical town with archeological traces and vibrant local markets.",
    "Dharmanagar (Commercial hub & nearby picnic spots)": "Lively market town with nearby rural excursions.",
    "Gomati River Ghats (Riverine life & local markets)": "Riverside ghats where local trade and daily life are visible.",
    "Rajnagar (Local temples & craft bazaars)": "Small town with temples and local craft markets.",
    "Boxanagar (Local cultural stops and village trails)": "Village clusters with traditional crafts and community visits.",
    "Panisagar (Hilltop views & access to northern Tripura)": "Hill gateway to north Tripura with scenic drives.",
    "Bishalgarh (Rural crafts and temples)": "Town noted for temples and rural craft centres.",
    "Chabimura (Rock-cut sculptures along Gomati River)": "Impressive cliff carvings along the river — scenic boat approach available seasonally.",
    "Jolaibari (Access to southern tribal areas)": "Southern entry point for tribal region visits and cultural immersion.",
    "Teliamura (Eco trails & botanical spots)": "Small eco-tourism hub with gardens and walking trails.",
    "Ranganath (Local temples & craft villages)": "Village area with temples and craft activities.",
    "Pilak Archaeological Site (Pilak Park detailed visit)": "Designated park area with informative displays explaining the archaeological finds.",
    "Satchand / Comilla border markets (nearby cross-border trading culture)": "Nearby cross-border trading culture and market activity (observe official entry rules).",
  };
  return map[loc] || "Discover this Tripura destination's local culture, nature and heritage.";
}
