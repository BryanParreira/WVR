import type { Metadata } from "next"
import { SiteLayout } from "@/components/layout/site-layout"
import { ServicesGrid } from "@/components/sections/services-grid"
import { CtaBanner } from "@/components/sections/cta-banner"
import { AnimateIn } from "@/components/ui/animate-in"
import { ServicePageJsonLd, HowToAiAutomationJsonLd, HowToGeoJsonLd, BlogFaqJsonLd } from "@/components/seo/json-ld"
import { FlipWords } from "@/components/ui/flip-words"
import { EncryptedText } from "@/components/ui/encrypted-text"
import { DirectAnswer } from "@/components/blog/direct-answer"
import { FaqBlock } from "@/components/blog/faq-block"

// Real questions prospects actually ask, answered to match what's live
// elsewhere on the site (security page, pricing page) — no new claims here.
const SERVICES_FAQS = [
  {
    q: "Will your AI automations work with the software and CRM we already use?",
    a: "Yes — automations are built to plug into what you're already using (CRMs, job management software, custom databases) through API integrations, rather than requiring you to replace your existing stack.",
  },
  {
    q: "How do you keep our company data safe when setting up custom AI agents?",
    a: "We don't take custody of your credentials or retain client data beyond what's actively needed for the work in front of us. Full detail on how we handle access, data, and incident response is at /security.",
  },
  {
    q: "What is Generative Engine Optimization (GEO), and how does it help us get clients compared to standard SEO?",
    a: "GEO optimizes content to be cited or quoted directly by AI systems like ChatGPT, Perplexity, and Google's AI Overviews — a different discipline from traditional SEO, which targets ranking position in search results. The two work together, but GEO rewards clear, directly-answering content over keyword-targeted content.",
  },
  {
    q: "How long does it take to build and deploy, and how much effort is required from my team?",
    a: "Foundation projects typically complete in 4-6 weeks, Growth engagements run 8-12 weeks, and larger Ecosystem builds are scoped individually during discovery. Most of the time investment on your end is upfront — discovery and feedback — with the build itself handled directly by us.",
  },
  {
    q: "Do you handle ongoing maintenance, tech issues, and system updates after launch?",
    a: "Yes. Support windows are built into each pricing tier, and when something needs fixing after that, it goes straight to the person who built it — not a ticket queue. We're a long-term technical partner, not a hand-off-and-disappear vendor.",
  },
]

export const metadata: Metadata = {
  title: "Services — AI Automation & Cybersecurity",
  description:
    "AI automation and proactive cybersecurity from WebVisionRank — backed by web development, custom software, marketing/GEO, and data intelligence.",
  keywords: [
    "AI automation services",
    "cybersecurity services",
    "agentic AI services",
    "LLM pipeline development",
    "Zero Trust security services",
    "generative engine optimization",
    "custom software development",
  ],
  alternates: { canonical: "https://webvisionrank.com/services" },
  openGraph: {
    title: "Services — WebVisionRank",
    description: "AI automation and cybersecurity, backed by web development, custom software, marketing, and data intelligence.",
    url: "https://webvisionrank.com/services",
  },
  twitter: {
    title: "Services — WebVisionRank",
    description: "AI automation and cybersecurity, backed by web development, custom software, marketing, and data intelligence.",
  },
}

export default function ServicesPage() {
  return (
    <SiteLayout>
      <ServicePageJsonLd />
      <HowToAiAutomationJsonLd />
      <HowToGeoJsonLd />
      <BlogFaqJsonLd items={SERVICES_FAQS} />
      <section className="pt-12 pb-4 px-6 sm:pt-20 bg-canvas">
        <div className="mx-auto max-w-[1200px]">
          <AnimateIn>
            <p className="caption-uppercase mb-3"><EncryptedText text="What We Do" duration={900} /></p>
            <h1 className="display-lg max-w-3xl">
              Services built for
              <br />
              <FlipWords
                words={["elite outcomes.", "real results.", "your business.", "the long game."]}
                duration={3000}
              />
            </h1>
            <p className="text-[16px] text-body leading-[1.5] mt-6 max-w-lg">
              We lead with AI automation and cybersecurity — and back it up with web development,
              custom software, marketing, and data intelligence when your business needs them.
            </p>
          </AnimateIn>
          <AnimateIn delay={0.1} className="mt-8 max-w-2xl">
            <DirectAnswer text="WebVisionRank is an AI and cybersecurity agency for small and mid-size businesses. We lead with two disciplines — Agentic AI automation and Zero Trust cybersecurity — and offer web development, custom software, digital marketing, and data intelligence as complementary services under one point of contact." />
          </AnimateIn>
        </div>
      </section>
      <ServicesGrid />
      <section className="px-6 py-14 bg-canvas border-t border-hairline">
        <div className="mx-auto max-w-[800px]">
          <p className="caption-uppercase mb-3 text-muted">Common Questions</p>
          <FaqBlock items={SERVICES_FAQS} />
        </div>
      </section>
      <CtaBanner />
    </SiteLayout>
  )
}
