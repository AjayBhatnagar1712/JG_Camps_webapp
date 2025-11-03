// app/india/north/himachal-pradesh/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

const DATA = {
  name: "Himachal Pradesh",
  image: "/images/north-india/himachal.jpg",
  bestSeason: "Mar – Jun, Sep – Nov",
  famousPlaces: [
    "Shimla",
    "Manali",
    "Dharamshala / McLeod Ganj",
    "Kullu",
    "Spiti Valley",
  ],
  highlights:
    "Alpine valleys, apple orchards, high mountain passes, Tibetan culture and spectacular treks.",
};

// Major Himachal locations — included so each can be planned individually
const POPULAR_LOCATIONS = [
  "Shimla (Mall Road & Ridge)",
  "Manali (Solang / Old Manali)",
  "Dharamshala (McLeod Ganj & Tibetan culture)",
  "Kullu Valley",
  "Kasol & Parvati Valley",
  "Spiti Valley (Kaza, Kibber)",
  "Lahaul & Keylong",
  "Kinnaur (Kalpa, Sangla, Chitkul)",
  "Kasauli",
  "Chamba",
  "Dalhousie",
  "Palampur",
  "Tattapani (hot springs)",
  "Solan",
  "Narkanda",
  "Rampur",
  "Barot",
  "Shoja / Jalori Pass",
  "Khajjiar (mini Switzerland of India)",
  "Bilaspur",
  "Kangra (Fort & valleys)",
  "Jogindernagar",
  "Rohtang Pass / Atal Tunnel access",
  "Great Himalayan National Park",
  "Chitkul (the last village)",
];

const DOS = [
  "Carry warm clothes for mornings/evenings — mountain weather changes quickly.",
  "Pre-book stays in peak season (May–Jun & Oct) for Manali, Shimla and Dharamshala.",
  "Check road status and permit requirements for Lahaul-Spiti and Rohtang/Atal Tunnel access.",
  "Use local guides for high-altitude treks (Spiti, GHNP) and follow safety guidance.",
  "Support local businesses: buy local handicrafts and apples from orchards.",
];

const DONT_S = [
  "Don't attempt high-altitude treks without acclimatisation and a guide.",
  "Avoid driving in heavy rain/landslide season — check local advisories.",
  "Don't litter or damage fragile alpine ecosystems — carry your trash back.",
  "Avoid opening fire in forests; follow park rules in protected areas.",
  "Don't stray from marked trails in the Great Himalayan National Park and Spiti.",
];

export default function HimachalPage() {
  const openContact = () => window.dispatchEvent(new Event("open-contact-expert"));

  const openPlannerWith = (state: string, location?: string) => {
    try {
      window.dispatchEvent(
        new CustomEvent("open-planner-with", { detail: { state, location } })
      );
    } catch (e) {
      // ignore
    }

    const params = new URLSearchParams({ state });
    if (location) params.append("location", location);
    // follow same pattern as other pages — redirect to planner route with params
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
                <li key={d} className="mb-2">{d}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl bg-slate-50 p-6 border border-gray-100">
            <h4 className="font-semibold mb-3">Don'ts</h4>
            <ul className="list-disc pl-6 text-gray-700">
              {DONT_S.map((d) => (
                <li key={d} className="mb-2">{d}</li>
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

/* Short descriptions for Himachal spots */
function getShortDescriptionFor(loc: string) {
  const map: Record<string, string> = {
    "Shimla (Mall Road & Ridge)": "Colonial hill capital with Mall Road, ridge walks, and nearby Jakhu temple.",
    "Manali (Solang / Old Manali)": "Gateway to Rohtang, adventure sports in Solang and cosy cafes in Old Manali.",
    "Dharamshala (McLeod Ganj & Tibetan culture)": "Tibetan culture hub, Dalai Lama residence and Himalayan viewpoints.",
    "Kullu Valley": "River valleys, rafting festivals and scenic drives toward Manali.",
    "Kasol & Parvati Valley": "Backpacker haven, scenic trails and gateway to Kheerganga trek.",
    "Spiti Valley (Kaza, Kibber)": "High-altitude desert valley with monasteries, lunar landscapes and trekking.",
    "Lahaul & Keylong": "Remote high-altitude region with mountain passes and solitude.",
    "Kinnaur (Kalpa, Sangla, Chitkul)": "Apple orchards, high Himalayan passes and stunning Sangla valley.",
    "Kasauli": "Quiet cantonment town with pleasant walks and colonial charm.",
    "Chamba": "Historic town with temples, scenic lakes and traditional Himachali culture.",
    "Dalhousie": "Victorian-era hill station with forests, walks and nearby Khajjiar.",
    "Palampur": "Tea gardens, trout farms and Himalayan views.",
    "Tattapani (hot springs)": "Hot springs on the banks of the Sutlej — popular for relaxation and river rafting nearby.",
    "Solan": "Gateway town, breweries, and pine-covered hills.",
    "Narkanda": "Apple orchards and skiing in winter, great snow viewpoints.",
    "Rampur": "Old hill town with easy access to tribal Himachal areas.",
    "Barot": "Quiet riverside valley good for angling and slow escapes.",
    "Shoja / Jalori Pass": "Tranquil hamlet and a pass popular for short treks and forest walks.",
    "Khajjiar (mini Switzerland of India)": "Meadowland with a small lake surrounded by deodar forests — very photogenic.",
    "Bilaspur": "Lakeside town with Bhakra Dam nearby and cultural attractions.",
    "Kangra (Fort & valleys)": "Kangra Fort, temples and broad Kangra valley vistas.",
    "Jogindernagar": "Industrial town with scenic railway and river valley access.",
    "Rohtang Pass / Atal Tunnel access": "High mountain pass access; check weather and permit status before travel.",
    "Great Himalayan National Park": "Biodiversity hotspot — trekking, wildlife and alpine meadows (permit required).",
    "Chitkul (the last village)": "One of India's last inhabited villages on the old Indo-Tibetan trade route — stunning valley views.",
  };
  return map[loc] ?? "Explore this place — local culture, food and experiences await.";
}
