// app/india/east/odisha/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

const DATA = {
  name: "Odisha",
  image: "/images/east-india/odisha.jpg",
  bestSeason: "Oct – Feb",
  highlights:
    "Odisha offers ancient temples, pristine beaches, rich tribal culture, and abundant wildlife — from the Sun Temple at Konark to Chilika Lake's birdlife.",
};

const LOCATIONS = [
  "Bhubaneswar (Temple City)",
  "Puri (Jagannath Temple & Beaches)",
  "Konark (Sun Temple)",
  "Chilika Lake (Brackish Water Lagoon)",
  "Bhitarkanika National Park (Mangroves & Crocs)",
  "Cuttack (Silver Filigree & Barabati Fort)",
  "Dhauli (Peace Pagodas & Kalinga Site)",
  "Sambalpur (Hirakud Dam & Tribal Culture)",
  "Koraput (Tribal Highlands & Kolab Falls)",
  "Rayagada (Tribal Markets & Waterfalls)",
  "Similipal National Park (Tigers & Sal Forests)",
  "Gopalpur-on-Sea (Quiet Beaches & Fishing Village)",
  "Pipili (Applique Work & Crafts)",
  "Raghurajpur (Pattachitra Artists’ Village)",
  "Chandipur (Unique Receding Sea & Sandbars)",
  "Hirakud (Hirakud Dam & Reservoir)",
  "Satkosia (Gorge & River Wildlife)",
  "Daringbadi (Kashmir of Odisha)",
  "Talcher (Coalfields & Nearby Forests)",
  "Baripada (Shahi Jatra & Tribal fairs)",
];

const DOS = [
  "Respect temple customs — dress modestly and follow local rituals in places like Puri and Konark.",
  "Book Chilika boat trips through authorised operators and carry binoculars for birdwatching.",
  "Try local Odia cuisine — dalma, chhena poda and seafood along the coast.",
  "Hire licensed naturalist/guides for Bhitarkanika and Similipal safaris.",
];

const DONT_S = [
  "Don't enter temple sanctums if you are unsure about local dress/behaviour rules.",
  "Avoid plastic waste in beaches and protected areas — carry reusable water bottles.",
  "Don't approach or feed wildlife in mangroves, national parks or sanctuaries.",
  "Avoid night travel through remote tribal/highland roads without local guidance.",
];

export default function OdishaPage() {
  const openContact = () => window.dispatchEvent(new Event("open-contact-expert"));

  const openPlannerWith = (state: string, location?: string) => {
    try {
      window.dispatchEvent(new CustomEvent("open-planner-with", { detail: { state, location } }));
    } catch (e) {
      // ignore
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
          <h3 className="font-semibold mb-3">Top Destinations in Odisha</h3>
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
          <h4 className="font-semibold mb-2">Plan your Odisha trip</h4>
          <p className="text-gray-600 mb-4">
            From Puri's sacred shores to Chilika's migratory birds and Konark's heritage — tell us your travel style, and we’ll craft your perfect itinerary.
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
    "Bhubaneswar (Temple City)":
      "Capital city with ancient temples like Lingaraja and Khandagiri caves.",
    "Puri (Jagannath Temple & Beaches)":
      "Pilgrimage town famed for Jagannath Temple, Rath Yatra and golden beaches.",
    "Konark (Sun Temple)":
      "12th-century Sun Temple — an architectural UNESCO icon with sculpted stone chariot.",
    "Chilika Lake (Brackish Water Lagoon)":
      "Asia’s largest brackish water lagoon — birdwatching, Irrawaddy dolphins and island trips.",
    "Bhitarkanika National Park (Mangroves & Crocs)":
      "Mangrove reserve known for saltwater crocodiles and nesting birds.",
    "Cuttack (Silver Filigree & Barabati Fort)":
      "Historic mercantile city, famed for silver filigree crafts and Durga Puja.",
    "Dhauli (Peace Pagodas & Kalinga Site)":
      "Historic site of Kalinga war with peace memorial and Ashokan edicts.",
    "Sambalpur (Hirakud Dam & Tribal Culture)":
      "Gateway to Hirakud Dam — rich tribal fairs and handloom culture.",
    "Koraput (Tribal Highlands & Kolab Falls)":
      "Scenic highland district with tribal markets, waterfalls and coffee estates.",
    "Rayagada (Tribal Markets & Waterfalls)":
      "Hill district with tribal crafts, bauxite hills and natural cascades.",
    "Similipal National Park (Tigers & Sal Forests)":
      "Biosphere reserve with tigers, elephants, and dense sal forests.",
    "Gopalpur-on-Sea (Quiet Beaches & Fishing Village)":
      "Relaxed coastal town with clean beaches and seaside resorts.",
    "Pipili (Applique Work & Crafts)":
      "Village known for colourful applique and traditional handicrafts.",
    "Raghurajpur (Pattachitra Artists’ Village)":
      "Art village renowned for Pattachitra paintings and folk artists.",
    "Chandipur (Unique Receding Sea & Sandbars)":
      "Beach where the sea recedes dramatically at low tide — unique phenomenon.",
    "Hirakud (Hirakud Dam & Reservoir)":
      "Site of one of the world’s longest earthen dams — reservoir and fishing spots.",
    "Satkosia (Gorge & River Wildlife)":
      "River gorge with boat safaris, otters and rich riparian habitats.",
    "Daringbadi (Kashmir of Odisha)":
      "Cool hill station with pine forests and coffee plantations.",
    "Talcher (Coalfields & Nearby Forests)":
      "Industrial town near forested pockets and reservoirs.",
    "Baripada (Shahi Jatra & Tribal fairs)":
      "Cultural town with tribal festivals and gateway to Similipal.",
  };
  return map[loc] || "Discover the culture, temples, coastlines and wildlife of Odisha.";
}
