import React, { useEffect, useRef, useCallback } from "react"
import { GiftBoxProduct, BRAND_INFO } from "@/src/data/products"
import { ShoppingBag, X, Check } from "lucide-react"

interface ProductQuickViewModalProps {
  product: GiftBoxProduct | null
  onClose: () => void
  onAddToCart: () => void
  onCheckout: () => void
  addedToBag: boolean
}

export default function ProductQuickViewModal({
  product,
  onClose,
  onAddToCart,
  onCheckout,
  addedToBag,
}: ProductQuickViewModalProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const spacerRef = useRef<HTMLDivElement>(null)
  const topSpacerRef = useRef<HTMLDivElement>(null)
  const rafIdRef = useRef<number | null>(null)

  // Track initial calculated height of the hero image box
  const initialHeightRef = useRef<number>(340)

  // Escape key & scroll reset
  useEffect(() => {
    if (!product) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    // Calculate initial height based on viewport
    const isMobile = window.innerWidth < 640
    const calculatedInitial = isMobile
      ? Math.min(Math.round(window.innerHeight * 0.46), 330)
      : 340
    initialHeightRef.current = calculatedInitial

    // Reset container scroll position
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0
    }

    if (headerRef.current) {
      headerRef.current.style.height = `${calculatedInitial}px`
    }
    if (spacerRef.current) {
      spacerRef.current.style.height = "0px"
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current)
      }
    }
  }, [product, onClose])

  // Handle smooth scroll:
  // 1. Drawer scrolls up and sticks to top: 0
  // 2. As user scrolls down through the content to reveal the Add to Bag and action buttons,
  //    the hero image box (with photo, title, price, tags) shrinks smoothly down to 80% of its height
  //    (i.e. retains 80% of its initial height, e.g. ~260px-270px) and stops shrinking anymore!
  // 3. User can smoothly scroll all the way down through the content with zero scrollbars visible.
  const handleScroll = useCallback(() => {
    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current)
    }

    rafIdRef.current = requestAnimationFrame(() => {
      const container = scrollContainerRef.current
      if (!container) return

      const scrollTop = container.scrollTop
      const topSpacerHeight = topSpacerRef.current
        ? topSpacerRef.current.offsetHeight
        : 64

      const initialHeight = initialHeightRef.current
      // Shrinks until it has 80% of height (stops shrinking at 80% of initial height)
      const minHeight = Math.round(initialHeight * 0.8)
      const shrinkRange = initialHeight - minHeight // the 20% shrink distance

      // Only shrink once the drawer has touched top (or during transition to top)
      const effectiveScroll = Math.max(0, scrollTop - topSpacerHeight)
      // Transition smoothly over 140px of scroll
      const progress = Math.min(1, effectiveScroll / 140)

      const currentHeight = Math.max(
        minHeight,
        Math.round(initialHeight - progress * shrinkRange)
      )

      if (headerRef.current) {
        headerRef.current.style.height = `${currentHeight}px`
      }
      if (spacerRef.current) {
        spacerRef.current.style.height = `${initialHeight - currentHeight}px`
      }
    })
  }, [])

  if (!product) return null

  return (
    <div
      ref={scrollContainerRef}
      onScroll={handleScroll}
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm overflow-y-auto overscroll-contain transition-all animate-fade-in w-full h-full no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      style={{
        WebkitOverflowScrolling: "touch",
        touchAction: "pan-y",
      }}
    >
      {/* Background click surface */}
      <div
        className="fixed inset-0 -z-10 cursor-pointer pointer-events-auto"
        onClick={onClose}
        title="Click background to close"
      />

      {/* Outer Flex Container: Full width with 0 padding on small screens */}
      <div className="min-h-full w-full flex flex-col justify-end sm:justify-center items-center pointer-events-none p-0 sm:py-8 sm:px-4">
        {/* Top spacer */}
        <div
          ref={topSpacerRef}
          className="w-full h-16 sm:h-8 shrink-0 pointer-events-auto cursor-pointer"
          onClick={onClose}
          title="Tap background to close"
        />

        {/* The Drawer Card: Full width on small screens, sticks to top when scrolled */}
        <div
          onClick={(e) => e.stopPropagation()}
          className="pointer-events-auto bg-background border-t sm:border border-border w-full max-w-full sm:max-w-xl rounded-t-3xl sm:rounded-2xl shadow-2xl relative flex flex-col shrink-0 sticky top-0 z-10 overflow-hidden"
        >
          {/* Sticky Image Box with title and price:
              Sticks at top: 0.
              Shrinks until it has 80% of height (stops shrinking at 80%).
              Retains photo, title, collection, price, items count, and close button!
          */}
          <div
            ref={headerRef}
            className="sticky top-0 z-30 w-full overflow-hidden bg-background border-b border-border/40 shadow-sm relative select-none shrink-0 transition-[height] duration-75 ease-out"
            style={{ height: "330px" }}
          >
            {/* Background Product Image */}
            <img
              src={product.thumbnail}
              alt={product.title}
              className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
            />

            {/* Gradient Overlay for Text Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/30 pointer-events-none" />

            {/* Drag Handle Indicator */}
            <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-10 h-1 bg-white/60 backdrop-blur-sm rounded-full z-20 pointer-events-none" />

            {/* Hero Content (Collection, Title, Price, Items count) */}
            <div className="absolute inset-x-0 bottom-0 p-5 flex flex-col justify-end text-white z-10">
              <span className="text-[9px] font-mono tracking-[0.25em] uppercase text-white/80 mb-1 drop-shadow-sm">
                {BRAND_INFO.name} &bull; {product.collection.title}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white drop-shadow-md mb-1">
                {product.title}
              </h3>
              <div className="flex items-center gap-3">
                <span className="text-base sm:text-lg font-mono font-semibold text-white drop-shadow-sm">
                  {product.price}
                </span>
                <span className="text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/30">
                  {product.itemCount} Items Included
                </span>
              </div>
            </div>

            {/* Top-Right Circular Close Button */}
            <button
              onClick={onClose}
              className="absolute top-3.5 right-3.5 z-20 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all cursor-pointer shadow-lg active:scale-95"
              title="Close drawer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Spacer to prevent layout shift during height change */}
          <div
            ref={spacerRef}
            style={{ height: "0px" }}
            className="w-full shrink-0 pointer-events-none"
          />

          {/* Content Details: Fully scrollable without scrollbars */}
          <div className="p-5 sm:p-6 space-y-6">
            <div>
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-1">
                About this Gift Box
              </span>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-light text-justify">
                {product.fullDescription}
              </p>
            </div>

            {/* Included Items Full List */}
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                  Included Items ({product.items.length})
                </span>
                <span className="text-[9px] text-muted-foreground font-mono">
                  All Included
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {product.items.map((item, i) => (
                  <span
                    key={i}
                    className="text-[11px] px-2.5 py-1 rounded-full bg-muted/70 border border-border text-foreground font-medium"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons Section */}
            <div className="pt-4 border-t border-border flex flex-col gap-2.5 pb-8 sm:pb-4">
              <button
                onClick={onAddToCart}
                className={`w-full h-12 rounded-full text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md active:scale-[0.99] ${
                  addedToBag
                    ? "bg-emerald-600 text-white"
                    : "bg-primary text-primary-foreground hover:bg-primary/90"
                }`}
              >
                {addedToBag ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Bag</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Bag</span>
                  </>
                )}
              </button>

              <button
                onClick={onCheckout}
                className="w-full h-11 rounded-full border border-border hover:bg-muted text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer active:scale-[0.99]"
              >
                Acquire &amp; Proceed to Checkout
              </button>

              <div className="flex items-center justify-between text-[10px] text-muted-foreground pt-1 px-1">
                <span>Nationwide Courier Delivery</span>
                <span>Cash on Delivery Available</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
