"use client"

import Link from "next/link"
import { Check } from "lucide-react"
import { AnimateIn, StaggerContainer, StaggerItem } from "@/components/ui/animate-in"
import { EncryptedText } from "@/components/ui/encrypted-text"
import { Button } from "@/components/ui/button"
import { PRICING_TIERS } from "@/lib/constants"
import { cn } from "@/lib/utils"
import { GlowingEffect } from "@/components/ui/glowing-effect"

const CLIENT_COUNTS: Record<string, string> = {
  foundation: "5 active",
  growth:     "8 active",
  enterprise: "12+",
}

type Tier = typeof PRICING_TIERS[number]

function TierCardContent({ tier }: { tier: Tier }) {
  return (
    <>
      {/* Tier header */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <p className={cn("caption-uppercase", tier.highlighted ? "text-[#a09c92]" : "text-muted")}>
            {tier.name}
          </p>
          {/* Social proof client count */}
          <span
            className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-medium"
            style={
              tier.highlighted
                ? { background: "rgba(240,237,232,0.06)", border: "1px solid rgba(240,237,232,0.10)", color: "#6b6760", fontFamily: "var(--font-mono)" }
                : { background: "rgba(38,37,30,0.04)",  border: "1px solid rgba(38,37,30,0.08)",  color: "#807d72", fontFamily: "var(--font-mono)" }
            }
          >
            <span
              className="h-1 w-1 rounded-full"
              style={{ background: tier.highlighted ? "rgba(240,237,232,0.35)" : "rgba(38,37,30,0.3)" }}
            />
            {CLIENT_COUNTS[tier.id]} clients
          </span>
        </div>

        <div className="flex items-baseline gap-1">
          <span className={cn(
            "text-[36px] font-semibold leading-none tracking-[-0.02em]",
            tier.highlighted ? "text-canvas" : "text-ink"
          )}>
            ${typeof tier.price === "number" ? tier.price.toLocaleString() : tier.price}
          </span>
          <span className={tier.highlighted ? "text-[#807d72] text-[14px]" : "text-muted text-[14px]"}>
            /project
          </span>
        </div>

        <p className={cn("text-[14px] leading-[1.5] mt-3", tier.highlighted ? "text-[#a09c92]" : "text-body")}>
          {tier.description}
        </p>
      </div>

      {/* CTA */}
      <Button asChild variant={tier.highlighted ? "secondary" : "ink"} size="default" className="w-full">
        <Link href={`/contact?plan=${tier.id}`}>{tier.cta}</Link>
      </Button>

      {/* Divider */}
      <div className={cn("h-px", tier.highlighted ? "bg-[#3d3b30]" : "bg-hairline")} />

      {/* Features */}
      <ul className="space-y-3">
        {tier.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-[14px]">
            <Check
              className={cn("mt-0.5 h-4 w-4 flex-shrink-0", tier.highlighted ? "text-[#a09c92]" : "text-ink")}
            />
            <span className={tier.highlighted ? "text-[#a09c92]" : "text-body"}>{feature}</span>
          </li>
        ))}
      </ul>
    </>
  )
}

export function PricingSection() {
  return (
    <section id="pricing" className="py-12 px-6 sm:py-20 bg-canvas">
      <div className="mx-auto max-w-[1200px]">

        {/* Header */}
        <AnimateIn className="mb-14">
          <p className="caption-uppercase mb-3"><EncryptedText text="Pricing" duration={800} /></p>
          <h2 className="display-lg max-w-xl">
            Transparent pricing.
            <br />
            No surprises.
          </h2>
          <p className="text-[16px] text-body leading-[1.5] mt-4 max-w-lg">
            Every tier is a complete solution — not feature nickels-and-diming.
          </p>
        </AnimateIn>

        <StaggerContainer className="grid grid-cols-1 gap-4 lg:grid-cols-3 items-start">
          {PRICING_TIERS.map((tier) =>
            tier.highlighted ? (
              /* ── Highlighted card: rotating gradient border ── */
              <StaggerItem key={tier.id} className="pt-5">
                {/* Outer wrapper: NOT overflow-hidden so badge isn't clipped */}
                <div className="relative">
                  {/* Most Popular badge — sits outside the overflow-hidden border ring */}
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1 rounded-full bg-canvas border border-hairline shadow-card z-20 whitespace-nowrap">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#1f8a65] animate-pulse" />
                    <span
                      className="text-[11px] font-medium text-ink"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      Most Popular
                    </span>
                  </div>

                  {/* Border ring wrapper: overflow-hidden clips the spinning gradient only */}
                  <div
                    className="relative overflow-hidden"
                    style={{ borderRadius: "13px", padding: "1px" }}
                  >
                    {/* Spinning conic gradient — shows through the 1px gap */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none"
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        width: "300%",
                        height: "300%",
                        transform: "translate(-50%, -50%)",
                        background:
                          "conic-gradient(from 0deg, transparent 38%, rgba(240,237,232,0.55) 50%, transparent 62%)",
                        animation: "rotate-border 5s linear infinite",
                      }}
                    />
                    {/* Inner card */}
                    <div
                      className="relative rounded-[12px] bg-ink p-8 flex flex-col gap-6"
                      style={{ boxShadow: "var(--shadow-featured)" }}
                    >
                      <TierCardContent tier={tier} />
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ) : (
              /* ── Standard card ── */
              <StaggerItem key={tier.id}>
                <div className="relative rounded-[12px] border border-hairline h-full">
                  <GlowingEffect disabled={false} spread={40} glow={false} proximity={64} inactiveZone={0.01} />
                  <div className="rounded-[12px] bg-surface text-ink p-8 flex flex-col gap-6 shadow-card">
                    <TierCardContent tier={tier} />
                  </div>
                </div>
              </StaggerItem>
            )
          )}
        </StaggerContainer>

        {/* Enterprise footnote */}
        <AnimateIn className="mt-8" delay={0.1}>
          <p className="text-[14px] text-muted">
            Need something custom?{" "}
            <Link href="/contact" className="text-ink underline underline-offset-4 hover:text-body transition-colors">
              Talk to us about enterprise solutions →
            </Link>
          </p>
        </AnimateIn>
      </div>
    </section>
  )
}
