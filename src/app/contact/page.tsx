import type { Metadata } from "next"
import { SiteLayout } from "@/components/layout/site-layout"
import { ContactForm } from "@/components/forms/contact-form"
import { AnimateIn } from "@/components/ui/animate-in"
import { ContactInfoPanel } from "@/components/sections/contact-info-panel"

export const metadata: Metadata = {
  title: "Contact",
  description: "Start your project with WebVisionRank. Response within 24 hours.",
}

export default function ContactPage() {
  return (
    <SiteLayout>

      {/* Editorial hero */}
      <section className="pt-16 pb-12 px-6 sm:pt-24 sm:pb-16 bg-canvas border-b border-hairline">
        <div className="mx-auto max-w-[1200px]">
          <AnimateIn>
            <p className="caption-uppercase mb-4">Get In Touch</p>
            <h1 className="display-mega max-w-2xl">
              Let&apos;s build
              <br />
              something great.
            </h1>
            <p className="text-[16px] text-body leading-[1.6] mt-6 max-w-md">
              Tell us about your project. Every inquiry is read personally — no bots, no auto-replies.
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* Main content grid */}
      <section className="py-16 px-6 bg-canvas">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-5 items-start">

            {/* Left: always-dark info panel */}
            <AnimateIn direction="right" className="lg:col-span-2">
              <ContactInfoPanel />
            </AnimateIn>

            {/* Right: premium form card */}
            <AnimateIn direction="left" delay={0.1} className="lg:col-span-3">
              <div className="rounded-[16px] bg-surface p-6 sm:p-8 lg:p-10 shadow-card">
                <div className="mb-8 pb-8 border-b border-hairline">
                  <h2 className="text-[22px] font-semibold text-ink leading-[1.3] tracking-[-0.015em]">
                    Send a message.
                  </h2>
                  <p className="text-[14px] text-body mt-2 leading-[1.5]">
                    Describe your project and goals. We&apos;ll reach out within 24 hours.
                  </p>
                </div>
                <ContactForm />
              </div>
            </AnimateIn>

          </div>
        </div>
      </section>

    </SiteLayout>
  )
}
