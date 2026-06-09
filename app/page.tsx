"use client";

import slugify from "@/lib/slugify";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CalendarDays, Compass, MapPinned, MessageCircle, Umbrella, UsersRound } from "lucide-react";
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
    blurb: "Monuments, food walks, markets, museums and easy arrival logistics.",
    bestFor: "City break",
    href: "/india/north/delhi",
  },
  {
    name: "Himachal Pradesh",
    image: "/images/north-india/himachal.jpg",
    blurb: "Shimla, Manali, Dharamshala, mountain stays and scenic road trips.",
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
    blurb: "High passes, monasteries, Pangong, Nubra and carefully paced altitude days.",
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
    blurb: "Amritsar, Golden Temple, Wagah Border, farms and local hospitality.",
    bestFor: "Culture",
    href: "/india/north/punjab",
  },
  {
    name: "Haryana",
    image: "/images/north-india/haryana.jpg",
    blurb: "Kurukshetra, heritage stops, birding breaks and short ex-Delhi trips.",
    bestFor: "Short trips",
    href: "/india/north/haryana",
  },
  {
    name: "Chandigarh",
    image: "/images/north-india/chandigarh.jpg",
    blurb: "Sukhna Lake, Rock Garden, clean city stays and Himachal gateway plans.",
    bestFor: "Gateway",
    href: "/india/north/chandigarh",
  },
];

