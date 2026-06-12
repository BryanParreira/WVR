"use client"

import { AnimateIn, StaggerContainer, StaggerItem } from "@/components/ui/animate-in"
import { PROCESS_STEPS } from "@/lib/constants"
import { cn } from "@/lib/utils"

export function ProcessSection() {
  return (
    <section id="process" className="py-12 px-6 sm:py-20 border-t border-hairline bg-canvas">
      <div className="mx-auto max-w-[1200px]">

        {/* Header */}
        <AnimateIn className="mb-14">
          <p className="caption-uppercase mb-3">How We Work</p>
          <h2 className="display-lg max-w-xl">
            From first call to
            <br />
            production-ready.
          </h2>
        </AnimateIn>

        {/* Steps — editorial numbered layout */}
        <StaggerContainer className="grid grid-cols-1 gap-0 md:grid-cols-4">
          {PROCESS_STEPS.map((step, i) => (
            <StaggerItem key={step.step}>
              <div className={cn(
                "relative overflow-hidden p-6 flex flex-col gap-3",
                i < PROCESS_STEPS.length - 1
                  ? "border-b border-hairline md:border-b-0 md:border-r md:border-hairline"
                  : ""
              )}>
                {/* Large decorative number — 4% opacity texture */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none select-none absolute -top-3 -right-1 text-[96px] font-semibold leading-none tabular-nums text-ink"
                  style={{ opacity: 0.04 }}
                >
                  {step.step}
                </span>

                <span className="caption-uppercase text-muted">{step.step}</span>
                <div className="w-6 h-px bg-hairline-strong -mt-1" />

                <h3 className="text-[20px] font-semibold text-ink leading-[1.3] tracking-[-0.01em]">
                  {step.title}
                </h3>

                <p className="text-[14px] text-body leading-[1.55]">
                  {step.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}

