import { GlowingEffect } from "@/components/ui/glowing-effect"

export function DirectAnswer({ text }: { text: string }) {
  return (
    <div className="relative my-2 rounded-[10px] border border-hairline">
      <GlowingEffect disabled={false} spread={40} glow={false} proximity={64} inactiveZone={0.01} />
      <div className="rounded-[10px] px-5 py-4" style={{ background: "var(--surface)" }}>
        <p className="caption-uppercase mb-2 text-muted">Short answer</p>
        <p className="text-[15px] leading-[1.65] text-ink">{text}</p>
      </div>
    </div>
  )
}
