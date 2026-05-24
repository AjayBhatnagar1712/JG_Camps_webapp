"use client";

import slugify from "@/lib/slugify";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CalendarDays, CloudSun, Compass, MapPinned, MessageCircle, Sparkles, Umbrella, UsersRound } from "lucide-react";
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

const REGIONS: Region[] = [
  {
    key: "north",
    title: "North India",
    image: "/images/regions/north-india.jpg",
    blurb: "Himalayan drives, hill stations, spiritual routes, and heritage cities.",
    states: ["Delhi", "Punjab", "Haryana", "Uttarakhand", "Himachal Pradesh", "Jammu & Kashmir", "Uttar Pradesh", "Chandigarh"],
    href: "/india/north",
    accent: "Mountain circuits",
  },
  {
    key: "south",
    title: "South India",
    image: "/images/regions/south-india.jpg",
    blurb: "Backwaters, temple towns, beaches, wellness retreats, and coastal food trails.",
    states: ["Andhra Pradesh", "Telangana", "Karnataka", "Kerala", "Tamil Nadu", "Puducherry", "Lakshadweep"],
    href: "/india/south",
    accent: "Culture and coast",
  },
  {
    key: "east",
    title: "East India",
    image: "/images/regions/east-india.jpg",
    blurb: "Heritage towns, island escapes, temple routes, forests, and tribal culture.",
    states: ["West Bengal", "Odisha", "Bihar", "Jharkhand", "Andaman & Nicobar Islands"],
    href: "/india/east",
    accent: "Heritage trails",
  },
  {
    key: "west",
    title: "West India",
    image: "/images/regions/west-india.jpg",
    blurb: "Desert forts, beach weekends, wildlife, food streets, and luxury breaks.",
    states: ["Goa", "Rajasthan", "Gujarat", "Maharashtra", "Dadra and Nagar Haveli", "Daman and Diu"],
    href: "/india/west",
    accent: "Desert to beach",
  },
  {
    key: "northeast",
    title: "North-East India",
    image: "/images/regions/northeast-india.jpg",
    blurb: "Cloud forests, living-root bridges, monasteries, valleys, and offbeat drives.",
    states: ["Arunachal Pradesh", "Assam", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Sikkim", "Tripura"],
    href: "/india/northeast",
    accent: "Offbeat India",
  },
  {
    key: "central",
    title: "Central India",
    image: "/images/regions/central-india.jpg",
    blurb: "Wildlife corridors, ancient temples, tribal hinterlands, and slow journeys.",
    states: ["Madhya Pradesh", "Chhattisgarh"],
    href: "/india/central",
    accent: "Wildlife and heritage",
  },
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
    blurb: "Pilgrimage circuits, sacred stays, puja logistics, and restorative spiritual travel.",
    states: [
      "Varanasi (Kashi)",
      "Char Dham Yatra",
      "Vaishno Devi",
      "Rameshwaram",
      "Puri (Jagannath)",
      "Bodh Gaya",
      "Amarnath Cave",
      "Shirdi (Sai Baba)",
      "Kanyakumari",
      "Haridwar",
      "Rishikesh",
      "Tirupati (Venkateswara)",
      "Amritsar (Golden Temple)",
      "Kedarnath",
      "Badrinath",
      "Dwarka",
      "Mathura & Vrindavan",
      "Pushkar",
      "Sabarimala",
      "Madurai (Meenakshi Amman)",
      "Ajmer (Dargah Sharif)",
    ],
    href: "/spiritual",
    accent: "Sacred circuits",
  },
  {
    key: "wellness-health",
    title: "Wellness & Health",
    image: "/images/themes/wellness.jpg",
    blurb: "Ayurveda, yoga, detox, healing getaways, and quiet retreats across India.",
    states: ["Ayurveda Retreats", "Yoga & Detox", "Holistic Resorts", "Wellness Clinics"],
    href: "/wellness",
    accent: "Reset journeys",
  },
];

