"use client"
"use no memo";

import { useEffect, useRef, useState, useCallback, useMemo } from "react"
import { useInView, AnimatePresence, motion } from "framer-motion"
import { SITE_CONFIG } from "@/lib/constants"

const D = {
  bg:      "#0f0e0c",
  surface: "#1c1a17",
  border:  "#2e2c28",
  ink:     "#f0ede8",
  body:    "#a09c92",
  muted:   "#6b6760",
  dim:     "#3d3b37",
  green:   "#34d399",
  primary: "#22b5d4",
}

// ─── Glitch ───────────────────────────────────────────────────────────────────
const GLITCH_CHARS = "█▓▒░▄▀■□01∆∇◆►◄↕⌗"

function scramble(text: string): string {
  return text.split("").map(c =>
    c === " " ? " " : GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
  ).join("")
}

function GlitchText({ text }: { text: string }) {
  const [display, setDisplay] = useState(() => text.trim() ? scramble(text) : text)

  useEffect(() => {
    if (!text.trim()) { setDisplay(text); return }
    let n = 0
    const id = setInterval(() => {
      n++
      if (n >= 5) { setDisplay(text); clearInterval(id) }
      else setDisplay(scramble(text))
    }, 36)
    return () => clearInterval(id)
  }, [text])

  return <>{display}</>
}

// ─── Progress bar ─────────────────────────────────────────────────────────────
function ProgressBar({ label, done, duration, color }: {
  label: string; done: string; duration: number; color: string
}) {
  const [pct, setPct] = useState(0)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const start = Date.now()
    const tick = () => {
      const p = Math.min(100, Math.round(((Date.now() - start) / duration) * 100))
      setPct(p)
      if (p < 100) rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [duration])

  const W = 20
  const filled = Math.round(pct / 100 * W)
  const bar = "█".repeat(filled) + "░".repeat(W - filled)
  const glow = pct === 100 ? { textShadow: "0 0 8px rgba(52,211,153,0.45), 0 0 18px rgba(52,211,153,0.18)" } : {}

  return (
    <div className="text-[13px] leading-[1.65]" style={{ color, fontFamily: "var(--font-mono)", ...glow }}>
      {`  [${bar}] ${String(pct).padStart(3)}%`}
      {pct === 100 ? ` ✓ ${done}` : `  ${label}…`}
    </div>
  )
}

// ─── Types ────────────────────────────────────────────────────────────────────
type TextLine     = { text: string; color?: string; delay?: number }
type ProgressLine = { type: "progress"; label: string; done: string; duration: number; color?: string; delay?: number }
type Line         = TextLine | ProgressLine
type HistoryEntry  = { command: string; lines: Line[] }
type ActiveOutput  = { command: string; lines: Line[]; revealed: number }

function isProgress(l: Line): l is ProgressLine {
  return "type" in l && (l as ProgressLine).type === "progress"
}

function glowFor(color?: string): React.CSSProperties {
  if (color === D.green)   return { textShadow: "0 0 8px rgba(52,211,153,0.35), 0 0 18px rgba(52,211,153,0.12)" }
  if (color === D.primary) return { textShadow: "0 0 8px rgba(34,181,212,0.35), 0 0 18px rgba(34,181,212,0.12)" }
  if (color === D.ink)     return { textShadow: "0 0 6px rgba(240,237,232,0.12)" }
  return {}
}

function renderLine(line: Line, j: number, enableGlitch = false) {
  if (isProgress(line)) {
    return <ProgressBar key={j} label={line.label} done={line.done} duration={line.duration} color={line.color ?? D.green} />
  }
  const text = line.text || " "
  const shouldGlitch = enableGlitch && line.text.trim() !== ""
  return (
    <div key={j} className="text-[13px] leading-[1.65]" style={{ color: line.color ?? D.body, ...glowFor(line.color) }}>
      {shouldGlitch ? <GlitchText text={text} /> : text}
    </div>
  )
}

// ─── Welcome ──────────────────────────────────────────────────────────────────
const WELCOME: Line[] = [
  { text: "WebVisionRank CLI", color: D.ink },
  { text: "─".repeat(46), color: D.dim },
  { text: "AI automation · Zero Trust security · Elite dev" },
  { text: "" },
  { text: "Type a command or click a suggestion below.", color: D.muted },
  { text: "" },
]

