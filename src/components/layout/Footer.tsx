"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUpRight, MapPin, Mail, Phone } from "lucide-react";
import type { NavLink, ContactInfo } from "@/lib/data";

interface FooterProps {
  links: NavLink[];
  contactInfo: ContactInfo;
  siteName: string;
}

/* ── Marquee strip ─────────────────────────────── */
const marqueeItems = [
  "Brand Strategy",
  "Web Experiences",
  "Growth Marketing",
  "Design Systems",
  "AI Solutions",
  "Trust & Influence",
  "Build & Innovate",
  "Go-To-Market",
];

function Marquee() {
  return (
    <div
      className="overflow-hidden border-y"
      style={{ borderColor: "rgba(255,255,255,0.06)" }}
      aria-hidden="true"
    >
      <div
        className="flex whitespace-nowrap py-4"
        style={{
          animation: "footer-marquee 28s linear infinite",
          width: "max-content",
        }}
      >
        {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, i) => (
          <span
            key={i}
            className="mx-10 font-mono text-[0.65rem] uppercase tracking-[0.25em]"
            style={{ color: "rgba(250,250,247,0.28)" }}
          >
            {item}
            <span className="mx-10" style={{ color: "rgba(250,250,247,0.15)" }}>
              ✦
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── Live clock ────────────────────────────────── */
function LiveClock() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const fmt = () =>
      new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
        timeZone: "America/New_York",
      });
    setTime(fmt());
    const id = setInterval(() => setTime(fmt()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="font-mono tabular-nums" style={{ color: "rgba(250,250,247,0.45)" }}>
      {time ?? "—"}
    </span>
  );
}

/* ── Animated wordmark ─────────────────────────── */
function GiantWordmark({ name }: { name: string }) {
  return (
    <div
      aria-hidden="true"
      className="w-full select-none py-2"
      style={{ overflow: "clip" }}
    >
      <div
        className="leading-none font-display font-black text-center whitespace-nowrap"
        style={{
          fontSize: "clamp(5rem, 15vw, 18rem)",
          color: "transparent",
          WebkitTextStroke: "1.5px rgba(250,250,247,0.09)",
          letterSpacing: "-0.04em",
          textRendering: "optimizeLegibility",
          transition: "transform 0.6s cubic-bezier(0.22,1,0.36,1), opacity 0.6s ease",
          willChange: "transform",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.transform = "skewX(-4deg) scale(1.01)";
          (e.currentTarget as HTMLDivElement).style.webkitTextStroke = "1.5px rgba(250,250,247,0.14)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLDivElement).style.transform = "skewX(0deg) scale(1)";
          (e.currentTarget as HTMLDivElement).style.webkitTextStroke = "1.5px rgba(250,250,247,0.09)";
        }}
      >
        {name}
      </div>
    </div>
  );
}


/* ── Status dot ────────────────────────────────── */
function StatusDot() {
  return (
    <span className="relative flex items-center gap-2">
      <span
        className="relative flex h-2 w-2"
        style={{ animation: "footer-pulse 2.4s ease-in-out infinite" }}
      >
        <span
          className="absolute inline-flex h-full w-full rounded-full opacity-75"
          style={{
            background: "#4ade80",
            animation: "footer-ping 2.4s cubic-bezier(0,0,0.2,1) infinite",
          }}
        />
        <span
          className="relative inline-flex h-2 w-2 rounded-full"
          style={{ background: "#22c55e" }}
        />
      </span>
      <span className="text-xs font-mono tracking-wide" style={{ color: "rgba(250,250,247,0.4)" }}>
        Available for new projects
      </span>
    </span>
  );
}

/* ── Main footer ───────────────────────────────── */
export default function Footer({ links, contactInfo, siteName }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const navCols = [
    {
      label: "Navigate",
      items: links.map((l) => ({ label: l.label, href: l.href })),
    },
    {
      label: "Services",
      items: [
        { label: "Brand Foundations", href: "/expertise/brand-foundations" },
        { label: "Growth & GTM", href: "/expertise/growth-go-to-market" },
        { label: "Build & Innovate", href: "/expertise/build-innovation" },
        { label: "Trust & Influence", href: "/expertise/trust-influence" },
      ],
    },
  ];

  return (
    <>
      {/* Keyframes injected inline — no globals.css change needed */}
      <style>{`
        @keyframes footer-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-33.333%); }
        }
        @keyframes footer-ping {
          75%, 100% { transform: scale(2); opacity: 0; }
        }
        @keyframes footer-pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.5; }
        }
        .footer-link-hover {
          position: relative;
          display: inline-block;
        }
        .footer-link-hover::after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 0;
          width: 0;
          height: 1px;
          background: rgba(250,250,247,0.6);
          transition: width 0.3s cubic-bezier(0.22,1,0.36,1);
        }
        .footer-link-hover:hover::after { width: 100%; }
      `}</style>

      <footer
        role="contentinfo"
        className="relative flex flex-col"
        style={{
          minHeight: "100svh",
          background:
            "radial-gradient(ellipse 70% 50% at 85% 10%, rgba(245,237,238,0.06) 0%, transparent 55%), " +
            "radial-gradient(ellipse 60% 45% at 10% 80%, rgba(238,242,237,0.05) 0%, transparent 55%), " +
            "radial-gradient(ellipse 50% 40% at 50% 50%, rgba(235,240,245,0.04) 0%, transparent 60%), " +
            "#141210",
          color: "#FAFAF7",
        }}
      >

        {/* ── Top marquee ── */}
        <div className="relative z-10 pointer-events-none"><Marquee /></div>

        {/* ── Main content ── */}
        <div className="relative z-10 flex-1 flex flex-col justify-between px-6 md:px-12 lg:px-16 xl:px-24 pt-8 pb-6">

          {/* Row 1 — CTA + status */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10">

            {/* Left: headline + CTA */}
            <div className="max-w-xl">
              <p
                className="font-mono text-[0.65rem] uppercase tracking-[0.25em] mb-4"
                style={{ color: "rgba(250,250,247,0.35)" }}
              >
                Let&apos;s build something
              </p>
              <h2
                className="font-display font-black leading-[1.02] tracking-tight mb-6"
                style={{ fontSize: "clamp(2.4rem, 5vw, 5rem)", letterSpacing: "-0.03em" }}
              >
                Ready to make
                <br />
                <em
                  className="not-italic"
                  style={{
                    background: "linear-gradient(135deg, #FAFAF7 0%, rgba(250,250,247,0.55) 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  something lasting?
                </em>
              </h2>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 rounded-full px-8 py-4 text-sm font-medium transition-all duration-300"
                style={{
                  background: "#FAFAF7",
                  color: "#0A0A0A",
                  boxShadow: "0 0 0 0 rgba(250,250,247,0.3)",
                }}
              >
                Start a conversation
                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </div>

            {/* Right: contact details */}
            <div
              className="flex flex-col gap-5 pt-1 text-sm"
              style={{ color: "rgba(250,250,247,0.55)" }}
            >
              <div className="flex items-start gap-3">
                <MapPin size={14} className="mt-0.5 shrink-0" style={{ color: "rgba(250,250,247,0.3)" }} />
                <span>{contactInfo.location} — serving worldwide</span>
              </div>
              <div className="flex items-start gap-3">
                <Mail size={14} className="mt-0.5 shrink-0" style={{ color: "rgba(250,250,247,0.3)" }} />
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="footer-link-hover hover:text-[#FAFAF7] transition-colors duration-200"
                >
                  {contactInfo.email}
                </a>
              </div>
              <div className="flex items-start gap-3">
                <Phone size={14} className="mt-0.5 shrink-0" style={{ color: "rgba(250,250,247,0.3)" }} />
                <a
                  href={`tel:${contactInfo.phone}`}
                  className="footer-link-hover hover:text-[#FAFAF7] transition-colors duration-200"
                >
                  {contactInfo.phone}
                </a>
              </div>

              {/* Live clock */}
              <div className="flex items-center gap-3 mt-2">
                <span className="text-xs font-mono uppercase tracking-[0.18em]" style={{ color: "rgba(250,250,247,0.25)" }}>
                  ET
                </span>
                <LiveClock />
              </div>

              {/* Status */}
              <div className="mt-1">
                <StatusDot />
              </div>
            </div>
          </div>

          {/* ── Giant ghost wordmark ── */}
          <div className="my-0 py-4 -mx-6 md:-mx-12 lg:-mx-16 xl:-mx-24 pointer-events-none">
            <GiantWordmark name={siteName} />
          </div>

          {/* ── Bottom bar ── */}
          <div
            className="border-t pt-5 flex flex-col lg:flex-row lg:items-end justify-between gap-6"
            style={{ borderColor: "rgba(255,255,255,0.07)" }}
          >
            {/* Nav columns */}
            <div className="flex flex-wrap gap-12 md:gap-20">
              {navCols.map((col) => (
                <div key={col.label}>
                  <p
                    className="text-[0.6rem] font-mono uppercase tracking-[0.25em] mb-4"
                    style={{ color: "rgba(250,250,247,0.25)" }}
                  >
                    {col.label}
                  </p>
                  <ul className="space-y-2.5">
                    {col.items.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className="footer-link-hover text-sm transition-colors duration-200"
                          style={{ color: "rgba(250,250,247,0.5)" }}
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {/* Social */}
              <div>
                <p
                  className="text-[0.6rem] font-mono uppercase tracking-[0.25em] mb-4"
                  style={{ color: "rgba(250,250,247,0.25)" }}
                >
                  Social
                </p>
                <ul className="space-y-2.5">
                  {contactInfo.social.map((s) => (
                    <li key={s.platform}>
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="footer-link-hover inline-flex items-center gap-1.5 text-sm transition-colors duration-200"
                        style={{ color: "rgba(250,250,247,0.5)" }}
                        aria-label={`Follow APSLOCK on ${s.platform}`}
                      >
                        {s.platform}
                        <ArrowUpRight size={10} style={{ color: "rgba(250,250,247,0.25)" }} />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Copyright + legal */}
            <div className="flex flex-col items-start lg:items-end gap-3">
              <p className="text-xs font-mono" style={{ color: "rgba(250,250,247,0.22)" }}>
                © {currentYear} {siteName}. All rights reserved.
              </p>
              <div className="flex items-center gap-5">
                {[
                  { label: "Privacy", href: "/privacy" },
                  { label: "Terms", href: "/terms" },
                  { label: "Cookies", href: "/cookies" },
                ].map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="text-[0.7rem] font-mono transition-colors duration-200"
                    style={{ color: "rgba(250,250,247,0.22)" }}
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}