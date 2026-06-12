"use client"

import { AnimateIn, StaggerContainer, StaggerItem } from "@/components/ui/animate-in"
import { TESTIMONIALS } from "@/lib/constants"

export function Testimonials() {
  const [featured, ...rest] = TESTIMONIALS

  return (
    <section id="testimonials" className="py-12 px-6 sm:py-20 border-t border-hairline bg-canvas">
      <div className="mx-auto max-w-[1200px]">

        {/* Header */}
        <AnimateIn className="mb-14">
          <p className="caption-uppercase mb-3">Client Results</p>
          <h2 className="display-lg max-w-xl">
            Trusted by teams
            <br />
            that move fast.
          </h2>
        </AnimateIn>

        {/* 2-col layout: featured large + 2 smaller stacked */}
        <StaggerContainer className="grid grid-cols-1 gap-4 lg:grid-cols-5">

          {/* Featured testimonial — larger, ink-inverted Cursor style */}
          <StaggerItem className="lg:col-span-3">
            <div className="rounded-[12px] bg-ink p-8 h-full flex flex-col justify-between shadow-featured">
              {/* Stars */}
              <div className="flex gap-0.5 mb-6">
                {Array.from({ length: featured.rating }).map((_, i) => (
                  <svg key={i} viewBox="0 0 12 12" className="h-3 w-3 fill-[#c08532]" aria-hidden="true">
                    <path d="M6 0l1.545 3.09L11 3.635l-2.5 2.455.59 3.46L6 7.91l-3.09 1.64.59-3.46L1 3.635l3.455-.545z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-[20px] font-normal leading-[1.5] tracking-[-0.01em] text-canvas flex-1 mb-8">
                &ldquo;{featured.content}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-3 pt-6 border-t border-[#2e2c28]">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#2a2825] text-[11px] font-semibold text-canvas shrink-0">
                  {featured.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <p className="text-[14px] font-medium text-canvas leading-none mb-0.5">{featured.name}</p>
                  <p className="text-[13px] text-[#6b6760]">{featured.role}, {featured.company}</p>
                </div>
              </div>
            </div>
          </StaggerItem>

          {/* Two smaller testimonials stacked */}
          <StaggerItem className="lg:col-span-2">
            <div className="flex flex-col gap-4 h-full">
              {rest.map((t) => (
                <div key={t.id} className="rounded-[12px] bg-surface p-6 flex flex-col gap-4 shadow-card">
                  <div className="flex gap-0.5">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <svg key={i} viewBox="0 0 12 12" className="h-3 w-3 fill-current text-ink" aria-hidden="true">
                        <path d="M6 0l1.545 3.09L11 3.635l-2.5 2.455.59 3.46L6 7.91l-3.09 1.64.59-3.46L1 3.635l3.455-.545z" />
                      </svg>
                    ))}
                  </div>
                  <blockquote className="text-[15px] text-body leading-[1.55] flex-1">
                    &ldquo;{t.content}&rdquo;
                  </blockquote>
                  <div className="flex items-center gap-3 pt-4 border-t border-hairline">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-strong text-[11px] font-semibold text-ink shrink-0">
                      {t.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div>
                      <p className="text-[14px] font-medium text-ink leading-none mb-0.5">{t.name}</p>
                      <p className="text-[13px] text-muted">{t.role}, {t.company}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </section>
  )
}
