// app/india/south-india/tamil-nadu/page.tsx
"use client";

import slugify from "@/lib/slugify";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const DATA = {
  name: "Tamil Nadu",
  image: "/images/south-india/tamil-nadu.jpg",
  bestSeason: "Oct – Mar",
  highlights:
    "Temple architecture, hill stations, beaches, and vibrant Tamil culture — from Chennai to Kanyakumari.",
};

const LOCATIONS = [
  "Chennai (Marina Beach & Culture)",
  "Mahabalipuram (UNESCO Temples)",
  "Kanchipuram (Silk & Temples)",
  "Madurai (Meenakshi Amman Temple)",
  "Rameswaram (Pamban Bridge & Temples)",
  "Kanyakumari (Vivekananda Rock Memorial)",
  "Thanjavur (Brihadeeswarar Temple)",
  "Trichy (Rockfort Temple & Srirangam)",
  "Coimbatore (Isha Yoga & Textile City)",
  "Ooty (Nilgiris & Botanical Gardens)",
  "Kodaikanal (Lake & Hills)",
  "Yercaud (Eastern Ghats Hillstation)",
  "Chettinad (Heritage Mansions & Cuisine)",
  "Pondicherry (French Quarters & Beaches)",
  "Chidambaram (Nataraja Temple)",
  "Tiruvannamalai (Arunachaleswarar Temple)",
  "Nagapattinam (Beaches & Temples)",
  "Dhanushkodi (Ghost Town & Seashore)",
  "Coonoor (Tea Gardens & Toy Train)",
  "Valparai (Wildlife & Plantations)",
];

const DOS = [
  "Dress modestly when visiting temples — remove footwear before entering sanctums.",
  "Plan early morning visits for temples like Meenakshi or Brihadeeswarar to avoid crowds.",
  "Carry light woollens for hill stations like Ooty and Kodaikanal.",
  "Try authentic South Indian filter coffee and Chettinad cuisine.",
];

const DONT_S = [
  "Avoid photography inside temple sanctums where restricted.",
  "Do not litter beaches or heritage monuments — Tamil Nadu promotes eco-tourism.",
  "Avoid feeding or approaching monkeys near temples.",
];

export default function TamilNaduPage() {
  const openContact = () => window.dispatchEvent(new Event("open-contact-expert"));

  // Global planner trigger
  const openPlannerWith = (state: string, location?: string) => {
    try {
      window.dispatchEvent(new CustomEvent("open-planner-with", { detail: { state, location } }));
    } catch (e) {}
    const params = new URLSearchParams({ state });
    if (location) params.append("location", location);
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
          <h4 className="font-semibold mb-2">Plan your Tamil Nadu trip</h4>
          <p className="text-gray-600 mb-4">
            Explore ancient temples, hill stations and coastal towns — tell us your travel style and our experts will curate your itinerary.
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

/* Helper: short label */
function shortLabel(loc: string) {
  const match = loc.match(/^([^(,—]+)/);
  return match ? match[1].trim() : loc;
}

/* Short descriptions for Tamil Nadu locations */
function getShortDescriptionFor(loc: string) {
  const map: Record<string, string> = {
    "Chennai (Marina Beach & Culture)": "Capital city with beaches, temples, museums, and modern art scenes.",
    "Mahabalipuram (UNESCO Temples)": "Ancient rock-cut temples and coastal heritage on the Coromandel Coast.",
    "Kanchipuram (Silk & Temples)": "Temple town famous for handwoven silk sarees and Dravidian architecture.",
    "Madurai (Meenakshi Amman Temple)": "Historic city centered around its grand Meenakshi Temple complex.",
    "Rameswaram (Pamban Bridge & Temples)": "Island town and key pilgrimage site with ocean views and sacred ghats.",
    "Kanyakumari (Vivekananda Rock Memorial)": "Southern tip of India where three seas meet — iconic sunrise point.",
    "Thanjavur (Brihadeeswarar Temple)": "UNESCO-listed Chola temple with magnificent architecture.",
    "Trichy (Rockfort Temple & Srirangam)": "Historic temple city on the Cauvery River.",
    "Coimbatore (Isha Yoga & Textile City)": "Industrial hub with Isha Yoga Center and gateway to Western Ghats.",
    "Ooty (Nilgiris & Botanical Gardens)": "Cool hill station with lakes, tea estates, and colonial charm.",
    "Kodaikanal (Lake & Hills)": "Serene hill town with waterfalls, boating and scenic viewpoints.",
    "Yercaud (Eastern Ghats Hillstation)": "Quiet hill resort known for coffee plantations and lake views.",
    "Chettinad (Heritage Mansions & Cuisine)": "Traditional architecture and rich culinary heritage.",
    "Pondicherry (French Quarters & Beaches)": "Colonial-era town with French architecture and cafes by the sea.",
    "Chidambaram (Nataraja Temple)": "Historic temple dedicated to Lord Shiva as the cosmic dancer.",
    "Tiruvannamalai (Arunachaleswarar Temple)": "Spiritual hub and one of the Pancha Bhoota Sthalams.",
    "Nagapattinam (Beaches & Temples)": "Coastal district known for temples and heritage churches.",
    "Dhanushkodi (Ghost Town & Seashore)": "Ruined coastal town and scenic seashore drive from Rameswaram.",
    "Coonoor (Tea Gardens & Toy Train)": "Charming hill town with the Nilgiri Mountain Railway.",
    "Valparai (Wildlife & Plantations)": "Offbeat destination in Anamalai hills known for lush greenery.",
  };
  return map[loc] || "Discover ancient architecture, scenic drives and coastal beauty across Tamil Nadu.";
}
