// app/india/north/jammu-and-kashmir/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

/**
 * Jammu & Kashmir page
 * - Contains a hero, description, list of popular locations (with short descriptions)
 * - Buttons:
 *    - Create Itinerary (auto) -> opens planner with state (and optional location) and redirects to /india/north/plan
 *    - Personalize Itinerary -> triggers global "open-contact-expert" event
 *
 * Note: Leh & Ladakh are handled separately under /india/north/leh-ladakh.
 */

const DATA = {
  name: "Jammu & Kashmir",
  image: "/images/north-india/jammu.jpg",
  bestSeason: "May – Sep (summer), Dec – Feb (winter sports regionally)",
  famousPlaces: [
    "Srinagar (Dal Lake & Mughal Gardens)",
    "Gulmarg (skiing & gondola)",
    "Pahalgam (Aru & Betaab Valley)",
    "Sonamarg (Thajiwas Glacier)",
    "Jammu (Vaishno Devi base, Raghunath Temple)",
  ],
  highlights:
    "Alpine lakes, Mughal gardens, high mountain passes, pilgrimage circuits and Kashmiri culture — rich in scenic drives, valleys and winter sports.",
};

// Popular locations across Jammu & Kashmir (extensive but not exhaustive)
const POPULAR_LOCATIONS = [
  "Srinagar (Dal Lake & Mughal Gardens)",
  "Gulmarg (Apharwat Peak & Gondola)",
  "Pahalgam (Aru Valley & Betaab Valley)",
  "Sonamarg (Thajiwas Glacier & river walks)",
  "Jammu City (Raghunath Temple & old bazaars)",
  "Katra (base for Vaishno Devi)",
  "Patnitop (pine meadows & viewpoints)",
  "Bhaderwah (scenic valley escapes)",
  "Doda (hilly circuits & river valleys)",
  "Kishtwar (remote highland region)",
  "Anantnag (Verinag, springs & gateways)",
  "Pulwama (scenic rural valleys)",
  "Shopian (apple orchards & valley vistas)",
  "Bandipora (Wular Lake region)",
  "Baramulla (gateway to north Kashmir)",
  "Kupwara (northern valley access)",
  "Ramban (NH44 valley stretch & puna views)",
  "Ramban (Chenab valley viewpoints)",
  "Rajouri (hilly border district with scenic spots)",
  "Poonch (fort, lakes and border landscapes)",
  "Udhampur (military town & nearby scenic spots)",
  "Kathua (lowland plains & rural culture)",
  "Yusmarg (meadows & short treks)",
  "Doodhpathri (meadows & streams)",
  "Wular Lake (one of Asia's largest freshwater lakes)",
  "Shankaracharya Temple (Srinagar viewpoint)",
  "Hazratbal Shrine (Srinagar)",
  "Nishat Bagh (Mughal garden)",
  "Shalimar Bagh (Mughal garden)",
  "Aru Valley (near Pahalgam)",
  "Lidder Valley (Pahalgam river valley)",
  "Betaab Valley (Pahalgam attraction)",
];

const DOS = [
  "Carry layers — mountain and valley weather can change quickly.",
  "Respect local customs, especially around religious sites and rural communities.",
  "Use local guides for high-altitude excursions and early-morning treks.",
  "Check road/permit status (especially for Sonamarg, Gulmarg and high passes) during winter.",
  "Support local handicrafts and Kashmiri cuisine from responsible vendors.",
];

const DONT_S = [
  "Don't attempt high-altitude or glacier treks without acclimatisation and a guide.",
  "Avoid taking photos where locals request privacy (religious rituals, private gatherings).",
  "Don't litter — many areas are ecologically fragile.",
  "Avoid traveling into restricted or military zones without permits.",
];

