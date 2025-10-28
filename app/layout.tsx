// app/layout.tsx (server component)
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import ChatWidget from "@/components/ChatWidget";
import GlobalCTAs from "@/components/GlobalCTAs";
import HeaderNav from "@/components/HeaderNav";
import FooterLinks from "@/components/FooterLinks";
import { Compass } from "lucide-react";
// NOTE: SpeedInsights can sometimes interfere with dev parsing in some setups.
// If you need it, re-add the import and component at the bottom after confirming layout works.
// import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "JG Camps & Resorts",
  description: "Curating soulful journeys across India & abroad.",
};

// Update these numbers
const WHATSAPP_NUMBER = "+919999999999";
const SUPPORT_PHONE = "+91-98765-43210";
const wa = (text: string) =>
  `https://wa.me/${WHATSAPP_NUMBER.replace(/[^\d]/g, "")}?text=${encodeURIComponent(text)}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* place any head-only tags here if needed (fonts, meta are handled by next) */}
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen flex flex-col bg-gradient-to-br from-emerald-50 via-white to-emerald-100 text-slate-800`}
      >
        {/* HEADER */}
        <header className="sticky top-0 z-50 border-b bg-gradient-to-r from-emerald-700 to-emerald-800 text-white shadow-lg backdrop-blur supports-[backdrop-filter]:bg-emerald-800/90">
          <div className="container mx-auto px-4 py-3 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 font-extrabold text-lg">
              <Compass className="h-5 w-5" /> JG Camps & Resorts
            </Link>

            {/* Client nav that contains interactive buttons */}
            <HeaderNav />
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="flex-1">{children}</main>

        {/* FOOTER */}
        <footer className="border-t bg-gradient-to-b from-emerald-800 to-emerald-950 text-white">
          <div className="container mx-auto px-4 py-10 grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 font-extrabold text-lg">
                <Compass className="h-5 w-5" /> JG Camps &amp; Resorts
              </div>
              <p className="text-sm text-emerald-100 mt-2 max-w-md">
                Smart travel planning for India &amp; abroad. AI-assisted itineraries, curated spots, and
                hassle-free bookings.
              </p>
            </div>

            {/* ===== replaced "Explore" with travel-focused trust/value items ===== */}
            <div>
              <h4 className="font-semibold mb-2">Why Travel With Us</h4>
              <ul className="space-y-2 text-sm text-emerald-100">
                <li className="flex items-start gap-2">
                  <span className="text-amber-300 font-bold">✓</span>
                  <span>100% Customized Itineraries</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-300 font-bold">✓</span>
                  <span>Verified Hotels & Local Guides</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-300 font-bold">✓</span>
                  <span>24×7 Travel Support Team</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-300 font-bold">✓</span>
                  <span>Secure Payments & Instant Bookings</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-300 font-bold">✓</span>
                  <span>AI-Powered Trip Planning</span>
                </li>
              </ul>
            </div>

            {/* Client footer block with interactive contact */}
            <FooterLinks />
          </div>

          <div className="bg-emerald-950 text-center text-xs text-emerald-200 py-4">
            © {new Date().getFullYear()} JG Camps &amp; Resorts. All rights reserved.
          </div>
        </footer>

        {/* Universal CTAs (client) */}
        <GlobalCTAs />
        {/* Global AI Chat Widget (client) */}
        <ChatWidget />

        {/* If you want SpeedInsights, re-enable here AFTER verifying layout works */}
        {/* <SpeedInsights /> */}
      </body>
    </html>
  );
}
