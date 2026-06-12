"use client"

import { StaggerContainer, StaggerItem } from "@/components/ui/animate-in"

const stats = [
  { value: "40%", label: "Average cost reduction", sub: "Across AI automation deployments" },
  { value: "3×", label: "Avg. traffic growth", sub: "Within 6 months of GEO implementation" },
  { value: "99.9%", label: "Uptime SLA", sub: "For all hosted client applications" },
  { value: "0", label: "Client security breaches", sub: "Across all Zero-Trust implementations" },
]

export function StatsSection() {
  return (
    <section className="py-10 px-6 sm:py-16 border-t border-b border-hairline bg-canvas">
      <div className="mx-auto max-w-[1200px]">
        <StaggerContainer className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat, i) => (
            <StaggerItem key={stat.label}>
              <div className={i % 2 !== 0 ? "border-l border-hairline pl-8" : ""}>
                <div className="text-[32px] font-semibold text-ink leading-none tracking-[-0.02em] tabular-nums mb-2">
                  {stat.value}
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
