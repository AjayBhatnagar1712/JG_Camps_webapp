"use client";

import slugify from "@/lib/slugify";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CarFront,
  CheckCircle2,
  Compass,
  Hotel,
  MapPinned,
  MessageCircle,
  PhoneCall,
  Route,
  ShieldCheck,
  Star,
} from "lucide-react";
import { useCallback, useState } from "react";

type Region = {
  key: string;
  title: string;
  image: string;
  states: string[];
  blurb: string;
  href: string;
  accent: string;
};

type NorthDestination = {
  name: string;
  image: string;
  blurb: string;
  bestFor: string;
  href: string;
};

const NORTH_DESTINATIONS: NorthDestination[] = [
  {
    name: "Delhi",
    image: "/images/north-india/delhi.jpg",
    blurb: "Monuments, markets, food walks and smooth arrival logistics.",
    bestFor: "City break",
    href: "/india/north/delhi",
  },
  {
    name: "Himachal Pradesh",
    image: "/images/north-india/himachal.jpg",
    blurb: "Shimla, Manali, Dharamshala, mountain stays and road trips.",
    bestFor: "Hills",
    href: "/india/north/himachal-pradesh",
  },
  {
    name: "Uttarakhand",
    image: "/images/north-india/uttarakhand.jpg",
    blurb: "Rishikesh, Haridwar, Nainital, Mussoorie and Himalayan gateways.",
    bestFor: "Spiritual + adventure",
    href: "/india/north/uttarakhand",
  },
  {
    name: "Jammu & Kashmir",
    image: "/images/north-india/jammu.jpg",
    blurb: "Srinagar, Gulmarg, Pahalgam, lakes, meadows and winter escapes.",
    bestFor: "Premium leisure",
    href: "/india/north/jammu-and-kashmir",
  },
  {
    name: "Leh & Ladakh",
    image: "/images/north-india/leh-ladakh.jpg",
    blurb: "High passes, monasteries, Pangong, Nubra and altitude-safe pacing.",
    bestFor: "Road adventure",
    href: "/india/north/leh-ladakh",
  },
  {
    name: "Uttar Pradesh",
    image: "/images/north-india/uttar-pradesh.jpg",
    blurb: "Agra, Varanasi, Mathura, Vrindavan, Lucknow and heritage circuits.",
    bestFor: "Heritage",
    href: "/india/north/uttar-pradesh",
  },
  {
    name: "Punjab",
    image: "/images/north-india/punjab.jpg",
    blurb: "Amritsar, Golden Temple, Wagah Border, farms and warm hospitality.",
    bestFor: "Culture",
    href: "/india/north/punjab",
  },
  {
    name: "Haryana",
    image: "/images/north-india/haryana.jpg",
    blurb: "Kurukshetra, heritage stops, birding breaks and ex-Delhi trips.",
    bestFor: "Short trips",
    href: "/india/north/haryana",
  },
  {
    name: "Chandigarh",
    image: "/images/north-india/chandigarh.jpg",
    blurb: "Sukhna Lake, Rock Garden, city stays and Himachal gateway plans.",
    bestFor: "Gateway",
    href: "/india/north/chandigarh",
  },
];

const TRAVEL_GALLERY = [
  { title: "Himalayan Stays", image: "/images/north-india/himachal.jpg" },
  { title: "Heritage Days", image: "/images/north-india/delhi.jpg" },
  { title: "Kashmir Lakes", image: "/images/north-india/jammu.jpg" },
  { title: "Ladakh Roads", image: "/images/north-india/leh-ladakh.jpg" },
];

const SERVICE_CARDS: Region[] = [
  {
    key: "group-retreats",
    title: "Group Retreats",
    image: "/images/themes/group-retreats.jpg",
    blurb: "Corporate offsites, school camps, college programs, family groups, and custom departures.",
    states: ["Corporate Tours", "Training Programs", "Schools", "Colleges", "Open Tours", "Family Tours", "Spiritual & Pilgrimage", "Create Your Own Group"],
    href: "/group-retreats",
    accent: "Designed for groups",
  },
  {
    key: "spiritual-tourism",
    title: "Spiritual Tourism",
    image: "/images/themes/spiritual-tourism.jpg",
    blurb: "Pilgrimage circuits, sacred stays, puja logistics, and respectful spiritual travel.",
    states: [
      "Varanasi (Kashi)",
      "Char Dham Yatra",
      "Vaishno Devi",
      "Amarnath Cave",
      "Haridwar",
      "Rishikesh",
      "Amritsar (Golden Temple)",
      "Kedarnath",
      "Badrinath",
      "Mathura & Vrindavan",
      "Pushkar",
      "Ajmer (Dargah Sharif)",
    ],
    href: "/spiritual",
    accent: "Sacred circuits",
  },
];

