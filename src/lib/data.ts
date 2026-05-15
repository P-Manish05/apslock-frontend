/* ═══════════════════════════════════════════════════════
 * APSLOCK — Central Data Layer
 * All page content lives here. Components import typed
 * constants from this file. When a CMS is connected,
 * replace each import with a fetch call — no UI changes.
 * ═══════════════════════════════════════════════════════ */


// ── Shared Types ─────────────────────────────────────────

export interface ImageAsset {
  src: string;
  alt: string;
  width: number;
  height: number;
}

// ── Site Meta ────────────────────────────────────────────

export interface SiteMeta {
  title: string;
  description: string;
  url: string;
  ogImage: ImageAsset;
}

export const siteMeta: SiteMeta = {
  title: "APSLOCK — Web Design, Brand & Growth Agency",
  description:
    "APSLOCK is an Atlanta-based digital agency specializing in web design, brand strategy, and performance marketing. We help ambitious brands grow with measurable results.",
  url: "https://apslock.com",
  ogImage: {
    src: "/images/og-image.jpg",
    alt: "APSLOCK Digital Agency",
    width: 1200,
    height: 630,
  },
};

// ── Navigation ───────────────────────────────────────────

export interface NavLink {
  label: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Our Approach", href: "/approach" },
  { label: "Expertise", href: "/expertise" },
  { label: "Blog", href: "/blogs" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

// ── Hero ─────────────────────────────────────────────────

export interface HeroContent {
  headlinePrefix: string;
  headlineScript: string;
  headlineWords: string[];
  subline: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  image: ImageAsset;
}

export const heroContent: HeroContent = {
  headlinePrefix: "We ",
  headlineScript: "craft",
  headlineWords: ["brands.", "growth.", "cultures.", "platforms."],
  subline:
    "<span class='text-[var(--text)] font-semibold'>APSLOCK</span> partners with ambitious brands to design and build digital experiences, platforms, and campaigns that drive <span class='text-[var(--text)] font-semibold'>measurable growth.</span>",
  primaryCta: { label: "Explore our expertise", href: "/expertise" },
  secondaryCta: { label: "Let's talk", href: "/contact" },
  image: {
    src: "/images/hero-brand.jpg",
    alt: "APSLOCK brand graphic — abstract geometric composition",
    width: 1200,
    height: 800,
  },
};

// ── Featured Cases (Case Reel) ───────────────────────────

export interface FeaturedCase {
  slug: string;
  index: string;
  title: string;
  subtitle?: string;
  description: string;
  industry: string;
  year: string;
  image: ImageAsset;
}

export const featuredCases: FeaturedCase[] = [
  {
    slug: "elevate-commerce-redesign",
    index: "01.",
    title: "We Can Reimagine Your Online Shopping Experience",
    subtitle: "A conversion-optimized storefront designed to maximize revenue.",
    description:
      "We can execute a ground-up redesign to transform your legacy storefront into a conversion-optimized platform, built to scale and boost revenue.",
    industry: "eCommerce",
    year: "Concept",
    image: {
      src: "/images/cases/case-01.jpg",
      alt: "Elevate Commerce website redesign showcase",
      width: 800,
      height: 1200,
    },
  },
  {
    slug: "haven-health-platform",
    index: "02.",
    title: "We Build Portals That People Actually Use",
    subtitle: "Accessible, user-centric platforms designed for scale.",
    description:
      "We can design and build accessible digital portals that simplify complex workflows—whether it's appointment booking, customer dashboards, or record access.",
    industry: "Healthcare",
    year: "Concept",
    image: {
      src: "/images/cases/case-02.jpg",
      alt: "Haven Health patient portal interface",
      width: 800,
      height: 1200,
    },
  },
  {
    slug: "greenleaf-brand-identity",
    index: "03.",
    title: "We Can Build Your Brand from the Ground Up",
    subtitle: "Comprehensive brand identity and digital presence strategy.",
    description:
      "We offer full brand identity systems and digital presence strategies for your brand, taking you from initial naming all the way through to launch-day campaigns.",
    industry: "Retail",
    year: "Concept",
    image: {
      src: "/images/cases/case-03.jpg",
      alt: "GreenLeaf Organics brand identity system",
      width: 800,
      height: 1200,
    },
  },
];

// ── Capabilities ─────────────────────────────────────────

export interface Capability {
  title: string;
  description: string;
  icon: string; // Lucide icon name
  href: string;
}

export const capabilities: Capability[] = [
  {
    title: "Brand Foundations",
    description:
      "The backbone of every brand that lasts — identity, story, and systems that earn attention before your product ever speaks. We build the foundation your growth runs on.",
    icon: "Palette",
    href: "/expertise/brand-foundations",
  },
  {
    title: "Growth & Go-To-Market",
    description:
      "From first launch to scaled pipeline, we turn market ambition into measurable momentum. Sharp positioning, right-fit channels, and execution that converts.",
    icon: "TrendingUp",
    href: "/expertise/growth-go-to-market",
  },
  {
    title: "Build & Innovation",
    description:
      "Websites, platforms, and products built to perform under real pressure — fast, scalable, ready for the way your business actually grows. We ship working software.",
    icon: "Monitor",
    href: "/expertise/build-innovation",
  },
  {
    title: "Trust & Influence",
    description:
      "The authority layer — PR, thought leadership, and communications that compound over time. Earn trust before the first meeting, keep it after the toughest news cycle.",
    icon: "Shield",
    href: "/expertise/trust-influence",
  },
];


// ── Case Studies ─────────────────────────────────────────

export interface CaseStudy {
  slug: string;
  title: string;
  client: string;
  category: string;
  description: string;
  content?: string;
  metrics: { label: string; value: string }[];
  image: ImageAsset;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "elevate-commerce-redesign",
    title: "Reimagining the Online Shopping Experience",
    client: "Elevate Commerce",
    category: "eCommerce",
    description:
      "A ground-up redesign that transformed a legacy storefront into a conversion-optimized platform, boosting revenue by 340% in six months.",
    metrics: [
      { label: "Revenue Growth", value: "+340%" },
      { label: "Conversion Rate", value: "4.8%" },
      { label: "Page Speed", value: "98/100" },
    ],
    image: {
      src: "/images/case-study-1.jpg",
      alt: "Elevate Commerce website redesign showcase",
      width: 800,
      height: 600,
    },
  },
  {
    slug: "greenleaf-brand-identity",
    title: "Building a Brand from the Ground Up",
    client: "GreenLeaf Organics",
    category: "Retail",
    description:
      "Full brand identity system and digital presence for a sustainable food brand, from naming through launch-day campaigns.",
    metrics: [
      { label: "Brand Awareness", value: "+280%" },
      { label: "Social Following", value: "45K" },
      { label: "Launch Sales", value: "$1.2M" },
    ],
    image: {
      src: "/images/case-study-2.jpg",
      alt: "GreenLeaf Organics brand identity system",
      width: 800,
      height: 600,
    },
  },
  {
    slug: "haven-health-platform",
    title: "A Patient Portal That People Actually Use",
    client: "Haven Health",
    category: "Healthcare",
    description:
      "Designed and built an accessible patient portal that simplified appointment booking, telehealth, and record access for 200K+ patients.",
    metrics: [
      { label: "User Adoption", value: "87%" },
      { label: "Accessibility", value: "AAA" },
      { label: "Support Tickets", value: "-62%" },
    ],
    image: {
      src: "/images/case-study-3.jpg",
      alt: "Haven Health patient portal interface",
      width: 800,
      height: 600,
    },
  },
  {
    slug: "uplift-foundation-campaign",
    title: "Turning Awareness into Action",
    client: "Uplift Foundation",
    category: "Nonprofit",
    description:
      "An integrated awareness campaign and donation platform that helped a nonprofit raise $4.2M in their biggest giving season ever.",
    metrics: [
      { label: "Donations", value: "$4.2M" },
      { label: "Donor Conversion", value: "12.3%" },
      { label: "Email Open Rate", value: "48%" },
    ],
    image: {
      src: "/images/case-study-4.jpg",
      alt: "Uplift Foundation campaign landing page",
      width: 800,
      height: 600,
    },
  },
  {
    slug: "nova-fintech-launch",
    title: "Launching a Fintech Brand in 90 Days",
    client: "Nova Financial",
    category: "Fintech",
    description:
      "Brand strategy, website, and go-to-market campaign that took a fintech startup from zero to 10K signups in its first quarter.",
    metrics: [
      { label: "Signups", value: "10K+" },
      { label: "CAC Reduction", value: "-45%" },
      { label: "Press Mentions", value: "32" },
    ],
    image: {
      src: "/images/case-study-5.jpg",
      alt: "Nova Financial brand launch materials",
      width: 800,
      height: 600,
    },
  },
  {
    slug: "atlas-retail-experience",
    title: "Bridging Online and In-Store",
    client: "Atlas Home Goods",
    category: "Retail",
    description:
      "An omnichannel strategy connecting digital marketing with in-store experience, increasing foot traffic by 65% and online sales by 180%.",
    metrics: [
      { label: "Foot Traffic", value: "+65%" },
      { label: "Online Sales", value: "+180%" },
      { label: "Customer LTV", value: "+40%" },
    ],
    image: {
      src: "/images/case-study-6.jpg",
      alt: "Atlas Home Goods omnichannel experience",
      width: 800,
      height: 600,
    },
  },
];

// ── Process Steps ────────────────────────────────────────

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Discover",
    description:
      "We immerse ourselves in your business, audience, and competitive landscape to uncover insights that drive strategy.",
  },
  {
    number: "02",
    title: "Design",
    description:
      "Translating strategy into compelling visuals, interactions, and messaging that resonate with your target audience.",
  },
  {
    number: "03",
    title: "Build",
    description:
      "Engineering robust, performant digital products with clean code, modern tooling, and rigorous quality standards.",
  },
  {
    number: "04",
    title: "Grow",
    description:
      "Launching, measuring, and iterating — we use data to optimize performance and unlock sustainable growth.",
  },
];

