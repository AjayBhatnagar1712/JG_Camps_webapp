"use client";

import { useMemo, useState } from "react";
import { X, Phone, Mail, MessageCircle, Sparkles, ChevronRight, CheckCircle2, Loader2 } from "lucide-react";
import { logLead } from "@/lib/logLead"; // ✅ use your shared util

type Props = { open: boolean; onClose: () => void };

// Business contacts
const PHONE_1 = "+918076874156";
const PHONE_2 = "+918595167227";
const EMAIL = "jgadven@gmail.com";
const WHATSAPP = "+918076874156";

function waLink(msg: string) {
  const num = WHATSAPP.replace(/[^\d]/g, "");
  return `https://wa.me/${num}?text=${encodeURIComponent(msg)}`;
}

export default function ContactExpertModal({ open, onClose }: Props) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const cleanPhoneLen = useMemo(() => phone.replace(/[^\d]/g, "").length, [phone]);
  const canSend = cleanPhoneLen >= 10;

  const mailHref = useMemo(
    () =>
      `mailto:${EMAIL}?subject=Trip%20help%20request&body=${encodeURIComponent(
        `Name: ${name || "-"}\nPhone: ${phone}\nDetails: ${note || "-"}`
      )}`,
    [name, phone, note]
  );

  async function submitCallback() {
    if (!canSend || submitting) return;
    setSubmitting(true);
    await logLead({ channel: "callback", name, phone, note, page: "contact-modal" });
    setSubmitting(false);
    setSubmitted(true);
  }

  function onCloseReset() {
    setSubmitted(false);
    setSubmitting(false);
    onClose();
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60]">
      {/* overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onCloseReset} />

      {/* modal */}
      <div className="absolute inset-0 grid place-items-center p-4">
        <div className="w-full max-w-xl rounded-3xl bg-white/90 dark:bg-neutral-900/90 border border-border shadow-2xl backdrop-blur overflow-hidden">
          {/* header */}
          <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-primary/90 to-primary text-primary-foreground">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-white/30 grid place-items-center">
                <Sparkles className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Contact a Travel Expert</h3>
                <p className="text-xs opacity-90">Reach us instantly or request a quick callback.</p>
              </div>
            </div>
            <button
              onClick={onCloseReset}
              className="h-9 w-9 grid place-items-center rounded-full hover:bg-white/20"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* body */}
          <div className="grid gap-5 px-6 py-6">
            {/* quick actions */}
            <div className="grid sm:grid-cols-3 gap-3">
              <a
                href={`tel:${PHONE_1}`}
                onClick={() => logLead({ channel: "call1", name, phone, note, page: "contact-modal" })}
                className="rounded-2xl border border-border p-4 hover:bg-muted/40 transition flex items-center gap-3"
              >
                <Phone className="h-5 w-5" />
                <div className="text-sm">
                  <div className="font-semibold">Call</div>
                  <div className="text-muted-foreground">{PHONE_1.replace("+91", "+91 ")}</div>
                </div>
              </a>
              <a
                href={`tel:${PHONE_2}`}
                onClick={() => logLead({ channel: "call2", name, phone, note, page: "contact-modal" })}
                className="rounded-2xl border border-border p-4 hover:bg-muted/40 transition flex items-center gap-3"
              >
                <Phone className="h-5 w-5" />
                <div className="text-sm">
                  <div className="font-semibold">Call (Alt)</div>
                  <div className="text-muted-foreground">{PHONE_2.replace("+91", "+91 ")}</div>
                </div>
              </a>
              <a
                href={waLink("Hi! I’d like to plan a trip.")}
                target="_blank"
                onClick={() => logLead({ channel: "whatsapp", name, phone, note, page: "contact-modal" })}
                className="rounded-2xl border border-border p-4 hover:bg-muted/40 transition flex items-center gap-3"
              >
                <MessageCircle className="h-5 w-5" />
                <div className="text-sm">
                  <div className="font-semibold">WhatsApp</div>
                  <div className="text-muted-foreground">{WHATSAPP.replace("+91", "+91 ")}</div>
                </div>
              </a>
            </div>

            {/* mini form */}
            <div className="rounded-2xl border border-border p-4">
              {submitted ? (
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                  <div className="text-sm">
                    <div className="font-semibold">Thanks! Your request has been logged.</div>
                    <p className="text-muted-foreground">
                      Our expert will call or WhatsApp you shortly. You can also reach us right away on{" "}
                      <b>8076874156</b> or <b>8595167227</b>.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="grid gap-3">
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      className="rounded-xl border border-border px-3 py-2 text-sm"
                      placeholder="Your name (optional)"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <input
                      className={`rounded-xl border px-3 py-2 text-sm ${
                        canSend ? "border-border" : "border-red-500"
                      }`}
                      placeholder="Phone (required)"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <textarea
                    className="rounded-xl border border-border px-3 py-2 text-sm min-h-[90px]"
                    placeholder="Tell us briefly about your trip (dates, places, headcount)…"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                  />

                  <div className="flex flex-col sm:flex-row gap-2">
                    <a
                      href={waLink(`Hi! I need help with my trip.\n\nName: ${name || "-"}\nPhone: ${phone}\nDetails: ${note || "-"}`)}
                      target="_blank"
                      onClick={() => canSend && logLead({ channel: "whatsapp", name, phone, note, page: "contact-modal" })}
                      className={`inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-2.5 font-semibold shadow ${
                        canSend ? "bg-primary text-primary-foreground hover:opacity-90" : "bg-muted text-muted-foreground pointer-events-none"
                      }`}
                    >
                      <MessageCircle className="h-4 w-4" />
                      WhatsApp Now
                    </a>

                    <a
                      href={canSend ? mailHref : undefined}
                      onClick={() => canSend && logLead({ channel: "email", name, phone, note, page: "contact-modal" })}
                      className={`inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-2.5 font-semibold border ${
                        canSend ? "border-border hover:bg-muted/40" : "border-border/50 pointer-events-none text-muted-foreground"
                      }`}
                    >
                      <Mail className="h-4 w-4" />
                      Email Details
                    </a>

                    <button
                      onClick={submitCallback}
                      disabled={!canSend || submitting}
                      className="inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-2.5 font-semibold border border-border hover:bg-muted/40 disabled:opacity-50"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Submitting…
                        </>
                      ) : (
                        <>
                          <Phone className="h-4 w-4" />
                          Request Callback
                        </>
                      )}
                    </button>
                  </div>

                  {!canSend && (
                    <p className="text-xs text-red-600">
                      Enter a valid phone number (10+ digits) to enable WhatsApp / Email / Callback.
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* footer */}
          <div className="px-6 pb-5">
            <button
              onClick={onCloseReset}
              className="w-full sm:w-auto rounded-xl border border-border px-4 py-2 text-sm hover:bg-muted inline-flex items-center gap-2"
            >
              Close <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
