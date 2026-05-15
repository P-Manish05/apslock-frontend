import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import FadeIn from "@/components/shared/FadeIn";
import CaseGrid from "@/components/case-studies/CaseGrid";
import ProcessSteps from "@/components/case-studies/ProcessSteps";
import SpinningText from "@/components/shared/SpinningText";
import { HighlightText } from "@/components/ui/HighlightText";
import GrainBlobs from "@/components/shared/GrainBlobs";

import { processSteps } from "@/lib/data";
import { getCaseStudies } from "@/lib/strapi";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Case Studies — Real Results from Our Digital Agency",
  description:
    "See how APSLOCK drives measurable growth: +340% revenue for eCommerce, 87% patient adoption for healthcare, $4.2M raised for nonprofits. Real projects, real results.",
  alternates: {
    canonical: "https://apslock.com/case-studies",
  },
};

export default async function CaseStudiesPage() {
  let studies = [];

  try {
    studies = await getCaseStudies();
  } catch (error) {
    console.log("Case studies fetch error:", error);
  }

  return (
    <div
      className="relative overflow-hidden"
      style={{ background: "var(--bg)" }}
    >
      {/* Warm tone — grounded, confident for a work/results page */}
      <GrainBlobs variant="amber" intensity={0.12} animate={true} />

      {/* Hero */}
      <section className="relative pt-36 pb-20 md:pt-44 md:pb-28 z-10">
        <SpinningText />

        <div className="container-wide">
          <FadeIn>
            <h1 className="text-hero text-text max-w-3xl">
              <HighlightText
                text="Work that speaks for itself"
                highlight="speaks"
              />
            </h1>

            <p className="mt-6 text-lg md:text-xl text-text-muted max-w-2xl leading-relaxed">
              Real projects, real results. We partner with brands to solve
              complex challenges and deliver outcomes that move the needle.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Grid */}
      <section className="pb-24 md:pb-32 relative z-10">
        <div className="container-wide">
          <CaseGrid studies={studies} />
        </div>
      </section>

      {/* Process */}
      <div className="relative z-10">
        <ProcessSteps steps={processSteps} />
      </div>

      {/* CTA */}
      <section className="py-24 md:py-32 relative z-10">
        <div className="container-wide text-center">
          <FadeIn>
            <h2 className="text-section-heading text-text mb-6">
              Ready to start your project?
            </h2>

            <p className="text-lg text-text-muted max-w-lg mx-auto mb-10">
              Let&apos;s discuss how we can help your brand grow with strategic
              design and technology.
            </p>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-medium bg-accent text-white rounded-full hover:bg-accent-hover transition-colors duration-200 group"
            >
              Start a conversation

              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform duration-200"
              />
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}