"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { useInView } from "framer-motion"
import { SITE_CONFIG } from "@/lib/constants"

// Always-dark — terminal stays dark regardless of site theme
const D = {
  bg:      "#0f0e0c",
  surface: "#1c1a17",
  border:  "#2e2c28",
  ink:     "#f0ede8",
  body:    "#a09c92",
  muted:   "#6b6760",
  dim:     "#3d3b37",
  primary: "#22b5d4",  // kept only for $ prompt + ✓ symbol
}

type Line = { text: string; color?: string }
type HistoryEntry = { command: string; lines: Line[] }
type ActiveOutput = { command: string; lines: Line[]; revealed: number }

const WELCOME: Line[] = [
  { text: `WebVisionRank CLI  ·  v1.0.0`, color: D.ink },
  { text: "─".repeat(46), color: D.dim },
  { text: "AI automation · Zero-Trust security · Elite dev" },
  { text: "" },
  { text: "Type 'help' for available commands.", color: D.muted },
  { text: "" },
]

const CMDS: Record<string, () => Line[]> = {
  help: () => [
    { text: "Commands:", color: D.ink },
    { text: "" },
    { text: "  services   what we build" },
    { text: "  ai         AI & automation" },
    { text: "  security   Zero-Trust architecture" },
    { text: "  dev        custom development" },
    { text: "  geo        marketing & GEO" },
    { text: "  pricing    investment tiers" },
    { text: "  about      who we are" },
    { text: "  contact    get in touch" },
    { text: "" },
    { text: "  ls  ·  whoami  ·  uptime  ·  clear", color: D.dim },
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

  services: () => [
    { text: "Core Disciplines:", color: D.ink },
    { text: "" },
    { text: "  01  AI & Agentic Automation" },
    { text: "      LLM pipelines · multi-agent systems · RAG" },
    { text: "" },
    { text: "  02  Zero-Trust Security" },
    { text: "      Architecture · pen testing · continuous monitoring" },
    { text: "" },
    { text: "  03  Custom Software Development" },
    { text: "      Full-stack · APIs · DevOps · CI/CD" },
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
  ],

  security: () => [
    { text: "Zero-Trust Security", color: D.ink },
    { text: "" },
    { text: "  Security from the first line of code." },
    { text: "  Never bolted on — always built in." },
    { text: "" },
    { text: "  · Zero-Trust architecture design" },
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
    { text: "  · Full-stack web & mobile apps" },
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
    { text: "  GEO-optimized from day one." },
    { text: "" },
    { text: "  · Generative Engine Optimization (GEO)" },
    { text: "  · AI-assisted content strategy" },
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
    { text: "  Zero-Trust cybersecurity, and elite software engineering." },
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

export function AgentCard() {
  const wrapRef   = useRef<HTMLDivElement>(null)
  const bodyRef   = useRef<HTMLDivElement>(null)
  const inputRef  = useRef<HTMLInputElement>(null)
  const isInView  = useInView(wrapRef, { once: true, margin: "-60px" })

  const [history,   setHistory]   = useState<HistoryEntry[]>([])
  const [active,    setActive]    = useState<ActiveOutput | null>(null)
  const [input,     setInput]     = useState("")
  const [cmdHist,   setCmdHist]   = useState<string[]>([])
  const [histIdx,   setHistIdx]   = useState(-1)
  const [focused,   setFocused]   = useState(false)
  const [cursorOn,  setCursorOn]  = useState(true)
  const [ready,     setReady]     = useState(false)

  // Cursor blink
  useEffect(() => {
    const id = setInterval(() => setCursorOn(v => !v), 530)
    return () => clearInterval(id)
  }, [])

  // Welcome message on first viewport entry
  useEffect(() => {
    if (!isInView || ready) return
    setReady(true)
    setActive({ command: "", lines: WELCOME, revealed: 0 })
  }, [isInView, ready])

  // Animate output lines one at a time
  useEffect(() => {
    if (!active) return
    if (active.revealed >= active.lines.length) {
      setHistory(h => [...h, { command: active.command, lines: active.lines }])
      setActive(null)
      return
    }
    const t = setTimeout(
      () => setActive(a => a ? { ...a, revealed: a.revealed + 1 } : null),
      38,
    )
    return () => clearTimeout(t)
  }, [active])

  // Auto-scroll to bottom
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight
    }
  }, [history, active])

  const run = useCallback((cmd: string) => {
    const t = cmd.trim().toLowerCase()
    if (!t) return
    if (t === "clear") {
      setHistory([])
      setActive(null)
      return
    }
    const fn = CMDS[t]
    const lines: Line[] = fn
      ? fn()
      : [
          { text: `command not found: ${t}`, color: D.muted },
          { text: "type 'help' for available commands." },
        ]
    setActive({ command: t, lines, revealed: 0 })
    setCmdHist(h => [t, ...h.slice(0, 49)])
    setHistIdx(-1)
  }, [])

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    // Any key during animation skips to completion
    if (active) {
      e.preventDefault()
      setActive(a => a ? { ...a, revealed: a.lines.length } : null)
      return
    }
    if (e.key === "Enter") {
      e.preventDefault()
      run(input)
      setInput("")
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      const idx = Math.min(histIdx + 1, cmdHist.length - 1)
      setHistIdx(idx)
      if (cmdHist[idx] !== undefined) setInput(cmdHist[idx])
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      const idx = histIdx - 1
      setHistIdx(idx)
      setInput(idx < 0 ? "" : (cmdHist[idx] ?? ""))
    } else if (e.ctrlKey && e.key === "c") {
      e.preventDefault()
      setInput("")
    }
  }, [active, input, run, histIdx, cmdHist])

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (active) {
      setActive(a => a ? { ...a, revealed: a.lines.length } : null)
      return
    }
    setInput(e.target.value)
  }, [active])

  const focusInput = useCallback(() => inputRef.current?.focus(), [])

  return (
    <div
      ref={wrapRef}
      className="w-full overflow-hidden rounded-[12px] cursor-text relative"
      style={{
        background: D.bg,
        border:     `1px solid ${focused ? "#3a3835" : D.border}`,
        boxShadow:  "0 24px 64px rgba(0,0,0,0.35)",
      }}
      onClick={focusInput}
    >
      {/* Hidden input — keyboard capture for both desktop and mobile */}
      <input
        ref={inputRef}
        value={input}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{ position: "absolute", opacity: 0, width: 1, height: 1, top: 0, left: 0, padding: 0, border: "none" }}
        aria-label="Terminal input — type commands to explore WebVisionRank"
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false}
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
          wvr — WebVisionRank CLI
        </span>
        <div className="flex items-center gap-1.5">
          <span
            className="h-1.5 w-1.5 rounded-full transition-colors duration-300"
            style={{ background: focused ? "#5a5852" : D.dim }}
          />
          <span className="text-[11px]" style={{ fontFamily: "var(--font-mono)", color: D.muted }}>
            {focused ? "active" : "click to type"}
          </span>
        </div>
      </div>

      {/* Terminal body — scrollable output */}
      <div
        ref={bodyRef}
        className="h-[370px] overflow-y-auto p-5"
        style={{ fontFamily: "var(--font-mono)", background: D.bg }}
      >
        {/* History entries */}
        {history.map((entry, i) => (
          <div key={i} className="mb-4">
            {entry.command && (
              <div className="flex items-baseline gap-x-2 text-[13px] mb-1.5">
                <span style={{ color: D.muted }}>~</span>
                <span style={{ color: D.primary }}>$</span>
                <span style={{ color: D.body }}>{entry.command}</span>
              </div>
            )}
            {entry.lines.map((line, j) => (
              <div
                key={j}
                className="text-[13px] leading-[1.65]"
                style={{ color: line.color ?? D.body }}
              >
                {line.text || " "}
              </div>
            ))}
          </div>
        ))}

        {/* Currently animating output */}
        {active && (
          <div className="mb-4">
            {active.command && (
              <div className="flex items-baseline gap-x-2 text-[13px] mb-1.5">
                <span style={{ color: D.muted }}>~</span>
                <span style={{ color: D.primary }}>$</span>
                <span style={{ color: D.body }}>{active.command}</span>
              </div>
            )}
            {active.lines.slice(0, active.revealed).map((line, j) => (
              <div
                key={j}
                className="text-[13px] leading-[1.65]"
                style={{ color: line.color ?? D.body }}
              >
                {line.text || " "}
              </div>
            ))}
          </div>
        )}

        {/* Live input prompt */}
        {!active && (
          <div className="flex items-center text-[13px]">
            <span style={{ color: D.muted, marginRight: 6 }}>~</span>
            <span style={{ color: D.primary, marginRight: 6 }}>$</span>
            <span style={{ color: D.body }}>
              {input}
              <span
                style={{
                  display:       "inline-block",
                  verticalAlign: "middle",
                  width:         7,
                  height:        14,
                  marginLeft:    1,
                  background:    focused && cursorOn ? D.body : "transparent",
                  borderRadius:  1,
                  flexShrink:    0,
                }}
              />
            </span>
          </div>
        )}
      </div>

      {/* Status bar */}
      <div
        className="flex items-center justify-between px-4 py-2"
        style={{ background: D.surface, borderTop: `1px solid ${D.border}` }}
      >
        <span className="text-[11px]" style={{ color: D.dim, fontFamily: "var(--font-mono)" }}>
          WVR CLI v1.0.0
        </span>
        <span className="text-[11px]" style={{ color: D.muted, fontFamily: "var(--font-mono)" }}>
          <span className="hidden sm:inline">{focused ? "↑↓ history · enter to run · ctrl+c to cancel" : "click to explore"}</span>
          <span className="sm:hidden">{focused ? "↑↓ · enter · ctrl+c" : "tap to type"}</span>
        </span>
      </div>
    </div>
  )
}
