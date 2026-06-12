"use client"

import { useRef, useEffect, useState } from "react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AgentCard } from "@/components/sections/agent-card"

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
    <div
      ref={ref}
      className="text-[42px] font-semibold text-ink leading-none tracking-[-0.03em] tabular-nums mb-2"
    >
      {display}
    </div>
  )
}

export function Hero() {
  return (
    <section className="relative bg-canvas pt-12 pb-0 px-6 sm:pt-20 overflow-hidden">
      {/* Cyan radial halo — barely visible depth signal */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[500px]"
        style={{
          background:
            "radial-gradient(ellipse 70% 40% at 50% -5%, rgba(38,37,30,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-[1200px]">

        {/* Section label */}
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.05 }}
          className="caption-uppercase text-muted mb-5"
        >
          AI × Security × Engineering
        </motion.p>

        {/* Headline — one word in brand cyan for hierarchy */}
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="display-mega max-w-3xl mb-6"
        >
          Build the Future.
          <br />
          Secure the Present.
        </motion.h1>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          className="text-[16px] text-body leading-[1.5] max-w-xl mb-9"
        >
          WebVisionRank bridges Agentic AI automation, Zero-Trust cybersecurity,
          and elite custom development into one unified growth engine.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.28 }}
          className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-10 sm:mb-16"
        >
          <Button asChild variant="ink" size="lg" className="group">
            <Link href="/contact">
              Start Your Project
              <ArrowRight className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5" />
            </Link>
          </Button>
          <Button asChild variant="link" size="lg">
            <Link href="/services">Explore services →</Link>
          </Button>
        </motion.div>

        {/* AI Pipeline card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          <AgentCard />
        </motion.div>

        {/* Stats strip — animated counters on enter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-12 py-8 border-t border-hairline grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { value: "40%",   label: "avg. cost reduction" },
            { value: "3×",    label: "avg. traffic growth" },
            { value: "99.9%", label: "uptime SLA" },
            { value: "0",     label: "client breaches" },
          ].map(({ value, label }, i) => (
            <div key={label} className={i % 2 !== 0 ? "border-l border-hairline pl-8" : ""}>
              <AnimatedNumber value={value} />
              <div className="text-[13px] text-muted">{label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
