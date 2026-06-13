import { ImageResponse } from "next/og"

export const runtime     = "edge"
export const alt         = "WebVisionRank — AI Powered. Security First. Elite Engineering."
export const size        = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function OgImage() {
  return new ImageResponse(
    <div
      style={{
        background: "#0e0d0b",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "system-ui, -apple-system, sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Amber top glow */}
      <div style={{
        position: "absolute", top: -120, left: "50%",
        transform: "translateX(-50%)",
        width: 900, height: 500,
        background: "radial-gradient(ellipse, rgba(251,191,36,0.07) 0%, transparent 65%)",
        borderRadius: "50%",
        display: "flex",
      }} />
      {/* Blue bottom depth */}
      <div style={{
        position: "absolute", bottom: -80, left: "50%",
        transform: "translateX(-50%)",
        width: 800, height: 400,
        background: "radial-gradient(ellipse, rgba(96,165,250,0.06) 0%, transparent 65%)",
        borderRadius: "50%",
        display: "flex",
      }} />

      {/* Content */}
      <div style={{
        display: "flex", flexDirection: "column",
        alignItems: "center", gap: "28px",
        position: "relative", padding: "0 80px",
      }}>
        {/* Label */}
        <div style={{
          fontSize: 13, fontWeight: 400,
          letterSpacing: "0.18em", textTransform: "uppercase",
          color: "#5e5b55",
        }}>
          WEBVISIONRANK
        </div>

        {/* Headline */}
        <div style={{
          fontSize: 64, fontWeight: 400,
          color: "#f0ede8",
          letterSpacing: "-0.035em",
          textAlign: "center",
          lineHeight: 1.05,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 0,
        }}>
          <span>AI Powered.</span>
          <span>Security First.</span>
        </div>

        {/* Sub */}
        <div style={{
          fontSize: 20, color: "#6b6760",
          textAlign: "center", letterSpacing: "-0.01em",
        }}>
          Agentic AI · Zero Trust Security · Elite Engineering
        </div>

        {/* Tag row */}
        <div style={{
          display: "flex", gap: "16px", marginTop: "8px",
        }}>
          {["AI Automation", "Cybersecurity", "GEO", "Custom Dev"].map(tag => (
            <div key={tag} style={{
              padding: "6px 14px",
              border: "1px solid #2e2c28",
              borderRadius: "6px",
              fontSize: 13, color: "#4a4840",
              letterSpacing: "0.04em",
            }}>
              {tag}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom line */}
      <div style={{
        position: "absolute", bottom: 48,
        left: 80, right: 80, height: 1,
        background: "#1e1c19",
        display: "flex",
      }} />
      <div style={{
        position: "absolute", bottom: 28,
        display: "flex",
        fontSize: 12, color: "#3d3b37",
        letterSpacing: "0.06em",
      }}>
        webvisionrank.com
      </div>
    </div>,
    { ...size },
  )
}
