"use client";

import { motion } from "framer-motion";
import React from "react";

import { cn } from "@/lib/utils";

const STAGGER = 0.035;

const TextRoll: React.FC<{
  children: string;
  className?: string;
  center?: boolean;
}> = ({ children, className, center = false }) => {
  return (
    <motion.span
      initial="initial"
      whileHover="hovered"
      className={cn("relative block overflow-hidden", className)}
      style={{ lineHeight: 0.85 }}
    >
      <div aria-hidden>
        {children.split("").map((l, i) => {
          const delay = center
            ? STAGGER * Math.abs(i - (children.length - 1) / 2)
            : STAGGER * i;
          return (
            <motion.span
              key={i}
              variants={{ initial: { y: 0 }, hovered: { y: "-100%" } }}
              transition={{ ease: "easeInOut", delay }}
              className="inline-block"
            >
              {l === " " ? " " : l}
            </motion.span>
          );
        })}
      </div>
      <div className="absolute inset-0" aria-hidden>
        {children.split("").map((l, i) => {
          const delay = center
            ? STAGGER * Math.abs(i - (children.length - 1) / 2)
            : STAGGER * i;
          return (
            <motion.span
              key={i}
              variants={{ initial: { y: "100%" }, hovered: { y: 0 } }}
              transition={{ ease: "easeInOut", delay }}
              className="inline-block"
            >
              {l === " " ? " " : l}
            </motion.span>
          );
        })}
      </div>
      <span className="sr-only">{children}</span>
    </motion.span>
  );
};

export { TextRoll };
