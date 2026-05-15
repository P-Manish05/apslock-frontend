"use client";

import { useRef, useMemo, type ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowLeft, ArrowRight, Clock, Calendar } from "lucide-react";

import FadeIn from "@/components/shared/FadeIn";
import type { BlogPost } from "@/lib/data";
import { formatDate } from "@/lib/utils";

// ─────────────────────────────────────────────────────────
// Inline bold renderer
// Supports: **bold**
// ─────────────────────────────────────────────────────────
function renderInline(text: string): ReactNode[] {
  return text.split(/(\*\*.*?\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={i} className="text-text font-bold">
        {part.slice(2, -2)}
      </strong>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

// ─────────────────────────────────────────────────────────
// Markdown parser
// Supports:
// ## Headings
// - Bullets
// **Bold callouts**
// ─────────────────────────────────────────────────────────

interface Section {
  heading: string | null;
  paragraphs: string[];
  bullets: string[][];
}

function parseSections(content: any): Section[] {
  if (!content || typeof content !== "string") {
    return [];
  }

  const rawSections = content.split(/^## /m);

  return rawSections
    .filter((s) => s.trim())
    .map((s, i) => {
      const lines = s.split("\n");

      const heading = i === 0 ? null : lines[0].trim();
      const body = i === 0 ? lines : lines.slice(1);

      const paragraphs: string[] = [];
      const bullets: string[][] = [];

      let currentBullets: string[] = [];

      body.forEach((line) => {
        if (line.startsWith("- ")) {
          currentBullets.push(line.slice(2).trim());
        } else {
          if (currentBullets.length) {
            bullets.push([...currentBullets]);
            paragraphs.push(`__BULLETS_${bullets.length - 1}__`);
            currentBullets = [];
          }

          if (line.trim()) {
            paragraphs.push(line.trim());
          }
        }
      });

      if (currentBullets.length) {
        bullets.push([...currentBullets]);
        paragraphs.push(`__BULLETS_${bullets.length - 1}__`);
      }

      return {
        heading,
        paragraphs,
        bullets,
      };
    });
}

// ══════════════════════════════════════════════════════════
// VARIANT 1 — EDITORIAL
// ══════════════════════════════════════════════════════════

function EditorialContent({ sections }: { sections: Section[] }) {
  return (
    <div className="max-w-[720px] mx-auto">
      {sections.map((section, si) => (
        <FadeIn key={si}>
          <div className={si > 0 ? "mt-20" : ""}>
            {section.heading && (
              <div className="flex items-start gap-5 mb-8">
                <span
                  className="text-5xl font-black text-accent/20 font-display leading-none pt-1 select-none"
                  style={{ fontVariantNumeric: "tabular-nums" }}
                >
                  {String(si).padStart(2, "0")}
                </span>

                <h2 className="text-2xl md:text-3xl font-bold text-text font-display tracking-tight uppercase leading-tight pt-2">
                  {section.heading}
                </h2>
              </div>
            )}

            {section.paragraphs.map((para, pi) => {
              if (para.startsWith("__BULLETS_")) {
                const idx = parseInt(
                  para.replace("__BULLETS_", ""),
                  10
                );

                return (
                  <div
                    key={pi}
                    className="my-8 pl-6 border-l-2 border-accent/30 space-y-3"
                  >
                    {section.bullets[idx].map((b, bi) => (
                      <p
                        key={bi}
                        className="text-base md:text-lg text-text-muted leading-relaxed"
                      >
                        <span className="text-accent font-bold mr-2">
                          —
                        </span>
                        {renderInline(b)}
                      </p>
                    ))}
                  </div>
                );
              }

              const isBold =
                para.startsWith("**") &&
                para.endsWith("**");

              if (isBold) {
                return (
                  <div
                    key={pi}
                    className="my-10 py-6 px-8 bg-text text-bg rounded-2xl"
                  >
                    <p className="text-xl md:text-2xl font-bold leading-snug font-display uppercase tracking-tight">
                      {para.slice(2, -2)}
                    </p>
                  </div>
                );
              }

              const isFirstPara = si === 0 && pi === 0;

              return (
                <p
                  key={pi}
                  className="text-[1.05rem] md:text-lg text-text-muted leading-[1.9] my-5"
                >
                  {isFirstPara ? (
                    <>
                      <span className="float-left text-7xl font-black text-text leading-[0.8] mr-3 mt-1 font-display">
                        {para[0]}
                      </span>

                      {renderInline(para.slice(1))}
                    </>
                  ) : (
                    renderInline(para)
                  )}
                </p>
              );
            })}
          </div>
        </FadeIn>
      ))}
    </div>
  );
}

// ══════════════════════════════════════════════════════════
// VARIANT 2 — Q&A
// ══════════════════════════════════════════════════════════

function QandAContent({ sections }: { sections: Section[] }) {
  return (
    <div className="max-w-[720px] mx-auto">
      {sections.map((section, si) => (
        <FadeIn key={si}>
          <div className={si > 0 ? "mt-16" : ""}>
            {section.heading && (
              <div className="mb-6 mt-16">
                <span className="text-xs font-mono text-accent uppercase tracking-widest mb-3 block">
                  {si % 2 === 0
                    ? "The question"
                    : "The reality"}
                </span>

                <h2 className="text-2xl md:text-3xl font-bold text-text font-display leading-tight">
                  {section.heading}
                </h2>

                <div className="mt-4 h-px bg-gradient-to-r from-accent/40 to-transparent" />
              </div>
            )}

            {section.paragraphs.map((para, pi) => {
              if (para.startsWith("__BULLETS_")) {
                const idx = parseInt(
                  para.replace("__BULLETS_", ""),
                  10
                );

                return (
                  <div
                    key={pi}
                    className="my-6 rounded-xl border border-border bg-surface p-6 space-y-3"
                  >
                    {section.bullets[idx].map((b, bi) => (
                      <div
                        key={bi}
                        className="flex items-start gap-3"
                      >
                        <span className="w-5 h-5 rounded-full bg-accent/10 text-accent flex-shrink-0 flex items-center justify-center text-xs font-bold mt-0.5">
                          {bi + 1}
                        </span>

                        <p className="text-base text-text-muted leading-relaxed">
                          {renderInline(b)}
                        </p>
                      </div>
                    ))}
                  </div>
                );
              }

              const isBold =
                para.startsWith("**") &&
                para.endsWith("**");

              if (isBold) {
                return (
                  <div
                    key={pi}
                    className="my-8 rounded-2xl bg-accent/[0.06] border border-accent/15 p-6 md:p-8"
                  >
                    <p className="text-lg md:text-xl font-semibold text-text leading-relaxed">
                      {para.slice(2, -2)}
                    </p>
                  </div>
                );
              }

              return (
                <p
                  key={pi}
                  className="text-[1.05rem] md:text-lg text-text-muted leading-[1.85] my-5"
                >
                  {renderInline(para)}
                </p>
              );
            })}
          </div>
        </FadeIn>
      ))}
    </div>
  );
}

// ══════════════════════════════════════════════════════════
// VARIANT 3 — NARRATIVE
// ══════════════════════════════════════════════════════════

function NarrativeContent({
  sections,
  post,
}: {
  sections: Section[];
  post: BlogPost | any;
}) {
  return (
    <div className="max-w-[660px] mx-auto">
      <FadeIn>
        <p className="text-sm font-mono text-text-muted mb-8 border-b border-border pb-6">
          A perspective from {post.author} ·{" "}
          {formatDate(post.date)}
        </p>
      </FadeIn>

      {sections.map((section, si) => (
        <FadeIn key={si}>
          <div className={si > 0 ? "mt-12" : ""}>
            {section.heading && (
              <p className="text-lg font-semibold text-text italic mt-14 mb-4 leading-snug">
                — {section.heading}
              </p>
            )}

            {section.paragraphs.map((para, pi) => {
              if (para.startsWith("__BULLETS_")) {
                const idx = parseInt(
                  para.replace("__BULLETS_", ""),
                  10
                );

                return (
                  <div
                    key={pi}
                    className="my-7 space-y-2 pl-4"
                  >
                    {section.bullets[idx].map((b, bi) => (
                      <p
                        key={bi}
                        className="text-base md:text-lg text-text-muted leading-relaxed flex items-start gap-3"
                      >
                        <span className="text-accent mt-1.5 flex-shrink-0">
                          •
                        </span>

                        {renderInline(b)}
                      </p>
                    ))}
                  </div>
                );
              }

              const isBold =
                para.startsWith("**") &&
                para.endsWith("**");

              if (isBold) {
                return (
                  <div
                    key={pi}
                    className="my-10 text-center px-4"
                  >
                    <p className="text-2xl md:text-3xl font-light text-text leading-relaxed italic">
                      &ldquo;{para.slice(2, -2)}&rdquo;
                    </p>
                  </div>
                );
              }

              return (
                <p
                  key={pi}
                  className={`text-[1.05rem] md:text-lg text-text-muted leading-[1.95] my-5 ${
                    pi === 0 && si === 0
                      ? "font-medium text-text text-xl"
                      : ""
                  }`}
                >
                  {renderInline(para)}
                </p>
              );
            })}
          </div>
        </FadeIn>
      ))}

      <FadeIn>
        <div className="mt-16 pt-8 border-t border-border">
          <p className="text-sm text-text-muted italic">
            — Written honestly. Not optimized for clicks.
          </p>
        </div>
      </FadeIn>
    </div>
  );
}

// ══════════════════════════════════════════════════════════
// VARIANT 4 — TECHNICAL
// ══════════════════════════════════════════════════════════

function TechnicalContent({
  sections,
}: {
  sections: Section[];
}) {
  return (
    <div className="max-w-[760px] mx-auto">
      {sections.map((section, si) => (
        <FadeIn key={si}>
          <div className={si > 0 ? "mt-16" : ""}>
            {section.heading && (
              <div className="flex items-center gap-4 mb-6 mt-14 pb-4 border-b border-border">
                <span className="text-xs font-mono bg-text text-bg px-2.5 py-1 rounded font-bold">
                  §{si}
                </span>

                <h2 className="text-xl md:text-2xl font-bold text-text font-display uppercase tracking-tight">
                  {section.heading}
                </h2>
              </div>
            )}

            {section.paragraphs.map((para, pi) => {
              if (para.startsWith("__BULLETS_")) {
                const idx = parseInt(
                  para.replace("__BULLETS_", ""),
                  10
                );

                return (
                  <div
                    key={pi}
                    className="my-6 rounded-xl overflow-hidden border border-border"
                  >
                    {section.bullets[idx].map((b, bi) => (
                      <div
                        key={bi}
                        className="flex items-start gap-4 px-5 py-4 border-b border-border/50 last:border-0 hover:bg-surface transition-colors"
                      >
                        <span className="flex-shrink-0 w-6 h-6 rounded bg-accent/10 text-accent text-xs font-bold flex items-center justify-center mt-0.5">
                          {bi + 1}
                        </span>

                        <p className="text-sm md:text-base text-text-muted leading-relaxed">
                          {renderInline(b)}
                        </p>
                      </div>
                    ))}
                  </div>
                );
              }

              const isBold =
                para.startsWith("**") &&
                para.endsWith("**");

              if (isBold) {
                return (
                  <div
                    key={pi}
                    className="my-8 rounded-lg border-l-4 border-accent bg-accent/[0.04] px-6 py-5"
                  >
                    <span className="text-xs font-mono text-accent uppercase tracking-widest block mb-2">
                      Key insight
                    </span>

                    <p className="text-base md:text-lg font-semibold text-text leading-relaxed">
                      {para.slice(2, -2)}
                    </p>
                  </div>
                );
              }

              return (
                <p
                  key={pi}
                  className="text-[1.05rem] md:text-lg text-text-muted leading-[1.85] my-5"
                >
                  {renderInline(para)}
                </p>
              );
            })}
          </div>
        </FadeIn>
      ))}
    </div>
  );
}

interface BlogPostContentProps {
  post: BlogPost | any;
  relatedPosts: BlogPost[] | any[];
}

export default function BlogPostContent({
  post,
  relatedPosts,
}: BlogPostContentProps) {
  const articleRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: articleRef,
    offset: ["start start", "end end"],
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // ─────────────────────────────────────────────────────────
  // Convert Strapi blocks array → markdown string → sections
  // ─────────────────────────────────────────────────────────
  const sections = useMemo(() => {
    const rawContent = post.content || post.body;

    if (Array.isArray(rawContent)) {
      const text = rawContent
        .map((block: any) => {
          if (block.type === "heading") {
            const headingText = (block.children || [])
              .map((c: any) => c.text || "")
              .join("");
            return `## ${headingText}`;
          }
          if (block.type === "paragraph") {
            return (block.children || [])
              .map((c: any) => c.text || "")
              .join("");
          }
          if (block.type === "list") {
            return (block.children || [])
              .map(
                (item: any) =>
                  `- ${(item.children || [])
                    .map((c: any) => c.text || "")
                    .join("")}`
              )
              .join("\n");
          }
          return "";
        })
        .filter(Boolean)
        .join("\n\n");

      return parseSections(text);
    }

    return parseSections(rawContent || "");
  }, [post.content, post.body]);

  const variant = post.variant || "editorial";

  const contentBody = useMemo(() => {
    if (variant === "editorial") {
      return <EditorialContent sections={sections} />;
    }

    if (variant === "qanda") {
      return <QandAContent sections={sections} />;
    }

    if (variant === "narrative") {
      return (
        <NarrativeContent
          sections={sections}
          post={post}
        />
      );
    }

    if (variant === "technical") {
      return <TechnicalContent sections={sections} />;
    }

    return <EditorialContent sections={sections} />;
  }, [sections, variant, post]);

  const heroAccentColor =
    variant === "editorial"
      ? "from-purple-500/10"
      : variant === "qanda"
      ? "from-blue-500/10"
      : variant === "narrative"
      ? "from-amber-500/10"
      : "from-green-500/10";

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-accent origin-left z-[100]"
        style={{ scaleX }}
      />

      <article ref={articleRef}>
        <header className="relative overflow-hidden">
          <div className="relative w-full h-[50vh] md:h-[60vh] lg:h-[70vh] overflow-hidden bg-surface">
            {post.image?.src ? (
              <Image
                src={post.image.src}
                alt={post.image?.alt || post.title}
                fill
                className="object-cover object-center"
                priority
                unoptimized
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-surface flex items-center justify-center">
                <h2 className="text-3xl md:text-5xl font-bold text-text/20 font-display text-center px-6">
                  {post.title}
                </h2>
              </div>
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/60 to-transparent" />

            <div
              className={`absolute inset-0 bg-gradient-to-br ${heroAccentColor} to-transparent`}
            />
          </div>

          <div className="container-wide relative z-10 -mt-48 md:-mt-56 pb-12">
            <FadeIn>
              <Link
                href="/blogs"
                className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors mb-10 group"
              >
                <ArrowLeft
                  size={14}
                  className="group-hover:-translate-x-1 transition-transform"
                />
                All articles
              </Link>
            </FadeIn>

            <FadeIn delay={0.05}>
              <div className="flex flex-wrap items-center gap-3 mb-5">
                <span className="text-xs font-mono px-3 py-1.5 bg-accent text-bg rounded-full font-bold uppercase tracking-wider">
                  {post.category}
                </span>

                <span className="flex items-center gap-1.5 text-xs text-white/60 font-mono">
                  <Calendar size={12} />
                  {formatDate(post.date)}
                </span>

                <span className="flex items-center gap-1.5 text-xs text-white/60 font-mono">
                  <Clock size={12} />
                  {post.readTime}
                </span>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.08] tracking-tight max-w-4xl font-display">
                {post.title}
              </h1>
            </FadeIn>

            <FadeIn delay={0.15}>
              <p className="mt-6 text-base md:text-xl text-white/70 leading-relaxed max-w-2xl">
                {post.excerpt}
              </p>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="mt-8 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center text-xs font-bold text-accent">
                  {post.author
                    ?.split(" ")
                    .map((n: string) => n[0])
                    .join("")}
                </div>

                <div>
                  <p className="text-sm font-semibold text-white">
                    {post.author}
                  </p>

                  <p className="text-xs text-white/50 font-mono">
                    APSLOCK
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </header>

        <div
          className="py-12 md:py-20"
          style={{ background: "var(--bg)" }}
        >
          {contentBody}
        </div>

        <div className="container-wide">
          <div className="max-w-[720px] mx-auto">
            <FadeIn>
              <div className="flex items-center justify-center gap-3 py-10">
                <div className="w-16 h-px bg-border" />
                <div className="w-2 h-2 rotate-45 border border-accent/40" />
                <div className="w-16 h-px bg-border" />
              </div>
            </FadeIn>
          </div>
        </div>

        <div
          className="py-10 md:py-14"
          style={{ background: "var(--bg)" }}
        >
          <div className="container-wide">
            <div className="max-w-[720px] mx-auto">
              <FadeIn>
                <div className="relative p-7 md:p-9 rounded-2xl overflow-hidden border border-border bg-surface">
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-base font-bold text-accent shrink-0">
                      {post.author
                        ?.split(" ")
                        .map((n: string) => n[0])
                        .join("")}
                    </div>

                    <div>
                      <p className="text-xs text-text-muted font-mono uppercase tracking-widest mb-1">
                        Written by
                      </p>

                      <p className="text-lg font-bold text-text font-display uppercase tracking-tight">
                        {post.author}
                      </p>

                      <p className="text-sm text-text-muted mt-2 leading-relaxed max-w-md">
                        Part of the APSLOCK team —
                        building digital experiences that
                        don&apos;t just work, but matter.
                      </p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>

        {relatedPosts.length > 0 && (
          <section className="py-20 md:py-28 border-t border-border">
            <div className="container-wide">
              <FadeIn>
                <p className="text-eyebrow mb-3">
                  Keep reading
                </p>

                <h2 className="text-section-heading text-text mb-12">
                  More from us
                </h2>
              </FadeIn>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedPosts.map((related, i) => (
                  <FadeIn
                    key={related.slug}
                    delay={i * 0.08}
                  >
                    <Link
                      href={`/blogs/${related.slug}`}
                      className="group block"
                    >
                      <article>
                        <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-border-light mb-4">
                          {related.image?.src ? (
                            <Image
                              src={related.image.src}
                              alt={
                                related.image?.alt ||
                                related.title
                              }
                              fill
                              unoptimized
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center bg-surface">
                              <span className="text-sm text-text-muted text-center px-4">
                                {related.title}
                              </span>
                            </div>
                          )}
                        </div>

                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-xs font-medium px-2.5 py-1 bg-accent/5 text-accent rounded-full">
                            {related.category}
                          </span>

                          <span className="text-xs text-text-muted">
                            {related.readTime}
                          </span>
                        </div>

                        <h3 className="text-base font-semibold text-text leading-snug group-hover:text-accent transition-colors duration-200">
                          {related.title}
                        </h3>
                      </article>
                    </Link>
                  </FadeIn>
                ))}
              </div>

              <FadeIn delay={0.3}>
                <div className="mt-14 text-center">
                  <Link
                    href="/blogs"
                    className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent-hover transition-colors group"
                  >
                    View all posts

                    <ArrowRight
                      size={15}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </Link>
                </div>
              </FadeIn>
            </div>
          </section>
        )}
      </article>
    </>
  );
}
