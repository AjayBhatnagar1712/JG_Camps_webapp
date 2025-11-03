// app/india/north/chandigarh/page.tsx
"use client";

import Image from "next/image";
import React from "react";

const DATA = {
  name: "Chandigarh",
  image: "/images/north-india/chandigarh.jpg",
  bestSeason: "Oct – Mar",
  famousPlaces: ["Rock Garden", "Sukhna Lake", "Rose Garden", "Capitol Complex", "Sector 17 Market"],
  highlights:
    "Modernist city planned by Le Corbusier — leafy sectors, clean walkways, lakeside promenades and an open, green city plan.",
};

const LOCATIONS = [
  "Rock Garden",
  "Sukhna Lake",
  "Rose Garden (Zakir Hussain Rose Garden)",
  "Capitol Complex (Open Hand Monument)",
  "Sector 17 Market",
  "Elante Mall",
  "Leisure Valley",
  "Garden of Silence",
  "Government Museum & Art Gallery",
  "Cactus Garden (near Panchkula)",
  "Japanese Garden",
  "Pinjore Gardens (Yadavindra Gardens)",
];

const HIMACHAL_GATEWAY = [
  "Shimla",
  "Kullu",
  "Manali",
  "Kasauli",
  "Dharamshala",
  "Solan",
  "Chail",
  "Kufri",
];

const DOS = [
  "Carry light layers — Chandigarh can be cool in mornings/evenings even when days are warm.",
  "Wear comfortable shoes for Rock Garden and lakeside walks.",
  "Respect quiet zones at the Capitol Complex and museums.",
  "Use official parking areas and avoid stopping on green belts.",
];

const DONT_S = [
  "Don’t litter — Chandigarh’s clean-city status depends on everyone.",
  "Avoid loud music/parties in residential sectors after 10 PM.",
  "Don’t feed birds or fish at the lake in protected zones.",
  "Avoid trespassing restricted government areas (Capitol Complex has controlled access).",
];

export default function ChandigarhPage() {
  const openContact = () => window.dispatchEvent(new Event("open-contact-expert"));

  const openPlannerWith = (state: string, location?: string) => {
    try {
      window.dispatchEvent(new CustomEvent("open-planner-with", { detail: { state, location } }));
    } catch (e) {}
    const params = new URLSearchParams({ state });
    if (location) params.append("location", location);
    window.location.href = `/india/north/plan?${params.toString()}`;
  };

  const createItineraryAuto = () => openPlannerWith(DATA.name);

  return (
    <main className="bg-white text-slate-800">
      {/* HERO */}
      <section className="relative w-full h-[52vh] md:h-[56vh] overflow-hidden rounded-b-2xl shadow-lg">
        <Image src={DATA.image} alt={DATA.name} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />

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
      <section className="py-12 px-6 container mx-auto max-w-4xl">
        <h2 className="text-2xl font-bold text-emerald-800 mb-4">About {DATA.name}</h2>
        <p className="text-gray-700 mb-4">
          {DATA.highlights} Best season: <strong>{DATA.bestSeason}</strong>.
        </p>

        {/* Famous Places */}
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Famous places</h3>
          <ul className="list-disc pl-6 text-gray-700">
            {DATA.famousPlaces.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>

        {/* LOCATIONS */}
        <div className="mb-8">
          <h3 className="font-semibold mb-3">All notable locations & experiences</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {LOCATIONS.map((loc) => (
              <div key={loc} className="rounded-lg p-3 bg-white border border-gray-100 shadow-sm">
                <div className="font-medium text-emerald-800">{loc}</div>
                <div className="text-sm text-gray-600 mt-1">{getShortDescriptionFor(loc)}</div>
                <div className="mt-2">
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

        {/* GATEWAY TO HIMACHAL (non-working buttons) */}
        <div className="mb-8">
          <h3 className="font-semibold mb-3">Chandigarh — Gateway to Himachal</h3>
          <p className="text-gray-700 mb-3">
            Chandigarh is the common launch point for many Himachal destinations. Below are some
            of the most popular places you can easily reach from the city.
          </p>

          <div className="flex flex-wrap gap-3">
            {HIMACHAL_GATEWAY.map((place) => (
              <button
                key={place}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-200 text-emerald-800 bg-white hover:bg-emerald-50 cursor-default"
                disabled
              >
                {place}
              </button>
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
          <h4 className="font-semibold mb-2">Plan your trip to {DATA.name}</h4>
          <p className="text-gray-600 mb-4">
            Tell us your dates & preferences — our experts will craft a custom itinerary and help
            with bookings.
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

            <button
              onClick={() => (window.location.href = "/india/north")}
              className="inline-flex items-center px-6 py-3 rounded-2xl border border-emerald-200 text-emerald-800"
            >
              Back to North
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

/* helper for short labels */
function shortLabel(loc: string) {
  const match = loc.match(/^([^(]+)/);
  return match ? match[1].trim() : loc;
}

/* Short descriptions for Chandigarh locations */
function getShortDescriptionFor(loc: string) {
  const map: Record<string, string> = {
    "Rock Garden": "Unique sculpture garden built from industrial & urban waste, a must-visit.",
    "Sukhna Lake": "Peaceful lake with a promenade, boating and sunrise views.",
    "Rose Garden (Zakir Hussain Rose Garden)": "Large public rose garden with seasonal blooms and walking paths.",
    "Capitol Complex (Open Hand Monument)": "Le Corbusier’s civic complex and symbolic Open Hand monument.",
    "Sector 17 Market": "Vibrant central shopping & dining area with street performers and shops.",
    "Elante Mall": "Major shopping mall with dining and entertainment facilities.",
    "Leisure Valley": "Linear green space connecting sectors with landscaped gardens and paths.",
    "Garden of Silence": "Quiet meditation garden overlooking Sukhna Lake.",
    "Government Museum & Art Gallery": "Houses Gandharan sculptures and Pahari art collections.",
    "Cactus Garden (near Panchkula)": "Large cactus & succulent garden, great for a short day visit.",
    "Japanese Garden": "Well-maintained modern garden with features inspired by Japanese design.",
    "Pinjore Gardens (Yadavindra Gardens)": "Historic Mughal-style terraced gardens just outside Chandigarh.",
  };
  return map[loc] ?? "Discover this spot — part of Chandigarh's clean, green urban fabric.";
}
