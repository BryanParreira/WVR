"use client"

import { useState, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { EncryptedText } from "@/components/ui/encrypted-text"
import { GlowingEffect } from "@/components/ui/glowing-effect"
import { TESTIMONIALS } from "@/lib/constants"

const D = {
  bg:      "var(--canvas)",
  surface: "var(--surface)",
  border:  "var(--hairline)",
  ink:     "var(--ink)",
  body:    "var(--body)",
  muted:   "var(--muted)",
  dim:     "var(--muted-soft)",
}

function MonogramAvatar({ name }: { name: string }) {
  const initials = name.split(" ").slice(0, 2).map(n => n[0]).join("").toUpperCase()
  return (
    <div
      className="relative h-12 w-12 flex-shrink-0 rounded-full flex items-center justify-center"
      style={{ background: "var(--ink-faint)", border: `1px solid ${D.border}` }}
    >
      <span className="text-[14px] font-semibold tabular-nums" style={{ color: D.body }}>
        {initials}
      </span>
    </div>
  )
}

export function Testimonials() {
  const [active,  setActive]  = useState(0)
  const [dir,     setDir]     = useState(1)
  const [hovered, setHovered] = useState(false)
  const total = TESTIMONIALS.length

  useEffect(() => {
    const t = setInterval(() => {
      setDir(1)
      setActive(i => (i + 1) % total)
    }, 5500)
    return () => clearInterval(t)
  }, [total])

  const go = (next: number, d: number) => {
    setDir(d)
    setActive(next)
  }

  const t = TESTIMONIALS[active]

  return (
    <section id="testimonials" className="relative py-16 px-6 sm:py-24 overflow-hidden"
      style={{ background: D.bg }}>

      {/* Ambient */}
      <div aria-hidden className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(240,237,232,0.02) 0%, transparent 70%)" }} />

      <div className="relative mx-auto max-w-[1200px]">

        {/* Header row */}
        <div className="mb-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div>
            <p className="text-[11px] uppercase tracking-[0.12em] mb-4"
              style={{ fontFamily: "var(--font-code-stack)", color: D.muted }}>
              <EncryptedText text="Client Results" duration={900} />
            </p>
            <h2 className="shimmer-text text-[clamp(26px,3.5vw,36px)] font-[400] leading-[1.1] tracking-[-0.025em]">
              Trusted by teams
              <br />
              that move fast.
            </h2>
          </div>

          {/* Progress pills + arrows */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => go(i, i > active ? 1 : -1)}
                  aria-label={`Testimonial ${i + 1}`}
                  className="transition-all duration-300 rounded-full"
                  style={{
                    width:      i === active ? "28px" : "6px",
                    height:     "6px",
                    background: i === active ? D.body : D.border,
                  }}
                />
              ))}
            </div>
            <div className="w-px h-4" style={{ background: D.border }} />
            <button
              onClick={() => go((active - 1 + total) % total, -1)}
              aria-label="Previous testimonial"
              className="flex h-8 w-8 items-center justify-center rounded-full transition-colors duration-200"
              style={{ background: D.surface, border: `1px solid ${D.border}` }}>
              <ChevronLeft className="h-4 w-4" style={{ color: D.muted }} />
            </button>
            <button
              onClick={() => go((active + 1) % total, 1)}
              aria-label="Next testimonial"
              className="flex h-8 w-8 items-center justify-center rounded-full transition-colors duration-200"
              style={{ background: D.surface, border: `1px solid ${D.border}` }}>
              <ChevronRight className="h-4 w-4" style={{ color: D.muted }} />
            </button>
          </div>
        </div>

        {/* Testimonial card */}
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={active}
            custom={dir}
            initial={{ opacity: 0, x: dir * 50, filter: "blur(4px)" }}
            animate={{ opacity: 1,  x: 0,        filter: "blur(0px)" }}
            exit={{    opacity: 0,  x: dir * -50, filter: "blur(4px)" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* GlowingEffect wrapper */}
            <div
              className="relative rounded-[16px]"
              style={{ border: `1px solid ${D.border}` }}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              <GlowingEffect disabled={!hovered} spread={60} glow={false} proximity={80} inactiveZone={0.01} />

              <div className="relative rounded-[16px] overflow-hidden" style={{ background: D.surface }}>
                <div className="p-7 sm:p-12">

                  {/* Star rating — neutral */}
                  <div className="flex gap-1 mb-7">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <svg key={i} className="h-[13px] w-[13px]" viewBox="0 0 12 12" fill="currentColor"
                        style={{ color: D.dim }}>
                        <path d="M6 0l1.5 4.5H12L8.25 7.5 9.75 12 6 9 2.25 12l1.5-4.5L0 4.5h4.5z" />
                      </svg>
                    ))}
                  </div>

                  {/* Quote */}
                  <blockquote
                    className="text-[20px] sm:text-[24px] font-normal leading-[1.5] tracking-[-0.015em] mb-10"
                    style={{ color: D.ink }}>
                    &ldquo;{t.content}&rdquo;
                  </blockquote>

                  {/* Client row */}
                  <div className="flex items-center gap-4 pt-8" style={{ borderTop: `1px solid ${D.border}` }}>
                    <MonogramAvatar name={t.name} />
                    <div>
                      <p className="text-[15px] font-semibold" style={{ color: D.ink }}>{t.name}</p>
                      <p className="text-[13px] mt-0.5" style={{ color: D.muted }}>{t.role}, {t.company}</p>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  )
}
