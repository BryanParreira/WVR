"use client"

import Link from "next/link"
import { Check } from "lucide-react"
import { AnimateIn, StaggerContainer, StaggerItem } from "@/components/ui/animate-in"
import { Button } from "@/components/ui/button"
import { PRICING_TIERS } from "@/lib/constants"
import { cn } from "@/lib/utils"

export function PricingSection() {
  return (
    <section id="pricing" className="py-12 px-6 sm:py-20 bg-canvas">
      <div className="mx-auto max-w-[1200px]">

        {/* Header */}
        <AnimateIn className="mb-14">
          <p className="caption-uppercase mb-3">Pricing</p>
          <h2 className="display-lg max-w-xl">
            Transparent pricing.
            <br />
            No surprises.
          </h2>
          <p className="text-[16px] text-body leading-[1.5] mt-4 max-w-lg">
            Every tier is a complete solution — not feature nickels-and-diming.
          </p>
        </AnimateIn>

        {/* Cards — Cursor pricing spec:
            Standard: white surface + hairline
            Featured: ink inversion (dark card = the "highlighted" signal) */}
        <StaggerContainer className="grid grid-cols-1 gap-4 lg:grid-cols-3 items-start">
          {PRICING_TIERS.map((tier) => (
            <StaggerItem key={tier.id}>
              <div
                className={cn(
                  "rounded-[12px] p-8 flex flex-col gap-6",
                  tier.highlighted
                    ? "bg-ink text-canvas shadow-featured"
                    : "bg-surface text-ink shadow-card"
                )}
              >
                {/* Tier header */}
                <div>
                  <p
                    className={cn(
                      "caption-uppercase mb-3",
                      tier.highlighted ? "text-[#a09c92]" : "text-muted"
                    )}
                  >
                    {tier.name}
                  </p>
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
                  <p className={cn(
                    "text-[14px] leading-[1.5] mt-3",
                    tier.highlighted ? "text-[#a09c92]" : "text-body"
                  )}>
                    {tier.description}
                  </p>
                </div>

                {/* CTA */}
                <Button
                  asChild
                  variant={tier.highlighted ? "secondary" : "ink"}
                  size="default"
                  className="w-full"
                >
                  <Link href={`/contact?plan=${tier.id}`}>{tier.cta}</Link>
                </Button>

                {/* Hairline divider */}
                <div className={cn("h-px", tier.highlighted ? "bg-[#3d3b30]" : "bg-hairline")} />

                {/* Features */}
                <ul className="space-y-3">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-[14px]">
                      <Check
                        className={cn(
                          "mt-0.5 h-4 w-4 flex-shrink-0",
                          tier.highlighted ? "text-[#a09c92]" : "text-ink"
                        )}
                      />
                      <span className={tier.highlighted ? "text-[#a09c92]" : "text-body"}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </StaggerItem>
          ))}
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
