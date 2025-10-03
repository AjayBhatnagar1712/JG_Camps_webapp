"use client";

import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Card = {
  id: number;
  title: string;
  desc: string;
  img: string;
  category: string;
  href: string;
};

const CATEGORIES = ["All", "Europe", "Southeast Asia", "Middle East", "Adventure", "Luxury"];

const CARDS: Card[] = [
  { id: 1, title: "Europe Highlights", desc: "Paris–Swiss Alps–Italy classics in one elegant loop.", img: "/images/International/europe-highlights.jpg", category: "Europe", href: "/international/europe-highlights" },
  { id: 2, title: "Swiss Alps Getaway", desc: "Lakes, glaciers & alpine trains for scenic souls.", img: "/images/International/swiss-alps.jpg", category: "Europe", href: "/international/swiss-alps" },
  { id: 3, title: "Bali & Beyond", desc: "Beaches, rice terraces & temples across Indonesia.", img: "/images/International/bali.jpg", category: "Southeast Asia", href: "/international/bali" },
  { id: 4, title: "Thailand Explorer", desc: "Bangkok buzz, Phuket beaches, and northern culture.", img: "/images/International/thailand.jpg", category: "Southeast Asia", href: "/international/thailand" },
  { id: 5, title: "Dubai Luxe Break", desc: "Skyline views, desert safaris & premium dining.", img: "/images/International/dubai.jpg", category: "Middle East", href: "/international/dubai" },
  { id: 6, title: "Jordan Heritage Trail", desc: "Petra, Wadi Rum & the Dead Sea in style.", img: "/images/International/jordan.jpg", category: "Middle East", href: "/international/jordan" },
  { id: 7, title: "Alps Adventure Trek", desc: "Multi-day trekking with glacier vistas.", img: "/images/International/alps-trek.jpg", category: "Adventure", href: "/international/alps-trek" },
  { id: 8, title: "New Zealand Road Trip", desc: "Epic drives, fjords & adrenaline activities.", img: "/images/International/new-zealand.jpg", category: "Adventure", href: "/international/new-zealand" },
  { id: 9, title: "Mediterranean Yacht Week", desc: "Island-hopping on a private yacht.", img: "/images/International/med-yacht.jpg", category: "Luxury", href: "/international/med-yacht" },
  { id: 10, title: "Maldives Overwater Escape", desc: "Turquoise lagoons & blissful downtime.", img: "/images/International/maldives.jpg", category: "Luxury", href: "/international/maldives" },
];

export default function InternationalPage() {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? CARDS : CARDS.filter(c => c.category === active);

  return (
    <div className="bg-gradient-to-b from-blue-50 to-indigo-100 min-h-screen pb-24">
      {/* SEO */}
      <Head>
        <title>International Trips | JG Camps & Resorts</title>
        <meta name="description" content="Curated international holidays: Europe, Southeast Asia, Middle East, adventure treks and luxury escapes." />
        <meta property="og:title" content="International Trips | JG Camps & Resorts" />
        <meta property="og:description" content="Premium itineraries across Europe, Asia & beyond." />
        <meta property="og:image" content="/images/International/international-hero.jpg" />
      </Head>

      {/* Hero */}
      <section className="relative w-full h-[56vh]">
        <Image src="/images/International/international-hero.jpg" alt="International travel collage" fill priority className="object-cover brightness-75" />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.h1 initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:.6}} className="text-white text-4xl md:text-6xl font-bold text-center drop-shadow-xl">
            Discover the World, Beautifully
          </motion.h1>
        </div>
      </section>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="flex flex-wrap gap-3 justify-center -mt-6 mb-8">
          {CATEGORIES.map(cat => (
            <button key={cat}
              onClick={()=>setActive(cat)}
              className={`px-4 py-2 rounded-full border text-sm font-medium backdrop-blur ${active===cat ? "bg-indigo-700 text-white border-indigo-700" : "bg-white/80 text-indigo-700 border-indigo-300 hover:bg-indigo-50"}`}>
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Cards */}
        <AnimatePresence initial={false}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map(card => (
              <motion.div key={card.id} initial={{opacity:0, y:20}} animate={{opacity:1,y:0}} exit={{opacity:0, y:20}} transition={{duration:.35}}>
                <Link href={card.href} className="block group rounded-2xl overflow-hidden bg-white shadow-lg hover:shadow-2xl transition">
                  <div className="relative h-56">
                    <Image src={card.img} alt={card.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-semibold text-indigo-800">{card.title}</h3>
                    <p className="text-gray-600 mt-2">{card.desc}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      </div>
    </div>
  );
}
