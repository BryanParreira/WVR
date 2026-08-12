"use client"

import { motion } from "framer-motion"
import { useRef } from "react"
import { useInView } from "framer-motion"
import { EncryptedText } from "@/components/ui/encrypted-text"

const clients = [
  { name: "Ridgeline Roofing MN", tag: "Construction" },
  { name: "Superior Cleaning",    tag: "Facilities"   },
]

const ventures = [
  { name: "Grovic Data", tag: "Data Intelligence" },
  { name: "WVRize",      tag: "Technology"         },
  { name: "Valerium",    tag: "Finance"             },
]

function ClientCell({ company, index }: { company: { name: string; tag: string }; index: number }) {
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
  return (
    <section className="py-10 px-6 border-t border-hairline bg-canvas">
      <div className="mx-auto max-w-[1200px]">

        {/* Header row */}
        <div className="flex items-center gap-4 mb-7">
          <p className="caption-uppercase text-muted">
            <EncryptedText text="Clients we work with" duration={800} />
          </p>
          <div className="h-px flex-1 bg-hairline" />
        </div>

        {/* Real client engagements */}
        <div className="grid grid-cols-1 sm:grid-cols-2 border-t border-b border-hairline mb-10">
          {clients.map((company, i) => (
            <ClientCell key={company.name} company={company} index={i} />
          ))}
        </div>

        {/* Ventures we've built — explicitly separate from client engagements */}
        <div className="flex items-center gap-4 mb-4">
          <p className="text-[11px] uppercase tracking-[0.12em] text-muted/60" style={{ fontFamily: "var(--font-mono)" }}>
            Also behind these ventures
          </p>
          <div className="h-px flex-1 bg-hairline max-w-[48px]" />
        </div>
        <div className="flex flex-wrap gap-2">
          {ventures.map((v) => (
            <span
              key={v.name}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-hairline bg-surface text-[12px] text-muted"
            >
              {v.name}
              <span className="text-muted/50">· {v.tag}</span>
            </span>
          ))}
        </div>
        <p className="mt-2 text-[11px] text-muted/60">
          Companies founded/built by WebVisionRank, not client engagements.
        </p>

      </div>
    </section>
  )
}
