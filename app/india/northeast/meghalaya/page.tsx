// app/india/northeast/meghalaya/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

/**
 * Meghalaya index page — lists major destinations, quick actions to:
 * - auto-create an itinerary (navigates to /india/northeast/plan with params)
 * - open contact modal for a personalised itinerary (dispatches global event "open-contact-expert")
 *
 * Follows the Bihar/Arunachal structure for visual & functional consistency.
 */

const DATA = {
  name: "Meghalaya",
  image: "/images/northeast-india/meghalaya.jpg",
  bestSeason: "Oct – Apr (dry season)",
  highlights:
    "Known as the 'Abode of Clouds', Meghalaya offers living root bridges, misty waterfalls, caves, clean villages, and vibrant Khasi, Garo, and Jaintia cultures — perfect for nature, adventure, and monsoon lovers.",
};

const LOCATIONS = [
  "Shillong (Capital & Umiam Lake)",
  "Cherrapunji / Sohra (Living Root Bridges, Waterfalls)",
  "Mawsynram (Wettest place on Earth)",
  "Mawlynnong (Asia’s Cleanest Village)",
  "Dawki (Umngot River & boating)",
  "Jowai (Krang Suri Falls & lakes)",
  "Nongriat (Double Decker Root Bridge trek)",
  "Laitlum Canyon (Scenic viewpoint & treks)",
  "Nongkhnum Island (2nd largest river island in Asia)",
  "Balpakram National Park (Garo Hills)",
  "Tura (Capital of Garo Hills & caves)",
  "Baghmara (Siju Caves & wildlife)",
  "Nongstoin (Waterfalls & serene landscapes)",
  "Mawphlang (Sacred Grove & Khasi heritage village)",
  "Mawlyngbna (Adventure & village tourism)",
  "Sohpetbneng Peak (Spiritual site near Shillong)",
  "Ranikor (Fishing & river camp destination)",
  "Weinia Falls (near Nongstoin)",
  "Lum Kyllang (Monolith & viewpoint)",
  "Umden (Eri silk & rural experiences)",
];

const DOS = [
  "Respect local tribal customs — especially when visiting sacred groves or villages.",
  "Use local guides for treks (Nongriat, Laitlum, Mawlynnong) to ensure safety and respect traditions.",
  "Travel light but pack rain gear — even in dry months, light showers are possible.",
  "Support local homestays and eco-tourism to preserve the region’s culture and ecology.",
];

const DONT_S = [
  "Don’t litter or play loud music near waterfalls or villages — maintain the area's serenity.",
  "Avoid trespassing into sacred groves or private farmland without permission.",
  "Don’t pluck plants or disturb root bridges; they are living heritage structures.",
  "Avoid driving after dark in hilly or foggy areas; visibility can be very low.",
];

export default function MeghalayaPage() {
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
          <h3 className="font-semibold mb-3">Top Destinations in Meghalaya</h3>
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
          <h4 className="font-semibold mb-2">Plan your Meghalaya trip</h4>
          <p className="text-gray-600 mb-4">
            From the living root bridges of Sohra to Dawki’s crystal river and the misty hills of Shillong —
            tell us your travel preferences, and we’ll create a refreshing Meghalaya itinerary for you.
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

/* Helper: location short descriptions */
function getShortDescriptionFor(loc: string) {
  const map: Record<string, string> = {
    "Shillong (Capital & Umiam Lake)": "Cosmopolitan hill capital with markets, cafés, Ward’s Lake and scenic Umiam Lake.",
    "Cherrapunji / Sohra (Living Root Bridges, Waterfalls)": "Home to Nohkalikai Falls, Mawsmai Caves and natural root bridges.",
    "Mawsynram (Wettest place on Earth)": "Verdant landscapes, caves, and monsoon scenery — nature at its lushest.",
    "Mawlynnong (Asia’s Cleanest Village)": "Known for spotless lanes, bamboo walkways, and eco-friendly homestays.",
    "Dawki (Umngot River & boating)": "Famous for crystal-clear river boating and Bangladesh border views.",
    "Jowai (Krang Suri Falls & lakes)": "Home to Krang Suri Falls and tranquil Phe Phe Falls — great for photography.",
    "Nongriat (Double Decker Root Bridge trek)": "Trek through rainforests to see the iconic living double root bridge.",
    "Laitlum Canyon (Scenic viewpoint & treks)": "Spectacular canyon viewpoints, popular among trekkers and photographers.",
    "Nongkhnum Island (2nd largest river island in Asia)": "A serene getaway with beaches, streams, and camping spots.",
    "Balpakram National Park (Garo Hills)": "Biodiversity hotspot with cliffs, caves, and wildlife in Garo Hills.",
    "Tura (Capital of Garo Hills & caves)": "Cultural heart of the Garo region with scenic hills and caves.",
    "Baghmara (Siju Caves & wildlife)": "Adventure hub near Siju Caves and Nokrek Biosphere Reserve.",
    "Nongstoin (Waterfalls & serene landscapes)": "Quiet region with Weina and Langshiang Falls — ideal for offbeat travel.",
    "Mawphlang (Sacred Grove & Khasi heritage village)": "Ancient forest revered by locals, offering insight into Khasi traditions.",
    "Mawlyngbna (Adventure & village tourism)": "Offbeat eco-tourism spot with rock formations, water activities and camping.",
    "Sohpetbneng Peak (Spiritual site near Shillong)": "Sacred site for Khasi people with panoramic views of Shillong plains.",
    "Ranikor (Fishing & river camp destination)": "Known for angling, riverside camping and tranquil river scenes.",
    "Weinia Falls (near Nongstoin)": "Spectacular multi-tiered waterfall hidden in Meghalaya’s west.",
    "Lum Kyllang (Monolith & viewpoint)": "Giant granite dome near Mairang with panoramic views.",
    "Umden (Eri silk & rural experiences)": "Rural tourism destination promoting Eri silk weaving and village culture.",
  };
  return map[loc] || "Explore the lush hills, waterfalls, and rich cultures of this Meghalaya destination.";
}