const SIGNATURES = [
  { title: "Sea to sky routes", text: "Beaches, hill roads, forests, islands, temples, and cities planned as one journey.", icon: CloudSun },
  { title: "Human-paced travel", text: "Balanced days, sensible drives, local experiences, stays, permits, and support.", icon: Compass },
  { title: "Groups handled well", text: "Offsites, camps, family groups, pilgrimages, retreats, and custom plans.", icon: UsersRound },
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
        Rameshwaram: "rameswaram",
        "Puri (Jagannath)": "puri",
        "Bodh Gaya": "bodh-gaya",
        "Amarnath Cave": "amarnath",
        "Shirdi (Sai Baba)": "shirdi",
        Kanyakumari: "kanyakumari",
        Haridwar: "haridwar",
        Rishikesh: "rishikesh",
        "Tirupati (Venkateswara)": "tirupati",
        "Amritsar (Golden Temple)": "amritsar",
        Kedarnath: "kedarnath",
        Badrinath: "badrinath",
        Dwarka: "dwarka",
        "Mathura & Vrindavan": "mathura-vrindavan",
        Pushkar: "pushkar",
        Sabarimala: "sabarimala",
        "Madurai (Meenakshi Amman)": "madurai",
        "Ajmer (Dargah Sharif)": "ajmer",
      };
      return map[stateName] ?? slugify(stateName);
    }

    return slugify(stateName);
  }

  return (
    <main className="bg-[linear-gradient(180deg,#e0f7ff_0%,#ffffff_28%,#f7fbff_100%)] text-slate-950">
      <section className="relative min-h-[calc(100svh-66px)] overflow-hidden">
        <Image
          src="/images/Goa/goa-hero.jpg"
          alt="Sea, sky, and coastal travel"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,89,133,0.78),rgba(14,165,233,0.34)_48%,rgba(255,255,255,0.10)),linear-gradient(180deg,rgba(2,132,199,0.16),rgba(8,47,73,0.72))]" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#e0f7ff] to-transparent" />

        <div className="relative z-10 mx-auto grid min-h-[calc(100svh-66px)] max-w-7xl items-center gap-8 px-4 py-10 text-white sm:px-6 md:grid-cols-[1.08fr_0.92fr] md:py-14 lg:gap-12">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }} className="max-w-3xl pt-4 md:pt-0">
            <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-white/30 bg-white/16 px-3 py-2 text-xs font-semibold text-sky-50 shadow-lg shadow-sky-950/10 backdrop-blur sm:px-4 sm:text-sm">
              <Umbrella className="h-4 w-4 flex-none text-amber-200" />
              Sea, sky, forest, mountain and culture journeys
            </div>

            <h1 className="mt-5 max-w-4xl text-[clamp(2.75rem,7.4vw,6.15rem)] font-black leading-[0.94] tracking-tight text-balance drop-shadow-[0_10px_30px_rgba(7,47,73,0.35)]">
              Journeys that feel like open skies.
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-sky-50 sm:text-lg md:text-xl md:leading-8">
              Coastal breaks, mountain drives, retreats, pilgrimages, group camps and international holidays, planned with natural pacing and real support.
            </p>

            <div className="mt-7 flex flex-col gap-3 pb-16 sm:flex-row md:pb-0">
              <button onClick={openPlanner} className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amber-200 to-yellow-300 px-6 py-4 font-black text-sky-950 shadow-2xl shadow-sky-950/25 hover:brightness-105">
                Build an Itinerary <ArrowRight className="h-5 w-5" />
              </button>
              <button onClick={openContact} className="inline-flex items-center justify-center gap-2 rounded-full border border-white/35 bg-white/14 px-6 py-4 font-bold text-white shadow-xl shadow-sky-950/15 backdrop-blur hover:bg-white/20">
                <MessageCircle className="h-5 w-5" />
                Talk to an Expert
              </button>
            </div>

            <div className="mt-8 hidden max-w-2xl grid-cols-3 gap-2 sm:grid sm:gap-3">
              {[
                ["20K+", "ideas"],
                ["24/7", "support"],
                ["100%", "custom"],
              ].map(([value, label]) => (
                <div key={label} className="rounded-2xl border border-white/20 bg-white/16 p-3 text-center shadow-lg shadow-sky-950/10 backdrop-blur sm:p-5">
                  <div className="text-2xl font-black text-amber-200 sm:text-3xl">{value}</div>
                  <div className="mt-1 text-xs font-semibold text-sky-50/90 sm:text-sm">{label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.12 }} className="hidden md:block">
            <div className="relative mx-auto aspect-[4/5] max-h-[620px] max-w-[470px]">
              <div className="absolute left-0 top-10 h-[72%] w-[72%] overflow-hidden rounded-[2rem] border border-white/25 shadow-2xl shadow-sky-950/30">
                <Image src="/images/south-india/lakshadweep.jpg" alt="Island water" fill className="object-cover" sizes="38vw" />
              </div>
              <div className="absolute right-0 top-0 h-[46%] w-[55%] overflow-hidden rounded-[2rem] border border-white/25 shadow-2xl shadow-sky-950/25">
                <Image src="/images/northeast-india/meghalaya.jpg" alt="Green valley" fill className="object-cover" sizes="28vw" />
              </div>
              <div className="absolute bottom-0 right-8 h-[40%] w-[58%] overflow-hidden rounded-[2rem] border border-white/25 shadow-2xl shadow-sky-950/25">
                <Image src="/images/north-india/leh-ladakh.jpg" alt="Mountain sky" fill className="object-cover" sizes="28vw" />
              </div>
              <div className="absolute bottom-12 left-8 rounded-3xl border border-white/30 bg-white/85 p-5 text-sky-950 shadow-2xl shadow-sky-950/20 backdrop-blur">
                <div className="text-xs font-black uppercase tracking-[0.18em] text-cyan-700">This season</div>
                <div className="mt-1 text-xl font-black">Sea + Sky Escapes</div>
                <div className="mt-1 text-sm text-slate-600">Goa, Lakshadweep, Kerala, Northeast</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative z-10 -mt-8 px-4 pb-10 sm:px-6 md:-mt-12">
        <div className="mx-auto grid max-w-7xl gap-4 rounded-[2rem] border border-sky-100 bg-white/92 p-4 shadow-2xl shadow-sky-950/12 backdrop-blur md:grid-cols-3">
          {SIGNATURES.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="rounded-3xl bg-gradient-to-br from-sky-50 via-white to-cyan-50 p-5">
                <Icon className="h-6 w-6 text-cyan-700" />
                <h3 className="mt-4 text-lg font-black text-slate-950">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.text}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section id="explore" className="px-4 py-14 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-black uppercase tracking-[0.2em] text-emerald-800">
                <CalendarDays className="h-3.5 w-3.5" />
                Explore
              </div>
              <h2 className="text-[clamp(2.25rem,5vw,4.5rem)] font-black leading-tight tracking-tight text-slate-950">Pick Your Journey</h2>
            </div>
            <p className="max-w-xl text-base leading-7 text-slate-600">
              Choose a region or travel style, then jump into destinations, sample routes, and quick consultation.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {REGIONS.map((region, index) => (
              <motion.button
                key={region.key}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: Math.min(index * 0.04, 0.2) }}
                onClick={() => setOpenRegion(region)}
                className="group relative min-h-[330px] overflow-hidden rounded-[2rem] bg-sky-950 text-left shadow-2xl shadow-sky-950/10 sm:min-h-[360px]"
              >
                <Image src={region.image} alt={region.title} fill className="object-cover transition duration-700 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 33vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-sky-950 via-sky-950/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                  <div className="mb-4 inline-flex rounded-full bg-amber-200 px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-sky-950">
                    {region.accent}
                  </div>
                  <h3 className="text-3xl font-black">{region.title}</h3>
                  <p className="mt-3 min-h-[56px] text-sm leading-6 text-slate-100">{region.blurb}</p>
                  <div className="mt-5 flex items-center justify-between border-t border-white/15 pt-4">
                    <span className="text-sm font-semibold text-slate-200">{region.states.length} areas</span>
                    <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-black text-sky-950">
                      View <ArrowRight className="h-4 w-4" />
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
            <h2 className="text-[clamp(2.25rem,5vw,4.25rem)] font-black leading-tight tracking-tight">Designed for travelers who want the trip handled well.</h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-sky-50/85">
              We combine quick AI drafts with human planning for real-world logistics: route order, permits, stays, food, local experiences, transport, and support.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/about" className="rounded-full bg-white px-6 py-3 font-black text-sky-950">About Us</Link>
              <button onClick={openContact} className="rounded-full border border-white/20 px-6 py-3 font-bold text-white">Get Consultation</button>
            </div>
          </div>
          <div className="grid gap-4">
            {["Family holidays", "Corporate offsites", "School and college camps", "Pilgrimage groups", "Wellness retreats"].map((item) => (
              <div key={item} className="rounded-3xl border border-white/10 bg-white/5 p-5 text-lg font-bold">
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
            className="relative z-10 w-full max-w-4xl overflow-hidden rounded-[2rem] bg-white shadow-2xl"
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
