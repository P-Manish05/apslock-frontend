// ═══════════════════════════════════════════════════════
// APSLOCK — Strapi CMS Fetch Utilities
// All CMS data fetching lives here.
// Components import from here instead of data.ts
// ═══════════════════════════════════════════════════════

const STRAPI_URL = process.env.STRAPI_URL || "http://localhost:1337";
const STRAPI_TOKEN = process.env.STRAPI_TOKEN || "";

const headers = {
  Authorization: `Bearer ${STRAPI_TOKEN}`,
  "Content-Type": "application/json",
};

async function fetchStrapi(endpoint: string) {
  const res = await fetch(`${STRAPI_URL}/api/${endpoint}`, {
    headers,
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`Strapi fetch failed: ${endpoint} — ${res.status}`);
  }

  return res.json();
}

function getStrapiImageUrl(image: any): string | null {
  if (!image) return null;

  const url =
    image.formats?.large?.url ||
    image.formats?.medium?.url ||
    image.url ||
    image.formats?.small?.url ||
    image.formats?.thumbnail?.url ||
    null;

  return url ? `${STRAPI_URL}${url}` : null;
}

// ── Blog Posts ───────────────────────────────────────────

export async function getBlogPosts() {
  const data = await fetchStrapi(
    "blog-posts?populate=image&sort=date:desc"
  );

  return data.data.map((item: any) => ({
    slug: item.slug,
    title: item.title,
    excerpt: item.excerpt,

    // ✅ UPDATED CONTENT MAPPING
    content:
      typeof item.content === "string"
        ? item.content
        : item.content?.[0]?.children
            ?.map((child: any) => child.text)
            .join(" ") || "",

    category: item.category,
    author: item.author,
    date: item.date,
    readTime: item.readTime,
    variant: item.variant,

    image: item.image
      ? {
          src: getStrapiImageUrl(item.image) || "",
          alt: item.image.alternativeText || item.title || "",
          width: item.image.width || 800,
          height: item.image.height || 500,
        }
      : null,
  }));
}

export async function getBlogPostBySlug(slug: string) {
  const data = await fetchStrapi(
    `blog-posts?filters[slug][$eq]=${slug}&populate=image`
  );

  const item = data.data[0];

  if (!item) return null;

  return {
    slug: item.slug,
    title: item.title,
    excerpt: item.excerpt,

    // ✅ UPDATED CONTENT MAPPING
    content:
      typeof item.content === "string"
        ? item.content
        : item.content?.[0]?.children
            ?.map((child: any) => child.text)
            .join(" ") || "",

    category: item.category,
    author: item.author,
    date: item.date,
    readTime: item.readTime,
    variant: item.variant,

    image: item.image
      ? {
          src: getStrapiImageUrl(item.image) || "",
          alt: item.image.alternativeText || item.title || "",
          width: item.image.width || 800,
          height: item.image.height || 500,
        }
      : null,
  };
}

// ── Case Studies ─────────────────────────────────────────

export async function getCaseStudies() {
  const data = await fetchStrapi(
    "case-studies?populate=image,metrics&sort=createdAt:desc"
  );

  return data.data.map((item: any) => ({
    slug: item.slug,
    title: item.title,
    client: item.client,
    category: item.category,
    description: item.description,
    body: item.body,
    metaTitle: item.metaTitle,
    metaDescription: item.metaDescription,

    metrics: item.metrics || [],

    image: item.image
      ? {
          src: getStrapiImageUrl(item.image) || "",
          alt: item.image.alternativeText || item.title || "",
          width: item.image.width || 800,
          height: item.image.height || 600,
        }
      : null,
  }));
}

export async function getCaseStudyBySlug(slug: string) {
  const data = await fetchStrapi(
    `case-studies?filters[slug][$eq]=${slug}&populate=image,metrics`
  );

  const item = data.data[0];

  if (!item) return null;

  return {
    slug: item.slug,
    title: item.title,
    client: item.client,
    category: item.category,
    description: item.description,
    body: item.body,
    metaTitle: item.metaTitle,
    metaDescription: item.metaDescription,

    metrics: item.metrics || [],

    image: item.image
      ? {
          src: getStrapiImageUrl(item.image) || "",
          alt: item.image.alternativeText || item.title || "",
          width: item.image.width || 800,
          height: item.image.height || 600,
        }
      : null,
  };
}

// ── Featured Cases ────────────────────────────────────────

export async function getFeaturedCases() {
  const data = await fetchStrapi(
    "featured-cases?populate=image&sort=index:asc"
  );

  return data.data.map((item: any) => ({
    slug: item.slug,
    index: item.index,
    title: item.title,
    subtitle: item.subtitle,
    description: item.description,
    industry: item.industry,
    year: item.year,

    image: item.image
      ? {
          src: getStrapiImageUrl(item.image) || "",
          alt: item.image.alternativeText || item.title || "",
          width: item.image.width || 800,
          height: item.image.height || 1200,
        }
      : null,
  }));
}

// ── Team Members ─────────────────────────────────────────

export async function getTeamMembers() {
  const data = await fetchStrapi(
    "team-members?populate=image&sort=createdAt:asc"
  );

  return data.data.map((item: any) => ({
    name: item.name,
    role: item.role,
    bio: item.bio,

    image: item.image
      ? {
          src: getStrapiImageUrl(item.image) || "",
          alt: item.image.alternativeText || item.name || "",
          width: item.image.width || 400,
          height: item.image.height || 500,
        }
      : null,
  }));
}