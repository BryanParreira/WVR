type ProgressiveBlurProps = {
  className?: string
  backgroundColor?: string
  position?: "top" | "bottom"
  height?: string
  blurAmount?: string
  fixed?: boolean
  topOffset?: string
}

export function ProgressiveBlur({
  className = "",
  backgroundColor = "var(--canvas)",
  position = "top",
  height = "80px",
  blurAmount = "4px",
  fixed = false,
  topOffset,
}: ProgressiveBlurProps) {
  const isTop = position === "top"

  return (
    <div
      aria-hidden
      className={`pointer-events-none left-0 w-full select-none z-30 ${className}`}
      style={{
        position: fixed ? "fixed" : "absolute",
        [isTop ? "top" : "bottom"]: isTop && topOffset ? topOffset : 0,
        height,
        background: isTop
          ? `linear-gradient(to top, transparent, ${backgroundColor})`
          : `linear-gradient(to bottom, transparent, ${backgroundColor})`,
        maskImage: isTop
          ? `linear-gradient(to bottom, ${backgroundColor} 50%, transparent)`
          : `linear-gradient(to top, ${backgroundColor} 50%, transparent)`,
        WebkitBackdropFilter: `blur(${blurAmount})`,
        backdropFilter: `blur(${blurAmount})`,
      }}
    />
  )
}
