// app/spiritual/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";

export default function SpiritualPage() {
  const topics = ["Chardham Yatra", "Vaishno Devi", "Rishikesh", "Bodh Gaya", "Amarnath"];
  return (
    <main className="min-h-screen bg-white text-slate-800">
      <section className="relative h-[44vh] md:h-[52vh] overflow-hidden rounded-b-2xl shadow-sm">
        <Image src="/images/regions/spiritual-tourism.jpg" alt="Spiritual Tourism" fill className="object-cover brightness-75" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="relative z-10 p-8 text-white">
          <h1 className="text-4xl md:text-5xl font-bold">Spiritual Tourism</h1>
          <p className="mt-2 text-lg max-w-2xl">Pilgrimages, retreats and sacred circuits across India.</p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold mb-4">Popular pilgrim circuits</h2>
        <div className="flex flex-wrap gap-3">
          {topics.map((t) => (
            <Link key={t} href={`/spiritual/${t.toLowerCase().replace(/\s+/g, "-")}`} className="px-4 py-2 rounded-full border">
              {t}
            </Link>
          ))}
        </div>

        <div className="mt-8 text-gray-600">
          <p>Note: For bookings we handle permits and specific logistics. Contact JG Camps & Resorts for confirmed stay bookings.</p>
          <div className="mt-4">
            <button onClick={() => window.dispatchEvent(new Event("open-contact-expert"))} className="px-4 py-2 rounded-full bg-amber-400">
              Contact Expert
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
