import type { Metadata } from "next";
import FadeIn from "@/components/shared/FadeIn";
import { HighlightText } from "@/components/ui/HighlightText";
import ValuesSection from "@/components/about/ValuesSection";
import WorkProcess from "@/components/about/WorkProcess";
import TeamSection from "@/components/about/TeamSection";
import BigCTA from "@/components/shared/BigCTA";
import GrainBlobs from "@/components/shared/GrainBlobs";
import { workProcess } from "@/lib/data";
import { getTeamMembers } from "@/lib/strapi";

export const metadata: Metadata = {
  title: "About APSLOCK — Atlanta Digital Agency",
  description:
    "Meet the APSLOCK team — a senior-led Atlanta digital agency combining strategy, design, and technology. Learn our values, process, and how we work as your partner.",
  alternates: {
    canonical: "https://apslock.com/about",
  },
};

export default async function AboutPage() {
  let teamMembers = [];

  try {
    const strapiTeam = await getTeamMembers();

    if (strapiTeam && strapiTeam.length > 0) {
      teamMembers = strapiTeam;
    }
  } catch (error) {
    console.log("Strapi team fetch failed:", error);
  }

  return (
    <div
      className="relative overflow-hidden"
      style={{ background: "var(--bg)" }}
    >
      {/* Sage tint — feels natural, grounded for an 'about' page */}
      <GrainBlobs variant="sage" intensity={0.11} animate={true} />

      {/* Hero */}
      <section className="pt-36 pb-20 md:pt-44 md:pb-28 relative z-10">
        <div className="container-wide">
          <FadeIn>
            <h1 className="text-hero text-text max-w-4xl">
              <HighlightText
                text="A studio built on craft and conviction"
                highlight={["craft", "conviction"]}
              />
            </h1>

            <div className="mt-6 text-lg md:text-xl text-text-muted max-w-3xl leading-relaxed space-y-4">
              <p>
                APSLOCK was founded on a simple belief — the most impactful
                digital work happens when strategy, design, and technology move
                as one.
              </p>

              <p>
                We&apos;re a focused, senior-led studio that partners closely
                with ambitious brands. Not as an external vendor, but as an
                extension of your team — invested in building work that performs,
                scales, and lasts.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Values */}
      <div className="relative z-10">
        <ValuesSection />
      </div>

      {/* Work Process */}
      <div className="relative z-10">
        <WorkProcess process={workProcess} />
      </div>

      {/* Team */}
      <div className="relative z-10">
        <TeamSection members={teamMembers} />
      </div>

      {/* CTA */}
      <div className="relative z-10">
        <BigCTA />
      </div>
    </div>
  );
}