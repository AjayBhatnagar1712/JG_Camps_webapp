// app/india/east/bihar/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

/**
 * Bihar index page — lists major destinations, quick actions to:
 * - auto-create an itinerary (opens the global itinerary builder.
 * - open contact modal for a personalised itinerary (dispatches global event "open-contact-expert")
 *
 * Pattern matches the Odisha page you already have.
 */

const DATA = {
  name: "Bihar",
  image: "/images/east-india/bihar.jpg",
  bestSeason: "Oct – Mar",
  highlights:
    "Bihar is the cradle of ancient Indian history and learning — from Nalanda & Vikramshila to Bodh Gaya, with rich pilgrimage, archaeological sites and riverine culture along the Ganges.",
};

const LOCATIONS = [
  "Patna (Capital & Golghar)",
  "Bodh Gaya (Mahabodhi Temple & Buddhist Sites)",
  "Gaya (Pilgrimage Hub)",
  "Nalanda (Nalanda University Ruins)",
  "Rajgir (Hot springs, Vishwa Shanti Stupa)",
  "Vaishali (Ancient Republic & Ashokan Pillar)",
  "Bhagalpur (Sunderbans of North? — Silk & Kuppa Falls nearby)",
  "Munger (Fort & Bihar’s Patna’s twin across the Ganges)",
  "Buxar (Historical Battle Site & Ghats)",
  "Sasaram (Sher Shah Suri Tomb & waterfalls)",
  "Darbhanga (Mithila Culture & Palaces)",
  "Muzaffarpur (Lychee orchards)",
  "Purnia (Riverine towns & markets)",
  "Katihar (Rail junction & gateway to north Bihar)",
  "Begusarai (Industrial & cultural town)",
  "Arrah (Bhojpur, Veer Kunwar Singh memorial)",
  "Champaran (Gandhi Satyagraha sites)",
  "Valmiki Tiger Reserve (Biodiversity & safaris)",
  "Vikramshila (Ancient Buddhist University ruins)",
  "Jamui (Natural springs & nearby hills)",
];

const DOS = [
  "Respect local temple / shrine customs and timings, especially at Bodh Gaya.",
  "Plan travel during Oct–Mar for comfortable weather across Bihar.",
  "Hire local guides for Nalanda, Rajgir and Valmiki Reserve to get historical context and safe routes.",
  "Try local Mithila cuisine, litti-chokha and seasonal fruits (lychee in Muzaffarpur).",
];

const DONT_S = [
  "Don't assume long-distance buses run frequently at night on rural routes — plan daytime travel where possible.",
  "Avoid littering at river ghats and protected areas; carry reusable bottles.",
  "Don't attempt wildlife spotting in Valmiki without an authorised guide.",
  "Avoid sensitive or restricted areas without local permissions (some forested / reserve pockets).",
];

export default function BiharPage() {
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
          <h3 className="font-semibold mb-3">Top Destinations in Bihar</h3>
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
          <h4 className="font-semibold mb-2">Plan your Bihar trip</h4>
          <p className="text-gray-600 mb-4">
            From the Mahabodhi Temple in Bodh Gaya to the ruins of Nalanda and the biodiversity of Valmiki Reserve —
            tell us your travel style and dates, and we’ll craft a culturally rich itinerary.
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
    "Patna (Capital & Golghar)": "Administrative and cultural capital on the Ganges — Golghar, Patna Museum and Gandhi Maidan.",
    "Bodh Gaya (Mahabodhi Temple & Buddhist Sites)": "World heritage Mahabodhi Temple — the place of Buddha's enlightenment and major Buddhist pilgrimage site.",
    "Gaya (Pilgrimage Hub)": "Pilgrimage town with many Hindu rituals; close to Bodh Gaya.",
    "Nalanda (Nalanda University Ruins)": "Ancient seat of learning — evocative archaeological ruins and museum.",
    "Rajgir (Hot springs, Vishwa Shanti Stupa)": "Sacred hills, ropeway, hot springs and Buddhist/Jain heritage sites.",
    "Vaishali (Ancient Republic & Ashokan Pillar)": "One of the earliest republics in the subcontinent — Buddhist & archaeological significance.",
    "Bhagalpur (Sunderbans of North? — Silk & Kuppa Falls nearby)": "Known for raw silk (Tussar/Pat) and access to nearby natural sites.",
    "Munger (Fort & Bihar’s Patna’s twin across the Ganges)": "Historic fort, riverside ghats and an old art/metalwork tradition.",
    "Buxar (Historical Battle Site & Ghats)": "Historic battlefield and important river ghats along the Ganges.",
    "Sasaram (Sher Shah Suri Tomb & waterfalls)": "Tomb of Sher Shah Suri and scenic natural spots nearby.",
    "Darbhanga (Mithila palaces & culture)": "Cultural heart of Mithila — palaces, music and classical arts.",
    "Muzaffarpur (Lychee orchards)": "Famous for seasonal lychee orchards and agrarian markets.",
    "Purnia (Riverine towns & markets)": "Eastern Bihar town with riverine trade and local markets.",
    "Katihar (Rail junction & gateway to north Bihar)": "Important rail and transit hub with nearby rural attractions.",
    "Begusarai (Industrial & cultural town)": "Industrial town with cultural festivals and river access.",
    "Arrah (Bhojpur, Veer Kunwar Singh memorial)": "Historic Bhojpur region with independence-era memorials.",
    "Champaran (Gandhi Satyagraha sites)": "Place of Gandhi’s early Satyagraha — we recommend visiting historic sites and museums.",
    "Valmiki Tiger Reserve (Biodiversity & safaris)": "Protected area with tigers, elephants and rich riparian habitat — book guided safaris.",
    "Vikramshila (Ancient Buddhist University ruins)": "Archaeological remains of another major Buddhist learning centre.",
    "Jamui (Natural springs & nearby hills)": "Hilly pockets, natural springs and quiet rural landscapes.",
  };
  return map[loc] || "Explore the history, pilgrimage and natural heritage of this destination.";
}
