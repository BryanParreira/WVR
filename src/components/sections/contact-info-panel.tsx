"use client"

import { useState } from "react"
import Link from "next/link"
import { Bot, Shield, Code2, TrendingUp, Mail, Clock, Lock } from "lucide-react"
import { GlowingEffect } from "@/components/ui/glowing-effect"
import { SpotlightCard } from "@/components/ui/spotlight-card"
import { SITE_CONFIG } from "@/lib/constants"

const D = {
  bg:      "var(--surface)",
  surface: "var(--canvas-soft)",
  border:  "var(--hairline)",
  ink:     "var(--ink)",
  body:    "var(--body)",
  muted:   "var(--muted)",
  dim:     "var(--muted-soft)",
}

const CONTACT_ITEMS = [
  {
    icon: Mail,
    label: "Email",
    value: SITE_CONFIG.email,
    href:  `mailto:${SITE_CONFIG.email}`,
    isLink: true,
  },
  {
    icon: Clock,
    label: "Response",
    value: "Within 24 hours",
    href:  null,
    isLink: false,
  },
  {
    icon: Lock,
    label: "Privacy",
    value: "All messages encrypted in transit",
    href:  null,
    isLink: false,
  },
]

const SERVICES = [
  { icon: Bot,         label: "AI & Agentic Automation",   desc: "LLM pipelines · multi-agent systems" },
  { icon: Shield,      label: "Zero Trust Security",        desc: "Architecture · red teaming"          },
  { icon: Code2,       label: "Custom Development",         desc: "Full stack · APIs · DevOps"          },
  { icon: TrendingUp,  label: "GEO + Digital Marketing",    desc: "SEO · Generative Engine Optimization" },
]

export function ContactInfoPanel() {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="relative rounded-[16px] h-full"
      style={{ border: `1px solid ${D.border}` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <GlowingEffect disabled={!hovered} spread={55} glow={false} proximity={72} inactiveZone={0.01} />

      <SpotlightCard
        className="relative rounded-[15px] overflow-hidden h-full"
        style={{ background: D.bg }}
        spotlightColor="var(--ink-faint)"
        spotlightSize={500}
      >
        {/* Top accent line — hover only */}
        <div className="absolute top-0 left-0 right-0 h-[1px]"
          style={{
            background: "linear-gradient(90deg, transparent 0%, rgba(240,237,232,0.35) 50%, transparent 100%)",
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.3s ease",
          }} />

        {/* Contact rows */}
        <div className="p-6 sm:p-7 space-y-5" style={{ borderBottom: `1px solid ${D.border}` }}>
          {CONTACT_ITEMS.map(({ icon: Icon, label, value, href, isLink }) => (
            <div key={label} className="flex items-start gap-3.5">
              <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-[7px]"
                style={{ background: "var(--ink-faint)", border: `1px solid ${D.border}` }}>
                <Icon className="h-[14px] w-[14px]" style={{ color: D.muted }} strokeWidth={1.75} />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.1em] mb-1"
                  style={{ color: D.dim, fontFamily: "var(--font-code-stack)" }}>
                  {label}
                </p>
                {isLink && href ? (
                  <a
                    href={href}
                    className="text-[14px] transition-colors duration-150 block"
                    style={{ color: D.body }}
                    onMouseEnter={e => (e.currentTarget.style.color = D.ink)}
                    onMouseLeave={e => (e.currentTarget.style.color = D.body)}
                  >
                    {value}
                  </a>
                ) : (
                  <p className="text-[14px] leading-[1.5]" style={{ color: D.body }}>{value}</p>
                )}
              </div>
            </div>
          ))}
          <div className="pt-1">
            <Link
              href="/privacy"
              className="text-[12px] transition-colors duration-150"
              style={{ color: D.dim }}
              onMouseEnter={e => (e.currentTarget.style.color = D.muted)}
              onMouseLeave={e => (e.currentTarget.style.color = D.dim)}
            >
              Privacy policy →
            </Link>
          </div>
        </div>

        {/* Services */}
        <div className="p-6 sm:p-7">
          <p className="text-[10px] uppercase tracking-[0.12em] mb-5"
            style={{ color: D.dim, fontFamily: "var(--font-code-stack)" }}>
            What we build
          </p>
          <div className="space-y-4">
            {SERVICES.map(({ icon: Icon, label, desc }, i) => (
              <div key={label} className="flex items-start gap-3">
                <span className="mt-[3px] text-[10px] tabular-nums font-medium"
                  style={{ color: D.dim, fontFamily: "var(--font-code-stack)", minWidth: 16 }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex items-start gap-2.5 min-w-0">
                  <Icon className="mt-[3px] h-[13px] w-[13px] flex-shrink-0" style={{ color: D.muted }} strokeWidth={1.75} />
                  <div className="min-w-0">
                    <p className="text-[13px] font-medium leading-[1.3]" style={{ color: D.body }}>{label}</p>
                    <p className="text-[11px] mt-0.5 leading-[1.4]" style={{ color: D.dim }}>{desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </SpotlightCard>
    </div>
  )
}
