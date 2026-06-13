import type { Metadata } from "next"
import { SiteLayout } from "@/components/layout/site-layout"
import { ServicesGrid } from "@/components/sections/services-grid"
import { CtaBanner } from "@/components/sections/cta-banner"
import { AnimateIn } from "@/components/ui/animate-in"
import { ServicePageJsonLd, HowToAiAutomationJsonLd, HowToGeoJsonLd } from "@/components/seo/json-ld"
import { FlipWords } from "@/components/ui/flip-words"
import { EncryptedText } from "@/components/ui/encrypted-text"

export const metadata: Metadata = {
  title: "Services — AI Automation, Cybersecurity & GEO",
  description:
    "AI automation, proactive cybersecurity, generative engine optimization (GEO), custom software, and data intelligence services from WebVisionRank.",
  keywords: [
    "AI automation services",
    "cybersecurity services",
    "generative engine optimization",
    "GEO services",
    "custom software development",
    "agentic AI services",
    "LLM pipeline development",
    "Zero Trust security services",
  ],
  alternates: { canonical: "https://webvisionrank.com/services" },
  openGraph: {
    title: "Services — WebVisionRank",
    description: "AI automation, cybersecurity, GEO, custom software, and data intelligence. One agency, all three disciplines.",
    url: "https://webvisionrank.com/services",
  },
  twitter: {
    title: "Services — WebVisionRank",
    description: "AI automation, cybersecurity, GEO, custom software, and data intelligence. One agency, all three disciplines.",
  },
}

export default function ServicesPage() {
  return (
    <SiteLayout>
      <ServicePageJsonLd />
      <HowToAiAutomationJsonLd />
      <HowToGeoJsonLd />
      <section className="pt-12 pb-4 px-6 sm:pt-20 bg-canvas">
        <div className="mx-auto max-w-[1200px]">
          <AnimateIn>
            <p className="caption-uppercase mb-3"><EncryptedText text="What We Do" duration={900} /></p>
            <h1 className="display-mega max-w-3xl">
              Services built for
              <br />
              <FlipWords
                words={["elite outcomes.", "real results.", "your business.", "the long game."]}
                duration={3000}
              />
            </h1>
            <p className="text-[16px] text-body leading-[1.5] mt-6 max-w-lg">
              Six interconnected capabilities. One agency. Built to make your competitors wonder what happened.
            </p>
          </AnimateIn>
        </div>
      </section>
      <ServicesGrid />
      <CtaBanner />
    </SiteLayout>
  )
}
