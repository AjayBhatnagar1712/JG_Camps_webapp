// app/india/south-india/puducherry/page.tsx
"use client";

import slugify from "@/lib/slugify";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const DATA = {
  name: "Puducherry",
  image: "/images/south-india/puducherry.jpg",
  bestSeason: "Oct – Feb",
  highlights:
    "Coastal French-colonial charm, Auroville's spiritual experiment, quiet beaches and cyan promenades — perfect for short, restorative getaways.",
};

const LOCATIONS = [
  "Pondicherry / White Town (Promenade & French Quarters)",
  "Auroville (Matrimandir & Community)",
  "Paradise Beach (accessible by boat)",
  "Serenity / Rock Beach (Promenade & Sunrise)",
  "Auro Beach (surfing & beach cafes)",
  "Chunnambar Boat House (backwater boating)",
  "Basilica of the Sacred Heart of Jesus (heritage church)",
  "Arikamedu (Archaeological site & Roman trade ruins)",
  "Ousteri Lake (birdwatching & wetlands)",
  "Karaikal (temples & coastal culture)",
  "Mahe (Kerala enclave nearby) ",
  "Yanam (Telugu-influenced enclave)",
  "Sri Aurobindo Ashram (spiritual centre in Pondy)",
  "Old Lighthouse & Botanical Garden",
  "Rockefeller House / colonial mansions (heritage walks)",
];

const DOS = [
  "Stroll the Promenade in the early morning for sunrise and calm.",
  "Respect Auroville's quiet hours and photography rules around Matrimandir.",
  "Try local French-influenced bakeries and seafood shacks in White Town.",
];

const DONT_S = [
  "Do not wear beach swimwear inside temples or places of worship.",
  "Avoid loud music or parties near residential/ashram areas at night.",
  "Don't litter beaches or boat launches — keep the coast clean.",
];

export default function PuducherryPage() {
  const openContact = () => window.dispatchEvent(new Event("open-contact-expert"));

  // Global planner trigger: dispatch event + navigate to plan page with params
  const openPlannerWith = (state: string, location?: string) => {
    try {
      window.dispatchEvent(new CustomEvent("open-planner-with", { detail: { state, location } }));
    } catch (e) {
      /* noop */
    }
    const params = new URLSearchParams({ state });
    if (location) params.append("location", location);
    // navigate to shared planner route (keeps behavior consistent across pages)
    window.location.href = `/india/south/plan?${params.toString()}`;
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
          <h3 className="font-semibold mb-3">Top Places & Experiences in Puducherry</h3>
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
          <h4 className="font-semibold mb-2">Plan your Puducherry trip</h4>
          <p className="text-gray-600 mb-4">
            Quiet promenades, colonial charm and Auroville's calm — tell us your dates and preferences and we'll craft a tailored plan.
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

/* Helper: short label (clean up long labels) */
function shortLabel(loc: string) {
  const match = loc.match(/^([^(,—]+)/);
  return match ? match[1].trim() : loc;
}

/* Short descriptions for Puducherry locations */
function getShortDescriptionFor(loc: string) {
  const map: Record<string, string> = {
    "Pondicherry / White Town (Promenade & French Quarters)": "Painted colonial villas, cafes, seaside promenade and gentle evening strolls.",
    "Auroville (Matrimandir & Community)": "International intentional community centred on the Matrimandir meditation dome — visit respectfully.",
    "Paradise Beach (accessible by boat)": "Sandy crescent reached by ferry/boat — good for a quiet beach day.",
    "Serenity / Rock Beach (Promenade & Sunrise)": "Long seaside promenade popular for walks and sunrise views.",
    "Auro Beach (surfing & beach cafes)": "Laid-back beach with surf schools and seaside cafes.",
    "Chunnambar Boat House (backwater boating)": "Boating and backwater trips along the estuary — family-friendly.",
    "Basilica of the Sacred Heart of Jesus (heritage church)": "Gothic-style basilica with stained glass and active services.",
    "Arikamedu (Archaeological site & Roman trade ruins)": "Ancient port ruins with archaeological remains dating to Roman trade routes.",
    "Ousteri Lake (birdwatching & wetlands)": "Important wetland and birdwatching site — great morning visits.",
    "Karaikal (temples & coastal culture)": "Part of the UT with its own temple circuit and local culture.",
    "Mahe (Kerala enclave nearby) ": "Small coastal enclave with Kerala culture and quiet beaches.",
    "Yanam (Telugu-influenced enclave)": "Another distant enclave with its own traditions and festivals.",
    "Sri Aurobindo Ashram (spiritual centre in Pondy)": "Historic ashram with quiet spaces for meditation and study.",
    "Old Lighthouse & Botanical Garden": "Heritage lighthouse and adjacent green spaces for relaxed visits.",
    "Rockefeller House / colonial mansions (heritage walks)": "Heritage architecture scattered through White Town — ideal for walking tours.",
  };
  return map[loc] || "Beautiful coastal town with colonial charm, beaches and a unique spiritual community.";
}
