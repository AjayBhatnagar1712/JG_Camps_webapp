// app/india/west/goa/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

/**
 * Goa index page — follows the same structure as the Bihar page you supplied.
 * - Lists major destinations
 * - "Create Itinerary (Auto)" navigates to /india/west/plan?state=Goa (and optional location)
 * - "Personalize Itinerary" dispatches global event "open-contact-expert"
 * - Each location has Plan (auto) and Personalize actions
 */

const DATA = {
  name: "Goa",
  image: "/images/west-india/goa.jpg",
  bestSeason: "Nov – Feb",
  highlights:
    "Goa is famed for sun-kissed beaches, Portuguese-influenced heritage, vibrant nightlife, serene backwaters and spice plantations — an ideal mix of party, culture and quiet escapes.",
};

const LOCATIONS = [
  "Panaji (Panjim) — Latin Quarter & riverside promenade",
  "Old Goa — Basilica of Bom Jesus & Se Cathedral",
  "Calangute — lively beach, water sports",
  "Baga — nightlife & beach shacks",
  "Anjuna — flea market, bohemian scene",
  "Vagator — cliffs, Chapora Fort & sunsets",
  "Candolim — beaches & resorts",
  "Miramar — urban beach near Panaji",
  "Colva — family-friendly southern beach",
  "Benaulim — quiet beaches & seafood",
  "Palolem — serene crescent beach (South Goa)",
  "Agonda — secluded beach & turtle nesting (seasonal)",
  "Dudhsagar Waterfalls — waterfall & jeep/trek access",
  "Spice Plantations (Ponda) — guided tours & local meals",
  "Fort Aguada — lighthouse & coastal views",
  "Chapora Fort — iconic sunset viewpoint",
  "Fontainhas (Latin Quarter) — Portuguese heritage streets",
  "Butterfly Beach — hidden cove (boat access)",
  "Divar Island — rural island close to Panaji",
  "Chorao Island / Salim Ali Bird Sanctuary — birding & mangroves",
  "Cabo de Rama — cliff-top fort & views",
  "Netravali Wildlife Sanctuary — wildlife & waterfalls",
  "Mollem / Bhagwan Mahavir Sanctuary — nature & trekking",
];

const DOS = [
  "Respect local fishing communities and private property on village beaches.",
  "Visit during Nov–Feb for best beach weather and outdoor activities.",
  "Hire authorized guides for wildlife reserves and book safaris in advance.",
  "Try local Goan cuisine — xacuti, prawn curry, bebinca and street seafood safely.",
];

const DONT_S = [
  "Don't litter on beaches — carry a bag for waste and dispose at proper bins.",
  "Avoid trespassing on private villas / resorts; many coastal stretches are private.",
  "Don’t disturb nesting turtles (Agonda/Palolem nesting season) — follow local guidelines.",
  "Avoid reckless water sports without proper safety checks and certified operators.",
];

export default function GoaPage() {
  const openContact = () => window.dispatchEvent(new Event("open-contact-expert"));

  const openPlannerWith = (state: string, location?: string) => {
    try {
      window.dispatchEvent(new CustomEvent("open-planner-with", { detail: { state, location } }));
    } catch {
      // noop if event fails
    }
    const params = new URLSearchParams({ state });
    if (location) params.append("location", location);
    // Navigate to plan page with params so the planner can read them
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
          <h3 className="font-semibold mb-3">Top Destinations in Goa</h3>
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
          <h4 className="font-semibold mb-2">Plan your Goa trip</h4>
          <p className="text-gray-600 mb-4">
            From lively northern beaches and historic Old Goa to peaceful southern bays and spice plantations — tell us your travel style and dates, and we’ll craft the perfect Goan itinerary.
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
    "Panaji (Panjim) — Latin Quarter & riverside promenade": "Capital with Portuguese-era Fontainhas, riverside walks and boat cruises on the Mandovi.",
    "Old Goa — Basilica of Bom Jesus & Se Cathedral": "Historic churches, UNESCO architecture and colonial-era chapels.",
    "Calangute — lively beach, water sports": "Large sandy beach popular for water sports, shopping and nightlife nearby.",
    "Baga — nightlife & beach shacks": "Famous for lively beach shacks, parties and watersports.",
    "Anjuna — flea market, bohemian scene": "Known for its flea market, trance parties and a relaxed boho vibe.",
    "Vagator — cliffs, Chapora Fort & sunsets": "Clifftop views, scenic beaches and the iconic Chapora Fort.",
    "Candolim — beaches & resorts": "Calm beachfront, resort stays and proximity to Aguada Fort.",
    "Miramar — urban beach near Panaji": "Convenient city beach for evening walks and sunsets near Panaji.",
    "Colva — family-friendly southern beach": "Popular with families for calm sands and local eateries.",
    "Benaulim — quiet beaches & seafood": "Quieter southern beach with a relaxed village atmosphere and fresh seafood.",
    "Palolem — serene crescent beach (South Goa)": "Beautiful crescent-shaped beach ideal for relaxed stays and kayaking.",
    "Agonda — secluded beach & turtle nesting (seasonal)": "Peaceful beach known for turtle nesting and quiet retreats.",
    "Dudhsagar Waterfalls": "Spectacular multi-tier waterfall reachable by jeep or train-rail trail; a popular day-trip adventure.",
    "Spice Plantations (Ponda) — guided tours & local meals": "Lush plantations offering tours, spice tastings and Goan home-cooked meals.",
    "Fort Aguada — lighthouse & coastal views": "17th-century fort with lighthouse and panoramic Arabian Sea views.",
    "Chapora Fort — iconic sunset viewpoint": "Hilltop fort with sweeping views over Vagator and the sea.",
    "Fontainhas (Latin Quarter) — Portuguese heritage streets": "Walkable quarter with colourful houses, cafes and galleries.",
    "Butterfly Beach": "A hidden cove accessible by boat — pristine and picturesque.",
    "Divar Island — rural island close to Panaji": "Peaceful island offering rural Goan life, churches and cycling routes.",
    "Chorao Island / Salim Ali Bird Sanctuary — birding & mangroves": "World-class birding in mangroves, reachable by short ferry.",
    "Cabo de Rama — cliff-top fort & views": "Fort with dramatic coastal views and quiet beaches nearby.",
    "Netravali Wildlife Sanctuary": "Dense forests, waterfalls and biodiversity — good for nature walks.",
    "Mollem / Bhagwan Mahavir Sanctuary": "Western Ghats sanctuary ideal for trekking, waterfalls and wildlife spotting.",
  };
  return map[loc] || "Explore the beaches, heritage and natural beauty of this Goan destination.";
}
