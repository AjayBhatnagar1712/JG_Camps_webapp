"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CalendarDays, Compass, Hotel, MapPinned, MessageCircle, Route, ShieldCheck, Sparkles } from "lucide-react";
import { useCallback, useState } from "react";

type Journey = {
  title: string;
  image: string;
  href: string;
  tag: string;
  line: string;
};

const JOURNEYS: Journey[] = [
  {
    title: "Ladakh",
    image: "/images/north-india/leh-ladakh.jpg",
    href: "/india/north/leh-ladakh",
    tag: "High roads",
    line: "Altitude-safe pacing, Pangong, Nubra and monastery days.",
  },
  {
    title: "Kashmir",
    image: "/images/north-india/jammu.jpg",
    href: "/india/north/jammu-and-kashmir",
    tag: "Premium leisure",
    line: "Srinagar, Gulmarg and Pahalgam with smooth transfers.",
  },
  {
    title: "Himachal",
    image: "/images/north-india/himachal.jpg",
    href: "/india/north/himachal-pradesh",
    tag: "Mountain stays",
    line: "Shimla, Manali and Dharamshala without rushed drive days.",
  },
  {
    title: "Uttarakhand",
    image: "/images/north-india/uttarakhand.jpg",
    href: "/india/north/uttarakhand",
    tag: "River + hills",
    line: "Rishikesh, Haridwar, Mussoorie and Kumaon escapes.",
  },
  {
    title: "Delhi to Varanasi",
    image: "/images/north-india/uttar-pradesh.jpg",
    href: "/india/north/uttar-pradesh",
    tag: "Heritage",
    line: "Agra, Mathura, Vrindavan, Lucknow and Kashi circuits.",
  },
];

const PROMISES = [
  { title: "Route", text: "Right order, drive times, rest days.", icon: Route },
  { title: "Stay", text: "Shortlists matched to budget.", icon: Hotel },
  { title: "Support", text: "Human help before and during travel.", icon: ShieldCheck },
];

