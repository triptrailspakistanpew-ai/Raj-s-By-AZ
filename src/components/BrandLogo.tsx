import React from "react"
import { cn } from "@/lib/utils"

interface BrandLogoIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
  size?: number
}

/**
 * Brand Logo Icon ONLY (Without Text)
 * Recreating the brand's signature 3-layer rainbow arch with the delicate pink ribbon bow at the apex.
 */
export function BrandLogoIcon({ className, size, ...props }: BrandLogoIconProps) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("shrink-0 select-none", className)}
      style={size ? { width: size, height: size } : undefined}
      aria-label="Raj's By AZ Logo Icon"
      {...props}
    >
      <defs>
        <filter id="brandIconShadow" x="-15%" y="-15%" width="130%" height="130%">
          <feDropShadow dx="0" dy="1.5" stdDeviation="1.5" floodColor="#000000" floodOpacity="0.08" />
        </filter>
      </defs>

      {/* 3 Concentric Boho Arches with Flat Baseline */}
      <g filter="url(#brandIconShadow)">
        {/* Outer Arch: Dusty Rose / Terracotta (#D58380) */}
        <path
          d="M 20 96 L 20 62 A 40 40 0 0 1 100 62 L 100 96"
          stroke="#D58380"
          strokeWidth="8.5"
          strokeLinecap="butt"
          fill="none"
        />

        {/* Middle Arch: Warm Oatmeal / Beige Sand (#DFCEBA) */}
        <path
          d="M 32 96 L 32 62 A 28 28 0 0 1 88 62 L 88 96"
          stroke="#DFCEBA"
          strokeWidth="8"
          strokeLinecap="butt"
          fill="none"
        />

        {/* Inner Arch: Peachy Blush Rose (#EDB5A8) */}
        <path
          d="M 43.5 96 L 43.5 62 A 16.5 16.5 0 0 1 76.5 62 L 76.5 96"
          stroke="#EDB5A8"
          strokeWidth="7.5"
          strokeLinecap="butt"
          fill="none"
        />
      </g>

      {/* Ribbon Bow tied at apex of the arch */}
      <g id="apex-bow">
        {/* Left Loop */}
        <path
          d="M 57 23 C 51 22, 42 16, 42 11 C 42 7.5, 46.5 6.5, 50 9 C 54 12, 57 18.5, 58.5 21 Z"
          fill="#D97A84"
          stroke="#C96874"
          strokeWidth="0.8"
        />
        <path
          d="M 53 14 C 49 11, 46 11, 46 12 C 46 13.5, 49 16, 54 18"
          stroke="#B85964"
          strokeWidth="0.6"
          fill="none"
          opacity="0.45"
        />

        {/* Right Loop */}
        <path
          d="M 63 23 C 69 22, 78 16, 78 11 C 78 7.5, 73.5 6.5, 70 9 C 66 12, 63 18.5, 61.5 21 Z"
          fill="#D97A84"
          stroke="#C96874"
          strokeWidth="0.8"
        />
        <path
          d="M 67 14 C 71 11, 74 11, 74 12 C 74 13.5, 71 16, 66 18"
          stroke="#B85964"
          strokeWidth="0.6"
          fill="none"
          opacity="0.45"
        />

        {/* Left Ribbon Tail */}
        <path
          d="M 57 24 C 55 28, 49 37, 47 43 C 49.5 42, 52 42.5, 54 44 C 54.5 39, 58 29, 60 25 Z"
          fill="#CE6E79"
        />

        {/* Right Ribbon Tail */}
        <path
          d="M 63 24 C 65 28, 71 37, 73 43 C 70.5 42, 68 42.5, 66 44 C 65.5 39, 62 29, 60 25 Z"
          fill="#CE6E79"
        />

        {/* Center Knot */}
        <ellipse cx="60" cy="22.5" rx="3.8" ry="3.2" fill="#D97A84" stroke="#B85964" strokeWidth="0.8" />
        <path
          d="M 58.5 21.5 C 59.5 22.8, 60.5 22.8, 61.5 21.5"
          stroke="#FFFFFF"
          strokeWidth="0.75"
          strokeLinecap="round"
          fill="none"
          opacity="0.7"
        />
      </g>
    </svg>
  )
}

interface BrandLogoWithTextProps {
  className?: string
  layout?: "horizontal" | "stacked"
  variant?: "auto" | "light" | "dark"
  tagline?: boolean
  iconSize?: number
  onClick?: () => void
}

/**
 * Brand Logo WITH Text (Raj's By AZ)
 * Used in the Header and Footer in place of plain text.
 */
export function BrandLogoWithText({
  className,
  layout = "horizontal",
  variant = "auto",
  tagline = false,
  iconSize,
  onClick,
}: BrandLogoWithTextProps) {
  // Color styling based on variant
  const textColorClass =
    variant === "light"
      ? "text-white"
      : variant === "dark"
      ? "text-[#1B1816]"
      : "text-foreground"

  const subColorClass =
    variant === "light"
      ? "text-white/70"
      : variant === "dark"
      ? "text-[#766B64]"
      : "text-muted-foreground"

  if (layout === "stacked") {
    return (
      <div
        onClick={onClick}
        className={cn(
          "flex flex-col items-center text-center select-none group",
          onClick && "cursor-pointer",
          className
        )}
      >
        <BrandLogoIcon
          className="transition-transform duration-300 group-hover:scale-105"
          size={iconSize || 76}
        />
        <div className="mt-2.5">
          <span
            className={cn(
              "font-serif font-bold text-2xl tracking-[0.14em] uppercase block leading-tight",
              textColorClass
            )}
          >
            Raj&apos;s
          </span>
          <span
            className={cn(
              "font-sans font-semibold text-[10px] tracking-[0.42em] uppercase block mt-0.5",
              subColorClass
            )}
          >
            BY AZ
          </span>
          {tagline && (
            <span
              className={cn(
                "font-sans font-normal text-[9px] tracking-[0.2em] uppercase block mt-1.5 opacity-80",
                subColorClass
              )}
            >
              Little luxuries. Beautifully boxed.
            </span>
          )}
        </div>
      </div>
    )
  }

  // Horizontal Layout (ideal for header bar & navigation)
  return (
    <div
      onClick={onClick}
      className={cn(
        "flex items-center gap-2.5 sm:gap-3.5 select-none group",
        onClick && "cursor-pointer",
        className
      )}
    >
      <BrandLogoIcon
        className="transition-transform duration-300 group-hover:scale-105"
        size={iconSize || 38}
      />
      <div className="flex flex-col justify-center">
        <span
          className={cn(
            "font-serif font-bold text-base sm:text-lg tracking-[0.12em] uppercase leading-none",
            textColorClass
          )}
        >
          Raj&apos;s
        </span>
        <span
          className={cn(
            "font-sans font-semibold text-[9px] sm:text-[10px] tracking-[0.38em] uppercase mt-1 leading-none",
            subColorClass
          )}
        >
          BY AZ
        </span>
      </div>
    </div>
  )
}

export default BrandLogoWithText
