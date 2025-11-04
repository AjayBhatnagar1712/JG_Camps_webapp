// app/india/west/gujarat/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

/**
 * Gujarat index page — matches Bihar/Rajasthan structure.
 * - Lists major destinations and quick itinerary options
 * - Auto itinerary opens /india/west/plan?state=Gujarat
 * - "Personalize Itinerary" dispatches global event "open-contact-expert"
 */

const DATA = {
  name: "Gujarat",
  image: "/images/west-india/gujarat.jpg",
  bestSeason: "Oct – Feb",
  highlights:
    "Gujarat is rich in heritage, wildlife (Gir), salt deserts (Rann of Kutch), maritime history and vibrant culture — from Ahmedabad's stepwells to Dwarka's pilgrimage sites and the white Rann.",
};

const LOCATIONS = [
  "Ahmedabad (Sabarmati Ashram & Stepwells)",
  "Gandhinagar (State Capital)",
  "Surat (Textiles & Food)",
  "Vadodara (Baroda Palace & Museums)",
  "Rajkot (Cultural Hub)",
  "Bhuj (Gateway to Kutch)",
  "Rann of Kutch (White Desert & Rann Utsav)",
  "Mandvi (Beaches & Shipbuilding)",
  "Dwarka (Dwarkadhish Temple & Pilgrimage)",
  "Somnath (Somnath Temple & Coast)",
  "Junagadh (Uparkot Fort & Girnar Hills)",
  "Sasan Gir (Gir National Park & Asiatic Lions)",
  "Porbandar (Birthplace of Mahatma Gandhi)",
  "Jamnagar (Lakhota & Marine Drive)",
  "Palitana (Jain Temples & Hills)",
  "Patan (Rani ki Vav & Patola weaving)",
  "Modhera (Sun Temple)",
  "Bhavnagar (Gateway to Little Rann & Velavadar nearby)",
  "Anand (Amul & Dairy Heritage)",
  "Bharuch (Historic Port & Fort)",
  "Valsad (Beaches & Tapi river region)",
  "Vapi (Industrial town & base for southern Gujarat)",
  "Surendranagar (Salt pans & crafts)",
  "Kutch (Handicrafts, embroidery & tribal culture)",
  "Wankaner (Heritage palaces & gardens)",
];

const DOS = [
  "Respect temple & shrine customs (e.g., Dwarka, Somnath, Palitana).",
  "Visit Kutch & Rann of Kutch in winter (Nov–Feb) for the best experience and Rann Utsav.",
  "Book wildlife safaris in Gir National Park in advance and follow park rules.",
  "Try local Gujarati thalis, snacks (dhokla, fafda), and regional seafood along the coast.",
];

const DONT_S = [
  "Don’t visit salt flats during the monsoon (Jun–Sep) — they can be inaccessible.",
  "Avoid approaching wildlife in Gir without an authorised guide.",
  "Don’t assume ATMs are widely available in remote Kutch villages — plan cash accordingly.",
  "Avoid disrespecting religious customs at pilgrimage sites; some sites have strict dress / footwear rules.",
];

export default function GujaratPage() {
  const openContact = () => window.dispatchEvent(new Event("open-contact-expert"));

  const openPlannerWith = (state: string, location?: string) => {
    try {
      window.dispatchEvent(new CustomEvent("open-planner-with", { detail: { state, location } }));
    } catch {
      // noop
    }
    const params = new URLSearchParams({ state });
    if (location) params.append("location", location);
    window.location.href = `/india/west/plan?${params.toString()}`;
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
          <h3 className="font-semibold mb-3">Top Destinations in Gujarat</h3>
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
          <h4 className="font-semibold mb-2">Plan your Gujarat trip</h4>
          <p className="text-gray-600 mb-4">
            From the white salt plains of the Rann of Kutch to the lions of Gir and the heritage of Ahmedabad — tell us your interests and dates, and our team will craft a Gujarat itinerary.
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
    "Ahmedabad (Sabarmati Ashram & Stepwells)": "Gujarat’s largest city — Sabarmati Ashram, intricately carved stepwells (Adalaj), and rich textile history.",
    "Gandhinagar (State Capital)": "Administrative capital with Akshardham temple and planned green spaces.",
    "Surat (Textiles & Food)": "Famous for diamond cutting, textile markets and vibrant street food.",
    "Vadodara (Baroda Palace & Museums)": "Cultural city with Laxmi Vilas Palace, museums and art scenes.",
    "Rajkot (Cultural Hub)": "Historic city with handicrafts, local markets and nearby Saurashtra attractions.",
    "Bhuj (Gateway to Kutch)": "Base for exploring Kutch — handicrafts, workshops and nearby villages.",
    "Rann of Kutch (White Desert & Rann Utsav)": "Seasonal salt marsh that becomes a vast white desert — major cultural festival in winter.",
    "Mandvi (Beaches & Shipbuilding)": "Coastal town with beaches, Vikram Vilas Palace and traditional shipbuilding.",
    "Dwarka (Dwarkadhish Temple & Pilgrimage)": "Ancient Krishna temple and important pilgrimage hub on the coast.",
    "Somnath (Somnath Temple & Coast)": "Renowned temple by the Arabian Sea with strong religious significance.",
    "Junagadh (Uparkot Fort & Girnar Hills)": "Historic fort town near Girnar hill range with rich history.",
    "Sasan Gir (Gir National Park & Asiatic Lions)": "Exclusive reserve for Asiatic lion safaris and biodiversity.",
    "Porbandar (Birthplace of Mahatma Gandhi)": "Coastal birthplace of Gandhi with maritime museums.",
    "Jamnagar (Lakhota & Marine Drive)": "Coastal town with Lakhota palace, marine drives and nearby Marine National Park.",
    "Palitana (Jain Temples & Hills)": "A major Jain pilgrimage site with hundreds of hilltop temples.",
    "Patan (Rani ki Vav & Patola weaving)": "UNESCO site Rani ki Vav and historic Patola silk weaving traditions.",
    "Modhera (Sun Temple)": "Ancient Sun Temple with intricate carvings and step well.",
    "Bhavnagar (Gateway to Little Rann & Velavadar nearby)": "Nearby Little Rann of Kutch and access to Velavadar blackbuck sanctuary.",
    "Anand (Amul & Dairy Heritage)": "Dairy capital — Amul museum and cooperative movement history.",
    "Bharuch (Historic Port & Fort)": "One of India’s oldest trading ports with historical ruins.",
    "Valsad (Beaches & Tapi river region)": "Southern Gujarat coastal town with beaches and agricultural markets.",
    "Vapi (Industrial town & base for southern Gujarat)": "Industrial hub and transit point to southern Gujarat.",
    "Surendranagar (Salt pans & crafts)": "Salt production, crafts and rural Gujarat experiences.",
    "Kutch (Handicrafts, embroidery & tribal culture)": "Large district famed for craftsmanship, embroidery and unique landscapes.",
    "Wankaner (Heritage palaces & gardens)": "Smaller heritage town with palaces and colonial-era charm.",
  };
  return map[loc] || "Explore the history, wildlife, crafts and coastal culture of this destination.";
}
