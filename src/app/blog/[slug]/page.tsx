import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { SiteLayout } from "@/components/layout/site-layout"
import { ProgressiveBlur } from "@/components/ui/progressive-blur"
import { POSTS, getPost, formatDate } from "@/lib/blog-posts"

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return {}
  return {
    title: `${post.title} — WebVisionRank Blog`,
    description: post.excerpt,
    alternates: { canonical: `https://webvisionrank.com/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://webvisionrank.com/blog/${slug}`,
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  const postIndex = POSTS.findIndex((p) => p.slug === slug)
  const next = POSTS[postIndex + 1] ?? null
  const prev = POSTS[postIndex - 1] ?? null

  return (
    <SiteLayout>
      {/* Article header */}
      <section className="relative border-b border-hairline bg-canvas px-6 pb-12 pt-14 sm:pt-20 overflow-hidden">
        {/* Ambient orb */}
        <div
          aria-hidden
          className="pointer-events-none absolute rounded-full"
          style={{
            top: "-100px",
            right: "10%",
            width: "400px",
            height: "400px",
            background:
              "radial-gradient(circle, rgba(96,165,250,0.04) 0%, transparent 70%)",
            animation: "drift-a 22s ease-in-out infinite",
          }}
        />

        <div className="relative mx-auto max-w-[760px]">
          {/* Breadcrumb */}
          <Link
            href="/blog"
            className="mb-8 inline-flex items-center gap-1.5 text-[13px] text-muted transition-colors duration-150 hover:text-ink"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to blog
          </Link>

          {/* Category + meta */}
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <span className="caption-uppercase font-medium text-ink">
              {post.category}
            </span>
            <span className="h-1 w-1 rounded-full bg-hairline-strong" aria-hidden />
            <span
              className="caption-uppercase text-muted"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {formatDate(post.date)}
            </span>
            <span className="h-1 w-1 rounded-full bg-hairline-strong" aria-hidden />
            <span
              className="caption-uppercase text-muted"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {post.readTime}
            </span>
          </div>

          {/* Title */}
          <h1 className="display-lg text-ink leading-[1.1] tracking-[-0.03em]">
            {post.title}
          </h1>
        </div>
      </section>

      {/* Article body with ProgressiveBlur */}
      <section className="bg-canvas px-6 py-0">
        <div className="mx-auto max-w-[760px]">

          {/* Excerpt lead */}
          <div className="relative py-10 border-b border-hairline">
            <ProgressiveBlur
              position="bottom"
              height="48px"
              blurAmount="1.5px"
            />
            <p className="text-[18px] leading-[1.7] text-body font-[350]">
              {post.excerpt}
            </p>
          </div>

          {/* Content sections in scrollable reading pane */}
          <div className="relative mt-0">
            <ProgressiveBlur
              position="top"
              height="56px"
              blurAmount="2px"
            />

            <div className="space-y-0 divide-y divide-hairline">
              {post.content.map((section, i) => (
                <div key={i} className="py-10">
                  {section.heading && (
                    <h2 className="mb-4 text-[18px] font-semibold leading-[1.3] tracking-[-0.02em] text-ink">
                      {section.heading}
                    </h2>
                  )}
                  <p className="text-[16px] leading-[1.75] text-body">
                    {section.body}
                  </p>
                </div>
              ))}
            </div>

            <ProgressiveBlur
              position="bottom"
              height="64px"
              blurAmount="2px"
            />
          </div>

          {/* CTA */}
          <div className="card-hover mt-4 rounded-[12px] border border-hairline bg-surface p-8 text-center">
            <p className="caption-uppercase mb-3 text-muted">Work with us</p>
            <h3 className="display-sm mb-2 text-ink">
              Ready to put this into practice?
            </h3>
            <p className="mx-auto mb-6 max-w-sm text-[14px] leading-[1.6] text-body">
              We build, secure, and automate — from first architecture to production.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-[8px] bg-ink px-5 py-2.5 text-[14px] font-medium text-canvas transition-opacity duration-150 hover:opacity-80"
            >
              Start a project
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Prev / Next nav */}
          {(prev || next) && (
            <div className="mt-8 mb-14 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {prev ? (
                <Link
                  href={`/blog/${prev.slug}`}
                  className="card-hover group flex flex-col gap-1.5 rounded-[10px] border border-hairline bg-surface p-5"
                >
                  <span className="caption-uppercase text-muted flex items-center gap-1.5">
                    <ArrowLeft className="h-3 w-3" /> Previous
                  </span>
                  <span className="text-[14px] font-medium leading-[1.35] text-ink group-hover:opacity-75 transition-opacity">
                    {prev.title}
                  </span>
                </Link>
              ) : <div />}
              {next && (
                <Link
                  href={`/blog/${next.slug}`}
                  className="card-hover group flex flex-col gap-1.5 rounded-[10px] border border-hairline bg-surface p-5 text-right sm:ml-auto sm:w-full"
                >
                  <span className="caption-uppercase text-muted flex items-center justify-end gap-1.5">
                    Next <ArrowRight className="h-3 w-3" />
                  </span>
                  <span className="text-[14px] font-medium leading-[1.35] text-ink group-hover:opacity-75 transition-opacity">
                    {next.title}
                  </span>
                </Link>
              )}
            </div>
          )}
        </div>
      </section>
    </SiteLayout>
  )
}
