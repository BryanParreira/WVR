"use client"

import { useEffect, useRef, useState, useId } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"

const D = {
  border: "#1e1c18",
  ink:    "#f0ede8",
  body:   "#a09c92",
  muted:  "#5e5b55",
  dim:    "#3a3733",
  green:  "#34d399",
  amber:  "#fbbf24",
  blue:   "#60a5fa",
}

const WIDGET_BG   = "#0c0b09"
const WIDGET_RING = "#1e1c18"

// ─── Live AI Task Feed ────────────────────────────────────────────────────────

const TASK_POOL = [
  { text: "Training intent classifier",   ms: "247ms" },
  { text: "Deploying agent pipeline",     ms: "891ms" },
  { text: "Indexing knowledge base",      ms: "312ms" },
  { text: "Optimizing RAG retrieval",     ms: "156ms" },
  { text: "Scheduling automation jobs",   ms: "78ms"  },
  { text: "Evaluating model outputs",     ms: "534ms" },
  { text: "Syncing CRM integrations",     ms: "203ms" },
  { text: "Generating content batch",     ms: "445ms" },
  { text: "Running A/B test analysis",    ms: "367ms" },
  { text: "Retraining workflow agents",   ms: "620ms" },
]

type Task = { id: number; text: string; ms: string; done: boolean }

