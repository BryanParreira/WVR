"use client"

import { useEffect, useState, useCallback, useRef } from "react"
import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react"
import { cn } from "@/lib/utils"

const TRANSITION_CSS = `
  ::view-transition-group(root) {
    animation-duration: 0.7s;
    animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
  }
  ::view-transition-new(root) {
    animation-name: wvr-reveal;
    filter: blur(2px);
  }
  ::view-transition-old(root),
  .dark::view-transition-old(root) {
    animation: none;
    z-index: -1;
  }
  .dark::view-transition-new(root) {
    animation-name: wvr-reveal;
    filter: blur(2px);
  }
  @keyframes wvr-reveal {
    from {
      clip-path: polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%);
      filter: blur(8px);
    }
    50% { filter: blur(4px); }
    to {
      clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
      filter: blur(0px);
    }
  }
`

function injectStyles() {
  const id = "wvr-theme-transition"
  let el = document.getElementById(id) as HTMLStyleElement | null
  if (!el) {
    el = document.createElement("style")
    el.id = id
    document.head.appendChild(el)
  }
  el.textContent = TRANSITION_CSS
}

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const toggle = useCallback(() => {
    const next = resolvedTheme === "dark" ? "light" : "dark"
    if (typeof document === "undefined") return
    injectStyles()
    if (!document.startViewTransition) {
      setTheme(next)
      return
    }
    document.startViewTransition(() => setTheme(next))
  }, [resolvedTheme, setTheme])

  if (!mounted) {
    return (
      <div
        className={cn("h-10 w-10 rounded-[8px] border border-hairline", className)}
        aria-hidden="true"
      />
    )
  }

  const isDark = resolvedTheme === "dark"

  return (
    <button
      onClick={toggle}
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
