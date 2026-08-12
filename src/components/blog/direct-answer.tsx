export function DirectAnswer({ text }: { text: string }) {
  return (
    <div
      className="my-2 rounded-[10px] border-l-2 px-5 py-4"
      style={{ borderColor: "var(--ink)", background: "var(--surface)" }}
    >
      <p className="caption-uppercase mb-2 text-muted">Short answer</p>
      <p className="text-[15px] leading-[1.65] text-ink">{text}</p>
    </div>
  )
}