// ── Service Segments (Expertise) ─────────────────────────

export interface ServiceSegment {
  label: string;
  heading: string;
  description: string;
  offerings: string[];
}

export const serviceSegments: ServiceSegment[] = [
  {
    label: "Platforms",
    heading: "Digital Platforms",
    description:
      "We design and develop scalable web experiences that form the foundation of your digital presence — built for performance, flexibility, and long-term growth.",
    offerings: [
      "Custom Web Design & Development",
      "E-commerce Platforms",
      "CMS & Platform Architecture",
      "Performance Optimization",
      "Headless & Composable Tech",
    ],
  },
  {
    label: "Product",
    heading: "Product & App Experiences",
    description:
      "From concept to launch, we create intuitive applications that solve real problems and deliver seamless user experiences across every device.",
    offerings: [
      "UI/UX Design & Prototyping",
      "Web Application Development",
      "Mobile-Responsive Experiences",
      "Design Systems",
      "MVP & Rapid Prototyping",
    ],
  },
  {
    label: "AI",
    heading: "AI-Driven Solutions",
    description:
      "We integrate intelligent systems that automate workflows, enhance decision-making, and unlock new possibilities for forward-thinking businesses.",
    offerings: [
      "AI Integration & Automation",
      "Chatbots & Conversational UI",
      "Predictive Analytics",
      "LLM-Powered Features",
      "AI Content Workflows",
    ],
  },
  {
    label: "Growth",
    heading: "Growth Marketing",
    description:
      "We craft data-driven campaigns that connect brands with the right audience — turning visibility into engagement and engagement into measurable results.",
    offerings: [
      "Go-To-Market Strategy",
      "Paid Media Management",
      "Email & Lifecycle Marketing",
      "Conversion Rate Optimization",
      "Analytics & Attribution",
    ],
  },
  {
    label: "Search",
    heading: "Search & Visibility",
    description:
      "We optimize your digital presence to ensure your brand is discoverable, authoritative, and consistently positioned where it matters most.",
    offerings: [
      "Technical SEO",
      "Content Strategy & SEO",
      "Local & International SEO",
      "Core Web Vitals Optimization",
      "Link Building & Authority",
    ],
  },
  {
    label: "Brand",
    heading: "Brand Identity & Design",
    description:
      "We create distinctive visual identities that communicate clearly, resonate deeply, and establish a strong, memorable brand presence across every touchpoint.",
    offerings: [
      "Brand Strategy & Positioning",
      "Visual Identity Systems",
      "Naming & Verbal Identity",
      "Brand Guidelines & Governance",
      "Competitive Audits",
    ],
  },
];