export function LiveTaskFeed() {
  const counter = useRef(0)
  const idxRef  = useRef(3)

  const makeTask = (poolIdx: number, done: boolean): Task => ({
    id:   ++counter.current,
    done,
    ...TASK_POOL[poolIdx % TASK_POOL.length],
  })

  const [queue, setQueue] = useState<Task[]>([
    makeTask(0, true),
    makeTask(1, true),
    makeTask(2, false),
  ])
  const [total,       setTotal]   = useState(3)
  const [tokensPerSec, setTPS]    = useState(2840)
  const [tpsFlash,    setFlash]   = useState(false)

  useEffect(() => {
    const t = setInterval(() => {
      const next = makeTask(idxRef.current++, false)
      setQueue(q => {
        const updated = q.map((item, i) => i === q.length - 1 ? { ...item, done: true } : item)
        return [...updated, next].slice(-3)
      })
      setTotal(c => c + 1)
    }, 2800)
    return () => clearInterval(t)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const t = setInterval(() => {
      setTPS(v => Math.max(1200, Math.min(4800, v + Math.floor(Math.random() * 400 - 200))))
      setFlash(true)
      setTimeout(() => setFlash(false), 400)
    }, 1600)
    return () => clearInterval(t)
  }, [])

  const fmt = (n: number) => n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n)

  return (
    <div className="mt-5 rounded-[8px] overflow-hidden"
      style={{ background: WIDGET_BG, border: `1px solid ${WIDGET_RING}` }}>
      {/* Header */}
      <div className="flex items-center gap-2 px-3 py-2.5" style={{ borderBottom: `1px solid ${WIDGET_RING}` }}>
        <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ background: D.amber }} />
        <span className="text-[10px] uppercase tracking-[0.10em]"
          style={{ fontFamily: "var(--font-code-stack)", color: D.muted }}>agent activity</span>
        <motion.span
          animate={{ color: tpsFlash ? D.amber : D.dim, scale: tpsFlash ? 1.08 : 1 }}
          transition={{ duration: 0.2 }}
          className="ml-auto text-[10px]"
          style={{ fontFamily: "var(--font-mono)" }}>
          {fmt(tokensPerSec)} tok/s
        </motion.span>
      </div>

      {/* Task rows */}
      <div className="px-3 py-2 space-y-[5px] min-h-[72px]">
        <AnimatePresence initial={false} mode="popLayout">
          {queue.map(task => (
            <motion.div
              key={task.id}
              layout
              initial={{ opacity: 0, y: 14, filter: "blur(4px)" }}
              animate={{ opacity: 1,   y: 0,  filter: "blur(0px)" }}
              exit={{    opacity: 0,   y: -10, filter: "blur(2px)" }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center justify-between"
              style={{ fontFamily: "var(--font-mono)", fontSize: "11px" }}>
              <div className="flex items-center gap-2.5 min-w-0">
                <AnimatePresence mode="wait">
                  {task.done ? (
                    <motion.span key="done"
                      initial={{ scale: 0.4, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                      style={{ color: D.green, flexShrink: 0 }}>✓</motion.span>
                  ) : (
                    <motion.span key="active"
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                      className="animate-pulse" style={{ color: D.amber, flexShrink: 0 }}>●</motion.span>
                  )}
                </AnimatePresence>
                <span className="truncate" style={{ color: task.done ? D.muted : D.body }}>
                  {task.text}{!task.done ? "…" : ""}
                </span>
              </div>
              {task.done && (
                <motion.span
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="shrink-0 ml-2" style={{ color: D.dim }}>
                  {task.ms}
                </motion.span>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-3 py-2"
        style={{ borderTop: `1px solid ${WIDGET_RING}` }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: D.dim }}>session</span>
        <motion.span
          key={total}
          initial={{ opacity: 0.5, y: -4 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: D.green }}>
          {total} tasks completed
        </motion.span>
      </div>
    </div>
  )
}

// ─── Live Agent Orchestration ────────────────────────────────────────────────

const AGENT_WORKFLOWS = [
  {
    name: "CRM-Automation",
    steps: [
      { fn: "fetch_deals()",     result: "142 records"  },
      { fn: "enrich_leads()",    result: "all enriched" },
      { fn: "score_intent()",    result: "47 qualified" },
      { fn: "update_crm()",      result: "synced"       },
    ],
    saved: "5.8h",
  },
  {
    name: "Content-Pipeline",
    steps: [
      { fn: "scrape_trends()",   result: "28 topics"    },
      { fn: "draft_articles()",  result: "12 drafts"    },
      { fn: "seo_optimize()",    result: "score: 94"    },
      { fn: "publish_batch()",   result: "published"    },
    ],
    saved: "9.2h",
  },
  {
    name: "Invoice-Processor",
    steps: [
      { fn: "fetch_invoices()",  result: "89 pending"   },
      { fn: "classify_items()",  result: "categorized"  },
      { fn: "extract_data()",    result: "structured"   },
      { fn: "sync_accounting()", result: "posted"        },
    ],
    saved: "7.1h",
  },
]

export function LiveAgentOrchestration() {
  const [wfIdx,    setWfIdx]    = useState(0)
  const [revealed, setRevealed] = useState(0)
  const [allDone,  setAllDone]  = useState(false)
  const [tps,      setTps]      = useState(2840)

  const wf = AGENT_WORKFLOWS[wfIdx]

  useEffect(() => {
    setRevealed(0)
    setAllDone(false)
    const ids: ReturnType<typeof setTimeout>[] = []
    let n = 0
    const next = () => {
      n++
      setRevealed(n)
      if (n < wf.steps.length) {
        ids.push(setTimeout(next, 580 + Math.random() * 380))
      } else {
        ids.push(setTimeout(() => setAllDone(true), 480))
        ids.push(setTimeout(() => setWfIdx(i => (i + 1) % AGENT_WORKFLOWS.length), 3200))
      }
    }
    ids.push(setTimeout(next, 560))
    return () => ids.forEach(clearTimeout)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wfIdx])

  useEffect(() => {
    const t = setInterval(() =>
      setTps(v => Math.max(1200, Math.min(4800, v + Math.floor(Math.random() * 400 - 200)))), 1600)
    return () => clearInterval(t)
  }, [])

  const fmt = (n: number) => n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n)

  return (
    <div className="mt-6 rounded-[8px] overflow-hidden"
      style={{ background: WIDGET_BG, border: `1px solid ${WIDGET_RING}` }}>

      {/* Header */}
      <div className="flex items-center gap-2 px-3 py-2.5"
        style={{ borderBottom: `1px solid ${WIDGET_RING}` }}>
        <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ background: D.amber }} />
        <span className="text-[10px] uppercase tracking-[0.10em]"
          style={{ fontFamily: "var(--font-code-stack)", color: D.muted }}>agent activity</span>
        <span className="ml-auto text-[10px]"
          style={{ fontFamily: "var(--font-mono)", color: D.dim }}>
          {fmt(tps)} tok/s
        </span>
      </div>

      {/* Execution log — fixed height to prevent card size jumps */}
      <div className="px-4 py-3.5 overflow-hidden" style={{ height: "178px" }}>
        <AnimatePresence mode="wait">
          <motion.div key={wfIdx}
            initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.22 }}>

            {/* Agent name row */}
            <div className="flex items-center gap-2 mb-3">
              <span style={{ color: D.dim, fontFamily: "var(--font-mono)", fontSize: "10px" }}>→</span>
              <span style={{ color: D.amber, fontFamily: "var(--font-mono)", fontSize: "11px", fontWeight: 500 }}>
                {wf.name}
              </span>
            </div>

            {/* Steps */}
            <div className="space-y-[5px] pl-4" style={{ borderLeft: `1px solid ${WIDGET_RING}` }}>
              {wf.steps.map((step, i) => {
                if (i >= revealed) return null
                const isActive = i === revealed - 1 && !allDone
                return (
                  <motion.div key={i}
                    initial={{ opacity: 0, x: 6 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.18 }}
                    className="flex items-center justify-between gap-3"
                    style={{ fontFamily: "var(--font-mono)", fontSize: "11px" }}>
                    <div className="flex items-center gap-2 min-w-0">
                      <AnimatePresence mode="wait">
                        {isActive ? (
                          <motion.span key="active"
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="animate-pulse shrink-0" style={{ color: D.amber }}>●</motion.span>
                        ) : (
                          <motion.span key="done"
                            initial={{ scale: 0.3, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ type: "spring", stiffness: 500, damping: 22 }}
                            className="shrink-0" style={{ color: D.green }}>✓</motion.span>
                        )}
                      </AnimatePresence>
                      <span className="truncate"
                        style={{ color: isActive ? D.body : D.muted }}>{step.fn}</span>
                    </div>
                    {isActive ? (
                      <span className="shrink-0 text-[10px] animate-pulse"
                        style={{ color: D.amber }}>···</span>
                    ) : (
                      <motion.span
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        className="shrink-0 text-[10px]"
                        style={{ color: D.dim }}>{step.result}</motion.span>
                    )}
                  </motion.div>
                )
              })}
            </div>

            {/* Completion badge */}
            <AnimatePresence>
              {allDone && (
                <motion.div
                  initial={{ opacity: 0, y: 5, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  className="mt-3 inline-flex items-center gap-2 px-2.5 py-1.5 rounded-[5px]"
                  style={{ background: "rgba(52,211,153,0.08)", border: "1px solid rgba(52,211,153,0.2)" }}>
                  <span style={{ color: D.green, fontFamily: "var(--font-mono)", fontSize: "10px" }}>
                    ✓ Saved {wf.saved} of manual work
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-3 py-2"
        style={{ borderTop: `1px solid ${WIDGET_RING}` }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: D.dim }}>session</span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: D.green }}>
          {wfIdx * 4 + revealed} tasks done
        </span>
      </div>
    </div>
  )
}

// ─── Live Security Scanner ────────────────────────────────────────────────────

const POLICIES = ["Identity", "Network", "Endpoint", "Data", "Application", "Infrastructure"]
type PolicyState = "idle" | "scanning" | "clear"

export function LiveScanBar() {
  const [states,  setStates]  = useState<PolicyState[]>(POLICIES.map(() => "idle"))
  const [packets, setPackets] = useState(14218)

  useEffect(() => {
    const ids: ReturnType<typeof setTimeout>[] = []
    let alive = true

    const runScan = () => {
      if (!alive) return
      setStates(POLICIES.map(() => "idle"))
      POLICIES.forEach((_, i) => {
        ids.push(setTimeout(() => {
          if (!alive) return
          setStates(prev => prev.map((s, idx) =>
            idx === i ? "scanning" : idx < i ? "clear" : s
          ))
        }, 400 + i * 350))
        ids.push(setTimeout(() => {
          if (!alive) return
          setStates(prev => prev.map((s, idx) => idx <= i ? "clear" : s))
        }, 400 + i * 350 + 300))
      })
      ids.push(setTimeout(() => { if (alive) runScan() },
        400 + POLICIES.length * 350 + 3200))
    }

    ids.push(setTimeout(runScan, 700))
    return () => { alive = false; ids.forEach(clearTimeout) }
  }, [])

  useEffect(() => {
    const t = setInterval(() => setPackets(p => p + Math.floor(Math.random() * 180 + 40)), 900)
    return () => clearInterval(t)
  }, [])

  const allClear = states.every(s => s === "clear")
  const fmtPkts  = (n: number) => `${(n / 1000).toFixed(1)}k`

  return (
    <div className="mt-5 rounded-[8px] overflow-hidden"
      style={{ background: WIDGET_BG, border: `1px solid ${WIDGET_RING}` }}>

      {/* Header */}
      <div className="flex items-center gap-2 px-3 py-2.5"
        style={{ borderBottom: `1px solid ${WIDGET_RING}` }}>
        <motion.span
          animate={{ background: allClear ? D.green : states.some(s => s === "scanning") ? D.amber : D.dim }}
          transition={{ duration: 0.3 }}
          className="h-1.5 w-1.5 rounded-full flex-shrink-0" />
        <AnimatePresence mode="wait">
          <motion.span
            key={allClear ? "clear" : "scan"}
            initial={{ opacity: 0, x: 4 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -4 }}
            transition={{ duration: 0.18 }}
            className="text-[10px] uppercase tracking-[0.10em]"
            style={{ fontFamily: "var(--font-code-stack)", color: allClear ? D.green : D.muted }}>
            {allClear ? "all systems clear" : "scanning policies"}
          </motion.span>
        </AnimatePresence>
        <span className="ml-auto text-[10px]"
          style={{ fontFamily: "var(--font-mono)", color: D.dim }}>0 threats</span>
      </div>

      {/* Policy grid */}
      <div className="p-3 grid grid-cols-2 gap-1.5">
        {POLICIES.map((label, i) => {
          const state   = states[i]
          const borderC = state === "clear"    ? "rgba(52,211,153,0.28)"  :
                          state === "scanning" ? "rgba(251,191,36,0.35)"  : WIDGET_RING
          const bgC     = state === "clear"    ? "rgba(52,211,153,0.06)"  :
                          state === "scanning" ? "rgba(251,191,36,0.06)"  : "rgba(240,237,232,0.02)"
          const dotC    = state === "clear"    ? D.green :
                          state === "scanning" ? D.amber  : D.dim
          const textC   = state === "clear"    ? D.body  :
                          state === "scanning" ? D.amber  : D.muted
          return (
            <motion.div key={label}
              className="flex items-center gap-2 px-2.5 py-[7px] rounded-[5px]"
              animate={{ background: bgC }}
              transition={{ duration: 0.28 }}
              style={{ border: `1px solid ${borderC}` }}>
              <motion.span
                animate={{ background: dotC, boxShadow: state !== "idle" ? `0 0 5px ${dotC}70` : "none" }}
                transition={{ duration: 0.28 }}
                className="h-1.5 w-1.5 rounded-full flex-shrink-0" />
              <span className="text-[9.5px] leading-none flex-1 truncate"
                style={{ fontFamily: "var(--font-code-stack)", color: textC }}>
                {label}
              </span>
              <AnimatePresence mode="wait">
                {state === "scanning" && (
                  <motion.span key="dot"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7, repeat: Infinity, ease: "easeInOut" }}
                    style={{ color: D.amber, fontFamily: "var(--font-mono)", fontSize: "8px" }}>
                    ···
                  </motion.span>
                )}
                {state === "clear" && (
                  <motion.span key="check"
                    initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 22 }}
                    style={{ color: D.green, fontFamily: "var(--font-mono)", fontSize: "9px" }}>
                    ✓
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-3 py-2"
        style={{ borderTop: `1px solid ${WIDGET_RING}` }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: D.dim }}>pkts analyzed</span>
        <motion.span
          key={Math.floor(packets / 500)}
          initial={{ opacity: 0.6, y: -3 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: allClear ? D.green : D.body }}>
          {fmtPkts(packets)} pkts
        </motion.span>
      </div>
    </div>
  )
}

// ─── Live Uptime Bars ─────────────────────────────────────────────────────────

const BAR_HEIGHTS = [
  72,80,65,88,76,92,85,70,95,78,83,88,74,91,84,77,93,81,88,76,
  94,82,79,87,91,85,89,93,88,96,85,90,88,94,97,92,88,95,100,100,
]

export function LiveUptimeBars() {
  const ref     = useRef<HTMLDivElement>(null)
  const inView  = useInView(ref, { once: true, margin: "-40px" })
  const [mounted, setMounted]     = useState(false)
  const [tick,    setTick]        = useState(0)
  const [responseMs, setResponse] = useState(42)
  const [prevMs, setPrev]         = useState(42)

  useEffect(() => { if (inView) setMounted(true) }, [inView])

  useEffect(() => {
    const t = setInterval(() => setTick(v => v + 1), 2500)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    const t = setInterval(() => {
      setResponse(ms => {
        const next = Math.round(Math.max(24, Math.min(94, ms + (Math.random() * 16 - 8))))
        setPrev(ms)
        return next
      })
    }, 1400)
    return () => clearInterval(t)
  }, [])

  const msColor = responseMs > prevMs ? D.amber : D.green

  return (
    <div className="mt-5 rounded-[8px] overflow-hidden"
      style={{ background: WIDGET_BG, border: `1px solid ${WIDGET_RING}` }}>
      {/* Header */}
      <div className="flex items-center gap-2 px-3 py-2.5" style={{ borderBottom: `1px solid ${WIDGET_RING}` }}>
        <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ background: D.green }} />
        <span className="text-[10px] uppercase tracking-[0.10em]"
          style={{ fontFamily: "var(--font-code-stack)", color: D.muted }}>uptime · 30 days</span>
        <span className="ml-auto text-[10px]" style={{ fontFamily: "var(--font-mono)", color: D.green }}>99.9%</span>
      </div>

      {/* Bars */}
      <div ref={ref} className="flex items-end gap-[2px] px-3 pt-3 pb-2" style={{ height: "80px" }}>
        {BAR_HEIGHTS.map((h, i) => {
          const isLast = i === BAR_HEIGHTS.length - 1
          const delay  = (i / BAR_HEIGHTS.length) * 0.6
          return (
            <motion.div
              key={i}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: mounted ? 1 : 0 }}
              transition={{ duration: 0.4, delay, ease: [0.16, 1, 0.3, 1] }}
              style={{
                width: "4px",
                height: `${h}%`,
                borderRadius: "1px",
                flexShrink: 0,
                originY: 1,
                background: isLast ? D.green : `rgba(52,211,153,${0.2 + (i / BAR_HEIGHTS.length) * 0.65})`,
                opacity: isLast && tick % 2 === 0 ? 0.45 : 1,
                transition: "opacity 0.4s",
              }} />
          )
        })}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-3 py-2"
        style={{ borderTop: `1px solid ${WIDGET_RING}` }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: D.dim }}>30d ago</span>
        <AnimatePresence mode="wait">
          <motion.span
            key={responseMs}
            initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.22 }}
            style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: msColor }}>
            {responseMs}ms avg response
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  )
}

