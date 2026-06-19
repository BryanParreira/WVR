export function PageLoading() {
  return (
    <div
      className="flex min-h-screen w-full flex-col"
      style={{ background: "var(--canvas)" }}
    >
      {/* Header skeleton */}
      <div
        className="flex h-16 items-center justify-between border-b px-6"
        style={{ borderColor: "var(--hairline)" }}
      >
        <div
          className="h-9 w-28 animate-pulse rounded-[6px]"
          style={{ background: "var(--surface-strong)" }}
        />
        <div className="hidden items-center gap-3 md:flex">
          {[80, 64, 56, 48, 64, 72].map((w, i) => (
            <div
              key={i}
              className="h-7 animate-pulse rounded-[6px]"
              style={{ width: w, background: "var(--surface-strong)" }}
            />
          ))}
        </div>
        <div
          className="h-9 w-24 animate-pulse rounded-[8px]"
          style={{ background: "var(--surface-strong)" }}
        />
      </div>

      {/* Content skeleton */}
      <div className="flex-1 px-6 pt-16">
        <div className="mx-auto max-w-[1200px] space-y-6">
          <div
            className="h-3 w-24 animate-pulse rounded-full"
            style={{ background: "var(--surface-strong)" }}
          />
          <div
            className="h-12 w-3/4 animate-pulse rounded-[8px]"
            style={{ background: "var(--surface-strong)" }}
          />
          <div
            className="h-5 w-1/2 animate-pulse rounded-full"
            style={{ background: "var(--surface-strong)" }}
          />
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-48 animate-pulse rounded-[10px]"
                style={{ background: "var(--surface-strong)" }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
