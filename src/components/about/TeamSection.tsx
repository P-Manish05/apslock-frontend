"use client";

import Image from "next/image";
import { Marquee } from "@/components/ui/marquee";

interface TeamMember {
  name: string;
  role: string;
  bio?: string;
  image?: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
  } | null;
}

interface TeamSectionProps {
  members?: TeamMember[];
}

const fallbackMembers: TeamMember[] = [
  {
    image: {
      src: "https://images.cnippet.dev/image/upload/v1770400411/a1.jpg",
      alt: "Patrick Stewart",
    },
    name: "Patrick Stewart",
    role: "CEO - Founder",
  },
  {
    image: {
      src: "https://images.cnippet.dev/image/upload/v1770400411/a2.jpg",
      alt: "Alena Rosser",
    },
    name: "Alena Rosser",
    role: "Director of Content",
  },
  {
    image: {
      src: "https://images.cnippet.dev/image/upload/v1770400411/a3.jpg",
      alt: "Fletch Skinner",
    },
    name: "Fletch Skinner",
    role: "Tech Manager",
  },
  {
    image: {
      src: "https://images.cnippet.dev/image/upload/v1770400411/a4.jpg",
      alt: "Marc Spector",
    },
    name: "Marc Spector",
    role: "Director of Content",
  },
  {
    image: {
      src: "https://images.cnippet.dev/image/upload/v1770400411/a5.jpg",
      alt: "Natalia Skinner",
    },
    name: "Natalia Skinner",
    role: "Brand Researcher",
  },
  {
    image: {
      src: "https://images.cnippet.dev/image/upload/v1770400411/a6.jpg",
      alt: "David Kim",
    },
    name: "David Kim",
    role: "Engineering Lead",
  },
];

export default function TeamSection({
  members = fallbackMembers,
}: TeamSectionProps) {
  const teamMembers =
    members && members.length > 0 ? members : fallbackMembers;

  return (
    <section className="relative w-full overflow-hidden bg-bg py-24 md:py-32 border-t border-border">
      <div>
        <svg
          className="absolute right-0 bottom-0 text-border-light"
          fill="none"
          height="154"
          viewBox="0 0 460 154"
          width="460"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_494_1104)">
            <path
              d="M-87.463 458.432C-102.118 348.092 -77.3418 238.841 -15.0744 188.274C57.4129 129.408 180.708 150.071 351.748 341.128C278.246 -374.233 633.954 380.602 548.123 42.7707"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="40"
            />
          </g>

          <defs>
            <clipPath id="clip0_494_1104">
              <rect fill="white" height="154" width="460" />
            </clipPath>
          </defs>
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mx-auto mb-16 flex max-w-5xl flex-col items-center px-6 text-center lg:px-0">
          <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-bg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-user-star-icon lucide-user-star"
            >
              <path d="M16.051 12.616a1 1 0 0 1 1.909.024l.737 1.452a1 1 0 0 0 .737.535l1.634.256a1 1 0 0 1 .588 1.806l-1.172 1.168a1 1 0 0 0-.282.866l.259 1.613a1 1 0 0 1-1.541 1.134l-1.465-.75a1 1 0 0 0-.912 0l-1.465.75a1 1 0 0 1-1.539-1.133l.258-1.613a1 1 0 0 0-.282-.866l-1.156-1.153a1 1 0 0 1 .572-1.822l1.633-.256a1 1 0 0 0 .737-.535z" />
              <path d="M8 15H7a4 4 0 0 0-4 4v2" />
              <circle cx="10" cy="7" r="4" />
            </svg>
          </div>

          <h2 className="mb-4 font-display text-4xl text-text tracking-tight sm:text-5xl">
            Meet the{" "}
            <span className="relative inline-block">
              Team

              <svg
                className="absolute -top-4 -right-8 -z-10 w-32 text-border-light scale-125"
                viewBox="0 0 200 200"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="currentColor"
                  d="M48.8,-69.8C62.1,-63.1,71.2,-48.5,76.6,-32.8C82,-17.1,83.7,-0.3,79.5,14.6C75.3,29.5,65.2,42.5,52.6,52.3C40,62.1,25,68.7,9.3,71.8C-6.4,74.9,-22.8,74.5,-37.4,68.2C-52,61.9,-64.8,49.7,-72.4,34.8C-80,19.9,-82.4,2.3,-78.3,-13.4C-74.2,-29.1,-63.6,-42.9,-50.4,-49.9C-37.2,-56.9,-21.4,-57.1,-5.1,-50.2C11.2,-43.3,22.4,-29.3,35.5,-76.4Z"
                  transform="translate(100 100)"
                />
              </svg>
            </span>
          </h2>

          <p className="max-w-2xl text-text-muted">
            A small, senior team of strategists, designers, and engineers who
            care deeply about their craft.
          </p>
        </div>

        <div className="relative w-full">
          <div className="pointer-events-none absolute top-0 left-0 z-10 h-full w-32 bg-gradient-to-r from-bg to-transparent" />

          <div className="pointer-events-none absolute top-0 right-0 z-10 h-full w-32 bg-gradient-to-l from-bg to-transparent" />

          <Marquee className="[--gap:1.5rem]" pauseOnHover>
            {teamMembers.map((member) => (
              <div
                className="group/card flex w-64 shrink-0 flex-col"
                key={member.name}
              >
                <div className="relative h-92 w-full overflow-hidden rounded-2xl bg-border-light">
                  <Image
                    alt={member.image?.alt || member.name}
                    className="h-full w-full object-cover grayscale transition-all duration-300 group-hover/card:grayscale-0"
                    fill
                    sizes="256px"
                    src={
                      member.image?.src ||
                      "https://images.cnippet.dev/image/upload/v1770400411/a1.jpg"
                    }
                  />

                  <div className="absolute bottom-0 w-full bg-surface/90 backdrop-blur-sm p-4">
                    <h3 className="font-semibold text-text">
                      {member.name}
                    </h3>

                    <p className="text-text-muted text-sm mt-1">
                      {member.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}