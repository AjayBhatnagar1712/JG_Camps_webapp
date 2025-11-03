// app/india/north/punjab/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

const DATA = {
  name: "Punjab",
  image: "/images/north-india/punjab.jpg",
  bestSeason: "Oct – Mar",
  famousPlaces: ["Amritsar", "Golden Temple", "Wagah Border"],
  highlights: "Warm hospitality, Sikh heritage and hearty cuisine.",
};

const POPULAR_LOCATIONS = [
  "Amritsar (Golden Temple)",
  "Wagah Border",
  "Jallianwala Bagh",
  "Anandpur Sahib",
  "Patiala",
  "Ludhiana",
  "Bathinda",
  "Hoshiarpur",
  "Kapurthala",
  "Rupnagar (Ropar)",
  "Phagwara",
  "Kiratpur Sahib",
  "Talwandi Sabo (Damdama Sahib)",
];

const DOS = [
  "Dress modestly at gurdwaras and follow local customs inside religious sites.",
  "Remove shoes and wash hands/feet where required before entering prayer halls.",
  "Try local Punjabi cuisine — langar, Amritsari kulcha, and makki-roti with sarson ka saag.",
  "Use authorised guides or official transport options when visiting border ceremonies and rural sites.",
  "Carry water and sun protection during daytime visits to open monuments and forts.",
];

const DONT_S = [
  "Don't take photographs where signs prohibit them (some religious interiors).",
  "Don't enter inner sanctums with uncovered heads — always keep a scarf or head-covering.",
  "Avoid unregulated guides in crowded areas; prefer recommended/local-authority guides.",
  "Don't leave personal belongings unattended in busy markets or at transport hubs.",
];

export default function PunjabPage() {
  const openContact = () => window.dispatchEvent(new Event("open-contact-expert"));

  // Combined approach: dispatch event for planner modal + navigate as fallback
  const openPlannerWith = (city: string, location?: string) => {
    try {
      window.dispatchEvent(new CustomEvent("open-planner-with", { detail: { city, location } }));
    } catch (e) {
      // ignore
    }

    // Fallback navigation to planner page with query params
    const params = new URLSearchParams({ city });
    if (location) params.append("location", location);
    window.location.href = `/india/north/plan?${params.toString()}`;
  };

  const createItineraryAuto = () => openPlannerWith("Punjab");

  return (
    <main className="bg-white text-slate-800">
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
              <div key={loc} className="rounded-lg p-3 bg-white border border-gray-100 shadow-sm">
                <div className="font-medium text-emerald-800">{loc}</div>
                <div className="text-sm text-gray-600 mt-1">{getShortDescriptionFor(loc)}</div>
                <div className="mt-2">
                  <button
                    onClick={() => openPlannerWith("Punjab", loc)}
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
            Tell us your dates & preferences — our experts will craft a custom itinerary and help with bookings.
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

            <Link href="/india/north" className="inline-flex items-center px-6 py-3 rounded-2xl border border-emerald-200 text-emerald-800">
              Back to North
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

/* helper to generate a short label for buttons */
function shortLabel(loc: string) {
  const match = loc.match(/^([^(]+)/);
  return match ? match[1].trim() : loc;
}

/* Short descriptions for popular Punjab spots */
function getShortDescriptionFor(loc: string) {
  const map: Record<string, string> = {
    "Amritsar (Golden Temple)":
      "Home to the Harmandir Sahib (Golden Temple) — spiritual centre, langar and historic lanes.",
    "Wagah Border":
      "Daily flag-lowering ceremony between India and Pakistan — patriotic spectacle at sunset.",
    "Jallianwala Bagh":
      "Historic memorial park adjacent to the Golden Temple marking the 1919 massacre.",
    "Anandpur Sahib":
      "Important Sikh pilgrimage town with forts and vibrant festivals like Hola Mohalla.",
    "Patiala":
      "Royal city known for its palaces (Qila Mubarak), traditional patiala shahi turban and juttis.",
    "Ludhiana":
      "Industrial city with shopping, Punjabi food and nearby rural craft experiences.",
    "Bathinda":
      "Historic city with forts and nearby thermal springs/fortified heritage.",
    "Hoshiarpur":
      "Gateway to scenic hills and known for traditional crafts and temples.",
    "Kapurthala":
      "City with Indo-French architecture, palaces and serene gardens.",
    "Rupnagar (Ropar)":
      "Archaeological sites, wetlands and the scenic Ropar Wetland area for birding.",
    "Phagwara":
      "Well-connected town known for Gurdwaras and as a travel stop between major cities.",
    "Kiratpur Sahib":
      "Sikh historical town on the banks of the Sutlej with gurudwara heritage.",
    "Talwandi Sabo (Damdama Sahib)":
      "One of the five Takhts of Sikhism — important place of pilgrimage and learning.",
  };
  return map[loc] ?? "Explore this place — local culture, food and experiences await.";
}