// ─── Live Traffic Chart ───────────────────────────────────────────────────────

const BASE_ORGANIC = [38,42,40,46,44,50,48,54,52,58,56,62,59,65,63,68,66,72,70,75,74,80]
const BASE_AI_VIS  = [12,13,12,15,14,17,16,19,18,21,22,24,23,27,26,29,28,32,31,35,34,38]

export function LiveTrafficChart() {
  const uid        = useId().replace(/:/g, "")
  const [clipW,    setClipW]    = useState(0)
  const [organic,  setOrganic]  = useState(BASE_ORGANIC)
  const [aiVis,    setAiVis]    = useState(BASE_AI_VIS)
  const [dotPos,   setDotPos]   = useState<{ x: number; y: number } | null>(null)
  const [visitors, setVisitors] = useState(1247)
  const [vFlash,   setVFlash]   = useState(false)
  const rafRef     = useRef<number>(0)
  const W = 240, H = 80

  const scalePts = (pts: number[]) => pts.map((v, i) => ({
    x: (i / (pts.length - 1)) * W,
    y: H - (v / 100) * H,
  }))

  const buildPath = (pts: number[]) => {
    const sp = scalePts(pts)
    return sp.reduce((acc, p, i) => {
      if (i === 0) return `M ${p.x.toFixed(1)} ${p.y.toFixed(1)}`
      const prev = sp[i - 1]
      const cpx  = ((prev.x + p.x) / 2).toFixed(1)
      return `${acc} C ${cpx} ${prev.y.toFixed(1)}, ${cpx} ${p.y.toFixed(1)}, ${p.x.toFixed(1)} ${p.y.toFixed(1)}`
    }, "")
  }

  const dOrganic = buildPath(organic)
  const dAI      = buildPath(aiVis)

  // Draw-in animation on mount
  useEffect(() => {
    const start = performance.now()
    const dur   = 1800
    const tick  = (now: number) => {
      const t    = Math.min((now - start) / dur, 1)
      const ease = 1 - Math.pow(1 - t, 2)
      setClipW(ease * W)
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        setClipW(W)
        setDotPos(scalePts(organic)[organic.length - 1])
      }
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const t = setInterval(() => {
      setOrganic(prev => {
        const last    = prev[prev.length - 1]
        const next    = Math.min(100, Math.max(38, last + (Math.random() * 5 - 0.5)))
        const updated = [...prev.slice(1), Math.round(next * 10) / 10]
        setDotPos(scalePts(updated)[updated.length - 1])
        return updated
      })
      setAiVis(prev => {
        const last = prev[prev.length - 1]
        const next = Math.min(60, Math.max(10, last + (Math.random() * 3 - 0.3)))
        return [...prev.slice(1), Math.round(next * 10) / 10]
      })
    }, 2400)
    return () => clearInterval(t)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const t = setInterval(() => {
      setVisitors(v => Math.max(900, Math.min(2400, v + Math.floor(Math.random() * 60 - 25))))
      setVFlash(true)
      setTimeout(() => setVFlash(false), 400)
    }, 2800)
    return () => clearInterval(t)
  }, [])

  const fmtV = (n: number) => n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n)

  return (
    <div className="mt-5 rounded-[8px] overflow-hidden"
      style={{ background: WIDGET_BG, border: `1px solid ${WIDGET_RING}` }}>

      {/* Header */}
      <div className="flex items-center gap-2 px-3 py-2.5"
        style={{ borderBottom: `1px solid ${WIDGET_RING}` }}>
        <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ background: D.blue }} />
        <span className="text-[10px] uppercase tracking-[0.10em]"
          style={{ fontFamily: "var(--font-code-stack)", color: D.muted }}>organic traffic · live</span>
        <motion.span
          animate={{ color: vFlash ? D.blue : D.dim }}
          transition={{ duration: 0.2 }}
          className="ml-auto text-[10px]"
          style={{ fontFamily: "var(--font-mono)" }}>
          {fmtV(visitors)} active
        </motion.span>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 px-3 pt-2.5 pb-0">
        <div className="flex items-center gap-1.5">
          <span className="h-[2px] w-4 rounded-full" style={{ background: D.blue }} />
          <span className="text-[9px]" style={{ fontFamily: "var(--font-mono)", color: D.muted }}>Organic</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-[2px] w-4 rounded-full" style={{ background: D.amber, opacity: 0.65 }} />
          <span className="text-[9px]" style={{ fontFamily: "var(--font-mono)", color: D.muted }}>AI Visibility</span>
        </div>
      </div>

      <div className="px-3 pb-2 pt-1.5">
        <svg viewBox={`0 0 ${W} ${H}`} width="100%" height={H}
          style={{ overflow: "visible", display: "block" }}>
          <defs>
            <clipPath id={`clip-${uid}`}>
              <rect x="0" y={-4} width={clipW} height={H + 8} />
            </clipPath>
            <linearGradient id={`fill-org-${uid}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor={D.blue} stopOpacity="0.42" />
              <stop offset="100%" stopColor={D.blue} stopOpacity="0.03" />
            </linearGradient>
            <linearGradient id={`fill-ai-${uid}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor={D.amber} stopOpacity="0.20" />
              <stop offset="100%" stopColor={D.amber} stopOpacity="0.01" />
            </linearGradient>
            <filter id={`glow-${uid}`}>
              <feGaussianBlur stdDeviation="1.8" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <g clipPath={`url(#clip-${uid})`}>
            {/* AI visibility — behind organic */}
            <path d={`${dAI} L ${W} ${H} L 0 ${H} Z`}
              fill={`url(#fill-ai-${uid})`}
              style={{ transition: "d 0.7s ease" }} />
            <path d={dAI} fill="none" stroke={D.amber} strokeWidth="1" strokeOpacity="0.55"
              strokeDasharray="3 2"
              style={{ transition: "d 0.7s ease" }} />

            {/* Organic area */}
            <path d={`${dOrganic} L ${W} ${H} L 0 ${H} Z`}
              fill={`url(#fill-org-${uid})`}
              style={{ transition: "d 0.7s ease" }} />
            {/* Glow */}
            <path d={dOrganic} fill="none" stroke={D.blue} strokeWidth="3" strokeOpacity="0.22"
              filter={`url(#glow-${uid})`}
              style={{ transition: "d 0.7s ease" }} />
            {/* Main line */}
            <path d={dOrganic} fill="none" stroke={D.blue} strokeWidth="1.5"
              strokeLinecap="round" strokeLinejoin="round"
              style={{ transition: "d 0.7s ease" }} />
          </g>

          {/* Live dot */}
          {dotPos && clipW >= W - 2 && (
            <g>
              <circle cx={dotPos.x} cy={dotPos.y} r="8" fill={D.blue} fillOpacity="0.08">
                <animate attributeName="r"       values="5;10;5"    dur="2.2s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.1;0;0.1" dur="2.2s" repeatCount="indefinite" />
              </circle>
              <circle cx={dotPos.x} cy={dotPos.y} r="4"   fill={D.blue} fillOpacity="0.25" />
              <circle cx={dotPos.x} cy={dotPos.y} r="2.5" fill={D.blue}>
                <animate attributeName="r"       values="2;3.2;2" dur="1.8s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="1;0.6;1" dur="1.8s" repeatCount="indefinite" />
              </circle>
            </g>
          )}
        </svg>

        <div className="flex items-center justify-between mt-1">
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: D.dim }}>6mo ago</span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: D.blue }}>+3× growth</span>
        </div>
      </div>
    </div>
  )
}

