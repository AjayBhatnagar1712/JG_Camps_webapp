// app/india/north/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function NorthIndiaPage() {
  const states = ["Jammu & Kashmir", "Himachal Pradesh", "Uttarakhand", "Punjab", "Haryana", "Delhi"];

  return (
    <main className="min-h-screen bg-white text-slate-800">
      <section className="relative h-[44vh] md:h-[52vh] overflow-hidden rounded-b-2xl shadow-sm">
        <Image
          src="/images/regions/north-india.jpg"
          alt="North India"
          fill
          className="object-cover brightness-75"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="relative z-10 p-8 text-white">
          <h1 className="text-4xl md:text-6xl font-extrabold">North India — Hills, Spiritual Routes & Heritage</h1>
          <p className="mt-3 text-lg max-w-2xl">Overview copy goes here — mention highlights, seasons & travel tips.</p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold mb-4">Major states & areas</h2>

        <div className="flex flex-wrap gap-3">
          {states.map((s) => (
            <Link key={s} href={`/india/${s.toLowerCase().replace(/\s+/g, "-")}`} className="px-4 py-2 rounded-full border hover:bg-gray-50">
              {s}
            </Link>
          ))}
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-2">What to expect</h3>
          <p className="text-gray-600">Add descriptive paragraphs, sample itineraries or CTAs to contact the travel expert.</p>

          <div className="mt-6">
            <button
              onClick={() => window.dispatchEvent(new Event("open-contact-expert"))}
              className="inline-flex items-center px-5 py-3 rounded-2xl bg-emerald-800 text-white font-semibold"
            >
              Request a custom plan
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
