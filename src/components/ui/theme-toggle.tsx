"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react"
import { cn } from "@/lib/utils"

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch — only render icon after mount
  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return (
      <div
        className={cn(
          "h-10 w-10 rounded-[8px] border border-hairline",
          className
        )}
        aria-hidden="true"
      />
    )
  }

  const isDark = resolvedTheme === "dark"

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "flex h-10 w-10 items-center justify-center rounded-[8px] border border-hairline text-muted transition-colors duration-150 hover:text-ink hover:border-hairline-strong",
        className
      )}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? (
        <Sun className="h-[17px] w-[17px]" strokeWidth={1.75} />
      ) : (
        <Moon className="h-[17px] w-[17px]" strokeWidth={1.75} />
      )}
    </button>
  )
}