// ── Blog Posts ────────────────────────────────────────────

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content?: string;
  body?: any[];
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: ImageAsset;
  variant?: "editorial" | "narrative" | "technical" | "qanda";
}

export const blogPosts: BlogPost[] = [
  {
    slug: "your-interface-isnt-broken",
    title: "Your Interface Isn't Broken. It's Indistinguishable.",
    excerpt:
      "Open five SaaS products in your space. Blur the logos. They start to look the same. Design has become predictable — not because teams lack talent, but because everyone is optimizing against the same references.",
    content: `## The Convergence Problem

Open five SaaS products in your space.
Blur the logos.

They start to look the same.

Clean grids. Soft shadows. Rounded buttons. Safe typography.
Nothing is wrong with any of it.

**That's the problem.**

Design has become predictable. Not because teams lack talent—but because everyone is optimizing against the same references.

"Best practices" didn't just standardize usability.
They standardized identity.

When every product feels familiar, users don't choose—they default. And default decisions rarely build loyalty.

## The Metrics Blind Spot

Most teams don't notice this drift.

They measure:

- Task completion
- Click-through rates
- Usability scores

All green.

Meanwhile:

- Recall drops
- Differentiation fades
- Switching costs shrink

Because usability tells you if something works.
It doesn't tell you if it **matters**.

## The Smoothness Trap

We've quietly equated good design with invisible design.

The smoother the experience, the less the user feels it.
The less they feel it, the less they remember it.

That's not user-centric.
That's neutral.

There's a difference between removing friction and removing character.

Broken flows? Fix them.
Confusing navigation? Fix it.

But beyond that, total smoothness becomes a tradeoff.

If every interaction is predictable, nothing stands out.
If nothing stands out, nothing sticks.

## Where Products Converge

Look at where most products converge:

- Same onboarding patterns
- Same dashboard layouts
- Same micro-interactions
- Same tone of voice

It's not coincidence.
It's convergence.

Design systems made teams faster.
They also made outcomes similar.

## The Shift

The shift isn't about rejecting usability.

It's about deciding where **not** to be generic.

Not everywhere. Just where it counts.

A moment in onboarding that signals personality.
Copy that sounds like a human, not a system.
A visual decision that feels intentional, not safe.

Small signals. Big effect.

Because users don't remember flows.
They remember **moments**.

## The Harder Question

Ask a harder question:

**If your UI was stripped of branding, would anyone know it's yours?**

If the answer is no, your design isn't user-centric.
It's reference-centric.

Good design gets you used.

**Distinct design gets you chosen.**

There's a difference.

Don't just make your product easy to use.
Make it impossible to confuse with anything else.`,
    variant: "editorial",
    category: "Design",
    author: "Marcus Rivera",
    date: "2026-04-14",
    readTime: "5 min read",
    image: {
      src: "/images/blog-indistinguishable.jpg",
      alt: "Abstract blurred interfaces overlapping — a visual metaphor for design convergence",
      width: 1200,
      height: 630,
    },
  },
  {
    slug: "why-brand-strategy-matters",
    title: "Why Brand Strategy Still Matters in a Performance-Driven World",
    excerpt:
      "In a landscape obsessed with metrics and attribution, brand strategy remains the most under-invested — and most impactful — lever for long-term growth.",
    content:
      "In a landscape obsessed with metrics and attribution, brand strategy remains the most under-invested and most impactful lever for long-term growth. While performance marketing captures demand, brand strategy creates it. The most resilient companies understand that brand isn't a cost center — it's the foundation every other channel builds upon. This article explores why investing in brand foundations pays compound dividends and how to build a measurement framework that captures brand's true impact.",
    category: "Strategy",
    author: "Sarah Chen",
    date: "2026-03-18",
    readTime: "6 min read",
    image: {
      src: "/images/blog-1.jpg",
      alt: "Abstract composition representing brand strategy concepts",
      width: 800,
      height: 500,
    },
  },
  {
    slug: "design-systems-at-scale",
    title: "Design Systems at Scale: Lessons from the Trenches",
    excerpt:
      "Building a design system is easy. Getting an organization to adopt, maintain, and evolve it? That's the real challenge. Here's what we've learned.",
    content:
      "Building a design system is easy. Getting an organization to adopt, maintain, and evolve it? That's the real challenge. Over the past three years, we've helped a dozen companies build and scale design systems. The patterns of success and failure are remarkably consistent. The winning teams treat their design system as a product, complete with user research, roadmaps, and dedicated maintainers. The struggling teams treat it as a side project that everyone owns and nobody maintains. Here are the key lessons we've distilled from working in the trenches.",
    category: "Design",
    author: "Marcus Rivera",
    date: "2026-02-25",
    readTime: "8 min read",
    image: {
      src: "/images/blog-2.jpg",
      alt: "Organized design component library visualization",
      width: 800,
      height: 500,
    },
  },
  {
    slug: "seo-in-age-of-ai",
    title: "SEO in the Age of AI: What Actually Changed (And What Didn't)",
    excerpt:
      "AI overviews, zero-click searches, and generative engines are reshaping search. Everyone's panicking. But the teams quietly winning right now? They're doing something surprisingly old-school.",
    content: `## The Panic Was Predictable

When Google rolled out AI Overviews, the SEO world lost its mind. Organic click-through rates dropped. Traffic from informational queries started evaporating. Forums filled with people claiming SEO was dead.

It wasn't dead. But it had changed — and the teams that adapted fastest weren't the ones chasing new tricks. They were the ones who had been quietly doing the fundamentals well all along.

## What Actually Changed

Here's what is genuinely different now:

- Informational queries get answered directly in the AI Overview box. If someone asks "what is compound interest," they won't click your explainer article
- Zero-click searches are up significantly — users get what they need without leaving results
- Generative engines like ChatGPT, Perplexity, and Claude are real competitors to Google for research tasks
- E-E-A-T is weighted more heavily than ever — Google wants to know who wrote it and why they're qualified

## What Didn't Change

This is the part that surprises people.

**Content that solves real problems still ranks.** If your article genuinely answers something better than anyone else on the internet — with specificity, examples, and actual insight — it still gets found. AI summaries often surface the best sources.

**Backlinks still matter.** The web hasn't stopped being a graph. Authority flows through links. That part of Google's algorithm is deeply embedded and isn't going anywhere.

**Technical foundations still matter.** Page speed, Core Web Vitals, clean site architecture — these are table stakes. If you're slow or broken, you don't compete.

**Brand matters more than ever.** When someone sees your brand name in an AI answer, they click. Brand search is the most durable traffic of all.

## The Updated Playbook

Here's what's working for our clients right now:

- Focus on transactional and commercial queries — these are protected from AI Overviews
- Build genuine topical authority with depth, not breadth
- Optimize for citations in AI-generated answers through structured data and clear author sourcing
- Treat your brand like a media company — consistent, expert, human content
- Earn links through genuinely noteworthy work, not schemes

## The Real Opportunity

Here's what most people miss: **the bar for quality just went up, and most brands aren't clearing it.**

AI is handling the generic stuff. The opportunity has shifted to the specific, the expert, and the human. The businesses that invest in real expertise, documented clearly, communicated honestly — they're going to own the next era of search.

SEO isn't dead. The mediocre version of SEO is dead. The rest just got more interesting.`,
    variant: "qanda",
    category: "Marketing",
    author: "Sarah Chen",
    date: "2026-03-20",
    readTime: "7 min read",
    image: {
      src: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&q=80&w=1200&h=630",
      alt: "Person searching and navigating digital content on a laptop",
      width: 1200,
      height: 630,
    },
  },
  {
    slug: "build-a-brand-people-trust",
    title: "How to Build a Brand People Actually Trust (Not Just Recognize)",
    excerpt:
      "Recognition is easy. Any logo repeated enough times gets remembered. But trust? That's a different game entirely — and most brands are playing the wrong one.",
    content: `## There's a Difference Nobody Talks About

Nike is recognized. So is Marlboro. Recognition is a function of repetition and budget. You can buy it. And it's completely useless if the thing people recognize makes them feel nothing — or worse, makes them distrust you.

Trust is something else entirely. It's earned over time, through consistency between what you say and what you actually do. In 2026, it is the single most valuable thing a brand can have.

## Why Trust Is Harder to Build Now

Three things happened simultaneously that made building trust harder:

**Social media gave everyone a platform.** Customers share their real experiences in public, in real time. The gap between a brand's advertising and its actual product gets exposed almost instantly.

**AI made content cheap.** When everyone can produce polished-looking content at scale, the signal-to-noise ratio collapses. Users have developed finely-tuned skepticism detectors. Generic content now actively damages trust.

**Institutions failed publicly.** Banks, governments, media organizations — the last decade has been a masterclass in institutional failure. People's baseline suspicion of anything that looks like marketing is higher than it's ever been.

## What Trust Actually Looks Like

Trust isn't a feeling — it's a prediction. When someone trusts a brand, they're predicting that future interactions will match past ones. That means trust is built through:

- Consistency — the same values, voice, and quality every single time
- Honesty — saying things that are true even when they're not flattering
- Specificity — being precise about what you do and don't do
- Follow-through — doing what you said you would, reliably

**Every time a brand breaks one of these, it costs more to rebuild than it did to build.**

## The Trust Killers Most Brands Ignore

Some things erode trust so slowly that companies don't notice until it's too late:

- Dark patterns in UX — making it hard to cancel, hiding fees until checkout
- Saying "we're a family" while treating employees badly — people find out
- Overpromising in sales and underdelivering in the product
- Inconsistent quality — great one day, sloppy the next
- Generic social content that feels copy-pasted from a playbook

Each one is a small withdrawal from a trust account you didn't know you were spending.

## What to Actually Do

**Start with the product.** Trust in a brand is ultimately downstream of trust in the thing they sell. If the core product isn't genuinely good, no amount of brand work will compensate.

**Be consistent across every touchpoint.** The experience on your website should match your support team, which should match what someone feels when they open your packaging.

**Publish what you actually believe.** The brands winning on content aren't publishing SEO-optimized generic articles. They're publishing genuine points of view from people with names and track records.

## The Long Game

**Trust compounds.** Every positive interaction makes the next one more likely. It's slow, it's unsexy, and it's the only sustainable competitive advantage most businesses can actually build.

Recognition fades when you stop spending. Trust stays when you stop advertising. Build the thing that lasts.`,
    variant: "narrative",
    category: "Strategy",
    author: "Sarah Chen",
    date: "2026-02-28",
    readTime: "8 min read",
    image: {
      src: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1200&h=630",
      alt: "Team collaborating in a modern workspace, building trust",
      width: 1200,
      height: 630,
    },
  },
  {
    slug: "web-performance-business-impact",
    title: "Every 100ms Costs You Money. Here's the Data.",
    excerpt:
      "Speed isn't a technical concern — it's a business metric. The numbers are more brutal than most teams realize, and the fixes are more accessible than they think.",
    content: `## The Numbers Are Real

Amazon ran the study that changed how engineers talk to executives: every 100 milliseconds of added latency cost them 1% in revenue. That was in 2006. The mobile era has made it worse.

Google found that a half-second delay in search results dropped traffic by 20%. Walmart discovered that for every one-second improvement in page load time, conversions increased by 2%. These aren't edge cases. They're consistent across industries, device types, and traffic sources.

**Speed is a conversion lever, and most teams are leaving money on the table.**

## Why Most Sites Are Still Slow

The irony is that we have better tools than ever, and sites are slower than they were five years ago. The culprits are predictable:

- JavaScript bundle sizes ballooned — modern frameworks made building easier and bundles heavier
- Third-party scripts — analytics, chat widgets, A/B testing platforms, ad pixels — each adds network requests and blocks rendering
- Unoptimized images — a marketing team uploads a 3MB JPEG and nobody notices until someone checks Lighthouse
- No caching strategy — assets that don't change are re-fetched on every visit because nobody set cache headers
- No CDN — a server in Virginia serving users in Singapore with 300ms of latency baked in before the page starts loading

## The Quick Wins (Do These First)

Before touching architecture, these fixes deliver the most return per hour of engineering time:

- Convert images to WebP and serve them at the right size with srcset — this alone can cut 30–60% off page weight
- Add a CDN — Cloudflare's free tier is enough for most small to mid-size sites
- Lazy-load below-the-fold images — the browser has native support, it's one HTML attribute
- Audit your third-party scripts — load them asynchronously and defer what isn't needed on first paint
- Set proper cache headers — static assets should be cached for a year with a versioned filename

You can often get a site from a Lighthouse score of 40 to 75 without touching a single line of application code.

## The Architectural Decisions That Matter Long-Term

For teams building new products or doing serious refactors:

**Static generation where possible.** If a page doesn't need to be dynamic, render it at build time. This eliminates server response time entirely for that page.

**Edge functions over origin servers.** Platforms like Vercel, Netlify, and Cloudflare Workers let you run logic at the CDN edge — milliseconds from the user instead of hundreds of milliseconds away.

**Streaming HTML.** React 18 and Next.js introduced streaming, which lets the browser start rendering before the server finishes generating the full response. First contentful paint drops dramatically.

**Core Web Vitals as deployment criteria.** If a PR degrades LCP or CLS significantly, it shouldn't merge. Make performance a quality gate, not an afterthought.

## The Conversation with Stakeholders

Translate it to dollars. Your current conversion rate times your traffic times your revenue per conversion — apply the Amazon 1%-per-100ms rule. Even a rough estimate makes the case.

Show the competitive gap. Run your competitors through PageSpeed Insights. If you're losing on Core Web Vitals and they're winning, that's a tangible, fixable disadvantage.

Frame it as SEO. Google uses Core Web Vitals as a ranking factor. Page experience is literally in the algorithm.

## The Bottom Line

**Fast sites make more money than slow ones.** This has been proven repeatedly, across industries, at every scale.

You don't need to rebuild everything. You need to audit honestly, fix the high-impact items first, and treat performance like the business metric it actually is — not a nice-to-have technical detail.

Your users are already telling you with their bounce rate. The question is whether you're listening.`,
    variant: "technical",
    category: "Development",
    author: "James Park",
    date: "2026-01-15",
    readTime: "9 min read",
    image: {
      src: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80&w=1200&h=630",
      alt: "Developer analyzing performance metrics on multiple screens",
      width: 1200,
      height: 630,
    },
  },
];

