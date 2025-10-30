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

const WEST_STATES: DestinationCard[] = [
  {
    name: "Goa",
    image: "/images/west-india/goa.jpg",
    bestSeason: "Nov – Feb",
    famousPlaces: ["Panaji", "Baga Beach", "Old Goa"],
    highlights: "Beaches, nightlife, Portuguese heritage and coastal cuisine.",
  },
  {
    name: "Rajasthan",
    image: "/images/west-india/rajasthan.jpg",
    bestSeason: "Oct – Mar",
    famousPlaces: ["Jaipur", "Udaipur", "Jaisalmer", "Pushkar"],
    highlights: "Deserts, forts, palaces and royal heritage routes.",
  },
  {
    name: "Gujarat",
    image: "/images/west-india/gujarat.jpg",
    bestSeason: "Oct – Feb",
    famousPlaces: ["Ahmedabad", "Rann of Kutch", "Gir National Park"],
    highlights: "Salt marshes, desert festivals and Asiatic lion safaris.",
  },
  {
    name: "Maharashtra",
    image: "/images/west-india/maharashtra.jpg",
    bestSeason: "Oct – Feb",
    famousPlaces: ["Mumbai", "Pune", "Ajanta & Ellora", "Konkan Coast"],
    highlights: "City culture, historic caves, and scenic coastal drives.",
  },
  {
    name: "Dadra & Nagar Haveli",
    image: "/images/west-india/dadra-nagar-haveli.jpg",
    bestSeason: "Oct – Mar",
    famousPlaces: ["Silvassa", "Vanganga Lake", "Eco-trails"],
    highlights: "Quiet nature retreats, tribal crafts and riverside walks.",
  },
  {
    name: "Daman & Diu",
    image: "/images/west-india/daman-diu.jpg",
    bestSeason: "Oct – Feb",
    famousPlaces: ["Diu Fort", "Nagoa Beach", "Daman Lighthouse"],
    highlights: "Calm beaches, colonial forts and relaxed seaside escapes.",
  },
];

// animation for cards
const cardVariants: Variants = {
  offscreen: { opacity: 0, y: 18, scale: 0.98 },
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

export default function WestIndiaPage() {
  return (
    <main className="bg-white text-slate-800">
      {/* HERO */}
      <section className="relative w-full h-[68vh] md:h-[72vh] overflow-hidden rounded-b-3xl shadow-lg">
        {/* optional video (browser will fall back to poster image) */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="/videos/west_hero.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster="/images/west-india/west-hero.jpg"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />

        <div className="relative z-10 container mx-auto px-6 h-full flex items-center">
          <div className="max-w-3xl text-white">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight drop-shadow-md"
            >
              Explore <span className="text-amber-300">West India</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-4 text-lg sm:text-xl max-w-2xl text-emerald-100"
            >
              From sun-kissed beaches to royal desert forts and vibrant coastal culture — western India offers hugely varied itineraries.
            </motion.p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                href="/india/west/plan"
                className="inline-flex items-center gap-3 bg-amber-400 text-black px-5 py-3 rounded-2xl font-semibold shadow-lg hover:brightness-95 transition"
                aria-label="Build itinerary for West India"
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
                type="button"
              >
                Contact Travel Expert
              </button>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <Stat label="Beaches & Coast" value="100+" />
              <Stat label="Heritage Sites" value="80+" />
              <Stat label="Best Months" value="Oct–Feb" />
            </div>
          </div>
        </div>
      </section>

      {/* WHY / FEATURES */}
      <section className="py-14 px-6 container mx-auto">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold">Why visit West India?</h2>
            <p className="mt-3 text-lg text-gray-600 max-w-prose">
              West India blends lively coastal culture, regal palaces, desert odysseys and bustling modern cities — great for mixed itineraries with contrast.
            </p>

            <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Feature title="Coastal Escapes" text="Beaches, seafood and water sports across Goa & Diu." />
              <Feature title="Royal Heritage" text="Palaces, forts and desert experiences in Rajasthan." />
              <Feature title="Wildlife & Nature" text="Gir lions, Western Ghats and remote islands." />
              <Feature title="Urban & Cultural" text="Mumbai's energy, Gujarati festivals and local crafts." />
            </ul>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-xl bg-gradient-to-tr from-white to-emerald-50 p-1">
            <div className="relative rounded-xl overflow-hidden h-72 sm:h-80">
              <Image
                src="/images/west-india/west-hero.jpg"
                alt="West India overview"
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
          <h2 className="text-3xl font-bold text-center mb-8">Top West India Destinations</h2>

          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
            {WEST_STATES.map((dest) => (
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
                    sizes="(max-width: 768px) 100vw, 33vw"
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
                      href={`/india/west/${slugify(dest.name)}`}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-amber-700 hover:underline"
                    >
                      View itineraries →
                    </Link>

                    <button
                      onClick={() =>
                        logLeadClient({
                          channel: "destination-click",
                          name: dest.name,
                          page: "west-india",
                        })
                      }
                      className="text-sm rounded-full border py-2 px-3 text-emerald-700 hover:bg-emerald-50 transition"
                      type="button"
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
            <h3 className="text-2xl font-bold text-emerald-800">Ready to explore West India?</h3>
            <p className="mt-2 text-gray-700 max-w-xl">Share your dates & preferences — our experts will craft a custom west-India itinerary.</p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => window.dispatchEvent(new Event("open-contact-expert"))}
              className="inline-flex items-center px-6 py-3 rounded-2xl bg-emerald-800 text-white font-semibold hover:brightness-95 transition"
              type="button"
            >
              Get Free Consultation
            </button>

            <Link
              href="/india/west/plan"
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

/* small helpers */
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
  return s
    .toLowerCase()
    // remove ampersand (and similar lone punctuation) first
    .replace(/&/g, "")
    // remove any remaining non-word (letters/digits/_) or space or hyphen
    .replace(/[^\w\s-]/g, "")
    .trim()
    // spaces -> hyphens
    .replace(/\s+/g, "-")
    // collapse multiple hyphens
    .replace(/-+/g, "-");
}

async function logLeadClient(payload: Record<string, any>) {
  try {
    await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...payload,
        page: "west-india",
        meta: { clientTs: new Date().toISOString() },
      }),
    });
  } catch {
    // silent
  }
}
