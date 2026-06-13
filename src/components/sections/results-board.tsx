"use client"

import { useState, useEffect, useCallback } from "react"
import { AnimateIn } from "@/components/ui/animate-in"
import { TextFlippingBoard } from "@/components/ui/text-flipping-board"

const WVR_MESSAGES = [
  "AI AUTOMATION\nCUT COSTS BY 40%\nPER ENGAGEMENT",
  "ZERO TRUST AUDIT\n0 BREACHES FOUND\nIN PRODUCTION",
  "GEO OPTIMIZATION\n3X ORGANIC TRAFFIC\nIN 90 DAYS",
  "CUSTOM BUILDS\n99.9% UPTIME SLA\nSHIPPED ON TIME",
  "SECURITY FIRST\nNEVER BOLTED ON\nBUILT FROM DAY 1",
]

export function ResultsBoard() {
  const [idx, setIdx] = useState(0)

  const next = useCallback(
    () => setIdx(i => (i + 1) % WVR_MESSAGES.length),
    [],
  )

  useEffect(() => {
    const id = setInterval(next, 6500)
    return () => clearInterval(id)
  }, [next])

  return (
    <section className="py-12 px-6 sm:py-16 border-t border-hairline bg-canvas">
      <div className="mx-auto max-w-[1200px]">

        <AnimateIn className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="caption-uppercase mb-1 text-muted">Live Agency Scoreboard</p>
              <p className="text-[14px] text-body">Real results. Real clients. Cycling now.</p>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              {WVR_MESSAGES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIdx(i)}
                  className="h-1.5 rounded-full transition-all duration-300"
                  style={{
                    background: i === idx ? "var(--ink)" : "var(--hairline-strong)",
                    width: i === idx ? "24px" : "6px",
                  }}
                  aria-label={`Board message ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </AnimateIn>

        <AnimateIn delay={0.1}>
          <TextFlippingBoard text={WVR_MESSAGES[idx]} duration={1.5} />
        </AnimateIn>
      </div>
    </section>
  )
}