// ── Blog Categories ──────────────────────────────────────

export interface BlogCategory {
  label: string;
  value: string;
}

export const blogCategories: BlogCategory[] = [
  { label: "All", value: "all" },
  { label: "Strategy", value: "Strategy" },
  { label: "Design", value: "Design" },
  { label: "Marketing", value: "Marketing" },
  { label: "Development", value: "Development" },
];

// ── Team Members ─────────────────────────────────────────

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image?: ImageAsset;
}

export const teamMembers: TeamMember[] = [
  {
    name: "Sarah Chen",
    role: "Founder & Strategy Lead",
    bio: "15 years shaping brand and growth strategy for startups and Fortune 500s. Previously at IDEO and Google.",
    image: {
      src: "/images/team-1.jpg",
      alt: "Sarah Chen — Founder & Strategy Lead",
      width: 400,
      height: 500,
    },
  },
  {
    name: "Marcus Rivera",
    role: "Creative Director",
    bio: "Award-winning designer with a background in editorial and brand identity. Believes in design that earns trust.",
    image: {
      src: "/images/team-2.jpg",
      alt: "Marcus Rivera — Creative Director",
      width: 400,
      height: 500,
    },
  },
  {
    name: "James Park",
    role: "Head of Engineering",
    bio: "Full-stack architect obsessed with performance. Builds systems that scale gracefully and ship confidently.",
    image: {
      src: "/images/team-3.jpg",
      alt: "James Park — Head of Engineering",
      width: 400,
      height: 500,
    },
  },
  {
    name: "Amara Okafor",
    role: "Marketing Director",
    bio: "Data-driven marketer who bridges brand and performance. Expert in turning insights into growth engines.",
    image: {
      src: "/images/team-4.jpg",
      alt: "Amara Okafor — Marketing Director",
      width: 400,
      height: 500,
    },
  },
];

