"use client"

import Link from "next/link"
import { SITE_CONFIG } from "@/lib/constants"

const D = {
  bg:      "#141210",
  surface: "#1c1a17",
  border:  "#2a2825",
  ink:     "#f0ede8",
  body:    "#a09c92",
  muted:   "#6b6760",
  dim:     "#3d3b37",
}

const stats = [
  { value: "24h",  label: "response time" },
  { value: "0",    label: "spam, ever" },
  { value: "100%", label: "encrypted" },
]

const services = [
  "AI & Agentic Automation",
  "Zero-Trust Security",
  "Custom Development",
  "GEO + Digital Marketing",
]

export function ContactInfoPanel() {
  return (
    <div
      className="rounded-[16px] overflow-hidden"
      style={{ background: D.bg, border: `1px solid ${D.border}` }}
    >
      {/* Stats strip */}
      <div
        className="grid grid-cols-3 gap-px"
        style={{ borderBottom: `1px solid ${D.border}`, background: D.border }}
      >
        {stats.map(({ value, label }) => (
          <div
            key={label}
            className="px-3 py-4 sm:px-5 sm:py-5"
            style={{ background: D.bg }}
          >
            <div
              className="text-[22px] sm:text-[28px] font-semibold leading-none tabular-nums"
              style={{ color: D.ink, letterSpacing: "-0.03em" }}
            >
              {value}
            </div>
            <div
              className="text-[9px] sm:text-[10px] uppercase mt-1.5 tracking-[0.08em] sm:tracking-[0.1em]"
              style={{ color: D.muted, fontFamily: "var(--font-code-stack)" }}
            >
              {label}
            </div>
          </div>
        ))}
      </div>

      {/* Contact details */}
      <div className="p-5 sm:p-7 space-y-6 sm:space-y-7">
        <div>
          <p
            className="text-[10px] uppercase tracking-[0.12em] mb-2"
            style={{ color: D.muted, fontFamily: "var(--font-code-stack)" }}
          >
            Email
          </p>
          <a
            href={`mailto:${SITE_CONFIG.email}`}
            className="text-[14px] transition-colors duration-150 block"
            style={{ color: D.body }}
            onMouseEnter={e => (e.currentTarget.style.color = D.ink)}
            onMouseLeave={e => (e.currentTarget.style.color = D.body)}
          >
            {SITE_CONFIG.email}
          </a>
        </div>

        <div>
          <p
            className="text-[10px] uppercase tracking-[0.12em] mb-2"
            style={{ color: D.muted, fontFamily: "var(--font-code-stack)" }}
          >
            Project Calls
          </p>
          <p className="text-[14px]" style={{ color: D.body }}>
            Scheduled after initial inquiry
          </p>
        </div>

        <div>
          <p
            className="text-[10px] uppercase tracking-[0.12em] mb-2"
            style={{ color: D.muted, fontFamily: "var(--font-code-stack)" }}
          >
            Data &amp; Privacy
          </p>
          <p className="text-[14px] leading-[1.5]" style={{ color: D.body }}>
            All messages encrypted in transit.{" "}
            <Link
              href="/privacy"
              className="transition-colors duration-150"
              style={{ color: D.muted }}
              onMouseEnter={e => (e.currentTarget.style.color = D.ink)}
              onMouseLeave={e => (e.currentTarget.style.color = D.muted)}
            >
              Privacy policy →
            </Link>
          </p>
        </div>

        {/* Services list */}
        <div
          className="pt-6 sm:pt-7"
          style={{ borderTop: `1px solid ${D.border}` }}
        >
          <p
            className="text-[10px] uppercase tracking-[0.12em] mb-4"
            style={{ color: D.muted, fontFamily: "var(--font-code-stack)" }}
          >
            What we build
          </p>
          <div className="space-y-2.5">
            {services.map((svc) => (
              <div
                key={svc}
                className="flex items-center gap-2.5 text-[13px]"
                style={{ color: D.body }}
              >
                <span
                  className="h-1 w-1 flex-shrink-0 rounded-full"
                  style={{ background: D.dim }}
                />
                {svc}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
