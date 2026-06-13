"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { cn } from "@/lib/utils"

interface AnimateInProps {
  children: React.ReactNode
  className?: string
  delay?: number
  duration?: number
  direction?: "up" | "down" | "left" | "right" | "none"
  distance?: number
  once?: boolean
}

export function AnimateIn({
  children,
  className,
  delay = 0,
  duration = 0.65,
  direction = "up",
  distance = 28,
  once = true,
}: AnimateInProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, margin: "-80px" })

  const yIn  = direction === "up" ? distance : direction === "down" ? -distance : 0
  const xIn  = direction === "left" ? distance : direction === "right" ? -distance : 0

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: yIn, x: xIn, filter: "blur(6px)", scale: 0.98 }}
      animate={isInView
        ? { opacity: 1, y: 0, x: 0, filter: "blur(0px)", scale: 1 }
        : { opacity: 0, y: yIn, x: xIn, filter: "blur(6px)", scale: 0.98 }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}

interface StaggerContainerProps {
  children: React.ReactNode
  className?: string
  staggerDelay?: number
  containerDelay?: number
}

export function StaggerContainer({
  children,
  className,
  staggerDelay = 0.12,
  containerDelay = 0,
}: StaggerContainerProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        visible: {
          transition: { staggerChildren: staggerDelay, delayChildren: containerDelay },
        },
        hidden: {},
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <motion.div
      variants={{
        hidden:   { opacity: 0, y: 24, filter: "blur(8px)", scale: 0.97 },
        visible:  {
          opacity: 1, y: 0, filter: "blur(0px)", scale: 1,
          transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
        },
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}
