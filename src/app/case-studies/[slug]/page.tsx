import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { SiteLayout } from "@/components/layout/site-layout"
import { CASE_STUDIES, getCaseStudy, isPlaceholder } from "@/lib/case-studies"
import { PendingField } from "@/components/case-studies/pending-field"
import { CaseStudyJsonLd } from "@/components/seo/json-ld"

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return CASE_STUDIES.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const cs = getCaseStudy(slug)
  if (!cs) return {}
  return {
    title: `${cs.client} Case Study — WebVisionRank`,
    description: isPlaceholder(cs.summary) ? `How WebVisionRank worked with ${cs.client}.` : cs.summary,
    alternates: { canonical: `https://webvisionrank.com/case-studies/${slug}` },
  }
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params
  const cs = getCaseStudy(slug)
  if (!cs) notFound()

  return (
    <SiteLayout>
      {!isPlaceholder(cs.summary) && <CaseStudyJsonLd cs={cs} />}
      <section className="border-b border-hairline bg-canvas px-6 pb-12 pt-14 sm:pt-20">
        <div className="mx-auto max-w-[760px]">
          <Link
            href="/case-studies"
            className="mb-8 inline-flex items-center gap-1.5 text-[13px] text-muted transition-colors duration-150 hover:text-ink"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to client results
          </Link>

          <p className="caption-uppercase mb-3 text-muted">{cs.industry}</p>
          <h1 className="display-lg text-ink leading-[1.1] tracking-[-0.03em]">{cs.client}</h1>
        </div>
      </section>

      <section className="bg-canvas px-6 py-14">
        <div className="mx-auto max-w-[760px] space-y-12">

          <div>
            <h2 className="caption-uppercase mb-3 text-muted">Challenge</h2>
            <PendingField value={cs.challenge} className="text-[16px] leading-[1.75] text-body" />
          </div>

          <div>
            <h2 className="caption-uppercase mb-3 text-muted">Solution</h2>
            <PendingField value={cs.solution} className="text-[16px] leading-[1.75] text-body" />
          </div>

          <div>
            <h2 className="caption-uppercase mb-4 text-muted">Results</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {cs.results.map((r, i) =>
                isPlaceholder(r.value) || isPlaceholder(r.label) ? (
                  <div
                    key={i}
                    className="rounded-[10px] border border-dashed px-5 py-4 text-[13px] italic"
                    style={{ borderColor: "var(--hairline-strong)", color: "var(--muted)" }}
                  >
                    Pending — result not yet supplied.
                  </div>
                ) : (
                  <div key={i} className="rounded-[10px] border border-hairline bg-surface px-5 py-4">
                    <p className="text-[24px] font-semibold text-ink">{r.value}</p>
                    <p className="mt-1 text-[13px] text-muted">{r.label}</p>
                  </div>
                )
              )}
            </div>
          </div>

          {cs.quote && (
            <blockquote className="rounded-[12px] border border-hairline bg-surface p-7">
              <p className="text-[18px] leading-[1.6] text-ink">&ldquo;{cs.quote.content}&rdquo;</p>
              <footer className="mt-4 text-[13px] text-muted">
                {cs.quote.name}, {cs.quote.role}
              </footer>
            </blockquote>
          )}

          <div className="card-hover rounded-[12px] border border-hairline bg-surface p-8 text-center">
            <p className="caption-uppercase mb-3 text-muted">Work with us</p>
            <h3 className="display-sm mb-2 text-ink">Want results like this?</h3>
            <Link
              href="/contact"
              className="mt-4 inline-flex items-center gap-2 rounded-[8px] bg-ink px-5 py-2.5 text-[14px] font-medium text-canvas transition-opacity duration-150 hover:opacity-80"
            >
              Start a project
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

        </div>
      </section>
    </SiteLayout>
  )
}
