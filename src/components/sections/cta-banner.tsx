"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { AnimateIn } from "@/components/ui/animate-in"
import { Button } from "@/components/ui/button"

export function CtaBanner() {
  return (
    <section className="relative py-24 px-6 bg-ink overflow-hidden">
      {/* Cyan radial pool — visible on dark background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[500px]"
        style={{ background: "radial-gradient(ellipse 60% 60% at 50% 110%, rgba(240,237,232,0.05) 0%, transparent 70%)" }}
      />
      {/* Subtle top vignette */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[200px]"
        style={{ background: "linear-gradient(to bottom, rgba(38,37,30,0.4) 0%, transparent 100%)" }}
      />
      <div className="relative mx-auto max-w-[1200px]">
        <AnimateIn>
          <div className="max-w-2xl">
            <p className="caption-uppercase mb-4" style={{ color: "#6b6760" }}>Get Started</p>
            <h2 className="display-lg mb-6 text-canvas">
              Ready to build something
              <br />
              extraordinary?
            </h2>
            <p className="text-[16px] leading-[1.5] mb-10 max-w-lg" style={{ color: "#a09c92" }}>
              Join the businesses that chose to stop compromising. Let&apos;s architect
              your competitive edge — in AI, security, and engineering.
            </p>
            <div className="flex flex-col sm:flex-row items-start gap-4">
              {/* White button on dark bg — secondary variant is bg-surface (white) */}
              <Button asChild variant="secondary" size="lg" className="group">
                <Link href="/contact">
                  Start your project
                  <ArrowRight className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5" />
                </Link>
              </Button>
              <Link
                href="/pricing"
                className="inline-flex items-center h-11 px-5 text-[14px] gap-2 font-medium transition-colors duration-150"
                style={{ color: "#807d72" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#f0ede8")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#807d72")}
              >
                View pricing →
              </Link>
            </div>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}
