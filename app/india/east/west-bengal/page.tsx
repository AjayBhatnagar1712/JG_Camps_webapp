// app/india/east/west-bengal/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

const DATA = {
  name: "West Bengal",
  image: "/images/east-india/west-bengal.jpg",
  bestSeason: "Oct – Mar",
  highlights:
    "From Kolkata’s cultural heart to the tea hills of Darjeeling, and the mangrove wilderness of Sundarbans — Bengal blends art, heritage and nature like nowhere else.",
};

const LOCATIONS = [
  "Kolkata (City of Joy)",
  "Darjeeling (Queen of the Hills)",
  "Sundarbans (Mangrove Forests & Tigers)",
  "Kalimpong (Monasteries & Valleys)",
  "Digha (Beaches & Sea View)",
  "Mandarmani (Seaside Getaway)",
  "Shantiniketan (Tagore’s Abode of Peace)",
  "Murshidabad (Heritage & Palaces)",
  "Bishnupur (Terracotta Temples)",
  "Siliguri (Gateway to North East)",
  "Dooars (Wildlife & Forests)",
  "Raichak (Riverside Resorts)",
  "Mayapur (ISKCON Headquarters)",
  "Cooch Behar (Royal Palaces)",
  "Sunderbans National Park (Boat Safaris)",
  "Chandannagar (French Heritage Town)",
  "Jaldapara Wildlife Sanctuary",
  "Ganga Sagar (Pilgrimage Island)",
  "Henry’s Island (Beach Escape)",
];

const DOS = [
  "Explore the streets of Kolkata early morning for heritage walks and chai stalls.",
  "Try authentic Bengali sweets — rosogolla, mishti doi, sandesh — at local shops.",
  "Book your Sundarbans trip only through authorized eco-tour operators.",
  "Take the Darjeeling Himalayan Toy Train ride for iconic views.",
];

const DONT_S = [
  "Avoid feeding monkeys or wildlife in Sundarbans or forest zones.",
  "Do not litter in beaches or forest areas — respect Bengal’s natural beauty.",
  "Avoid political rallies or dense crowds in Kolkata during festivals.",
  "Do not enter restricted mangrove or tiger areas without guides.",
];

export default function WestBengalPage() {
  const openContact = () => window.dispatchEvent(new Event("open-contact-expert"));

  const openPlannerWith = (state: string, location?: string) => {
    try {
      window.dispatchEvent(new CustomEvent("open-planner-with", { detail: { state, location } }));
    } catch (e) {}
    const params = new URLSearchParams({ state });
    if (location) params.append("location", location);
    window.location.href = `/india/east/plan?${params.toString()}`;
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
          <h3 className="font-semibold mb-3">Top Destinations in West Bengal</h3>
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
          <h4 className="font-semibold mb-2">Plan your West Bengal trip</h4>
          <p className="text-gray-600 mb-4">
            Whether it’s Kolkata’s food, Darjeeling’s hills, or Sundarbans’ wild mangroves — tell us your travel style, and we’ll craft your perfect itinerary.
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

/* Helper: shorten display name */
function shortLabel(loc: string) {
  const match = loc.match(/^([^(,—]+)/);
  return match ? match[1].trim() : loc;
}

/* Helper: small summaries per destination */
function getShortDescriptionFor(loc: string) {
  const map: Record<string, string> = {
    "Kolkata (City of Joy)":
      "Historic capital of British India — colonial streets, Howrah Bridge, sweets & culture.",
    "Darjeeling (Queen of the Hills)":
      "Tea gardens, Himalayan views, and the UNESCO Darjeeling Toy Train.",
    "Sundarbans (Mangrove Forests & Tigers)":
      "World’s largest mangrove delta and home to the Royal Bengal Tiger.",
    "Kalimpong (Monasteries & Valleys)":
      "Peaceful hill town with Buddhist monasteries and orchid gardens.",
    "Digha (Beaches & Sea View)":
      "Popular beach destination for families — golden sands and seafood.",
    "Mandarmani (Seaside Getaway)":
      "Quiet beach with motorable coastline and beach resorts.",
    "Shantiniketan (Tagore’s Abode of Peace)":
      "University town founded by Rabindranath Tagore — art, literature & festivals.",
    "Murshidabad (Heritage & Palaces)":
      "Historic capital of Bengal Nawabs — Hazarduari Palace and gardens.",
    "Bishnupur (Terracotta Temples)":
      "Famous for ancient terracotta temples and traditional Baluchari sarees.",
    "Siliguri (Gateway to North East)":
      "Transit hub connecting to Sikkim, Bhutan, and Darjeeling hills.",
    "Dooars (Wildlife & Forests)":
      "Lush tea gardens and forests with elephants, rhinos, and scenic rivers.",
    "Raichak (Riverside Resorts)":
      "Luxury riverside retreats near Kolkata along the Ganges delta.",
    "Mayapur (ISKCON Headquarters)":
      "Spiritual centre on the Ganges — birthplace of Sri Chaitanya Mahaprabhu.",
    "Cooch Behar (Royal Palaces)":
      "Northern Bengal’s royal city with grand palace and temples.",
    "Sunderbans National Park (Boat Safaris)":
      "Mangrove creeks and boat rides — tiger reserve and UNESCO site.",
    "Chandannagar (French Heritage Town)":
      "Colonial architecture, riverside promenade, and cultural fusion.",
    "Jaldapara Wildlife Sanctuary":
      "Grassland reserve home to one-horned rhinos and elephants.",
    "Ganga Sagar (Pilgrimage Island)":
      "Annual Makar Sankranti pilgrimage at the confluence of Ganga and Bay of Bengal.",
    "Henry’s Island (Beach Escape)":
      "Hidden gem near Bakkhali — serene beaches and mangrove views.",
  };
  return map[loc] || "Discover Bengal’s blend of culture, wildlife, tea hills, and coastal retreats.";
}