export default function Home() {
  const [activeJourney, setActiveJourney] = useState(0);
  const [actionText, setActionText] = useState("Opening scene ready");
  const [sceneCue, setSceneCue] = useState({
    id: 0,
    title: "Opening scene",
    detail: "Choose a route and the page shifts with you.",
  });
  const currentJourney = JOURNEYS[activeJourney];

  const playCue = useCallback((title: string, detail: string) => {
    setActionText(title);
    setSceneCue((cue) => ({
      id: cue.id + 1,
      title,
      detail,
    }));
  }, []);

  const openPlanner = useCallback((e?: React.MouseEvent) => {
    e?.preventDefault();
    playCue("Planner scene loading", "Dates, guests and comfort level are ready for your first route draft.");
    window.dispatchEvent(new Event("open-planner"));
  }, [playCue]);

  const openContact = useCallback((e?: React.MouseEvent) => {
    e?.preventDefault();
    playCue("Expert call prepared", "A travel specialist will help turn the route into a precise plan.");
    window.dispatchEvent(new Event("open-contact-expert"));
  }, [playCue]);

  const planJourney = useCallback((journey: Journey) => {
    playCue(`${journey.title} selected`, journey.line);
    window.dispatchEvent(
      new CustomEvent("open-planner-with", {
        detail: {
          state: journey.title,
          location: journey.title,
        },
      })
    );
  }, [playCue]);

  const previewJourney = useCallback((journey: Journey, index: number) => {
    setActiveJourney(index);
    playCue(`${journey.title} preview`, journey.line);
  }, [playCue]);

  return (
    <main className="cinematic-home relative overflow-hidden bg-[#020712] text-white">
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-[radial-gradient(circle_at_18%_8%,rgba(125,211,252,0.16),transparent_26rem),radial-gradient(circle_at_82%_34%,rgba(253,230,138,0.10),transparent_24rem),linear-gradient(180deg,#020712_0%,#061524_42%,#020712_100%)]">
        <div className="absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] [background-size:72px_72px]" />
      </div>

      <section className="relative min-h-[calc(100svh-76px)] overflow-hidden">
        <Image src="/images/north-india/north-hero.jpg" alt="Cinematic Journey Gate route" fill priority className="cinematic-drift object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,7,18,0.94)_0%,rgba(2,24,44,0.72)_43%,rgba(2,7,18,0.18)_100%),linear-gradient(180deg,rgba(2,7,18,0.12)_0%,rgba(2,7,18,0.88)_100%)]" />
        <div aria-hidden className="absolute left-[12%] top-[18%] h-64 w-64 rounded-full bg-cyan-300/18 blur-3xl" />
        <div aria-hidden className="absolute bottom-[12%] right-[10%] h-80 w-80 rounded-full bg-amber-200/14 blur-3xl" />

        <div className="relative z-10 mx-auto grid min-h-[calc(100svh-76px)] max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_380px]">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/18 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-cyan-100 backdrop-blur">
              <Compass className="h-4 w-4 text-amber-200" />
              Journey Gate Private Travel
            </div>

            <h1 className="mt-6 max-w-4xl text-[clamp(3.2rem,8vw,7.2rem)] font-black leading-[0.88] tracking-tight text-balance">
              Mountain roads. Sacred cities. A journey that unfolds like cinema.
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-200 sm:text-lg">
              One expert route. Handpicked stays. Smooth transport. No clutter.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button onClick={openContact} className="cinematic-action inline-flex items-center justify-center gap-2 rounded-lg bg-amber-200 px-6 py-4 text-sm font-black text-slate-950 shadow-2xl shadow-black/25 hover:bg-amber-100">
                Speak to an Expert <MessageCircle className="h-5 w-5" />
              </button>
              <button onClick={openPlanner} className="cinematic-action inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/10 px-6 py-4 text-sm font-black text-white backdrop-blur hover:bg-white/16">
                Start Planning <ArrowRight className="h-5 w-5" />
              </button>
            </div>

            <motion.div
              key={actionText}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/12 bg-black/20 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-slate-300 backdrop-blur"
            >
              <span className="h-2 w-2 rounded-full bg-amber-200 shadow-[0_0_18px_rgba(253,230,138,0.8)]" />
              {actionText}
            </motion.div>

            <AnimatePresence mode="wait">
              <motion.div
                key={sceneCue.id}
                initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -12, filter: "blur(8px)" }}
                transition={{ duration: 0.45 }}
                className="mt-5 max-w-xl border-l-2 border-amber-200/80 pl-4"
              >
                <div className="text-xs font-black uppercase tracking-[0.18em] text-amber-200">Live cue</div>
                <div className="mt-1 text-xl font-black text-white">{sceneCue.title}</div>
                <p className="mt-1 text-sm leading-6 text-slate-300">{sceneCue.detail}</p>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, y: 22, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.12 }}
            className="hidden overflow-hidden rounded-lg border border-white/14 bg-white/10 p-3 shadow-2xl shadow-black/30 backdrop-blur-xl lg:block"
          >
            <div className="relative h-72 overflow-hidden rounded-md">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentJourney.image}
                  initial={{ opacity: 0, scale: 1.08 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.55 }}
                  className="absolute inset-0"
                >
                  <Image src={currentJourney.image} alt={currentJourney.title} fill className="object-cover" sizes="380px" />
                </motion.div>
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/18 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="text-xs font-black uppercase tracking-[0.18em] text-amber-200">Now playing</div>
                <h2 className="mt-1 text-3xl font-black">{currentJourney.title}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-200">{currentJourney.line}</p>
              </div>
            </div>
            <div className="mt-3 grid gap-2">
              {JOURNEYS.map((journey, index) => (
                <button
                  key={journey.title}
                  onMouseEnter={() => previewJourney(journey, index)}
                  onFocus={() => previewJourney(journey, index)}
                  onClick={() => planJourney(journey)}
                  className={`flex items-center justify-between rounded-md border px-3 py-2 text-left text-sm font-black transition ${
                    activeJourney === index ? "border-amber-200 bg-amber-200 text-slate-950" : "border-white/10 bg-white/7 text-white hover:bg-white/12"
                  }`}
                >
                  {journey.title}
                  <ArrowRight className="h-4 w-4" />
                </button>
              ))}
            </div>
          </motion.aside>

          <div className="grid max-w-3xl gap-3 sm:grid-cols-3 lg:col-span-2">
            {PROMISES.map((item) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  whileHover={{ y: -6, scale: 1.02 }}
                  className="rounded-lg border border-white/12 bg-white/8 p-4 backdrop-blur"
                >
                  <Icon className="h-5 w-5 text-amber-200" />
                  <div className="mt-3 text-sm font-black">{item.title}</div>
                  <p className="mt-1 text-xs leading-5 text-slate-300">{item.text}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="north-destinations" className="relative overflow-hidden px-4 py-16 sm:px-6">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,7,18,0.98)_0%,rgba(6,23,36,0.96)_48%,#020712_100%)]" />
        <div className="absolute left-0 top-10 h-px w-full bg-gradient-to-r from-transparent via-cyan-200/20 to-transparent" />
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-cyan-200">
                <MapPinned className="h-4 w-4" />
                Signature Himalayan belt
              </div>
              <h2 className="mt-4 max-w-3xl text-[clamp(2.4rem,5vw,5rem)] font-black leading-[0.95] tracking-tight">
                Five journeys. Infinite ways to make them yours.
              </h2>
            </div>
            <button onClick={openPlanner} className="cinematic-action inline-flex w-fit items-center gap-2 rounded-lg border border-white/16 bg-white/8 px-5 py-3 text-sm font-black text-white backdrop-blur hover:bg-white/14">
              Build from scratch <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="home-3d-stage grid gap-4 lg:grid-cols-5">
            {JOURNEYS.map((journey, index) => (
              <article
                key={journey.title}
                onMouseEnter={() => previewJourney(journey, index)}
                onFocus={() => previewJourney(journey, index)}
                className={`home-3d-card group relative min-h-[420px] overflow-hidden rounded-lg border bg-slate-900 shadow-2xl shadow-black/20 transition-colors ${
                  activeJourney === index ? "border-amber-200/80" : "border-white/10"
                }`}
              >
                <Image src={journey.image} alt={journey.title} fill className="object-cover transition duration-700 group-hover:scale-105" sizes="(max-width: 1024px) 100vw, 20vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/38 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <div className="mb-3 inline-flex rounded-full bg-white/90 px-3 py-1 text-xs font-black text-slate-950">{journey.tag}</div>
                  <h3 className="text-2xl font-black">{journey.title}</h3>
                  <p className="mt-2 min-h-[64px] text-sm leading-6 text-slate-200">{journey.line}</p>
                  <div className="mt-5 flex gap-2">
                    <Link
                      href={journey.href}
                      onClick={() => playCue(`${journey.title} route opening`, "Loading the detailed destination scene.")}
                      className="cinematic-action inline-flex flex-1 items-center justify-center rounded-lg bg-white px-3 py-2.5 text-sm font-black text-slate-950"
                    >
                      View
                    </Link>
                    <button onClick={() => planJourney(journey)} className="cinematic-action inline-flex flex-1 items-center justify-center rounded-lg border border-white/20 bg-white/10 px-3 py-2.5 text-sm font-black text-white backdrop-blur">
                      Plan
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden px-4 py-16 sm:px-6">
        <Image src="/images/north-india/leh-ladakh.jpg" alt="Ladakh cinematic route" fill className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,7,18,0.92),rgba(2,7,18,0.74),rgba(2,7,18,0.42)),linear-gradient(180deg,rgba(2,7,18,0.72),rgba(2,7,18,0.86))]" />

        <div className="relative z-10 mx-auto grid max-w-7xl gap-8 md:grid-cols-[1fr_420px] md:items-center">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-amber-200">
              <Sparkles className="h-4 w-4" />
              The expert layer
            </div>
            <h2 className="mt-4 max-w-3xl text-[clamp(2.4rem,5vw,5rem)] font-black leading-[0.95] tracking-tight">
              You choose the mood. We handle the movement.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-slate-200">
              Dates, guests, budget, pace. That is enough for us to shape the first route.
            </p>
          </div>

          <div className="rounded-lg border border-white/12 bg-white/10 p-5 shadow-2xl shadow-black/24 backdrop-blur-xl">
            <div className="text-xs font-black uppercase tracking-[0.18em] text-cyan-100">Planner</div>
            <h3 className="mt-3 text-3xl font-black">Get a precise route proposal.</h3>
            <div className="mt-5 grid gap-3">
              {[
                ["01", "Share dates and group size"],
                ["02", "Pick comfort and destinations"],
                ["03", "Receive route, stay and transport flow"],
              ].map(([num, text]) => (
                <div key={num} className="flex items-center gap-3 rounded-lg border border-white/10 bg-black/18 p-3">
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-amber-200 text-xs font-black text-slate-950">{num}</span>
                  <span className="text-sm font-semibold text-slate-100">{text}</span>
                </div>
              ))}
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <button onClick={openPlanner} className="cinematic-action inline-flex items-center justify-center gap-2 rounded-lg bg-white px-4 py-3 text-sm font-black text-slate-950">
                Open Planner <CalendarDays className="h-4 w-4" />
              </button>
              <button onClick={openContact} className="cinematic-action inline-flex items-center justify-center gap-2 rounded-lg bg-amber-200 px-4 py-3 text-sm font-black text-slate-950">
                Get Quote <MessageCircle className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="relative px-4 py-10 sm:px-6">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#020712,rgba(7,21,34,0.96))]" />
        <div className="relative z-10 mx-auto grid max-w-7xl gap-5 rounded-lg border border-white/12 bg-white/[0.06] p-5 shadow-2xl shadow-black/20 backdrop-blur md:grid-cols-[1fr_auto] md:items-center">
          <div className="max-w-2xl">
            <div className="text-xs font-black uppercase tracking-[0.2em] text-cyan-200">Concierge desk</div>
            <h2 className="mt-2 text-2xl font-black tracking-tight md:text-4xl">Quiet planning for complex trips.</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              Family groups, college tours, corporate retreats and sacred routes get the same calm route control.
            </p>
            <div className="mt-4 grid gap-2 text-xs font-bold uppercase tracking-[0.12em] text-slate-300 sm:grid-cols-3">
              <span className="rounded-md border border-white/10 bg-black/18 px-3 py-2">Groups</span>
              <span className="rounded-md border border-white/10 bg-black/18 px-3 py-2">Pilgrimages</span>
              <span className="rounded-md border border-white/10 bg-black/18 px-3 py-2">Custom routes</span>
            </div>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/group-retreats"
              onClick={() => playCue("Group scene opening", "College, corporate and family movements are ready to shape.")}
              className="cinematic-action inline-flex items-center justify-center gap-2 rounded-lg border border-white/14 bg-white/8 px-5 py-3 text-sm font-black text-white hover:bg-white/14"
            >
              Group Retreats <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/spiritual"
              onClick={() => playCue("Pilgrimage scene opening", "Sacred routes, stays and transport flow are coming into view.")}
              className="cinematic-action inline-flex items-center justify-center gap-2 rounded-lg border border-white/14 bg-white/8 px-5 py-3 text-sm font-black text-white hover:bg-white/14"
            >
              Spiritual Tourism <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
