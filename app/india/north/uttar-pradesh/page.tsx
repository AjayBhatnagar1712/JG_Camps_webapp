// app/india/north/uttar-pradesh/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

const DATA = {
  name: "Uttar Pradesh",
  image: "/images/north-india/uttar-pradesh.jpg",
  bestSeason: "Oct – Mar",
  famousPlaces: ["Varanasi", "Agra", "Lucknow", "Prayagraj", "Mathura & Vrindavan"],
  highlights:
    "Land of heritage, spirituality, Mughal architecture and divine riverfronts.",
};

const POPULAR_LOCATIONS = [
  "Varanasi (Kashi)",
  "Sarnath",
  "Agra (Taj Mahal & Fort)",
  "Fatehpur Sikri",
  "Mathura & Vrindavan",
  "Lucknow (City of Nawabs)",
  "Prayagraj (Allahabad Sangam)",
  "Ayodhya (Ram Janmabhoomi)",
  "Jhansi (Fort & Rani Mahal)",
  "Chitrakoot (Spiritual Hills)",
  "Dudhwa National Park",
  "Kushinagar (Buddhist Site)",
  "Meerut (Heritage & Markets)",
  "Noida (Modern City & Mall Culture)",
  "Gorakhpur (Temples & Culture)",
];

const DOS = [
  "Respect local traditions and temple customs, especially at religious towns.",
  "Book Taj Mahal and heritage monument tickets online to avoid queues.",
  "Try authentic Awadhi cuisine in Lucknow and street food in Varanasi.",
  "Travel with local guides for insights at Buddhist and Mughal heritage sites.",
];

const DONT_S = [
  "Avoid carrying leather items to temple complexes in Mathura and Varanasi.",
  "Don’t litter or bathe near restricted ghats or polluted river sections.",
  "Avoid night travel in remote rural zones — plan day drives.",
  "Don’t engage touts near crowded tourist areas; use official counters.",
];

export default function UttarPradeshPage() {
  const openContact = () => window.dispatchEvent(new Event("open-contact-expert"));

  const openPlannerWith = (state: string, location?: string) => {
    try {
      window.dispatchEvent(new CustomEvent("open-planner-with", { detail: { state, location } }));
    } catch (e) {
      // ignore errors
    }
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

        {/* POPULAR LOCATIONS */}
        <div className="mb-8">
          <h3 className="font-semibold mb-3">Popular locations & experiences</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {POPULAR_LOCATIONS.map((loc) => (
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
  const match = loc.match(/^([^(]+)/);
  return match ? match[1].trim() : loc;
}

/* Short descriptions for Uttar Pradesh locations */
function getShortDescriptionFor(loc: string) {
  const map: Record<string, string> = {
    "Varanasi (Kashi)":
      "The spiritual capital of India — ghats, Ganga Aarti, temples and timeless traditions.",
    "Sarnath":
      "Buddhist heritage site where Lord Buddha delivered his first sermon.",
    "Agra (Taj Mahal & Fort)":
      "World-famous marble mausoleum and Mughal fort — symbol of love and heritage.",
    "Fatehpur Sikri":
      "UNESCO site of red sandstone architecture and Akbar’s royal city.",
    "Mathura & Vrindavan":
      "Birthplace of Lord Krishna — colourful temples and festive culture.",
    "Lucknow (City of Nawabs)":
      "Heritage city with Imambaras, kebabs, chikankari craft and royal grace.",
    "Prayagraj (Allahabad Sangam)":
      "Confluence of holy rivers — site of Kumbh Mela and historic landmarks.",
    "Ayodhya (Ram Janmabhoomi)":
      "Holy city of Lord Rama with new temple, ghats and spiritual walks.",
    "Jhansi (Fort & Rani Mahal)":
      "Historic fort town linked with Rani Laxmi Bai and freedom struggles.",
    "Chitrakoot (Spiritual Hills)":
      "Scenic spiritual retreat associated with Lord Rama’s exile stories.",
    "Dudhwa National Park":
      "Dense forest reserve near Indo-Nepal border — tigers, elephants, rhinos.",
    "Kushinagar (Buddhist Site)":
      "Sacred site where Buddha attained Mahaparinirvana; global Buddhist hub.",
    "Meerut (Heritage & Markets)":
      "Historic cantonment city known for colonial heritage and bustling bazaars.",
    "Noida (Modern City & Mall Culture)":
      "Modern urban hub with shopping, dining and entertainment complexes.",
    "Gorakhpur (Temples & Culture)":
      "Seat of Gorakhnath Temple and gateway to eastern UP spirituality.",
  };
  return map[loc] ?? "Discover this city — full of heritage, culture and divine energy.";
}
