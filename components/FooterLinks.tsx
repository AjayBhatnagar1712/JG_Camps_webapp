// components/FooterLinks.tsx
"use client";

import Link from "next/link";
import { useCallback } from "react";

const WHATSAPP_NUMBER = "+918860692661"; // replace with your number
const SUPPORT_PHONE = "+91-88606-92661";  // replace with your number

const waLink = (text: string) =>
  `https://wa.me/${WHATSAPP_NUMBER.replace(/[^\d]/g, "")}?text=${encodeURIComponent(text)}`;

export default function FooterLinks() {
  const openContactModal = useCallback(() => {
    window.dispatchEvent(new Event("open-contact-expert"));
  }, []);

  return (
    <div>
      <h4 className="font-semibold mb-2">Support</h4>
      <ul className="space-y-1 text-sm text-emerald-100">
        <li>
          <a className="hover:text-yellow-300" href={`tel:${SUPPORT_PHONE.replace(/[^\d+]/g, "")}`}>
            Call {SUPPORT_PHONE}
          </a>
        </li>
        <li>
          <a className="hover:text-yellow-300" href={waLink("Hello! I need help with a booking.")}>WhatsApp</a>
        </li>
        <li>
          <button onClick={openContactModal} className="hover:text-yellow-300 p-0">
            Contact
          </button>
        </li>
        <li>
          <Link href="/about" className="hover:text-yellow-300">About</Link>
        </li>
      </ul>
    </div>
  );
}
