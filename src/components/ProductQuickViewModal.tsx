import React, { useEffect, useRef, useState, useCallback } from "react"
import { GiftBoxProduct, BRAND_INFO } from "@/src/data/products"
import { ShoppingBag, X, Check, ChevronDown } from "lucide-react"

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
  const contentRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const touchStartY = useRef<number | null>(null)
  const [headerHeight, setHeaderHeight] = useState<number>(320)
  const initialHeightRef = useRef<number>(320)
  const [isItemsExpanded, setIsItemsExpanded] = useState<boolean>(false)

  // Measure initial height based on viewport
  useEffect(() => {
    if (!product) return

    setIsItemsExpanded(false)
    const isMobile = window.innerWidth < 640
    const initialH = isMobile ? 280 : 330
    initialHeightRef.current = initialH
    setHeaderHeight(initialH)

    if (contentRef.current) {
      contentRef.current.scrollTop = 0
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [product, onClose])

  // Handle scroll in the content container:
  // Smoothly shrinks the image box from 100% down to 80% of its initial height,
  // and stops shrinking once it reaches 80% of height!
  const handleContentScroll = useCallback(() => {
    const el = contentRef.current
    if (!el) return

    const scrollTop = el.scrollTop
    const initialH = initialHeightRef.current
    const minH = Math.round(initialH * 0.8) // Shrinks until 80% of height
    const shrinkSpan = initialH - minH

    // Smooth transition over the first 120px of scroll
    const progress = Math.min(1, Math.max(0, scrollTop / 120))
    const calculatedH = Math.round(initialH - progress * shrinkSpan)
    setHeaderHeight(calculatedH)
  }, [])

  // Allow scrolling from the image header via mouse wheel
  const handleHeaderWheel = useCallback((e: React.WheelEvent) => {
    if (contentRef.current) {
      contentRef.current.scrollTop += e.deltaY
    }
  }, [])

  // Allow dragging/swiping from the image header via touch gestures
  const handleHeaderTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY
  }, [])

  const handleHeaderTouchMove = useCallback((e: React.TouchEvent) => {
    if (touchStartY.current !== null && contentRef.current) {
      const delta = touchStartY.current - e.touches[0].clientY
      contentRef.current.scrollTop += delta
      touchStartY.current = e.touches[0].clientY
    }
  }, [])

  const handleHeaderTouchEnd = useCallback(() => {
    touchStartY.current = null
  }, [])

  if (!product) return null

  return (
    <div
      data-lenis-prevent
      className="fixed inset-0 z-50 flex flex-col justify-end sm:justify-center items-center bg-black/65 backdrop-blur-sm animate-fade-in w-full h-full p-0 sm:p-4 select-none sm:select-auto"
      style={{
        touchAction: "pan-y",
      }}
    >
      {/* Background click surface to dismiss */}
      <div
        className="absolute inset-0 cursor-pointer"
        onClick={onClose}
        title="Tap outside to close"
      />

      {/* The Modal Drawer Container */}
      <div
        data-lenis-prevent
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 w-full sm:max-w-xl h-[92vh] sm:h-auto sm:max-h-[88vh] bg-background border-t sm:border border-border rounded-t-3xl sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden"
      >
        {/* Sticky Hero Image Box:
            - Shrinks smoothly down to 80% of initial height on scroll.
            - Stops shrinking when it reaches 80% of height.
            - Retains photo, title, collection, price, items count, and close button.
            - Chained touch & wheel handlers allow scrolling right from the image area!
        */}
        <div
          ref={headerRef}
          onWheel={handleHeaderWheel}
          onTouchStart={handleHeaderTouchStart}
          onTouchMove={handleHeaderTouchMove}
          onTouchEnd={handleHeaderTouchEnd}
          className="relative w-full shrink-0 overflow-hidden bg-background border-b border-border/40 select-none transition-[height] duration-75 ease-out"
          style={{ height: `${headerHeight}px` }}
        >
          {/* Background Product Image */}
          <img
            src={product.thumbnail}
            alt={product.title}
            className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
          />

          {/* Gradient Overlay for Crisp Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/25 pointer-events-none" />

          {/* Drawer Handle Indicator */}
          <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-10 h-1 bg-white/60 backdrop-blur-sm rounded-full z-20 pointer-events-none" />

          {/* Hero Content (Collection, Title, Price, Items Count) */}
          <div className="absolute inset-x-0 bottom-0 p-5 flex flex-col justify-end text-white z-10">
            <span className="text-[9px] font-mono tracking-[0.25em] uppercase text-white/80 mb-1 drop-shadow-sm">
              {BRAND_INFO.name} &bull; {product.collection.title}
            </span>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white drop-shadow-md mb-1 line-clamp-1">
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

        {/* Scrollable Content Area:
            - Fully scrollable with mouse wheel, two-finger laptop trackpad, and mobile touch.
            - Scrollbar is completely hidden (no-scrollbar).
            - Contains description, included items, and action buttons.
        */}
        <div
          ref={contentRef}
          data-lenis-prevent
          onScroll={handleContentScroll}
          className="flex-1 overflow-y-auto overscroll-contain p-5 sm:p-6 space-y-6 no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          style={{
            WebkitOverflowScrolling: "touch",
            touchAction: "pan-y",
          }}
        >
          {/* About This Gift Box */}
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

            {/* Pills Container: on small screens, limited to 3 lines (~96px) with smooth expansion when clicking the arrow button */}
            <div className="relative">
              <div
                className={`flex flex-wrap gap-1.5 transition-all duration-300 ease-in-out ${
                  !isItemsExpanded
                    ? "max-h-[96px] sm:max-h-none overflow-hidden pb-4 sm:pb-0"
                    : "max-h-[600px] overflow-visible pb-6 sm:pb-0"
                }`}
              >
                {product.items.map((item, i) => (
                  <span
                    key={i}
                    className="text-[11px] px-2.5 py-1 rounded-full bg-muted/70 border border-border text-foreground font-medium"
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
  )
}
