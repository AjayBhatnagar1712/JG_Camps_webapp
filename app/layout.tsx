import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { Compass } from "lucide-react";
import "./globals.css";
import ChatWidget from "@/components/ChatWidget";
import FooterLinks from "@/components/FooterLinks";
import GlobalCTAs from "@/components/GlobalCTAs";
import HeaderNav from "@/components/HeaderNav";
import RouteTheme from "@/components/RouteTheme";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "JG Camps & Resorts",
  description: "Curated journeys, camps, retreats, and AI-assisted itineraries across India and abroad.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-white text-slate-900 antialiased`}>
        <RouteTheme />
        <header className="sticky top-0 z-50 border-b border-white/15 bg-sky-950/80 text-white shadow-xl shadow-sky-950/15 backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
            <Link href="/" className="flex min-w-0 items-center gap-3 font-black tracking-tight">
              <span className="grid h-10 w-10 flex-none place-items-center rounded-2xl bg-gradient-to-br from-sky-200 via-cyan-100 to-amber-200 text-sky-950 shadow-lg shadow-sky-950/20">
                <Compass className="h-5 w-5" />
              </span>
              <span className="truncate text-base md:text-lg">JG Camps & Resorts</span>
            </Link>

            <HeaderNav />
          </div>
        </header>

        <main className="min-h-screen">{children}</main>

        <footer className="border-t border-cyan-900 bg-sky-950 text-white">
          <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-4">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 font-black text-lg">
                <span className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-sky-200 via-cyan-100 to-amber-200 text-sky-950">
                  <Compass className="h-5 w-5" />
                </span>
                JG Camps & Resorts
              </div>
              <p className="mt-4 max-w-md text-sm leading-6 text-sky-50/80">
                Smart travel planning for India and abroad with curated routes, group retreats, spiritual circuits,
                wellness escapes, and quick AI-assisted itinerary drafts.
              </p>
              <div className="mt-5 flex flex-wrap gap-2 text-xs font-semibold text-sky-50">
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Verified partners</span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Custom routes</span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">On-ground support</span>
              </div>
            </div>

            <div>
              <h4 className="font-bold">Why Travel With Us</h4>
              <ul className="mt-4 grid gap-3 text-sm text-sky-50/80">
                <li>Custom itineraries for families, groups, and solo travelers</li>
                <li>AI-powered drafts refined by travel experts</li>
                <li>Support for stays, transport, permits, and local experiences</li>
                <li>Fast consultation through phone, email, and WhatsApp</li>
              </ul>
            </div>

            <FooterLinks />
          </div>

          <div className="border-t border-white/10 py-4 text-center text-xs text-sky-50/60">
            Copyright {new Date().getFullYear()} JG Camps & Resorts. All rights reserved.
          </div>
        </footer>

        <GlobalCTAs />
        <ChatWidget />
      </body>
    </html>
  );
}
