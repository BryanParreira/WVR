"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, Bot, Shield, TrendingUp, Code2, Zap, BarChart3 } from "lucide-react"
import { StaggerContainer, StaggerItem, AnimateIn } from "@/components/ui/animate-in"
import { GlowingEffect } from "@/components/ui/glowing-effect"
import { FlipWords } from "@/components/ui/flip-words"
import { EncryptedText } from "@/components/ui/encrypted-text"
import { SERVICES } from "@/lib/constants"

const iconMap: Record<string, React.ElementType> = {
  Bot, Shield, TrendingUp, Code2, Zap, BarChart3,
}

type Accent = { color: string; bg: string; border: string }

const SERVICE_ACCENTS: Record<string, Accent> = {
  "ai-automation":     { color: "#d97706", bg: "rgba(217,119,6,0.08)",   border: "rgba(217,119,6,0.18)"   },
  "cybersecurity":     { color: "#6366f1", bg: "rgba(99,102,241,0.08)",  border: "rgba(99,102,241,0.18)"  },
  "digital-marketing": { color: "#2563eb", bg: "rgba(37,99,235,0.08)",   border: "rgba(37,99,235,0.18)"   },
  "custom-software":   { color: "#059669", bg: "rgba(5,150,105,0.08)",   border: "rgba(5,150,105,0.18)"   },
  "web-development":   { color: "#ea580c", bg: "rgba(234,88,12,0.08)",   border: "rgba(234,88,12,0.18)"   },
  "data-intelligence": { color: "#7c3aed", bg: "rgba(124,58,237,0.08)",  border: "rgba(124,58,237,0.18)"  },
}

const FALLBACK_ACCENT: Accent = { color: "#6b7280", bg: "rgba(107,114,128,0.08)", border: "rgba(107,114,128,0.18)" }

const FLIP_WORDS = ["AI-automated.", "security-first.", "GEO-optimized.", "built for you."]

type Service = (typeof SERVICES)[0]

function ServiceCard({ service, size = "secondary" }: { service: Service; size?: "lead" | "secondary" }) {
  const [hovered, setHovered] = useState(false)
  const Icon   = iconMap[service.icon] ?? Zap
  const accent = SERVICE_ACCENTS[service.id] ?? FALLBACK_ACCENT
  const isLead = size === "lead"

  return (
    <div className="relative rounded-[12px] border border-hairline h-full">
      <GlowingEffect disabled={!hovered} spread={40} glow={false} proximity={64} inactiveZone={0.01} />
      <Link
        href={service.href}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`group relative flex flex-col rounded-[12px] bg-surface shadow-card h-full overflow-hidden ${isLead ? "p-8" : "p-6"}`}
      >
        {/* Top accent line — hover only */}
        <div
          className="absolute top-0 inset-x-0 h-[1px] rounded-t-[12px]"
          style={{
            background: `linear-gradient(90deg, transparent, ${accent.color}, transparent)`,
            opacity: hovered ? 0.45 : 0,
            transition: "opacity 0.3s ease",
          }}
        />

        {/* Icon — neutral default, accent on hover */}
        <div className={isLead ? "mb-6" : "mb-5"}>
          <div
            className={`flex items-center justify-center rounded-[10px] ${isLead ? "h-12 w-12" : "h-9 w-9"}`}
            style={{
              background:   hovered ? accent.bg     : "rgba(38,37,30,0.05)",
              border:       `1px solid ${hovered ? accent.border : "rgba(38,37,30,0.09)"}`,
              transition:   "background 0.25s ease, border-color 0.25s ease",
            }}
          >
            <Icon
              className={isLead ? "h-6 w-6" : "h-[17px] w-[17px]"}
              strokeWidth={1.75}
              style={{
                color:      hovered ? accent.color : "#807d72",
                transition: "color 0.25s ease",
              }}
            />
          </div>
        </div>

        {/* Title */}
        <h3 className={`font-semibold leading-[1.3] text-ink mb-2 ${isLead ? "text-[22px]" : "text-[17px]"}`}>
          {service.title}
        </h3>

        {/* Description */}
        <p className={`text-body leading-[1.55] mb-5 flex-1 ${isLead ? "text-[15px]" : "text-[14px]"}`}>
          {service.description}
        </p>

        {/* Features */}
        <ul className="space-y-2 mb-6">
          {service.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2.5 text-[13px] text-muted">
              <span
                className="mt-[5px] h-1 w-1 flex-shrink-0 rounded-full"
                style={{
                  background:  hovered ? accent.color : "#a09c92",
                  opacity:     hovered ? 0.55 : 0.35,
                  transition:  "background 0.25s ease, opacity 0.25s ease",
                }}
              />
              {feature}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div
          className="flex items-center gap-1.5 pt-4 text-[13px] font-medium text-muted group-hover:text-ink transition-colors duration-150"
          style={{ borderTop: "1px solid var(--hairline)" }}
        >
          Learn more
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
        </div>
      </Link>

      {service.id === "cybersecurity" && (
        <Link
          href="/security"
          className="relative mt-2 block px-6 pb-2 text-[12px] text-muted underline underline-offset-4 hover:text-ink transition-colors duration-150"
        >
          How we handle security & trust →
        </Link>
      )}
    </div>
  )
}

export function ServicesGrid({ limit }: { limit?: number }) {
  const services  = limit ? SERVICES.slice(0, limit) : SERVICES
  const lead      = services.filter((s) => s.tier === "lead")
  const secondary = services.filter((s) => s.tier !== "lead")

  return (
    <section id="services" className="py-12 px-6 sm:py-20 bg-canvas">
      <div className="mx-auto max-w-[1200px]">

        <AnimateIn className="mb-14">
          <p className="caption-uppercase mb-3"><EncryptedText text="What We Do" duration={900} /></p>
          <h2 className="display-lg max-w-2xl">
            Two disciplines we lead with —
            <br />
            <FlipWords words={FLIP_WORDS} duration={2800} className="text-body" />
          </h2>
        </AnimateIn>

        {/* Lead pillars — AI automation & cybersecurity */}
        {lead.length > 0 && (
          <StaggerContainer className="grid grid-cols-1 gap-5 sm:grid-cols-2 mb-10">
            {lead.map((service) => (
              <StaggerItem key={service.id}>
                <ServiceCard service={service} size="lead" />
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}

        {/* Secondary — additional capabilities */}
        {secondary.length > 0 && (
          <>
            <div className="mb-6 flex items-center gap-4">
              <p className="caption-uppercase text-muted">Additional capabilities</p>
              <div className="h-px flex-1 bg-hairline" />
            </div>
            <StaggerContainer className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {secondary.map((service) => (
                <StaggerItem key={service.id}>
                  <ServiceCard service={service} size="secondary" />
                </StaggerItem>
              ))}
            </StaggerContainer>
          </>
        )}

        {limit && (
          <AnimateIn className="mt-10" delay={0.1}>
            <Link
              href="/services"
              className="inline-flex items-center gap-1.5 text-[14px] font-medium text-ink hover:text-body transition-colors duration-150"
            >
              View all services
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </AnimateIn>
        )}
      </div>
    </section>
  )
}
