"use client"

import Link from "next/link"
import { useState } from "react"
import { ArrowRight } from "lucide-react"
import { GlowingEffect } from "@/components/ui/glowing-effect"
import type { Post } from "@/lib/blog-posts"
import { formatDate } from "@/lib/blog-posts"

export function PostCard({ post }: { post: Post }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="relative flex flex-col rounded-[12px] border border-hairline bg-surface h-full"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <GlowingEffect
        disabled={!hovered}
        spread={40}
        proximity={64}
        inactiveZone={0.01}
        borderWidth={1}
      />
      <Link
        href={`/blog/${post.slug}`}
        className="group flex flex-col flex-1 p-6"
      >
        {/* Category */}
        <div className="mb-4 flex items-center gap-2">
          <span
            className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-hairline-strong"
            aria-hidden
          />
          <span className="caption-uppercase text-muted">
            {post.category}
          </span>
        </div>

        {/* Title */}
        <h3 className="mb-3 text-[16px] font-semibold leading-[1.35] tracking-[-0.015em] text-ink transition-opacity duration-150 group-hover:opacity-75">
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="mb-5 flex-1 text-[14px] leading-[1.6] text-body line-clamp-3">
          {post.excerpt}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-hairline pt-4">
          <span
            className="text-[11px] text-muted"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {formatDate(post.date)} · {post.readTime}
          </span>
          <ArrowRight className="h-3.5 w-3.5 text-muted transition-all duration-150 group-hover:translate-x-0.5 group-hover:text-ink" />
        </div>
      </Link>
    </div>
  )
}
