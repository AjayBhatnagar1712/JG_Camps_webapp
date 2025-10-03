"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Head from "next/head";

interface Card {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  link: string;
}

const categories: string[] = [
  "All",
  "North Goa",
  "South Goa",
  "Hinterland Goa",
  "Activities",
  "Nightlife",
];

const cards: Card[] = [
  {
    id: 1,
    title: "North Goa",
    description: "Explore the lively beaches, forts, and nightlife of North Goa.",
    image: "/images/Goa/north-goa.jpg",
    category: "North Goa",
    link: "/goa/north-goa",
  },
  {
    id: 2,
    title: "South Goa",
    description: "Experience serene beaches and luxury stays in South Goa.",
    image: "/images/Goa/south-goa.jpg",
    category: "South Goa",
    link: "/goa/south-goa",
  },
  {
    id: 3,
    title: "Hinterland Goa",
    description: "Discover the hidden gems, spice plantations, and nature trails.",
    image: "/images/Goa/hinterland-goa.jpg",
    category: "Hinterland Goa",
    link: "/goa/hinterland-goa",
  },
  {
    id: 4,
    title: "Beach Parties & Fire Shows",
    description: "Feel the energy of Goa's famous beach parties.",
    image: "/images/Goa/beach-parties.jpg",
    category: "Nightlife",
    link: "/goa/beach-parties",
  },
  {
    id: 5,
    title: "Luxury Yacht Cruises",
    description: "Sail across the Arabian Sea with ultimate luxury.",
    image: "/images/Goa/luxury-yacht.jpg",
    category: "Activities",
    link: "/goa/luxury-yacht",
  },
  {
    id: 6,
    title: "Water Sports Adventures",
    description: "Jet skiing, parasailing, and more water thrills await.",
    image: "/images/Goa/water-sports.jpg",
    category: "Activities",
    link: "/goa/water-sports",
  },
  {
    id: 7,
    title: "Sunset Dining by the Beach",
    description: "Enjoy exquisite dining as the sun sets over the sea.",
    image: "/images/Goa/sunset-dining.jpg",
    category: "Activities",
    link: "/goa/sunset-dining",
  },
  {
    id: 8,
    title: "Silent Disco on the Sand",
    description: "Dance the night away under the stars with a silent disco experience.",
    image: "/images/Goa/silent-disco.jpg",
    category: "Nightlife",
    link: "/goa/silent-disco",
  },
  {
    id: 9,
    title: "Live Music & Cultural Nights",
    description: "Soak in Goan culture with live music and traditional performances.",
    image: "/images/Goa/live-music.jpg",
    category: "Nightlife",
    link: "/goa/live-music",
  },
];

export default function Goa() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const filteredCards: Card[] =
    selectedCategory === "All"
      ? cards
      : cards.filter((card) => card.category === selectedCategory);

  return (
    <>
      <Head>
        <title>Explore Goa - Beaches, Nightlife & Adventures | Goa Travel Guide</title>
        <meta
          name="description"
          content="Discover the best of Goa including North Goa, South Goa, Hinterland adventures, nightlife, beach parties, luxury yacht cruises, and water sports."
        />
        <meta
          name="keywords"
          content="Goa travel, North Goa, South Goa, Hinterland Goa, Goa nightlife, beach parties, Goa activities, water sports Goa, yacht cruise Goa"
        />
        <meta property="og:title" content="Explore Goa - Beaches, Nightlife & Adventures" />
        <meta
          property="og:description"
          content="Plan your perfect Goa trip with beaches, parties, luxury stays, cultural nights, and more."
        />
        <meta property="og:image" content="/images/Goa/goa-hero.jpg" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://yourwebsite.com/goa" />
      </Head>

      <main className="bg-gray-100 min-h-screen pb-16">
        {/* Hero Section */}
        <section className="relative w-full h-80">
          <Image
            src="/images/Goa/goa-hero.jpg"
            alt="Beautiful beach in Goa with palm trees and sunset"
            fill
            className="object-cover brightness-75"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.h1
              initial={{ opacity: 0, y: -40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-white text-4xl md:text-6xl font-bold drop-shadow-lg"
            >
              Explore Goa
            </motion.h1>
          </div>
        </section>

        {/* Category Filter */}
        <section aria-label="Filter by category">
          <motion.div
            className="flex justify-center space-x-4 mt-6 flex-wrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {categories.map((cat) => (
              <motion.button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                whileTap={{ scale: 0.9 }}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  selectedCategory === cat
                    ? "bg-green-700 text-white"
                    : "bg-white text-green-700 border border-green-700"
                } hover:bg-green-600 hover:text-white transition`}
                aria-label={`Show ${cat} category`}
              >
                {cat}
              </motion.button>
            ))}
          </motion.div>
        </section>

        {/* Cards Section */}
        <section className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10 px-4">
          <AnimatePresence>
            {filteredCards.map((card) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4 }}
              >
                <Link href={card.link}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer"
                  >
                    <Image
                      src={card.image}
                      alt={card.title + " in Goa"}
                      width={400}
                      height={250}
                      className="w-full h-56 object-cover"
                    />
                    <div className="p-5">
                      <h2 className="text-xl font-semibold text-gray-800">
                        {card.title}
                      </h2>
                      <p className="text-gray-600 mt-2">{card.description}</p>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </section>
      </main>
    </>
  );
}
