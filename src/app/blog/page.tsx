import type { Metadata } from "next"
import { SiteLayout } from "@/components/layout/site-layout"
import { POSTS } from "@/lib/blog-posts"
import { BlogHeader } from "@/components/blog/blog-header"
import { FeaturedCard } from "@/components/blog/featured-card"
import { PostCard } from "@/components/blog/post-card"
import { NewsletterCta } from "@/components/blog/newsletter-cta"

export const metadata: Metadata = {
  title: "Blog — WebVisionRank",
  description:
    "Insights on Agentic AI, Zero Trust security, Generative Engine Optimization, and elite software engineering from the WebVisionRank team.",
  alternates: { canonical: "https://webvisionrank.com/blog" },
  openGraph: {
    title: "Blog — WebVisionRank",
    description: "Insights on Agentic AI, Zero Trust security, GEO, and elite engineering.",
    url: "https://webvisionrank.com/blog",
  },
}

export default function BlogPage() {
  const featured = POSTS.find((p) => p.featured)!
  const rest = POSTS.filter((p) => !p.featured)

  return (
    <SiteLayout>
      {/* Page header with FlipWords */}
      <BlogHeader />

      <section className="bg-canvas px-6 py-14">
        <div className="mx-auto max-w-[1200px]">

          {/* Featured post */}
          <div className="mb-10">
            <FeaturedCard post={featured} />
          </div>

          {/* Divider */}
          <div className="mb-8 flex items-center gap-4">
            <p className="caption-uppercase text-muted">All articles</p>
            <div className="h-px flex-1 bg-hairline" />
            <span
              className="text-[12px] text-muted"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {rest.length} posts
            </span>
          </div>

          {/* Post grid */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>

          {/* Newsletter CTA */}
          <NewsletterCta />
        </div>
      </section>
    </SiteLayout>
  )
}
