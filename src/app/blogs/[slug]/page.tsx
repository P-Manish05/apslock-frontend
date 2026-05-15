import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { blogPosts as fallbackPosts } from "@/lib/data";
import { getBlogPosts, getBlogPostBySlug } from "@/lib/strapi";
import { formatDate } from "@/lib/utils";
import BlogPostContent from "@/components/blog/BlogPostContent";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 60;

export async function generateStaticParams() {
  try {
    const posts = await getBlogPosts();
    if (posts && posts.length > 0) {
      return posts.map((post: any) => ({ slug: post.slug }));
    }
  } catch {
    // fallback
  }
  return fallbackPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;

  let post: any = null;

  try {
    post = await getBlogPostBySlug(slug);
  } catch {
    // fallback
  }

  if (!post) {
    post = fallbackPosts.find((p) => p.slug === slug);
  }

  if (!post) return {};

  const title = post.title;
  const description = post.excerpt;

  return {
    title,
    description,
    alternates: {
      canonical: `https://apslock.com/blogs/${post.slug}`,
    },
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      images: post.image?.src
        ? [
            {
              url: post.image.src,
              width: post.image.width || 1200,
              height: post.image.height || 630,
              alt: post.image.alt || post.title,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: post.image?.src ? [post.image.src] : [],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;

  let post: any = null;
  let allPosts: any[] = fallbackPosts;

  try {
    post = await getBlogPostBySlug(slug);
    const strapiAll = await getBlogPosts();
    if (strapiAll && strapiAll.length > 0) {
      allPosts = strapiAll;
    }
  } catch {
    // fallback
  }

  if (!post) {
    post = fallbackPosts.find((p) => p.slug === slug);
  }

  if (!post) {
    notFound();
  }

  const relatedPosts = allPosts
    .filter((p: any) => p.category === post.category && p.slug !== post.slug)
    .slice(0, 3);

  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    image: post.image?.src ? [post.image.src] : [],
    datePublished: post.date,
    dateModified: post.date,
    author: [{ "@type": "Person", name: post.author }],
    description: post.excerpt,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <BlogPostContent post={post} relatedPosts={relatedPosts} />
    </>
  );
}