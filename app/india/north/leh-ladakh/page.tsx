// app/india/north/leh-ladakh/page.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function LehLadakhPage() {
  return (
    <main className="bg-white text-slate-800">
      {/* HERO */}
      <section className="relative w-full h-[68vh] md:h-[72vh] overflow-hidden rounded-b-3xl shadow-lg">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="/videos/leh_ladakh_hero.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster="/images/north-india/leh-ladakh.jpg"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />

        <div className="relative z-10 container mx-auto px-6 h-full flex items-center">
          <div className="max-w-3xl text-white">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight drop-shadow-md"
            >
              Leh &amp; Ladakh —{" "}
              <span className="text-amber-300">High-altitude Adventure</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}
              className="mt-4 text-lg sm:text-xl max-w-2xl text-emerald-100"
            >
              Dramatic mountain passes, crystal-clear lakes (Pangong, Tso Moriri), Buddhist gompas and unique high-desert landscapes — perfect for adventure, photography and wilderness escapes.
            </motion.p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                href="/india/north/plan"
                className="inline-flex items-center gap-3 bg-amber-400 text-black px-5 py-3 rounded-2xl font-semibold shadow-lg hover:brightness-95 transition"
                aria-label="Build itinerary for Leh & Ladakh"
              >
                Build Leh Itinerary
                <svg className="w-4 h-4" viewBox="0 0 20 20" fill="none" aria-hidden>
                  <path d="M6 5l6 5-6 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>

              <a
                href="#contact-expert"
                onClick={(e) => { e.preventDefault(); window.dispatchEvent(new Event("open-contact-expert")); }}
                className="inline-flex items-center gap-3 border border-white/30 text-white px-5 py-3 rounded-2xl font-semibold hover:bg-white/10 transition"
              >
                Contact Travel Expert
              </a>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <Stat label="Best Time" value="May–Sep" />
              <Stat label="Altitude" value="3,500–5,600 m" />
              <Stat label="Activities" value="Trekking, biking, sightseeing" />
            </div>
          </div>
        </div>
      </section>

      {/* WHY / HIGHLIGHTS */}
      <section className="py-14 px-6 container mx-auto">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold">Why visit Leh &amp; Ladakh?</h2>
            <p className="mt-3 text-lg text-gray-600 max-w-prose">
              Unique landscapes, clear night skies, remote monasteries and adrenaline routes make Ladakh a one-of-a-kind destination for nature lovers and adventurers.
            </p>

            <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Feature title="Stunning Lakes" text="Pangong, Tso Moriri and shallow salt lakes with surreal colors." />
              <Feature title="Cultural Gompas" text="Hemis, Thiksey and Shey — rich Tibetan Buddhist heritage." />
              <Feature title="High Pass Drives" text="Khardung La, Tanglang La and other iconic mountain passes." />
              <Feature title="Adventure Sports" text="Trekking, mountain biking and river rafting (seasonal)." />
            </ul>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-xl bg-gradient-to-tr from-white to-emerald-50 p-1">
            <div className="relative rounded-xl overflow-hidden h-72 sm:h-80">
              <Image
                src="/images/north-india/leh-ladakh.jpg"
                alt="Leh Ladakh overview"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* QUICK ITINERARY / CTA */}
      <section className="py-12 px-6 bg-slate-50">
        <div className="container mx-auto max-w-4xl">
          <h3 className="text-2xl font-bold text-center text-emerald-800 mb-4">Sample 6-day Leh &amp; Ladakh</h3>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-4 bg-white rounded-xl shadow-sm border">
              <h4 className="font-semibold mb-2">Day 1</h4>
              <p className="text-sm text-gray-600">Arrive Leh — acclimatize, short local walks, visit Leh Palace.</p>
            </div>
            <div className="p-4 bg-white rounded-xl shadow-sm border">
              <h4 className="font-semibold mb-2">Day 2</h4>
              <p className="text-sm text-gray-600">Leh → Nubra Valley via Khardung La, sand dunes at Hunder.</p>
            </div>
            <div className="p-4 bg-white rounded-xl shadow-sm border">
              <h4 className="font-semibold mb-2">Day 3</h4>
              <p className="text-sm text-gray-600">Nubra → Pangong Lake, overnight by the lake (camp/stay).</p>
            </div>
          </div>

          <div className="mt-6 text-center">
            <Link
              href="/india/north/plan"
              className="inline-flex items-center px-6 py-3 rounded-2xl bg-emerald-800 text-white font-semibold hover:brightness-95 transition"
            >
              Get a Custom Leh Plan
            </Link>
          </div>
        </div>
      </section>

      {/* PRACTICALS */}
      <section className="py-12 px-6">
        <div className="container mx-auto max-w-4xl">
          <h4 className="text-xl font-bold mb-3">Practical tips</h4>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Acclimatization is important — take it slow on arrival.</li>
            <li>Carry warm clothing even in summer nights — temperatures drop quickly.</li>
            <li>Permit requirements: check for protected area permits (if visiting certain passes/islands).</li>
          </ul>
        </div>
      </section>
    </main>
  );
}

/* small helpers used above (kept simple & consistent with other pages) */
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
