"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { AnimateIn } from "@/components/ui/animate-in"
import { Button } from "@/components/ui/button"
import { FlipWords } from "@/components/ui/flip-words"
import { EncryptedText } from "@/components/ui/encrypted-text"

const METRICS = [
  { value: "40%",   label: "avg. cost reduction" },
  { value: "99.9%", label: "uptime SLA"           },
  { value: "3×",    label: "traffic growth"        },
  { value: "0",     label: "client breaches"       },
]

const STACK = ["OpenAI", "Anthropic", "AWS", "Google Cloud", "Vercel", "Cloudflare"]

export function CtaBanner() {
  return (
    <section className="relative overflow-hidden" style={{ background: "#0a0908" }}>

      {/* Metrics strip */}
      <div className="relative border-b" style={{ borderColor: "rgba(240,237,232,0.06)" }}>
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4">
            {METRICS.map((m, i) => (
              <div
                key={m.label}
                className={[
                  "py-5 flex flex-col gap-0.5",
                  i % 2 !== 0                  ? "pl-6 border-l border-[rgba(240,237,232,0.06)]" : "",
                  i >= 2                       ? "border-t border-[rgba(240,237,232,0.06)] sm:border-t-0" : "",
                  i > 0 && i % 2 === 0         ? "sm:pl-6 sm:border-l sm:border-[rgba(240,237,232,0.06)]" : "",
                ].filter(Boolean).join(" ")}
              >
                <span
                  className="text-[22px] sm:text-[26px] font-semibold tabular-nums leading-none tracking-[-0.03em]"
                  style={{ color: "#f0ede8" }}
                >
                  {m.value}
                </span>
                <span className="text-[11px] mt-1" style={{ color: "#5e5b55", fontFamily: "var(--font-mono)" }}>
                  {m.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main CTA */}
      <div className="relative py-24 px-6 sm:py-36 overflow-hidden">

        {/* ── Premium ambient background ── */}

        {/* Dot grid texture */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(240,237,232,0.1) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            opacity: 0.4,
          }}
        />

        {/* Center glow — warm amber haze from top */}
        <div aria-hidden className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2"
          style={{
            width: "700px", height: "500px",
            background: "radial-gradient(ellipse, rgba(251,191,36,0.04) 0%, transparent 65%)",
          }} />

        {/* Bottom blue atmospheric depth */}
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-[400px]"
          style={{ background: "radial-gradient(ellipse 100% 70% at 50% 100%, rgba(96,165,250,0.06) 0%, transparent 70%)" }} />

        {/* Edge vignette — keeps dot grid from looking flat */}
        <div aria-hidden className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(ellipse 110% 80% at 50% 50%, transparent 35%, rgba(10,9,8,0.85) 100%)" }} />

        {/* Top + bottom section fades */}
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[120px]"
          style={{ background: "linear-gradient(to bottom, #0a0908 0%, transparent 100%)" }} />
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-[80px]"
          style={{ background: "linear-gradient(to top, #0a0908 0%, transparent 100%)" }} />

        {/* Content — centered */}
        <div className="relative mx-auto max-w-[760px] text-center">
          <AnimateIn>
            <p
              className="text-[11px] uppercase tracking-[0.14em] mb-5"
              style={{ color: "#4a4840", fontFamily: "var(--font-code-stack)" }}
            >
              <EncryptedText text="Get Started" duration={1000} />
            </p>

            <h2
              className="font-[400] leading-[1.05] tracking-[-0.04em] mb-6"
              style={{ fontSize: "clamp(38px,5.5vw,68px)", color: "#f0ede8" }}
            >
              Ready to build something
              <br />
              <FlipWords
                words={["extraordinary?", "unstoppable?", "future-proof?", "world-class?"]}
                duration={3500}
                className="text-canvas"
              />
            </h2>

            <p
              className="text-[16px] leading-[1.65] mb-10 mx-auto max-w-[480px]"
              style={{ color: "#807d72" }}
            >
              Join the businesses that chose to stop compromising. Let&apos;s architect
              your competitive edge — in AI, security, and engineering.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
              <div
                className="beam-border rounded-[10px]"
                style={{
                  "--bm-bg":  "#1a1914",
                  "--bm-c1":  "rgba(96,165,250,0.03)",
                  "--bm-c2":  "rgba(96,165,250,0.55)",
                  "--bm-dur": "5s",
                } as React.CSSProperties}
              >
                <Button asChild variant="secondary" size="lg" className="group rounded-[9px]">
                  <Link href="/contact">
                    Start your project
                    <ArrowRight className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5" />
                  </Link>
                </Button>
              </div>
              <Link
                href="/pricing"
                className="inline-flex items-center h-11 px-5 text-[14px] font-medium transition-colors duration-150"
                style={{ color: "#5a5852" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#a09c92")}
                onMouseLeave={e => (e.currentTarget.style.color = "#5a5852")}
              >
                View pricing →
              </Link>
            </div>
          </AnimateIn>

          {/* Tech stack trust strip */}
          <div className="pt-8" style={{ borderTop: "1px solid rgba(240,237,232,0.06)" }}>
            <p
              className="text-[10px] uppercase tracking-[0.14em] mb-5"
              style={{ color: "#2e2c27", fontFamily: "var(--font-mono)" }}
            >
              Built on
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
              {STACK.map((name, i) => (
                <span key={name} className="flex items-center gap-7">
                  <span
                    className="text-[11px] font-medium uppercase tracking-[0.08em]"
                    style={{ color: "#383530", fontFamily: "var(--font-mono)" }}
                  >
                    {name}
                  </span>
                  {i < STACK.length - 1 && (
                    <span className="h-3 w-px" style={{ background: "rgba(240,237,232,0.06)" }} />
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
