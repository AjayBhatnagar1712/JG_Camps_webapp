"use client";

import Image from "next/image";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  MapPinned,
  MessageCircle,
  Route,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const DATA = {
  name: "Leh & Ladakh",
  image: "/images/north-india/leh-ladakh/leh-hero.jpg",
  bestSeason: "May - Sep",
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
    "High-altitude desert landscapes, pristine lakes, Buddhist monasteries, and dramatic Himalayan passes for adventure and culture.",
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
  "Acclimatise in Leh for 1-2 days before driving to high passes.",
  "Carry prescription meds and a basic altitude sickness kit.",
  "Book permits and vehicle support in advance for remote routes.",
  "Respect monastery rules: dress modestly, remove shoes where indicated, and ask before photographing monks.",
];

const DONT_S = [
  "Do not rush to high passes on the day you arrive in Leh.",
  "Avoid alcohol for the first 24-48 hours after arrival.",
  "Do not leave litter at lakes or campsites. Ladakh is ecologically fragile.",
  "Avoid off-trail driving in protected or fragile areas.",
];

const GLANCE = [
  ["Pace", "Altitude-aware"],
  ["Mood", "Lakes, passes, monasteries"],
  ["Best for", "Couples, families, small groups"],
];

export default function LehLadakhPage() {
  const openContact = () => window.dispatchEvent(new Event("open-contact-expert"));

  const openPlannerWith = (state: string, location?: string) => {
    window.dispatchEvent(new CustomEvent("open-planner-with", { detail: { state, location } }));
  };

  const createItineraryAuto = () => openPlannerWith(DATA.name);

  return (
    <main className="bg-[#020712] text-white">
      <section className="relative min-h-[62vh] overflow-hidden">
        <Image src={DATA.image} alt={DATA.name} fill priority className="object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,7,18,0.94),rgba(2,7,18,0.56),rgba(2,7,18,0.18)),linear-gradient(180deg,rgba(2,7,18,0.16),#020712_96%)]" />

        <div className="relative z-10 mx-auto grid min-h-[62vh] max-w-7xl items-end gap-8 px-4 pb-12 pt-20 sm:px-6 lg:grid-cols-[1fr_360px]">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/16 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-cyan-100 backdrop-blur">
              <MapPinned className="h-4 w-4 text-amber-200" />
              High altitude private route
            </div>
            <h1 className="mt-5 text-[clamp(3rem,7vw,6.6rem)] font-black leading-[0.9] tracking-tight">{DATA.name}</h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-200 sm:text-lg">{DATA.highlights}</p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <button onClick={createItineraryAuto} className="inline-flex items-center justify-center gap-2 rounded-lg bg-amber-200 px-5 py-3 text-sm font-black text-slate-950 shadow-2xl shadow-black/20 hover:bg-amber-100">
                Create itinerary <CalendarDays className="h-4 w-4" />
              </button>
              <button onClick={openContact} className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/10 px-5 py-3 text-sm font-black text-white backdrop-blur hover:bg-white/15">
                Personalize with expert <MessageCircle className="h-4 w-4" />
              </button>
            </div>
          </div>

          <aside className="rounded-lg border border-white/14 bg-black/24 p-4 shadow-2xl shadow-black/30 backdrop-blur-xl">
            <div className="text-xs font-black uppercase tracking-[0.18em] text-amber-200">Route intelligence</div>
            <div className="mt-4 grid gap-3">
              {GLANCE.map(([label, value]) => (
                <div key={label} className="rounded-md border border-white/10 bg-white/7 p-3">
                  <div className="text-[11px] font-black uppercase tracking-[0.14em] text-slate-400">{label}</div>
                  <div className="mt-1 text-sm font-black text-white">{value}</div>
                </div>
              ))}
              <div className="rounded-md border border-amber-200/25 bg-amber-200/12 p-3">
                <div className="text-[11px] font-black uppercase tracking-[0.14em] text-amber-100">Best season</div>
                <div className="mt-1 text-sm font-black text-white">{DATA.bestSeason}</div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="relative overflow-hidden px-4 py-12 sm:px-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_0%,rgba(125,211,252,0.13),transparent_26rem),linear-gradient(180deg,#020712,#061524_52%,#020712)]" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="grid gap-5 lg:grid-cols-[0.9fr_1.4fr]">
            <div className="rounded-lg border border-white/12 bg-white/[0.06] p-5 shadow-2xl shadow-black/20 backdrop-blur">
              <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-cyan-200">
                <Sparkles className="h-4 w-4" />
                Signature mood
              </div>
              <h2 className="mt-4 text-3xl font-black tracking-tight md:text-5xl">Cold desert, blue lakes, monastery mornings.</h2>
              <p className="mt-4 text-sm leading-7 text-slate-300">
                A route here needs careful pacing, dependable vehicles, selected stays and enough breathing room between the big scenes.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {DATA.famousPlaces.slice(0, 7).map((place) => (
                  <span key={place} className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs font-bold text-slate-200">
                    {place}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-white/12 bg-white/[0.06] p-5 shadow-2xl shadow-black/20 backdrop-blur">
              <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
                <div>
                  <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-amber-200">
                    <Route className="h-4 w-4" />
                    Experiences
                  </div>
                  <h2 className="mt-2 text-3xl font-black tracking-tight">Choose a scene to plan.</h2>
                </div>
                <button onClick={createItineraryAuto} className="inline-flex w-fit items-center gap-2 rounded-lg border border-white/14 bg-white/8 px-4 py-2.5 text-sm font-black text-white hover:bg-white/14">
                  Full route <ArrowRight className="h-4 w-4" />
                </button>
              </div>

              <div className="grid max-h-[640px] gap-3 overflow-y-auto pr-1 sm:grid-cols-2">
                {LOCATIONS.map((loc, index) => (
                  <article key={loc} className="group rounded-lg border border-white/10 bg-black/20 p-4 transition hover:-translate-y-1 hover:border-amber-200/55 hover:bg-black/28">
                    <div className="flex items-start justify-between gap-3">
                      <span className="grid h-8 w-8 flex-none place-items-center rounded-full bg-white text-xs font-black text-slate-950">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <button onClick={() => openPlannerWith(DATA.name, loc)} className="rounded-full border border-white/12 px-3 py-1 text-xs font-black text-slate-200 transition hover:border-amber-200 hover:text-amber-100">
                        Plan
                      </button>
                    </div>
                    <h3 className="mt-4 text-lg font-black text-white">{shortLabel(loc)}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-300">{getShortDescriptionFor(loc)}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-5 grid gap-5 lg:grid-cols-2">
            <div className="rounded-lg border border-white/12 bg-white/[0.06] p-5 backdrop-blur">
              <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-cyan-200">
                <ShieldCheck className="h-4 w-4" />
                Travel smart
              </div>
              <div className="mt-4 grid gap-3">
                {DOS.map((item) => (
                  <div key={item} className="rounded-md border border-white/10 bg-black/18 p-3 text-sm leading-6 text-slate-200">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-amber-200/18 bg-amber-200/[0.07] p-5 backdrop-blur">
              <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-amber-200">
                <AlertTriangle className="h-4 w-4" />
                Avoid
              </div>
              <div className="mt-4 grid gap-3">
                {DONT_S.map((item) => (
                  <div key={item} className="rounded-md border border-white/10 bg-black/18 p-3 text-sm leading-6 text-slate-200">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-5 rounded-lg border border-white/12 bg-white p-5 text-slate-950 shadow-2xl shadow-black/20 md:flex md:items-center md:justify-between md:gap-6">
            <div>
              <div className="text-xs font-black uppercase tracking-[0.18em] text-sky-700">Concierge route build</div>
              <h2 className="mt-2 text-3xl font-black tracking-tight">Plan {DATA.name} without altitude mistakes.</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                Share dates and comfort level. Journey Gate will shape the route, permits, stays and transport flow.
              </p>
            </div>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row md:mt-0">
              <button onClick={createItineraryAuto} className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-950 px-5 py-3 text-sm font-black text-white">
                Create itinerary <CalendarDays className="h-4 w-4" />
              </button>
              <button onClick={openContact} className="inline-flex items-center justify-center gap-2 rounded-lg bg-amber-200 px-5 py-3 text-sm font-black text-slate-950">
                Expert help <MessageCircle className="h-4 w-4" />
              </button>
              <Link href="/india/north" className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 px-5 py-3 text-sm font-black text-slate-800">
                <ArrowLeft className="h-4 w-4" /> Routes
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function shortLabel(loc: string) {
  const match = loc.match(/^([^(,]+)/);
  return match ? match[1].trim() : loc;
}

function getShortDescriptionFor(loc: string) {
  const map: Record<string, string> = {
    "Leh Town & Leh Bazaar": "Historic market, cafes, shops and acclimatisation hub with scenic viewpoints.",
    "Shanti Stupa": "White-domed peace pagoda offering sunrise and sunset views over Leh.",
    "Leh Palace": "Nine-storey palace overlooking Leh with history and a strong vantage point.",
    "Hemis Monastery": "Largest monastery in Ladakh, known for the Hemis Festival and rich Buddhist heritage.",
    "Thiksey Monastery": "Beautiful gompa with assembly hall and panoramic views across the valley.",
    "Shey Palace & Gompa": "Former summer capital with a seated Buddha statue and historic ruins.",
    "Alchi Monastery": "Ancient monastery famed for rare murals and Kashmiri-influenced artwork.",
    "Nubra Valley (Diskit, Hunder)": "Green valleys, double-humped camels and scenic drives via Khardung La.",
    "Pangong Tso (Spangmik, Lukung)": "High-altitude lake known for shifting blue hues and cinematic horizons.",
    "Tso Moriri (Korzok)": "Remote, serene high-altitude lake with nomadic Changpa settlements.",
    "Khardung La (pass)": "Gateway to Nubra Valley and one of the most iconic high-pass drives.",
    "Magnetic Hill": "Optical-illusion stretch reputed to show cars rolling uphill.",
    "Hunder Sand Dunes (camel safaris)": "Cold desert dunes in Nubra with camel safari experiences.",
    "Zanskar Valley (Padum, Phuktal)": "Remote valley for multi-day treks and the famous Phuktal monastery cave complex.",
    "Suru Valley & Kargil approach": "Lush valley extending toward Kargil with villages and scenic drives.",
    "Lamayuru (Moonland)": "Lunar-like rock formations and an ancient monastery with dramatic landscape.",
    "Stok Kangri base (trek start)": "Base area for high-altitude trekking with seasonal and permit considerations.",
    "Changthang plateau (nomadic settlements)": "Expansive plateau dotted with herders, remote lakes and wide sky.",
  };

  return map[loc] || "Explore this remarkable place in Ladakh with unique landscapes and cultural heritage.";
}
