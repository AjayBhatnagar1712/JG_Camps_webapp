// app/india/south/lakshadweep/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

/**
 * Lakshadweep index page
 * - Place hero image at: public/images/south-india/lakshadweep/lakshadweep-hero.jpg
 * - Place per-island images at: public/images/south-india/lakshadweep/<island>.jpg (optional)
 *
 * Behavior:
 * - "Create Itinerary (Auto)" opens a planner route with state=Lakshadweep
 * - "Personalize Itinerary" triggers global contact modal via event "open-contact-expert"
 * - Per-location "Plan" buttons open planner route with state=Lakshadweep & location=<island>
 */

const DATA = {
  name: "Lakshadweep",
  image: "/images/south-india/lakshadweep.jpg",
  bestSeason: "Oct – Feb",
  highlights:
    "India's pristine coral atolls — crystal-clear lagoons, world-class snorkeling & diving, and secluded island life.",
};

const ISLANDS = [
  "Agatti",
  "Bangaram",
  "Kavaratti",
  "Minicoy",
  "Kadmat",
  "Kalpeni",
  "Andrott",
  "Amini",
  "Bitra",
  "Chetlat",
  "Kiltan",
];

const DOS = [
  "Book permits & boat/flight transfers in advance — some islands have limited seats per day.",
  "Carry reef-safe sunscreen and avoid touching corals while snorkeling/diving.",
  "Respect local island rules — many islands are conservative; dress modestly in villages.",
];

const DONT_S = [
  "Do not litter or leave plastic on beaches — Lakshadweep's ecosystem is fragile.",
  "Avoid removing shells, corals or marine life from the reef.",
  "Don't play loud music late at night in inhabited islands — respect local communities.",
];

export default function LakshadweepPage() {
  const openContact = () => window.dispatchEvent(new Event("open-contact-expert"));

  // open planner and navigate to plan page with query params
  const openPlannerWith = (state: string, location?: string) => {
    try {
      window.dispatchEvent(new CustomEvent("open-planner-with", { detail: { state, location } }));
    } catch (e) {
      /* noop */
    }
    const params = new URLSearchParams({ state });
    if (location) params.append("location", location);
    // navigate to planner (keeps behaviour consistent across other pages)
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

        {/* ISLANDS GRID */}
        <div className="mb-8">
          <h3 className="font-semibold mb-3">Islands & Experiences</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ISLANDS.map((isle) => (
              <div key={isle} className="rounded-lg p-4 bg-white border border-gray-100 shadow-sm">
                <div className="font-medium text-emerald-800">{isle}</div>
                <div className="text-sm text-gray-600 mt-1">{shortDescription(isle)}</div>
                <div className="mt-3">
                  <button
                    onClick={() => openPlannerWith(DATA.name, isle)}
                    className="text-sm px-3 py-1 rounded-full border border-emerald-200 text-emerald-800 hover:bg-emerald-50"
                  >
                    Plan {isle}
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
          <h4 className="font-semibold mb-2">Plan your Lakshadweep trip</h4>
          <p className="text-gray-600 mb-4">
            Coral atolls, stunning lagoons and isolated island stays — share dates & preferences and our experts will create a tailored itinerary.
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

/* Helper: short descriptions for islands */
function shortDescription(isle: string) {
  const map: Record<string, string> = {
    Agatti: "Gateway atoll with the main airport, lagoons for snorkeling and island stays.",
    Bangaram: "Uninhabited paradise island known for crystal lagoons — popular day trip for snorkeling/diving.",
    Kavaratti: "Administrative capital with lagoons, sea parks and local culture; good for family stays.",
    Minicoy: "Distinct Maldivian-influenced island with a lighthouse, unique language and great diving.",
    Kadmat: "Long white-sand beaches and rich coral reefs — excellent for snorkeling & water sports.",
    Kalpeni: "Three-islet atoll with lagoon, ideal for reef walks and calm swims.",
    Andrott: "Largest inhabited island with traditional fishing communities and cultural trails.",
    Amini: "Known for coir-making and scenic lagoons; authentic island village experiences.",
    Bitra: "Tiny remote atoll with secluded beaches — low visitor numbers, high privacy.",
    Chetlat: "Small island offering tranquil beaches and simple island life experiences.",
    Kiltan: "Coral island with good snorkeling, local crafts and coral-fringed beaches.",
  };
  return map[isle] || "Beautiful island with coral reefs, clear waters and island hospitality.";
}
