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

function ServiceCard({ service }: { service: Service }) {
  const [hovered, setHovered] = useState(false)
  const Icon   = iconMap[service.icon] ?? Zap
  const accent = SERVICE_ACCENTS[service.id] ?? FALLBACK_ACCENT

  return (
    <div className="relative rounded-[12px] border border-hairline h-full">
      <GlowingEffect disabled={!hovered} spread={40} glow={false} proximity={64} inactiveZone={0.01} />
      <Link
        href={service.href}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="group relative flex flex-col rounded-[12px] bg-surface p-6 shadow-card h-full overflow-hidden"
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
        <div className="mb-5">
          <div
            className="flex h-9 w-9 items-center justify-center rounded-[8px]"
            style={{
              background:   hovered ? accent.bg     : "rgba(38,37,30,0.05)",
              border:       `1px solid ${hovered ? accent.border : "rgba(38,37,30,0.09)"}`,
              transition:   "background 0.25s ease, border-color 0.25s ease",
            }}
          >
            <Icon
              className="h-[17px] w-[17px]"
              strokeWidth={1.75}
              style={{
                color:      hovered ? accent.color : "#807d72",
                transition: "color 0.25s ease",
              }}
            />
          </div>
        </div>

        {/* Title */}
        <h3 className="text-[17px] font-semibold leading-[1.35] text-ink mb-2">
          {service.title}
        </h3>

        {/* Description */}
        <p className="text-[14px] text-body leading-[1.55] mb-5 flex-1">
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
    </div>
  )
}

export function ServicesGrid({ limit }: { limit?: number }) {
  const services = limit ? SERVICES.slice(0, limit) : SERVICES

  return (
    <section id="services" className="py-12 px-6 sm:py-20 bg-canvas">
      <div className="mx-auto max-w-[1200px]">

        <AnimateIn className="mb-14">
          <p className="caption-uppercase mb-3"><EncryptedText text="What We Do" duration={900} /></p>
          <h2 className="display-lg max-w-2xl">
            Everything your business needs —
            <br />
            <FlipWords words={FLIP_WORDS} duration={2800} className="text-body" />
          </h2>
        </AnimateIn>

        <StaggerContainer className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <StaggerItem key={service.id}>
              <ServiceCard service={service} />
            </StaggerItem>
          ))}
        </StaggerContainer>

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
