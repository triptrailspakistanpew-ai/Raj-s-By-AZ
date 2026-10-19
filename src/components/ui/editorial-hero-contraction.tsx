"use client"

import React, { useEffect, useState } from "react"
import { BrandLogoIcon } from "@/src/components/BrandLogo"

export interface EditorialHeroProps {
  title?: string
  subtitle?: string
  description?: string
  tagline?: string
  ctaText?: string
  ctaHref?: string
  modelImage?: string
}

// Brand business highlight ticker items for Raj's By AZ
const MARQUEE_LOGOS = [
  { name: "14-Item Mini Box", icon: "gift" },
  { name: "20-Item Signature Box", icon: "gem" },
  { name: "25-Item Deluxe Box", icon: "crown" },
  { name: "Free Delivery Nationwide", icon: "star" },
  { name: "Cash on Delivery Available", icon: "shield" },
  { name: "Curated Makeup & Jewellery", icon: "sparkle" },
  { name: "Luxury Keepsake Boxes", icon: "box" },
  { name: "Custom Greeting Cards", icon: "heart" },
  { name: "Easy WhatsApp Ordering", icon: "chat" },
]

export function VisageHeroSection({
  title = "CURATED BEAUTY\nGIFT BOXES",
  description = "A little beauty, beautifully gifted. Discover thoughtfully curated gift boxes filled with makeup, jewellery and pretty accessories. Perfect for birthdays, special celebrations and treating yourself.",
  ctaText = "EXPLORE BOXES",
  ctaHref = "#final-collection",
  modelImage = "https://res.cloudinary.com/dvyhnxnpq/image/upload/v1792107554/f2aa790a-c6cb-4e77-b6a7-215b5c77cded_kggm6t.webp",
}: EditorialHeroProps) {
  const [loaded, setLoaded] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  // Trigger scale-down and upward glide animations after initial load
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true)
    }, 40)

    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      clearTimeout(timer)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Split title lines either by newline or balanced 2-line break
  let titleLines = title.includes("\n") ? title.split("\n") : []
  if (titleLines.length === 0) {
    const words = title.split(" ")
    if (words.length >= 4) {
      titleLines = [words.slice(0, 2).join(" "), words.slice(2).join(" ")]
    } else if (words.length >= 2) {
      titleLines = [words[0], words.slice(1).join(" ")]
    } else {
      titleLines = [title]
    }
  }

  return (
    <div className="relative w-full text-[#141210] overflow-hidden select-none">
      {/* 
        Main Hero Section:
        - Fixed, comfortable viewport height on large screens (lg:h-[680px] xl:h-[720px])
        - Centered 1280px container so the left content is perfectly aligned
        - Absolute 50% right-half image that goes to the edge of the screen
      */}
      <div className="relative w-full lg:h-[680px] xl:h-[770px] overflow-hidden">
        
        {/* Desktop Full-Bleed Right Image (Fills the right 50% of the viewport) */}
        <div className="hidden lg:block absolute top-0 right-0 w-1/2 h-full overflow-hidden z-0">
          <div className="w-full h-full relative overflow-hidden">
            <img
              src={modelImage}
              alt="Curated Beauty Gift Box - Raj's By AZ"
              className="w-full h-full object-cover object-center"
              style={{
                transform: `scale(${loaded ? 1 : 1.18}) translateY(${scrollY * 0.12}px)`,
                transition: loaded
                  ? "transform 1.35s cubic-bezier(0.16, 1, 0.3, 1)"
                  : "none",
                willChange: "transform",
              }}
              loading="eager"
            />
          </div>
        </div>

        {/* Desktop Arc Wrap Circular Rotating Badge (Straddles the 50% center seam) */}
        <div
          className="hidden lg:flex absolute bottom-10 xl:bottom-12 left-1/2 -translate-x-1/2 z-30 w-32 h-32 xl:w-36 xl:h-36 rounded-full bg-[#161311] text-[#FFB68B] shadow-2xl items-center justify-center p-2 select-none border border-[#FFB68B]/30"
          title="Beauty with Raj's By AZ Forever"
        >
          {/* Rotating SVG circular text with business brand */}
          <svg className="w-full h-full animate-spin-slow" viewBox="0 0 100 100">
            <path
              id="visageCirclePathDesktop"
              d="M 50, 50 m -36, 0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0"
              fill="transparent"
            />
            <text className="text-[9.5px] uppercase font-medium tracking-[0.24em] fill-[#FFB68B]">
              <textPath href="#visageCirclePathDesktop" startOffset="0">
                BEAUTY WITH RAJ&apos;S BY AZ FOREVER •
              </textPath>
            </text>
          </svg>

          {/* Center Brand Icon */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <BrandLogoIcon size={34} />
          </div>
        </div>

        {/* Mobile Top Image Container (Visible overflow so badge is never clipped) */}
        <div className="block lg:hidden w-full relative">
          {/* Inner image container with overflow-hidden for smooth parallax zooming */}
          <div className="w-full h-[360px] sm:h-[420px] relative overflow-hidden">
            <img
              src={modelImage}
              alt="Curated Beauty Gift Box - Raj's By AZ"
              className="w-full h-full object-cover object-center"
              style={{
                transform: `scale(${loaded ? 1 : 1.18}) translateY(${scrollY * 0.12}px)`,
                transition: loaded
                  ? "transform 1.35s cubic-bezier(0.16, 1, 0.3, 1)"
                  : "none",
                willChange: "transform",
              }}
              loading="eager"
            />
          </div>

          {/* Mobile Arc Wrap Circular Rotating Badge (Centered right across the bottom seam of the image, 100% visible) */}
          <div className="flex lg:hidden absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-30 w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#161311] text-[#FFB68B] shadow-2xl items-center justify-center p-2 select-none border border-[#FFB68B]/30">
            <svg className="w-full h-full animate-spin-slow" viewBox="0 0 100 100">
              <path
                id="visageCirclePathMobile"
                d="M 50, 50 m -36, 0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0"
                fill="transparent"
              />
              <text className="text-[10px] uppercase font-medium tracking-[0.24em] fill-[#FFB68B]">
                <textPath href="#visageCirclePathMobile" startOffset="0">
                  BEAUTY WITH RAJ&apos;S BY AZ FOREVER •
                </textPath>
              </text>
            </svg>

            {/* Center Brand Icon */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <BrandLogoIcon size={26} />
            </div>
          </div>
        </div>

        {/* 
          Centered Content Container:
          Constrained to max-w-[1240px] xl:max-w-[1280px] so the text is properly indented from the left edge.
        */}
        <div className="max-w-[1240px] xl:max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-12 w-full h-full flex items-center relative z-10 pointer-events-none">
          <div
            className="w-full lg:w-1/2 h-full flex flex-col justify-center lg:pr-8 xl:pr-12 pt-16 sm:pt-20 pb-12 lg:py-0 pointer-events-auto"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0px)" : "translateY(36px)",
              transition: "opacity 1.1s cubic-bezier(0.16, 1, 0.3, 1), transform 1.1s cubic-bezier(0.16, 1, 0.3, 1)",
              willChange: "transform, opacity",
            }}
          >
            {/* Main Headline - Clean, spacious geometric uppercase font */}
            <h1 className="text-[2.6rem] sm:text-5xl lg:text-[3.8rem] xl:text-[4.4rem] font-normal leading-[0.98] tracking-[-0.02em] text-[#141210] uppercase">
              {titleLines.map((line, idx) => (
                <span key={idx} className="block">
                  {line}
                </span>
              ))}
            </h1>

            {/* Description */}
            <p className="text-[#4E4640] text-sm sm:text-[15px] leading-relaxed max-w-[420px] mt-4 sm:mt-5 font-light tracking-wide">
              {description}
            </p>

            {/* Clean Sharp Rectangular CTA Button */}
            <div className="mt-6 sm:mt-7">
              <a
                href={ctaHref}
                className="inline-flex items-center justify-center bg-[#161311] text-[#FAF6F2] hover:bg-[#2C2622] active:scale-95 px-7 py-3 text-xs font-medium tracking-[0.2em] uppercase transition-all duration-300 shadow-sm cursor-pointer"
              >
                <span>{ctaText}</span>
              </a>
            </div>

            {/* Giant Hollow Outline "Beauty" Watermark Image */}
            <div className="mt-4 sm:mt-5 w-56 sm:w-64 md:w-72 max-w-full select-none pointer-events-none opacity-85">
              <img
                src="https://framerusercontent.com/images/Kh2rbDOXfSUhDnUom2iJWty6I0.png"
                alt="Beauty"
                className="w-full h-auto object-contain"
                loading="eager"
              />
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Infinite Logo Marquee Bar with Raj's By AZ Highlights */}
      <div className="w-full border-t border-border/40 bg-[#FAF5F0] py-4 sm:py-5 overflow-hidden relative">
        {/* Soft edge fade masks */}
        <div className="absolute left-0 inset-y-0 w-16 sm:w-28 bg-gradient-to-r from-[#FAF5F0] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 inset-y-0 w-16 sm:w-28 bg-gradient-to-l from-[#FAF5F0] to-transparent z-10 pointer-events-none" />

        <div className="flex w-max animate-marquee-visage select-none items-center">
          {[...MARQUEE_LOGOS, ...MARQUEE_LOGOS].map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2.5 sm:gap-3 mx-6 sm:mx-8 text-xs sm:text-sm font-semibold uppercase tracking-[0.22em] text-[#48423D] shrink-0 opacity-80 hover:opacity-100 transition-opacity"
            >
              {item.icon === "gift" && (
                <svg className="w-4 h-4 opacity-80 text-[#8C7667]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 12v9H4v-9M2 7h20v5H2zM12 22V7M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
                </svg>
              )}
              {item.icon === "gem" && (
                <svg className="w-4 h-4 opacity-80 text-[#8C7667]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 3h12l4 6-10 12L2 9l4-6zM2 9h20M12 21L8 9M12 21l4-12" />
                </svg>
              )}
              {item.icon === "crown" && (
                <svg className="w-4 h-4 opacity-80 text-[#8C7667]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M2 4l3 12h14l3-12-5 6-5-6-5 6-5-6zM3 20h18" />
                </svg>
              )}
              {item.icon === "star" && (
                <svg className="w-4 h-4 opacity-80 text-[#8C7667]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              )}
              {item.icon === "shield" && (
                <svg className="w-4 h-4 opacity-80 text-[#8C7667]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              )}
              {item.icon === "sparkle" && (
                <svg className="w-4 h-4 opacity-80 text-[#8C7667]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0l2.5 9.5L24 12l-9.5 2.5L12 24l-2.5-9.5L0 12l9.5-2.5z" />
                </svg>
              )}
              {item.icon === "box" && (
                <svg className="w-4 h-4 opacity-80 text-[#8C7667]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                  <line x1="12" y1="22.08" x2="12" y2="12" />
                </svg>
              )}
              {item.icon === "heart" && (
                <svg className="w-4 h-4 opacity-80 text-[#8C7667]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              )}
              {item.icon === "chat" && (
                <svg className="w-4 h-4 opacity-80 text-[#8C7667]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
              )}
              <span>{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Backwards compatibility alias
export const EditorialHeroContraction = VisageHeroSection
