// app/india/west/rajasthan/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";

export default function RajasthanPage() {
  const openContact = () => window.dispatchEvent(new Event("open-contact-expert"));

  return (
    <main className="min-h-screen bg-white text-slate-800">
      <section className="relative w-full h-[52vh] overflow-hidden">
        <Image src="/images/west-india/rajasthan.jpg" alt="Rajasthan" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="relative z-10 container mx-auto px-6 h-full flex items-end pb-12">
          <div className="text-white max-w-3xl">
            <h1 className="text-4xl font-extrabold">Rajasthan</h1>
            <p className="mt-2 text-sm text-emerald-100">Deserts, forts, palaces and royal heritage routes.</p>
          </div>
        </div>
      </section>

      <section className="py-12 px-6 container mx-auto max-w-4xl">
        <h2 className="text-2xl font-bold mb-4">Rajasthan at a glance</h2>
        <p className="text-gray-700 mb-4">
          Rajasthan is India’s royal state: forts, palaces, desert safaris, and vibrant bazaars across Jaipur, Jaisalmer, Udaipur, and Pushkar.
        </p>

        <ul className="mb-6 text-gray-700 list-disc pl-5 space-y-2">
          <li>Best season: Oct – Mar</li>
          <li>Top places: Jaipur, Udaipur, Jaisalmer, Pushkar</li>
          <li>Highlights: Forts, palaces, desert experiences</li>
        </ul>

        <div className="flex gap-3">
          <button onClick={openContact} className="px-5 py-3 rounded-2xl bg-emerald-800 text-white font-semibold">
            Contact Travel Expert
          </button>
          <Link href="/india/west/plan" className="px-5 py-3 rounded-2xl border border-gray-200">
            Build Itinerary
          </Link>
        </div>
      </section>
    </main>
  );
}
