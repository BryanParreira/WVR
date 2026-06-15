"use client"

import { useState } from "react"
import { Bot, Shield, Code2, TrendingUp } from "lucide-react"
import { AnimateIn, StaggerContainer, StaggerItem } from "@/components/ui/animate-in"
import { EncryptedText } from "@/components/ui/encrypted-text"
import { SpotlightCard } from "@/components/ui/spotlight-card"
import { GlowingEffect } from "@/components/ui/glowing-effect"
import {
  LiveAgentOrchestration,
  LiveScanBar,
  LiveUptimeBars,
  LiveTrafficChart,
} from "@/components/sections/live-widgets"

const D = {
  bg:      "var(--canvas)",
  surface: "var(--surface)",
  border:  "var(--hairline)",
  ink:     "var(--ink)",
  body:    "var(--body)",
  muted:   "var(--muted)",
}

type Accent = { color: string; bg: string; border: string }

const A: Record<string, Accent> = {
  ai:       { color: "#fbbf24", bg: "rgba(251,191,36,0.10)",  border: "rgba(251,191,36,0.20)"  },
  security: { color: "#818cf8", bg: "rgba(129,140,248,0.10)", border: "rgba(129,140,248,0.20)" },
  dev:      { color: "#34d399", bg: "rgba(52,211,153,0.10)",  border: "rgba(52,211,153,0.20)"  },
  geo:      { color: "#60a5fa", bg: "rgba(96,165,250,0.10)",  border: "rgba(96,165,250,0.20)"  },
}

function Tag({ icon: Icon, label, accent }: { icon: React.ElementType; label: string; accent: Accent }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div className="inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-[8px]"
        style={{ background: accent.bg, border: `1px solid ${accent.border}` }}>
        <Icon className="h-[16px] w-[16px]" style={{ color: accent.color }} strokeWidth={1.75} />
      </div>
      <span className="text-[11px] uppercase tracking-[0.12em]"
        style={{ fontFamily: "var(--font-code-stack)", color: D.muted }}>
        {label}
      </span>
    </div>
  )
}

function Ordinal({ n }: { n: string }) {
  return (
    <span
      className="absolute top-5 right-6 text-[64px] font-bold leading-none select-none pointer-events-none tabular-nums"
      style={{ color: "var(--ink-subtle)", letterSpacing: "-0.04em" }}
    >
      {n}
    </span>
  )
}

function Bullets({ items, accent }: { items: string[]; accent: Accent }) {
  return (
    <ul className="mt-4 space-y-2">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2.5 text-[13px]" style={{ color: D.muted }}>
          <span className="mt-[5px] h-1 w-1 flex-shrink-0 rounded-full"
            style={{ background: accent.color, opacity: 0.45 }} />
          {item}
        </li>
      ))}
    </ul>
  )
}

