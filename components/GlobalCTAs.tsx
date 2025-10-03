"use client";

import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import PlannerModal from "./PlannerModal";
import ContactExpertModal from "./ContactExpertModal";
import { logLead } from "@/lib/logLead";

export default function GlobalCTAs() {
  const [plannerOpen, setPlannerOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [isKeyboardUser, setIsKeyboardUser] = useState(false);

  // Accessibility: show focus rings only for keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Tab" && setIsKeyboardUser(true);
    const onMouse = () => setIsKeyboardUser(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onMouse);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onMouse);
    };
  }, []);

  // Global events so other components can open/close these modals
  useEffect(() => {
    const openContact = () => setContactOpen(true);
    const openPlanner = () => setPlannerOpen(true);
    const closeAll = () => {
      setPlannerOpen(false);
      setContactOpen(false);
    };

    window.addEventListener("open-contact-expert", openContact as EventListener);
    window.addEventListener("open-planner", openPlanner as EventListener);
    window.addEventListener("close-ctas", closeAll as EventListener);

    return () => {
      window.removeEventListener("open-contact-expert", openContact as EventListener);
      window.removeEventListener("open-planner", openPlanner as EventListener);
      window.removeEventListener("close-ctas", closeAll as EventListener);
    };
  }, []);

  const openPlanner = () => {
    logLead({ channel: "cta-itinerary", note: "Clicked Get Itinerary" });
    setPlannerOpen(true);
  };

  const openContact = () => {
    logLead({ channel: "cta-contact", note: "Clicked Contact Travel Expert" });
    setContactOpen(true);
  };

  return (
    <>
      {/* Floating CTA bar (left), placed to avoid overlap with AI chat at right-bottom */}
      <div
        className={[
          "fixed left-6 bottom-6 z-50",
          "flex flex-col sm:flex-row gap-3",
          "pointer-events-auto",
          "pb-[env(safe-area-inset-bottom,0px)]",
        ].join(" ")}
        aria-label="Quick actions"
      >
        <button
          onClick={openPlanner}
          className={[
            "inline-flex items-center gap-2 rounded-full",
            "bg-primary text-primary-foreground",
            "px-5 py-3 shadow hover:opacity-90 transition",
            isKeyboardUser ? "focus:outline focus:outline-2 focus:outline-ring/60" : "focus:outline-none",
          ].join(" ")}
          aria-haspopup="dialog"
          aria-expanded={plannerOpen}
        >
          Get an Itinerary
        </button>

        <button
          onClick={openContact}
          className={[
            "inline-flex items-center gap-2 rounded-full",
            "bg-yellow-400 text-black",
            "px-5 py-3 shadow hover:brightness-95 transition",
            isKeyboardUser ? "focus:outline focus:outline-2 focus:outline-ring/60" : "focus:outline-none",
          ].join(" ")}
          aria-haspopup="dialog"
          aria-expanded={contactOpen}
        >
          <MessageCircle className="h-5 w-5" />
          Contact Travel Expert
        </button>
      </div>

      {/* Modals */}
      <PlannerModal open={plannerOpen} onClose={() => setPlannerOpen(false)} />
      <ContactExpertModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
}
