"use client"

import { useId, useRef, useEffect, useState } from "react"
import { useInView } from "framer-motion"
import { StaggerContainer, StaggerItem } from "@/components/ui/animate-in"
import { CountUp } from "@/components/ui/count-up"

const stats = [
  {
    value: "40%",
    label: "Average cost reduction",
    sub: "Across AI automation deployments",
    spark: "0,4 8,6 16,9 24,11 32,14 40,16 48,17 56,18",
    sparkColor: "#1f8a65",
  },
  {
    value: "3×",
    label: "Avg. traffic growth",
    sub: "Within 6 months of GEO implementation",
    spark: "0,18 8,17 16,14 24,11 32,7 40,4 48,3 56,2",
    sparkColor: "#1f8a65",
  },
  {
    value: "99.9%",
    label: "Uptime SLA",
    sub: "For all hosted client applications",
    spark: "0,4 8,3 16,5 24,4 32,3 40,4 48,4 56,3",
    sparkColor: "#1f8a65",
  },
  {
    value: "0",
    label: "Client security breaches",
    sub: "Across all Zero Trust implementations",
    spark: "0,18 8,18 16,18 24,18 32,18 40,18 48,18 56,18",
    sparkColor: "#cfcdc4",
  },
]

function MiniSparkline({ points, color }: { points: string; color: string }) {
  const rawId = useId()
  const clipId = `spark-${rawId.replace(/:/g, "")}`
  const ref = useRef<SVGSVGElement>(null)
  const inView = useInView(ref, { once: true, margin: "-20px" })
  const [clipW, setClipW] = useState(0)

  useEffect(() => {
    if (!inView) return
    const start = performance.now()
    const dur = 900
    const tick = (now: number) => {
      const t = Math.min((now - start) / dur, 1)
      const eased = 1 - Math.pow(1 - t, 2)
      setClipW(eased * 56)
      if (t < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView])

  return (
    <svg ref={ref} width="56" height="20" viewBox="0 0 56 20" fill="none" aria-hidden="true">
      <defs>
        <clipPath id={clipId}>
          <rect x="0" y="0" width={clipW} height="20" />
        </clipPath>
      </defs>
      <polyline
        points={points}
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        clipPath={`url(#${clipId})`}
      />
    </svg>
  )
}

export function StatsSection() {
  return (
    <section className="py-10 px-6 sm:py-16 border-t border-b border-hairline bg-canvas">
      <div className="mx-auto max-w-[1200px]">
        <StaggerContainer className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat, i) => (
            <StaggerItem key={stat.label}>
              <div className={i % 2 !== 0 ? "border-l border-hairline pl-8" : ""}>
                <div className="flex items-end gap-3 mb-2">
                  <CountUp
                    value={stat.value}
                    className="text-[32px] font-semibold text-ink leading-none tracking-[-0.02em] tabular-nums block"
                  />
                  <div className="mb-[3px]">
                    <MiniSparkline points={stat.spark} color={stat.sparkColor} />
                  </div>
                </div>
                <div className="text-[14px] font-medium text-ink mb-0.5">{stat.label}</div>
                <div className="text-[13px] text-muted leading-[1.4]">{stat.sub}</div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
