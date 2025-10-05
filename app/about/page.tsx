"use client";

import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import { motion } from "framer-motion";

export default function AboutPage() {
  const openContact = () => window.dispatchEvent(new Event("open-contact-expert"));

  return (
    <>
      <Head>
        <title>About Us — JG Camps &amp; Resorts</title>
        <meta
          name="description"
          content="About JG Camps & Resorts — our story, values, team and why travelers trust us."
        />
      </Head>

      <main className="min-h-screen">
        {/* Hero */}
        <section className="relative w-full h-[48vh] overflow-hidden bg-gradient-to-r from-green-700 to-green-900 text-white">
          <video
            className="absolute inset-0 w-full h-full object-cover opacity-60"
            src="/videos/drone_footage.mp4"
            autoPlay
            loop
            muted
            playsInline
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          <div className="relative z-10 flex flex-col items-center justify-center text-center h-full px-4">
            <motion.h1
              className="text-5xl font-extrabold mb-4"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              Our Story & Values
            </motion.h1>
            <p className="max-w-3xl text-lg">
              Built on a love for travel and a commitment to excellent service,
              we design experiences that delight travelers and support local
              communities.
            </p>
          </div>
        </section>

        {/* Story + Stats */}
        <section className="py-16 px-6">
          <div className="mx-auto max-w-6xl grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Why we exist</h2>
              <p className="text-muted-foreground mb-4">
                We started in year 2000 as a small team of local guides, travel-curators.
                Over the years we evolved as owners/partners across accommodations, 
                transport and certified adventure activity instructors to ensure a seamless travel 
                experience for families, groups, and solo explorers.
              </p>
              <p className="text-muted-foreground mb-6">
                Our approach emphasizes safety, authenticity, sustainability and
                excellent on-ground support — so you can relax and enjoy your
                trip.
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg shadow">
                  <p className="text-2xl font-bold text-primary">1000+</p>
                  <p className="text-sm text-muted-foreground">Trips crafted</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                  <p className="text-2xl font-bold text-primary">95%</p>
                  <p className="text-sm text-muted-foreground">
                    Repeat / satisfied travelers
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                  <p className="text-2xl font-bold text-primary">20+</p>
                  <p className="text-sm text-muted-foreground">Destinations</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                  <p className="text-2xl font-bold text-primary">24/7</p>
                  <p className="text-sm text-muted-foreground">Support</p>
                </div>
              </div>
            </div>

            {/* Photo grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="/images/about/photo1.jpg"
                  alt="trip"
                  width={600}
                  height={400}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="/images/about/photo2.jpg"
                  alt="trip"
                  width={600}
                  height={400}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="/images/about/photo3.jpg"
                  alt="trip"
                  width={600}
                  height={400}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="/images/about/photo4.jpg"
                  alt="trip"
                  width={600}
                  height={400}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Leadership Team */}
        <section className="py-12 px-6 bg-gray-50">
          <div className="mx-auto max-w-6xl text-center">
            <h3 className="text-3xl font-bold mb-6">Meet the Leadership</h3>
            <p className="max-w-3xl mx-auto text-muted-foreground mb-8">
              The core team behind JG Camps & Resorts, ensuring every journey is
              premium and stress-free.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg p-6 shadow">
                <Image
                  src="/images/team/anant.jpg"
                  alt="Anant Arya"
                  width={300}
                  height={300}
                  className="rounded-full mx-auto"
                />
                <h4 className="text-xl font-semibold mt-4">Anant Arya</h4>
                <p className="text-sm text-muted-foreground">Founder & CEO</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow">
                <Image
                  src="/images/team/ajay.jpg"
                  alt="Ajay Bhatnagar"
                  width={300}
                  height={300}
                  className="rounded-full mx-auto"
                />
                <h4 className="text-xl font-semibold mt-4">Ajay Bhatnagar</h4>
                <p className="text-sm text-muted-foreground">
                  Head of Coordinators
                </p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow">
                <Image
                  src="/images/team/vaishnav.jpg"
                  alt="Vaishnav"
                  width={300}
                  height={300}
                  className="rounded-full mx-auto"
                />
                <h4 className="text-xl font-semibold mt-4">Vaishnav</h4>
                <p className="text-sm text-muted-foreground">
                  Experience Curator
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Extended Team */}
        <section className="py-12 px-6">
          <div className="mx-auto max-w-6xl text-center">
            <h3 className="text-3xl font-bold mb-6">Our Coordinators & Team</h3>
            <p className="max-w-3xl mx-auto text-muted-foreground mb-8">
              Dedicated coordinators and team members who make sure every trip
              runs smoothly and every guest feels at home.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg p-6 shadow">
                <Image
                  src="/images/team/ayushi.jpg"
                  alt="Ayushi Srivastav"
                  width={250}
                  height={250}
                  className="rounded-full mx-auto"
                />
                <h4 className="text-lg font-semibold mt-4">Ayushi Srivastav</h4>
                <p className="text-sm text-muted-foreground">Coordinator</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow">
                <Image
                  src="/images/team/bharti.jpg"
                  alt="Bharti"
                  width={250}
                  height={250}
                  className="rounded-full mx-auto"
                />
                <h4 className="text-lg font-semibold mt-4">Bharti</h4>
                <p className="text-sm text-muted-foreground">Coordinator</p>
              </div>
              {/* Add more team members here */}
            </div>
          </div>
        </section>

        {/* Values + CTA */}
        <section className="py-12 px-6 bg-gray-50">
          <div className="mx-auto max-w-6xl text-center">
            <h3 className="text-3xl font-bold mb-4">Our Values</h3>
            <p className="text-muted-foreground mb-8">
              Local knowledge, safety-first planning, and experiences that
              matter.
            </p>

            <div className="flex items-center justify-center gap-4">
              <Link
                href="/"
                className="px-6 py-3 rounded-2xl border border-gray-300"
              >
                Back to Home
              </Link>
              <button
                onClick={openContact}
                className="px-6 py-3 rounded-2xl bg-primary text-primary-foreground font-semibold"
              >
                Contact Travel Expert
              </button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
