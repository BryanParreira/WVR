"use client"

import { useEffect, useState } from "react"

export function ScrollProgressBar() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handle = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement
      const total = scrollHeight - clientHeight
      setProgress(total > 0 ? scrollTop / total : 0)
    }
    window.addEventListener("scroll", handle, { passive: true })
    handle()
    return () => window.removeEventListener("scroll", handle)
  }, [])

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 z-[200] h-[2px] pointer-events-none"
      style={{
        width: `${progress * 100}%`,
        background: "var(--ink)",
        opacity: progress > 0.005 ? 1 : 0,
        transition: "opacity 0.3s ease",
      }}
    />
  )
}
