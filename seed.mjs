// ═══════════════════════════════════════════════════════
// APSLOCK — Strapi Seed Script
// Pushes all data.ts content into Strapi automatically
// Run: node seed.mjs
// ═══════════════════════════════════════════════════════

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const STRAPI_URL = "http://localhost:1337";
const STRAPI_TOKEN = "aa659ecdf6e43006fe75daa8f52d9f33885dd646628a027a9793dfa599ca2bc4f47092c606e53eaf5d2c4c5d570d8d000898f4de78e01ad92b814be55771418c02d15123eafc7bce86f56b4dc14946629cce7bf5bd3f04d824cfe069fe02b935acca81f72e4899033fb18c98e80bad09395ad56fa741c636ac4a33153781c056"; // same token from .env.local

const headers = {
  Authorization: `Bearer ${STRAPI_TOKEN}`,
};

// ── Upload image to Strapi ────────────────────────────────

async function uploadImage(imagePath, altText) {
  const fullPath = path.join(__dirname, "public", imagePath.replace("/images/", "images/"));

  if (!fs.existsSync(fullPath)) {
    console.log(`  ⚠ Image not found, skipping: ${fullPath}`);
    return null;
  }

  const formData = new FormData();
  const fileBuffer = fs.readFileSync(fullPath);
  const fileName = path.basename(fullPath);
  const mimeType = fileName.endsWith(".png") ? "image/png" : "image/jpeg";

  formData.append("files", new Blob([fileBuffer], { type: mimeType }), fileName);
  formData.append("fileInfo", JSON.stringify({ alternativeText: altText }));

  const res = await fetch(`${STRAPI_URL}/api/upload`, {
    method: "POST",
    headers: { Authorization: `Bearer ${STRAPI_TOKEN}` },
    body: formData,
  });

  if (!res.ok) {
    console.log(`  ⚠ Upload failed for ${fileName}: ${res.status}`);
    return null;
  }

  const data = await res.json();
  return data[0]?.id || null;
}

// ── Create entry in Strapi ────────────────────────────────

