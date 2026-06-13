"use client"

import { TextHoverEffect } from "@/components/ui/text-hover-effect"

export function FooterWvr() {
  return (
    <div
      className="relative border-b"
      style={{
        background: "#0f0e0c",
        borderColor: "#2a2825",
        height: "130px",
      }}
    >
      <TextHoverEffect text="WVR" duration={0.25} />
    </div>
  )
}
