import type { Metadata } from "next"
import { SiteLayout } from "@/components/layout/site-layout"
import { PricingSection } from "@/components/sections/pricing-section"
import { CtaBanner } from "@/components/sections/cta-banner"
import { AnimateIn } from "@/components/ui/animate-in"
import { PricingFaqJsonLd } from "@/components/seo/json-ld"
import { FlipWords } from "@/components/ui/flip-words"
import { EncryptedText } from "@/components/ui/encrypted-text"

export const metadata: Metadata = {
  title: "Pricing — AI, Cybersecurity & Web Development Plans",
  description:
    "Transparent, project based pricing for AI automation, cybersecurity, and custom development. Foundation from $1,500. No hidden fees.",
  keywords: [
    "AI agency pricing",
    "cybersecurity pricing",
    "web development pricing",
    "AI automation cost",
    "GEO pricing",
    "WebVisionRank pricing",
  ],
  alternates: { canonical: "https://webvisionrank.com/pricing" },
  openGraph: {
    title: "Pricing — WebVisionRank",
    description: "Project based pricing for AI automation, cybersecurity, and custom development. Foundation from $1,500.",
    url: "https://webvisionrank.com/pricing",
  },
  twitter: {
    title: "Pricing — WebVisionRank",
    description: "Project based pricing for AI automation, cybersecurity, and custom development. Foundation from $1,500.",
  },
}

const faqs = [
  {
    q: "Are these one time project fees or recurring?",
    a: "Project based fees. Ongoing support and maintenance can be added as a monthly retainer — pricing depends on scope.",
  },
  {
    q: "Can I start with one service and add more later?",
    a: "Absolutely. Most clients start with a focused engagement and expand as they see results. Every project is designed to be extensible.",
  },
  {
    q: "What does the project timeline look like?",
    a: "Foundation projects complete in 4–6 weeks. Growth engagements run 8–12 weeks. Ecosystem builds are scoped individually during discovery.",
  },
  {
    q: "Do you work with startups or only established businesses?",
    a: "Both. The Foundation and Growth tiers deliver strong ROI for resource-constrained teams. The Ecosystem tier is for organizations ready to go all-in.",
  },
]

export default function PricingPage() {
  return (
    <SiteLayout>
      <PricingFaqJsonLd />
      <section className="pt-12 pb-4 px-6 sm:pt-20 bg-canvas">
        <div className="mx-auto max-w-[1200px]">
          <AnimateIn>
            <p className="caption-uppercase mb-3"><EncryptedText text="Pricing" duration={800} /></p>
            <h1 className="display-mega max-w-2xl">
              Invest in growth.
              <br />
              <FlipWords
                words={["Not guesswork.", "Not templates.", "Not mediocrity.", "Without limits."]}
                duration={3200}
              />
            </h1>
            <p className="text-[16px] text-body leading-[1.5] mt-6 max-w-lg">
              Every tier is a complete, production-ready solution. No hidden fees, no scope creep.
            </p>
          </AnimateIn>
        </div>
      </section>

      <PricingSection />

      {/* FAQ */}
      <section className="py-12 px-6 sm:py-20 border-t border-hairline bg-canvas">
        <div className="mx-auto max-w-[800px]">
          <AnimateIn className="mb-12">
            <p className="caption-uppercase mb-3"><EncryptedText text="Common Questions" duration={900} /></p>
            <h2 className="display-md">Frequently asked questions</h2>
          </AnimateIn>
          <div className="divide-y divide-hairline">
            {faqs.map((faq, i) => (
              <AnimateIn key={i} delay={i * 0.08} className="py-6">
                <h3 className="text-[16px] font-semibold text-ink mb-2">{faq.q}</h3>
                <p className="text-[15px] text-body leading-[1.55]">{faq.a}</p>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </SiteLayout>
  )
}
