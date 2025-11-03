// app/india/south-india/kerala/page.tsx
"use client";

import slugify from "@/lib/slugify";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const DATA = {
  name: "Kerala",
  image: "/images/south-india/kerala.jpg",
  bestSeason: "Oct – Feb",
  highlights:
    "Backwaters, tea & spice gardens, tranquil beaches, wildlife sanctuaries and rich temple culture.",
};

const LOCATIONS = [
  "Kochi (Fort Kochi & Mattancherry)",
  "Thiruvananthapuram (Capital & Kovalam)",
  "Munnar (Tea Gardens & Eravikulam)",
  "Alleppey / Alappuzha (Backwaters & Houseboats)",
  "Kumarakom (Backwater Bird Sanctuary)",
  "Wayanad (Hillstation, Wildlife & Trekking)",
  "Thekkady (Periyar Wildlife Sanctuary)",
  "Kovalam (Beaches & Lighthouse)",
  "Varkala (Clifftop Beach & Ayurveda)",
  "Bekal (Bekal Fort & Beaches)",
  "Athirappilly (Waterfalls)",
  "Idukki (Dams & Hills)",
  "Kozhikode / Calicut (Beaches & Food Trails)",
  "Kannur (Beaches & Theyyam)",
  "Kottayam (Gateway to backwaters & rubber country)",
  "Thrissur (Temple festivals & Culture)",
  "Palakkad (Fort, Ghat Pass & Villages)",
  "Malappuram (Heritage & Hills)",
  "Pathanamthitta (Sabarimala access & Riverine villages)",
];

const DOS = [
  "Book houseboats in Alleppey/Kumarakom in advance during peak season.",
  "Respect local customs at temples and during festivals.",
  "Carry light rain protection if travelling shoulder season (Sep–Oct).",
  "Use licensed guides for wildlife safaris in Thekkady and Wayanad.",
];

const DONT_S = [
  "Don’t swim in unguarded areas at beaches; follow local flags and guidance.",
  "Avoid littering in backwaters — maintain eco-friendly practices on houseboats.",
  "Don’t disturb wildlife or attempt to feed animals during safaris.",
];

export default function KeralaPage() {
  const openContact = () => window.dispatchEvent(new Event("open-contact-expert"));

  // Open planner with state & optional location; keeps behaviour consistent with other pages.
  const openPlannerWith = (state: string, location?: string) => {
    try {
      window.dispatchEvent(new CustomEvent("open-planner-with", { detail: { state, location } }));
    } catch (e) {
      // ignore
    }
    const params = new URLSearchParams({ state });
    if (location) params.append("location", location);
    // navigate to planner route (keeps same pattern used elsewhere)
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
          <h3 className="font-semibold mb-3">Top Destinations & Experiences</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {LOCATIONS.map((loc) => (
              <div key={loc} className="rounded-lg p-4 bg-white border border-gray-100 shadow-sm">
                <div className="font-medium text-emerald-800">{loc}</div>
                <div className="text-sm text-gray-600 mt-1">{getShortDescriptionFor(loc)}</div>
                <div className="mt-3">
                  <button
                    onClick={() => openPlannerWith(DATA.name, loc)}
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
          <h4 className="font-semibold mb-2">Plan your Kerala trip</h4>
          <p className="text-gray-600 mb-4">
            From backwaters to hill stations and spice trails — tell us your preferences and our experts will craft your perfect itinerary.
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

/* Helper: short display label */
function shortLabel(loc: string) {
  const match = loc.match(/^([^(,—]+)/);
  return match ? match[1].trim() : loc;
}

/* Short descriptions for Kerala destinations */
function getShortDescriptionFor(loc: string) {
  const map: Record<string, string> = {
    "Kochi (Fort Kochi & Mattancherry)": "Historic port city with colonial architecture, spice markets and art cafés.",
    "Thiruvananthapuram (Capital & Kovalam)": "Capital city gateway; Kovalam offers crescent beaches and lighthouses.",
    "Munnar (Tea Gardens & Eravikulam)": "High-altitude tea estates, rolling hills and cool weather.",
    "Alleppey / Alappuzha (Backwaters & Houseboats)": "Iconic backwaters, houseboats and canal-side villages.",
    "Kumarakom (Backwater Bird Sanctuary)": "Birdwatching hotspot and calm backwater stays.",
    "Wayanad (Hillstation, Wildlife & Trekking)": "Forested hills, wildlife and tribal culture with trekking routes.",
    "Thekkady (Periyar Wildlife Sanctuary)": "Wildlife reserve known for boat safaris, elephants and spice tours.",
    "Kovalam (Beaches & Lighthouse)": "Popular beach town with surf, sunsets and Ayurvedic centres.",
    "Varkala (Clifftop Beach & Ayurveda)": "Cliffside beaches, yoga retreats and natural springs.",
    "Bekal (Bekal Fort & Beaches)": "Historic fort set against pristine beaches in north Kerala.",
    "Athirappilly (Waterfalls)": "Spectacular waterfall set in dense forest — called the 'Niagara of India'.",
    "Idukki (Dams & Hills)": "Hilly terrain, dams, spice plantations and viewpoints.",
    "Kozhikode / Calicut (Beaches & Food Trails)": "Cultural city known for Malabar cuisine and beach promenades.",
    "Kannur (Beaches & Theyyam)": "Beaches, handloom weaving and traditional Theyyam performances.",
    "Kottayam (Gateway to backwaters & rubber country)": "Lakeside town and entry point to Kumarakom backwaters.",
    "Thrissur (Temple festivals & Culture)": "Cultural capital known for Pooram festival and temples.",
    "Palakkad (Fort, Ghat Pass & Villages)": "Gateway to the Palakkad Gap with forts and agrarian landscapes.",
    "Malappuram (Heritage & Hills)": "Blend of heritage sites, greenery and cultural experiences.",
    "Pathanamthitta (Sabarimala access & Riverine villages)": "Pilgrimage district and tranquil river villages.",
  };
  return map[loc] || "Discover local culture, nature and cuisine unique to this destination.";
}
