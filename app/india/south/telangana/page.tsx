// app/india/south/telangana/page.tsx
"use client";

import slugify from "@/lib/slugify";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import React from "react";

const DATA = {
  name: "Telangana",
  image: "/images/south-india/telangana.jpg",
  bestSeason: "Oct – Feb",
  highlights:
    "Hyderabad's heritage, Pearl City bazaars, historic forts, lakes and the cinematic attractions of Ramoji Film City.",
};

const LOCATIONS = [
  "Hyderabad — Charminar & Old City",
  "Golconda Fort",
  "Ramoji Film City",
  "Hussain Sagar & Necklace Road",
  "Salar Jung Museum",
  "Ramoji Film City (studio tour & shows)",
  "Warangal — Thousand Pillar Temple & Warangal Fort",
  "Bhongir Fort",
  "Medak — Medak Cathedral & Fort",
  "Nagarjuna Sagar (dam & islands)",
  "Kothagudem & Bhadrachalam (temple town)",
  "Nizamabad & Pochampally (weaving village)",
  "Adilabad — waterfalls & forests",
  "Karimnagar — Elgandal Fort & archaeological sites",
  "Mahbubnagar & Koilkonda Fort",
];

const DOS = [
  "Carry sun protection for daytime sightseeing in Hyderabad and the plains.",
  "Book Ramoji Film City tickets in advance for weekend visits.",
  "Try local Hyderabadi biryani and haleem at recommended, well-reviewed restaurants.",
];

const DONT_S = [
  "Don’t wander into restricted filming areas inside studio zones without permission.",
  "Avoid leaving valuables visible in parked vehicles around busy tourist spots.",
];

export default function TelanganaPage() {
  const openContact = () => window.dispatchEvent(new Event("open-contact-expert"));

  // Open planner with state and optional location detail
  const openPlannerWith = (state: string, location?: string) => {
    try {
      window.dispatchEvent(new CustomEvent("open-planner-with", { detail: { state, location } }));
    } catch (e) {
      // ignore if event can't be dispatched
    }
    const params = new URLSearchParams({ state });
    if (location) params.append("location", location);
    // follow the app behaviour used elsewhere — navigate to the planner route with params
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
            <motion.h1 initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-extrabold">
              {DATA.name}
            </motion.h1>
            <p className="mt-3 text-lg text-emerald-100">{DATA.highlights}</p>

            <div className="mt-4 flex flex-wrap gap-3">
              <button onClick={createItineraryAuto} className="px-4 py-2 rounded-2xl bg-amber-400 text-black font-semibold">
                Create Itinerary (Auto)
              </button>

              <button onClick={openContact} className="px-4 py-2 rounded-2xl border border-white/30 text-white">
                Personalize Itinerary
              </button>
            </div>

            <div className="mt-3 text-sm text-emerald-100">
              Best season: <strong>{DATA.bestSeason}</strong>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-12 px-6 container mx-auto max-w-6xl">
        <h2 className="text-2xl font-bold text-emerald-800 mb-4">About {DATA.name}</h2>
        <p className="text-gray-700 mb-4">
          {DATA.highlights} Best season: <strong>{DATA.bestSeason}</strong>.
        </p>

        {/* LOCATIONS GRID */}
        <div className="mb-8">
          <h3 className="font-semibold mb-3">Top places & experiences</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {LOCATIONS.map((loc) => (
              <div key={loc} className="rounded-lg p-4 bg-white border border-gray-100 shadow-sm">
                <div className="font-medium text-emerald-800">{loc}</div>
                <div className="text-sm text-gray-600 mt-1">{getShortDescriptionFor(loc)}</div>

                <div className="mt-3">
                  {/* single planner button per location (no 'view details' button as requested) */}
                  <button
                    onClick={() => openPlannerWith(DATA.name, loc)}
                    className="text-sm px-3 py-1 rounded-full border border-emerald-200 text-emerald-800 hover:bg-emerald-50"
                  >
                    Plan {shortLabel(loc)}
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

        {/* CTA */}
        <div className="rounded-2xl bg-slate-50 p-6 border border-gray-100">
          <h4 className="font-semibold mb-2">Plan your Telangana trip</h4>
          <p className="text-gray-600 mb-4">Share your dates & preferences — our experts will craft an itinerary covering heritage, lakes and film-studio experiences.</p>

          <div className="flex flex-wrap gap-3">
            <button onClick={createItineraryAuto} className="inline-flex items-center px-6 py-3 rounded-2xl bg-amber-400 text-black font-semibold">
              Create Itinerary (Auto)
            </button>

            <button onClick={openContact} className="inline-flex items-center px-6 py-3 rounded-2xl border border-emerald-200 text-emerald-800">
              Personalize Itinerary
            </button>

            <Link href="/india/south" className="inline-flex items-center px-6 py-3 rounded-2xl border border-emerald-200 text-emerald-800">
              Back to South India
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

/* helpers */
function shortLabel(loc: string) {
  const match = loc.match(/^([^(,—]+)/);
  return match ? match[1].trim() : loc;
}

function getShortDescriptionFor(loc: string) {
  const map: Record<string, string> = {
    "Hyderabad — Charminar & Old City": "Historic Old City, bazaars, and iconic Charminar — great for food & shopping trails.",
    "Golconda Fort": "Famous hilltop fort with sound-and-light shows and sweeping city views.",
    "Ramoji Film City": "Massive film studio complex with guided tours, live shows and themed attractions.",
    "Hussain Sagar & Necklace Road": "Central lake with Buddha statue, promenades and boating options.",
    "Salar Jung Museum": "One of India's largest museums with diverse collections across eras.",
    "Warangal — Thousand Pillar Temple & Warangal Fort": "Historic Kakatiya-era monuments and forts — rich in architecture.",
    "Bhongir Fort": "Granite monolith fort with short hikes and panoramic views.",
    "Medak — Medak Cathedral & Fort": "Noted cathedral and nearby historic fort; scenic rural drives.",
    "Nagarjuna Sagar (dam & islands)": "Large reservoir with island views and historical sites nearby.",
    "Kothagudem & Bhadrachalam (temple town)": "Bhadrachalam is a famous Rama temple-town on the Godavari.",
    "Nizamabad & Pochampally (weaving village)": "Handloom clusters and textile traditions — Pochampally ikat is notable.",
    "Adilabad — waterfalls & forests": "Forested district with seasonal waterfalls and tribal culture.",
    "Karimnagar — Elgandal Fort & archaeological sites": "Historic forts and regional archaeological interest.",
    "Mahbubnagar & Koilkonda Fort": "Rustic forts and rural experiences on the Deccan plateau.",
  };
  return map[loc] || "Explore local markets, cuisine and cultural experiences at this destination.";
}
