import type { Metadata } from "next"
import Link from "next/link"
import { SiteLayout } from "@/components/layout/site-layout"
import { Shield, KeyRound, Database, AlertTriangle } from "lucide-react"
import { SECURITY_SECTIONS } from "@/lib/security-content"

export const metadata: Metadata = {
  title: "Security & Trust — WebVisionRank",
  description: "How WebVisionRank handles client credentials, data, and incident response.",
  alternates: { canonical: "https://webvisionrank.com/security" },
  openGraph: {
    title: "Security & Trust — WebVisionRank",
    description: "How WebVisionRank handles client credentials, data, and incident response.",
    url: "https://webvisionrank.com/security",
  },
}

const ICONS: Record<string, typeof Shield> = {
  "credentials":         KeyRound,
  "data-handling":       Database,
  "internal-practices":  Shield,
  "incident-response":   AlertTriangle,
}

export default function SecurityPage() {
  return (
    <SiteLayout>
      <section className="border-b border-hairline bg-canvas px-6 pb-12 pt-14 sm:pt-20">
        <div className="mx-auto max-w-[760px]">
          <p className="caption-uppercase mb-3 text-muted">Security & Trust</p>
          <h1 className="display-lg text-ink leading-[1.1] tracking-[-0.03em]">
            How we handle your access,
            <br />
            your data, and your risk.
          </h1>
          <p className="mt-4 text-[16px] leading-[1.6] text-body">
            We&apos;re a small team without formal certifications yet, so here&apos;s exactly how we
            operate instead of a badge that says trust us.
          </p>
        </div>
      </section>

      <section className="bg-canvas px-6 py-14">
        <div className="mx-auto max-w-[760px] space-y-10">
          {SECURITY_SECTIONS.map(({ id, title, body }) => {
            const Icon = ICONS[id]
            return (
              <div key={id} className="flex gap-5">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-[8px] border border-hairline bg-surface">
                  <Icon className="h-4.5 w-4.5 text-ink" />
                </div>
                <div>
                  <h2 className="mb-2 text-[17px] font-semibold text-ink">{title}</h2>
                  <p className="text-[15px] leading-[1.7] text-body">{body}</p>
                </div>
              </div>
            )
          })}

          <div className="card-hover rounded-[12px] border border-hairline bg-surface p-8 text-center">
            <p className="caption-uppercase mb-3 text-muted">Questions</p>
            <h3 className="display-sm mb-2 text-ink">Want more detail on how we operate?</h3>
            <Link
              href="/contact"
              className="mt-4 inline-flex items-center gap-2 rounded-[8px] bg-ink px-5 py-2.5 text-[14px] font-medium text-canvas transition-opacity duration-150 hover:opacity-80"
            >
              Ask us directly
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  )
}
