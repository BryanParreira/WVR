"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check } from "lucide-react"
import { AnimateIn } from "@/components/ui/animate-in"
import { EncryptedText } from "@/components/ui/encrypted-text"

const STEP_MS = 4500

const STEPS = [
  {
    step: "01",
    title: "Discovery & Audit",
    description:
      "Deep-dive into your current systems, goals, and threat landscape. We identify gaps and opportunities before writing a single line of code.",
    details: [
      "System architecture & stack review",
      "Threat landscape & vulnerability scan",
      "Competitor benchmarking",
      "Goal alignment & KPI definition",
    ],
  },
  {
    step: "02",
    title: "Architecture & Strategy",
    description:
      "Custom roadmap with defined deliverables, timelines, and security requirements. No templates — every plan is purpose-built.",
    details: [
      "Technical roadmap & milestone plan",
      "Security-first design decisions",
      "Stack selection & infrastructure spec",
      "Budget breakdown & timeline lock",
    ],
  },
  {
    step: "03",
    title: "Build & Integrate",
    description:
      "Agile sprints with weekly demos. Every component is security-reviewed before deployment.",
    details: [
      "2-week agile sprint cycles",
      "Weekly progress demos & feedback",
      "Security review per component",
      "CI/CD pipeline & automated testing",
    ],
  },
  {
    step: "04",
    title: "Launch & Optimize",
    description:
      "Monitored launch, performance benchmarking, and iterative optimization. We don't disappear post-handoff.",
    details: [
      "Staged rollout with live monitoring",
      "Core Web Vitals & Lighthouse audit",
      "Post-launch iteration & tuning",
      "Ongoing support & growth cycles",
    ],
  },
]

