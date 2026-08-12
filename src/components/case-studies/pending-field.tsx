import { isPlaceholder } from "@/lib/case-studies"

export function PendingField({ value, className }: { value: string; className?: string }) {
  if (!isPlaceholder(value)) {
    return <p className={className}>{value}</p>
  }
  return (
    <div
      className={`rounded-[8px] border border-dashed px-4 py-3 text-[13px] italic ${className ?? ""}`}
      style={{ borderColor: "var(--hairline-strong)", color: "var(--muted)" }}
    >
      Pending — awaiting real details from client engagement.
    </div>
  )
}
