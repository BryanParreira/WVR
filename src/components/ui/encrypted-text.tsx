"use client"

import { useEffect, useRef, useState } from "react"
import { useInView } from "framer-motion"

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*"

interface EncryptedTextProps {
  text: string
  duration?: number
  delay?: number
  className?: string
  scrambleOnMount?: boolean
  trigger?: "inView" | "always"
}

export function EncryptedText({
  text,
  duration = 900,
  delay = 0,
  className = "",
  scrambleOnMount = true,
  trigger = "inView",
}: EncryptedTextProps) {
  const [display, setDisplay] = useState(scrambleOnMount ? randomize(text) : text)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })
  const rafRef = useRef<number | null>(null)
  const resolvedRef = useRef(false)

  function randomize(str: string) {
    return str
      .split("")
      .map(c => (c === " " ? " " : CHARS[Math.floor(Math.random() * CHARS.length)]))
      .join("")
  }

  function resolve() {
    if (resolvedRef.current) return
    resolvedRef.current = true
    const start = Date.now()
    const step = () => {
      const elapsed = Date.now() - start
      const progress = Math.min(elapsed / duration, 1)
      const resolved = Math.floor(progress * text.length)
      const scrambled = text
        .split("")
        .map((c, i) => {
          if (c === " ") return " "
          if (i < resolved) return c
          return CHARS[Math.floor(Math.random() * CHARS.length)]
        })
        .join("")
      setDisplay(scrambled)
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step)
      } else {
        setDisplay(text)
      }
    }
    rafRef.current = requestAnimationFrame(step)
  }

  useEffect(() => {
    if (trigger === "inView" && isInView) {
      const t = setTimeout(resolve, delay)
      return () => {
        clearTimeout(t)
        if (rafRef.current) cancelAnimationFrame(rafRef.current)
      }
    }
    if (trigger === "always") {
      const t = setTimeout(resolve, delay)
      return () => {
        clearTimeout(t)
        if (rafRef.current) cancelAnimationFrame(rafRef.current)
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView, trigger, delay])

  return (
    <span ref={ref} className={className} aria-label={text} style={{ fontFamily: "inherit" }}>
      {display}
    </span>
  )
}
