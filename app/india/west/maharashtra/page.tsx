// app/india/west/maharashtra/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

/**
 * Maharashtra index page — matches Bihar/Rajasthan/Gujarat structure.
 * - Lists major destinations and quick itinerary options
 * - Auto itinerary opens the global itinerary builder
 * - "Personalize Itinerary" dispatches global event "open-contact-expert"
 */

const DATA = {
  name: "Maharashtra",
  image: "/images/west-india/maharashtra.jpg",
  bestSeason: "Oct – Mar",
  highlights:
    "Maharashtra offers a unique blend of bustling cities, ancient caves, hill stations, coastal getaways, and rich cultural heritage — from Mumbai’s skyline to Ajanta & Ellora’s timeless art.",
};

const LOCATIONS = [
  "Mumbai (Gateway of India & Marine Drive)",
  "Pune (Cultural Capital & Hill Getaways)",
  "Aurangabad (Ajanta & Ellora Caves)",
  "Nashik (Wine Capital & Trimbakeshwar Temple)",
  "Nagpur (Orange City & Tiger Gateway)",
  "Kolhapur (Mahalakshmi Temple & Cuisine)",
  "Lonavala (Hill Station & Caves)",
  "Khandala (Hill Station & Waterfalls)",
  "Mahabaleshwar (Strawberries & Viewpoints)",
  "Panchgani (Plateau & Paragliding)",
  "Alibaug (Beaches & Forts)",
  "Ratnagiri (Coastal Town & Alphonso Mangoes)",
  "Ganpatipule (Beach Temple & Resorts)",
  "Sindhudurg (Fort & Scuba Diving)",
  "Tarkarli (Beach & Water Sports)",
  "Igatpuri (Vipasana Center & Nature)",
  "Bhandardara (Lake & Wilson Dam)",
  "Matheran (Toy Train & Eco Hill Station)",
  "Chandrapur (Tadoba Tiger Reserve)",
  "Solapur (Siddheshwar Temple & Textiles)",
  "Satara (Kaas Plateau & Waterfalls)",
  "Shirdi (Sai Baba Temple)",
  "Trimbakeshwar (Jyotirlinga Temple)",
  "Ajanta Caves (Buddhist Rock Cut Art)",
  "Ellora Caves (Kailasa Temple & Heritage)",
  "Lonar Lake (Meteoric Crater Lake)",
  "Raigad (Shivaji’s Capital Fort)",
  "Lavasa (Planned Hill City)",
  "Karjat (Trekking & Caves)",
  "Mulshi (Lake & Resorts)",
  "Palghar (Beaches & Forts)",
  "Chikhaldara (Hill Station in Vidarbha)",
  "Wardha (Gandhian Ashrams)",
  "Nanded (Takht Hazur Sahib Gurudwara)",
  "Latur (Temples & Heritage)",
  "Osmanabad (Tuljapur Temple)",
];

const DOS = [
  "Visit Ajanta & Ellora early morning to avoid crowds and heat.",
  "Explore Mumbai’s heritage walk (Fort area) and Marine Drive sunset.",
  "Respect temple dress codes at Shirdi, Trimbakeshwar and Kolhapur.",
  "Try authentic Maharashtrian thali, misal pav, vada pav, and Konkani seafood.",
];

const DONT_S = [
  "Avoid venturing into forests or tiger reserves without authorised guides.",
  "Don’t litter beaches or heritage sites; Maharashtra has strict cleanliness drives.",
  "Avoid monsoon treks in dangerous ghats without proper gear.",
  "Do not photograph religious rituals without permission.",
];

