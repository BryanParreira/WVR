"use client"

import { useId } from "react"

interface BackgroundBeamsProps {
  className?: string
  color?: string
}

/**
 * Aceternity-style converging beam lines.
 * Beams animate from edges toward a focal point with staggered dashoffset.
 */
export function BackgroundBeams({ className = "", color = "96,165,250" }: BackgroundBeamsProps) {
  const uid = useId().replace(/:/g, "")
  const W = 1200, H = 600
  const cx = W / 2
  const cy = H * 0.55

  const c  = (a: number) => `rgba(${color},${a})`

  const beams = [
    { d: `M0,0 Q${cx*0.3},${cy*0.4} ${cx},${cy}`,              delay: 0,    dur: 4.0, op: 0.35, len: 920 },
    { d: `M${W*0.15},0 Q${cx*0.5},${cy*0.3} ${cx},${cy}`,      delay: 0.8,  dur: 4.4, op: 0.22, len: 780 },
    { d: `M${W*0.32},0 Q${cx*0.7},${cy*0.2} ${cx},${cy}`,      delay: 1.6,  dur: 3.8, op: 0.16, len: 650 },
    { d: `M${W},0 Q${cx*1.7},${cy*0.4} ${cx},${cy}`,           delay: 0.4,  dur: 4.2, op: 0.35, len: 920 },
    { d: `M${W*0.85},0 Q${cx*1.5},${cy*0.3} ${cx},${cy}`,      delay: 1.2,  dur: 4.0, op: 0.22, len: 780 },
    { d: `M${W*0.68},0 Q${cx*1.3},${cy*0.2} ${cx},${cy}`,      delay: 2.0,  dur: 4.6, op: 0.16, len: 650 },
    { d: `M0,${H*0.28} Q${cx*0.25},${cy*0.7} ${cx},${cy}`,     delay: 1.0,  dur: 3.6, op: 0.14, len: 620 },
    { d: `M${W},${H*0.28} Q${cx*1.75},${cy*0.7} ${cx},${cy}`,  delay: 1.4,  dur: 3.8, op: 0.14, len: 620 },
  ]

  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice"
        width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
        <defs>
          {beams.map((_, i) => (
            <linearGradient key={i} id={`${uid}g${i}`} gradientUnits="userSpaceOnUse"
              x1="0" y1="0" x2={cx} y2={cy}>
              <stop offset="0%"   stopColor={c(0)} />
              <stop offset="55%"  stopColor={c(0.7)} />
              <stop offset="100%" stopColor={c(0.06)} />
            </linearGradient>
          ))}
          <radialGradient id={`${uid}f`} cx="50%" cy={`${(cy / H) * 100}%`} r="20%">
            <stop offset="0%"   stopColor={c(0.10)} />
            <stop offset="100%" stopColor={c(0)} />
          </radialGradient>
        </defs>

        {/* Focal glow at convergence */}
        <ellipse cx={cx} cy={cy} rx={200} ry={100} fill={`url(#${uid}f)`} />

        {beams.map((b, i) => (
          <path key={i} d={b.d} stroke={`url(#${uid}g${i})`} strokeWidth="1" fill="none"
            opacity={b.op} strokeDasharray={b.len} strokeDashoffset={b.len}>
            <animate attributeName="stroke-dashoffset"
              values={`${b.len};0;${b.len}`}
              dur={`${b.dur}s`} begin={`${b.delay}s`}
              repeatCount="indefinite" calcMode="ease" />
          </path>
        ))}

        {/* Focal dot */}
        <circle cx={cx} cy={cy} r={2.5} fill={c(0.6)}>
          <animate attributeName="opacity" values="0.4;1;0.4" dur="2.4s" repeatCount="indefinite" />
          <animate attributeName="r"       values="2;4;2"     dur="2.4s" repeatCount="indefinite" />
        </circle>
        <circle cx={cx} cy={cy} r={8} fill={c(0.08)}>
          <animate attributeName="r"       values="6;14;6"    dur="2.4s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.3;0;0.3" dur="2.4s" repeatCount="indefinite" />
        </circle>
      </svg>
    </div>
  )
}
