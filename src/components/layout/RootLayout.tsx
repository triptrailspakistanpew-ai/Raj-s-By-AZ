import React, { useEffect, useRef } from "react"
import { Outlet, useLocation } from "react-router-dom"
import Lenis from "lenis"
import { Header } from "./Header"
import { StickyFooter } from "./StickyFooter"

export function RootLayout() {
  const lenisRef = useRef<Lenis | null>(null)
  const location = useLocation()

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    })

    lenisRef.current = lenis

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    const rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])

  // Handle route change scrolling & hash navigation
  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash)
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" })
        }, 100)
        return
      }
    }
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior })
  }, [location.pathname, location.hash])

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col antialiased selection:bg-primary selection:text-primary-foreground">
      <Header />
      <main className="flex-1 pt-16">
        <Outlet />
      </main>
      <StickyFooter />
    </div>
  )
}

export default RootLayout