export default function MaharashtraPage() {
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
          <h3 className="font-semibold mb-3">Top Destinations in Maharashtra</h3>
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
          <h4 className="font-semibold mb-2">Plan your Maharashtra trip</h4>
          <p className="text-gray-600 mb-4">
            From Mumbai’s cosmopolitan vibe to the caves of Ajanta & Ellora, hill stations of Mahabaleshwar, and beaches
            of Konkan — tell us your preferences and we’ll design your perfect Maharashtra itinerary.
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
              href="/india/west"
              className="inline-flex items-center px-6 py-3 rounded-2xl border border-emerald-200 text-emerald-800"
            >
              Back to West India
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
    "Mumbai (Gateway of India & Marine Drive)": "India’s financial capital — Marine Drive, Colaba, Gateway of India and Bollywood charm.",
    "Pune (Cultural Capital & Hill Getaways)": "Historic city near Lonavala & Sinhagad Fort with youthful energy and cuisine.",
    "Aurangabad (Ajanta & Ellora Caves)": "UNESCO sites with stunning ancient Buddhist and Hindu rock-cut caves.",
    "Nashik (Wine Capital & Trimbakeshwar Temple)": "Famous for vineyards, wineries and holy Jyotirlinga temple.",
    "Nagpur (Orange City & Tiger Gateway)": "Centre of India with access to Pench & Tadoba tiger reserves.",
    "Kolhapur (Mahakali Temple & Cuisine)": "Spiritual and cultural city known for spicy cuisine and wrestling culture.",
    "Lonavala (Hill Station & Caves)": "Monsoon-favorite hill retreat between Mumbai and Pune with waterfalls and caves.",
    "Khandala (Hill Station & Waterfalls)": "Twin hill station near Mumbai with scenic viewpoints and valleys.",
    "Mahabaleshwar (Strawberries & Viewpoints)": "Famous for strawberry farms and grand Sahyadri views.",
    "Panchgani (Plateau & Paragliding)": "Known for tableland plateau, boarding schools and paragliding.",
    "Alibaug (Beaches & Forts)": "Quick coastal getaway from Mumbai with clean beaches and sea forts.",
    "Ratnagiri (Coastal Town & Alphonso Mangoes)": "Scenic coastal town famous for mangoes and Ganpatipule temple.",
    "Ganpatipule (Beach Temple & Resorts)": "Beachside temple town known for calm waters and resorts.",
    "Sindhudurg (Fort & Scuba Diving)": "Coastal fort and emerging destination for scuba diving.",
    "Tarkarli (Beach & Water Sports)": "Crystal-clear beaches with snorkeling, scuba, and houseboats.",
    "Igatpuri (Vipasana Center & Nature)": "Tranquil hill station ideal for meditation and monsoon treks.",
    "Bhandardara (Lake & Wilson Dam)": "Serene lakeside getaway known for camping and waterfall treks.",
    "Matheran (Toy Train & Eco Hill Station)": "Vehicle-free hill station famous for toy train and sunset points.",
    "Chandrapur (Tadoba Tiger Reserve)": "Gateway to Tadoba-Andhari tiger reserve and jungle safaris.",
    "Solapur (Siddheshwar Temple & Textiles)": "Known for handloom textiles and temple architecture.",
    "Satara (Kaas Plateau & Waterfalls)": "UNESCO floral plateau and scenic waterfalls during monsoon.",
    "Shirdi (Sai Baba Temple)": "Major pilgrimage site dedicated to Shirdi Sai Baba.",
    "Trimbakeshwar (Jyotirlinga Temple)": "Sacred Shiva temple near Nashik — one of the 12 Jyotirlingas.",
    "Ajanta Caves (Buddhist Rock Cut Art)": "Ancient rock-cut caves depicting Buddha’s life and art.",
    "Ellora Caves (Kailasa Temple & Heritage)": "Hindu, Jain, and Buddhist caves with stunning monolithic temple.",
    "Lonar Lake (Meteoric Crater Lake)": "Unique meteor crater lake with alkaline water ecosystem.",
    "Raigad (Shivaji’s Capital Fort)": "Historic Maratha fort offering panoramic views.",
    "Lavasa (Planned Hill City)": "Modern hill city near Pune with waterfront promenade.",
    "Karjat (Trekking & Caves)": "Adventure hub for treks, waterfalls and rock-cut caves.",
    "Mulshi (Lake & Resorts)": "Lakeside resorts and peaceful countryside near Pune.",
    "Palghar (Beaches & Forts)": "Quiet beaches and coastal forts north of Mumbai.",
    "Chikhaldara (Hill Station in Vidarbha)": "Only hill station in Vidarbha with scenic viewpoints.",
    "Wardha (Gandhian Ashrams)": "Home to Sevagram Ashram and Gandhian heritage.",
    "Nanded (Takht Hazur Sahib Gurudwara)": "Major Sikh pilgrimage site by the Godavari River.",
    "Latur (Temples & Heritage)": "Historic temples and regional trade hub.",
    "Osmanabad (Tuljapur Temple)": "Famous for Tulja Bhavani Temple — revered Shakti Peetha.",
  };
  return map[loc] || "Explore Maharashtra’s mix of heritage, hills, beaches, temples, and wildlife.";
}