const TRAVEL_GALLERY = [
  { title: "Heritage Days", image: "/images/north-india/delhi.jpg" },
  { title: "Himalayan Stays", image: "/images/north-india/himachal.jpg" },
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

const SIGNATURES = [
  { title: "Tell us your dates", text: "Share destination, group size, budget and starting city. We shape the route around your comfort.", icon: CalendarDays },
  { title: "Get a clear plan", text: "Route order, stays, transport, experiences, permits and support are planned before you confirm.", icon: MapPinned },
  { title: "Travel with backup", text: "A real team stays available for families, clients, groups and pilgrimage departures.", icon: UsersRound },
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
    <main className="bg-[linear-gradient(180deg,#eef7ff_0%,#ffffff_30%,#f8fbff_100%)] text-slate-950">
      <section className="relative min-h-[calc(100svh-66px)] overflow-hidden">
        <Image
          src="/images/north-india/north-hero.jpg"
          alt="North India mountain travel"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,47,73,0.86),rgba(14,116,144,0.42)_52%,rgba(15,23,42,0.24)),linear-gradient(180deg,rgba(2,6,23,0.08),rgba(8,47,73,0.70))]" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#eef7ff] to-transparent" />

        <div className="relative z-10 mx-auto grid min-h-[calc(100svh-66px)] max-w-7xl items-center gap-8 px-4 py-10 text-white sm:px-6 md:grid-cols-[1fr_420px] md:py-14 lg:gap-14">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }} className="max-w-3xl pt-4 md:pt-0">
            <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-white/30 bg-white/16 px-3 py-2 text-xs font-semibold text-sky-50 shadow-lg shadow-sky-950/10 backdrop-blur sm:px-4 sm:text-sm">
              <Umbrella className="h-4 w-4 flex-none text-amber-200" />
              Private North India tours for families, groups and clients
            </div>

            <h1 className="mt-5 max-w-4xl text-[clamp(2.7rem,7vw,5.7rem)] font-black leading-[0.95] tracking-tight text-balance drop-shadow-[0_10px_30px_rgba(7,47,73,0.35)]">
              Plan your North India trip without the stress.
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-sky-50 sm:text-lg md:text-xl md:leading-8">
              Tell us where you want to go. We will build the route, hotels, transport, sightseeing, permits and local support around your dates and budget.
            </p>

            <div className="mt-7 flex flex-col gap-3 pb-12 sm:flex-row md:pb-0">
              <button onClick={openContact} className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amber-200 to-yellow-300 px-6 py-4 font-black text-sky-950 shadow-2xl shadow-sky-950/25 hover:brightness-105">
                Get a Custom Quote <MessageCircle className="h-5 w-5" />
              </button>
              <button onClick={openPlanner} className="inline-flex items-center justify-center gap-2 rounded-full border border-white/35 bg-white/14 px-6 py-4 font-bold text-white shadow-xl shadow-sky-950/15 backdrop-blur hover:bg-white/20">
                Plan My Trip <ArrowRight className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-8 hidden max-w-2xl grid-cols-3 gap-2 sm:grid sm:gap-3">
              {[
                ["2 min", "quick enquiry"],
                ["Private", "custom routes"],
                ["Real", "travel support"],
              ].map(([value, label]) => (
                <div key={label} className="rounded-2xl border border-white/20 bg-white/16 p-3 text-center shadow-lg shadow-sky-950/10 backdrop-blur sm:p-5">
                  <div className="text-2xl font-black text-amber-200 sm:text-3xl">{value}</div>
                  <div className="mt-1 text-xs font-semibold text-sky-50/90 sm:text-sm">{label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.12 }} className="hidden md:block">
            <div className="overflow-hidden rounded-[1.75rem] border border-white/25 bg-white/92 p-4 text-slate-950 shadow-2xl shadow-sky-950/25 backdrop-blur">
              <div className="relative h-56 overflow-hidden rounded-[1.35rem]">
                <Image src="/images/north-india/leh-ladakh.jpg" alt="Ladakh route" fill className="object-cover" sizes="420px" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="text-xs font-black uppercase tracking-[0.16em] text-amber-200">Popular this season</div>
                  <div className="mt-1 text-2xl font-black">Kashmir + Ladakh</div>
                </div>
              </div>
              <div className="grid gap-3 p-3">
                {["Hotels matched to budget", "Private cab or group transport", "Sightseeing and permits handled"].map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-2xl bg-sky-50 px-4 py-3 text-sm font-bold text-slate-800">
                    <Compass className="h-4 w-4 text-cyan-700" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative z-10 -mt-8 px-4 pb-10 sm:px-6 md:-mt-12">
        <div className="mx-auto grid max-w-7xl gap-4 rounded-[1.75rem] border border-sky-100 bg-white/94 p-4 shadow-2xl shadow-sky-950/12 backdrop-blur md:grid-cols-3">
          {SIGNATURES.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="rounded-2xl bg-gradient-to-br from-sky-50 via-white to-cyan-50 p-5">
                <Icon className="h-6 w-6 text-cyan-700" />
                <h3 className="mt-4 text-lg font-black text-slate-950">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.text}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section id="north-destinations" className="px-4 py-14 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 grid gap-5 md:grid-cols-[0.85fr_1.15fr] md:items-end">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-sky-50 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-sky-900">
                <MapPinned className="h-3.5 w-3.5" />
                North India
              </div>
              <h2 className="text-[clamp(2.15rem,4.6vw,4.35rem)] font-black leading-tight tracking-tight text-slate-950">
                Choose your destination.
              </h2>
            </div>
            <p className="max-w-2xl text-base leading-7 text-slate-600 md:justify-self-end">
              Pick a destination below and we will turn it into a practical itinerary with stays, transport, sightseeing and support.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-[0.92fr_2.08fr]">
            <div className="grid gap-5 self-start">
              <div className="overflow-hidden rounded-[1.5rem] border border-sky-100 bg-white p-4 shadow-2xl shadow-sky-950/8">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <div className="inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-sky-950">
                      Travel Gallery
                    </div>
                    <h3 className="mt-3 text-2xl font-black text-slate-950">See the trip mood.</h3>
                  </div>
                  <span className="hidden text-sm font-bold text-slate-500 sm:inline">North India</span>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  {TRAVEL_GALLERY.map((item, index) => (
                    <div
                      key={item.title}
                      className={`relative overflow-hidden rounded-[1rem] bg-sky-100 ${index === 0 ? "col-span-2 h-44" : "h-28"}`}
                    >
                      <Image src={item.image} alt={item.title} fill className="object-cover" sizes="(max-width: 1024px) 50vw, 18vw" />
                      <div className="absolute inset-0 bg-gradient-to-t from-sky-950/70 via-transparent to-transparent" />
                      <div className="absolute bottom-3 left-3 rounded-full bg-white/92 px-3 py-1 text-xs font-black text-sky-950 shadow">
                        {item.title}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[1.5rem] border border-sky-100 bg-sky-950 p-5 text-white shadow-2xl shadow-sky-950/12">
                <div className="inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-amber-200">
                  Planner
                </div>
                <h3 className="mt-3 text-2xl font-black">Get your route planned.</h3>
                <p className="mt-3 text-sm leading-6 text-sky-50/85">
                  Share dates, guests, budget and places you like. Our team will suggest the right route and travel flow.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {["Delhi", "Himachal", "Uttarakhand", "Kashmir", "Ladakh", "UP"].map((item) => (
                    <span key={item} className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-bold text-sky-50">
                      {item}
                    </span>
                  ))}
                </div>
                <div className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  <button onClick={openPlanner} className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-4 py-3 text-sm font-black text-sky-950">
                    Open Planner <ArrowRight className="h-4 w-4" />
                  </button>
                  <button onClick={openContact} className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amber-200 to-yellow-300 px-4 py-3 text-sm font-black text-sky-950">
                    Get Quote <MessageCircle className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {NORTH_DESTINATIONS.map((destination, index) => (
                <motion.article
                  key={destination.name}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.35, delay: Math.min(index * 0.035, 0.18) }}
                  className="overflow-hidden rounded-[1.35rem] border border-sky-100 bg-white shadow-xl shadow-sky-950/6"
                >
                  <Link href={destination.href} className="block">
                    <div className="relative h-40">
                      <Image src={destination.image} alt={destination.name} fill className="object-cover transition duration-500 hover:scale-105" sizes="(max-width: 768px) 100vw, 24vw" />
                      <div className="absolute left-3 top-3 rounded-full bg-white/92 px-3 py-1 text-xs font-black text-sky-950 shadow">
                        {destination.bestFor}
                      </div>
                    </div>
                  </Link>
                  <div className="p-4">
                    <h3 className="text-xl font-black text-slate-950">{destination.name}</h3>
                    <p className="mt-2 min-h-[72px] text-sm leading-6 text-slate-600">{destination.blurb}</p>
                    <div className="mt-4 flex items-center gap-2">
                      <Link href={destination.href} className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-sky-950 px-4 py-2.5 text-sm font-black text-white">
                        View <ArrowRight className="h-4 w-4" />
                      </Link>
                      <button
                        onClick={() => planDestination(destination)}
                        className="inline-flex flex-1 items-center justify-center rounded-full border border-sky-200 px-4 py-2.5 text-sm font-bold text-sky-950 hover:bg-sky-50"
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

      <section id="travel-services" className="px-4 py-14 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-emerald-800">
                <CalendarDays className="h-3.5 w-3.5" />
                Customer travel services
              </div>
              <h2 className="text-[clamp(2rem,4vw,3.7rem)] font-black leading-tight tracking-tight text-slate-950">Need something handled end to end?</h2>
            </div>
            <p className="max-w-xl text-base leading-7 text-slate-600">
              Choose a service style and we will collect only the details needed to quote and plan your trip.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {SERVICE_CARDS.map((region, index) => (
              <motion.button
                key={region.key}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.12) }}
                onClick={() => setOpenRegion(region)}
                className="group relative min-h-[330px] overflow-hidden rounded-[1.75rem] bg-sky-950 text-left shadow-2xl shadow-sky-950/10"
              >
                <Image src={region.image} alt={region.title} fill className="object-cover transition duration-700 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 50vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-sky-950 via-sky-950/35 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                  <div className="mb-4 inline-flex rounded-full bg-amber-200 px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-sky-950">
                    {region.accent}
                  </div>
                  <h3 className="text-3xl font-black">{region.title}</h3>
                  <p className="mt-3 max-w-xl text-sm leading-6 text-slate-100">{region.blurb}</p>
                  <div className="mt-5 flex items-center justify-between border-t border-white/15 pt-4">
                    <span className="text-sm font-semibold text-slate-200">{region.states.length} options</span>
                    <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-black text-sky-950">
                      View Options <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="bg-[linear-gradient(135deg,#082f49_0%,#075985_48%,#0f766e_100%)] px-4 py-16 text-white sm:px-6">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1fr_0.8fr] md:items-center">
          <div>
            <div className="mb-4 inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-sky-50">JG Camps & Resorts</div>
            <h2 className="text-[clamp(2.1rem,4.6vw,4rem)] font-black leading-tight tracking-tight">For customers who want the trip handled properly.</h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-sky-50/85">
              We turn your travel request into a practical North India plan with clear route order, stays, transport, food suggestions, local experiences and support.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button onClick={openContact} className="rounded-full bg-white px-6 py-3 font-black text-sky-950">Get Consultation</button>
              <Link href="/india/north" className="rounded-full border border-white/20 px-6 py-3 font-bold text-white">Explore North India</Link>
            </div>
          </div>
          <div className="grid gap-4">
            {["Family holidays", "Corporate offsites", "School and college camps", "Pilgrimage groups", "Himalayan adventure tours"].map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-white/5 p-5 text-lg font-bold">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {openRegion && (
        <div className="fixed inset-0 z-[75] grid place-items-end bg-slate-950/60 p-4 backdrop-blur-sm md:place-items-center">
          <button className="absolute inset-0 cursor-default" onClick={() => setOpenRegion(null)} aria-label="Close region panel" />
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="relative z-10 w-full max-w-4xl overflow-hidden rounded-[1.75rem] bg-white shadow-2xl"
          >
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
                    <Link
                      key={state}
                      href={`${openRegion.href}/${getStateSlug(openRegion.key, state)}`}
                      onClick={() => setOpenRegion(null)}
                      className="rounded-full border border-emerald-100 bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-900 hover:bg-emerald-100"
                    >
                      {state}
                    </Link>
                  ))}
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link href={openRegion.href} onClick={() => setOpenRegion(null)} className="rounded-full bg-emerald-900 px-5 py-3 font-black text-white">
                    Explore {openRegion.title}
                  </Link>
                  <button onClick={openContact} className="rounded-full border border-emerald-900 px-5 py-3 font-bold text-emerald-950">
                    Request Custom Plan
                  </button>
                  <button onClick={() => setOpenRegion(null)} className="rounded-full px-5 py-3 font-bold text-slate-500">
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
