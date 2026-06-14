"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { NAV_ITEMS, SITE_CONFIG } from "@/lib/constants"
import { cn } from "@/lib/utils"

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => { setMobileOpen(false) }, [pathname])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [mobileOpen])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b border-hairline bg-canvas/80 backdrop-blur-md"
          : "border-b border-transparent bg-canvas"
      )}
    >
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-6">

        {/* Logo mark */}
        <Link href="/" className="group" aria-label={SITE_CONFIG.name}>
          <svg viewBox="299 179 443 256" fill="none" xmlns="http://www.w3.org/2000/svg"
            className="h-[36px] w-auto text-ink transition-opacity duration-150 group-hover:opacity-70"
            aria-hidden="true">
            <path fill="currentColor" d="M585.624146,254.825424 C576.927307,239.656754 568.560059,224.286774 559.450989,209.369827 C547.774048,190.247696 526.006348,181.781708 505.180847,187.530807 C484.337708,193.284790 468.579681,213.563110 468.381836,235.222687 C468.208344,254.215546 468.261597,273.210754 468.281158,292.204865 C468.284454,295.396637 467.988678,298.532959 467.221008,301.605560 C466.492401,304.521759 464.753937,306.539825 461.754456,307.556488 C456.448822,309.354889 451.856750,307.514832 448.234222,301.190033 C431.847076,272.578613 415.394989,244.001114 399.364838,215.189682 C389.873718,198.131134 376.478455,186.780380 356.597351,185.814545 C337.152771,184.869919 322.088135,194.075867 311.986450,210.288300 C301.777222,226.673386 301.441833,243.974442 310.875458,261.053314 C318.685089,275.192139 326.730713,289.200775 334.698364,303.252045 C353.426758,336.280212 372.590118,369.071259 390.741333,402.413422 C400.588104,420.501007 422.086151,434.784332 445.321991,430.783447 C465.110992,427.376068 484.540588,407.495453 485.596100,387.343384 C486.616180,367.868988 485.791687,348.368408 485.949219,328.880188 C485.978851,325.214935 485.894531,321.551270 486.654419,317.933472 C487.911987,311.946289 491.603882,309.251526 497.722076,309.592316 C502.747314,309.872284 504.728271,313.629730 506.773254,317.238098 C523.030640,345.923401 539.269043,374.619568 555.440491,403.353363 C564.733337,419.865051 578.393005,430.313904 597.506165,431.436401 C625.420044,433.075684 649.610596,409.191711 649.593201,381.061035 C649.575439,352.236389 649.531860,323.411377 649.662231,294.587250 C649.704407,285.258453 654.966125,281.344177 664.027954,283.351501 C669.691406,284.606049 675.267944,286.613037 681.125793,286.495575 C714.469482,285.826996 740.195068,253.847046 727.603149,218.269501 C719.840820,196.337570 695.559753,181.816742 672.618225,186.693680 C646.298523,192.288742 632.347046,213.966400 631.673279,235.779312 C631.304260,247.723328 631.760864,259.753815 631.791504,271.744415 C631.814941,280.897827 631.909668,290.076324 631.299255,299.198639 C630.747498,307.444275 622.395935,311.023254 616.032654,306.044739 C614.516663,304.858612 613.360229,303.074921 612.373535,301.371887 C603.524353,286.098785 594.750244,270.782196 585.624146,254.825424 Z"/>
          </svg>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-0.5" aria-label="Main navigation">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative px-3.5 py-2 text-[14px] font-medium leading-[1.4] transition-colors duration-150 rounded-[6px]",
                pathname === item.href
                  ? "text-ink"
                  : "text-body hover:text-ink hover:bg-surface-strong"
              )}
            >
              {pathname === item.href && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute inset-0 rounded-[6px] bg-surface-strong"
                  transition={{ type: "spring", bounce: 0.15, duration: 0.35 }}
                />
              )}
              <span className="relative z-10">{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Desktop right: theme toggle + CTA */}
        <div className="hidden md:flex items-center gap-2">
          <ThemeToggle />
          <Button asChild variant="ink" size="default">
            <Link href="/contact">Get Started</Link>
          </Button>
        </div>

        {/* Mobile: theme toggle + hamburger */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            className="flex items-center justify-center p-2 rounded-[6px] text-body hover:text-ink hover:bg-surface-strong transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={mobileOpen ? "x" : "menu"}
                initial={{ rotate: -45, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 45, opacity: 0 }}
                transition={{ duration: 0.12 }}
              >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </motion.div>
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="md:hidden border-t border-hairline bg-canvas overflow-hidden"
          >
            <nav className="flex flex-col px-4 py-3 gap-0.5" aria-label="Mobile navigation">
              {NAV_ITEMS.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "block px-3.5 py-2.5 rounded-[6px] text-[14px] font-medium transition-colors",
                      pathname === item.href
                        ? "text-ink bg-surface-strong"
                        : "text-body hover:text-ink hover:bg-surface-strong"
                    )}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: NAV_ITEMS.length * 0.04 }}
                className="pt-2 pb-1"
              >
                <Button asChild variant="ink" className="w-full">
                  <Link href="/contact">Get Started</Link>
                </Button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
