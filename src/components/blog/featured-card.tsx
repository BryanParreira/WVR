"use client"

import Link from "next/link"
import { useState } from "react"
import { ArrowRight } from "lucide-react"
import { GlowingEffect } from "@/components/ui/glowing-effect"
import type { Post } from "@/lib/blog-posts"
import { formatDate } from "@/lib/blog-posts"

export function FeaturedCard({ post }: { post: Post }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="relative rounded-[14px] border border-hairline bg-surface"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <GlowingEffect
        disabled={!hovered}
        spread={60}
        proximity={80}
        inactiveZone={0.01}
        borderWidth={1}
      />
      <Link
        href={`/blog/${post.slug}`}
        className="group block p-8 sm:p-10"
      >
        {/* Meta row */}
        <div className="mb-5 flex flex-wrap items-center gap-3">
          <span
            className="caption-uppercase font-medium text-ink"
          >
            {post.category}
          </span>
          <span
            className="h-1 w-1 rounded-full bg-hairline-strong"
            aria-hidden
          />
          <span className="caption-uppercase text-muted">Featured</span>
          <span
            className="h-1 w-1 rounded-full bg-hairline-strong"
            aria-hidden
          />
          <span
            className="caption-uppercase text-muted"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {post.readTime}
          </span>
        </div>

        {/* Title */}
        <h2 className="mb-4 text-[22px] font-semibold leading-[1.2] tracking-[-0.025em] text-ink transition-opacity duration-150 group-hover:opacity-80 sm:text-[28px]">
          {post.title}
        </h2>

        {/* Excerpt */}
        <p className="mb-7 text-[15px] leading-[1.6] text-body max-w-2xl">
          {post.excerpt}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-hairline pt-5">
          <span
            className="text-[12px] text-muted"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {formatDate(post.date)}
          </span>
          <span className="flex items-center gap-1.5 text-[13px] font-medium text-muted transition-all duration-150 group-hover:text-ink">
            Read article
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-0.5" />
          </span>
        </div>
      </Link>
    </div>
  )
}
