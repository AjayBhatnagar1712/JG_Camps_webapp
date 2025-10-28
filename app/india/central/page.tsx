// app/central/page.tsx
"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import React from "react";

interface DestinationCard {
  name: string;
  image: string;
  bestSeason?: string;
  famousPlaces?: string[];
  highlights?: string;
}

const CENTRAL_STATES: DestinationCard[] = [
  {
    name: "Chhattisgarh",
    image: "/images/central-india/chhattisgarh.jpg",
    bestSeason: "Oct – Mar",
    famousPlaces: ["Barnawapara", "Chitrakote Falls", "Kanger Valley"],
    highlights: "Dense forests, waterfalls, tribal culture and wildlife corridors.",
  },
  {
    name: "Madhya Pradesh",
    image: "/images/central-india/madhya-pradesh.jpg",
    bestSeason: "Oct – Mar",
    famousPlaces: ["Khajuraho", "Bandhavgarh", "Pench", "Sanchi"],
    highlights: "Rich heritage, national parks, and classical architecture.",
  },
];

// small card animation variants (consistent with other pages)
const cardVariants: Variants = {
  offscreen: { opacity: 0, y: 18, scale: 0.995 },
  onscreen: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      bounce: 0.08,
      duration: 0.6,
    },
  },
};

export default function CentralIndiaPage() {
  return (
    <main className="bg-white text-slate-800">
      {/* HERO */}
      <section className="relative w-full h-[68vh] md:h-[72vh] overflow-hidden rounded-b-3xl shadow-lg">
        {/* Video preferred; if missing browser will fallback to poster */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="/videos/central_hero.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster="/images/central-india/central-hero.jpg"
        />
        {/* soft gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/30 to-transparent" />

        {/* hero content */}
        <div className="relative z-10 container mx-auto px-6 h-full flex items-center">
          <div className="max-w-3xl text-white">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight drop-shadow-md"
            >
              Discover <span className="text-amber-300">Central India</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-4 text-lg sm:text-xl max-w-2xl text-emerald-100"
            >
              Explore dense forests, UNESCO heritage sites and wildlife-rich national parks across Madhya Pradesh and Chhattisgarh.
            </motion.p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                href="/india/central/plan"
                className="inline-flex items-center gap-3 bg-amber-400 text-black px-5 py-3 rounded-2xl font-semibold shadow-lg hover:brightness-95 transition"
                aria-label="Build itinerary for Central India"
              >
                Build Itinerary
                <svg className="w-4 h-4" viewBox="0 0 20 20" fill="none" aria-hidden>
                  <path d="M6 5l6 5-6 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>

              <button
                onClick={() => window.dispatchEvent(new Event("open-contact-expert"))}
                className="inline-flex items-center gap-3 border border-white/30 text-white px-5 py-3 rounded-2xl font-semibold hover:bg-white/10 transition"
                aria-label="Contact travel expert"
              >
                Contact Travel Expert
              </button>
            </div>

            {/* quick stats */}
            <div className="mt-8 flex flex-wrap gap-4">
              <Stat label="Wildlife Parks" value="20+" />
              <Stat label="Heritage Sites" value="10+" />
              <Stat label="Best Months" value="Oct–Mar" />
            </div>
          </div>
        </div>
      </section>

      {/* WHY / FEATURES */}
      <section className="py-14 px-6 container mx-auto">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold">Why Central India?</h2>
            <p className="mt-3 text-lg text-gray-600 max-w-prose">
              Central India is a blend of deep forest wilderness, rich tribal culture and classical historic sites — great for wildlife safaris, heritage explorers and nature lovers.
            </p>

            <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Feature title="Wildlife & Safaris" text="Bandhavgarh, Pench, Kanha & more — big cat habitats and excellent guides." />
              <Feature title="Heritage & Temples" text="Khajuraho's temples, Sanchi's stupas and historic forts." />
              <Feature title="Tribal Culture" text="Authentic tribal arts, festivals and rural experiences." />
              <Feature title="Offbeat Escapes" text="Waterfalls, caves and riverine landscapes away from crowds." />
            </ul>
          </div>

          {/* decorative card / image */}
          <div className="rounded-2xl overflow-hidden shadow-xl bg-gradient-to-tr from-white to-emerald-50 p-1">
            <div className="relative rounded-xl overflow-hidden h-72 sm:h-80">
              <Image
                src="/images/central-india/central-hero.jpg"
                alt="Central India overview"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* DESTINATIONS GRID */}
      <section className="py-16 px-6 bg-slate-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Top Central India Destinations</h2>

          {/* responsive grid — 1 / 2 cols so two cards look balanced on larger screens */}
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-2">
            {CENTRAL_STATES.map((dest) => (
              <motion.article
                key={dest.name}
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true, amount: 0.2 }}
                variants={cardVariants}
                className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100"
              >
                <div className="relative h-56">
                  <Image
                    src={dest.image}
                    alt={dest.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  {dest.bestSeason && (
                    <div className="absolute top-3 left-3 bg-white/90 text-sm rounded-full px-3 py-1 font-semibold text-emerald-700 shadow">
                      {dest.bestSeason}
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-emerald-800 mb-2">{dest.name}</h3>
                  <p className="text-gray-700 mb-3">{dest.highlights}</p>
                  {dest.famousPlaces && (
                    <div className="text-sm text-gray-500 mb-4">
                      <strong>Famous:</strong> {dest.famousPlaces.join(", ")}
                    </div>
                  )}

                  <div className="flex items-center justify-between gap-3">
                    <Link
                      href={`/india/central/${slugify(dest.name)}`}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-amber-700 hover:underline"
                      aria-label={`View itineraries for ${dest.name}`}
                    >
                      View itineraries →
                    </Link>

                    <button
                      onClick={() =>
                        logLeadClient({
                          channel: "destination-click",
                          name: dest.name,
                          page: "central-india",
                        })
                      }
                      className="text-sm rounded-full border py-2 px-3 text-emerald-700 hover:bg-emerald-50 transition"
                    >
                      Notify me
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 px-6">
        <div className="container mx-auto rounded-3xl bg-gradient-to-r from-amber-50/80 to-amber-100 p-8 shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold text-emerald-800">Ready to explore Central India?</h3>
            <p className="mt-2 text-gray-700 max-w-xl">
              Share dates & preferences and our travel experts will craft a custom itinerary with bookings.
            </p>
          </div>

          <div className="flex gap-3">
            {/* Changed: this now opens the global Contact Travel Expert modal via event */}
            <button
              onClick={() => window.dispatchEvent(new Event("open-contact-expert"))}
              className="inline-flex items-center px-6 py-3 rounded-2xl bg-emerald-800 text-white font-semibold hover:brightness-95 transition"
            >
              Get Free Travel Consultation
            </button>

            <Link
              href="/india/central/plan"
              className="inline-flex items-center px-6 py-3 rounded-2xl border border-emerald-200 text-emerald-800 font-semibold hover:bg-emerald-50 transition"
            >
              Build Itinerary
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ---------- small helper components & utils ---------- */

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="inline-flex items-center gap-3 bg-white/5 rounded-full px-4 py-2">
      <div className="text-sm text-amber-200 font-bold">{value}</div>
      <div className="text-sm text-emerald-100">{label}</div>
    </div>
  );
}

function Feature({ title, text }: { title: string; text: string }) {
  return (
    <div className="flex gap-4 items-start bg-white p-4 rounded-xl shadow-sm">
      <div className="h-10 w-10 rounded-md bg-emerald-50 grid place-items-center text-emerald-700 font-bold">✓</div>
      <div>
        <div className="font-semibold text-emerald-800">{title}</div>
        <div className="text-sm text-gray-600">{text}</div>
      </div>
    </div>
  );
}

function slugify(s: string) {
  return s.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "");
}

/** quick "fire-and-forget" client lead logger that uses the /api/leads endpoint. */
async function logLeadClient(payload: Record<string, any>) {
  try {
    await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...payload,
        page: "central-india",
        meta: { clientTs: new Date().toISOString() },
      }),
    });
  } catch (e) {
    // swallow — logging should not break the UI
  }
}
