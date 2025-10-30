// app/india/south/andhra-pradesh/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function AndhraPradeshPage() {
  const openContact = () => window.dispatchEvent(new Event("open-contact-expert"));

  return (
    <main className="min-h-screen bg-white text-slate-800">
      <section className="relative w-full h-[52vh] overflow-hidden">
        <Image src="/images/south-india/andhra-pradesh.jpg" alt="Andhra Pradesh" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="relative z-10 container mx-auto px-6 h-full flex items-end pb-12">
          <div className="text-white max-w-3xl">
            <motion.h1 initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-extrabold">
              Andhra Pradesh
            </motion.h1>
            <p className="mt-2 text-sm text-emerald-100 max-w-xl">
              Temple circuits, coastline and coastal cuisine — Tirupati, Visakhapatnam and rich cultural heritage.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 px-6 container mx-auto max-w-4xl">
        <h2 className="text-2xl font-bold mb-4">Highlights</h2>
        <ul className="list-disc ml-5 text-gray-700 space-y-2">
          <li>Tirupati & Sri Venkateswara Temple</li>
          <li>Visakhapatnam beaches & Araku Valley</li>
          <li>Coastal cuisine — seafood and regional specialities</li>
          <li>Historic sites and temple architecture</li>
        </ul>

        <div className="mt-8 flex gap-3">
          <button onClick={openContact} className="px-5 py-3 rounded-2xl bg-emerald-800 text-white font-semibold">
            Contact Travel Expert
          </button>
          <Link href="/india/south" className="px-5 py-3 rounded-2xl border border-gray-200">
            Back to South India
          </Link>
        </div>
      </section>
    </main>
  );
}
