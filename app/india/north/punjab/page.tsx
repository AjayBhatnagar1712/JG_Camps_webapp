// app/india/north/punjab/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

const DATA = {
  name: "Punjab",
  image: "/images/north-india/punjab.jpg",
  bestSeason: "Oct – Mar",
  famousPlaces: ["Amritsar", "Golden Temple", "Wagah Border"],
  highlights: "Warm hospitality, Sikh heritage and hearty cuisine.",
};

export default function PunjabPage() {
  const openContact = () => window.dispatchEvent(new Event("open-contact-expert"));
  return (
    <main className="bg-white text-slate-800">
      <section className="relative w-full h-[52vh] md:h-[56vh] overflow-hidden rounded-b-2xl shadow-lg">
        <Image src={DATA.image} alt={DATA.name} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
        <div className="relative z-10 container mx-auto px-6 h-full flex items-center">
          <div className="max-w-3xl text-white">
            <h1 className="text-4xl md:text-5xl font-extrabold">{DATA.name}</h1>
            <p className="mt-3 text-lg text-emerald-100">{DATA.highlights}</p>
            <div className="mt-4 flex gap-3">
              <button onClick={openContact} className="px-4 py-2 rounded-2xl bg-emerald-700 text-white font-semibold">
                Contact Travel Expert
              </button>
              <Link href="/india/north/plan" className="px-4 py-2 rounded-2xl border border-white/30 text-white">
                Build Itinerary
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 px-6 container mx-auto max-w-4xl">
        <h2 className="text-2xl font-bold text-emerald-800 mb-4">About {DATA.name}</h2>
        <p className="text-gray-700 mb-4">{DATA.highlights} Best season: <strong>{DATA.bestSeason}</strong>.</p>
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Famous places</h3>
          <ul className="list-disc pl-6 text-gray-700">
            {DATA.famousPlaces.map(p => <li key={p}>{p}</li>)}
          </ul>
        </div>

        <div className="rounded-2xl bg-slate-50 p-6 border border-gray-100">
          <h4 className="font-semibold mb-2">Plan your trip to {DATA.name}</h4>
          <p className="text-gray-600 mb-4">Tell us your dates & preferences — our experts will craft a custom itinerary and help with bookings.</p>
          <div className="flex gap-3">
            <button onClick={openContact} className="inline-flex items-center px-6 py-3 rounded-2xl bg-amber-400 text-black font-semibold">
              Get Free Consultation
            </button>
            <Link href="/india/north" className="inline-flex items-center px-6 py-3 rounded-2xl border border-emerald-200 text-emerald-800">
              Back to North
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
