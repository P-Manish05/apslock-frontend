import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import CaseReel from "@/components/home/CaseReel";
import AnimatedCapabilities from "@/components/home/AnimatedCapabilities";
import BlogPreview from "@/components/home/BlogPreview";
import GrainBlobs from "@/components/shared/GrainBlobs";
import { heroContent, capabilities, blogPosts as fallbackPosts, featuredCases as fallbackCases } from "@/lib/data";
import { getBlogPosts, getFeaturedCases } from "@/lib/strapi";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "APSLOCK – Atlanta Digital Agency | Web Design, Brand & Growth",
  description:
    "Atlanta's results-driven digital agency for web design, brand identity & growth marketing. Trusted by eCommerce, healthcare, fintech & nonprofit brands to deliver measurable growth.",
  alternates: {
    canonical: "https://apslock.com",
  },
};

export default async function HomePage() {
  let blogPosts = fallbackPosts;
  let featuredCases = fallbackCases;

  try {
    const [strapiBlogs, strapiCases] = await Promise.all([
      getBlogPosts(),
      getFeaturedCases(),
    ]);
    if (strapiBlogs?.length > 0) blogPosts = strapiBlogs;
    if (strapiCases?.length > 0) featuredCases = strapiCases;
  } catch (error) {
    console.warn("Strapi unavailable, using fallback data:", error);
  }

  return (
    <div className="relative overflow-clip" style={{ background: "var(--bg)" }}>
      <GrainBlobs variant="amber" intensity={0.20} animate={true} />
      <div className="relative z-10">
        <Hero content={heroContent} />
        <CaseReel cases={featuredCases} />
        <AnimatedCapabilities items={capabilities} />
        <BlogPreview posts={blogPosts} />
      </div>
    </div>
  );
}