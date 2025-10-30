// app/india/east/west-bengal/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function WestBengalPage() {
  const openContact = () => window.dispatchEvent(new Event("open-contact-expert"));

  return (
    <main className="min-h-screen bg-white text-slate-800">
      <section className="relative w-full h-[52vh] overflow-hidden">
        <Image src="/images/east-india/west-bengal.jpg" alt="West Bengal" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="relative z-10 container mx-auto px-6 h-full flex items-end pb-12">
          <div className="text-white max-w-3xl">
            <motion.h1 className="text-4xl font-extrabold">West Bengal</motion.h1>
            <p className="mt-2 text-sm text-emerald-100">From Kolkata's colonial charm to Darjeeling hills and Sundarbans wildlife.</p>
          </div>
        </div>
      </section>

      <section className="py-12 px-6 container mx-auto max-w-4xl">
        <h2 className="text-2xl font-bold mb-4">Highlights</h2>
        <ul className="list-disc ml-5 text-gray-700 space-y-2">
          <li>Kolkata — culture, museums, food and historic architecture.</li>
          <li>Darjeeling — tea gardens, mountain views and toy train.</li>
          <li>Sundarbans — mangrove safari and wildlife spotting.</li>
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
