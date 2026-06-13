"use client"

import { TextHoverEffect } from "@/components/ui/text-hover-effect"

export function FooterWvr() {
  return (
    <div
      className="relative border-b"
      style={{
        background: "var(--canvas)",
        borderColor: "var(--hairline-strong)",
        height: "130px",
      }}
    >
      <TextHoverEffect text="WVR" duration={0.25} />
    </div>
  )
}
