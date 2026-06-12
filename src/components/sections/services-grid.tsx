"use client"

import Link from "next/link"
import { ArrowRight, Bot, Shield, TrendingUp, Code2, Zap, BarChart3 } from "lucide-react"
import { StaggerContainer, StaggerItem, AnimateIn } from "@/components/ui/animate-in"
import { SERVICES } from "@/lib/constants"

const iconMap: Record<string, React.ElementType> = {
  Bot, Shield, TrendingUp, Code2, Zap, BarChart3,
}

export function ServicesGrid({ limit }: { limit?: number }) {
  const services = limit ? SERVICES.slice(0, limit) : SERVICES

  return (
    <section id="services" className="py-12 px-6 sm:py-20 bg-canvas">
      <div className="mx-auto max-w-[1200px]">

        <AnimateIn className="mb-14">
          <p className="caption-uppercase mb-3">What We Do</p>
          <h2 className="display-lg max-w-2xl">
            Everything your business needs,
            <br />
            under one roof.
          </h2>
        </AnimateIn>

        <StaggerContainer className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = iconMap[service.icon] ?? Zap
            return (
              <StaggerItem key={service.id}>
                <Link
                  href={service.href}
                  className="group block rounded-[12px] bg-surface p-6 shadow-card"
                >
                  {/* Icon */}
                  <div className="mb-5 flex h-9 w-9 items-center justify-center rounded-[8px] bg-canvas-soft border border-hairline text-body transition-all duration-200 group-hover:text-ink group-hover:border-hairline-strong">
                    <Icon className="h-4.5 w-4.5" strokeWidth={1.75} />
                  </div>

                  {/* Title */}
                  <h3 className="text-[18px] font-semibold leading-[1.4] text-ink mb-2">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[15px] text-body leading-[1.5] mb-5">
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-1.5 mb-5">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-[13px] text-muted">
                        <span className="mt-[6px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-ink/20 group-hover:bg-ink/60 transition-all duration-200" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <div className="flex items-center gap-1.5 text-[14px] font-medium text-muted group-hover:text-ink transition-colors duration-150">
                    Learn more
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                  </div>
                </Link>
              </StaggerItem>
            )
          })}
        </StaggerContainer>

        {limit && (
          <AnimateIn className="mt-10" delay={0.1}>
            <Link
              href="/services"
              className="inline-flex items-center gap-1.5 text-[14px] font-medium text-ink hover:text-body transition-colors duration-150"
            >
              View all services
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </AnimateIn>
        )}
      </div>
    </section>
  )
}
