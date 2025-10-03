"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Head from "next/head";
import { logLead } from "@/lib/logLead";

interface Retreat {
  id: number;
  title: string;
  image: string;
  category: string;
  description: string;
  perfectFor?: string[];
}

const retreats: Retreat[] = [
  {
    id: 1,
    title: "Corporate Team Building",
    image: "/images/group/team.jpg",
    category: "Corporate",
    description:
      "Engaging activities designed to enhance collaboration, leadership, and team bonding in stunning locations.",
    perfectFor: ["Corporate Teams", "MNCs", "Startups"],
  },
  {
    id: 2,
    title: "Luxury Wellness Escape",
    image: "/images/group/wellness.jpg",
    category: "Wellness",
    description:
      "Indulge in curated wellness programs with yoga, spa, and gourmet healthy dining for ultimate rejuvenation.",
    perfectFor: ["Executives", "Friends", "Family"],
  },
  {
    id: 3,
    title: "School Picnic & Getaways",
    image: "/images/group/school.jpg",
    category: "School",
    description:
      "Safe, fun-filled, and educational trips specially curated for schools and institutions.",
    perfectFor: ["Schools", "Educational Groups"],
  },
  {
    id: 4,
    title: "College Adventure Tours",
    image: "/images/group/college.jpg",
    category: "College",
    description:
      "Thrilling trips packed with adventure, nightlife, and fun for college students.",
    perfectFor: ["College Groups", "Youth Clubs"],
  },
  {
    id: 5,
    title: "Family Retreats",
    image: "/images/group/family.jpg",
    category: "Family",
    description:
      "Premium family tours offering luxury stays, personalized itineraries, and unforgettable moments.",
    perfectFor: ["Families", "Friends"],
  },
  {
    id: 6,
    title: "Friends Group Getaways",
    image: "/images/group/friends.jpg",
    category: "Friends",
    description:
      "Exclusive group packages for friends with nightlife, activities, and premium experiences.",
    perfectFor: ["Friends", "Young Groups"],
  },
  {
    id: 7,
    title: "Open Group Tours",
    image: "/images/group/open.jpg",
    category: "Mixed",
    description:
      "Join pre-scheduled group tours where individuals can book and connect with like-minded travelers.",
    perfectFor: ["Solo Travelers", "Couples", "Small Groups"],
  },
];

const categories = [
  "All",
  "Corporate",
  "Wellness",
  "School",
  "College",
  "Family",
  "Friends",
  "Mixed",
];

export default function GroupRetreats() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const filteredRetreats =
    activeCategory === "All"
      ? retreats
      : retreats.filter((retreat) => retreat.category === activeCategory);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setSending(true);
    const ok = await logLead({
      name: name || undefined,
      note: "Group retreat lead",
      channel: "group-retreats-cta",
      page: "/group-retreats",
      meta: { email },
    });
    setSending(false);

    if (ok) {
      setDone(true);
      setName("");
      setEmail("");
    } else {
      setError("Could not send. Please try again later.");
    }
  }

  return (
    <>
      <Head>
        <title>Group Retreats | JG Camps & Resorts</title>
        <meta
          name="description"
          content="Premium group retreats by JG Camps & Resorts – Corporate, Family, School, College, and Wellness getaways. Book your luxury experience today!"
        />
      </Head>

      {/* 🔥 Hero Section with Video */}
      <section className="relative w-full h-[70vh] overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="/videos/group_hero.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center text-white px-4">
          <motion.h1
            className="text-5xl font-extrabold mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Exclusive Group & Team Retreats
          </motion.h1>
          <p className="max-w-2xl mb-6 text-lg">
            Elevate your travel experience with bespoke retreats designed for
            Corporates, Families, Schools & More.
          </p>
          <div className="flex gap-4">
            <button className="px-6 py-3 bg-white text-green-700 rounded-full font-semibold hover:bg-gray-100 transition shadow-lg">
              Book a Free Consultation
            </button>
            <button className="px-6 py-3 bg-yellow-400 text-black rounded-full font-semibold hover:bg-yellow-300 transition shadow-lg">
              Join an Open Group Tour
            </button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="text-center py-16 px-6 bg-gray-50">
        <h2 className="text-4xl font-bold text-green-700 mb-6">
          Why Choose JG Camps & Resorts?
        </h2>
        <p className="text-gray-600 max-w-3xl mx-auto mb-12 text-lg">
          We specialize in crafting personalized, luxurious, and stress-free
          group experiences.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
            <h3 className="text-xl font-semibold text-green-700 mb-2">
              100% Customized
            </h3>
            <p>Every detail tailored to your group's needs and preferences.</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
            <h3 className="text-xl font-semibold text-green-700 mb-2">
              Premium Stays & Dining
            </h3>
            <p>Stay in luxury resorts and enjoy world-class culinary experiences.</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
            <h3 className="text-xl font-semibold text-green-700 mb-2">
              Dedicated Experts
            </h3>
            <p>24/7 expert support for a hassle-free travel experience.</p>
          </div>
        </div>
      </section>

      {/* Category Filters */}
      <div className="flex justify-center gap-3 mb-10 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2 rounded-full border font-medium transition-all ${
              activeCategory === cat
                ? "bg-green-600 text-white shadow-md"
                : "bg-white border-gray-300 text-gray-700 hover:bg-green-100"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Retreat Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 pb-20 max-w-7xl mx-auto">
        <AnimatePresence>
          {filteredRetreats.map((retreat) => (
            <motion.div
              key={retreat.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="relative group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:scale-[1.03] transition cursor-pointer"
            >
              <Image
                src={retreat.image}
                alt={retreat.title}
                width={400}
                height={250}
                className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition"></div>
              <div className="p-6 relative z-10">
                <h3 className="text-2xl font-semibold text-green-700 mb-2">
                  {retreat.title}
                </h3>
                <p className="text-gray-600">{retreat.description}</p>
                {retreat.perfectFor && (
                  <p className="text-sm text-gray-500 mt-3">
                    <strong>Perfect For:</strong>{" "}
                    {retreat.perfectFor.join(", ")}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </section>

      {/* Premium Lead Capture */}
      <section className="relative py-16 px-6 bg-gradient-to-br from-green-800 to-green-700 text-white">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-extrabold mb-4">
            Ready to Plan Your Perfect Retreat?
          </h2>
          <p className="mb-8 text-lg text-green-100/90">
            Get a free consultation and customized proposal within 24 hours.
          </p>

          {done ? (
            <div className="bg-white/10 border border-white/20 rounded-2xl p-8 shadow-lg max-w-lg mx-auto">
              <h3 className="text-2xl font-semibold mb-2">
                🎉 Thank you! We’ll be in touch soon.
              </h3>
              <p className="text-green-100">
                Our team will respond within 24 hours. For urgent queries, call
                us directly.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="max-w-lg mx-auto flex flex-col gap-4 bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-xl"
            >
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="p-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                required
              />
              {error && (
                <div className="text-yellow-200 text-sm text-left">{error}</div>
              )}
              <button
                type="submit"
                disabled={sending}
                className="px-6 py-3 bg-yellow-400 text-black rounded-full font-semibold hover:bg-yellow-300 transition shadow-lg disabled:opacity-60"
              >
                {sending ? "Sending..." : "Get Free Quote"}
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
