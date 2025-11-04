// app/india/west/rajasthan/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

/**
 * Rajasthan index page — follows Bihar/Goa structure.
 * - Lists major destinations and quick itinerary options
 * - Auto itinerary opens /india/west/plan?state=Rajasthan
 * - "Personalize Itinerary" dispatches global event "open-contact-expert"
 */

const DATA = {
  name: "Rajasthan",
  image: "/images/west-india/rajasthan.jpg",
  bestSeason: "Oct – Mar",
  highlights:
    "Rajasthan, the ‘Land of Kings’, is known for its majestic forts, royal palaces, desert landscapes, vibrant festivals, and warm hospitality — blending heritage, culture, and adventure.",
};

const LOCATIONS = [
  "Jaipur (The Pink City)",
  "Udaipur (City of Lakes)",
  "Jodhpur (The Blue City)",
  "Jaisalmer (Golden Desert City)",
  "Mount Abu (Hill Station)",
  "Pushkar (Sacred Lake & Brahma Temple)",
  "Ajmer (Dargah Sharif & Heritage)",
  "Bikaner (Junagarh Fort & Camel Festival)",
  "Chittorgarh (Fort & Rajput Legends)",
  "Kumbhalgarh (Fort & Wildlife Sanctuary)",
  "Alwar (Bala Quila & Sariska Tiger Reserve)",
  "Bharatpur (Keoladeo National Park)",
  "Shekhawati (Havelis & Painted Towns)",
  "Ranthambore (Tiger Reserve & Fort)",
  "Neemrana (Heritage Fort Palace)",
  "Tonk (Mosques & Historical Town)",
  "Nagaur (Fort & Cattle Fair)",
  "Barmer (Handicrafts & Desert Villages)",
  "Jhunjhunu (Fresco Havelis)",
  "Pali (Temples & Textiles)",
  "Sawai Madhopur (Gateway to Ranthambore)",
  "Dungarpur (Palaces & Tribal Heritage)",
  "Bundi (Stepwells & Palaces)",
  "Kota (Chambal Garden & Garh Palace)",
  "Sirohi (Temples & Hill Views)",
];

const DOS = [
  "Respect local dress codes and customs, especially inside forts and temples.",
  "Visit during Oct–Mar for pleasant sightseeing and desert safaris.",
  "Hire certified guides at major forts like Jaipur, Jodhpur and Udaipur for better context.",
  "Try traditional Rajasthani cuisine — dal baati churma, gatte ki sabzi, and kachoris.",
];

const DONT_S = [
  "Don’t climb or deface heritage structures — many are protected monuments.",
  "Avoid desert safaris during peak summer (Apr–Jun).",
  "Don’t feed wild animals or disturb wildlife at Ranthambore or Sariska.",
  "Avoid buying handicrafts without verifying authenticity in tourist markets.",
];

export default function RajasthanPage() {
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
          <h3 className="font-semibold mb-3">Top Destinations in Rajasthan</h3>
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
          <h4 className="font-semibold mb-2">Plan your Rajasthan trip</h4>
          <p className="text-gray-600 mb-4">
            From royal Jaipur and lake-filled Udaipur to the deserts of Jaisalmer and tigers of Ranthambore — share your
            interests and travel dates, and our team will build the perfect Rajasthan itinerary.
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
    "Jaipur (The Pink City)": "Capital city known for Amber Fort, City Palace, Hawa Mahal, and vibrant bazaars.",
    "Udaipur (City of Lakes)": "Romantic city with Lake Pichola, City Palace, and boat rides by sunset.",
    "Jodhpur (The Blue City)": "Dominated by the mighty Mehrangarh Fort and blue-painted old town houses.",
    "Jaisalmer (Golden Desert City)": "Famous for Jaisalmer Fort, desert camps, and Sam Sand Dunes.",
    "Mount Abu (Hill Station)": "Cool hill retreat with Dilwara Temples and Nakki Lake.",
    "Pushkar (Sacred Lake & Brahma Temple)": "Pilgrimage town known for the only Brahma temple and annual Camel Fair.",
    "Ajmer (Dargah Sharif & Heritage)": "Spiritual centre with Ajmer Sharif Dargah and Ana Sagar Lake.",
    "Bikaner (Junagarh Fort & Camel Festival)": "Historic desert city known for forts, sweets, and camel breeding.",
    "Chittorgarh (Fort & Rajput Legends)": "Massive fort with tales of valor and architectural grandeur.",
    "Kumbhalgarh (Fort & Wildlife Sanctuary)": "Famed for its fort walls and nearby wildlife sanctuary.",
    "Alwar (Bala Quila & Sariska Tiger Reserve)": "Gateway city near Delhi offering forts and tiger spotting.",
    "Bharatpur (Keoladeo National Park)": "UNESCO bird sanctuary hosting thousands of migratory birds.",
    "Shekhawati (Havelis & Painted Towns)": "Region of beautifully frescoed mansions and artistic heritage.",
    "Ranthambore (Tiger Reserve & Fort)": "Premier wildlife park famous for tigers and ancient fort ruins.",
    "Neemrana (Heritage Fort Palace)": "Restored heritage fort turned boutique hotel close to Delhi-Jaipur highway.",
    "Tonk (Mosques & Historical Town)": "Town known for Islamic architecture and old manuscripts.",
    "Nagaur (Fort & Cattle Fair)": "Desert town known for annual cattle fair and fort architecture.",
    "Barmer (Handicrafts & Desert Villages)": "Famous for folk art, embroidery, and remote desert experiences.",
    "Jhunjhunu (Fresco Havelis)": "Town filled with grand havelis adorned with intricate frescoes.",
    "Pali (Temples & Textiles)": "Known for textile industry and historic temples near Jodhpur.",
    "Sawai Madhopur (Gateway to Ranthambore)": "Base town for Ranthambore Tiger Reserve.",
    "Dungarpur (Palaces & Tribal Heritage)": "Southern Rajasthan town with picturesque palaces and tribal culture.",
    "Bundi (Stepwells & Palaces)": "Town of ornate stepwells, murals, and lesser-known palaces.",
    "Kota (Chambal Garden & Garh Palace)": "Industrial city with charming gardens and heritage buildings.",
    "Sirohi (Temples & Hill Views)": "Gateway to Mount Abu and serene temple circuits.",
  };
  return map[loc] || "Explore Rajasthan’s heritage, deserts, wildlife, and royal cities.";
}
