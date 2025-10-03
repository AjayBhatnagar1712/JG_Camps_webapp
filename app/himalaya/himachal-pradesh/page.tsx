"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

/**
 * Himachal Pradesh — card-grid style places + Custom Itinerary card.
 * File: app/himalaya/himachal-pradesh/page.tsx
 *
 * Images expected at:
 * public/images/himalaya/Himachal_Pradesh/
 * e.g. himachal-hero.jpg, shimla.jpg, manali.jpg, ...
 *
 * Video expected at:
 * public/videos/Himachal_pradesh.mp4
 */

type Place = {
  id: string;
  name: string;
  image: string;
  blurb: string;
  bestSeason?: string;
};

const PLACES: Place[] = [
  { id: "shimla", name: "Shimla", image: "/images/himalaya/Himachal_Pradesh/shimla.jpg", blurb: "Colonial charm, Mall Road shopping and scenic viewpoints.", bestSeason: "Mar–Jun, Sep–Nov" },
  { id: "manali", name: "Manali", image: "/images/himalaya/Himachal_Pradesh/manali.jpg", blurb: "Gateway to adventure sports and the Solang Valley.", bestSeason: "Mar–Jun, Nov–Feb" },
  { id: "mcleodganj", name: "McLeod Ganj", image: "/images/himalaya/Himachal_Pradesh/mcleodganj.jpg", blurb: "Tibetan culture, Dalai Lama temple and peaceful cafes.", bestSeason: "Mar–Jun, Sep–Nov" },
  { id: "dharamshala", name: "Dharamshala", image: "/images/himalaya/Himachal_Pradesh/dharamshala.jpg", blurb: "Monasteries, tea gardens and mountain panoramas.", bestSeason: "Mar–Jun, Sep–Nov" },
  { id: "spiti", name: "Spiti Valley", image: "/images/himalaya/Himachal_Pradesh/spiti.jpg", blurb: "High-altitude desert, remote monasteries and wild vistas.", bestSeason: "Jun–Sep" },
  { id: "kasol", name: "Kasol", image: "/images/himalaya/Himachal_Pradesh/kasol.jpg", blurb: "Riverside cafes, trekking and backpacker vibe in Parvati Valley.", bestSeason: "Mar–Jun, Sep–Nov" },
  { id: "solang", name: "Solang Valley", image: "/images/himalaya/Himachal_Pradesh/solang.jpg", blurb: "Paragliding, skiing and adventure sports next to Manali.", bestSeason: "Dec–Mar (snow), Apr–Jun" },
  { id: "chamba", name: "Chamba", image: "/images/himalaya/Himachal_Pradesh/chamba.jpg", blurb: "Old-world temples, meadows and offbeat riverside stays.", bestSeason: "Apr–Oct" },
  { id: "kalpa", name: "Kalpa (Kinnaur)", image: "/images/himalaya/Himachal_Pradesh/kalpa.jpg", blurb: "Apple orchards and Kinner Kailash views.", bestSeason: "May–Oct" },
  { id: "triund", name: "Triund", image: "/images/himalaya/Himachal_Pradesh/triund.jpg", blurb: "Short trek from Dharamshala with an iconic ridge campsite.", bestSeason: "Mar–Jun, Sep–Nov" },
  { id: "rohtang", name: "Rohtang Pass", image: "/images/himalaya/Himachal_Pradesh/rohtang.jpg", blurb: "Snow-laden expanses — permits often required.", bestSeason: "May–Oct" },
];

