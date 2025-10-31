"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

const DATA = {
  name: "Delhi",
  image: "/images/north-india/delhi.jpg",
  bestSeason: "Oct – Mar",
  famousPlaces: ["India Gate", "Red Fort", "Qutub Minar"],
  highlights: "Historic monuments, street food and cultural hubs.",
};

const POPULAR_LOCATIONS = [
  "India Gate",
  "Red Fort",
  "Qutub Minar",
  "Lotus Temple",
  "Humayun's Tomb",
  "Jama Masjid",
  "Connaught Place",
  "Chandni Chowk & Old Delhi food walk",
  "Akshardham Temple",
  "Lodhi Garden",
  "Hauz Khas Village",
  "Dilli Haat",
  "National Museum",
  "Gurudwara Bangla Sahib",
];

const DOS = [
  "Carry a bottle of water and wear comfortable shoes — Delhi involves a lot of walking.",
  "Use autorickshaws or pre-booked taxis from official apps for safety and fair pricing.",
  "Try local street food at trusted stalls — parathas in Chandni Chowk and chaat at old city lanes.",
  "Respect places of worship: remove shoes where required and dress modestly.",
  "Plan temple and monument visits early in the morning to avoid crowds and heat.",
];

const DONT_S = [
  "Don't leave valuables unattended in crowded markets.",
  "Don't accept unmetered taxis without confirming fare or using a reliable app.",
  "Avoid visiting sensitive areas without prior permission or guide.",
  "Don't litter — Delhi has strict fines in many areas.",
];

export default function DelhiPage() {
  const openContact = () => window.dispatchEvent(new Event("open-contact-expert"));

  // ✅ Option 1: Combined approach
  const openPlannerWith = (city: string, location?: string) => {
    try {
      window.dispatchEvent(new CustomEvent("open-planner-with", { detail: { city, location } }));
    } catch {}

    // Always navigate to planner page as fallback
    const params = new URLSearchParams({ city });
    if (location) params.append("location", location);
    window.location.href = `/india/north/plan?${params.toString()}`;
  };

  const createItineraryAuto = () => openPlannerWith("Delhi");

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
              <Link
                href="/india/north/plan"
                className="px-4 py-2 rounded-2xl border border-white/30 text-white"
              >
                Build Itinerary (Full Planner)
              </Link>
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
              <div
                key={loc}
                className="rounded-lg p-3 bg-white border border-gray-100 shadow-sm"
              >
                <div className="font-medium text-emerald-800">{loc}</div>
                <div className="text-sm text-gray-600 mt-1">
                  {getShortDescriptionFor(loc)}
                </div>
                <div className="mt-2">
                  <button
                    onClick={() => openPlannerWith("Delhi", loc)}
                    className="text-sm px-3 py-1 rounded-full border border-emerald-200 text-emerald-800 hover:bg-emerald-50"
                  >
                    Plan {loc}
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
            Tell us your dates & preferences — our experts will craft a custom itinerary
            and help with bookings.
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

/* Short summaries for each popular location */
function getShortDescriptionFor(loc: string) {
  const map: Record<string, string> = {
    "India Gate":
      "National war memorial and evening lawns; great for photos and street snacks nearby.",
    "Red Fort":
      "Historic Mughal fort — explore museums and the surrounding Chandni Chowk markets.",
    "Qutub Minar":
      "UNESCO site with Indo-Islamic architecture and nearby archaeological zone.",
    "Lotus Temple":
      "Bahá'í House of Worship noted for its lotus-shaped architecture and tranquil gardens.",
    "Humayun's Tomb":
      "Precursor to the Taj Mahal — landscaped gardens and peaceful walks.",
    "Jama Masjid":
      "Grand mosque near Old Delhi; climb the minaret for city views.",
    "Connaught Place":
      "Central shopping and dining district with colonial-era architecture.",
    "Chandni Chowk & Old Delhi food walk":
      "Bustling lanes for street food, spices and traditional markets.",
    "Akshardham Temple":
      "Modern temple complex with exhibitions, gardens and evening water shows.",
    "Lodhi Garden":
      "Large landscaped gardens — perfect for morning walks and birdwatching.",
    "Hauz Khas Village":
      "Trendy neighbourhood with historic ruins, cafes and boutiques.",
    "Dilli Haat":
      "Open-air crafts & food bazaar showcasing regional handicrafts and cuisine.",
    "National Museum":
      "One of India's largest museums with extensive archaeological collections.",
    "Gurudwara Bangla Sahib":
      "Sikh gurdwara known for its serene sarovar and community kitchen.",
  };
  return map[loc] ?? "Explore this place — local culture, food and experiences await.";
}