export default function JammuAndKashmirPage() {
  const openContact = () => window.dispatchEvent(new Event("open-contact-expert"));

  const openPlannerWith = (state: string, location?: string) => {
    try {
      // Fire a custom event that a planner/listener could use
      window.dispatchEvent(
        new CustomEvent("open-planner-with", { detail: { state, location } })
      );
    } catch (e) {
      // ignore if event fails
    }

    // Also redirect to planner route with query params so existing planner page works the same way
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

      {/* CONTENT */}
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

/* helper to generate a short label for buttons */
function shortLabel(loc: string) {
  const match = loc.match(/^([^(]+)/);
  return match ? match[1].trim() : loc;
}

/* Short descriptions for Jammu & Kashmir spots */
function getShortDescriptionFor(loc: string) {
  const map: Record<string, string> = {
    "Srinagar (Dal Lake & Mughal Gardens)": "Houseboats, shikaras, Mughal-era gardens like Nishat & Shalimar and the old city.",
    "Gulmarg (Apharwat Peak & Gondola)": "Famous skiing destination with one of the highest gondolas and alpine meadows.",
    "Pahalgam (Aru Valley & Betaab Valley)": "Scenic valley, river walks, base for treks and the Betaab film valley.",
    "Sonamarg (Thajiwas Glacier & river walks)": "Gateway to high-altitude passes, glaciers and riverine meadows.",
    "Jammu City (Raghunath Temple & old bazaars)": "Pilgrimage and cultural hub with temples, bazaars and traditional Punjabi-style cuisine.",
    "Katra (base for Vaishno Devi)": "Pilgrim town serving as the access point for the Vaishno Devi shrine.",
    "Patnitop (pine meadows & viewpoints)": "Easy hill resort with meadows, walking trails and viewpoints along NH44.",
    "Bhaderwah (scenic valley escapes)": "Lush valleys, meadows and offbeat rural experiences away from the main tourist hubs.",
    "Doda (hilly circuits & river valleys)": "River valleys and hill circuits offering quieter local experiences.",
    "Kishtwar (remote highland region)": "Remote high-altitude district famed for scenic passes and heli-accessible areas.",
    "Anantnag (Verinag, springs & gateways)": "Verinag spring, Mughal-era gardens and access to alpine valleys.",
    "Pulwama (scenic rural valleys)": "Agricultural valley known for saffron fields in nearby areas and rural scenery.",
    "Shopian (apple orchards & valley vistas)": "Known for apple orchards and scenic valley views.",
    "Bandipora (Wular Lake region)": "Proximity to Wular Lake — boating and birdlife in a vast freshwater lake.",
    "Baramulla (gateway to north Kashmir)": "Historic town with riverfronts and access to the upper valley.",
    "Kupwara (northern valley access)": "Access point for northernmost valley stretches, forested hill routes.",
    "Ramban (Chenab valley viewpoints)": "Scenic stretches along NH44 with river gorge viewpoints.",
    "Rajouri (hilly border district with scenic spots)": "Hilly district with rustic culture and mountain vistas.",
    "Poonch (fort, lakes and border landscapes)": "Historic forts, lakes and cross-border landscapes.",
    "Udhampur (military town & nearby scenic spots)": "Base for journeys to Patnitop and other hill stations; military presence.",
    "Kathua (lowland plains & rural culture)": "Lower-elevation district with cultural sites and easier climate.",
    "Yusmarg (meadows & short treks)": "Meadowland with pine forests and easy walking trails.",
    "Doodhpathri (meadows & streams)": "Emerging meadow destination with tranquil streams and grasslands.",
    "Wular Lake (one of Asia's largest freshwater lakes)": "Important wetland for birdlife and boating experiences (seasonal water levels).",
    "Shankaracharya Temple (Srinagar viewpoint)": "Ancient hilltop temple offering panoramic views of Srinagar.",
    "Hazratbal Shrine (Srinagar)": "Important religious site on the banks of Dal with deep community significance.",
    "Nishat Bagh (Mughal garden)": "Terraced Mughal garden with views over Dal Lake.",
    "Shalimar Bagh (Mughal garden)": "Historic Mughal garden with formal landscaping and water channels.",
    "Aru Valley (near Pahalgam)": "Quiet valley ideal for short hikes, pony rides and scenic photography.",
    "Lidder Valley (Pahalgam river valley)": "River valley with trout fishing, riverside walks and green meadows.",
    "Betaab Valley (Pahalgam attraction)": "Popular valley named after a Bollywood film — photogenic and accessible.",
  };
  return map[loc] ?? "Explore this place — local culture, food and experiences await.";
}