export default function HimachalPage() {
  // open contact modal via global event — GlobalCTAs listens for this
  function openContact() {
    if (typeof window !== "undefined") window.dispatchEvent(new Event("open-contact-expert"));
  }

  // small local UI for the custom-itinerary card (non-blocking)
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", dates: "", notes: "" });
  const submittingDisabled = form.phone.trim().length < 6; // minimal validation

  function submitCustomRequest(e: React.FormEvent) {
    e.preventDefault();
    // We'll simply trigger the same global modal so expert can follow up
    openContact();
    // Optionally: attach form data to a global event if you later want to pre-fill modal
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("custom-itinerary-submitted", { detail: form }));
    }
    setShowForm(false);
    setForm({ name: "", phone: "", dates: "", notes: "" });
  }

  return (
    <main className="bg-white text-slate-900">
      {/* HERO - VIDEO */}
      <section className="relative h-[62vh] md:h-[72vh] overflow-hidden rounded-b-2xl shadow-sm">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster="/images/himalaya/Himachal_Pradesh/himachal-hero.jpg"
        >
          {/* Primary source — place the uploaded file at /public/videos/Himachal_pradesh.mp4 */}
          <source src="/videos/Himachal_pradesh.mp4" type="video/mp4" />
          {/* You can add additional <source> formats if you provide them */}
          Your browser does not support the video tag.
        </video>

        {/* dark overlay for legible text */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 text-white">
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-extrabold leading-tight max-w-4xl drop-shadow-lg"
          >
            Himachal Pradesh — mountains, meadows & soulful stays
          </motion.h1>

          <p className="mt-4 text-md md:text-lg text-emerald-100 max-w-3xl">
            From colonial hill towns to high-altitude deserts — curated itineraries for every traveller.
          </p>

          <div className="mt-8 flex gap-4">
            <Link
              href="/himalaya/plan"
              className="inline-flex items-center px-6 py-3 rounded-full bg-amber-400 text-black font-semibold shadow-lg hover:brightness-95 transition"
            >
              Build Your Itinerary
            </Link>

            <button
              onClick={openContact}
              className="inline-flex items-center px-6 py-3 rounded-full border border-white/30 text-white font-semibold hover:bg-white/10 transition"
            >
              Contact Expert
            </button>
          </div>
        </div>
      </section>

      {/* WHY VISIT */}
      <section className="py-12 md:py-16 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Himachal?</h2>
            <p className="text-gray-700 max-w-xl mb-4">
              A wonderland of Himalayan landscapes — perfect for families, couples, solo travellers and adventure groups.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 bg-white rounded-lg shadow-sm">
                <h4 className="font-semibold text-emerald-800">Adventure & Treks</h4>
                <p className="text-sm text-gray-600 mt-1">Trekking, river sports and high-altitude routes for all levels.</p>
              </div>
              <div className="p-4 bg-white rounded-lg shadow-sm">
                <h4 className="font-semibold text-emerald-800">Culture & Spirituality</h4>
                <p className="text-sm text-gray-600 mt-1">Monasteries, temples, and local festivals to explore.</p>
              </div>
              <div className="p-4 bg-white rounded-lg shadow-sm">
                <h4 className="font-semibold text-emerald-800">Wellness & Retreats</h4>
                <p className="text-sm text-gray-600 mt-1">Luxury wellness stays and rejuvenation centres.</p>
              </div>
              <div className="p-4 bg-white rounded-lg shadow-sm">
                <h4 className="font-semibold text-emerald-800">Offbeat & Scenic</h4>
                <p className="text-sm text-gray-600 mt-1">Remote valleys, apple orchards, and desert-like highlands.</p>
              </div>
            </div>
          </div>

          <div className="rounded-lg overflow-hidden shadow-lg">
            <Image
              src="/images/himalaya/Himachal_Pradesh/himachal-hero.jpg"
              alt="Himachal scenic"
              width={1200}
              height={700}
              className="w-full h-64 md:h-80 object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* CARDS GRID (places + custom itinerary card) */}
      <section className="py-8 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl md:text-3xl font-bold">Top Places & Experiences</h3>
          <p className="text-sm text-gray-500">Choose a destination to explore or request a custom itinerary.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Custom itinerary card (prominent) */}
          <motion.div
            className="col-span-1 lg:col-span-1 bg-gradient-to-br from-amber-50 to-white rounded-2xl p-6 shadow-md border border-amber-100"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <h4 className="text-xl font-bold text-emerald-900">Custom Itinerary & Bookings</h4>
                <p className="text-sm text-gray-600 mt-2">
                  Tell us your dates, interests and budget — our experts will craft a personalised Himachal plan with hotels, meals and activities.
                </p>

                <div className="mt-4 space-y-3">
                  {!showForm ? (
                    <>
                      <button
                        onClick={() => setShowForm(true)}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-800 text-white font-semibold hover:opacity-95"
                      >
                        Start Custom Plan
                      </button>

                      <button
                        onClick={openContact}
                        className="ml-2 inline-flex items-center gap-2 px-3 py-2 rounded-full border border-emerald-800 text-emerald-800 hover:bg-emerald-50"
                      >
                        Contact Travel Expert
                      </button>
                    </>
                  ) : (
                    <form onSubmit={submitCustomRequest} className="mt-2 space-y-3">
                      <input
                        value={form.name}
                        onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
                        placeholder="Your name"
                        className="w-full p-3 rounded-lg border border-amber-200"
                      />
                      <input
                        value={form.phone}
                        onChange={(e) => setForm((s) => ({ ...s, phone: e.target.value }))}
                        placeholder="Phone (required)"
                        className="w-full p-3 rounded-lg border border-amber-200"
                        required
                      />
                      <input
                        value={form.dates}
                        onChange={(e) => setForm((s) => ({ ...s, dates: e.target.value }))}
                        placeholder="Dates (eg. 20 Sep - 27 Sep)"
                        className="w-full p-3 rounded-lg border border-amber-200"
                      />
                      <textarea
                        value={form.notes}
                        onChange={(e) => setForm((s) => ({ ...s, notes: e.target.value }))}
                        placeholder="Tell us preferences (places, pace, budget)..."
                        className="w-full p-3 rounded-lg border border-amber-200 min-h-[88px]"
                      />
                      <div className="flex gap-2">
                        <button
                          type="submit"
                          disabled={submittingDisabled}
                          className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-800 text-white font-semibold disabled:opacity-60"
                        >
                          Request Plan
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setShowForm(false);
                            setForm({ name: "", phone: "", dates: "", notes: "" });
                          }}
                          className="inline-flex items-center px-4 py-2 rounded-full border border-gray-300"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>

              <div className="w-36 h-36 rounded-lg overflow-hidden shadow-inner hidden md:block">
                <Image
                  src="/images/himalaya/Himachal_Pradesh/custom-card.jpg"
                  alt="Custom itinerary"
                  width={192}
                  height={192}
                  className="object-cover"
                />
              </div>
            </div>
          </motion.div>

          {/* Place cards */}
          {PLACES.map((p, i) => (
            <motion.article
              key={p.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100"
            >
              <div className="relative w-full h-44 md:h-52">
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  className="object-cover"
                  priority={i < 3}
                />
              </div>

              <div className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <h4 className="text-lg font-semibold text-emerald-800">{p.name}</h4>
                  {p.bestSeason && <span className="text-sm text-gray-500">{p.bestSeason}</span>}
                </div>

                <p className="mt-3 text-gray-600 text-sm">{p.blurb}</p>

                <div className="mt-4 flex items-center gap-3">
                  <Link href={`/himalaya/${p.id}`} className="text-amber-500 font-medium hover:underline">
                    Explore
                  </Link>

                  <button
                    onClick={openContact}
                    className="ml-auto inline-flex items-center gap-2 px-3 py-2 rounded-full bg-emerald-800 text-white text-sm font-medium hover:opacity-95"
                  >
                    Contact Expert
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-14 px-6 bg-gradient-to-r from-emerald-700 to-emerald-900 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Ready for Your Himachal Adventure?</h2>
        <p className="mb-6 text-lg">Share your travel plans — we’ll craft and confirm your dream trip with ease.</p>
        <button onClick={openContact} className="bg-amber-400 text-black px-8 py-3 rounded-full font-semibold hover:brightness-95 transition">
          Get Free Consultation
        </button>
      </section>
    </main>
  );
}
