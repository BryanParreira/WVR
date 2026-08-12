export function FaqBlock({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="py-10">
      <h2 className="mb-6 text-[18px] font-semibold leading-[1.3] tracking-[-0.02em] text-ink">
        Frequently asked questions
      </h2>
      <div className="space-y-6">
        {items.map(({ q, a }) => (
          <div key={q}>
            <h3 className="mb-1.5 text-[15px] font-semibold text-ink">{q}</h3>
            <p className="text-[15px] leading-[1.7] text-body">{a}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
