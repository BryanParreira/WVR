"use client"

import { Bot, Shield, Code2, TrendingUp } from "lucide-react"
import { AnimateIn, StaggerContainer, StaggerItem } from "@/components/ui/animate-in"

// Hardcoded dark palette — this section is always dark regardless of site theme
const D = {
  bg:      "#141210",
  surface: "#1c1a17",
  border:  "#2a2825",
  ink:     "#f0ede8",
  body:    "#a09c92",
  muted:   "#6b6760",
}

function Tag({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
  return (
    <div className="flex items-center gap-2.5 mb-6">
      <div
        className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-[6px]"
        style={{ background: D.bg, border: `1px solid ${D.border}` }}
      >
        <Icon className="h-[15px] w-[15px]" style={{ color: D.body }} strokeWidth={1.75} />
      </div>
      <span
        className="text-[11px] uppercase tracking-[0.12em]"
        style={{ fontFamily: "var(--font-code-stack)", color: D.muted }}
      >
        {label}
      </span>
    </div>
  )
}

function Stat({ value, label, inline }: { value: string; label: string; inline?: boolean }) {
  return (
    <div
      className="pt-6"
      style={{ borderTop: `1px solid ${D.border}` }}
    >
      {inline ? (
        <div className="flex items-baseline gap-3">
          <span
            className="text-[42px] font-semibold leading-none tabular-nums"
            style={{ color: D.ink, letterSpacing: "-0.03em" }}
          >
            {value}
          </span>
          <span className="text-[13px]" style={{ color: D.muted }}>{label}</span>
        </div>
      ) : (
        <>
          <div
            className="text-[42px] font-semibold leading-none tabular-nums"
            style={{ color: D.ink, letterSpacing: "-0.03em" }}
          >
            {value}
          </div>
          <div className="text-[13px] mt-1" style={{ color: D.muted }}>{label}</div>
        </>
      )}
    </div>
  )
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="mt-5 space-y-2">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2.5 text-[13px]" style={{ color: D.muted }}>
          <span
            className="mt-[5px] h-1 w-1 flex-shrink-0 rounded-full"
            style={{ background: D.muted }}
          />
          {item}
        </li>
      ))}
    </ul>
  )
}

function Card({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={`rounded-[12px] p-5 md:p-8 h-full flex flex-col justify-between ${className}`}
      style={{ background: D.surface, border: `1px solid ${D.border}` }}
    >
      {children}
    </div>
  )
}

export function CapabilitiesSection() {
  return (
    <section className="relative py-12 px-6 sm:py-20 overflow-hidden" style={{ background: D.bg }}>
      {/* Ambient cyan pool at center */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(240,237,232,0.03) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-[1200px]">
        <AnimateIn className="mb-14">
          <p
            className="text-[11px] uppercase tracking-[0.12em] mb-3"
            style={{ fontFamily: "var(--font-code-stack)", color: D.muted }}
          >
            Core Capabilities
          </p>
          <h2
            className="text-[clamp(28px,3.5vw,36px)] font-[400] leading-[1.10] tracking-[-0.025em]"
            style={{ color: D.ink }}
          >
            Three disciplines.
            <br />
            One team.
          </h2>
        </AnimateIn>

        {/* Bento grid — row 1: wide + narrow, row 2: narrow + wide */}
        <StaggerContainer className="grid grid-cols-1 gap-3 md:grid-cols-3">

          {/* AI — wide (2 cols) */}
          <StaggerItem className="md:col-span-2">
            <Card>
              <div>
                <Tag icon={Bot} label="AI & Agentic Automation" />
                <p className="text-[17px] leading-[1.55]" style={{ color: D.body }}>
                  Autonomous agents that eliminate repetitive workflows, surface insights,
                  and scale operations — without scaling headcount.
                </p>
                <Bullets
                  items={[
                    "Custom LLM pipeline development",
                    "Multi-agent orchestration systems",
                    "Workflow automation & API chaining",
                  ]}
                />
              </div>
              <div className="mt-8">
                <Stat value="40%" label="avg. cost reduction" inline />
              </div>
            </Card>
          </StaggerItem>

          {/* Security — narrow (1 col) */}
          <StaggerItem>
            <Card>
              <div>
                <Tag icon={Shield} label="Zero-Trust Security" />
                <p className="text-[15px] leading-[1.6]" style={{ color: D.body }}>
                  Security architected from the first line of code. Continuous monitoring,
                  red teaming, and Zero-Trust by default — never bolted on.
                </p>
              </div>
              <div className="mt-8">
                <Stat value="0" label="client breaches" />
              </div>
            </Card>
          </StaggerItem>

          {/* Dev — narrow (1 col) */}
          <StaggerItem>
            <Card>
              <div>
                <Tag icon={Code2} label="Custom Development" />
                <p className="text-[15px] leading-[1.6]" style={{ color: D.body }}>
                  Bespoke applications built to exact specs — measured in milliseconds,
                  Lighthouse scores, and uptime.
                </p>
              </div>
              <div className="mt-8">
                <Stat value="99.9%" label="uptime SLA" />
              </div>
            </Card>
          </StaggerItem>

          {/* GEO — wide (2 cols) */}
          <StaggerItem className="md:col-span-2">
            <Card>
              <div>
                <Tag icon={TrendingUp} label="GEO + Digital Marketing" />
                <p className="text-[17px] leading-[1.55]" style={{ color: D.body }}>
                  Visible to Google and AI engines alike. GEO-optimized from day one —
                  your brand surfaces wherever your customers are asking questions.
                </p>
                <Bullets
                  items={[
                    "Generative Engine Optimization (GEO)",
                    "AI-assisted content strategy",
                    "Performance analytics & attribution",
                  ]}
                />
              </div>
              <div className="mt-8">
                <Stat value="3×" label="avg. traffic growth" inline />
              </div>
            </Card>
          </StaggerItem>

        </StaggerContainer>
      </div>
    </section>
  )
}
