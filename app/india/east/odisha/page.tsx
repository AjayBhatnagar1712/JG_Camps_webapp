// app/india/east/odisha/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function OdishaPage() {
  const openContact = () => window.dispatchEvent(new Event("open-contact-expert"));

  return (
    <main className="min-h-screen bg-white text-slate-800">
      <section className="relative w-full h-[52vh] overflow-hidden">
        <Image src="/images/east-india/odisha.jpg" alt="Odisha" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="relative z-10 container mx-auto px-6 h-full flex items-end pb-12">
          <div className="text-white max-w-3xl">
            <motion.h1 className="text-4xl font-extrabold">Odisha</motion.h1>
            <p className="mt-2 text-sm text-emerald-100">Temple architecture, beaches (Puri) and classical Odissi culture.</p>
          </div>
        </div>
      </section>

      <section className="py-12 px-6 container mx-auto max-w-4xl">
        <h2 className="text-2xl font-bold mb-4">Highlights</h2>
        <ul className="list-disc ml-5 text-gray-700 space-y-2">
          <li>Puri & Jagannath Temple, Rath Yatra and seaside ghats.</li>
          <li>Konark Sun Temple — UNESCO-worthy architecture.</li>
          <li>Bhubaneswar temples, local cuisine and crafts.</li>
        </ul>

        <div className="mt-8 flex gap-3">
          <button onClick={openContact} className="px-5 py-3 rounded-2xl bg-emerald-800 text-white font-semibold">
            Contact Travel Expert
          </button>
          <Link href="/india/east" className="px-5 py-3 rounded-2xl border border-gray-200">
            Back to East India
          </Link>
        </div>
      </section>
    </main>
  );
}
