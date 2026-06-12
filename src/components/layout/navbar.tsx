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

        {/* Wordmark */}
        <Link href="/" className="group" aria-label={SITE_CONFIG.name}>
          <span className="text-[15px] font-semibold tracking-[-0.01em] text-ink">Web</span>
          <span className="text-[15px] font-semibold tracking-[-0.01em] text-ink">Vision</span>
          <span className="text-[15px] font-semibold tracking-[-0.01em] text-ink">Rank</span>
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
