"use client";

import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Card = { id:number; title:string; desc:string; img:string; category:string; href:string; };

const CATS = ["All", "Jaipur", "Udaipur", "Jaisalmer", "Jodhpur", "Experiences"];

const CARDS: Card[] = [
  { id:1, title:"Jaipur – Pink City", desc:"Amber Fort, Hawa Mahal and royal bazaars.", img:"/images/Rajasthan/jaipur.jpg", category:"Jaipur", href:"/rajasthan/jaipur" },
  { id:2, title:"Udaipur – City of Lakes", desc:"Palaces, boat rides & sunset terraces.", img:"/images/Rajasthan/udaipur.jpg", category:"Udaipur", href:"/rajasthan/udaipur" },
  { id:3, title:"Jaisalmer – Golden Desert", desc:"Dune safaris, starry nights & forts.", img:"/images/Rajasthan/jaisalmer.jpg", category:"Jaisalmer", href:"/rajasthan/jaisalmer" },
  { id:4, title:"Jodhpur – Blue City", desc:"Mehrangarh Fort & old-town charm.", img:"/images/Rajasthan/jodhpur.jpg", category:"Jodhpur", href:"/rajasthan/jodhpur" },
  { id:5, title:"Desert Camp & Safaris", desc:"Camel rides, dune bashing & cultural shows.", img:"/images/Rajasthan/desert-camp.jpg", category:"Experiences", href:"/rajasthan/desert-camp" },
  { id:6, title:"Heritage Walks", desc:"Guided stories through ancient lanes.", img:"/images/Rajasthan/heritage-walk.jpg", category:"Experiences", href:"/rajasthan/heritage-walks" },
  { id:7, title:"Folk Music & Dance", desc:"Live evenings with local artistry.", img:"/images/Rajasthan/folk-night.jpg", category:"Experiences", href:"/rajasthan/folk-music" },
  { id:8, title:"Hot Air Balloon – Jaipur", desc:"Aerial views of forts & countryside.", img:"/images/Rajasthan/balloon.jpg", category:"Experiences", href:"/rajasthan/hot-air-balloon" },
];

export default function RajasthanPage(){
  const [cat, setCat] = useState("All");
  const list = cat==="All"?CARDS:CARDS.filter(c=>c.category===cat);
  return (
    <div className="bg-gradient-to-b from-amber-50 to-rose-100 min-h-screen pb-24">
      <Head>
        <title>Rajasthan Journeys | JG Camps & Resorts</title>
        <meta name="description" content="Jaipur, Udaipur, Jaisalmer & Jodhpur with curated desert experiences and heritage moments."/>
        <meta property="og:image" content="/images/Rajasthan/rajasthan-hero.jpg"/>
      </Head>

      <section className="relative w-full h-[56vh]">
        <Image src="/images/Rajasthan/rajasthan-hero.jpg" alt="Rajasthan palaces and desert" fill priority className="object-cover brightness-75"/>
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.h1 initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:.6}} className="text-white text-4xl md:text-6xl font-bold text-center drop-shadow-xl">
            Royal Rajasthan, Reimagined
          </motion.h1>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-wrap gap-3 justify-center -mt-6 mb-8">
          {CATS.map(c=>(
            <button key={c} onClick={()=>setCat(c)}
              className={`px-4 py-2 rounded-full border text-sm font-medium ${cat===c?"bg-rose-700 text-white border-rose-700":"bg-white/80 text-rose-700 border-rose-300 hover:bg-rose-50"}`}>
              {c}
            </button>
          ))}
        </div>

        <AnimatePresence initial={false}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {list.map(card=>(
              <motion.div key={card.id} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:20}} transition={{duration:.35}}>
                <Link href={card.href} className="block group rounded-2xl overflow-hidden bg-white shadow-lg hover:shadow-2xl transition">
                  <div className="relative h-56">
                    <Image src={card.img} alt={card.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-semibold text-rose-800">{card.title}</h3>
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
