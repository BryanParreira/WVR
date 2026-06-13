"use client"

import { useEffect, useState, useId, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { AnimateIn } from "@/components/ui/animate-in"

// Card-internal dark palette (cards are always dark on the canvas bg)
const C = {
  card:    "#111010",
  inner:   "#0d0c0b",
  border:  "rgba(255,255,255,0.065)",
  iborder: "rgba(255,255,255,0.05)",
  ink:     "#f0ede8",
  body:    "#7a7672",
  muted:   "#3d3b38",
  blue:    "#60a5fa",
  green:   "#4ade80",
  amber:   "#fbbf24",
  red:     "#f87171",
}

// ── Mini window chrome ────────────────────────────────────────────────────────

function WindowChrome({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 px-4 py-2.5"
      style={{ borderBottom: `1px solid ${C.iborder}` }}>
      <span className="h-[7px] w-[7px] rounded-full" style={{ background: "#3a3836" }} />
      <span className="h-[7px] w-[7px] rounded-full" style={{ background: "#3a3836" }} />
      <span className="h-[7px] w-[7px] rounded-full" style={{ background: "#3a3836" }} />
      <span className="ml-2 text-[10px]"
        style={{ fontFamily: "monospace", color: C.muted, letterSpacing: "0.04em" }}>{label}</span>
    </div>
  )
}

// ── Card 1 — AI Agent Console (col-span-2) ────────────────────────────────────

const AGENTS = [
  { name: "Content Strategy",  status: "Running",  color: C.blue,   dot: true  },
  { name: "Code Reviewer",     status: "Complete", color: C.green,  dot: false },
  { name: "Security Audit",    status: "Active",   color: C.blue,   dot: true  },
  { name: "GEO Analysis",      status: "Queued",   color: C.muted,  dot: false },
]
const BARS: Record<string, number> = {
  "Running": 0.62,
  "Complete": 1.0,
  "Active": 0.38,
  "Queued": 0.0,
}

function AIPipelineCard() {
  const uid = useId().replace(/:/g, "")
  const [count, setCount] = useState(847)
  const [activeRow, setActive] = useState(0)

  useEffect(() => {
    const t1 = setInterval(() => setCount(c => c + 1), 3100)
    const t2 = setInterval(() => setActive(i => (i + 1) % AGENTS.length), 2200)
    return () => { clearInterval(t1); clearInterval(t2) }
  }, [])

  // Edge SVG for mini node graph
  const nodes = [
    { x: 32,  y: 40, c: C.blue   },
    { x: 100, y: 40, c: "#818cf8" },
    { x: 168, y: 16, c: C.blue   },
    { x: 168, y: 64, c: "#93c5fd" },
    { x: 236, y: 40, c: C.green  },
  ]
  const edges = [
    { d: "M32,40 L100,40",             id: `${uid}a` },
    { d: "M100,40 C134,40 134,16 168,16", id: `${uid}b` },
    { d: "M100,40 C134,40 134,64 168,64", id: `${uid}c` },
    { d: "M168,16 C202,16 202,40 236,40", id: `${uid}d` },
    { d: "M168,64 C202,64 202,40 236,40", id: `${uid}e` },
  ]

  return (
    <div className="platform-card rounded-[14px] overflow-hidden h-full flex flex-col" style={{ background: C.card }}>
      {/* Visual area */}
      <div className="flex-1 p-4 flex flex-col gap-3">
        {/* Agent list mock */}
        <div className="rounded-[10px] overflow-hidden flex-1"
          style={{ background: C.inner, border: `1px solid ${C.iborder}` }}>
          <WindowChrome label="wvr — agent console" />

          {/* Active count header */}
          <div className="flex items-center justify-between px-4 py-2.5"
            style={{ borderBottom: `1px solid ${C.iborder}` }}>
            <span style={{ fontFamily: "monospace", fontSize: "11px", color: C.muted }}>All Agents</span>
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full"
              style={{ background: "rgba(96,165,250,0.12)", border: `1px solid rgba(96,165,250,0.2)` }}>
              <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ background: C.blue }} />
              <span style={{ fontFamily: "monospace", fontSize: "10px", color: C.blue }}>{count}</span>
            </div>
          </div>

          {/* Agent rows */}
          <div className="divide-y" style={{ borderColor: C.iborder }}>
            {AGENTS.map((ag, i) => (
              <div key={ag.name}
                className="flex items-center gap-3 px-4 py-2.5 transition-colors duration-300"
                style={{ background: i === activeRow ? "rgba(96,165,250,0.04)" : "transparent" }}>
                <div className="h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${C.iborder}` }}>
                  <span style={{ fontSize: "9px", color: C.body }}>⬡</span>
                </div>
                <span className="flex-1 text-[12px]"
                  style={{ fontFamily: "monospace", color: i === activeRow ? C.ink : C.body }}>
                  {ag.name}
                </span>
                {/* Progress bar */}
                <div className="w-20 h-[3px] rounded-full overflow-hidden"
                  style={{ background: "rgba(255,255,255,0.06)" }}>
                  <div className="h-full rounded-full"
                    style={{
                      width: `${BARS[ag.status] * 100}%`,
                      background: ag.status === "Complete" ? C.green : ag.status === "Queued" ? C.muted : C.blue,
                      transition: "width 0.8s ease",
                    }} />
                </div>
                {/* Status badge */}
                <span className="text-[9px] px-2 py-0.5 rounded-full flex-shrink-0"
                  style={{
                    fontFamily: "monospace",
                    letterSpacing: "0.04em",
                    background: ag.status === "Complete"
                      ? "rgba(74,222,128,0.1)"
                      : ag.status === "Queued"
                      ? "rgba(255,255,255,0.04)"
                      : "rgba(96,165,250,0.1)",
                    color: ag.status === "Complete" ? C.green : ag.status === "Queued" ? C.muted : C.blue,
                    border: `1px solid ${ag.status === "Complete" ? "rgba(74,222,128,0.2)" : ag.status === "Queued" ? C.iborder : "rgba(96,165,250,0.2)"}`,
                  }}>
                  {ag.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Mini node graph — below list */}
        <div className="rounded-[10px] px-5 py-3 flex items-center justify-between"
          style={{ background: C.inner, border: `1px solid ${C.iborder}` }}>
          <svg viewBox="0 0 268 80" width={220} height={52} style={{ overflow: "visible" }}>
            <defs>
              {edges.map(e => <path key={e.id} id={e.id} d={e.d} />)}
            </defs>
            {edges.map(e => (
              <path key={e.id} d={e.d} stroke="rgba(255,255,255,0.08)" strokeWidth="1" fill="none" />
            ))}
            {edges.map((e, i) => (
              <circle key={`p${i}`} r="2.5" fill={nodes[Math.min(i+1, nodes.length-1)].c} opacity="0.8">
                <animateMotion dur={`${1.4 + i * 0.18}s`} repeatCount="indefinite" begin={`${i * 0.3}s`}>
                  <mpath href={`#${e.id}`} />
                </animateMotion>
              </circle>
            ))}
            {nodes.map((n, i) => (
              <g key={i}>
                <circle cx={n.x} cy={n.y} r={10} fill="#0d0c0b" stroke={n.c} strokeWidth="1" strokeOpacity="0.5" />
                <circle cx={n.x} cy={n.y} r={3}  fill={n.c} fillOpacity="0.9" />
              </g>
            ))}
          </svg>
          <div className="text-right">
            <div style={{ fontFamily: "monospace", fontSize: "11px", color: C.body }}>pipeline latency</div>
            <div style={{ fontFamily: "monospace", fontSize: "18px", fontWeight: 700, color: C.blue, lineHeight: 1.2 }}>48ms</div>
          </div>
        </div>
      </div>

      {/* Caption */}
      <div className="px-5 py-5" style={{ borderTop: `1px solid ${C.iborder}` }}>
        <p className="text-[14px] font-medium mb-0.5" style={{ color: C.ink }}>AI Agent Pipeline</p>
        <p className="text-[12px]" style={{ color: C.body }}>Multi-model orchestration. Autonomous agents route, retrieve, and respond.</p>
      </div>
    </div>
  )
}

// ── Card 2 — Security Monitor (col-span-1) ────────────────────────────────────

const SEC_NODES = [
  { x: 80, y: 40 }, { x: 38, y: 18 }, { x: 38, y: 62 },
  { x: 122, y: 18 }, { x: 122, y: 62 }, { x: 158, y: 40 },
]
const SEC_EDGES = [
  "M80,40 L38,18", "M80,40 L38,62",
  "M80,40 L122,18", "M80,40 L122,62",
  "M80,40 L158,40",
]

function SecurityCard() {
  const [scan, setScan] = useState(1247)

  useEffect(() => {
    const t = setInterval(() => setScan(n => n + Math.floor(Math.random() * 4 + 1)), 1800)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="platform-card rounded-[14px] overflow-hidden h-full flex flex-col" style={{ background: C.card }}>
      <div className="flex-1 p-4">
        <div className="rounded-[10px] overflow-hidden h-full"
          style={{ background: C.inner, border: `1px solid ${C.iborder}` }}>
          <WindowChrome label="zero trust monitor" />

          {/* Stat */}
          <div className="flex flex-col items-center pt-5 pb-3">
            <div className="text-[11px] mb-1" style={{ fontFamily: "monospace", color: C.muted }}>
              +{scan.toLocaleString()} protected
            </div>

            {/* Node graph */}
            <svg viewBox="0 0 196 80" width={160} height={68}>
              {SEC_EDGES.map((d, i) => (
                <path key={i} d={d} stroke="rgba(74,222,128,0.18)" strokeWidth="1" fill="none" />
              ))}
              {SEC_NODES.map((n, i) => (
                <g key={i}>
                  <circle cx={n.x} cy={n.y} r={i === 0 ? 14 : 8}
                    fill={i === 0 ? "rgba(74,222,128,0.08)" : "rgba(255,255,255,0.03)"}
                    stroke={i === 0 ? C.green : "rgba(255,255,255,0.08)"}
                    strokeWidth="1" />
                  {i === 0 && (
                    <circle cx={n.x} cy={n.y} r={4} fill={C.green} fillOpacity="0.9">
                      <animate attributeName="opacity" values="0.9;0.4;0.9" dur="2s" repeatCount="indefinite" />
                    </circle>
                  )}
                  {i > 0 && <circle cx={n.x} cy={n.y} r={2.5} fill="rgba(255,255,255,0.2)" />}
                </g>
              ))}
            </svg>

            {/* Status rows */}
            <div className="w-full px-4 pt-2 space-y-2">
              {[
                { label: "Zero Trust",  badge: "Active",    c: C.green },
                { label: "Firewall",    badge: "3 layers",  c: C.blue  },
                { label: "Incidents",   badge: "0 total",   c: C.green },
              ].map(item => (
                <div key={item.label} className="flex items-center justify-between">
                  <span style={{ fontFamily: "monospace", fontSize: "11px", color: C.body }}>{item.label}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full"
                    style={{
                      fontFamily: "monospace",
                      color: item.c,
                      background: item.c === C.green ? "rgba(74,222,128,0.1)" : "rgba(96,165,250,0.1)",
                      border: `1px solid ${item.c === C.green ? "rgba(74,222,128,0.2)" : "rgba(96,165,250,0.2)"}`,
                    }}>
                    {item.badge}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="px-5 py-5" style={{ borderTop: `1px solid ${C.iborder}` }}>
        <p className="text-[14px] font-medium mb-0.5" style={{ color: C.ink }}>Zero Trust Security</p>
        <p className="text-[12px]" style={{ color: C.body }}>Enterprise protection. 0 client breaches. Always on.</p>
      </div>
    </div>
  )
}

// ── Card 3 — GEO Rankings (col-span-1) ───────────────────────────────────────

const GEO_KWS = [
  { q: "AI automation agency",  rank: 1, pct: 96 },
  { q: "GEO optimization",      rank: 1, pct: 94 },
  { q: "Zero trust security",   rank: 3, pct: 74 },
  { q: "Custom AI dev",         rank: 4, pct: 61 },
]

// Small sparkline
const SPARK = [30, 38, 34, 48, 52, 58, 62, 72, 68, 82, 88, 94]

function GEOCard() {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-40px" })
  const [go, setGo] = useState(false)
  useEffect(() => { if (inView) setGo(true) }, [inView])

  const W = 168, H = 36
  const pts = SPARK.map((v, i) => ({
    x: (i / (SPARK.length - 1)) * W,
    y: H - (v / 100) * H,
  }))
  const line = pts.reduce((acc, p, i) => {
    if (i === 0) return `M${p.x.toFixed(1)},${p.y.toFixed(1)}`
    const pr = pts[i - 1]
    const cx = ((pr.x + p.x) / 2).toFixed(1)
    return `${acc} C${cx},${pr.y.toFixed(1)} ${cx},${p.y.toFixed(1)} ${p.x.toFixed(1)},${p.y.toFixed(1)}`
  }, "")

  return (
    <div className="platform-card rounded-[14px] overflow-hidden h-full flex flex-col" style={{ background: C.card }}>
      <div className="flex-1 p-4">
        <div className="rounded-[10px] overflow-hidden h-full"
          style={{ background: C.inner, border: `1px solid ${C.iborder}` }}>
          <WindowChrome label="geo intelligence" />

          {/* Traffic growth header */}
          <div className="px-4 pt-4 pb-3" style={{ borderBottom: `1px solid ${C.iborder}` }}>
            <div className="flex items-end justify-between mb-2">
              <div>
                <div style={{ fontFamily: "monospace", fontSize: "22px", fontWeight: 700, color: C.blue, lineHeight: 1 }}>+3×</div>
                <div style={{ fontFamily: "monospace", fontSize: "10px", color: C.muted }}>organic traffic</div>
              </div>
              <span className="text-[9px] px-2 py-0.5 rounded-full"
                style={{ fontFamily: "monospace", color: C.green, background: "rgba(74,222,128,0.1)", border: `1px solid rgba(74,222,128,0.2)` }}>
                ↑ trending
              </span>
            </div>
            {/* Sparkline */}
            <svg viewBox={`0 0 ${W} ${H}`} width="100%" height={H} aria-hidden>
              <defs>
                <linearGradient id="geo-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={C.blue} stopOpacity="0.2" />
                  <stop offset="100%" stopColor={C.blue} stopOpacity="0.01" />
                </linearGradient>
              </defs>
              <path d={`${line} L${W},${H} L0,${H}Z`} fill="url(#geo-grad)" />
              <path d={line} fill="none" stroke={C.blue} strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>

          {/* Keyword rows */}
          <div ref={ref} className="divide-y" style={{ borderColor: C.iborder }}>
            {GEO_KWS.map((kw, i) => (
              <div key={kw.q} className="px-4 py-2">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-[9px] font-bold px-1.5 rounded flex-shrink-0"
                      style={{
                        fontFamily: "monospace",
                        color: kw.rank === 1 ? C.blue : C.muted,
                        background: kw.rank === 1 ? "rgba(96,165,250,0.12)" : "rgba(255,255,255,0.04)",
                      }}>
                      #{kw.rank}
                    </span>
                    <span className="truncate text-[11px]" style={{ fontFamily: "monospace", color: C.body }}>{kw.q}</span>
                  </div>
                  <span style={{ fontFamily: "monospace", fontSize: "11px", color: kw.pct >= 90 ? C.blue : C.body, marginLeft: "8px", flexShrink: 0 }}>
                    {kw.pct}%
                  </span>
                </div>
                <div className="h-[2px] rounded-full" style={{ background: "rgba(255,255,255,0.05)" }}>
                  <div className="h-full rounded-full"
                    style={{
                      width: go ? `${kw.pct}%` : "0%",
                      background: kw.rank === 1 ? C.blue : "rgba(255,255,255,0.18)",
                      transition: `width 1s cubic-bezier(0.16,1,0.3,1) ${i * 0.08}s`,
                    }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="px-5 py-5" style={{ borderTop: `1px solid ${C.iborder}` }}>
        <p className="text-[14px] font-medium mb-0.5" style={{ color: C.ink }}>GEO Intelligence</p>
        <p className="text-[12px]" style={{ color: C.body }}>AI-visible from day one. Ranked on Google and every AI engine.</p>
      </div>
    </div>
  )
}

// ── Card 4 — Performance (col-span-2) ────────────────────────────────────────

const PERF_TOOLS = [
  { label: "Lighthouse",   x: 68,  y: 50, c: "#f59e0b" },
  { label: "Web Vitals",   x: 148, y: 20, c: C.blue    },
  { label: "Uptime",       x: 148, y: 80, c: C.green   },
  { label: "Analytics",   x: 228, y: 50, c: "#a78bfa"  },
]
const PERF_EDGES = [
  "M68,50 L148,20", "M68,50 L148,80",
  "M148,20 L228,50", "M148,80 L228,50",
]

function PerformanceCard() {
  const uid = useId().replace(/:/g, "")
  const [req, setReq] = useState(12400)

  useEffect(() => {
    const t = setInterval(() => setReq(v => Math.max(10000, Math.min(18000, v + Math.floor(Math.random() * 200 - 80)))), 2000)
    return () => clearInterval(t)
  }, [])

  const BAR_HEIGHTS = [0.4, 0.55, 0.48, 0.7, 0.6, 0.82, 0.72, 0.9, 0.78, 0.88, 0.85, 0.94, 0.88, 1.0, 0.9, 0.96]

  return (
    <div className="platform-card rounded-[14px] overflow-hidden h-full flex flex-col" style={{ background: C.card }}>
      <div className="flex-1 p-4 flex flex-col gap-3">
        {/* Metrics row */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Speed Score",  value: "98",    sub: "/ 100",  c: C.blue   },
            { label: "LCP",          value: "0.8s",  sub: "load",   c: C.ink    },
            { label: "Uptime SLA",   value: "99.9%", sub: "always", c: C.green  },
          ].map(m => (
            <div key={m.label} className="rounded-[10px] flex flex-col items-center py-4 gap-1"
              style={{ background: C.inner, border: `1px solid ${C.iborder}` }}>
              <span style={{ fontFamily: "monospace", fontSize: "22px", fontWeight: 700, color: m.c, lineHeight: 1 }}>{m.value}</span>
              <span style={{ fontFamily: "monospace", fontSize: "9px", color: C.muted, letterSpacing: "0.06em" }}>{m.sub}</span>
              <span style={{ fontFamily: "monospace", fontSize: "9px", color: C.muted, textTransform: "uppercase", letterSpacing: "0.08em" }}>{m.label}</span>
            </div>
          ))}
        </div>

        {/* Integration node graph */}
        <div className="flex-1 rounded-[10px] flex flex-col overflow-hidden"
          style={{ background: C.inner, border: `1px solid ${C.iborder}` }}>
          <WindowChrome label="platform integrations" />
          <div className="flex items-center justify-between px-5 py-3 flex-1">
            <svg viewBox="0 0 296 100" width={220} height={72} style={{ overflow: "visible" }}>
              <defs>
                {PERF_EDGES.map((d, i) => <path key={`pe${uid}${i}`} id={`pe${uid}${i}`} d={d} />)}
              </defs>
              {PERF_EDGES.map((d, i) => (
                <path key={i} d={d} stroke="rgba(255,255,255,0.07)" strokeWidth="1" fill="none" />
              ))}
              {PERF_EDGES.map((d, i) => (
                <circle key={`dot${i}`} r="2.5" fill={PERF_TOOLS[i % PERF_TOOLS.length].c} opacity="0.8">
                  <animateMotion dur={`${1.6 + i * 0.2}s`} repeatCount="indefinite" begin={`${i * 0.4}s`}>
                    <mpath href={`#pe${uid}${i}`} />
                  </animateMotion>
                </circle>
              ))}
              {PERF_TOOLS.map((n, i) => (
                <g key={i}>
                  <circle cx={n.x} cy={n.y} r={14} fill={n.c} fillOpacity="0.07" stroke={n.c} strokeWidth="1" strokeOpacity="0.3" />
                  <text x={n.x} y={n.y + 3.5} textAnchor="middle" fontSize="8"
                    style={{ fontFamily: "monospace", fill: n.c, fontWeight: 600 }}>
                    {n.label.slice(0, 2)}
                  </text>
                  <text x={n.x} y={n.y + 27} textAnchor="middle" fontSize="7.5"
                    style={{ fontFamily: "monospace", fill: C.muted }}>
                    {n.label}
                  </text>
                </g>
              ))}
              {/* Center "Connected" badge */}
              <rect x={96} y={43} width={66} height={16} rx={8} fill="rgba(96,165,250,0.1)" stroke="rgba(96,165,250,0.25)" strokeWidth="1" />
              <text x={129} y={55} textAnchor="middle" fontSize="8" style={{ fontFamily: "monospace", fill: C.blue }}>Connected</text>
            </svg>

            {/* Right side live counter */}
            <div className="flex flex-col items-end gap-1">
              <span style={{ fontFamily: "monospace", fontSize: "11px", color: C.muted }}>requests / hr</span>
              <motion.span
                key={Math.floor(req / 200)}
                initial={{ opacity: 0.6 }} animate={{ opacity: 1 }}
                style={{ fontFamily: "monospace", fontSize: "20px", fontWeight: 700, color: C.blue, lineHeight: 1 }}>
                {(req / 1000).toFixed(1)}k
              </motion.span>
              <div className="flex items-end gap-[2px] h-[20px] mt-1">
                {BAR_HEIGHTS.map((h, i) => (
                  <div key={i} className="w-[3px] rounded-sm"
                    style={{ height: `${h * 100}%`, background: `rgba(96,165,250,${0.1 + h * 0.25})` }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-5 py-5" style={{ borderTop: `1px solid ${C.iborder}` }}>
        <p className="text-[14px] font-medium mb-0.5" style={{ color: C.ink }}>Platform Performance</p>
        <p className="text-[12px]" style={{ color: C.body }}>Perfect Lighthouse. Sub-second LCP. Monitored around the clock.</p>
      </div>
    </div>
  )
}

// ── Section ───────────────────────────────────────────────────────────────────

const GRID = [
  { delay: 0.05, col: "md:col-span-2" },
  { delay: 0.12, col: "" },
  { delay: 0.09, col: "" },
  { delay: 0.18, col: "md:col-span-2" },
]
const CARDS = [
  <AIPipelineCard  key="ai"   />,
  <SecurityCard    key="sec"  />,
  <GEOCard         key="geo"  />,
  <PerformanceCard key="perf" />,
]

export function PlatformSection() {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <section className="relative bg-canvas py-16 px-6 sm:py-24 overflow-hidden">
      <div className="relative mx-auto max-w-[1160px]">
        <AnimateIn className="mb-12">
          <p className="caption-uppercase mb-3">Platform Overview</p>
          <h2 className="display-lg max-w-xl">
            Built for performance.
            <br />
            Monitored in real time.
          </h2>
        </AnimateIn>

        <div ref={ref} className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {CARDS.map((card, i) => (
            <motion.div key={i} className={`${GRID[i].col} min-h-[360px]`}
              initial={{ opacity: 0, y: 28, filter: "blur(5px)" }}
              animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.65, delay: GRID[i].delay, ease: [0.16, 1, 0.3, 1] }}>
              {card}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
