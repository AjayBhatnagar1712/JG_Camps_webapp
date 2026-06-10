"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CalendarDays, Compass, Hotel, MapPinned, MessageCircle, Route, ShieldCheck, Sparkles } from "lucide-react";
import { useCallback } from "react";

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
  const openPlanner = useCallback((e?: React.MouseEvent) => {
    e?.preventDefault();
    window.dispatchEvent(new Event("open-planner"));
  }, []);

  const openContact = useCallback((e?: React.MouseEvent) => {
    e?.preventDefault();
    window.dispatchEvent(new Event("open-contact-expert"));
  }, []);

  const planJourney = useCallback((journey: Journey) => {
    window.dispatchEvent(
      new CustomEvent("open-planner-with", {
        detail: {
          state: journey.title,
          location: journey.title,
        },
      })
    );
  }, []);

  return (
    <main className="cinematic-home bg-[#020712] text-white">
      <section className="relative min-h-[calc(100svh-76px)] overflow-hidden">
        <Image
          src="/images/north-india/north-hero.jpg"
          alt="Cinematic North India journey"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,7,18,0.94)_0%,rgba(2,24,44,0.72)_43%,rgba(2,7,18,0.18)_100%),linear-gradient(180deg,rgba(2,7,18,0.12)_0%,rgba(2,7,18,0.88)_100%)]" />

        <div className="relative z-10 mx-auto flex min-h-[calc(100svh-76px)] max-w-7xl flex-col justify-center px-4 py-12 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/18 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-cyan-100 backdrop-blur">
              <Compass className="h-4 w-4 text-amber-200" />
              Journey Gate Private Travel
            </div>

            <h1 className="mt-6 max-w-4xl text-[clamp(3.2rem,8vw,7.2rem)] font-black leading-[0.88] tracking-tight text-balance">
              North India, planned like a private film.
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-200 sm:text-lg">
              One expert route. Handpicked stays. Smooth transport. No clutter.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button onClick={openContact} className="inline-flex items-center justify-center gap-2 rounded-lg bg-amber-200 px-6 py-4 text-sm font-black text-slate-950 shadow-2xl shadow-black/25 hover:bg-amber-100">
                Speak to an Expert <MessageCircle className="h-5 w-5" />
              </button>
              <button onClick={openPlanner} className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/10 px-6 py-4 text-sm font-black text-white backdrop-blur hover:bg-white/16">
                Start Planning <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </motion.div>

          <div className="mt-12 grid max-w-3xl gap-3 sm:grid-cols-3">
            {PROMISES.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="rounded-lg border border-white/12 bg-white/8 p-4 backdrop-blur">
                  <Icon className="h-5 w-5 text-amber-200" />
                  <div className="mt-3 text-sm font-black">{item.title}</div>
                  <p className="mt-1 text-xs leading-5 text-slate-300">{item.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="north-destinations" className="relative overflow-hidden px-4 py-16 sm:px-6">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#020712_0%,#061724_48%,#020712_100%)]" />
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-cyan-200">
                <MapPinned className="h-4 w-4" />
                Signature North India
              </div>
              <h2 className="mt-4 max-w-3xl text-[clamp(2.4rem,5vw,5rem)] font-black leading-[0.95] tracking-tight">
                Five journeys. Infinite ways to make them yours.
              </h2>
            </div>
            <button onClick={openPlanner} className="inline-flex w-fit items-center gap-2 rounded-lg border border-white/16 bg-white/8 px-5 py-3 text-sm font-black text-white backdrop-blur hover:bg-white/14">
              Build from scratch <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="grid gap-4 lg:grid-cols-5">
            {JOURNEYS.map((journey, index) => (
              <motion.article
                key={journey.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.45, delay: Math.min(index * 0.05, 0.2) }}
                className="group relative min-h-[420px] overflow-hidden rounded-lg border border-white/10 bg-slate-900 shadow-2xl shadow-black/20"
              >
                <Image src={journey.image} alt={journey.title} fill className="object-cover transition duration-700 group-hover:scale-105" sizes="(max-width: 1024px) 100vw, 20vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/38 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <div className="mb-3 inline-flex rounded-full bg-white/90 px-3 py-1 text-xs font-black text-slate-950">{journey.tag}</div>
                  <h3 className="text-2xl font-black">{journey.title}</h3>
                  <p className="mt-2 min-h-[64px] text-sm leading-6 text-slate-200">{journey.line}</p>
                  <div className="mt-5 flex gap-2">
                    <Link href={journey.href} className="inline-flex flex-1 items-center justify-center rounded-lg bg-white px-3 py-2.5 text-sm font-black text-slate-950">
                      View
                    </Link>
                    <button onClick={() => planJourney(journey)} className="inline-flex flex-1 items-center justify-center rounded-lg border border-white/20 bg-white/10 px-3 py-2.5 text-sm font-black text-white backdrop-blur">
                      Plan
                    </button>
                  </div>
                </div>
              </motion.article>
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
              <button onClick={openPlanner} className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-4 py-3 text-sm font-black text-slate-950">
                Open Planner <CalendarDays className="h-4 w-4" />
              </button>
              <button onClick={openContact} className="inline-flex items-center justify-center gap-2 rounded-lg bg-amber-200 px-4 py-3 text-sm font-black text-slate-950">
                Get Quote <MessageCircle className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 border-t border-white/10 pt-10 md:flex-row md:items-end">
          <div>
            <div className="text-xs font-black uppercase tracking-[0.2em] text-cyan-200">Special planning</div>
            <h2 className="mt-3 max-w-2xl text-3xl font-black tracking-tight md:text-5xl">
              Groups and pilgrimages, handled quietly.
            </h2>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/group-retreats" className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/14 bg-white/8 px-5 py-3 text-sm font-black text-white hover:bg-white/14">
              Group Retreats <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/spiritual" className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/14 bg-white/8 px-5 py-3 text-sm font-black text-white hover:bg-white/14">
              Spiritual Tourism <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
