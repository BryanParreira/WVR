"use client"

import { useEffect, useRef, useState } from "react"
import { useInView } from "framer-motion"

interface CountUpProps {
  value: string
  duration?: number
  className?: string
  style?: React.CSSProperties
}

function parse(raw: string): { num: number; prefix: string; suffix: string; decimals: number } {
  const match = raw.match(/^([^0-9]*)([0-9]+\.?[0-9]*)(.*)$/)
  if (!match) return { num: 0, prefix: raw, suffix: "", decimals: 0 }
  const num = parseFloat(match[2])
  const decimals = match[2].includes(".") ? match[2].split(".")[1].length : 0
  return { num, prefix: match[1], suffix: match[3], decimals }
}

export function CountUp({ value, duration = 1.8, className, style }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })
  const [current, setCurrent] = useState(0)
  const { num, prefix, suffix, decimals } = parse(value)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    if (!isInView) return
    if (num === 0) { setCurrent(0); return }

    const startTime = performance.now()
    const ms = duration * 1000

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / ms, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCurrent(eased * num)
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        setCurrent(num)
      }
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [isInView, num, duration])

  return (
    <span ref={ref} className={className} style={style}>
      {prefix}{current.toFixed(decimals)}{suffix}
    </span>
  )
}