// ── Values ───────────────────────────────────────────────

export interface Value {
  title: string;
  description: string;
  icon: string; // Lucide icon name
}

export const values: Value[] = [
  {
    title: "Clarity Over Complexity",
    description:
      "We turn complex ideas into clear, actionable direction. Every decision, every deliverable—built to be understood and aligned across teams.",
    icon: "Focus",
  },
  {
    title: "Craft Matters",
    description:
      "Details aren't optional—they define the outcome. From pixels to performance, we obsess over the small things because they compound into excellence.",
    icon: "Gem",
  },
  {
    title: "Outcomes, Not Outputs",
    description:
      "Great design means nothing without impact. We measure success by results—growth, engagement, and real business movement.",
    icon: "TrendingUp",
  },
  {
    title: "Partnership, Not Vendor",
    description:
      "We don't work for you—we work with you. Embedding deeply, understanding your business, and building long-term value together.",
    icon: "Handshake",
  },
];

// ── Work Process ─────────────────────────────────────────

export interface WorkProcessItem {
  phase: string;
  title: string;
  description: string;
  deliverables: string[];
}

export const workProcess: WorkProcessItem[] = [
  {
    phase: "Phase 1",
    title: "Understand",
    description:
      "We start by listening, learning, and uncovering insights that shape everything that follows.",
    deliverables: [
      "Stakeholder Interviews",
      "Competitive Analysis",
      "Audience Research",
      "Strategic Brief",
    ],
  },
  {
    phase: "Phase 2",
    title: "Define",
    description:
      "We translate insights into a clear strategy and creative direction aligned with your goals.",
    deliverables: [
      "Brand Strategy",
      "Content Architecture",
      "Creative Direction",
      "Technical Planning",
    ],
  },
  {
    phase: "Phase 3",
    title: "Create",
    description:
      "Ideas become reality through thoughtful design, development, and collaboration.",
    deliverables: [
      "UI/UX Design",
      "Development Sprints",
      "Content Production",
      "QA & Testing",
    ],
  },
  {
    phase: "Phase 4",
    title: "Launch & Evolve",
    description:
      "We launch with intention—and continue refining for performance and growth.",
    deliverables: [
      "Launch Support",
      "Analytics & Tracking",
      "Performance Review",
      "Growth Roadmap",
    ],
  },
];

// ── Contact Info ─────────────────────────────────────────

export interface ContactInfo {
  email: string;
  phone: string;
  location: string;
  locationDetail: string;
  social: { platform: string; url: string; icon: string }[];
}

export const contactInfo: ContactInfo = {
  email: "hello@apslock.com",
  phone: "+1 (404) 555-0192",
  location: "Atlanta, GA",
  locationDetail: "Atlanta, GA — serving clients nationwide and worldwide.",
  social: [
    { platform: "LinkedIn", url: "https://linkedin.com/company/apslock", icon: "Linkedin" },
    { platform: "Twitter", url: "https://twitter.com/apslock", icon: "Twitter" },
    { platform: "Instagram", url: "https://instagram.com/apslock", icon: "Instagram" },
    { platform: "Dribbble", url: "https://dribbble.com/apslock", icon: "Dribbble" },
  ],
};