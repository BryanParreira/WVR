"use client"

import { useRef, useState, useEffect } from "react"
import { TextGenerateEffect } from "@/components/ui/text-generate-effect"

interface TextGenerateScrollProps {
  words: string
  className?: string
  filter?: boolean
  duration?: number
}

export function TextGenerateScroll({ words, className, filter, duration }: TextGenerateScrollProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [triggered, setTriggered] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggered(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15, rootMargin: "-40px" }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref}>
      {triggered && (
        <TextGenerateEffect words={words} className={className} filter={filter} duration={duration} />
      )}
      {!triggered && (
        <div className="opacity-0" style={{ minHeight: "1.4em" }}>
          {words}
        </div>
      )}
    </div>
  )
}
