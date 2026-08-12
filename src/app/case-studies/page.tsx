import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { SiteLayout } from "@/components/layout/site-layout"
import { CASE_STUDIES } from "@/lib/case-studies"

export const metadata: Metadata = {
  title: "Client Results — WebVisionRank",
  description: "Real engagements, real outcomes, from WebVisionRank's client work.",
  alternates: { canonical: "https://webvisionrank.com/case-studies" },
  openGraph: {
    title: "Client Results — WebVisionRank",
    description: "Real engagements, real outcomes, from WebVisionRank's client work.",
    url: "https://webvisionrank.com/case-studies",
  },
}

export default function CaseStudiesPage() {
  return (
    <SiteLayout>
      <section className="border-b border-hairline bg-canvas px-6 pb-12 pt-14 sm:pt-20">
        <div className="mx-auto max-w-[1200px]">
          <p className="caption-uppercase mb-3 text-muted">Client Results</p>
          <h1 className="display-lg max-w-xl text-ink">
            Real engagements.
            <br />
            Real outcomes.
          </h1>
          <p className="mt-4 max-w-lg text-[16px] leading-[1.5] text-body">
            Every result here is tied to a named, verifiable client engagement, not an agency-wide claim.
          </p>
        </div>
      </section>

      <section className="bg-canvas px-6 py-14">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {CASE_STUDIES.map((cs) => (
              <Link
                key={cs.slug}
                href={`/case-studies/${cs.slug}`}
                className="card-hover group flex flex-col gap-4 rounded-[12px] border border-hairline bg-surface p-7"
              >
                <div>
                  <p className="caption-uppercase text-muted">{cs.industry}</p>
                  <h2 className="mt-2 text-[20px] font-semibold leading-[1.25] text-ink">
                    {cs.client}
                  </h2>
                </div>
                <span className="mt-auto inline-flex items-center gap-1.5 text-[13px] font-medium text-ink opacity-0 transition-opacity duration-150 group-hover:opacity-100">
                  Read case study
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  )
}