// ─── Run workflows (with live progress bars) ──────────────────────────────────
const RUN_WORKFLOWS: Record<string, () => Line[]> = {
  "crm-automation": () => [
    { text: "→ CRM-Automation Agent v2.1", color: D.ink, delay: 40 },
    { text: "  model: gpt-4o-mini  ·  temp: 0  ·  mode: production", delay: 80 },
    { text: "", delay: 60 },
    { type: "progress", label: "fetch_deals",  done: "142 records",  duration: 700,  color: D.green, delay: 120 },
    { type: "progress", label: "enrich_leads", done: "all enriched", duration: 1100, color: D.green, delay: 80  },
    { type: "progress", label: "score_intent", done: "47 qualified", duration: 850,  color: D.green, delay: 80  },
    { type: "progress", label: "update_crm",   done: "synced",       duration: 500,  color: D.green, delay: 80  },
    { text: "", delay: 1000 },
    { text: "  " + "─".repeat(40), color: D.dim, delay: 40 },
    { text: "  ✓ saved 5.8h · cost: $0.43 · labor equiv: $290", color: D.green, delay: 80 },
  ],
  "content-pipeline": () => [
    { text: "→ Content-Pipeline Agent v1.4", color: D.ink, delay: 40 },
    { text: "  model: gpt-4o  ·  temp: 0.7  ·  mode: production", delay: 80 },
    { text: "", delay: 60 },
    { type: "progress", label: "scrape_trends",  done: "28 topics",  duration: 700,  color: D.green, delay: 120 },
    { type: "progress", label: "draft_articles", done: "12 drafts",  duration: 1500, color: D.green, delay: 80  },
    { type: "progress", label: "seo_optimize",   done: "score: 94",  duration: 900,  color: D.green, delay: 80  },
    { type: "progress", label: "publish_batch",  done: "published",  duration: 600,  color: D.green, delay: 80  },
    { text: "", delay: 1400 },
    { text: "  " + "─".repeat(40), color: D.dim, delay: 40 },
    { text: "  ✓ saved 9.2h · cost: $0.81 · labor equiv: $690", color: D.green, delay: 80 },
  ],
  "invoice-processor": () => [
    { text: "→ Invoice-Processor Agent v3.0", color: D.ink, delay: 40 },
    { text: "  model: gpt-4o-mini  ·  temp: 0  ·  mode: production", delay: 80 },
    { text: "", delay: 60 },
    { type: "progress", label: "fetch_invoices",  done: "89 pending",  duration: 600,  color: D.green, delay: 120 },
    { type: "progress", label: "classify_items",  done: "categorized", duration: 900,  color: D.green, delay: 80  },
    { type: "progress", label: "extract_data",    done: "structured",  duration: 1200, color: D.green, delay: 80  },
    { type: "progress", label: "sync_accounting", done: "posted",      duration: 500,  color: D.green, delay: 80  },
    { text: "", delay: 1200 },
    { text: "  " + "─".repeat(40), color: D.dim, delay: 40 },
    { text: "  ✓ saved 7.1h · cost: $0.56 · labor equiv: $520", color: D.green, delay: 80 },
  ],
}

