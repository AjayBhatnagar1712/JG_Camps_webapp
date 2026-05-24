// app/india/west/daman-and-diu/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

/**
 * Daman & Diu index page — follows the same pattern as Bihar/Maharashtra pages.
 * - Lists major destinations and quick itinerary options
 * - Auto itinerary opens the global itinerary builder
 * - "Personalize Itinerary" dispatches global event "open-contact-expert"
 */

const DATA = {
  name: "Daman & Diu",
  image: "/images/west-india/daman-diu.jpg",
  bestSeason: "Oct – Mar",
  highlights:
    "Two coastal enclaves with Portuguese heritage, forts, calm beaches and seafood — ideal for short coastal getaways and heritage walks.",
};

const LOCATIONS = [
  // Daman
  "Moti Daman Fort (St. Jerome Fort)",
  "St. Jerome Church (Moti Daman)",
  "Devka Beach (Daman)",
  "Jampore Beach (Daman)",
  "Nani Daman (Old Quarter & promenades)",
  "Citadel of Daman (Fort area & lighthouse)",
  "Daman Ganga Tourist Complex",

  // Diu
  "Diu Fort (Portuguese Fort)",
  "Nagoa Beach (Diu)",
  "Naida Caves & Lighthouse (Diu)",
  "St. Paul's Church (Diu)",
  "Gangeshwar Temple (Diu, sea-shore Shiva temples)",
  "Diu Museum & Old Harbour",
  "Ghoghla Beach (Diu)",
  "Jallandhar/ETY Beach (Diu)",
  "Simbor (historic Portuguese outpost area)",
];

const DOS = [
  "Respect timings at religious sites like Gangeshwar Temple and local shrines.",
  "Carry sun protection for beach days and light rainwear during shoulder seasons.",
  "Try fresh seafood at local seaside shacks and small restaurants.",
  "Hire a local boat or guide for short island/harbour excursions where available.",
];

const DONT_S = [
  "Don't leave plastic or litter on beaches — the authorities are strict about cleanliness.",
  "Avoid swimming alone at unmarked stretches during rough seas.",
  "Do not trespass inside active protected fort sections or restricted military areas.",
  "Be mindful of local customs in small hamlets and fishing villages.",
];

export default function DamanAndDiuPage() {
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
          <h3 className="font-semibold mb-3">Top Destinations in Daman &amp; Diu</h3>
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
          <h4 className="font-semibold mb-2">Plan your Daman &amp; Diu trip</h4>
          <p className="text-gray-600 mb-4">
            Relax on quiet beaches, explore Portuguese forts and savour coastal cuisine. Tell us your travel dates
            and preferences and we’ll craft a short coastal itinerary for Daman &amp; Diu.
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
    "Moti Daman Fort (St. Jerome Fort)": "Large Portuguese-era fort with ramparts, lighthouse and historic churches nearby.",
    "St. Jerome Church (Moti Daman)": "Historic church near the fort with colonial architecture and quiet courtyards.",
    "Devka Beach (Daman)": "Popular beach with promenades, small food stalls and sunset views.",
    "Jampore Beach (Daman)": "Cleaner, quieter beach known for picnics and short boat rides.",
    "Nani Daman (Old Quarter & promenades)": "Heritage lanes, market streets and Portuguese-style buildings.",
    "Citadel of Daman (Fort area & lighthouse)": "Scenic fort area with views across the river and sea.",
    "Daman Ganga Tourist Complex": "Leisure complex with boating, gardens and family-friendly facilities.",
    "Diu Fort (Portuguese Fort)": "Massive coastal fort with commanding sea views and well-preserved ramparts.",
    "Nagoa Beach (Diu)": "Curved sandy beach ideal for swimming, water sports and family days out.",
    "Naida Caves & Lighthouse (Diu)": "Limestone caves and rocky promontories with a small lighthouse viewpoint.",
    "St. Paul's Church (Diu)": "One of the island’s notable churches demonstrating colonial-era ecclesiastical style.",
    "Gangeshwar Temple (Diu, sea-shore Shiva temples)": "Unique set of Shiva lingas located along the seashore — scenic and spiritual.",
    "Diu Museum & Old Harbour": "Small museum with artefacts and displays about Diu’s maritime and colonial past.",
    "Ghoghla Beach (Diu)": "Long sandy stretch, quieter than Nagoa and suitable for long walks.",
    "Jallandhar/ETY Beach (Diu)": "Smaller beaches and local fishing village ambience.",
    "Simbor (historic Portuguese outpost area)": "Remote coastal headland with old fort ruins and storied maritime past.",
  };
  return map[loc] || "Explore the beaches, forts and historic Portuguese heritage of Daman & Diu.";
}
