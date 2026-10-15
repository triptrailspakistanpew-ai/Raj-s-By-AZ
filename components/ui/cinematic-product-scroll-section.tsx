"use client"

import React, { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { ArrowDown, Eye, Plus, Minus, MessageCircle, ChevronDown, Volume2, VolumeX, Play } from "lucide-react"
import { animate, stagger } from "animejs"
import Link from "next/link"
import {
  GIFT_BOX_PRODUCTS,
  GiftBoxProduct,
  OCCASIONS,
  WHY_CHOOSE_US,
  HOW_IT_WORKS,
  FAQS,
  BRAND_INFO,
} from "@/src/data/products"
import { EditorialHeroContraction } from "./editorial-hero-contraction"
import { BrandLogoIcon } from "@/src/components/BrandLogo"

// 1. Minimal Product Card Component
function MinimalProductCard({ product }: { product: GiftBoxProduct }) {
  const fullImageUrl = product.thumbnail ?? ""
  const cardRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)

  const handleTouchStart = (e: React.TouchEvent) => {
    const card = cardRef.current
    if (!card) return

    const touch = e.touches[0]
    const rect = card.getBoundingClientRect()
    const x = ((touch.clientX - rect.left) / rect.width) * 100
    const y = ((touch.clientY - rect.top) / rect.height) * 100

    card.style.setProperty("--reveal-x", `${String(x)}%`)
    card.style.setProperty("--reveal-y", `${String(y)}%`)
    setActive(true)
  }

  const handleMouseEnter = (e: React.MouseEvent) => {
    const card = cardRef.current
    if (!card) return

    const rect = card.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100

    card.style.setProperty("--reveal-x", `${String(x)}%`)
    card.style.setProperty("--reveal-y", `${String(y)}%`)
    setActive(true)
  }

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setActive(false)}
      className="group relative block w-full h-full bg-transparent overflow-hidden border border-border/30 hover:border-primary/50 transition-colors duration-700"
    >
      {/* Image Section */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-muted">
        {/* Background: Image (Full color on mobile, grayscale with reveal on desktop) */}
        {fullImageUrl && (
          <Image
            src={fullImageUrl}
            alt={`${product.title} (${product.itemCount} Items) - Raj's By AZ`}
            fill
            className="object-cover md:grayscale md:opacity-90 transition-all duration-1000 ease-out"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        )}

        {/* Foreground: Color Image (Desktop mouse reveal only) */}
        {fullImageUrl && (
          <div
            className="hidden md:block absolute inset-0 w-full h-full transition-all duration-1000 ease-out"
            style={{
              clipPath: `circle(${
                active ? "150%" : "0%"
              } at var(--reveal-x, 50%) var(--reveal-y, 50%))`,
              transition: "clip-path 2.8s cubic-bezier(0.15, 0.85, 0.35, 1)",
            }}
          >
            <Image
              src={fullImageUrl}
              alt={product.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
        )}

        {/* Subtle dark gradient overlay on hover (desktop only) */}
        <div className="hidden md:block absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

        {/* Custom Hover Action (desktop only) */}
        <div
          className={`hidden md:block absolute bottom-6 left-1/2 -translate-x-1/2 transition-all duration-700 cubic-bezier(0.4, 0, 0.2, 1) z-30 w-fit ${
            active
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
          }`}
        >
          <Link
            href={`/products/${product.handle}`}
            className="block bg-background/80 backdrop-blur-md text-foreground text-[8px] sm:text-[10px] uppercase tracking-normal font-medium py-1.5 px-3 sm:py-3 sm:px-8 rounded-full border border-border whitespace-nowrap shadow-xl hover:bg-primary hover:text-primary-foreground transition-colors duration-300 cursor-pointer"
          >
            {product.buttonText}
          </Link>
        </div>
      </div>

      {/* Typography Section */}
      <div className="flex flex-col items-center justify-center text-center p-3 sm:p-6 md:p-8 bg-transparent relative z-20">
        <span className="text-[8px] sm:text-[9px] text-muted-foreground uppercase tracking-[0.4em] mb-1 sm:mb-3 font-light">
          {product.collection?.title ?? "RAJ'S BY AZ"}
        </span>

        <h4 className="text-xs sm:text-sm md:text-base uppercase font-normal text-foreground mb-2 sm:mb-4 w-full line-clamp-2 transition-colors duration-500 tracking-widest">
          {product.title}
        </h4>

        <div className="flex items-center justify-center gap-2">
          <span className="text-[10px] sm:text-xs font-light tracking-[0.15em] text-foreground/80 group-hover:text-foreground transition-colors duration-500">
            {product.price}
          </span>
          <span className="text-[9px] text-muted-foreground font-mono">
            ({product.itemCount} Items)
          </span>
        </div>
      </div>

      {/* Decorative Architectural Corners (desktop only) */}
      <div className="hidden md:block absolute top-0 left-0 w-8 h-[1px] bg-foreground/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100"></div>
      <div className="hidden md:block absolute top-0 left-0 w-[1px] h-8 bg-foreground/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100"></div>
      <div className="hidden md:block absolute top-0 right-0 w-8 h-[1px] bg-foreground/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100"></div>
      <div className="hidden md:block absolute top-0 right-0 w-[1px] h-8 bg-foreground/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100"></div>
    </div>
  )
}

