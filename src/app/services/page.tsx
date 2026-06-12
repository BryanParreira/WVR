import type { Metadata } from "next"
import { SiteLayout } from "@/components/layout/site-layout"
import { ServicesGrid } from "@/components/sections/services-grid"
import { CtaBanner } from "@/components/sections/cta-banner"
import { AnimateIn } from "@/components/ui/animate-in"

export const metadata: Metadata = {
  title: "Services",
  description:
    "AI automation, proactive cybersecurity, digital marketing, custom software, and data intelligence from WebVisionRank.",
}

export default function ServicesPage() {
  return (
    <SiteLayout>
      <section className="pt-12 pb-4 px-6 sm:pt-20 bg-canvas">
        <div className="mx-auto max-w-[1200px]">
          <AnimateIn>
            <p className="caption-uppercase mb-3">What We Do</p>
            <h1 className="display-mega max-w-3xl">
              Services built for
              <br />
              elite outcomes.
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
