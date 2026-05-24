// app/india/north/leh-ladakh/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import slugify from "@/lib/slugify"; // ✅ imported from shared lib

const DATA = {
  name: "Leh & Ladakh",
  image: "/images/north-india/leh-ladakh/leh-hero.jpg",
  bestSeason: "May – Sep",
  famousPlaces: [
    "Leh Bazaar",
    "Shanti Stupa",
    "Leh Palace",
    "Hemis Monastery",
    "Thiksey Monastery",
    "Alchi Monastery",
    "Nubra Valley",
    "Pangong Tso",
    "Tso Moriri",
    "Khardung La",
    "Magnetic Hill",
    "Zanskar",
    "Hunder Sand Dunes",
  ],
  highlights:
    "High-altitude desert landscapes, pristine lakes, Buddhist monasteries, and dramatic Himalayan passes — ideal for adventure and culture.",
};

const LOCATIONS = [
  "Leh Town & Leh Bazaar",
  "Shanti Stupa",
  "Leh Palace",
  "Hemis Monastery",
  "Thiksey Monastery",
  "Shey Palace & Gompa",
  "Alchi Monastery",
  "Nubra Valley (Diskit, Hunder)",
  "Pangong Tso (Spangmik, Lukung)",
  "Tso Moriri (Korzok)",
  "Khardung La (pass)",
  "Magnetic Hill",
  "Hunder Sand Dunes (camel safaris)",
  "Zanskar Valley (Padum, Phuktal)",
  "Suru Valley & Kargil approach",
  "Lamayuru (Moonland)",
  "Stok Kangri base (trek start)",
  "Changthang plateau (nomadic settlements)",
];

const DOS = [
  "Acclimatise in Leh for 1–2 days before driving to high passes.",
  "Carry prescription meds and a basic altitude sickness kit.",
  "Book permits (if required) and vehicle/driver in advance for remote routes.",
  "Respect monastery rules: dress modestly, remove shoes where indicated and ask before photographing monks.",
];

const DONT_S = [
  "Don’t rush—avoid ascending to high passes on the day you arrive in Leh.",
  "Avoid alcohol for the first 24–48 hours after arrival.",
  "Don’t leave litter at lakes or campsites — Ladakh is ecologically fragile.",
  "Avoid off-trail driving in protected or fragile areas.",
];

export default function LehLadakhPage() {
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
          <h3 className="font-semibold mb-3">Destinations & experiences across Leh & Ladakh</h3>
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
          <h4 className="font-semibold mb-2">Plan your Leh & Ladakh trip</h4>
          <p className="text-gray-600 mb-4">
            Tell us your dates & preferences — our experts will craft a safe, altitude-aware
            itinerary and handle permits and bookings.
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
              href="/india/north"
              className="inline-flex items-center px-6 py-3 rounded-2xl border border-emerald-200 text-emerald-800"
            >
              Back to North
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

/* Short descriptions for Leh & Ladakh locations */
function getShortDescriptionFor(loc: string) {
  const map: Record<string, string> = {
    "Leh Town & Leh Bazaar":
      "Historic market, cafes, shops and acclimatisation hub with scenic viewpoints.",
    "Shanti Stupa":
      "White-domed peace pagoda offering sunrise/sunset views over Leh.",
    "Leh Palace":
      "Nine-storey palace overlooking Leh — history and great vantage point.",
    "Hemis Monastery":
      "Largest and richest monastery in Ladakh, hosts the Hemis Festival.",
    "Thiksey Monastery":
      "Beautiful gompa with assembly hall and panoramic views; resembles Potala Palace in miniature.",
    "Shey Palace & Gompa":
      "Former summer capital with seated Buddha statue and historic ruins.",
    "Alchi Monastery":
      "Ancient monastery famed for its rare murals and Kashmiri-influenced artwork.",
    "Nubra Valley (Diskit, Hunder)":
      "Green valleys, double-humped camels and scenic drives via Khardung La.",
    "Pangong Tso (Spangmik, Lukung)":
      "Famous high-altitude lake known for shifting blue hues and dramatic vistas.",
    "Tso Moriri (Korzok)":
      "Remote, serene high-altitude lake with nomadic Changpa settlements.",
    "Khardung La (pass)":
      "One of the world’s highest motorable passes — gateway to Nubra Valley.",
    "Magnetic Hill":
      "Optical-illusion stretch reputed to show cars rolling uphill.",
    "Hunder Sand Dunes (camel safaris)":
      "Unique cold desert dunes in Nubra offering camel rides.",
    "Zanskar Valley (Padum, Phuktal)":
      "Remote valley for multi-day treks and the famous Phuktal monastery cave complex.",
    "Suru Valley & Kargil approach":
      "Lush valley extending south towards Kargil with remote villages and scenic drives.",
    "Lamayuru (Moonland)":
      "Lunar-like rock formations and an ancient monastery — dramatic landscape.",
    "Stok Kangri base (trek start)":
      "Base area for high-altitude trekking (note seasonal/permit restrictions).",
    "Changthang plateau (nomadic settlements)":
      "Expansive plateau dotted with yak herders and remote lakes.",
  };
  return (
    map[loc] ||
    "Explore this remarkable place in Ladakh — unique landscapes and cultural heritage await."
  );
}