export function ProcessSection() {
  const [active,   setActive]   = useState(0)
  const [progress, setProgress] = useState(0)
  const [paused,   setPaused]   = useState(false)
  const startRef = useRef(performance.now())
  const rafRef   = useRef<number>(0)
  const pausedAt = useRef<number | null>(null)

  const advance = useCallback((fromIdx: number) => {
    startRef.current = performance.now()
    setProgress(0)
    setActive((fromIdx + 1) % STEPS.length)
  }, [])

  useEffect(() => {
    const tick = (now: number) => {
      if (!paused) {
        const elapsed = now - startRef.current
        const p = Math.min(elapsed / STEP_MS, 1)
        setProgress(p)
        if (p >= 1) {
          setActive(prev => {
            const next = (prev + 1) % STEPS.length
            startRef.current = performance.now()
            setProgress(0)
            return next
          })
        }
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [paused, advance])

  const jumpTo = (idx: number) => {
    startRef.current = performance.now()
    setProgress(0)
    setActive(idx)
  }

  const step = STEPS[active]

  // Line fill: spans from circle 0 to circle 3
  // Each step occupies 1/(n-1) of the track
  const lineFill = ((active + progress) / (STEPS.length - 1)) * 100

  return (
    <section
      id="process"
      className="py-12 px-6 sm:py-20 border-t border-hairline bg-canvas"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => { setPaused(false); startRef.current = performance.now() - progress * STEP_MS }}
    >
      <div className="mx-auto max-w-[1200px]">

        <AnimateIn className="mb-14">
          <p className="caption-uppercase mb-3"><EncryptedText text="How We Work" duration={1000} /></p>
          <h2 className="display-lg max-w-xl">
            From first call to
            <br />
            production-ready.
          </h2>
        </AnimateIn>

        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-10 lg:gap-16 items-start">

          {/* ── Left: step tabs ──────────────────────────────────── */}
          <div className="relative">

            {/* Vertical track (desktop only) */}
            <div className="hidden lg:block absolute left-[13px] top-[18px]"
              style={{ bottom: "18px" }}>
              {/* Base track */}
              <div className="w-px h-full bg-hairline" />
              {/* Filled portion */}
              <div
                className="absolute top-0 left-0 w-px rounded-full bg-ink"
                style={{ height: `${lineFill}%`, transition: "none" }}
              />
            </div>

            <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
              {STEPS.map((s, i) => {
                const isDone   = i < active
                const isActive = i === active
                return (
                  <button
                    key={s.step}
                    onClick={() => jumpTo(i)}
                    className="flex items-start gap-4 text-left group shrink-0 lg:shrink relative py-1"
                  >
                    {/* Circle */}
                    <div className="relative mt-0.5 flex-shrink-0 z-10">
                      <div className={[
                        "h-[28px] w-[28px] rounded-full border-2 flex items-center justify-center transition-all duration-300",
                        isDone   ? "bg-ink border-ink"
                        : isActive ? "bg-canvas border-ink shadow-[0_0_0_3px_rgba(38,37,30,0.08)]"
                        : "bg-canvas border-hairline-strong group-hover:border-hairline-strong",
                      ].join(" ")}>
                        {isDone ? (
                          <Check className="h-3 w-3 text-canvas" strokeWidth={2.5} />
                        ) : (
                          <span className={[
                            "text-[10px] font-semibold tabular-nums leading-none",
                            isActive ? "text-ink" : "text-muted",
                          ].join(" ")}>{s.step}</span>
                        )}
                      </div>
                      {isActive && (
                        <span className="absolute inset-[-4px] rounded-full border border-ink/20 animate-ping" />
                      )}
                    </div>

                    {/* Label + progress bar */}
                    <div className="min-w-[120px] lg:min-w-0">
                      <p className={[
                        "text-[14px] font-medium leading-tight transition-colors duration-200",
                        isActive ? "text-ink" : isDone ? "text-body" : "text-muted group-hover:text-body",
                      ].join(" ")}>
                        {s.title}
                      </p>
                      {/* Timer bar */}
                      <div className="mt-1.5 h-px w-full bg-hairline overflow-hidden rounded-full">
                        <div
                          className="h-full bg-ink rounded-full"
                          style={{
                            width: isActive ? `${progress * 100}%` : isDone ? "100%" : "0%",
                            transition: isActive ? "none" : "width 0.3s ease",
                          }}
                        />
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* ── Right: content panel ─────────────────────────────── */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0,  filter: "blur(0px)" }}
                exit={{    opacity: 0, y: -12, filter: "blur(2px)" }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-[16px] bg-surface shadow-card overflow-hidden"
              >
                {/* Top bar — progress */}
                <div className="h-[3px] bg-hairline">
                  <div
                    className="h-full bg-ink rounded-full"
                    style={{ width: `${progress * 100}%`, transition: "none" }}
                  />
                </div>

                <div className="p-8 md:p-10">
                  {/* Decorative number */}
                  <div className="relative mb-2 overflow-hidden h-[72px]">
                    <span
                      aria-hidden="true"
                      className="absolute -top-3 -left-2 text-[120px] font-semibold leading-none tabular-nums text-ink select-none"
                      style={{ opacity: 0.045, letterSpacing: "-0.04em" }}
                    >
                      {step.step}
                    </span>
                  </div>

                  <p className="caption-uppercase text-muted mb-2">
                    <EncryptedText key={step.step} text={step.step} duration={500} trigger="always" />
                  </p>
                  <div className="w-6 h-px bg-hairline-strong mb-5" />

                  <h3 className="text-[30px] sm:text-[36px] font-semibold text-ink leading-[1.15] tracking-[-0.025em] mb-4">
                    {step.title}
                  </h3>

                  <p className="text-[16px] text-body leading-[1.6] mb-8 max-w-lg">
                    {step.description}
                  </p>

                  {/* Detail bullets — staggered */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-8">
                    {step.details.map((detail, i) => (
                      <motion.div
                        key={detail}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.15 + i * 0.07, ease: "easeOut" }}
                        className="flex items-center gap-2.5 text-[14px] text-body"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-ink/30 flex-shrink-0" />
                        {detail}
                      </motion.div>
                    ))}
                  </div>

                  {/* Step dots */}
                  <div className="flex items-center gap-2 pt-6 border-t border-hairline">
                    {STEPS.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => jumpTo(i)}
                        className="h-1.5 rounded-full transition-all duration-300"
                        style={{
                          width: i === active ? "28px" : "6px",
                          background: i <= active ? "var(--ink)" : "var(--hairline-strong)",
                          opacity: i < active ? 0.45 : 1,
                        }}
                      />
                    ))}
                    <span className="ml-auto text-[12px] text-muted" style={{ fontFamily: "var(--font-mono)" }}>
                      {String(active + 1).padStart(2, "0")} / {String(STEPS.length).padStart(2, "0")}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  )
}
