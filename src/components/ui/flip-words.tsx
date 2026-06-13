"use client"

import { AnimatePresence, motion } from "framer-motion"
import { useCallback, useEffect, useState } from "react"

interface FlipWordsProps {
  words: string[]
  duration?: number
  className?: string
}

export function FlipWords({ words, duration = 3000, className = "" }: FlipWordsProps) {
  const [idx, setIdx] = useState(0)

  const next = useCallback(() => {
    setIdx(i => (i + 1) % words.length)
  }, [words.length])

  useEffect(() => {
    const t = setInterval(next, duration)
    return () => clearInterval(t)
  }, [duration, next])

  return (
    <span className={`relative inline-block overflow-hidden ${className}`}>
      <AnimatePresence mode="wait">
        <motion.span
          key={idx}
          initial={{ opacity: 0, y: 22, filter: "blur(8px)" }}
          animate={{ opacity: 1,  y: 0,  filter: "blur(0px)" }}
          exit={{    opacity: 0,  y: -18, filter: "blur(6px)" }}
          transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
          className="inline-block whitespace-nowrap"
        >
          {words[idx]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}
