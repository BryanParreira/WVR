"use client"

import { motion } from "framer-motion"
import { useRef } from "react"
import { useInView } from "framer-motion"
import { EncryptedText } from "@/components/ui/encrypted-text"

const companies = [
  { name: "Grovic Data",          tag: "Data Intelligence" },
  { name: "Ridgeline Roofing MN", tag: "Construction"      },
  { name: "Superior Cleaning",    tag: "Facilities"        },
  { name: "WVRize",               tag: "Technology"        },
  { name: "Valerium",             tag: "Finance"           },
]

function ClientCell({ company, index }: { company: typeof companies[0]; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-40px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col gap-2 px-6 py-5 cursor-default"
      style={{ borderLeft: "1px solid var(--hairline)" }}
    >
      {/* Number */}
      <span
        className="text-[10px] font-medium tabular-nums transition-colors duration-200"
        style={{ fontFamily: "var(--font-mono)", color: "var(--hairline-strong)" }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Company name */}
      <p className="text-[15px] font-semibold leading-tight text-muted group-hover:text-ink transition-colors duration-200">
        {company.name}
      </p>

      {/* Industry tag */}
      <span
        className="text-[10px] uppercase tracking-[0.12em] text-muted/50 group-hover:text-muted transition-colors duration-200"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        {company.tag}
      </span>

      {/* Hover bottom accent */}
      <div
        className="absolute bottom-0 left-6 right-0 h-px bg-ink opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        aria-hidden
      />
    </motion.div>
  )
}

export function TrustedBy() {
  const doubled = [...companies, ...companies]

  return (
    <section className="py-10 px-6 border-t border-hairline bg-canvas">
      <div className="mx-auto max-w-[1200px]">

        {/* Header row */}
        <div className="flex items-center gap-4 mb-7">
          <p className="caption-uppercase text-muted">
            <EncryptedText text="Trusted by" duration={800} />
          </p>
          <div className="h-px flex-1 bg-hairline max-w-[48px]" />
          <span
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-hairline bg-surface"
            style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#1f8a65] animate-pulse" />
            <span
              className="text-[11px] font-medium text-body"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              5 active clients
            </span>
          </span>
          <div className="h-px flex-1 bg-hairline hidden sm:block" />
          <p className="hidden sm:block text-[12px] text-muted" style={{ fontFamily: "var(--font-mono)" }}>
            3 industries · growing
          </p>
        </div>

        {/* Desktop: numbered grid with vertical dividers */}
        <div className="hidden md:grid md:grid-cols-5 border-t border-b border-hairline">
          {companies.map((company, i) => (
            <ClientCell key={company.name} company={company} index={i} />
          ))}
        </div>

        {/* Mobile: marquee strip */}
        <div className="relative overflow-hidden md:hidden">
          <div
            className="pointer-events-none absolute inset-y-0 left-0 w-12 z-10"
            style={{ background: "linear-gradient(to right, var(--canvas), transparent)" }}
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 w-12 z-10"
            style={{ background: "linear-gradient(to left, var(--canvas), transparent)" }}
          />
          <div className="animate-marquee flex items-stretch gap-3 w-max py-2">
            {doubled.map((c, i) => (
              <div
                key={i}
                className="flex flex-col gap-1 px-4 py-3 rounded-[8px] border border-hairline bg-surface whitespace-nowrap"
              >
                <span className="text-[13px] font-semibold text-body leading-tight">{c.name}</span>
                <span
                  className="text-[10px] uppercase tracking-[0.1em] text-muted"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {c.tag}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