// ─── Hero Live Status Bar ─────────────────────────────────────────────────────

const STATUS_ITEMS = [
  { label: "agents active",    value: 3,    suffix: "",   color: D.amber, delta: 1 },
  { label: "threats detected", value: 0,    suffix: "",   color: D.green, delta: 0 },
  { label: "uptime",           value: 99.9, suffix: "%",  color: D.green, delta: 0 },
  { label: "projects live",    value: 6,    suffix: "",   color: D.blue,  delta: 1 },
]

export function HeroLiveStatus() {
  const [counts, setCounts] = useState(STATUS_ITEMS.map(s => s.value))
  const [flash,  setFlash]  = useState<number | null>(null)

  useEffect(() => {
    const t = setInterval(() => {
      const idx = [0, 3][Math.floor(Math.random() * 2)]
      setCounts(prev => prev.map((v, i) => {
        if (i !== idx) return v
        return STATUS_ITEMS[i].delta > 0
          ? Math.min(v + STATUS_ITEMS[i].delta, STATUS_ITEMS[i].value + 3)
          : v
      }))
      setFlash(idx)
      setTimeout(() => setFlash(null), 600)
    }, 3500)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
      {STATUS_ITEMS.map((item, i) => (
        <div key={item.label} className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full flex-shrink-0"
            style={{
              background: item.color,
              boxShadow: `0 0 6px ${item.color}`,
              animation: "pulse 2s ease-in-out infinite",
              animationDelay: `${i * 0.5}s`,
            }} />
          <span className="text-[13px] tabular-nums transition-colors duration-300"
            style={{ fontFamily: "var(--font-mono)", color: flash === i ? item.color : "var(--muted)" }}>
            <span style={{ color: flash === i ? item.color : "var(--body)", fontWeight: 500 }}>
              {item.value % 1 !== 0 ? item.value.toFixed(1) : counts[i]}{item.suffix}
            </span>
            {" "}{item.label}
          </span>
        </div>
      ))}
    </div>
  )
}

// ─── Service Card Live Badge ──────────────────────────────────────────────────

const SERVICE_BADGE_BASE: Record<string, { text: string; color: string; dynamic?: boolean }> = {
  "ai-automation":     { text: "agents active",  color: D.amber, dynamic: true },
  "cybersecurity":     { text: "SECURE",         color: D.green                },
  "digital-marketing": { text: "+3× traffic",    color: D.blue                 },
  "custom-software":   { text: "in progress",    color: D.amber, dynamic: true },
  "web-development":   { text: "99.9% uptime",   color: D.green                },
  "data-intelligence": { text: "live data",      color: D.blue                 },
}

const DYNAMIC_INIT: Record<string, number> = {
  "ai-automation":   3,
  "custom-software": 4,
}

export function ServiceLiveBadge({ serviceId }: { serviceId: string }) {
  const base = SERVICE_BADGE_BASE[serviceId]
  const [count, setCount] = useState<number | null>(
    base?.dynamic ? (DYNAMIC_INIT[serviceId] ?? 3) : null
  )

  useEffect(() => {
    if (!base?.dynamic) return
    const t = setInterval(() => {
      setCount(c => c !== null ? Math.max(2, Math.min(8, c + (Math.random() > 0.45 ? 1 : -1))) : c)
    }, 3800)
    return () => clearInterval(t)
  }, [base?.dynamic])

  if (!base) return null

  const displayText = base.dynamic && count !== null ? `${count} ${base.text}` : base.text

  return (
    <div className="flex items-center gap-1.5 px-2 py-1 rounded-full"
      style={{ background: `${base.color}12`, border: `1px solid ${base.color}30` }}>
      <span className="h-1.5 w-1.5 rounded-full animate-pulse flex-shrink-0"
        style={{ background: base.color }} />
      <span className="text-[11px] font-medium"
        style={{ fontFamily: "var(--font-mono)", color: base.color }}>
        {displayText}
      </span>
    </div>
  )
}

// ─── Process Step Connector ───────────────────────────────────────────────────

export function ProcessConnector() {
  const ref     = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [width,  setWidth]  = useState(0)
  const [active, setActive] = useState(-1)
  const rafRef  = useRef<number>(0)

  useEffect(() => {
    if (!isInView) return
    const start = performance.now()
    const dur   = 2000
    const tick  = (now: number) => {
      const t    = Math.min((now - start) / dur, 1)
      const ease = 1 - Math.pow(1 - t, 3)
      setWidth(ease * 100)
      setActive(Math.floor(ease * 4))
      if (t < 1) rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [isInView])

  return (
    <div ref={ref} className="hidden md:block relative mb-0 -mb-px mx-6">
      <div className="h-px bg-hairline w-full" />
      <div className="absolute top-0 left-0 h-px bg-ink transition-none rounded-full"
        style={{ width: `${width}%` }} />
      {[0, 1, 2, 3].map(i => (
        <div key={i}
          className="absolute top-0 -translate-y-1/2 h-2 w-2 rounded-full border transition-all duration-300"
          style={{
            left: `${(i / 3) * 100}%`,
            transform: "translate(-50%, -50%)",
            background: active > i ? "var(--ink)" : "var(--canvas)",
            borderColor: active > i ? "var(--ink)" : "var(--hairline-strong)",
            boxShadow: active === i ? "0 0 8px var(--ink)" : "none",
          }} />
      ))}
    </div>
  )
}
