"use client"

import { FlipWords } from "@/components/ui/flip-words"

const FLIP = [
  "AI & Automation.",
  "Zero Trust Security.",
  "GEO Strategy.",
  "Web Performance.",
  "Custom Software.",
]

export function BlogHeader() {
  return (
    <section className="border-b border-hairline bg-canvas px-6 pb-14 pt-14 sm:pt-20">
      <div className="mx-auto max-w-[1200px]">
        <p className="caption-uppercase mb-5 text-muted">Journal</p>

        <h1 className="display-lg mb-5 max-w-3xl text-ink leading-[1.1]">
          Thinking out loud on{" "}
          <br className="hidden sm:block" />
          <FlipWords
            words={FLIP}
            duration={3000}
            className="text-ink"
          />
        </h1>

        <p className="max-w-lg text-[16px] leading-[1.6] text-body">
          Practical articles written by practitioners — no filler, no SEO padding.
          Just signal on AI systems, security, and elite engineering.
        </p>
      </div>
    </section>
  )
}
