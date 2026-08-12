import type { Metadata } from "next"
import Link from "next/link"
import { SiteLayout } from "@/components/layout/site-layout"
import { CASE_STUDIES, isPlaceholder } from "@/lib/case-studies"
import { SECURITY_SECTIONS } from "@/lib/security-content"
import { PRICING_TIERS } from "@/lib/constants"

// Internal-only — not linked from nav/footer, not meant for public discovery.
export const metadata: Metadata = {
  title: "Sales Enablement — Internal — WebVisionRank",
  robots: { index: false, follow: false },
}

const OBJECTIONS = [
  {
    q: "How many clients do you actually have?",
    a: "Four paying clients right now: Ridgeline Roofing MN, Superior Cleaning Services, Tienda Guerrero, and ABC Driving School. Say that number, don't round up. We're also behind a few of our own ventures (Grovic Data, WVRize, Valerium) but those aren't client engagements and shouldn't be pitched as ones. Being small and early is the honest position. Lean into the fact that every real client gets founder-level, hands-on attention, not an account manager relaying requests to a junior team.",
  },
  {
    q: "You're a small team. Can you actually handle this?",
    a: "Yes, and frame it as the advantage it is: no layers between the client and the person doing the work. When something breaks, it goes straight to the person who built it, not a support ticket queue. The tradeoff we're honest about is capacity: we're not the fit for an enterprise account needing a 24/7 dedicated team. For a small or mid-size business, direct access to the person doing the work is usually a better outcome than a bigger agency's account-management layer.",
  },
  {
    q: "How do I know this actually works?",
    a: "Point to the real case study, not a claim: Ridgeline Roofing MN's organic social reach went from roughly 100 to roughly 2,000 average monthly views, a 20x increase, through consistent organic content strategy. That's on webvisionrank.com/case-studies with the real numbers. Superior Cleaning Services is a shorter, more recent engagement tracking the same direction, without a hard number yet. Say that honestly if asked, don't round it up to match Ridgeline's.",
  },
  {
    q: "What if they ask about certifications or compliance?",
    a: "We don't have formal security certifications yet. Don't imply otherwise. The honest answer is the /security page: we don't take custody of client credentials, we don't retain client data beyond active work, and incident response is direct and hands-on because we're small enough that it goes straight to the person who did the work. That page is written in plain language for exactly this reason. Read it before a call if a client asks.",
  },
]

export default function ForSalesPage() {
  return (
    <SiteLayout>
      <section className="border-b border-hairline bg-canvas px-6 pb-12 pt-14 sm:pt-20">
        <div className="mx-auto max-w-[820px]">
          <p className="caption-uppercase mb-3 text-muted">Internal: Sales Enablement</p>
          <h1 className="display-lg text-ink leading-[1.1] tracking-[-0.03em]">
            Positioning, objections,
            <br />
            and the security FAQ.
          </h1>
          <p className="mt-4 text-[16px] leading-[1.6] text-body">
            Everything here matches what&apos;s live on the public site. If something here and the site
            ever disagree, the site is correct and this page is stale. Flag it.
          </p>
        </div>
      </section>

      {/* Positioning summary */}
      <section className="border-b border-hairline bg-canvas px-6 py-14">
        <div className="mx-auto max-w-[820px]">
          <h2 className="caption-uppercase mb-6 text-muted">Positioning Summary</h2>

          <div className="space-y-8">
            <div>
              <h3 className="mb-2 text-[15px] font-semibold text-ink">Who we serve</h3>
              <p className="text-[15px] leading-[1.7] text-body">
                Small and mid-size businesses across construction (Ridgeline Roofing MN),
                facilities/cleaning (Superior Cleaning Services), restaurants (Tienda Guerrero),
                and education (ABC Driving School). Some engagements are ongoing partnerships
                covering marketing, automation, and security; others are focused website builds.
                Match the pitch to which one a prospect actually needs.
              </p>
            </div>
            <div>
              <h3 className="mb-2 text-[15px] font-semibold text-ink">What problem we solve</h3>
              <p className="text-[15px] leading-[1.7] text-body">
                Small businesses usually get their tech handled piecemeal: one vendor for the
                website, another for marketing, nobody actually watching security. We lead with
                AI automation and cybersecurity, and cover web development, custom software,
                marketing, and data intelligence as backing capabilities under one point of contact.
              </p>
            </div>
            <div>
              <h3 className="mb-2 text-[15px] font-semibold text-ink">Why us</h3>
              <p className="text-[15px] leading-[1.7] text-body">
                Real, verifiable results, not agency-wide claims. Ridgeline Roofing MN went from
                ~100 to ~2,000 average monthly organic social views (20×) under our ongoing
                marketing, automation, and security work. Founder-level hands-on delivery, not
                layers of account management. Full case studies at{" "}
                <Link href="/case-studies" className="underline underline-offset-4 hover:text-ink">
                  /case-studies
                </Link>.
              </p>
            </div>
            <div>
              <h3 className="mb-2 text-[15px] font-semibold text-ink">Pricing, for reference</h3>
              <ul className="space-y-1.5 text-[15px] leading-[1.7] text-body">
                {PRICING_TIERS.map((t) => (
                  <li key={t.id}>
                    <span className="font-medium text-ink">{t.name}</span>: $
                    {typeof t.price === "number" ? t.price.toLocaleString() : t.price}. {t.description}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Objection handling */}
      <section className="border-b border-hairline bg-canvas px-6 py-14">
        <div className="mx-auto max-w-[820px]">
          <h2 className="caption-uppercase mb-6 text-muted">Objection Handling</h2>
          <div className="space-y-8">
            {OBJECTIONS.map(({ q, a }) => (
              <div key={q}>
                <h3 className="mb-2 text-[15px] font-semibold text-ink">{q}</h3>
                <p className="text-[15px] leading-[1.7] text-body">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security FAQ */}
      <section className="bg-canvas px-6 py-14">
        <div className="mx-auto max-w-[820px]">
          <h2 className="caption-uppercase mb-6 text-muted">Security FAQ</h2>
          <p className="mb-6 text-[14px] leading-[1.6] text-body">
            Pulled directly from{" "}
            <Link href="/security" className="underline underline-offset-4 hover:text-ink">
              /security
            </Link>
            . Same source, so this can&apos;t drift from what&apos;s public.
          </p>
          <div className="space-y-8">
            {SECURITY_SECTIONS.map(({ id, title, body }) => (
              <div key={id}>
                <h3 className="mb-2 text-[15px] font-semibold text-ink">{title}</h3>
                <p className="text-[15px] leading-[1.7] text-body">{body}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-[10px] border border-dashed px-5 py-4 text-[13px]"
            style={{ borderColor: "var(--hairline-strong)", color: "var(--muted)" }}>
            {CASE_STUDIES.some((c) => isPlaceholder(c.results[0]?.value ?? ""))
              ? "Note: some case study results are still pending real numbers. Check /case-studies before quoting specifics beyond what's listed above."
              : null}
          </div>
        </div>
      </section>
    </SiteLayout>
  )
}