function CardInner({ children, accentColor, hovered }: {
  children: React.ReactNode
  accentColor: string
  hovered: boolean
}) {
  return (
    <SpotlightCard
      className="relative rounded-[11px] p-6 md:p-8 h-full flex flex-col overflow-hidden"
      style={{ background: D.surface, border: "none" }}
      spotlightColor="var(--ink-faint)"
      spotlightSize={480}
    >
      {/* Top accent line — hover only */}
      <div className="absolute top-0 left-0 right-0 h-[1px]"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${accentColor} 40%, ${accentColor} 60%, transparent 100%)`,
          opacity: hovered ? 0.42 : 0,
          transition: "opacity 0.3s ease",
        }} />
      {children}
    </SpotlightCard>
  )
}

function BentoCard({ children, accentColor }: {
  children: React.ReactNode
  accentColor: string
}) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      className="relative rounded-[12px] h-full"
      style={{ border: `1px solid ${D.border}` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <GlowingEffect disabled={!hovered} spread={50} glow={false} proximity={64} inactiveZone={0.01} />
      <CardInner accentColor={accentColor} hovered={hovered}>
        {children}
      </CardInner>
    </div>
  )
}

export function CapabilitiesSection() {
  return (
    <section className="relative py-16 px-6 sm:py-24 overflow-hidden" style={{ background: D.bg }}>

      {/* Atmospheric background */}
      <div aria-hidden className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(240,237,232,0.025) 0%, transparent 60%)" }} />
      <div aria-hidden className="pointer-events-none absolute -top-60 -left-60 h-[600px] w-[600px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(251,191,36,0.025) 0%, transparent 60%)" }} />
      <div aria-hidden className="pointer-events-none absolute -bottom-60 -right-60 h-[600px] w-[600px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(96,165,250,0.025) 0%, transparent 60%)" }} />

      <div className="relative mx-auto max-w-[1200px]">

        {/* Header */}
        <AnimateIn className="mb-14">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div>
              <p className="text-[11px] uppercase tracking-[0.12em] mb-4"
                style={{ fontFamily: "var(--font-code-stack)", color: D.muted }}>
                <EncryptedText text="Core Capabilities" duration={1100} />
              </p>
              <h2 className="shimmer-text text-[clamp(30px,4vw,42px)] font-[400] leading-[1.08] tracking-[-0.03em] pb-1">
                Three disciplines.
                <br />
                One team.
              </h2>
            </div>
            <p className="text-[14px] leading-[1.6] max-w-[320px]" style={{ color: D.muted }}>
              AI automation, Zero Trust security, and elite engineering — converging into
              a single focused engagement.
            </p>
          </div>
          <div className="mt-10 h-px w-full"
            style={{ background: `linear-gradient(90deg, transparent, ${D.border}, transparent)` }} />
        </AnimateIn>

        <StaggerContainer className="grid grid-cols-1 gap-3 md:grid-cols-3">

          {/* ── AI — wide (2 col) ──────────────────────────────── */}
          <StaggerItem className="md:col-span-2">
            <BentoCard accentColor={A.ai.color}>
              <div className="flex items-start justify-between">
                <Tag icon={Bot} label="AI & Agentic Automation" accent={A.ai} />
                <Ordinal n="01" />
              </div>
              <p className="text-[16px] leading-[1.6] max-w-md" style={{ color: D.body }}>
                Autonomous agents that eliminate repetitive workflows, surface insights,
                and scale your operations — without scaling headcount.
              </p>
              <Bullets accent={A.ai} items={[
                "Custom LLM pipeline development",
                "Multi-agent orchestration systems",
                "Workflow automation & API chaining",
              ]} />
              <LiveAgentOrchestration />
            </BentoCard>
          </StaggerItem>

          {/* ── Security — narrow (1 col) ──────────────────────── */}
          <StaggerItem>
            <BentoCard accentColor={A.security.color}>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <Tag icon={Shield} label="Zero Trust Security" accent={A.security} />
                  <Ordinal n="02" />
                </div>
                <p className="text-[14px] leading-[1.65]" style={{ color: D.body }}>
                  Security architected from the first line of code. Continuous monitoring,
                  red teaming, and Zero Trust by default.
                </p>
                <Bullets accent={A.security} items={[
                  "Zero Trust architecture design",
                  "Penetration testing & red teaming",
                  "Continuous vulnerability monitoring",
                ]} />
              </div>
              <LiveScanBar />
            </BentoCard>
          </StaggerItem>

          {/* ── Dev — narrow (1 col) ──────────────────────────── */}
          <StaggerItem>
            <BentoCard accentColor={A.dev.color}>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <Tag icon={Code2} label="Custom Development" accent={A.dev} />
                  <Ordinal n="03" />
                </div>
                <p className="text-[14px] leading-[1.65]" style={{ color: D.body }}>
                  Bespoke applications built to exact specs — measured in milliseconds,
                  Lighthouse scores, and uptime.
                </p>
                <Bullets accent={A.dev} items={[
                  "Full stack web & mobile apps",
                  "API design & microservices",
                  "CI/CD pipelines & DevOps",
                ]} />
              </div>
              <LiveUptimeBars />
            </BentoCard>
          </StaggerItem>

          {/* ── GEO — wide (2 col) ────────────────────────────── */}
          <StaggerItem className="md:col-span-2">
            <BentoCard accentColor={A.geo.color}>
              <div className="flex items-start justify-between">
                <Tag icon={TrendingUp} label="GEO + Digital Marketing" accent={A.geo} />
                <Ordinal n="04" />
              </div>
              <p className="text-[16px] leading-[1.6] max-w-md" style={{ color: D.body }}>
                Visible to Google and AI engines alike. GEO-optimized from day one —
                your brand surfaces wherever your customers are asking.
              </p>
              <Bullets accent={A.geo} items={[
                "Generative Engine Optimization (GEO)",
                "AI-assisted content strategy",
                "Performance analytics & attribution",
              ]} />
              <LiveTrafficChart />
            </BentoCard>
          </StaggerItem>

        </StaggerContainer>
      </div>
    </section>
  )
}