async function createEntry(contentType, data) {
  const res = await fetch(`${STRAPI_URL}/api/${contentType}`, {
    method: "POST",
    headers: { ...headers, "Content-Type": "application/json" },
    body: JSON.stringify({ data }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.log(`  ✗ Failed to create ${contentType}: ${err}`);
    return null;
  }

  const result = await res.json();
  return result.data;
}

// ── Blog Posts ────────────────────────────────────────────

async function seedBlogPosts() {
  console.log("\n📝 Seeding Blog Posts...");

  const posts = [
    {
      slug: "your-interface-isnt-broken",
      title: "Your Interface Isn't Broken. It's Indistinguishable.",
      excerpt: "Open five SaaS products in your space. Blur the logos. They start to look the same. Design has become predictable — not because teams lack talent, but because everyone is optimizing against the same references.",
      content: "## The Convergence Problem\n\nOpen five SaaS products in your space.\nBlur the logos.\n\nThey start to look the same.\n\nClean grids. Soft shadows. Rounded buttons. Safe typography.\nNothing is wrong with any of it.\n\n**That's the problem.**\n\nDesign has become predictable. Not because teams lack talent—but because everyone is optimizing against the same references.",
      category: "Design",
      author: "Marcus Rivera",
      date: "2026-04-14",
      readTime: "5 min read",
      variant: "editorial",
      imagePath: "/images/blog-indistinguishable.jpg",
      imageAlt: "Abstract blurred interfaces overlapping",
    },
    {
      slug: "why-brand-strategy-matters",
      title: "Why Brand Strategy Still Matters in a Performance-Driven World",
      excerpt: "In a landscape obsessed with metrics and attribution, brand strategy remains the most under-invested — and most impactful — lever for long-term growth.",
      content: "In a landscape obsessed with metrics and attribution, brand strategy remains the most under-invested and most impactful lever for long-term growth. While performance marketing captures demand, brand strategy creates it.",
      category: "Strategy",
      author: "Sarah Chen",
      date: "2026-03-18",
      readTime: "6 min read",
      variant: "narrative",
      imagePath: "/images/blog-1.jpg",
      imageAlt: "Abstract composition representing brand strategy concepts",
    },
    {
      slug: "design-systems-at-scale",
      title: "Design Systems at Scale: Lessons from the Trenches",
      excerpt: "Building a design system is easy. Getting an organization to adopt, maintain, and evolve it? That's the real challenge. Here's what we've learned.",
      content: "Building a design system is easy. Getting an organization to adopt, maintain, and evolve it? That's the real challenge. Over the past three years, we've helped a dozen companies build and scale design systems.",
      category: "Design",
      author: "Marcus Rivera",
      date: "2026-02-25",
      readTime: "8 min read",
      variant: "editorial",
      imagePath: "/images/blog-2.jpg",
      imageAlt: "Organized design component library visualization",
    },
    {
      slug: "seo-in-age-of-ai",
      title: "SEO in the Age of AI: What Actually Changed (And What Didn't)",
      excerpt: "AI overviews, zero-click searches, and generative engines are reshaping search. Everyone's panicking. But the teams quietly winning right now? They're doing something surprisingly old-school.",
      content: "## The Panic Was Predictable\n\nWhen Google rolled out AI Overviews, the SEO world lost its mind. Organic click-through rates dropped. Traffic from informational queries started evaporating.",
      category: "Marketing",
      author: "Sarah Chen",
      date: "2026-03-20",
      readTime: "7 min read",
      variant: "qanda",
      imagePath: "/images/blog-3.jpg",
      imageAlt: "Person searching and navigating digital content on a laptop",
    },
    {
      slug: "build-a-brand-people-trust",
      title: "How to Build a Brand People Actually Trust (Not Just Recognize)",
      excerpt: "Recognition is easy. Any logo repeated enough times gets remembered. But trust? That's a different game entirely — and most brands are playing the wrong one.",
      content: "## There's a Difference Nobody Talks About\n\nNike is recognized. So is Marlboro. Recognition is a function of repetition and budget. You can buy it.",
      category: "Strategy",
      author: "Sarah Chen",
      date: "2026-02-28",
      readTime: "8 min read",
      variant: "narrative",
      imagePath: "/images/blog-4.jpg",
      imageAlt: "Team collaborating in a modern workspace",
    },
    {
      slug: "web-performance-business-impact",
      title: "Every 100ms Costs You Money. Here's the Data.",
      excerpt: "Speed isn't a technical concern — it's a business metric. The numbers are more brutal than most teams realize, and the fixes are more accessible than they think.",
      content: "## The Numbers Are Real\n\nAmazon ran the study that changed how engineers talk to executives: every 100 milliseconds of added latency cost them 1% in revenue.",
      category: "Development",
      author: "James Park",
      date: "2026-01-15",
      readTime: "9 min read",
      variant: "technical",
      imagePath: "/images/blog-5.jpg",
      imageAlt: "Developer analyzing performance metrics on multiple screens",
    },
  ];

  for (const post of posts) {
    process.stdout.write(`  Creating "${post.title.slice(0, 40)}..."  `);
    const imageId = await uploadImage(post.imagePath, post.imageAlt);
    const entry = await createEntry("blog-posts", {
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category,
      author: post.author,
      date: post.date,
      readTime: post.readTime,
      variant: post.variant,
      image: imageId,
      publishedAt: new Date().toISOString(),
    });
    console.log(entry ? "✓" : "✗");
    await sleep(500);
  }
}

// ── Case Studies ──────────────────────────────────────────

async function seedCaseStudies() {
  console.log("\n💼 Seeding Case Studies...");

  const cases = [
    {
      slug: "elevate-commerce-redesign",
      title: "Reimagining the Online Shopping Experience",
      client: "Elevate Commerce",
      category: "eCommerce",
      description: "A ground-up redesign that transformed a legacy storefront into a conversion-optimized platform, boosting revenue by 340% in six months.",
      metrics: [
        { label: "Revenue Growth", value: "+340%" },
        { label: "Conversion Rate", value: "4.8%" },
        { label: "Page Speed", value: "98/100" },
      ],
      imagePath: "/images/case-study-1.jpg",
      imageAlt: "Elevate Commerce website redesign showcase",
    },
    {
      slug: "greenleaf-brand-identity",
      title: "Building a Brand from the Ground Up",
      client: "GreenLeaf Organics",
      category: "Retail",
      description: "Full brand identity system and digital presence for a sustainable food brand, from naming through launch-day campaigns.",
      metrics: [
        { label: "Brand Awareness", value: "+280%" },
        { label: "Social Following", value: "45K" },
        { label: "Launch Sales", value: "$1.2M" },
      ],
      imagePath: "/images/case-study-2.jpg",
      imageAlt: "GreenLeaf Organics brand identity system",
    },
    {
      slug: "haven-health-platform",
      title: "A Patient Portal That People Actually Use",
      client: "Haven Health",
      category: "Healthcare",
      description: "Designed and built an accessible patient portal that simplified appointment booking, telehealth, and record access for 200K+ patients.",
      metrics: [
        { label: "User Adoption", value: "87%" },
        { label: "Accessibility", value: "AAA" },
        { label: "Support Tickets", value: "-62%" },
      ],
      imagePath: "/images/case-study-3.jpg",
      imageAlt: "Haven Health patient portal interface",
    },
    {
      slug: "uplift-foundation-campaign",
      title: "Turning Awareness into Action",
      client: "Uplift Foundation",
      category: "Nonprofit",
      description: "An integrated awareness campaign and donation platform that helped a nonprofit raise $4.2M in their biggest giving season ever.",
      metrics: [
        { label: "Donations", value: "$4.2M" },
        { label: "Donor Conversion", value: "12.3%" },
        { label: "Email Open Rate", value: "48%" },
      ],
      imagePath: "/images/case-study-4.jpg",
      imageAlt: "Uplift Foundation campaign landing page",
    },
    {
      slug: "nova-fintech-launch",
      title: "Launching a Fintech Brand in 90 Days",
      client: "Nova Financial",
      category: "Fintech",
      description: "Brand strategy, website, and go-to-market campaign that took a fintech startup from zero to 10K signups in its first quarter.",
      metrics: [
        { label: "Signups", value: "10K+" },
        { label: "CAC Reduction", value: "-45%" },
        { label: "Press Mentions", value: "32" },
      ],
      imagePath: "/images/case-study-5.jpg",
      imageAlt: "Nova Financial brand launch materials",
    },
    {
      slug: "atlas-retail-experience",
      title: "Bridging Online and In-Store",
      client: "Atlas Home Goods",
      category: "Retail",
      description: "An omnichannel strategy connecting digital marketing with in-store experience, increasing foot traffic by 65% and online sales by 180%.",
      metrics: [
        { label: "Foot Traffic", value: "+65%" },
        { label: "Online Sales", value: "+180%" },
        { label: "Customer LTV", value: "+40%" },
      ],
      imagePath: "/images/case-study-6.jpg",
      imageAlt: "Atlas Home Goods omnichannel experience",
    },
  ];

  for (const c of cases) {
    process.stdout.write(`  Creating "${c.title.slice(0, 40)}..."  `);
    const imageId = await uploadImage(c.imagePath, c.imageAlt);
    const entry = await createEntry("case-studies", {
      slug: c.slug,
      title: c.title,
      client: c.client,
      category: c.category,
      description: c.description,
      metrics: c.metrics,
      image: imageId,
      publishedAt: new Date().toISOString(),
    });
    console.log(entry ? "✓" : "✗");
    await sleep(500);
  }
}

// ── Featured Cases ────────────────────────────────────────

async function seedFeaturedCases() {
  console.log("\n⭐ Seeding Featured Cases...");

  const featured = [
    {
      slug: "elevate-commerce-redesign",
      index: "01.",
      title: "We Can Reimagine Your Online Shopping Experience",
      subtitle: "A conversion-optimized storefront designed to maximize revenue.",
      description: "We can execute a ground-up redesign to transform your legacy storefront into a conversion-optimized platform, built to scale and boost revenue.",
      industry: "eCommerce",
      year: "Concept",
      imagePath: "/images/cases/case-01.jpg",
      imageAlt: "Elevate Commerce website redesign showcase",
    },
    {
      slug: "haven-health-platform",
      index: "02.",
      title: "We Build Portals That People Actually Use",
      subtitle: "Accessible, user-centric platforms designed for scale.",
      description: "We can design and build accessible digital portals that simplify complex workflows—whether it's appointment booking, customer dashboards, or record access.",
      industry: "Healthcare",
      year: "Concept",
      imagePath: "/images/cases/case-02.jpg",
      imageAlt: "Haven Health patient portal interface",
    },
    {
      slug: "greenleaf-brand-identity",
      index: "03.",
      title: "We Can Build Your Brand from the Ground Up",
      subtitle: "Comprehensive brand identity and digital presence strategy.",
      description: "We offer full brand identity systems and digital presence strategies for your brand, taking you from initial naming all the way through to launch-day campaigns.",
      industry: "Retail",
      year: "Concept",
      imagePath: "/images/cases/case-03.jpg",
      imageAlt: "GreenLeaf Organics brand identity system",
    },
  ];

  for (const f of featured) {
    process.stdout.write(`  Creating "${f.title.slice(0, 40)}..."  `);
    const imageId = await uploadImage(f.imagePath, f.imageAlt);
    const entry = await createEntry("featured-cases", {
      slug: f.slug,
      index: f.index,
      title: f.title,
      subtitle: f.subtitle,
      description: f.description,
      industry: f.industry,
      year: f.year,
      image: imageId,
      publishedAt: new Date().toISOString(),
    });
    console.log(entry ? "✓" : "✗");
    await sleep(500);
  }
}

// ── Team Members ──────────────────────────────────────────

async function seedTeamMembers() {
  console.log("\n👥 Seeding Team Members...");

  const team = [
    {
      name: "Sarah Chen",
      role: "Founder & Strategy Lead",
      bio: "15 years shaping brand and growth strategy for startups and Fortune 500s. Previously at IDEO and Google.",
      imagePath: "/images/team-1.jpg",
      imageAlt: "Sarah Chen — Founder & Strategy Lead",
    },
    {
      name: "Marcus Rivera",
      role: "Creative Director",
      bio: "Award-winning designer with a background in editorial and brand identity. Believes in design that earns trust.",
      imagePath: "/images/team-2.jpg",
      imageAlt: "Marcus Rivera — Creative Director",
    },
    {
      name: "James Park",
      role: "Head of Engineering",
      bio: "Full-stack architect obsessed with performance. Builds systems that scale gracefully and ship confidently.",
      imagePath: "/images/team-3.jpg",
      imageAlt: "James Park — Head of Engineering",
    },
    {
      name: "Amara Okafor",
      role: "Marketing Director",
      bio: "Data-driven marketer who bridges brand and performance. Expert in turning insights into growth engines.",
      imagePath: "/images/team-4.jpg",
      imageAlt: "Amara Okafor — Marketing Director",
    },
  ];

  for (const member of team) {
    process.stdout.write(`  Creating "${member.name}"...  `);
    const imageId = await uploadImage(member.imagePath, member.imageAlt);
    const entry = await createEntry("team-members", {
      name: member.name,
      role: member.role,
      bio: member.bio,
      image: imageId,
      publishedAt: new Date().toISOString(),
    });
    console.log(entry ? "✓" : "✗");
    await sleep(500);
  }
}

// ── Run all ───────────────────────────────────────────────

async function main() {
  console.log("🚀 Starting APSLOCK Strapi seed...");
  console.log(`   Strapi: ${STRAPI_URL}`);

  await seedBlogPosts();
  await seedCaseStudies();
  await seedFeaturedCases();
  await seedTeamMembers();

  console.log("\n✅ Seed complete!");
}

main().catch(console.error);