// app/india/south/andhra-pradesh/page.tsx
"use client";

import slugify from "@/lib/slugify";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const DATA = {
  name: "Andhra Pradesh",
  image: "/images/south-india/andhra-pradesh/andhra-hero.jpg",
  bestSeason: "Oct – Feb",
  famousPlaces: [
    "Tirupati",
    "Visakhapatnam (RK Beach, Rushikonda)",
    "Araku Valley",
    "Vijayawada",
    "Amaravati",
    "Borra Caves",
    "Lepakshi",
    "Nellore",
    "Kurnool (Belum Caves, Oravakallu Rock Garden)",
    "Srisailam",
    "Machilipatnam",
    "Srikalahasti",
    "Papi Hills",
    "Maredumilli",
  ],
  highlights:
    "Coastal beaches, ancient temples, scenic hill-valleys (Araku), historic sites and a rich Telugu cultural heritage.",
};

const LOCATIONS = [
  "Tirupati (Sri Venkateswara Temple)",
  "Visakhapatnam — RK Beach & Rushikonda",
  "Araku Valley & Borra Caves",
  "Vijayawada & Kanaka Durga Temple",
  "Amaravati (Buddhist stupa site & new capital area)",
  "Borra Caves (Ananthagiri Hills)",
  "Lepakshi (Veerabhadra Temple & hanging pillar)",
  "Nellore (beaches & Pulicat nearby)",
  "Kurnool — Belum Caves & Oravakallu Rock Garden",
  "Srisailam (Mallikarjuna Temple & dam views)",
  "Machilipatnam (historic port & beaches)",
  "Srikalahasti (Vayu Linga temple)",
  "Papi Hills (boating on Godavari)",
  "Maredumilli (waterfalls & forest trails)",
  "Rajahmundry / Rajamahendravaram (Godavari ghats & boat trips)",
  "Anantapur & Lepakshi approach",
  "Kadapa & Gandikota (the 'Grand Canyon of India' nearby)",
];

const DOS = [
  "Carry light clothing for coastal areas and warm layers for hill stations (Araku) in winter mornings.",
  "Book Tirupati darshan and accommodation in advance — peak pilgrimage season gets busy.",
  "Hire local boat operators for Papi Hills and Godavari trips from trusted sources.",
  "Respect temple customs: dress modestly and follow queue/darshan rules.",
];

const DONT_S = [
  "Don’t litter beaches or forest trails — many areas are ecologically sensitive.",
  "Avoid unacclimatised long drives into remote hill roads at night.",
  "Don’t assume permits are unnecessary for certain protected areas; check locally.",
];

export default function AndhraPradeshPage() {
  const openContact = () => window.dispatchEvent(new Event("open-contact-expert"));

  // opens planner with query params and fires a custom event that planner modal/listener can use
  const openPlannerWith = (state: string, location?: string) => {
    try {
      window.dispatchEvent(new CustomEvent("open-planner-with", { detail: { state, location } }));
    } catch (e) {
      // ignore if event can't be dispatched
    }

    const params = new URLSearchParams({ state });
    if (location) params.append("location", location);
    // navigate to the planner route (keeps same behaviour used elsewhere)
    window.location.href = `/india/south/plan?${params.toString()}`;
  };

  const createItineraryAuto = () => openPlannerWith(DATA.name);

  return (
    <main className="bg-white text-slate-800">
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

        {/* Famous Places */}
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Famous places & highlights</h3>
          <ul className="list-disc pl-6 text-gray-700">
            {DATA.famousPlaces.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>

        {/* LOCATIONS */}
        <div className="mb-8">
          <h3 className="font-semibold mb-3">Destinations & experiences across Andhra Pradesh</h3>
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
          <h4 className="font-semibold mb-2">Plan your Andhra Pradesh trip</h4>
          <p className="text-gray-600 mb-4">
            Tell us your dates & preferences — our experts will craft an itinerary with temples, beaches and hill-valley stays.
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

/* helper for short labels */
function shortLabel(loc: string) {
  const match = loc.match(/^([^(,]+)/);
  return match ? match[1].trim() : loc;
}

/* Short descriptions for Andhra Pradesh locations */
function getShortDescriptionFor(loc: string) {
  const map: Record<string, string> = {
    "Tirupati (Sri Venkateswara Temple)":
      "One of India’s most visited pilgrimage sites — must-book darshan & accommodation in advance.",
    "Visakhapatnam — RK Beach & Rushikonda":
      "Coastal city with popular beaches, sea-facing promenades and water-sport options.",
    "Araku Valley & Borra Caves":
      "Scenic hill station with coffee plantations and impressive limestone caves nearby.",
    "Vijayawada & Kanaka Durga Temple":
      "Commercial hub on the Krishna river with a prominent hilltop temple and local markets.",
    "Amaravati (Buddhist stupa site & new capital area)":
      "Ancient Buddhist site with stupas and modern development around the new capital zone.",
    "Borra Caves (Ananthagiri Hills)":
      "Ancient limestone caves featuring striking stalactites & stalagmites.",
    "Lepakshi (Veerabhadra Temple & hanging pillar)":
      "Famous for exquisite Vijayanagara-era mural and sculptural work.",
    "Nellore (beaches & Pulicat nearby)":
      "Coastal district with access to Pulicat bird sanctuary and local seafood cuisine.",
    "Kurnool — Belum Caves & Oravakallu Rock Garden":
      "Region with deep caves and unique rock formations, great for day trips.",
    "Srisailam (Mallikarjuna Temple & dam views)":
      "Important Shaiva pilgrimage site set amidst the Nallamala hills and reservoir.",
    "Machilipatnam (historic port & beaches)":
      "Historic trading port with textile craft heritage and coastline access.",
    "Srikalahasti (Vayu Linga temple)":
      "Renowned for its Vayu Linga and astrological significance for devotees.",
    "Papi Hills (boating on Godavari)":
      "Scenic river gorges best explored by boat trips from nearby launch points.",
    "Maredumilli (waterfalls & forest trails)":
      "Lush forest area with waterfall treks and quieter eco-stays.",
    "Rajahmundry / Rajamahendravaram (Godavari ghats & boat trips)":
      "Cultural city on the Godavari famous for ghats, boat rides and classical music heritage.",
    "Anantapur & Lepakshi approach":
      "Gateway to historical sites and rustic Andhra countryside experiences.",
    "Kadapa & Gandikota (the 'Grand Canyon of India' nearby)":
      "Access Gandikota gorge and historic forts — dramatic landscapes for photography.",
  };
  return map[loc] || "Explore this place — rich local culture, landscapes and experiences await.";
}