const PLANNER_POINTS = [
  { label: "Hotel shortlists by budget", icon: Hotel },
  { label: "Cab, tempo traveller or coach", icon: CarFront },
  { label: "Permits and route order", icon: Route },
  { label: "On-trip coordination", icon: ShieldCheck },
];

export default function Home() {
  const [openRegion, setOpenRegion] = useState<Region | null>(null);

  const openPlanner = useCallback((e?: React.MouseEvent) => {
    e?.preventDefault();
    window.dispatchEvent(new Event("open-planner"));
  }, []);

  const openContact = useCallback((e?: React.MouseEvent) => {
    e?.preventDefault();
    window.dispatchEvent(new Event("open-contact-expert"));
  }, []);

  const planDestination = useCallback((destination: NorthDestination) => {
    window.dispatchEvent(
      new CustomEvent("open-planner-with", {
        detail: {
          state: destination.name,
          location: destination.name,
        },
      })
    );
  }, []);

  function getStateSlug(regionKey: string, stateName: string) {
    if (regionKey === "group-retreats") {
      const map: Record<string, string> = {
        "Corporate Tours": "corporate",
        "Training Programs": "training",
        Schools: "schools",
        Colleges: "colleges",
        "Open Tours": "open",
        "Family Tours": "family",
        "Spiritual & Pilgrimage": "spiritual",
        "Create Your Own Group": "custom",
      };
      return map[stateName] ?? slugify(stateName);
    }

    if (regionKey === "spiritual-tourism") {
      const map: Record<string, string> = {
        "Varanasi (Kashi)": "kashi",
        "Char Dham Yatra": "char-dham",
        "Vaishno Devi": "vaishno-devi",
        "Amarnath Cave": "amarnath",
        Haridwar: "haridwar",
        Rishikesh: "rishikesh",
        "Amritsar (Golden Temple)": "amritsar",
        Kedarnath: "kedarnath",
        Badrinath: "badrinath",
        "Mathura & Vrindavan": "mathura-vrindavan",
        Pushkar: "pushkar",
        "Ajmer (Dargah Sharif)": "ajmer",
      };
      return map[stateName] ?? slugify(stateName);
    }

    return slugify(stateName);
  }

  return (
    <main className="bg-[#f7faf8] text-slate-950">
      <section className="relative min-h-[84svh] overflow-hidden">
        <Image src="/images/north-india/north-hero.jpg" alt="North India private journey" fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,23,39,0.90),rgba(2,70,91,0.58)_48%,rgba(15,23,42,0.18)),linear-gradient(180deg,rgba(15,23,42,0.10),rgba(2,23,39,0.72))]" />

        <div className="relative z-10 mx-auto flex min-h-[84svh] max-w-7xl flex-col justify-center px-4 pb-16 pt-12 text-white sm:px-6">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }} className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/12 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-sky-50 backdrop-blur">
              <Star className="h-4 w-4 text-amber-200" />
              Expert-planned North India tours
            </div>

            <h1 className="mt-6 max-w-4xl text-[clamp(3rem,7vw,6.2rem)] font-black leading-[0.93] tracking-tight text-balance">
              Travel North India with a plan that feels effortless.
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-sky-50/90 sm:text-lg md:text-xl md:leading-8">
              Private routes, hotel shortlists, transport, sightseeing, permits and local support arranged around your dates, budget and comfort.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button onClick={openContact} className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-amber-200 to-yellow-300 px-6 py-4 text-sm font-black text-sky-950 shadow-2xl shadow-sky-950/25 hover:brightness-105">
                Talk to a Travel Expert <MessageCircle className="h-5 w-5" />
              </button>
              <button onClick={openPlanner} className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/30 bg-white/12 px-6 py-4 text-sm font-black text-white backdrop-blur hover:bg-white/18">
                Build My Itinerary <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative z-20 -mt-12 px-4 sm:px-6">
        <div className="mx-auto grid max-w-7xl overflow-hidden rounded-lg border border-sky-100 bg-white shadow-2xl shadow-sky-950/10 md:grid-cols-4">
          {[
            { title: "Route design", text: "Balanced drive times and right stop order.", icon: Route },
            { title: "Handpicked stays", text: "Hotels matched to family, client or group needs.", icon: Hotel },
            { title: "Transport covered", text: "Cab, tempo traveller, coach and airport pickup.", icon: CarFront },
            { title: "Expert support", text: "Real coordination before and during travel.", icon: PhoneCall },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="border-b border-sky-100 p-5 md:border-b-0 md:border-r md:last:border-r-0">
                <Icon className="h-6 w-6 text-cyan-700" />
                <h3 className="mt-3 text-base font-black text-slate-950">{item.title}</h3>
                <p className="mt-1 text-sm leading-6 text-slate-600">{item.text}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section id="north-destinations" className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-sky-50 px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-sky-900">
                <MapPinned className="h-3.5 w-3.5" />
                Travel planner desk
              </div>
              <h2 className="mt-4 max-w-2xl text-[clamp(2.15rem,4.6vw,4.35rem)] font-black leading-tight tracking-tight text-slate-950">
                Choose where you want to go.
              </h2>
            </div>
            <p className="max-w-2xl text-base leading-7 text-slate-600 lg:justify-self-end">
              Every destination below can become a custom trip with stay options, vehicle, sightseeing, meal guidance and on-ground support.
            </p>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[360px_1fr]">
            <aside className="grid gap-5 self-start">
              <div className="rounded-lg border border-sky-100 bg-white p-4 shadow-xl shadow-sky-950/6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="text-xs font-black uppercase tracking-[0.16em] text-cyan-700">Travel Gallery</div>
                    <h3 className="mt-2 text-2xl font-black text-slate-950">North India in pictures</h3>
                  </div>
                  <Compass className="h-7 w-7 text-sky-900" />
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  {TRAVEL_GALLERY.map((item, index) => (
                    <div key={item.title} className={`relative overflow-hidden rounded-lg bg-sky-100 ${index === 0 ? "col-span-2 h-44" : "h-28"}`}>
                      <Image src={item.image} alt={item.title} fill className="object-cover" sizes="(max-width: 1024px) 50vw, 18vw" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                      <div className="absolute bottom-3 left-3 rounded-full bg-white/92 px-3 py-1 text-xs font-black text-sky-950 shadow">
                        {item.title}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-lg bg-[#082f49] p-5 text-white shadow-2xl shadow-sky-950/14">
                <div className="text-xs font-black uppercase tracking-[0.16em] text-amber-200">Planner</div>
                <h3 className="mt-2 text-2xl font-black">Get a route proposal</h3>
                <p className="mt-3 text-sm leading-6 text-sky-50/85">
                  Share your dates, guests, budget and preferred places. We will suggest the best travel flow.
                </p>

                <div className="mt-4 grid gap-2">
                  {PLANNER_POINTS.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.label} className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/8 px-3 py-2 text-sm font-semibold text-sky-50">
                        <Icon className="h-4 w-4 text-amber-200" />
                        {item.label}
                      </div>
                    );
                  })}
                </div>

                <div className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
                  <button onClick={openPlanner} className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-4 py-3 text-sm font-black text-sky-950">
                    Open Planner <ArrowRight className="h-4 w-4" />
                  </button>
                  <button onClick={openContact} className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-amber-200 to-yellow-300 px-4 py-3 text-sm font-black text-sky-950">
                    Get Quote <MessageCircle className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </aside>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {NORTH_DESTINATIONS.map((destination, index) => (
                <motion.article
                  key={destination.name}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.35, delay: Math.min(index * 0.035, 0.18) }}
                  className="overflow-hidden rounded-lg border border-sky-100 bg-white shadow-xl shadow-sky-950/6"
                >
                  <Link href={destination.href} className="block">
                    <div className="relative h-40 overflow-hidden">
                      <Image src={destination.image} alt={destination.name} fill className="object-cover transition duration-500 hover:scale-105" sizes="(max-width: 768px) 100vw, 24vw" />
                      <div className="absolute left-3 top-3 rounded-full bg-white/92 px-3 py-1 text-xs font-black text-sky-950 shadow">
                        {destination.bestFor}
                      </div>
                    </div>
                  </Link>
                  <div className="p-4">
                    <h3 className="text-lg font-black text-slate-950">{destination.name}</h3>
                    <p className="mt-2 min-h-[72px] text-sm leading-6 text-slate-600">{destination.blurb}</p>
                    <div className="mt-4 flex items-center gap-2">
                      <Link href={destination.href} className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-sky-950 px-4 py-2.5 text-sm font-black text-white">
                        View <ArrowRight className="h-4 w-4" />
                      </Link>
                      <button
                        onClick={() => planDestination(destination)}
                        className="inline-flex flex-1 items-center justify-center rounded-lg border border-sky-200 px-4 py-2.5 text-sm font-bold text-sky-950 hover:bg-sky-50"
                      >
                        Plan
                      </button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto grid max-w-7xl gap-10 rounded-lg bg-[#082f49] p-6 text-white shadow-2xl shadow-sky-950/16 md:grid-cols-[1fr_0.8fr] md:p-10">
          <div>
            <div className="text-xs font-black uppercase tracking-[0.16em] text-amber-200">Why clients choose us</div>
            <h2 className="mt-3 text-[clamp(2rem,4vw,3.6rem)] font-black leading-tight tracking-tight">A planner who thinks beyond places.</h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-sky-50/82">
              Good travel planning is route order, hotel location, meal timing, driver reliability, permit windows and backup options. We handle the small decisions that make the trip feel smooth.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <button onClick={openContact} className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-black text-sky-950">
                Contact Travel Expert <MessageCircle className="h-4 w-4" />
              </button>
              <Link href="/india/north" className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-5 py-3 text-sm font-black text-white">
                Explore North India <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="grid gap-3">
            {[
              "Family holidays with comfortable pacing",
              "Corporate and school group logistics",
              "Pilgrimage routes with stay and transport support",
              "Himalayan adventure plans with route safety",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/8 p-4 text-sm font-bold text-sky-50">
                <CheckCircle2 className="h-5 w-5 flex-none text-amber-200" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <div className="text-xs font-black uppercase tracking-[0.16em] text-cyan-700">More travel services</div>
              <h2 className="mt-3 text-3xl font-black text-slate-950 md:text-5xl">Trips for groups and spiritual circuits.</h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-slate-600">
              Select a service style and we will collect the details needed to plan and quote properly.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {SERVICE_CARDS.map((region) => (
              <button key={region.key} onClick={() => setOpenRegion(region)} className="group relative min-h-[290px] overflow-hidden rounded-lg bg-sky-950 text-left shadow-2xl shadow-sky-950/10">
                <Image src={region.image} alt={region.title} fill className="object-cover transition duration-700 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 50vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-sky-950 via-sky-950/42 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                  <div className="mb-4 inline-flex rounded-full bg-amber-200 px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-sky-950">{region.accent}</div>
                  <h3 className="text-3xl font-black">{region.title}</h3>
                  <p className="mt-3 max-w-xl text-sm leading-6 text-slate-100">{region.blurb}</p>
                  <div className="mt-5 inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-black text-sky-950">
                    View options <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {openRegion && (
        <div className="fixed inset-0 z-[75] grid place-items-end bg-slate-950/60 p-4 backdrop-blur-sm md:place-items-center">
          <button className="absolute inset-0 cursor-default" onClick={() => setOpenRegion(null)} aria-label="Close region panel" />
          <motion.div initial={{ opacity: 0, y: 30, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} className="relative z-10 w-full max-w-4xl overflow-hidden rounded-lg bg-white shadow-2xl">
            <div className="grid md:grid-cols-[300px_1fr]">
              <div className="relative min-h-[220px]">
                <Image src={openRegion.image} alt={openRegion.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <div className="text-xs font-black uppercase tracking-[0.16em] text-amber-300">{openRegion.accent}</div>
                  <h3 className="mt-2 text-3xl font-black">{openRegion.title}</h3>
                </div>
              </div>

              <div className="p-6">
                <p className="text-sm leading-6 text-slate-600">{openRegion.blurb}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {openRegion.states.map((state) => (
                    <Link key={state} href={`${openRegion.href}/${getStateSlug(openRegion.key, state)}`} onClick={() => setOpenRegion(null)} className="rounded-full border border-emerald-100 bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-900 hover:bg-emerald-100">
                      {state}
                    </Link>
                  ))}
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link href={openRegion.href} onClick={() => setOpenRegion(null)} className="rounded-lg bg-emerald-900 px-5 py-3 font-black text-white">
                    Explore {openRegion.title}
                  </Link>
                  <button onClick={openContact} className="rounded-lg border border-emerald-900 px-5 py-3 font-bold text-emerald-950">
                    Request Custom Plan
                  </button>
                  <button onClick={() => setOpenRegion(null)} className="rounded-lg px-5 py-3 font-bold text-slate-500">
                    Close
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </main>
  );
}
