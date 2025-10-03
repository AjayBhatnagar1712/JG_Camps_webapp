// components/HeaderNav.tsx
"use client";

import Link from "next/link";
import { useCallback } from "react";

export default function HeaderNav() {
  const openContactModal = useCallback(() => {
    // Broadcast an event that your GlobalCTAs or Contact modal listens for
    window.dispatchEvent(new Event("open-contact-expert"));
  }, []);

  return (
    <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
      <Link href="/" className="hover:text-yellow-300 transition-colors">Home</Link>
      <Link href="/destinations" className="hover:text-yellow-300 transition-colors">Destinations</Link>
      <Link href="/plan" className="hover:text-yellow-300 transition-colors">Plan a Trip</Link>
      <Link href="/about" className="hover:text-yellow-300 transition-colors">About</Link>

      {/* Client-only Contact button (opens modal via event) */}
      <button
        onClick={openContactModal}
        className="ml-2 rounded-md px-3 py-1 text-sm bg-white/5 hover:bg-white/10 transition-colors"
        aria-label="Contact Travel Expert"
      >
        Contact
      </button>
    </nav>
  );
}