// 2. Product Hero Component (Sticky Scroll Section)
function ProductHero({ product, reversed = false }: { product: GiftBoxProduct; reversed?: boolean }) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const fullImageUrl = product.thumbnail ?? ""
  const [isItemsExpanded, setIsItemsExpanded] = useState<boolean>(false)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const handleScroll = () => {
      const rect = section.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const mask = section.querySelector<HTMLElement>(".color-mask")

      let progress = 0

      if (window.innerWidth < 768) {
        const elementTop = rect.top
        const startReveal = windowHeight
        const endReveal = windowHeight * 0.25

        const totalDistance = startReveal - endReveal
        const currentDistance = startReveal - elementTop

        progress = currentDistance / totalDistance
      } else {
        if (rect.top <= 0) {
          const totalScrollableDistance = rect.height - windowHeight
          if (totalScrollableDistance > 0) {
            progress = Math.abs(rect.top) / totalScrollableDistance
          }
        }
      }

      progress = Math.min(Math.max(progress, 0), 1)

      if (mask) {
        if (window.innerWidth < 768) {
          mask.style.clipPath = `inset(0 ${100 - progress * 100}% 0 0)`
        } else {
          mask.style.clipPath = `inset(0 0 ${100 - progress * 100}% 0)`
        }
      }

      const revealSteps = section.querySelectorAll(".reveal-step")
      revealSteps.forEach((step) => {
        const startProgress = parseFloat(
          step.getAttribute("data-progress") || "0"
        )
        if (progress > startProgress) {
          step.classList.add("active")
        } else {
          step.classList.remove("active")
        }
      })
    }

    handleScroll()

    window.addEventListener("resize", handleScroll)
    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("resize", handleScroll)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <div
      ref={sectionRef}
      id={`box-${product.handle}`}
      className="scroll-section relative h-auto md:h-[250vh] w-full group"
    >
      <div className="relative md:sticky md:top-0 md:left-0 w-full h-auto md:h-screen overflow-hidden bg-transparent">
        <div className="w-full h-auto md:h-full grid grid-cols-1 md:grid-cols-2">
          {/* Images Side */}
          <div
            className={`relative w-full flex items-center justify-center p-3 sm:p-8 md:p-0 max-w-[400px] sm:max-w-[480px] md:max-w-none mx-auto ${
              reversed ? "md:order-2" : ""
            }`}
          >
            <div className="relative w-full aspect-[4/5] md:aspect-auto md:h-full overflow-hidden rounded-2xl md:rounded-none">
              {/* Background: Grayscale Image */}
              <div className="absolute inset-0 w-full h-full flex justify-center bg-transparent">
                {fullImageUrl && (
                  <Image
                    src={fullImageUrl}
                    alt={product.title}
                    fill
                    className="object-contain grayscale brightness-110"
                    priority
                  />
                )}
              </div>

              {/* Foreground: Color Image (Clipped by clipPath) */}
              <div
                className="color-mask absolute inset-0 w-full h-full flex justify-center will-change-[clip-path]"
                style={{ clipPath: "inset(0 0 100% 0)" }}
              >
                {fullImageUrl && (
                  <Image
                    src={fullImageUrl}
                    alt={product.title}
                    fill
                    className="object-contain"
                    priority
                  />
                )}
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div
            className={`flex items-center justify-center py-5 px-6 md:p-12 relative z-20 ${
              reversed ? "md:order-1" : ""
            }`}
          >
            <div className="max-w-sm md:max-w-md w-full flex flex-col gap-6 md:gap-10">
              {/* Step 1: Title & Price */}
              <div
                className="reveal-step transition-all duration-1000 ease-out opacity-0 translate-y-12 [&.active]:opacity-100 [&.active]:translate-y-0"
                data-progress="0.2"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[9px] uppercase tracking-[0.3em] font-mono text-muted-foreground">
                    {product.collection.title}
                  </span>
                  {product.label && (
                    <span className="text-[8px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full bg-primary text-primary-foreground">
                      {product.label}
                    </span>
                  )}
                </div>
                <h2 className="text-lg sm:text-xl md:text-4xl font-semibold tracking-tight text-foreground mb-3">
                  {product.title}
                </h2>
                <div className="flex items-center gap-3">
                  <span className="text-base sm:text-xl font-medium text-foreground">
                    {product.price}
                  </span>
                  <span className="text-xs text-muted-foreground font-mono">
                    · {product.itemCount} Items Included
                  </span>
                </div>
              </div>

              {/* Step 2: Description */}
              <div
                className="reveal-step transition-all duration-1000 ease-out opacity-0 translate-y-12 [&.active]:opacity-100 [&.active]:translate-y-0"
                data-progress="0.4"
              >
                <p className="text-sm md:text-base leading-relaxed text-muted-foreground font-light text-justify pt-6 border-t border-border/50">
                  {product.fullDescription}
                </p>
              </div>

              {/* Step 3: What's Inside Included Items */}
              <div
                className="reveal-step transition-all duration-1000 ease-out opacity-0 translate-y-12 [&.active]:opacity-100 [&.active]:translate-y-0"
                data-progress="0.6"
              >
                <span className="block text-[10px] text-muted-foreground uppercase mb-3 tracking-widest">
                  WHAT'S INSIDE ({product.items.length} ITEMS)
                </span>

                <div className="relative">
                  <div
                    className={`flex flex-wrap gap-2 transition-all duration-300 ease-in-out ${
                      !isItemsExpanded
                        ? "max-h-[96px] sm:max-h-none overflow-hidden pb-4 sm:pb-0"
                        : "max-h-[600px] overflow-visible pb-6 sm:pb-0"
                    }`}
                  >
                    {product.items.map((item: string, i: number) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 text-[10px] uppercase tracking-wider rounded-full border border-border/80 bg-muted/40 text-foreground"
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  {/* Gradient fade overlay when collapsed on mobile */}
                  {!isItemsExpanded && (
                    <div className="sm:hidden absolute bottom-0 inset-x-0 h-9 bg-gradient-to-t from-background via-background/60 to-transparent pointer-events-none" />
                  )}

                  {/* Absolute Arrow Icon placed on top of these pills in the bottom (mobile only, no background or circle) */}
                  <div className="sm:hidden absolute bottom-0 left-1/2 -translate-x-1/2 z-10 flex justify-center">
                    <button
                      type="button"
                      onClick={() => setIsItemsExpanded((prev) => !prev)}
                      aria-label={isItemsExpanded ? "Collapse items" : "Expand items"}
                      className="text-foreground/90 hover:text-foreground transition-colors cursor-pointer p-1 active:scale-90"
                    >
                      <ChevronDown
                        className={`w-5 h-5 transition-transform duration-300 drop-shadow-sm ${
                          isItemsExpanded ? "rotate-180" : "rotate-0"
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>

              {/* Step 4: Action Button */}
              <div
                className="reveal-step pt-8 transition-all duration-1000 ease-out opacity-0 translate-y-12 [&.active]:opacity-100 [&.active]:translate-y-0"
                data-progress="0.8"
              >
                <Link
                  href={`/products/${product.handle}`}
                  className="w-full block"
                >
                  <button
                    className="w-full h-14 bg-primary text-primary-foreground hover:bg-primary/90 text-xs font-medium uppercase flex items-center justify-center gap-3 rounded-full transition-colors duration-300 cursor-pointer shadow-lg"
                  >
                    <span className="tracking-widest">{product.cta.toUpperCase()}</span>
                    <Eye width={16} />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Occasion Video Player with automatic autoplay as soon as it enters viewport
function OccasionVideoPlayer({
  videoSrc,
  poster,
  title,
}: {
  videoSrc: string
  poster: string
  title: string
}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // As soon as it is visible, it will start playing
            video.muted = true
            const playPromise = video.play()
            if (playPromise !== undefined) {
              playPromise
                .then(() => setIsPlaying(true))
                .catch(() => {
                  video.muted = true
                  video.play().then(() => setIsPlaying(true)).catch(() => {})
                })
            }
          } else {
            video.pause()
            setIsPlaying(false)
          }
        })
      },
      {
        threshold: 0.15, // Starts playing as soon as 15% is visible
      }
    )

    observer.observe(video)

    return () => {
      observer.disconnect()
    }
  }, [])

  // Coordinate muting so only one video plays sound at a time
  useEffect(() => {
    const handleOtherUnmuted = (e: Event) => {
      const customEvent = e as CustomEvent<{ src: string }>
      if (customEvent.detail?.src !== videoSrc) {
        setIsMuted(true)
        if (videoRef.current) {
          videoRef.current.muted = true
        }
      }
    }

    window.addEventListener("occasion-video-unmute", handleOtherUnmuted)
    return () => {
      window.removeEventListener("occasion-video-unmute", handleOtherUnmuted)
    }
  }, [videoSrc])

  const handleToggleSound = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const video = videoRef.current
    if (!video) return
    const nextMuted = !isMuted
    video.muted = nextMuted
    setIsMuted(nextMuted)
    if (!nextMuted) {
      window.dispatchEvent(
        new CustomEvent("occasion-video-unmute", {
          detail: { src: videoSrc },
        })
      )
    }
    if (video.paused) {
      video.play().then(() => setIsPlaying(true)).catch(() => {})
    }
  }

  const handleTogglePlay = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement
    if (target.closest("a") || target.closest("button")) return

    const video = videoRef.current
    if (!video) return
    if (video.paused) {
      video.play().then(() => setIsPlaying(true)).catch(() => {})
    } else {
      video.pause()
      setIsPlaying(false)
    }
  }

  return (
    <div
      onClick={handleTogglePlay}
      className="relative aspect-[3/4] w-full overflow-hidden bg-black select-none cursor-pointer group/video"
    >
      <video
        ref={videoRef}
        src={videoSrc}
        poster={poster}
        muted={isMuted}
        playsInline
        loop
        preload="auto"
        className="w-full h-full object-cover transition-opacity duration-700"
        aria-label={title}
      />


      {/* Sound Toggle Button */}
      <button
        type="button"
        onClick={handleToggleSound}
        title={isMuted ? "Unmute audio" : "Mute audio"}
        className="absolute top-3 right-3 z-30 w-8 h-8 rounded-full bg-black/60 hover:bg-black/85 backdrop-blur-md text-white border border-white/20 flex items-center justify-center transition-all cursor-pointer shadow-md active:scale-95"
      >
        {isMuted ? (
          <VolumeX className="w-3.5 h-3.5 text-white/80" />
        ) : (
          <Volume2 className="w-3.5 h-3.5 text-rose-300" />
        )}
      </button>

      {/* Play/Pause indicator when user manually pauses */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
          <div className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-xl">
            <Play className="w-5 h-5 ml-0.5 fill-white text-white" />
          </div>
        </div>
      )}

      {/* Subtle bottom gradient on hover (desktop only) */}
      <div className="hidden md:block absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

      {/* Custom Hover Action (desktop only) */}
      <div className="hidden md:block absolute bottom-6 left-1/2 -translate-x-1/2 transition-all duration-700 cubic-bezier(0.4, 0, 0.2, 1) z-30 w-fit translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
        <a
          href="#final-collection"
          className="block bg-background/80 backdrop-blur-md text-foreground text-[8px] sm:text-[10px] uppercase tracking-normal font-medium py-1.5 px-3 sm:py-3 sm:px-8 rounded-full border border-border whitespace-nowrap shadow-xl hover:bg-primary hover:text-primary-foreground transition-colors duration-300 cursor-pointer"
        >
          Explore Collection
        </a>
      </div>
    </div>
  )
}

// 3. Main Unified Component
export function Component() {
  const finalTitle = "RAJ'S BY AZ"
  const finalSubtitle = "BEAUTY, LOVE & LITTLE SURPRISES"
  const finalDescription = "A little beauty, beautifully gifted. Discover thoughtfully curated gift boxes filled with makeup, jewellery and pretty little accessories. Made for birthdays, surprises, special moments and treating yourself."
  const finalButtonText = "View Collection"

  const containerRef = useRef<HTMLDivElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)
  const finalCollectionRef = useRef<HTMLDivElement>(null)
  const animeTriggered = useRef(false)
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0)
  const [isSignatureItemsExpanded, setIsSignatureItemsExpanded] = useState<boolean>(false)

  useEffect(() => {
    if (!finalCollectionRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !animeTriggered.current) {
          if (!finalCollectionRef.current) return
          animeTriggered.current = true
          
          animate(finalCollectionRef.current.querySelectorAll('.anime-card'), {
            translateY: [-200, 0],
            opacity: [0, 1],
            delay: stagger(150),
            duration: 1000,
            easing: 'easeOutElastic(1, .6)'
          })
        }
      },
      { threshold: 0.2 }
    )

    observer.observe(finalCollectionRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    const handleContainerScroll = () => {
      const indicator = scrollIndicatorRef.current
      const track = indicator?.parentElement
      if (!indicator || !track) return

      const maxScroll = container.scrollWidth - container.clientWidth
      if (maxScroll <= 0) {
        track.style.display = "none"
        return
      } else {
        track.style.display = "block"
      }

      const scrollPercentage =
        (Math.abs(container.scrollLeft) / maxScroll) * 100
      indicator.style.left = `${scrollPercentage * 0.666}%`
    }

    container.addEventListener("scroll", handleContainerScroll, {
      passive: true,
    })
    const timeoutId = setTimeout(handleContainerScroll, 100)

    window.addEventListener("resize", handleContainerScroll)

    return () => {
      container.removeEventListener("scroll", handleContainerScroll)
      window.removeEventListener("resize", handleContainerScroll)
      clearTimeout(timeoutId)
    }
  }, [])

  useEffect(() => {
    if (!containerRef.current) return

    const gridItems = containerRef.current.querySelectorAll(
      ".grid-item, .reveal"
    )

    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px",
    }

    const gridObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show", "active")
        }
      })
    }, observerOptions)

    gridItems.forEach((item) => {
      gridObserver.observe(item)
    })

    return () => {
      gridObserver.disconnect()
    }
  }, [])

  const mainTitleParts = finalTitle.split(" ")
  const mainTitleFirst = mainTitleParts[0]
  const mainTitleRest = mainTitleParts.slice(1).join(" ")

  const toggleFaq = (index: number) => {
    setOpenFaqIndex((prev) => (prev === index ? null : index))
  }

  return (
    <div
      ref={containerRef}
      className="bg-transparent text-foreground antialiased selection:bg-primary selection:text-primary-foreground w-full animate-fade-in"
    >
      {/* 1. Intro Section - Visage Framer Template Hero Section with Raj's By AZ Business Content */}
      <EditorialHeroContraction
        title={"CURATED BEAUTY\nGIFT BOXES"}
        description="A little beauty, beautifully gifted. Discover thoughtfully curated gift boxes filled with makeup, jewellery and pretty accessories. Perfect for birthdays, special celebrations and treating yourself."
        ctaText="EXPLORE BOXES"
        ctaHref="#final-collection"
        modelImage="https://res.cloudinary.com/dvyhnxnpq/image/upload/v1792107554/f2aa790a-c6cb-4e77-b6a7-215b5c77cded_kggm6t.webp"
      />

      {/* 2. Products - Render ProductHero for each item */}
      {GIFT_BOX_PRODUCTS.map((product, index) => (
        <ProductHero key={product.id} product={product} reversed={index % 2 !== 0} />
      ))}

      {/* 3. Summary Horizontal Collection */}
      <div
        ref={finalCollectionRef}
        id="final-collection"
        className="bg-transparent w-full pt-12 pb-4 md:pt-16 md:pb-6 border-t border-border"
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-border pb-4 mb-6 sm:mb-8 gap-3">
            <div>
              <span className="text-[10px] font-bold tracking-[0.2em] text-muted-foreground uppercase block mb-1">
                OUR GIFT COLLECTION
              </span>
              <h3 className="text-sm sm:text-base uppercase tracking-wider font-semibold text-foreground">
                Three boxes. Endless little smiles.
              </h3>
            </div>
            <Link
              href="#signature-spotlight"
              className="group inline-flex items-center gap-1.5 text-xs font-bold uppercase text-foreground hover:text-muted-foreground transition-colors shrink-0"
            >
              <span className="tracking-[0.2em]">{finalButtonText}</span>
              <ArrowDown className="w-3.5 h-3.5 transition-transform -rotate-90 group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* Horizontal Scroll Container: 1 full card and half card peeking on mobile */}
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-4 md:gap-8 pb-8 no-scrollbar snap-x snap-mandatory justify-start md:justify-center px-1 sm:px-0 scroll-pl-1 sm:scroll-pl-0"
          >
            {GIFT_BOX_PRODUCTS.map((product) => (
              <div
                key={product.id}
                className="anime-card grid-item group cursor-pointer w-[72vw] min-w-[72vw] max-w-[72vw] sm:w-[calc(33.333%-11px)] sm:min-w-[calc(33.333%-11px)] sm:max-w-[calc(33.333%-11px)] md:w-[300px] md:min-w-[300px] md:max-w-[320px] snap-start sm:snap-center flex-shrink-0 opacity-0"
              >
                <MinimalProductCard product={product} />
              </div>
            ))}
          </div>

          {/* Horizontal Scroll Progress Bar */}
          <div className="w-24 h-[2px] bg-foreground/10 mx-auto mt-2 rounded-full overflow-hidden relative">
            <div
              ref={scrollIndicatorRef}
              className="h-full bg-foreground w-8 rounded-full absolute left-0 transition-all duration-75"
              style={{ left: "0%" }}
            />
          </div>
        </div>
      </div>

      {/* 4. The Signature Collection Spotlight (Matching architectural split-screen design pattern) */}
      <section id="signature-spotlight" className="w-full pt-16 pb-16 md:pt-24 md:pb-24 border-t border-border">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-border pb-4 mb-12">
            <div>
              <span className="text-[10px] font-bold tracking-[0.4em] text-muted-foreground uppercase block mb-1 font-light">
                THE SIGNATURE COLLECTION
              </span>
              <h3 className="text-xl sm:text-2xl md:text-3xl uppercase tracking-widest font-normal text-foreground">
                Unwrap 20 little luxuries.
              </h3>
            </div>
            <span className="text-[10px] font-mono tracking-widest text-muted-foreground uppercase mt-2 md:mt-0">
              20 ITEMS · Rs. 2,499
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-16 items-center">
            {/* Left: Editorial Image with Architectural Corners */}
            <div className="md:col-span-5 relative group">
              <div className="relative aspect-[3/4] w-full overflow-hidden border border-border/30 bg-muted">
                <Image
                  src={GIFT_BOX_PRODUCTS[1].thumbnail}
                  alt="Signature Beauty Box (20 Items) - Curated Luxury Gift Box by Raj's By AZ"
                  fill
                  className="object-cover md:grayscale md:opacity-90 md:group-hover:grayscale-0 md:group-hover:opacity-100 transition-all duration-1000 ease-out"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30">
                  <Link
                    href={`/products/${GIFT_BOX_PRODUCTS[1].handle}`}
                    className="block bg-background/80 backdrop-blur-md text-foreground text-[8px] sm:text-[10px] uppercase tracking-normal font-medium py-2 px-6 rounded-full border border-border whitespace-nowrap shadow-xl hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
                  >
                    Quick View
                  </Link>
                </div>
              </div>
              {/* Architectural Corners */}
              <div className="absolute top-0 left-0 w-8 h-[1px] bg-foreground/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100"></div>
              <div className="absolute top-0 left-0 w-[1px] h-8 bg-foreground/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100"></div>
              <div className="absolute top-0 right-0 w-8 h-[1px] bg-foreground/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100"></div>
              <div className="absolute top-0 right-0 w-[1px] h-8 bg-foreground/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100"></div>
            </div>

            {/* Right: Architectural 20 Items Inventory */}
            <div className="md:col-span-7 flex flex-col justify-center space-y-6">
              <p className="text-xs sm:text-sm text-muted-foreground font-light leading-relaxed">
                A little makeup, a little sparkle and a whole lot of happiness. Discover the beauty and fashion favourites inside our Signature Beauty Box.
              </p>

              <div>
                <span className="block text-[9px] font-mono uppercase tracking-[0.3em] text-muted-foreground mb-4">
                  COMPLETE 20-ITEM ASSORTMENT
                </span>

                <div className="relative">
                  <div
                    className={`grid grid-cols-2 sm:grid-cols-3 gap-2.5 transition-all duration-300 ease-in-out ${
                      !isSignatureItemsExpanded
                        ? "max-h-[148px] sm:max-h-none overflow-hidden pb-4 sm:pb-0"
                        : "max-h-[1200px] overflow-visible pb-6 sm:pb-0"
                    }`}
                  >
                    {GIFT_BOX_PRODUCTS[1].items.map((item, idx) => (
                      <div
                        key={idx}
                        className="group/item border border-border/30 hover:border-primary/50 p-2.5 transition-colors duration-500 relative flex items-center gap-2 bg-transparent"
                      >
                        <span className="text-[9px] font-mono text-muted-foreground">
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                        <span className="text-[11px] uppercase tracking-wider font-light text-foreground/90 truncate">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Gradient fade overlay when collapsed on mobile */}
                  {!isSignatureItemsExpanded && (
                    <div className="sm:hidden absolute bottom-0 inset-x-0 h-9 bg-gradient-to-t from-background via-background/60 to-transparent pointer-events-none" />
                  )}

                  {/* Absolute Arrow Icon placed on top of these pills in the bottom (mobile only, no background or circle) */}
                  <div className="sm:hidden absolute bottom-0 left-1/2 -translate-x-1/2 z-10 flex justify-center">
                    <button
                      type="button"
                      onClick={() => setIsSignatureItemsExpanded((prev) => !prev)}
                      aria-label={isSignatureItemsExpanded ? "Collapse items" : "Expand items"}
                      className="text-foreground/90 hover:text-foreground transition-colors cursor-pointer p-1 active:scale-90"
                    >
                      <ChevronDown
                        className={`w-5 h-5 transition-transform duration-300 drop-shadow-sm ${
                          isSignatureItemsExpanded ? "rotate-180" : "rotate-0"
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  href={`/products/${GIFT_BOX_PRODUCTS[1].handle}`}
                  className="inline-block bg-primary text-primary-foreground text-[10px] uppercase tracking-widest font-medium py-3.5 px-8 rounded-full shadow-lg hover:bg-primary/90 transition-colors"
                >
                  Discover the Signature Box
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Occasions Section (Using exact MinimalProductCard design pattern) */}
      <section id="occasions" className="w-full pt-16 pb-16 md:pt-24 md:pb-24 border-t border-border">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-border pb-4 mb-12">
            <div>
              <span className="text-[10px] font-bold tracking-[0.4em] text-muted-foreground uppercase block mb-1 font-light">
                CURATED FOR HER
              </span>
              <h3 className="text-xl sm:text-2xl md:text-3xl uppercase tracking-widest font-normal text-foreground">
                For all the beautiful reasons.
              </h3>
            </div>
            <span className="text-xs text-muted-foreground font-light mt-2 md:mt-0">
              Every little moment deserves something lovely.
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {OCCASIONS.map((occ, idx) => (
              <div
                key={occ.id}
                className="group relative block w-full h-full bg-transparent overflow-hidden border border-border/30 hover:border-primary/50 transition-colors duration-700"
              >
                {/* Media Section: Video or Image */}
                {occ.video ? (
                  <OccasionVideoPlayer
                    videoSrc={occ.video}
                    poster={occ.image}
                    title={occ.title}
                  />
                ) : (
                  <div className="relative aspect-[3/4] w-full overflow-hidden bg-muted">
                    <Image
                      src={occ.image}
                      alt={`${occ.title} - ${occ.tag} Gift Box by Raj's By AZ`}
                      fill
                      className="object-cover md:grayscale md:opacity-90 md:group-hover:grayscale-0 md:group-hover:opacity-100 transition-all duration-1000 ease-out"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="hidden md:block absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                    <div className="hidden md:block absolute bottom-6 left-1/2 -translate-x-1/2 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 z-30 w-fit">
                      <a
                        href="#final-collection"
                        className="block bg-background/80 backdrop-blur-md text-foreground text-[8px] sm:text-[10px] uppercase tracking-normal font-medium py-1.5 px-3 sm:py-3 sm:px-8 rounded-full border border-border whitespace-nowrap shadow-xl hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
                      >
                        Explore Collection
                      </a>
                    </div>
                  </div>
                )}

                {/* Typography */}
                <div className="flex flex-col items-center justify-center text-center p-4 sm:p-6 md:p-8 bg-transparent relative z-20">
                  <span className="text-[8px] sm:text-[9px] text-muted-foreground uppercase tracking-[0.4em] mb-1 font-light">
                    0{idx + 1} / {occ.tag}
                  </span>
                  <h4 className="text-xs sm:text-sm uppercase font-normal text-foreground mb-2 w-full tracking-widest">
                    {occ.title}
                  </h4>
                  <p className="text-[11px] text-muted-foreground font-light leading-relaxed max-w-[260px]">
                    {occ.description}
                  </p>
                </div>

                {/* Corners */}
                <div className="absolute top-0 left-0 w-8 h-[1px] bg-foreground/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100"></div>
                <div className="absolute top-0 left-0 w-[1px] h-8 bg-foreground/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100"></div>
                <div className="absolute top-0 right-0 w-8 h-[1px] bg-foreground/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100"></div>
                <div className="absolute top-0 right-0 w-[1px] h-8 bg-foreground/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Why Choose Raj's By AZ (The Atelier Standard - 4 Architectural Panels) */}
      <section className="w-full pt-16 pb-16 md:pt-24 md:pb-24 border-t border-border">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-border pb-4 mb-12">
            <div>
              <span className="text-[10px] font-bold tracking-[0.4em] text-muted-foreground uppercase block mb-1 font-light">
                THE ATELIER STANDARD
              </span>
              <h3 className="text-xl sm:text-2xl md:text-3xl uppercase tracking-widest font-normal text-foreground">
                Thoughtful gifts, lovely little details.
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_CHOOSE_US.map((item, idx) => (
              <div
                key={idx}
                className="group relative p-6 sm:p-8 border border-border/30 hover:border-primary/50 transition-colors duration-700 flex flex-col justify-between"
              >
                <div>
                  <span className="text-[9px] font-mono text-muted-foreground tracking-widest block mb-4">
                    0{idx + 1}
                  </span>
                  <h4 className="text-xs sm:text-sm uppercase font-normal text-foreground mb-3 tracking-widest">
                    {item.title}
                  </h4>
                  <p className="text-xs text-muted-foreground font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-8 w-6 h-[1px] bg-foreground/20 group-hover:w-12 transition-all duration-500"></div>

                {/* Corners */}
                <div className="absolute top-0 left-0 w-6 h-[1px] bg-foreground/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100"></div>
                <div className="absolute top-0 left-0 w-[1px] h-6 bg-foreground/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100"></div>
                <div className="absolute top-0 right-0 w-6 h-[1px] bg-foreground/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100"></div>
                <div className="absolute top-0 right-0 w-[1px] h-6 bg-foreground/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. How It Works (The Process Timeline) */}
      <section className="w-full pt-16 pb-16 md:pt-24 md:pb-24 border-t border-border">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-border pb-4 mb-12">
            <div>
              <span className="text-[10px] font-bold tracking-[0.4em] text-muted-foreground uppercase block mb-1 font-light">
                THE SIMPLE PROCESS
              </span>
              <h3 className="text-xl sm:text-2xl md:text-3xl uppercase tracking-widest font-normal text-foreground">
                Your lovely gift is just three steps away.
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {HOW_IT_WORKS.map((step) => (
              <div
                key={step.step}
                className="group relative p-6 sm:p-8 border border-border/30 hover:border-primary/50 transition-colors duration-700 flex flex-col justify-between"
              >
                <div>
                  <span className="text-2xl sm:text-3xl font-light font-mono text-foreground/40 block mb-6">
                    {step.step}
                  </span>
                  <h4 className="text-xs sm:text-sm uppercase font-normal text-foreground mb-3 tracking-widest">
                    {step.title}
                  </h4>
                  <p className="text-xs text-muted-foreground font-light leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-8 w-6 h-[1px] bg-foreground/20 group-hover:w-12 transition-all duration-500"></div>

                {/* Corners */}
                <div className="absolute top-0 left-0 w-6 h-[1px] bg-foreground/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100"></div>
                <div className="absolute top-0 left-0 w-[1px] h-6 bg-foreground/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100"></div>
                <div className="absolute top-0 right-0 w-6 h-[1px] bg-foreground/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100"></div>
                <div className="absolute top-0 right-0 w-[1px] h-6 bg-foreground/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Our Little Story (Centered Architectural Layout) */}
      <section id="our-story" className="w-full pt-16 pb-16 md:pt-24 md:pb-24 border-t border-border">
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <span className="text-[10px] font-bold tracking-[0.4em] text-muted-foreground uppercase block mb-3 font-light">
            OUR LITTLE STORY
          </span>
          <h3 className="text-xl sm:text-3xl md:text-4xl uppercase tracking-widest font-normal text-foreground mb-8">
            Made for life's lovely little moments.
          </h3>

          <div className="space-y-6 text-xs sm:text-sm text-muted-foreground font-light leading-relaxed max-w-2xl mx-auto text-justify sm:text-center">
            <p>
              At Raj's By AZ, we believe the smallest surprises can create the happiest moments. A pretty accessory, a favourite makeup essential or a thoughtfully packed gift can make an ordinary day feel special.
            </p>
            <p>
              We bring together beauty, jewellery and fashion accessories in ready-to-gift collections, making it easier to choose something meaningful without shopping for every item separately.
            </p>
            <p>
              Whether you're celebrating your sister, surprising your wife, choosing a birthday present for a friend or simply treating yourself, we're here to make gifting feel a little more beautiful.
            </p>
          </div>

          <div className="mt-10">
            <a
              href="#final-collection"
              className="inline-block bg-background/80 backdrop-blur-md text-foreground text-[8px] sm:text-[10px] uppercase tracking-normal font-medium py-3 px-8 rounded-full border border-border shadow-md hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
            >
              Explore Our Collection
            </a>
          </div>
        </div>
      </section>

      {/* 9. Customer Love Notes (Unboxing Story) */}
      <section className="w-full pt-16 pb-16 md:pt-24 md:pb-24 border-t border-border">
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <span className="text-[10px] font-bold tracking-[0.4em] text-muted-foreground uppercase block mb-2 font-light">
            UNBOXING MEMORIES
          </span>
          <h3 className="text-xl sm:text-2xl md:text-3xl uppercase tracking-widest font-normal text-foreground mb-3">
            Little love notes.
          </h3>
          <p className="text-xs text-muted-foreground font-light mb-10">
            Every gift has a story. We'd love to hear yours.
          </p>

          <div className="group relative p-8 sm:p-12 border border-border/30 hover:border-primary/50 transition-colors duration-700 max-w-2xl mx-auto bg-transparent">
            <p className="text-xs sm:text-sm font-light italic text-foreground/80 leading-relaxed">
              "Your story could be the first one we share. Tell us what made your unboxing special."
            </p>
            <div className="mt-6">
              <a
                href={`https://wa.me/${BRAND_INFO.whatsappInternational}?text=Hi%20Raj's%20By%20AZ,%20I%20would%20love%20to%20share%20my%20unboxing%20experience!`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-background/80 backdrop-blur-md text-foreground text-[8px] sm:text-[10px] uppercase tracking-normal font-medium py-2.5 px-6 rounded-full border border-border shadow-sm hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Share On WhatsApp</span>
              </a>
            </div>

            {/* Corners */}
            <div className="absolute top-0 left-0 w-6 h-[1px] bg-foreground/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100"></div>
            <div className="absolute top-0 left-0 w-[1px] h-6 bg-foreground/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100"></div>
            <div className="absolute top-0 right-0 w-6 h-[1px] bg-foreground/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100"></div>
            <div className="absolute top-0 right-0 w-[1px] h-6 bg-foreground/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100"></div>
          </div>
        </div>
      </section>

      {/* 10. Frequently Asked Questions (Architectural Hairline Accordion) */}
      <section id="faqs" className="w-full pt-16 pb-16 md:pt-24 md:pb-24 border-t border-border">
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-border pb-4 mb-8">
            <div>
              <span className="text-[10px] font-bold tracking-[0.4em] text-muted-foreground uppercase block mb-1 font-light">
                INFORMATION
              </span>
              <h3 className="text-xl sm:text-2xl md:text-3xl uppercase tracking-widest font-normal text-foreground">
                Frequently Asked Questions
              </h3>
            </div>
          </div>

          <div className="divide-y divide-border/30">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx
              return (
                <div key={idx} className="py-4 sm:py-5 border-b border-border/30 last:border-b-0">
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="faq-btn w-full text-left flex items-center justify-between gap-4 cursor-pointer group py-1.5 outline-none focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 select-none border-0 ring-0 shadow-none bg-transparent"
                    style={{ outline: "none", boxShadow: "none" }}
                  >
                    <div className="flex items-center gap-3 sm:gap-4">
                      <span className="text-[9px] font-mono text-muted-foreground">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <span className="text-xs sm:text-sm uppercase font-normal tracking-wider text-foreground group-hover:text-muted-foreground transition-colors">
                        {faq.question}
                      </span>
                    </div>
                    <span className="text-muted-foreground p-1 transition-transform duration-300">
                      {isOpen ? (
                        <Minus className="w-3.5 h-3.5" />
                      ) : (
                        <Plus className="w-3.5 h-3.5" />
                      )}
                    </span>
                  </button>
                  {/* Smooth height transition */}
                  <div
                    className={`grid transition-all duration-500 ease-in-out ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100 pt-2 pb-1"
                        : "grid-rows-[0fr] opacity-0 pt-0 pb-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="pl-7 sm:pl-9 text-xs text-muted-foreground font-light leading-relaxed max-w-2xl">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 11. Final Call To Action (Architectural Centered Hero Style) */}
      <section className="relative w-full py-24 md:py-32 border-t border-border flex flex-col justify-center items-center text-center px-4 overflow-hidden">
        {/* Subtle Ambient Light */}
        <div className="absolute w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="relative z-10 max-w-2xl mx-auto space-y-4">
          <div className="flex justify-center mb-1">
            <BrandLogoIcon size={52} className="hover:scale-105 transition-transform" />
          </div>
          <span className="text-[9px] md:text-[10px] font-black text-muted-foreground uppercase tracking-[0.4em] block font-light">
            A LITTLE SURPRISE, A LOT OF LOVE
          </span>

          <h3 className="text-2xl sm:text-4xl md:text-5xl uppercase tracking-widest font-normal text-foreground">
            A lovely surprise is waiting.
          </h3>

          <p className="text-xs sm:text-sm text-muted-foreground font-light leading-relaxed max-w-lg mx-auto">
            Choose a box full of beauty and little luxuries, thoughtfully put together for someone special.
          </p>

          <div className="pt-6">
            <a
              href="#final-collection"
              className="inline-block bg-primary text-primary-foreground text-[8px] sm:text-[10px] uppercase tracking-normal font-medium py-3.5 px-8 rounded-full shadow-xl hover:bg-primary/90 transition-colors"
            >
              Find Your Gift Box
            </a>
          </div>

          <span className="block text-[9px] font-mono text-muted-foreground/80 tracking-widest pt-4">
            {BRAND_INFO.tagline}
          </span>
        </div>
      </section>
    </div>
  )
}

export default Component
