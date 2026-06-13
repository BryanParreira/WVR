import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Shield, Bot, Code2, TrendingUp } from "lucide-react"
import { SiteLayout } from "@/components/layout/site-layout"
import { AboutPageJsonLd } from "@/components/seo/json-ld"
import { AnimateIn, StaggerContainer, StaggerItem } from "@/components/ui/animate-in"
import { Button } from "@/components/ui/button"
import { CtaBanner } from "@/components/sections/cta-banner"
import { FlipWords } from "@/components/ui/flip-words"
import { EncryptedText } from "@/components/ui/encrypted-text"
import { Terminal } from "@/components/ui/terminal"
import { GlowingEffect } from "@/components/ui/glowing-effect"
import { TextGenerateScroll } from "@/components/ui/text-generate-scroll"

export const metadata: Metadata = {
  title: "About — Hybrid AI Tech Agency",
  description:
    "WebVisionRank is a hybrid AI tech agency at the intersection of Agentic AI automation, Zero Trust cybersecurity, and elite custom software development.",
  keywords: [
    "AI tech agency",
    "hybrid AI agency",
    "agentic AI company",
    "cybersecurity agency",
    "WebVisionRank about",
  ],
  alternates: { canonical: "https://webvisionrank.com/about" },
  openGraph: {
    title: "About WebVisionRank — Hybrid AI Tech Agency",
    description: "At the intersection of Agentic AI, Zero Trust security, and elite engineering. We build what others won't.",
    url: "https://webvisionrank.com/about",
  },
  twitter: {
    title: "About WebVisionRank — Hybrid AI Tech Agency",
    description: "At the intersection of Agentic AI, Zero Trust security, and elite engineering. We build what others won't.",
  },
}

const values = [
  {
    icon: Bot,
    title: "AI First Thinking",
    description:
      "We evaluate every engagement through an AI lens — where can automation replace effort, where can intelligence surface insight, where can agents operate autonomously.",
  },
  {
    icon: Shield,
    title: "Security by Design",
    description:
      "Zero Trust principles are architected in from the first line of code — never bolted on at the end.",
  },
  {
    icon: Code2,
    title: "Engineering Excellence",
    description:
      "We measure quality in milliseconds, Lighthouse scores, and uptime. Good enough is not our standard.",
  },
  {
    icon: TrendingUp,
    title: "Outcomes Over Outputs",
    description:
      "Deliverables are a means to an end. What we're building is measurable business growth.",
  },
]

const differentiators = [
  "Deep expertise across AI, security, and dev — not siloed specialists",
  "Proactive security audits included in every engagement",
  "Open source, auditable infrastructure — no black boxes",
  "GEO optimized from day one — visible to both Google and LLMs",
  "Direct communication, not ticket queues",
  "Post-launch support included in every tier",
]

