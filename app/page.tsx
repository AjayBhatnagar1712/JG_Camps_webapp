// app/page.tsx
"use client";

import slugify from "@/lib/slugify";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useCallback, useState } from "react";

/**
 * Home page - region cards
 *
 * Clicking a region opens a small panel with major states for that region.
 * - Individual state links navigate to /india/<state-slug>
 * - Explore region goes to /india/<region-slug>
 *
 * Make sure to create the corresponding routes (e.g. app/india/north/page.tsx or handle them)
 */

type Region = {
  key: string;
  title: string;
  image: string;
  states: string[];
  blurb?: string;
  href?: string; // region landing page
};

const REGIONS: Region[] = [
  {
    key: "north",
    title: "North India",
    image: "/images/regions/north-india.jpg",
    blurb: "Himalayan foothills, hill stations, spiritual & heritage routes.",
    states: [
      "Delhi",
      "Punjab",
      "Haryana",
      "Uttarakhand",
      "Himachal Pradesh",
      "Jammu & Kashmir",
      "Uttar Pradesh",
      "Chandigarh",
    ],
    href: "/india/north",
  },
  {
    key: "south",
    title: "South India",
    image: "/images/regions/south-india.jpg",
    blurb: "Backwaters, temple trails, beaches and hill stations.",
    states: [
      "Andhra Pradesh",
      "Telangana",
      "Karnataka",
      "Kerala",
      "Tamil Nadu",
      "Puducherry",
      "Lakshadweep",
    ],
    href: "/india/south",
  },
  {
    key: "east",
    title: "East India",
    image: "/images/regions/east-india.jpg",
    blurb: "Scenic coasts, heritage towns and tribal cultures.",
    states: [
      "West Bengal",
      "Odisha",
      "Bihar",
      "Jharkhand",
      "Andaman & Nicobar Islands",
    ],
    href: "/india/east",
  },
  {
    key: "west",
    title: "West India",
    image: "/images/regions/west-india.jpg",
    blurb: "Deserts, forts, coastal gateways and vibrant culture.",
    // Split Dadra/Nagar and Daman/Diu into separate entries
    states: [
      "Goa",
      "Rajasthan",
      "Gujarat",
      "Maharashtra",
      "Dadra and Nagar Haveli",
      "Daman and Diu",
    ],
    href: "/india/west",
  },
  {
    key: "northeast",
    title: "North-East India",
    image: "/images/regions/northeast-india.jpg",
    blurb: "Lush valleys, unique cultures and offbeat adventures.",
    states: [
      "Arunachal Pradesh",
      "Assam",
      "Manipur",
      "Meghalaya",
      "Mizoram",
      "Nagaland",
      "Sikkim",
      "Tripura",
    ],
    href: "/india/northeast",
  },
  {
    key: "central",
    title: "Central India",
    image: "/images/regions/central-india.jpg",
    blurb: "Wildlife corridors, tribal hinterlands and ancient temples.",
    states: ["Madhya Pradesh", "Chhattisgarh"],
    href: "/india/central",
  },

  // ----- THEME CARDS (unchanged features; expanded where needed) -----
  {
    key: "group-retreats",
    title: "Group Retreats",
    image: "/images/themes/group-retreats.jpg",
    blurb: "Corporate offsites, family reunions, student camps and team retreats.",
    // expanded list for the panel — links to /group-retreats/<slug>
    states: [
      "Corporate Tours",
      "Training Programs",
      "Schools",
      "Colleges",
      "Open Tours",
      "Family Tours",
      "Spiritual & Pilgrimage",
      "Create Your Own Group",
    ],
    href: "/group-retreats",
  },
  {
    key: "spiritual-tourism",
    title: "Spiritual Tourism",
    image: "/images/themes/spiritual-tourism.jpg",
    blurb: "Pilgrimages and soulful retreats — Chardham, Vaishno Devi, Rishikesh and more.",
    // expanded spiritual places — links to /spiritual/<slug>
    states: [
      "Varanasi (Kashi)",
      "Char Dham Yatra",
      "Vaishno Devi",
      "Rameshwaram",
      "Puri (Jagannath)",
      "Bodh Gaya",
      "Amarnath Cave",
      "Shirdi (Sai Baba)",
      "Kanyakumari",
      "Haridwar",
      "Rishikesh",
      "Tirupati (Venkateswara)",
      "Amritsar (Golden Temple)",
      "Kedarnath",
      "Badrinath",
      "Dwarka",
      "Mathura & Vrindavan",
      "Pushkar",
      "Sabarimala",
      "Madurai (Meenakshi Amman)",
      "Ajmer (Dargah Sharif)",
    ],
    href: "/spiritual",
  },
  {
    key: "wellness-health",
    title: "Wellness & Health Tourism",
    image: "/images/themes/wellness.jpg",
    blurb: "Ayurveda, yoga, detox and holistic healing getaways across India.",
    states: ["Ayurveda Retreats", "Yoga & Detox", "Holistic Resorts", "Wellness Clinics"],
    href: "/wellness",
  },
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

  // region panel state
  const [openRegion, setOpenRegion] = useState<Region | null>(null);

  function openRegionPanel(r: Region) {
    setOpenRegion(r);
    // ensure panel visible on small screens
    setTimeout(() => {
      const el = document.getElementById("region-panel");
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 40);
  }

  function closeRegionPanel() {
    setOpenRegion(null);
  }

  // map special slugs for group-retreats and spiritual-tourism states (these match the pages you created)
  function getStateSlug(regionKey: string, stateName: string) {
    if (regionKey === "group-retreats") {
      const map: Record<string, string> = {
        "Corporate Tours": "corporate",
        "Training Programs": "training",
        "Schools": "schools",
        "Colleges": "colleges",
        "Open Tours": "open",
        "Family Tours": "family",
        "Spiritual & Pilgrimage": "spiritual",
        "Create Your Own Group": "custom",
      };
      return map[stateName] ?? slugify(stateName);
    }

    if (regionKey === "spiritual-tourism") {
      const map: Record<string, string> = {
        "Varanasi (Kashi)": "kashi",
        "Char Dham Yatra": "char-dham",
        "Vaishno Devi": "vaishno-devi",
        "Rameshwaram": "rameshwaram",
        "Puri (Jagannath)": "puri",
        "Bodh Gaya": "bodh-gaya",
        "Amarnath Cave": "amarnath",
        "Shirdi (Sai Baba)": "shirdi",
        "Kanyakumari": "kanyakumari",
        "Haridwar": "haridwar",
        "Rishikesh": "rishikesh",
        "Tirupati (Venkateswara)": "tirupati",
        "Amritsar (Golden Temple)": "amritsar",
        "Kedarnath": "kedarnath",
        "Badrinath": "badrinath",
        "Dwarka": "dwarka",
        "Mathura & Vrindavan": "mathura-vrindavan",
        "Pushkar": "pushkar",
        "Sabarimala": "sabarimala",
        "Madurai (Meenakshi Amman)": "madurai",
        "Ajmer (Dargah Sharif)": "ajmer",
      };
      return map[stateName] ?? slugify(stateName);
    }

    // default behaviour for other regions
    return slugify(stateName);
  }

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
                  poster="/images/hero-poster.jpg"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
              </div>
              <p className="mt-2 text-xs text-muted-foreground text-center">
                Scenic drone footage of the mountains.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* REGIONS GRID */}
      <section className="py-12 px-6" id="categories">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold mb-6">Explore India by Region</h2>
          <p className="text-sm text-muted-foreground mb-8 max-w-3xl">
            Choose a region to see its popular states and plan a regional itinerary. Click a state to explore that state's page.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {REGIONS.map((r) => (
              <motion.button
                key={r.key}
                onClick={() => openRegionPanel(r)}
                whileHover={{ scale: 1.02 }}
                className="relative group text-left rounded-3xl overflow-hidden shadow-xl border border-gray-100 p-0 bg-white cursor-pointer"
                aria-expanded={openRegion?.key === r.key}
              >
                <div className="relative h-56">
                  <Image
                    src={r.image}
                    alt={r.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-end">
                    <div className="p-5 text-white">
                      <div className="text-lg font-semibold">{r.title}</div>
                      <div className="text-sm opacity-90 max-w-xs mt-1">{r.blurb}</div>
                    </div>
                  </div>
                </div>

                <div className="p-4 border-t border-gray-100 flex items-center justify-between">
                  <div className="text-sm text-gray-600">{r.states.length} major areas</div>
                  <div className="text-amber-600 font-semibold">View states →</div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* REGION PANEL (small overlay) */}
      {openRegion && (
        <div
          id="region-panel"
          className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-4 pointer-events-none"
        >
          {/* backdrop */}
          <div
            onClick={closeRegionPanel}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm pointer-events-auto"
          />

          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className="relative z-10 w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden pointer-events-auto"
          >
            <div className="flex items-start gap-4 p-5 border-b border-gray-100">
              <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                <Image src={openRegion.image} alt={openRegion.title} width={160} height={160} className="object-cover" />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold">{openRegion.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1 max-w-md">{openRegion.blurb}</p>
                  </div>

                  <div className="text-right">
                    <button
                      onClick={closeRegionPanel}
                      className="px-3 py-2 rounded-md text-sm border border-border hover:bg-muted"
                    >
                      Close
                    </button>
                  </div>
                </div>

                <div className="mt-3 text-sm text-gray-700">
                  <strong>Major states / areas:</strong>
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  {openRegion.states.map((s) => {
                    const sSlug = getStateSlug(openRegion.key, s);

                    // Use the region's configured href as base if present, otherwise fall back to /india/<region-key>
                    // This ensures links from the panel point to the correct region subpath (e.g. /india/north/delhi).
                    const base = openRegion.href ?? `/india/${openRegion.key}`;

                    return (
                      <Link
                        key={s}
                        href={`${base}/${sSlug}`}
                        onClick={() => setTimeout(closeRegionPanel, 80)}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-sm hover:bg-gray-50"
                      >
                        {s}
                      </Link>
                    );
                  })}

                  {/* Additional quick link for Leh & Ladakh when North India panel is open */}
                  {openRegion.key === "north" && (
                    <Link
                      href={`/india/north/${slugify("Leh & Ladakh")}`}
                      onClick={() => setTimeout(closeRegionPanel, 80)}
                      className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-sm hover:bg-gray-50"
                    >
                      Leh &amp; Ladakh
                    </Link>
                  )}
                </div>

                <div className="mt-6 flex gap-3">
                  <Link
                    href={openRegion.href || `/india/${openRegion.key}`}
                    onClick={() => setTimeout(closeRegionPanel, 80)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-800 text-white font-semibold hover:opacity-95"
                  >
                    Explore {openRegion.title}
                  </Link>

                  <button
                    onClick={() => {
                      // open contact expert modal if user wants a custom plan for region
                      window.dispatchEvent(new Event("open-contact-expert"));
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-800 text-emerald-800 font-medium hover:bg-emerald-50"
                  >
                    Request a Custom Plan
                  </button>
                </div>
              </div>
            </div>

            {/* bottom: small grid of extra links */}
            <div className="p-4 bg-gray-50 border-t border-gray-100 flex flex-wrap gap-3">
              <div className="text-sm text-gray-600">Need help deciding?</div>
              <button
                onClick={() => {
                  window.dispatchEvent(new Event("open-contact-expert"));
                }}
                className="ml-auto rounded-full px-4 py-1 border border-border text-sm hover:bg-muted"
              >
                Contact Travel Expert
              </button>
            </div>
          </motion.div>
        </div>
      )}

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
              <a
                href="#contact-expert"
                onClick={handleOpenContact}
                className="inline-flex items-center gap-2 rounded-2xl bg-white text-foreground px-5 py-3 font-semibold shadow hover:bg-muted"
              >
                Get in Touch
              </a>

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
              <p className="text-3xl font-bold text-primary">10000000+</p>
              <p className="text-sm text-muted-foreground">Trips Crafted</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary">20000+</p>
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
