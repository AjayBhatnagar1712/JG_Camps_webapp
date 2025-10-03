"use client";
import Image from "next/image";
import { motion } from "framer-motion";

type WellnessPlace = {
  name: string;
  image: string;
  bestSeason: string;
  highlights: string;
  activities: string[];
};

const WELLNESS_PLACES: WellnessPlace[] = [
  {
    name: "Wellness in Nainital",
    image: "/images/wellness/nainital.jpg",
    bestSeason: "Sept – May",
    highlights: "Peaceful yoga sessions, nature walks, and Ayurvedic therapies in the mountains.",
    activities: ["Yoga Retreats", "Nature Healing", "Meditation Camps"],
  },
  {
    name: "Wellness in Shimla",
    image: "/images/wellness/shimla.jpg",
    bestSeason: "Oct – June",
    highlights: "Calming Himalayan views with detox programs and spa experiences.",
    activities: ["Detox Programs", "Spa Therapy", "Mindfulness Sessions"],
  },
  {
    name: "Wellness in Rishikesh",
    image: "/images/wellness/rishikesh.jpg",
    bestSeason: "All Year",
    highlights: "The yoga capital offering spiritual and physical well-being practices.",
    activities: ["Yoga Classes", "Ganga Aarti Experience", "Pranayama Workshops"],
  },
];

export default function WellnessPage() {
  return (
    <div className="bg-gradient-to-b from-rose-50 to-rose-100 min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[380px] w-full">
        <Image
          src="/images/wellness/wellness-hero.jpg"
          alt="Luxury Wellness Retreats"
          fill
          priority
          className="object-cover brightness-75"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-extrabold drop-shadow-lg"
          >
            Wellness & Rejuvenation
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-4 text-lg md:text-xl max-w-3xl"
          >
            Experience peace, health, and harmony at India’s most serene wellness destinations.
          </motion.p>
        </div>
      </section>

      {/* Top Wellness Destinations */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-rose-800 mb-10">
          Top Wellness Destinations
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {WELLNESS_PLACES.map((place, idx) => (
            <motion.div
              key={place.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.08 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition"
            >
              <div className="relative h-48 w-full">
                <Image src={place.image} alt={place.name} fill className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-rose-800">{place.name}</h3>

                <div className="mt-2 text-sm bg-rose-100 text-rose-700 px-3 py-1 rounded-full inline-block">
                  Best Season: {place.bestSeason}
                </div>

                <p className="mt-3 text-gray-700 italic text-sm">{place.highlights}</p>

                <div className="mt-4">
                  <p className="font-semibold text-gray-800 mb-1">Activities:</p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    {place.activities.map((a) => (
                      <li key={a}>{a}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Abhyangam Therapy Section */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-10">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative w-full lg:w-1/2 h-72"
          >
            <Image
              src="/images/wellness/abhyangam.jpg"
              alt="Abhyangam Therapy"
              fill
              className="object-cover rounded-2xl shadow-lg"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2"
          >
            <h3 className="text-3xl font-bold text-rose-800 mb-4">Abhyangam Therapy</h3>
            <p className="text-gray-700 text-lg mb-4">
              Abhyangam is an ancient Ayurvedic full-body massage using warm herbal oils.
              It promotes relaxation, improves circulation, and rejuvenates the mind and body.
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Detoxifies the body</li>
              <li>Relieves stress & fatigue</li>
              <li>Improves sleep quality</li>
              <li>Boosts immunity & energy levels</li>
            </ul>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
