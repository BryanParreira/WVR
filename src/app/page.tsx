import type { Metadata } from "next"
import { SiteLayout } from "@/components/layout/site-layout"

export const metadata: Metadata = {
  alternates: { canonical: "https://webvisionrank.com" },
  openGraph: {
    title: "WebVisionRank — AI Powered. Security First. Elite Engineering.",
    description:
      "Hybrid AI tech agency bridging Agentic AI automation, proactive cybersecurity, and elite custom development. GEO optimized from day one.",
    url: "https://webvisionrank.com",
  },
  twitter: {
    title: "WebVisionRank — AI Powered. Security First. Elite Engineering.",
    description:
      "Hybrid AI tech agency bridging Agentic AI automation, proactive cybersecurity, and elite custom development. GEO optimized from day one.",
  },
}
import { Hero } from "@/components/sections/hero"
import { TrustedBy } from "@/components/sections/trusted-by"
import { ResultsBoard } from "@/components/sections/results-board"
import { CapabilitiesSection } from "@/components/sections/capabilities-section"
import { ServicesGrid } from "@/components/sections/services-grid"
import { ProcessSection } from "@/components/sections/process-section"
import { PricingSection } from "@/components/sections/pricing-section"
import { Testimonials } from "@/components/sections/testimonials"
import { CtaBanner } from "@/components/sections/cta-banner"

export default function HomePage() {
  return (
    <SiteLayout>
      <Hero />
      <TrustedBy />
      <ResultsBoard />
      <CapabilitiesSection />
      <ServicesGrid limit={6} />
      <ProcessSection />
      <Testimonials />
      <PricingSection />
      <CtaBanner />
    </SiteLayout>
  )
}