// ─── Static commands ──────────────────────────────────────────────────────────
const CMDS: Record<string, () => Line[]> = {
  help: () => [
    { text: "Commands:", color: D.ink },
    { text: "" },
    { text: "  services   what we build" },
    { text: "  ai         AI & automation" },
    { text: "  security   Zero Trust architecture" },
    { text: "  dev        custom development" },
    { text: "  geo        marketing & GEO" },
    { text: "  pricing    investment tiers" },
    { text: "  about      who we are" },
    { text: "  contact    get in touch" },
    { text: "  status     live system status" },
    { text: "" },
    { text: "  run crm-automation      live agent demo", color: D.green },
    { text: "  run content-pipeline    live agent demo", color: D.green },
    { text: "  run invoice-processor   live agent demo", color: D.green },
    { text: "" },
    { text: "  ls  ·  whoami  ·  uptime  ·  clear  ·  [tab] autocomplete", color: D.dim },
  ],

  ls: () => [
    { text: "ai/  security/  dev/  geo/  pricing/  about.md  contact.txt" },
  ],

  whoami: () => [
    { text: "webvisionrank", color: D.ink },
    { text: "the agency that bridges AI, security, and elite engineering." },
  ],

  uptime: () => [
    { text: "99.9%   uptime SLA across all client systems", color: D.ink },
    { text: "0       security breaches since founding" },
    { text: "40%     avg. cost reduction via AI automation" },
    { text: "3×      avg. traffic growth via GEO" },
  ],

  status: () => [
    { text: "System Status:", color: D.ink },
    { text: "" },
    { text: "  ● agents       3 active", color: D.green },
    { text: "  ● security     0 threats detected", color: D.green },
    { text: "  ● uptime       99.9%  ·  all systems operational", color: D.green },
    { text: "  ● projects     6 in production", color: D.green },
    { text: "" },
    { text: "  all systems nominal", color: D.muted },
  ],

  services: () => [
    { text: "Core Disciplines:", color: D.ink },
    { text: "" },
    { text: "  01  AI & Agentic Automation" },
    { text: "      LLM pipelines · multi-agent systems · RAG" },
    { text: "" },
    { text: "  02  Zero Trust Security" },
    { text: "      Architecture · pen testing · continuous monitoring" },
    { text: "" },
    { text: "  03  Custom Software Development" },
    { text: "      Full stack · APIs · DevOps · CI/CD" },
    { text: "" },
    { text: "  04  Digital Marketing & GEO" },
    { text: "      SEO · Generative Engine Optimization · analytics" },
  ],

  ai: () => [
    { text: "AI & Agentic Automation", color: D.ink },
    { text: "" },
    { text: "  Autonomous agents that eliminate repetitive work," },
    { text: "  surface insights, and scale ops — no extra headcount." },
    { text: "" },
    { text: "  · Custom LLM pipeline development" },
    { text: "  · Multi-agent orchestration systems" },
    { text: "  · RAG knowledge base integrations" },
    { text: "  · Workflow automation & API chaining" },
    { text: "" },
    { text: "  Result: 40% avg. cost reduction", color: D.ink },
    { text: "" },
    { text: "  → try: run crm-automation", color: D.muted },
  ],

  security: () => [
    { text: "Zero Trust Security", color: D.ink },
    { text: "" },
    { text: "  Security from the first line of code." },
    { text: "  Never bolted on — always built in." },
    { text: "" },
    { text: "  · Zero Trust architecture design" },
    { text: "  · Penetration testing & red teaming" },
    { text: "  · Continuous vulnerability monitoring" },
    { text: "  · Security audits & compliance" },
    { text: "" },
    { text: "  Result: 0 client breaches", color: D.ink },
  ],

  dev: () => [
    { text: "Custom Software Development", color: D.ink },
    { text: "" },
    { text: "  Bespoke apps built to exact specs." },
    { text: "  Internal tooling to customer-facing SaaS." },
    { text: "" },
    { text: "  · Full stack web & mobile apps" },
    { text: "  · API design & microservices" },
    { text: "  · Database architecture & DevOps" },
    { text: "  · CI/CD pipelines" },
    { text: "" },
    { text: "  SLA: 99.9% uptime guaranteed", color: D.ink },
  ],

  geo: () => [
    { text: "Digital Marketing & GEO", color: D.ink },
    { text: "" },
    { text: "  Visible to Google and AI engines alike." },
    { text: "  GEO optimized from day one." },
    { text: "" },
    { text: "  · Generative Engine Optimization (GEO)" },
    { text: "  · AI assisted content strategy" },
    { text: "  · Conversion rate optimization" },
    { text: "  · Performance analytics & attribution" },
    { text: "" },
    { text: "  Result: 3× avg. traffic growth", color: D.ink },
  ],

  pricing: () => [
    { text: "Investment Tiers:", color: D.ink },
    { text: "" },
    { text: "  Foundation   $2,500/project" },
    { text: "  ↳ Core web presence + security baseline" },
    { text: "" },
    { text: "  Growth       $7,500/project" },
    { text: "  ↳ AI automation + full marketing stack" },
    { text: "" },
    { text: "  Ecosystem    Custom" },
    { text: "  ↳ Full-scope AI + security + custom dev" },
    { text: "" },
    { text: "  → webvisionrank.com/pricing", color: D.muted },
  ],

  about: () => [
    { text: "WebVisionRank", color: D.ink },
    { text: "" },
    { text: "  A hybrid AI tech agency at the intersection of Agentic AI," },
    { text: "  Zero Trust cybersecurity, and elite software engineering." },
    { text: "" },
    { text: "  Most agencies are too broad to be excellent," },
    { text: "  or too narrow to be strategic. We're the exception." },
    { text: "" },
    { text: "  40% ↓ cost · 0 breaches · 3× traffic · 99.9% uptime", color: D.ink },
  ],

  contact: () => [
    { text: "Get In Touch:", color: D.ink },
    { text: "" },
    { text: `  email     →  ${SITE_CONFIG.email}` },
    { text: "  response  →  within 24 hours" },
    { text: "  calls     →  scheduled after first inquiry" },
    { text: "" },
    { text: "  → webvisionrank.com/contact", color: D.muted },
  ],
}

