import type { Metadata } from "next"
import { SiteLayout } from "@/components/layout/site-layout"

export const metadata: Metadata = {
  alternates: { canonical: "https://webvisionrank.com" },
  openGraph: {
    title: "WebVisionRank — AI Powered. Security First. Elite Engineering.",
    description:
      "We lead with Agentic AI automation and Zero Trust cybersecurity — backed by web development, custom software, marketing, and data intelligence.",
    url: "https://webvisionrank.com",
  },
  twitter: {
    title: "WebVisionRank — AI Powered. Security First. Elite Engineering.",
    description:
      "We lead with Agentic AI automation and Zero Trust cybersecurity — backed by web development, custom software, marketing, and data intelligence.",
  },
}
import { Hero } from "@/components/sections/hero"
import { TrustedBy } from "@/components/sections/trusted-by"
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
      <CapabilitiesSection />
      <ServicesGrid limit={6} />
      <ProcessSection />
      <Testimonials />
      <PricingSection />
      <CtaBanner />
    </SiteLayout>
  )
}
