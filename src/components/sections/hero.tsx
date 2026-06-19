"use client"

import { useRef, useEffect, useState } from "react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AgentCard } from "@/components/sections/agent-card"
import { FlipWords } from "@/components/ui/flip-words"
import { CrowdCanvas } from "@/components/ui/crowd-canvas"

function AnimatedNumber({ value }: { value: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const [display, setDisplay] = useState(value)

  useEffect(() => {
    if (!isInView) return
    const match = value.match(/([\d.]+)/)
    if (!match) return
    const num = parseFloat(match[1])
    if (num === 0) return
    const prefix = value.slice(0, match.index ?? 0)
    const suffix = value.slice((match.index ?? 0) + match[1].length)
    const isDecimal = num % 1 !== 0
    const duration = 1400
    const start = Date.now()
    const tick = () => {
      const elapsed = Date.now() - start
      const t = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      const current = num * eased
      const formatted = isDecimal ? current.toFixed(1) : Math.round(current).toString()
      setDisplay(`${prefix}${formatted}${suffix}`)
      if (t < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [isInView, value])

  return (
    <div ref={ref}
      className="text-[42px] font-semibold text-ink leading-none tracking-[-0.03em] tabular-nums mb-2">
      {display}
    </div>
  )
}

export function Hero() {
  return (
    <section className="relative bg-canvas pt-12 pb-0 px-6 sm:pt-20 overflow-hidden">

      {/* ── Ambient orb A — top right (larger, more visible) ── */}
      <div aria-hidden className="pointer-events-none absolute rounded-full dark:hidden"
        style={{
          top: "-220px", right: "4%",
          width: "800px", height: "800px",
          background: "radial-gradient(circle, rgba(96,165,250,0.055) 0%, rgba(38,37,30,0.02) 50%, transparent 70%)",
          animation: "drift-a 22s ease-in-out infinite",
        }} />

      {/* ── Ambient orb B — mid left ── */}
      <div aria-hidden className="pointer-events-none absolute rounded-full dark:hidden"
        style={{
          top: "22%", left: "-20%",
          width: "700px", height: "700px",
          background: "radial-gradient(circle, rgba(251,191,36,0.035) 0%, rgba(38,37,30,0.01) 50%, transparent 70%)",
          animation: "drift-b 28s ease-in-out infinite",
        }} />

      {/* ── Ambient orb C — bottom center ── */}
      <div aria-hidden className="pointer-events-none absolute rounded-full dark:hidden"
        style={{
          bottom: "0%", left: "30%",
          width: "600px", height: "300px",
          background: "radial-gradient(ellipse, rgba(38,37,30,0.04) 0%, transparent 70%)",
        }} />

      <div className="relative z-10 mx-auto max-w-[1200px]">



        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          animate={{ opacity: 1,  y: 0,  filter: "blur(0px)" }}
          transition={{ duration: 0.65, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="display-mega max-w-3xl mb-6">
          Build the Future.
          <br />
          <FlipWords
            words={["Secure the Present.", "Automate Everything.", "Ship Faster.", "Own the Future."]}
            duration={3200}
          />
        </motion.h1>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 14, filter: "blur(4px)" }}
          animate={{ opacity: 1,  y: 0,  filter: "blur(0px)" }}
          transition={{ duration: 0.55, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          className="text-[16px] text-body leading-[1.5] max-w-xl mb-9">
          WebVisionRank bridges Agentic AI automation, Zero Trust cybersecurity,
          and elite custom development into one unified growth engine.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1,  y: 0  }}
          transition={{ duration: 0.45, delay: 0.28 }}
          className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-10 sm:mb-16">
          <div
            className="beam-border rounded-[10px] w-fit"
            style={{
              "--bm-bg":  "var(--primary)",
              "--bm-c1":  "rgba(96,165,250,0.03)",
              "--bm-c2":  "rgba(96,165,250,0.55)",
              "--bm-dur": "5s",
            } as React.CSSProperties}
          >
            <Button asChild variant="ink" size="lg" className="group rounded-[9px]">
              <Link href="/contact">
                Start Your Project
                <ArrowRight className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5" />
              </Link>
            </Button>
          </div>
          <Button asChild variant="link" size="lg">
            <Link href="/services">Explore services →</Link>
          </Button>
        </motion.div>

        {/* Terminal card — BorderBeam wrapper */}
        <motion.div
          initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
          animate={{ opacity: 1,  y: 0,  filter: "blur(0px)" }}
          transition={{ duration: 0.7, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}>

          {/* Glow halo behind terminal */}
          <div aria-hidden className="pointer-events-none absolute left-1/2 -translate-x-1/2 -top-8"
            style={{
              width: "60%", height: "80px",
              background: "radial-gradient(ellipse, rgba(96,165,250,0.08) 0%, transparent 70%)",
              filter: "blur(12px)",
            }} />

          {/* BorderBeam wrapper */}
          <div
            className="beam-border rounded-[12px]"
            style={{
              "--bm-bg":  "#0f0e0c",
              "--bm-c1":  "rgba(96,165,250,0.03)",
              "--bm-c2":  "rgba(96,165,250,0.35)",
              "--bm-dur": "10s",
            } as React.CSSProperties}>
            <AgentCard />
          </div>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-12 py-8 border-t border-hairline grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: "40%",   label: "avg. cost reduction" },
            { value: "3×",    label: "avg. traffic growth" },
            { value: "99.9%", label: "uptime SLA" },
            { value: "0",     label: "client breaches" },
          ].map(({ value, label }, i) => (
            <div key={label} className={[
              i % 2 !== 0 ? "border-l border-hairline pl-8" : "",
              i === 2 ? "md:border-l md:border-hairline md:pl-8" : "",
            ].filter(Boolean).join(" ")}>
              <AnimatedNumber value={value} />
              <div className="text-[13px] text-muted">{label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Crowd strip — below stats, peeps anchored to bottom */}
      <div aria-hidden className="relative -mx-6 h-[340px] sm:h-[380px] overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24"
          style={{ background: "linear-gradient(to right, var(--canvas), transparent)" }} />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24"
          style={{ background: "linear-gradient(to left, var(--canvas), transparent)" }} />
        <CrowdCanvas
          src="/images/peeps/all-peeps.png"
          rows={15}
          cols={7}
          excludeIndices={[17, 72, 92, 100]}
          className="absolute bottom-0 left-0 h-full w-full"
        />
      </div>
    </section>
  )
}
