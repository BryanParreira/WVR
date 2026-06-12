"use client"

const companies = [
  "TechScale Ventures",
  "FinCore Solutions",
  "GrowthEdge Agency",
  "NovaSec Group",
  "DataPilot Inc.",
  "Stratify Labs",
  "Apex Digital",
  "NorthStar Capital",
]

export function TrustedBy() {
  const doubled = [...companies, ...companies]

  return (
    <section className="py-10 px-6 border-t border-hairline bg-canvas">
      <div className="mx-auto max-w-[1200px]">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">

          {/* Label — fixed, never scrolls */}
          <p className="caption-uppercase text-muted shrink-0">Trusted by</p>

          {/* Marquee track */}
          <div className="relative flex-1 overflow-hidden">
            {/* Fade edges */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-8 z-10"
              style={{ background: "linear-gradient(to right, var(--canvas), transparent)" }} />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-8 z-10"
              style={{ background: "linear-gradient(to left, var(--canvas), transparent)" }} />

            {/* Scrolling strip — 2× list for seamless loop */}
            <div className="animate-marquee flex items-center gap-12 w-max">
              {doubled.map((name, i) => (
                <span
                  key={i}
                  className="text-[14px] font-medium text-muted-soft hover:text-muted transition-colors duration-150 whitespace-nowrap"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
