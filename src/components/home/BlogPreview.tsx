import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import FadeIn from "@/components/shared/FadeIn";
import type { BlogPost } from "@/lib/data";

interface BlogPreviewProps {
  posts: BlogPost[];
}

export default function BlogPreview({ posts }: BlogPreviewProps) {
  const latestPosts = posts.slice(0, 4);

  return (
    <section className="py-16 md:py-20 lg:py-24 relative overflow-hidden">
      <div className="container-wide">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <FadeIn>
            <p className="text-eyebrow mb-4">From the Blog</p>

            <h2 className="text-section-heading text-text">
              Latest thinking
            </h2>
          </FadeIn>

          <FadeIn delay={0.1}>
            <Link
              href="/blogs"
              className="mt-6 md:mt-0 inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent-hover transition-colors duration-200 group"
            >
              View all posts

              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform duration-200"
              />
            </Link>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {latestPosts.map((post, index) => (
            <FadeIn key={post.slug} delay={index * 0.08}>
              <Link
                href={`/blogs/${post.slug}`}
                className="group block"
              >
                <article>
                  <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-border-light mb-5">
                    {post.image?.src ? (
                      <Image
                        src={post.image.src}
                        alt={post.image?.alt || post.title}
                        width={post.image?.width || 1200}
                        height={post.image?.height || 800}
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                    ) : (
                      <div className="w-full h-full bg-surface" />
                    )}
                  </div>

                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-medium px-2.5 py-1 bg-accent/5 text-accent rounded-full">
                      {post.category}
                    </span>

                    <span className="text-xs text-text-muted">
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="text-base font-semibold text-text leading-snug group-hover:text-accent transition-colors duration-200">
                    {post.title}
                  </h3>
                </article>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}