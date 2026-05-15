"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { FeaturedCase } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

// ── Desktop Pinned Reel ───────────────────────────────────
function DesktopReel({ cases }: { cases: FeaturedCase[] }) {
  const wrapRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);

  const setCardRef = useCallback((el: HTMLDivElement | null, i: number) => {
    cardsRef.current[i] = el;
  }, []);

  useEffect(() => {
    const wrap = wrapRef.current;
    const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
    if (!wrap || cards.length === 0) return;

    const total = cards.length;
    const peakOf = (i: number) => (i + 0.5) / total;
    const halfSlice = 0.5 / total;
    const ease = (t: number) => t * t * (3 - 2 * t);

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: wrap,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.15,
        onUpdate: (self) => {
          const p = self.progress;
          let activeIdx = 0;
          let closestDist = Infinity;

          cards.forEach((card, i) => {
            const peak = peakOf(i);
            const rawDist = (p - peak) / halfSlice;
            const absDist = Math.min(Math.abs(rawDist), 1.5);

            const isLast = i === cards.length - 1;
            const effectiveRawDistY = (isLast && rawDist > 0) ? 0 : rawDist;

            const scale = 1 - ease(Math.min(absDist, 1)) * 0.3;
            const y = -effectiveRawDistY * 35;
            const rotate = rawDist * 2;

            const fadeStart = 0.6;
            const opacity =
              absDist < fadeStart || (isLast && rawDist > 0)
                ? 1
                : Math.max(0, 1 - (absDist - fadeStart) / (1.2 - fadeStart));

            const z = Math.round((1 - absDist) * 100);

            card.style.transform = `translate3d(-50%, calc(-50% + ${y}vh), 0) scale(${scale}) rotate(${rotate}deg)`;
            card.style.opacity = String(opacity);
            card.style.zIndex = String(z);

            if (absDist < closestDist) {
              closestDist = absDist;
              activeIdx = i;
            }
          });

          setActive((prev) => (prev !== activeIdx ? activeIdx : prev));
        },
      });
    }, wrap);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={wrapRef}
      aria-label="Our achievements"
      className="relative"
      style={{ height: `${cases.length * 90}vh` }}
    >
      {/* Section gradient bg */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, var(--bg) 0%, color-mix(in oklab, var(--surface) 80%, var(--accent)) 50%, var(--bg) 100%)",
        }}
      />

      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* ── Section heading bar ── */}
        <div className="absolute top-0 left-0 right-0 z-20 border-b border-[var(--border)]">
          <div
            className="flex items-center justify-between"
            style={{ padding: "1.4rem 3.5vw" }}
          >
            <div className="flex items-center gap-5">
              <div className="h-px w-10 bg-[var(--accent)]" />
              <span className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-[var(--text-muted)]">
                Our Capabilities
              </span>
            </div>
            <Link
              href="/expertise"
              className="group flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-[var(--text-muted)] transition-colors hover:text-[var(--text)]"
            >
              View expertise
              <ArrowRight
                size={13}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>

        {/* ── Main layout ── */}
        <div className="relative h-full w-full flex" style={{ paddingTop: "3.8rem" }}>
          {/* ── LEFT: info panel ── */}
          <div
            className="relative flex flex-col justify-center w-[42%] shrink-0 border-r border-[var(--border)]"
            style={{ padding: "6vh 4vw 5vh 5vw" }}
          >
            {/* Big numeral */}
            <div
              aria-hidden="true"
              className="absolute top-10 left-10 select-none pointer-events-none"
            >
              {cases.map((c, i) => {
                const isActive = i === active;
                const isPast = i < active;
                return (
                  <span
                    key={c.slug}
                    className="absolute top-0 left-0 font-display font-bold leading-none tracking-tighter"
                    style={{
                      fontSize: "clamp(5rem, 10vw, 10rem)",
                      color: "var(--text)",
                      opacity: isActive ? 0.08 : 0,
                      transform: isActive
                        ? "translateY(0) scale(1) translateZ(0)"
                        : isPast
                        ? "translateY(-30px) scale(0.95) translateZ(0)"
                        : "translateY(30px) scale(1.05) translateZ(0)",
                      transition:
                        "opacity 0.8s cubic-bezier(0.22,1,0.36,1), transform 0.8s cubic-bezier(0.22,1,0.36,1)",
                    }}
                  >
                    {c.index.replace(".", "")}
                  </span>
                );
              })}
            </div>

            {/* Meta content */}
            <div className="relative" style={{ minHeight: 240 }}>
              {cases.map((c, i) => {
                const isActive = i === active;
                const isPast = i < active;
                const dir = isPast ? -1 : 1;
                return (
                  <div
                    key={c.slug}
                    className="absolute inset-x-0 top-0 max-w-[440px]"
                    style={{
                      pointerEvents: isActive ? "auto" : "none",
                    }}
                  >
                    {/* Industry pill */}
                    <div className="overflow-hidden mb-5">
                      <div
                        className="flex items-center gap-3"
                        style={{
                          transform: isActive ? "translateY(0)" : `translateY(${dir * 110}%)`,
                          transition: "transform 0.55s cubic-bezier(0.65, 0, 0.35, 1)",
                          transitionDelay: isActive ? "0.05s" : "0s",
                        }}
                      >
                        <span className="inline-flex items-center rounded-full border border-[var(--border)] px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-[var(--text-muted)]">
                          {c.industry}
                        </span>
                        <span className="font-mono text-[0.65rem] text-[var(--text-muted)]">
                          {c.year}
                        </span>
                      </div>
                    </div>

                    {/* Title */}
                    <div className="overflow-hidden mb-4">
                      <h3
                        className="pb-2 font-display font-bold leading-[1.08] tracking-[-0.02em] text-[var(--text)]"
                        style={{
                          fontSize: "clamp(1.6rem, 2.4vw, 2.6rem)",
                          transform: isActive ? "translateY(0)" : `translateY(${dir * 110}%)`,
                          transition: "transform 0.6s cubic-bezier(0.65, 0, 0.35, 1)",
                          transitionDelay: isActive ? "0.1s" : "0s",
                        }}
                      >
                        {c.title}
                      </h3>
                    </div>

                    {/* Description */}
                    <div className="overflow-hidden mb-8">
                      <p
                        className="pb-2 max-w-sm font-sans text-[0.95rem] leading-[1.55] text-[var(--text-muted)]"
                        style={{
                          transform: isActive ? "translateY(0)" : `translateY(${dir * 110}%)`,
                          transition: "transform 0.6s cubic-bezier(0.65, 0, 0.35, 1)",
                          transitionDelay: isActive ? "0.16s" : "0s",
                        }}
                      >
                        {c.subtitle ?? c.description}
                      </p>
                    </div>

                    {/* CTA */}
                    <div className="overflow-hidden">
                      <div
                        style={{
                          transform: isActive ? "translateY(0)" : `translateY(${dir * 110}%)`,
                          transition: "transform 0.55s cubic-bezier(0.65, 0, 0.35, 1)",
                          transitionDelay: isActive ? "0.22s" : "0s",
                        }}
                      >
                        <Link
                          href="/expertise"
                          className="group inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-6 py-3 font-sans text-sm font-medium text-[var(--text)] transition-all hover:border-[var(--text)] hover:bg-[var(--text)] hover:text-[var(--bg)]"
                        >
                          Explore possibilities
                          <ArrowRight
                            size={15}
                            className="transition-transform group-hover:translate-x-1"
                          />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── RIGHT: floating stacked images ── */}
          <div className="relative flex-1 overflow-hidden">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 50%, color-mix(in oklab, var(--accent) 8%, transparent) 0%, transparent 55%)",
                filter: "blur(60px)",
              }}
            />
            <div className="relative h-full w-full">
              {cases.map((c, i) => (
                <div
                  key={c.slug}
                  ref={(el) => setCardRef(el, i)}
                  className="absolute flex flex-col"
                  style={{
                    top: "50%",
                    left: "50%",
                    width: "clamp(340px, 42vw, 620px)",
                    height: "clamp(440px, 72vh, 800px)",
                    transform: "translate3d(-50%, -50%, 0) scale(0.4)",
                    opacity: 0,
                    borderRadius: 16,
                    backgroundColor: "#ffffff",
                    padding: "10px 10px 32px 10px",
                    willChange: "transform, opacity",
                    boxShadow:
                      "0 50px 100px -30px rgba(0,0,0,0.4), 0 20px 50px -15px rgba(0,0,0,0.25)",
                  }}
                >
                  <div
                    className="relative flex-1 overflow-hidden"
                    style={{ borderRadius: 8 }}
                  >
                    <Image
                      src={c.image.src}
                      alt={c.image.alt}
                      fill
                      sizes="(max-width: 1024px) 80vw, 42vw"
                      className="object-cover"
                      priority={i === 0}
                    />
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0"
                      style={{
                        borderRadius: 8,
                        boxShadow: "inset 0 0 60px rgba(0,0,0,0.15)",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Mobile fallback ───────────────────────────────────────
function StackedLayout({ cases }: { cases: FeaturedCase[] }) {
  return (
    <section
      aria-label="Our capabilities"
      className="border-t border-[var(--border)] bg-[var(--bg)]"
    >
      <div className="container-wide pt-20 pb-4 sm:pt-24">
        <div className="flex items-center gap-4 mb-6">
          <div className="h-px w-8 bg-[var(--accent)]" />
          <span className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-[var(--text-muted)]">
            Our Capabilities
          </span>
        </div>
        <h2 className="text-section-heading text-text max-w-lg">
          What we can build together
        </h2>
      </div>

      {cases.map((c) => (
        <article key={c.slug} className="mx-auto max-w-6xl px-6 py-16 sm:px-8">
          <div className="mb-4 flex items-center gap-3">
            <span className="inline-flex items-center rounded-full border border-[var(--border)] px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-[var(--text-muted)]">
              {c.industry}
            </span>
            <span className="font-mono text-[0.65rem] text-[var(--text-muted)]">
              {c.year}
            </span>
          </div>
          <h3
            className="mb-3 font-display font-bold leading-[1.08] tracking-[-0.02em] text-[var(--text)]"
            style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)" }}
          >
            {c.title}
          </h3>
          <p className="mb-8 max-w-md font-sans text-[0.95rem] leading-[1.55] text-[var(--text-muted)]">
            {c.subtitle ?? c.description}
          </p>
          <div
            className="mb-6 w-full overflow-hidden rounded-xl"
            style={{
              backgroundColor: "#ffffff",
              padding: "8px 8px 28px 8px",
              boxShadow: "0 4px 24px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.04)",
            }}
          >
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg">
              <Image
                src={c.image.src}
                alt={c.image.alt}
                fill
                sizes="100vw"
                className="object-cover"
              />
            </div>
          </div>
          <Link
            href="/expertise"
            className="group inline-flex items-center gap-2 font-sans text-sm font-medium text-[var(--text)] underline underline-offset-4"
          >
            Explore possibilities
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </article>
      ))}
    </section>
  );
}

// ── Main export ───────────────────────────────────────────
export default function CaseReel({ cases }: { cases: FeaturedCase[] }) {
  const [mode, setMode] = useState<"stacked" | "desktop">("stacked");

  useEffect(() => {
    const desktopQ = window.matchMedia("(min-width: 1024px)");
    const motionQ = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () =>
      setMode(desktopQ.matches && !motionQ.matches ? "desktop" : "stacked");
    update();
    desktopQ.addEventListener("change", update);
    motionQ.addEventListener("change", update);
    return () => {
      desktopQ.removeEventListener("change", update);
      motionQ.removeEventListener("change", update);
    };
  }, []);

  return mode === "desktop" ? <DesktopReel cases={cases} /> : <StackedLayout cases={cases} />;
}