const ALL_COMPLETIONS = [
  ...Object.keys(CMDS),
  "run crm-automation",
  "run content-pipeline",
  "run invoice-processor",
]

const QUICK_CHIPS = [
  { label: "services",           desc: "what we build"    },
  { label: "ai",                 desc: "AI & automation"  },
  { label: "run crm-automation", desc: "live agent demo"  },
  { label: "security",           desc: "Zero Trust"       },
  { label: "status",             desc: "system status"    },
  { label: "pricing",            desc: "tiers"            },
]


// ─── Component ────────────────────────────────────────────────────────────────
export function AgentCard() {
  const wrapRef  = useRef<HTMLDivElement>(null)
  const bodyRef  = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const isInView = useInView(wrapRef, { once: true, margin: "-60px" })

  const [history,  setHistory]  = useState<HistoryEntry[]>([])
  const [active,   setActive]   = useState<ActiveOutput | null>(null)
  const [input,    setInput]    = useState("")
  const [cmdHist,  setCmdHist]  = useState<string[]>([])
  const [histIdx,  setHistIdx]  = useState(-1)
  const [focused,  setFocused]  = useState(false)
  const [cursorOn, setCursorOn] = useState(true)
  const [ready,    setReady]    = useState(false)
  const [suggIdx,  setSuggIdx]  = useState(-1)

  // Auto-demo refs
  const userInteractedRef = useRef(false)
  const autoIdsRef        = useRef<ReturnType<typeof setTimeout>[]>([])
  const autoPhaseRef      = useRef(0)

  const suggestions = useMemo(() => {
    const val = input.trim().toLowerCase()
    if (!val) return []
    return ALL_COMPLETIONS.filter(c => c.startsWith(val)).slice(0, 6)
  }, [input])

  useEffect(() => { setSuggIdx(-1) }, [suggestions])

  const cancelAuto = useCallback(() => {
    userInteractedRef.current = true
    autoIdsRef.current.forEach(clearTimeout)
    autoIdsRef.current = []
    setInput("")
  }, [])

  // Cursor blink
  useEffect(() => {
    const id = setInterval(() => setCursorOn(v => !v), 530)
    return () => clearInterval(id)
  }, [])

  // Welcome on viewport entry
  useEffect(() => {
    if (!isInView || ready) return
    setReady(true)
    setActive({ command: "", lines: WELCOME, revealed: 0 })
  }, [isInView, ready])

  // Line animation — respects per-line delay
  useEffect(() => {
    if (!active) return
    if (active.revealed >= active.lines.length) {
      setHistory(h => [...h, { command: active.command, lines: active.lines }])
      setActive(null)
      return
    }
    const lineDelay = active.lines[active.revealed]?.delay ?? 38
    const t = setTimeout(
      () => setActive(a => a ? { ...a, revealed: a.revealed + 1 } : null),
      lineDelay,
    )
    return () => clearTimeout(t)
  }, [active])

  // Auto-scroll
  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight
  }, [history, active])

  // ─── Command runner ──────────────────────────────────────────────────────────
  const run = useCallback((cmd: string) => {
    const t = cmd.trim().toLowerCase()
    if (!t) return
    setSuggIdx(-1)

    if (t === "clear") {
      setHistory([])
      setActive(null)
      cancelAuto()
      autoPhaseRef.current = 3
      return
    }

    if (t.startsWith("run ")) {
      const wf    = t.slice(4).trim()
      const wfFn  = RUN_WORKFLOWS[wf]
      const lines = wfFn
        ? wfFn()
        : [
            { text: `unknown workflow: ${wf}`, color: D.muted },
            { text: "" },
            { text: "  available:", color: D.ink },
            { text: "  run crm-automation" },
            { text: "  run content-pipeline" },
            { text: "  run invoice-processor" },
          ]
      setActive({ command: t, lines, revealed: 0 })
      setCmdHist(h => [t, ...h.slice(0, 49)])
      setHistIdx(-1)
      return
    }

    const fn    = CMDS[t]
    const lines = fn
      ? fn()
      : [
          { text: `command not found: ${t}`, color: D.muted },
          { text: "type 'help' for available commands." },
        ]
    setActive({ command: t, lines, revealed: 0 })
    setCmdHist(h => [t, ...h.slice(0, 49)])
    setHistIdx(-1)
  }, [cancelAuto])

  // ─── Auto-demo typer ─────────────────────────────────────────────────────────
  const autoType = useCallback((cmd: string) => {
    if (userInteractedRef.current) return
    let i = 0
    const type = () => {
      if (userInteractedRef.current) return
      i++
      setInput(cmd.slice(0, i))
      if (i < cmd.length) {
        autoIdsRef.current.push(setTimeout(type, 72 + Math.random() * 48))
      } else {
        autoIdsRef.current.push(setTimeout(() => {
          if (userInteractedRef.current) return
          setInput("")
          run(cmd)
        }, 380))
      }
    }
    autoIdsRef.current.push(setTimeout(type, 60))
  }, [run])

  // Phase advancement
  useEffect(() => {
    if (active !== null || !ready || userInteractedRef.current) return
    if (autoPhaseRef.current === 0 && history.length === 1 && history[0].command === "") {
      autoPhaseRef.current = 1
      autoIdsRef.current.push(setTimeout(() => {
        if (!userInteractedRef.current) autoType("services")
      }, 2500))
    } else if (
      autoPhaseRef.current === 1 &&
      history.length >= 2 &&
      history[history.length - 1].command === "services"
    ) {
      autoPhaseRef.current = 2
      autoIdsRef.current.push(setTimeout(() => {
        if (!userInteractedRef.current) autoType("run crm-automation")
      }, 2000))
    } else if (autoPhaseRef.current === 2 && history.length >= 3) {
      autoPhaseRef.current = 3
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, history, ready])


  // ─── Input handlers ──────────────────────────────────────────────────────────
  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (active) {
      e.preventDefault()
      setActive(a => a ? { ...a, revealed: a.lines.length } : null)
      return
    }
    if (e.key === "Enter") {
      e.preventDefault()
      if (suggestions.length > 0 && suggIdx >= 0) {
        setInput("")
        run(suggestions[suggIdx])
      } else {
        run(input)
        setInput("")
      }
    } else if (e.key === "Tab") {
      e.preventDefault()
      if (suggestions.length === 0) return
      const nextIdx = (suggIdx + 1) % suggestions.length
      setSuggIdx(nextIdx)
      setInput(suggestions[nextIdx])
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      if (suggestions.length > 0) {
        setSuggIdx(i => Math.max(i - 1, 0))
      } else {
        const idx = Math.min(histIdx + 1, cmdHist.length - 1)
        setHistIdx(idx)
        if (cmdHist[idx] !== undefined) setInput(cmdHist[idx])
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      if (suggestions.length > 0) {
        setSuggIdx(i => (i < suggestions.length - 1 ? i + 1 : -1))
      } else {
        const idx = histIdx - 1
        setHistIdx(idx)
        setInput(idx < 0 ? "" : (cmdHist[idx] ?? ""))
      }
    } else if (e.key === "Escape") {
      e.preventDefault()
      setSuggIdx(-1)
      if (input) setInput("")
    } else if (e.ctrlKey && e.key === "c") {
      e.preventDefault()
      setInput("")
      setSuggIdx(-1)
    }
  }, [active, input, run, histIdx, cmdHist, suggestions, suggIdx])

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (active) {
      setActive(a => a ? { ...a, revealed: a.lines.length } : null)
      return
    }
    setInput(e.target.value)
  }, [active])

  const handleFocus   = useCallback(() => { setFocused(true); cancelAuto() }, [cancelAuto])
  const focusInput    = useCallback(() => inputRef.current?.focus(), [])
  const pickChip      = useCallback((cmd: string) => {
    setInput(""); setSuggIdx(-1); run(cmd); inputRef.current?.focus()
  }, [run])

  const showSuggestions = focused && !active && suggestions.length > 0
  const showQuickChips  = focused && !active && !input && history.length > 0

  // ─── Render ──────────────────────────────────────────────────────────────────
  return (
    <div
      ref={wrapRef}
      className="w-full overflow-hidden rounded-[12px] cursor-text relative"
      style={{
        background: D.bg,
        border:    `1px solid ${focused ? "#3a3835" : D.border}`,
        boxShadow: "0 24px 64px rgba(0,0,0,0.35)",
      }}
      onClick={focusInput}
    >
        {/* Hidden keyboard capture */}
        <input
          ref={inputRef}
          value={input}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          onBlur={() => setFocused(false)}
          style={{ position: "absolute", opacity: 0, width: 1, height: 1, top: 0, left: 0, padding: 0, border: "none" }}
          aria-label="Terminal — type commands to explore WebVisionRank"
          autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck={false}
        />


        {/* Title bar */}
        <div
          className="flex items-center justify-between px-4 py-3"
          style={{ background: D.surface, borderBottom: `1px solid ${D.border}` }}
        >
          <div className="flex items-center gap-1.5">
            <div className="h-3 w-3 rounded-full" style={{ background: "#ff5f57" }} />
            <div className="h-3 w-3 rounded-full" style={{ background: "#ffbd2e" }} />
            <div className="h-3 w-3 rounded-full" style={{ background: "#28c840" }} />
          </div>
          <span className="text-[12px]" style={{ fontFamily: "var(--font-mono)", color: D.muted }}>
            wvr-cli — bash
          </span>
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full transition-colors duration-300"
              style={{ background: focused ? "#5a5852" : D.dim }} />
            <span className="text-[11px]" style={{ fontFamily: "var(--font-mono)", color: D.muted }}>
              {focused ? "active" : "click to type"}
            </span>
          </div>
        </div>

        {/* Terminal body */}
        <div
          ref={bodyRef}
          className="relative h-[340px] overflow-y-auto p-5"
          style={{ fontFamily: "var(--font-mono)", background: D.bg }}
        >
          {/* CRT scanlines */}
          <div
            aria-hidden
            style={{
              position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none",
              backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.07) 3px, rgba(0,0,0,0.07) 4px)",
            }}
          />

          {/* Content (above scanlines) */}
          <div className="relative" style={{ zIndex: 3 }}>
            {/* History */}
            {history.map((entry, i) => (
              <div key={i} className="mb-4">
                {entry.command && (
                  <div className="flex items-baseline gap-x-1.5 text-[13px] mb-1.5">
                    <span style={{ color: D.muted }}>wvr@cli</span>
                    <span style={{ color: D.dim }}>:</span>
                    <span style={{ color: D.primary, textShadow: "0 0 8px rgba(34,181,212,0.3)" }}>~</span>
                    <span style={{ color: D.primary, marginLeft: 2, textShadow: "0 0 8px rgba(34,181,212,0.3)" }}>$</span>
                    <span style={{ color: D.body, marginLeft: 4 }}>{entry.command}</span>
                  </div>
                )}
                {entry.lines.map((line, j) => renderLine(line, j, false))}
              </div>
            ))}

            {/* Animating output */}
            {active && (
              <div className="mb-4">
                {active.command && (
                  <div className="flex items-baseline gap-x-1.5 text-[13px] mb-1.5">
                    <span style={{ color: D.muted }}>wvr@cli</span>
                    <span style={{ color: D.dim }}>:</span>
                    <span style={{ color: D.primary, textShadow: "0 0 8px rgba(34,181,212,0.3)" }}>~</span>
                    <span style={{ color: D.primary, marginLeft: 2, textShadow: "0 0 8px rgba(34,181,212,0.3)" }}>$</span>
                    <span style={{ color: D.body, marginLeft: 4 }}>{active.command}</span>
                  </div>
                )}
                {active.lines.slice(0, active.revealed).map((line, j) =>
                  renderLine(line, j, j < 2)
                )}
              </div>
            )}

            {/* Live input prompt */}
            {!active && (
              <div className="flex items-center text-[13px]">
                <span style={{ color: D.muted, marginRight: 3 }}>wvr@cli</span>
                <span style={{ color: D.dim, marginRight: 3 }}>:</span>
                <span style={{ color: D.primary, marginRight: 6, textShadow: "0 0 8px rgba(34,181,212,0.3)" }}>~$</span>
                <span style={{ color: D.body }}>
                  {suggIdx >= 0 && suggestions[suggIdx]
                    ? <span style={{ color: D.ink }}>{suggestions[suggIdx]}</span>
                    : input
                  }
                  <span style={{
                    display: "inline-block", verticalAlign: "middle",
                    width: 7, height: 14, marginLeft: 1,
                    background: focused && cursorOn ? D.body : "transparent",
                    boxShadow: focused && cursorOn ? "0 0 6px rgba(160,156,146,0.5)" : "none",
                    borderRadius: 1,
                  }} />
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Suggestion / Quick-access strip */}
        <AnimatePresence>
          {(showSuggestions || showQuickChips) && (
            <motion.div
              key={showSuggestions ? "suggestions" : "quick"}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              style={{ overflow: "hidden", borderTop: `1px solid ${D.border}`, background: D.surface }}
            >
              <div className="px-4 py-3">
                {showSuggestions ? (
                  <>
                    <p className="text-[9px] uppercase tracking-[0.12em] mb-2"
                      style={{ color: D.dim, fontFamily: "var(--font-mono)" }}>
                      Completions — ↑↓ navigate · [tab] cycle · enter run
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {suggestions.map((s, i) => (
                        <button
                          key={s}
                          type="button"
                          onMouseDown={e => { e.preventDefault(); pickChip(s) }}
                          className="flex items-center gap-1.5 rounded-[5px] px-2.5 py-1 text-[12px] transition-all duration-100"
                          style={{
                            background: i === suggIdx ? "rgba(240,237,232,0.09)" : "rgba(240,237,232,0.03)",
                            border:     `1px solid ${i === suggIdx ? "rgba(240,237,232,0.22)" : D.border}`,
                            color:      i === suggIdx ? D.ink : D.muted,
                            fontFamily: "var(--font-mono)",
                          }}
                        >
                          {s}
                          {i === suggIdx && (
                            <span className="text-[10px]" style={{ color: D.dim }}>↵</span>
                          )}
                        </button>
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    <p className="text-[9px] uppercase tracking-[0.12em] mb-2"
                      style={{ color: D.dim, fontFamily: "var(--font-mono)" }}>
                      Quick commands
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {QUICK_CHIPS.map(({ label, desc }) => (
                        <button
                          key={label}
                          type="button"
                          onMouseDown={e => { e.preventDefault(); pickChip(label) }}
                          className="flex items-center gap-2 rounded-[5px] px-2.5 py-1.5 text-[12px] transition-all duration-150"
                          style={{
                            background: "rgba(240,237,232,0.03)",
                            border:     `1px solid ${D.border}`,
                            color:      D.muted,
                            fontFamily: "var(--font-mono)",
                          }}
                          onMouseEnter={e => {
                            e.currentTarget.style.background = "rgba(240,237,232,0.07)"
                            e.currentTarget.style.borderColor = "rgba(240,237,232,0.15)"
                            e.currentTarget.style.color = D.body
                          }}
                          onMouseLeave={e => {
                            e.currentTarget.style.background = "rgba(240,237,232,0.03)"
                            e.currentTarget.style.borderColor = D.border
                            e.currentTarget.style.color = D.muted
                          }}
                        >
                          <span>{label}</span>
                          <span className="text-[10px]" style={{ color: D.dim }}>{desc}</span>
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Status bar */}
        <div
          className="flex items-center justify-between px-4 py-2"
          style={{ background: D.surface, borderTop: `1px solid ${D.border}` }}
        >
          <span className="text-[11px]" style={{ color: D.dim, fontFamily: "var(--font-mono)" }}>
            WVR CLI v1.0
          </span>
          <span className="text-[11px]" style={{ color: D.muted, fontFamily: "var(--font-mono)" }}>
            <span className="hidden sm:inline">
              {showSuggestions
                ? "↑↓ navigate · tab cycle · enter run · esc cancel"
                : focused
                ? "↑↓ history · tab complete · enter run · esc clear"
                : "click to type · auto-demo active"}
            </span>
            <span className="sm:hidden">
              {focused ? "↑↓ · tab · enter · esc" : "tap to type"}
            </span>
          </span>
        </div>
    </div>
  )
}
