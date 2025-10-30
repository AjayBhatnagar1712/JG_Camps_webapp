// app/india/central/chhattisgarh/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function ChhattisgarhPage() {
  const state = {
    name: "Chhattisgarh",
    image: "/images/central-india/chhattisgarh.jpg",
    bestSeason: "Oct – Mar",
    highlights: "Dense forests, waterfalls, tribal culture and wildlife corridors.",
    famousPlaces: ["Barnawapara", "Chitrakote Falls", "Kanger Valley"],
  };

  return (
    <main className="min-h-screen bg-white text-slate-800">
      {/* HERO */}
      <section className="relative w-full h-[50vh] overflow-hidden rounded-b-2xl">
        <Image src={state.image} alt={state.name} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="relative z-10 container mx-auto px-6 h-full flex items-end pb-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow">{state.name}</h1>
            <p className="mt-2 text-white/90 text-lg max-w-2xl">{state.highlights}</p>
            {state.bestSeason && (
              <div className="mt-3 inline-block bg-white/90 text-emerald-800 px-4 py-1 rounded-full text-sm font-semibold">
                Best Season: {state.bestSeason}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* DETAILS */}
      <section className="container mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold mb-3 text-emerald-800">About {state.name}</h2>
        <p className="text-gray-700 mb-6">{state.highlights}</p>

        <div className="mb-6">
          <h3 className="font-semibold text-lg mb-2">Famous Places</h3>
          <ul className="list-disc list-inside text-gray-700">
            {state.famousPlaces.map((place) => (
              <li key={place}>{place}</li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap gap-3 mt-8">
          <button
            onClick={() => window.dispatchEvent(new Event("open-contact-expert"))}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-emerald-800 text-white font-semibold hover:brightness-95 transition"
          >
            Contact Travel Expert
          </button>

          <Link href="/india/central" className="inline-flex items-center gap-2 px-5 py-2 rounded-lg border border-emerald-200 text-emerald-800 hover:bg-emerald-50">
            ← Back to Central India
          </Link>
        </div>
      </section>
    </main>
  );
}
