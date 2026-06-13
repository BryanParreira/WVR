import type { Metadata } from "next"
import { Suspense } from "react"
import { SiteLayout } from "@/components/layout/site-layout"
import { ContactForm } from "@/components/forms/contact-form"
import { AnimateIn } from "@/components/ui/animate-in"
import { ContactInfoPanel } from "@/components/sections/contact-info-panel"
import { EncryptedText } from "@/components/ui/encrypted-text"
import { ContactPageJsonLd } from "@/components/seo/json-ld"

export const metadata: Metadata = {
  title: "Contact — Start Your Project",
  description: "Start your AI, cybersecurity, or web development project with WebVisionRank. Response within 24 hours.",
  keywords: [
    "contact WebVisionRank",
    "hire AI agency",
    "start AI automation project",
    "cybersecurity consultation",
  ],
  alternates: { canonical: "https://webvisionrank.com/contact" },
  openGraph: {
    title: "Contact WebVisionRank — Start Your Project",
    description: "Start your AI, cybersecurity, or web development project. Response within 24 hours.",
    url: "https://webvisionrank.com/contact",
  },
  twitter: {
    title: "Contact WebVisionRank — Start Your Project",
    description: "Start your AI, cybersecurity, or web development project. Response within 24 hours.",
  },
}

const D = {
  bg:      "var(--canvas)",
  surface: "var(--canvas-soft)",
  border:  "var(--hairline)",
  ink:     "var(--ink)",
  body:    "var(--body)",
  muted:   "var(--muted)",
}

const TRUST = [
  { value: "24h",   label: "response time"  },
  { value: "TLS",   label: "encrypted"       },
  { value: "0",     label: "spam ever"       },
]

export default function ContactPage() {
  return (
    <SiteLayout>
      <ContactPageJsonLd />

      {/* Hero */}
      <section className="relative pt-16 pb-14 px-6 sm:pt-24 sm:pb-20 overflow-hidden"
        style={{ background: D.bg, borderBottom: `1px solid ${D.border}` }}>

        {/* Atmospheric top glow */}
        <div aria-hidden className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(240,237,232,0.025) 0%, transparent 60%)" }} />
        <div aria-hidden className="pointer-events-none absolute -top-60 -right-60 h-[500px] w-[500px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(96,165,250,0.02) 0%, transparent 60%)" }} />

        <div className="relative mx-auto max-w-[1200px]">
          <AnimateIn>
            <p className="text-[11px] uppercase tracking-[0.12em] mb-5"
              style={{ fontFamily: "var(--font-code-stack)", color: D.muted }}>
              <EncryptedText text="Get In Touch" duration={900} />
            </p>

            <h1 className="shimmer-text text-[clamp(36px,5vw,60px)] font-[400] leading-[1.06] tracking-[-0.035em] mb-6 max-w-2xl">
              Let&apos;s build
              <br />
              something great.
            </h1>

            <p className="text-[16px] leading-[1.6] max-w-md mb-10" style={{ color: D.body }}>
              Every inquiry is read personally — no bots, no auto-replies.
              Tell us about your project and we&apos;ll respond within 24 hours.
            </p>

            {/* Trust strip */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              {TRUST.map((t, i) => (
                <div key={t.label} className="flex items-center gap-3">
                  {i > 0 && <span className="h-3 w-px" style={{ background: D.border }} />}
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-[15px] font-semibold tabular-nums" style={{ color: D.ink }}>
                      {t.value}
                    </span>
                    <span className="text-[11px] uppercase tracking-[0.08em]"
                      style={{ color: D.muted, fontFamily: "var(--font-code-stack)" }}>
                      {t.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* Main content */}
      <section className="relative py-14 px-6 sm:py-20 overflow-hidden" style={{ background: D.bg }}>

        {/* Subtle dot grid */}
        <div aria-hidden className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle, var(--ink-subtle) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            opacity: 0.35,
          }} />
        <div aria-hidden className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(ellipse 90% 70% at 50% 50%, transparent 40%, rgba(14,13,11,0.9) 100%)" }} />

        <div className="relative mx-auto max-w-[1200px]">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-5 items-start">

            {/* Info panel */}
            <AnimateIn direction="right" className="lg:col-span-2">
              <ContactInfoPanel />
            </AnimateIn>

            {/* Form card */}
            <AnimateIn direction="left" delay={0.1} className="lg:col-span-3">
              <div
                className="rounded-[16px] overflow-hidden"
                style={{ background: D.surface, border: `1px solid ${D.border}` }}
              >
                {/* Card header */}
                <div className="px-7 pt-7 pb-6 sm:px-9 sm:pt-9"
                  style={{ borderBottom: `1px solid ${D.border}` }}>
                  <h2 className="text-[20px] font-semibold leading-[1.3] tracking-[-0.015em]"
                    style={{ color: D.ink }}>
                    Send a message.
                  </h2>
                  <p className="text-[14px] mt-1.5 leading-[1.5]" style={{ color: D.muted }}>
                    Describe your project and goals — we&apos;ll reach out within 24 hours.
                  </p>
                </div>

                <div className="px-7 py-7 sm:px-9 sm:py-8">
                  <Suspense fallback={
                    <div className="animate-pulse space-y-5">
                      {[80, 80, 50, 130, 110].map((h, i) => (
                        <div key={i} className="rounded-[8px]"
                          style={{ height: h, background: "var(--ink-faint)" }} />
                      ))}
                    </div>
                  }>
                    <ContactForm />
                  </Suspense>
                </div>
              </div>
            </AnimateIn>

          </div>
        </div>
      </section>

    </SiteLayout>
  )
}