export default function AboutPage() {
  return (
    <SiteLayout>
      <AboutPageJsonLd />
      {/* Hero */}
      <section className="pt-12 pb-12 px-6 sm:pt-20 sm:pb-16 bg-canvas">
        <div className="mx-auto max-w-[1200px]">
          <AnimateIn>
            <p className="caption-uppercase mb-3"><EncryptedText text="Our Mission" duration={900} /></p>
            <h1 className="display-mega max-w-3xl">
              We build what
              <br />
              <FlipWords
                words={["others won't.", "no one else can.", "matters most.", "lasts forever."]}
                duration={3000}
              />
            </h1>
            <p className="text-[16px] text-body leading-[1.5] mt-6 max-w-xl">
              WebVisionRank was founded on a simple premise: most agencies are either too broad
              to be excellent or too narrow to be strategic. We&apos;re the exception — a hybrid team
              at the intersection of AI automation, cybersecurity, and elite software engineering.
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* Mission quote */}
      <section className="py-10 px-6 sm:py-14 border-t border-b border-hairline bg-canvas">
        <div className="mx-auto max-w-[1200px]">
          <TextGenerateScroll
            words="We don't just build websites or run campaigns. We architect digital ecosystems that generate revenue, repel threats, and evolve with your business."
            duration={0.35}
            filter={true}
          />
          <p className="text-[13px] text-muted mt-2">— WebVisionRank Founding Principle</p>
        </div>
      </section>

      {/* Terminal demo */}
      <section className="py-12 px-6 sm:py-16 border-t border-hairline bg-canvas">
        <div className="mx-auto max-w-[1200px]">
          <AnimateIn className="mb-10">
            <p className="caption-uppercase mb-3"><EncryptedText text="In Practice" duration={900} /></p>
            <h2 className="display-md max-w-xl">How a WVR engagement looks.</h2>
          </AnimateIn>
          <AnimateIn delay={0.1}>
            <Terminal
              username="wvr-cli"
              commands={[
                "wvr audit --scope full --zero-trust",
                "wvr agent deploy --name email-pipeline",
                "wvr geo optimize --engines gpt,claude,gemini",
                "wvr launch --staged --monitor",
              ]}
              outputs={{
                0: [
                  "✔ Preflight checks complete.",
                  "✔ Zero Trust policies applied.",
                  "✔ 0 vulnerabilities in production.",
                ],
                1: [
                  "✔ Agent deployed successfully.",
                  "↓ 40% task reduction projected.",
                  "→ Running 24/7 autonomously.",
                ],
                2: [
                  "✔ GEO score: 94 / 100",
                  "↑ +3× AI engine visibility estimated.",
                ],
                3: [
                  "✔ Staged rollout active.",
                  "✔ All systems nominal.",
                  "✔ Uptime SLA: 99.9%",
                ],
              }}
              typingSpeed={42}
              delayBetweenCommands={900}
            />
          </AnimateIn>
        </div>
      </section>

      {/* Values */}
      <section className="py-12 px-6 sm:py-20 bg-canvas">
        <div className="mx-auto max-w-[1200px]">
          <AnimateIn className="mb-12">
            <p className="caption-uppercase mb-3"><EncryptedText text="What Drives Us" duration={900} /></p>
            <h2 className="display-md">Core values.</h2>
          </AnimateIn>
          <StaggerContainer className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => {
              const Icon = value.icon
              return (
                <StaggerItem key={value.title}>
                  <div className="relative rounded-[12px] border border-hairline h-full">
                    <GlowingEffect disabled={false} spread={40} glow={false} proximity={64} inactiveZone={0.01} />
                    <div className="rounded-[12px] bg-surface p-6 h-full shadow-card">
                      <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-[8px] bg-canvas-soft border border-hairline text-body">
                        <Icon strokeWidth={1.75} style={{ width: 18, height: 18 }} />
                      </div>
                      <h3 className="text-[16px] font-semibold text-ink mb-2">{value.title}</h3>
                      <p className="text-[14px] text-body leading-[1.55]">{value.description}</p>
                    </div>
                  </div>
                </StaggerItem>
              )
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* Why WVR */}
      <section className="py-12 px-6 sm:py-20 border-t border-hairline bg-canvas">
        <div className="mx-auto max-w-[1200px] grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16 items-start">
          <AnimateIn direction="right">
            <p className="caption-uppercase mb-3"><EncryptedText text="Why WebVisionRank" duration={1000} /></p>
            <h2 className="display-md mb-6">The agency that does all three.</h2>
            <p className="text-[15px] text-body leading-[1.55] mb-8">
              Most businesses need AI, security, and great development — but rarely find an agency
              that&apos;s genuinely excellent at all three. We built WebVisionRank specifically to close that gap.
            </p>
            <Button asChild variant="ink" className="group">
              <Link href="/contact">
                Work with us
                <ArrowRight className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5" />
              </Link>
            </Button>
          </AnimateIn>

          <AnimateIn direction="left" delay={0.1}>
            <ul className="space-y-3.5 pt-2">
              {differentiators.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-[15px] text-body">
                  <span className="mt-[9px] h-1 w-1 flex-shrink-0 rounded-full bg-ink" />
                  {item}
                </li>
              ))}
            </ul>
          </AnimateIn>
        </div>
      </section>

      <CtaBanner />
    </SiteLayout>
  )
}
