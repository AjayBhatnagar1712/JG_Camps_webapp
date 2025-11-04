// app/india/northeast/assam/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

/**
 * Assam index page — lists all major destinations.
 * - Auto-create itinerary button → navigates to /india/northeast/plan with state & location params
 * - Personalize itinerary button → triggers global “open-contact-expert” event
 */

const DATA = {
  name: "Assam",
  image: "/images/northeast-india/assam.jpg",
  bestSeason: "Oct – Apr",
  highlights:
    "Assam is the heart of North-East India — known for the mighty Brahmaputra River, tea gardens, Kaziranga’s one-horned rhinos, Majuli island culture, and its warm hospitality.",
};

const LOCATIONS = [
  "Guwahati (Kamakhya Temple & Brahmaputra Riverfront)",
  "Kaziranga National Park (One-horned Rhino Safaris)",
  "Majuli Island (Satras & cultural hub)",
  "Sivasagar (Ahom monuments & heritage sites)",
  "Jorhat (Tea gardens & heritage bungalows)",
  "Tezpur (Historic ruins & gateway to Arunachal)",
  "Dibrugarh (Tea city of India)",
  "Haflong (Only hill station in Assam)",
  "Manas National Park (UNESCO wildlife sanctuary)",
  "Barpeta (Sattriya culture & temples)",
  "Nameri National Park (Eco-adventure & rafting)",
  "Silchar (Cachar valley & riverine charm)",
  "Hajo (Multi-faith pilgrimage center)",
  "Dhemaji (Scenic Brahmaputra-side villages)",
  "Tinsukia (Wildlife & eco-lodges near Dibru-Saikhowa)",
  "Digboi (Asia’s oldest oil refinery & museum)",
  "Goalpara (Natural wetlands & hill views)",
  "Bongaigaon (Gateway to Manas & nature circuits)",
  "North Lakhimpur (Gateway to Arunachal via Subansiri River)",
];

const DOS = [
  "Visit Kaziranga during open season (Nov–Apr) for the best wildlife experience.",
  "Respect local customs and Satras (monastic institutions) at Majuli.",
  "Try local Assamese cuisine — pitha, tenga, fish curries, and fresh tea.",
  "Book safaris and tea estate stays through licensed operators.",
];

const DONT_S = [
  "Avoid visiting wildlife parks during monsoon closures (May–Sep).",
  "Do not disturb wildlife or step out of jeeps during safaris.",
  "Avoid littering near rivers and forest reserves.",
  "Don’t enter restricted border areas without valid permits.",
];

export default function AssamPage() {
  const openContact = () => window.dispatchEvent(new Event("open-contact-expert"));

  const openPlannerWith = (state: string, location?: string) => {
    try {
      window.dispatchEvent(new CustomEvent("open-planner-with", { detail: { state, location } }));
    } catch {
      // noop
    }
    const params = new URLSearchParams({ state });
    if (location) params.append("location", location);
    // Navigate to plan page with params
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
          <h3 className="font-semibold mb-3">Top Destinations in Assam</h3>
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
          <h4 className="font-semibold mb-2">Plan your Assam trip</h4>
          <p className="text-gray-600 mb-4">
            From Kaziranga’s rhinos to Majuli’s monasteries and tea gardens of Jorhat — tell us your travel dates & preferences and we’ll design a scenic Assam itinerary for you.
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
    "Guwahati (Kamakhya Temple & Brahmaputra Riverfront)": "Capital city on the Brahmaputra — Kamakhya Temple, river cruises, and local markets.",
    "Kaziranga National Park (One-horned Rhino Safaris)": "World-famous UNESCO park for rhino safaris and migratory birds.",
    "Majuli Island (Satras & cultural hub)": "World’s largest river island — monastic Satras, crafts, and music traditions.",
    "Sivasagar (Ahom monuments & heritage sites)": "Historic Ahom kingdom ruins and monuments from the medieval era.",
    "Jorhat (Tea gardens & heritage bungalows)": "The tea capital of Assam — bungalows, plantations, and golf courses.",
    "Tezpur (Historic ruins & gateway to Arunachal)": "Ancient town of myth and temples, gateway to Tawang and Arunachal.",
    "Dibrugarh (Tea city of India)": "Commercial hub and launch point for river and tea tourism.",
    "Haflong (Only hill station in Assam)": "Beautiful hill station with serene lakes and viewpoints.",
    "Manas National Park (UNESCO wildlife sanctuary)": "Lush wildlife sanctuary with tigers, elephants, and riverine forests.",
    "Barpeta (Sattriya culture & temples)": "Known for Satras, Assamese Vaishnavite temples and music traditions.",
    "Nameri National Park (Eco-adventure & rafting)": "Great for river rafting, birdwatching, and forest lodges.",
    "Silchar (Cachar valley & riverine charm)": "Southern Assam town with river views, markets, and hills.",
    "Hajo (Multi-faith pilgrimage center)": "Ancient town with Hindu, Buddhist, and Islamic shrines.",
    "Dhemaji (Scenic Brahmaputra-side villages)": "Picturesque villages and wetlands along the Brahmaputra basin.",
    "Tinsukia (Wildlife & eco-lodges near Dibru-Saikhowa)": "Gateway to Dibru-Saikhowa and eco-tourism trails.",
    "Digboi (Asia’s oldest oil refinery & museum)": "Historic oil town with refinery museum and colonial heritage.",
    "Goalpara (Natural wetlands & hill views)": "Wetlands and gentle hills perfect for nature photography.",
    "Bongaigaon (Gateway to Manas & nature circuits)": "Commercial town with access to forested reserves and cultural sites.",
    "North Lakhimpur (Gateway to Arunachal via Subansiri River)": "Entry point for Ziro and Subansiri valley tours.",
  };
  return map[loc] || "Explore Assam’s cultural richness, tea estates, wildlife and river life.";
}
