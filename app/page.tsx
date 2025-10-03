"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useCallback } from "react";

/**
 * Updated Home page for JG Camps & Resorts
 * - preserves video hero, categories, explore scrolling
 * - "Contact Us" opens global contact modal via window event "open-contact-expert"
 * - Added an About section (id="about") which Learn More can scroll to
 */

const categories = [
  { name: "Himalaya", file: "himalaya.jpg", href: "/himalaya" },
  { name: "International", file: "international.jpg", href: "/international" },
  { name: "Goa", file: "goa.jpg", href: "/goa" },
  { name: "Rajasthan", file: "rajasthan.jpg", href: "/rajasthan" },
  { name: "Wellness", file: "wellness.jpg", href: "/wellness" },
  { name: "Team & Group Retreats", file: "group-retreats.jpg", href: "/group-retreats" },
];

export default function Home() {
  // Smooth scroll to the #explore section
  const handleExplore = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById("explore")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  // Fire a global event that GlobalCTAs listens for to open the Contact modal
  const handleOpenContact = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    window.dispatchEvent(new Event("open-contact-expert"));
  }, []);

  // Scroll to About
  const handleLearnMore = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <main className="min-h-screen text-foreground">
      {/* HERO */}
      <section className="relative overflow-hidden">
        {/* Soft radial background */}
        <div className="pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(70%_50%_at_50%_0%,black,transparent)]">
          <div className="absolute -top-40 right-0 h-[28rem] w-[28rem] rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -top-20 -left-20 h-[24rem] w-[24rem] rounded-full bg-primary/15 blur-3xl" />
        </div>

        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            {/* LEFT: Text */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-medium">
                Curated • Trusted • Hassle-free
              </span>
              <h1 className="mt-4 text-4xl md:text-6xl font-extrabold tracking-tight">
                JG Camps &amp; Resorts
              </h1>
              <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-2xl">
                Bringing you unforgettable experiences across India &amp; abroad — from adventure tourism to
                luxury resorts, spiritual retreats, and holistic health getaways.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <a
                  href="#explore"
                  onClick={handleExplore}
                  className="inline-flex items-center justify-center rounded-2xl bg-primary px-6 py-3 text-primary-foreground font-semibold shadow hover:opacity-90"
                >
                  Explore Now <ChevronRight className="ml-1 h-4 w-4" />
                </a>

                {/* Open Contact Expert modal instead of navigating away */}
                <a
                  href="#contact-expert"
                  onClick={handleOpenContact}
                  className="inline-flex items-center justify-center rounded-2xl border border-border px-6 py-3 font-semibold shadow-sm hover:bg-white"
                >
                  Contact Us
                </a>
              </div>
            </motion.div>

            {/* RIGHT: Drone Video */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}>
              <div className="relative rounded-3xl overflow-hidden shadow-xl border border-border aspect-[16/10] bg-black">
                <video
                  className="w-full h-full object-cover"
                  src="/videos/drone_footage.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  poster="/images/hero-poster.jpg" // optional poster
                />
                {/* optional overlay */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
              </div>
              <p className="mt-2 text-xs text-muted-foreground text-center">
                Scenic drone footage of the mountains.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CATEGORIES GRID */}
      <section className="py-12 px-6" id="categories">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {categories.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="relative h-72 rounded-3xl overflow-hidden shadow-xl group hover:shadow-2xl transition-all"
            >
              <Image
                src={`/images/${item.file}`}
                alt={item.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end justify-center pb-6">
                <span className="text-white text-2xl font-bold tracking-wide drop-shadow-lg">
                  {item.name}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* EXPERIENCES */}
      <section id="explore" className="py-18 md:py-20 px-6 bg-card border-t border-border">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold text-center mb-10">Our Experiences</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="rounded-2xl border border-border shadow-sm p-6 bg-muted/40 hover:shadow-md transition">
              <h3 className="text-xl font-semibold mb-2">Adventure Tourism</h3>
              <p className="text-muted-foreground">
                Trekking, camping, river rafting, and wildlife safaris — for those who seek thrill and nature.
              </p>
            </div>
            <div className="rounded-2xl border border-border shadow-sm p-6 bg-muted/40 hover:shadow-md transition">
              <h3 className="text-xl font-semibold mb-2">Wellness &amp; Spiritual Tourism</h3>
              <p className="text-muted-foreground">
                Find peace with curated retreats, yoga, Ayurveda, and rejuvenation programs for complete well-being.
              </p>
            </div>
            <div className="rounded-2xl border border-border shadow-sm p-6 bg-muted/40 hover:shadow-md transition">
              <h3 className="text-xl font-semibold mb-2">Holistic Health Tourism</h3>
              <p className="text-muted-foreground">
                Experience therapies, meditation, and personalized wellness packages in serene destinations.
              </p>
            </div>
          </div>

          {/* CTA STRIP */}
          <div className="mt-12 rounded-3xl bg-primary text-primary-foreground p-6 md:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 shadow">
            <div>
              <h3 className="text-xl md:text-2xl font-bold">Want a custom itinerary with bookings?</h3>
              <p className="opacity-90 text-sm">
                Share your dates and preferences — we’ll craft and confirm everything.
              </p>
            </div>
            <div className="flex gap-3">
              {/* Open the same Contact Expert modal here too */}
              <a
                href="#contact-expert"
                onClick={handleOpenContact}
                className="inline-flex items-center gap-2 rounded-2xl bg-white text-foreground px-5 py-3 font-semibold shadow hover:bg-muted"
              >
                Get in Touch
              </a>

              {/* Learn More -> scroll to #about */}
              <button
                onClick={handleLearnMore}
                className="inline-flex items-center gap-2 rounded-2xl border border-primary-foreground/30 px-5 py-3 font-semibold hover:bg-primary/10"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT PREVIEW on HOME (id="about") */}
      <section id="about" className="py-20 px-6 bg-gray-50 border-t border-border">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">About JG Camps &amp; Resorts</h2>
          <p className="text-muted-foreground mb-12 max-w-3xl mx-auto text-center text-lg">
            At JG Camps & Resorts we craft journeys for every traveler — from adrenaline seekers to families and corporate retreats.
            Our itineraries are curated with local knowledge, vetted partners, and round-the-clock support.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="rounded-xl border border-border bg-white p-6 shadow-sm hover:shadow-md transition">
              <h4 className="font-semibold text-lg mb-2">Curated Itineraries</h4>
              <p className="text-sm text-muted-foreground">Hand-picked stays, unique experiences, and tailored plans designed for you.</p>
            </div>
            <div className="rounded-xl border border-border bg-white p-6 shadow-sm hover:shadow-md transition">
              <h4 className="font-semibold text-lg mb-2">Safety & Support</h4>
              <p className="text-sm text-muted-foreground">24/7 on-ground support, verified partners, and stress-free planning.</p>
            </div>
            <div className="rounded-xl border border-border bg-white p-6 shadow-sm hover:shadow-md transition">
              <h4 className="font-semibold text-lg mb-2">Sustainable Travel</h4>
              <p className="text-sm text-muted-foreground">Responsible tourism that benefits local communities and minimizes footprint.</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center mb-8">
            <div>
              <p className="text-3xl font-bold text-primary">1000+</p>
              <p className="text-sm text-muted-foreground">Trips Crafted</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary">20+</p>
              <p className="text-sm text-muted-foreground">Destinations</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary">95%</p>
              <p className="text-sm text-muted-foreground">Happy Travelers</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary">24/7</p>
              <p className="text-sm text-muted-foreground">Support</p>
            </div>
          </div>

          <div className="text-center">
            <Link
              href="/about"
              className="inline-flex items-center justify-center px-6 py-3 rounded-2xl bg-primary text-primary-foreground font-semibold shadow hover:opacity-90 transition"
            >
              Learn More About Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
