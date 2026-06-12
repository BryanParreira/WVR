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
  duration = 0.6,
  direction = "up",
  distance = 24,
  once = true,
}: AnimateInProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, margin: "-80px" })

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        y: direction === "up" ? distance : direction === "down" ? -distance : 0,
        x: direction === "left" ? distance : direction === "right" ? -distance : 0,
      }}
      animate={
        isInView
          ? { opacity: 1, y: 0, x: 0 }
          : {
              opacity: 0,
              y:
                direction === "up"
                  ? distance
                  : direction === "down"
                  ? -distance
                  : 0,
              x:
                direction === "left"
                  ? distance
                  : direction === "right"
                  ? -distance
                  : 0,
            }
      }
      transition={{
        duration,
        delay,
        ease: [0.21, 1.11, 0.81, 0.99],
      }}
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
  staggerDelay = 0.1,
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
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: containerDelay,
          },
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
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: [0.21, 1.11, 0.81, 0.99] },
        },
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}
