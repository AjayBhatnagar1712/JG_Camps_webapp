// app/india/west/goa/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";

export default function GoaPage() {
  const openContact = () => window.dispatchEvent(new Event("open-contact-expert"));

  return (
    <main className="min-h-screen bg-white text-slate-800">
      <section className="relative w-full h-[52vh] overflow-hidden">
        <Image src="/images/west-india/goa.jpg" alt="Goa" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="relative z-10 container mx-auto px-6 h-full flex items-end pb-12">
          <div className="text-white max-w-3xl">
            <h1 className="text-4xl font-extrabold">Goa</h1>
            <p className="mt-2 text-sm text-emerald-100">Beaches, nightlife, Portuguese heritage and coastal cuisine.</p>
          </div>
        </div>
      </section>

      <section className="py-12 px-6 container mx-auto max-w-4xl">
        <h2 className="text-2xl font-bold mb-4">Goa at a glance</h2>
        <p className="text-gray-700 mb-4">
          Goa offers sun-kissed beaches, water sports, a strong coastal food culture, and Portuguese-era
          heritage in towns like Panaji and Old Goa.
        </p>

        <ul className="mb-6 text-gray-700 list-disc pl-5 space-y-2">
          <li>Best season: Nov – Feb</li>
          <li>Top places: Panaji, Baga Beach, Old Goa</li>
          <li>Highlights: Beaches, nightlife, coastal cuisine</li>
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
