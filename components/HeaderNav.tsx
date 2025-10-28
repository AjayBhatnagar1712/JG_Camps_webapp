// components/HeaderNav.tsx
"use client";

import Link from "next/link";
import { useState, useCallback } from "react";
import { ChevronDown } from "lucide-react";

/**
 * HeaderNav
 *
 * - Shows top navigation (Destinations dropdown, Plan a Trip, About, Contact)
 * - "Plan a Trip" button dispatches the global events that open the itinerary/planner modal.
 *
 * NOTE: this component intentionally dispatches two event names to be resilient to differences
 * in the modal listener name across your codebase. Remove one if you confirm the single event name.
 */

export default function HeaderNav() {
  const [destOpen, setDestOpen] = useState(false);

  const toggleDest = useCallback(() => setDestOpen((s) => !s), []);
  const closeDest = useCallback(() => setDestOpen(false), []);

  // Dispatches events that open the global "Get an Itinerary" modal / planner
  const openPlanner = useCallback((e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    // Try both common event names — remove the one you don't need if you want a single event
    window.dispatchEvent(new Event("open-planner"));
    window.dispatchEvent(new Event("open-itinerary-planner"));
  }, []);

  return (
    <nav className="flex items-center gap-6">
      {/* Destinations + dropdown */}
      <div className="relative">
        <button
          onClick={toggleDest}
          aria-expanded={destOpen}
          className="inline-flex items-center gap-2 text-sm font-medium hover:underline"
        >
          Destinations
          <ChevronDown className="h-4 w-4" />
        </button>

        {/* dropdown panel */}
        <div
          className={`origin-top-right absolute right-0 mt-2 w-56 rounded-lg bg-white shadow-lg ring-1 ring-black/5 transition-opacity duration-150 z-50 ${
            destOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
          }`}
          onMouseLeave={closeDest}
        >
          <ul className="p-3 space-y-2 text-sm text-slate-700">
            {/* Keep these in sync with the cards on app/page.tsx */}
            <li>
              <Link href="/india/north" className="block px-3 py-2 rounded hover:bg-slate-50">
                North India
              </Link>
            </li>
            <li>
              <Link href="/india/south" className="block px-3 py-2 rounded hover:bg-slate-50">
                South India
              </Link>
            </li>
            <li>
              <Link href="/india/east" className="block px-3 py-2 rounded hover:bg-slate-50">
                East India
              </Link>
            </li>
            <li>
              <Link href="/india/west" className="block px-3 py-2 rounded hover:bg-slate-50">
                West India
              </Link>
            </li>
            <li>
              <Link href="/india/northeast" className="block px-3 py-2 rounded hover:bg-slate-50">
                North-East India
              </Link>
            </li>
            <li>
              <Link href="/india/central" className="block px-3 py-2 rounded hover:bg-slate-50">
                Central India
              </Link>
            </li>

            {/* theme cards from home page */}
            <li>
              <Link href="/group-retreats" className="block px-3 py-2 rounded hover:bg-slate-50">
                Group Retreats
              </Link>
            </li>
            <li>
              <Link href="/spiritual" className="block px-3 py-2 rounded hover:bg-slate-50">
                Spiritual Tourism
              </Link>
            </li>
            <li>
              <Link href="/wellness" className="block px-3 py-2 rounded hover:bg-slate-50">
                Wellness & Health
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Plan a Trip: open global itinerary modal */}
      <button
        onClick={openPlanner}
        className="hidden sm:inline text-sm font-medium hover:underline"
        aria-label="Open itinerary planner"
      >
        Plan a Trip
      </button>

      {/* About */}
      <Link href="/about" className="hidden sm:inline text-sm font-medium hover:underline">
        About
      </Link>

      {/* Contact */}
      <Link
        href="#contact-expert"
        onClick={(e) => {
          e.preventDefault();
          window.dispatchEvent(new Event("open-contact-expert"));
        }}
        className="inline-flex items-center px-4 py-2 rounded-md bg-amber-400 text-black font-semibold"
      >
        Contact
      </Link>
    </nav>
  );
}
