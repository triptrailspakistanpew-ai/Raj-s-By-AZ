"use client"

import React, { useEffect, useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { GiftBoxProduct, BRAND_INFO } from "@/src/data/products"
import {
  X,
  ShieldCheck,
  Truck,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Check,
  Clock,
  Heart,
  Share2,
} from "lucide-react"
import { AddToCartButton } from "@/src/components/ui/add-to-cart-button"

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
}: ProductQuickViewModalProps) {
  const [isItemsExpanded, setIsItemsExpanded] = useState<boolean>(false)
  const [isLiked, setIsLiked] = useState<boolean>(false)
  const [isCopied, setIsCopied] = useState<boolean>(false)

  // Prevent background body scrolling while drawer is open
  useEffect(() => {
    if (product) {
      const originalStyle = window.getComputedStyle(document.body).overflow
      document.body.style.overflow = "hidden"
      return () => {
        document.body.style.overflow = originalStyle
      }
    }
  }, [product])

  // Reset state when product changes
  useEffect(() => {
    if (product) {
      setIsItemsExpanded(false)
    }
  }, [product])

  // Handle escape key to dismiss
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [onClose])

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard?.writeText(window.location.href)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    }
  }

  return (
    <AnimatePresence>
      {product && (
        <div
          data-lenis-prevent
          className="fixed inset-0 z-50 flex overflow-hidden select-none sm:select-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="drawer-product-title"
        >
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm cursor-pointer z-0"
            aria-hidden="true"
          />

          {/* ============================================================== */}
          {/* DESKTOP VIEWPORT: Elegant Right Slide Drawer (md and up)       */}
          {/* ============================================================== */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 32, stiffness: 320, mass: 0.8 }}
            onClick={(e) => e.stopPropagation()}
            className="hidden md:flex flex-col ml-auto relative z-10 w-full max-w-[560px] lg:max-w-[600px] h-full bg-background text-foreground shadow-2xl border-l border-border overflow-hidden"
          >
            {/* Desktop Header */}
            <div className="flex items-center justify-between px-8 py-5 border-b border-border bg-background/95 backdrop-blur-md shrink-0">
              <div className="flex items-center gap-2.5">
                <span className="text-[10px] uppercase tracking-[0.3em] font-mono text-muted-foreground font-light">
                  {BRAND_INFO.name} · {product.collection.title}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleShare}
                  title={isCopied ? "Link copied!" : "Share product link"}
                  className="w-8 h-8 rounded-full border border-border bg-muted/30 hover:bg-muted text-foreground flex items-center justify-center transition-colors cursor-pointer"
                >
                  {isCopied ? (
                    <Check className="w-3.5 h-3.5 text-foreground" />
                  ) : (
                    <Share2 className="w-3.5 h-3.5" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setIsLiked(!isLiked)}
                  title={isLiked ? "Saved to wishlist" : "Save to wishlist"}
                  className="w-8 h-8 rounded-full border border-border bg-muted/30 hover:bg-muted text-foreground flex items-center justify-center transition-colors cursor-pointer"
                >
                  <Heart
                    className={`w-3.5 h-3.5 transition-colors ${
                      isLiked ? "fill-foreground text-foreground" : ""
                    }`}
                  />
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  title="Close (Esc)"
                  className="w-8 h-8 rounded-full border border-border bg-muted/30 hover:bg-primary hover:text-primary-foreground text-foreground flex items-center justify-center transition-colors cursor-pointer ml-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Desktop Scrollable Body (Fluid Native Momentum Scroll) */}
            <div
              data-lenis-prevent
              className="flex-1 overflow-y-auto overscroll-contain px-8 py-6 space-y-7 [scrollbar-width:thin]"
            >
              {/* Product Hero Image Card */}
              <div className="relative border border-border/40 rounded-2xl bg-muted/30 overflow-hidden group">
                <div className="aspect-[16/11] w-full overflow-hidden relative">
                  <img
                    src={product.thumbnail}
                    alt={`${product.title} - ${BRAND_INFO.name}`}
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="text-[9px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-full bg-primary text-primary-foreground">
                      {product.label || "Curated"}
                    </span>
                    <span className="text-[9px] uppercase tracking-wider font-mono px-2.5 py-1 rounded-full bg-background/80 backdrop-blur-md text-foreground border border-border">
                      {product.itemCount} Items
                    </span>
                  </div>

                  {/* Title and Price inside image overlay (clean, no repeated COD text) */}
                  <div className="absolute bottom-4 left-5 right-5 text-white">
                    <span className="text-[9px] uppercase tracking-[0.3em] font-mono text-white/80 block mb-1">
                      {product.collection.title}
                    </span>
                    <h2
                      id="drawer-product-title"
                      className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight text-white mb-2"
                    >
                      {product.title}
                    </h2>
                    <div className="flex items-center justify-between">
                      <span className="text-xl sm:text-2xl font-medium tracking-tight text-white">
                        {product.price}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tagline & Description */}
              <div className="space-y-3 border-b border-border pb-6">
                {product.tagline && (
                  <p className="text-xs uppercase tracking-[0.2em] font-medium text-foreground">
                    {product.tagline}
                  </p>
                )}
                <p className="text-xs sm:text-sm text-muted-foreground font-light leading-relaxed">
                  {product.fullDescription}
                </p>
              </div>

              {/* Items Inside Section (Pill Tags only - no duplicate list/grid) */}
              <div className="space-y-4">
                <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-mono">
                  <span>Items Inside ({product.items.length})</span>
                  <span>All Included in Box</span>
                </div>

                {/* Pill Tags (Matching homepage rounded pill aesthetic) */}
                <div className="flex flex-wrap gap-2">
                  {product.items.map((item, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 text-[11px] uppercase tracking-wider rounded-full border border-border/80 bg-muted/40 text-foreground transition-colors hover:border-primary/50"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Complimentary Gift Card Note */}
              <div className="p-4 rounded-2xl border border-border/40 bg-muted/20 space-y-1.5">
                <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-medium text-foreground">
                  <Check className="w-3.5 h-3.5" />
                  <span>Complimentary Personalized Greeting Card</span>
                </div>
                <p className="text-xs text-muted-foreground font-light leading-relaxed pl-5">
                  You can include a custom greeting note during checkout at zero extra charge.
                </p>
              </div>
            </div>

            {/* Desktop Sticky Bottom Action Bar */}
            <div className="p-6 border-t border-border bg-background shrink-0 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground block">
                    Total
                  </span>
                  <span className="text-xl font-bold tracking-tight text-foreground">
                    {product.price}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase tracking-widest font-mono text-muted-foreground flex items-center gap-1 justify-end">
                    <Clock className="w-3 h-3" /> Ready to Dispatch
                  </span>
                  <span className="text-[10px] text-muted-foreground font-light">
                    Dispatched within 24 hours
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <AddToCartButton
                  label="Add to Bag"
                  loadingLabel="Adding..."
                  addedLabel="Added to Bag"
                  onClick={onAddToCart}
                  className="w-full h-12 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground text-xs uppercase tracking-widest font-medium cursor-pointer shadow-md active:scale-95 transition-all"
                />
                <button
                  type="button"
                  onClick={onCheckout}
                  className="w-full h-12 rounded-full border border-border bg-background hover:bg-primary hover:text-primary-foreground text-foreground text-xs uppercase tracking-widest font-medium transition-all cursor-pointer flex items-center justify-center gap-2 group active:scale-95 shadow-sm"
                >
                  <span>Checkout</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>

              <div className="flex items-center justify-between text-[10px] font-mono tracking-wider text-muted-foreground pt-1">
                <span>Nationwide Express Delivery</span>
                <span>Inspected &amp; Hand-Packed</span>
              </div>
            </div>
          </motion.div>

          {/* ============================================================== */}
          {/* MOBILE VIEWPORT: Bottom Sheet Drawer (under md / 768px)        */}
          {/* ============================================================== */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300, mass: 0.8 }}
            onClick={(e) => e.stopPropagation()}
            className="md:hidden mt-auto relative z-10 w-full max-h-[90vh] bg-background text-foreground shadow-2xl rounded-t-3xl border-t border-border flex flex-col overflow-hidden"
          >
            {/* Mobile Sheet Drag Handle & Header */}
            <div className="relative pt-3 pb-3 px-5 border-b border-border bg-background shrink-0">
              {/* Tactile Rounded Drag Pill Indicator */}
              <div className="w-12 h-1 bg-muted-foreground/30 rounded-full mx-auto mb-3" />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-muted-foreground">
                    {product.collection.title}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsLiked(!isLiked)}
                    className="w-7 h-7 rounded-full border border-border bg-muted/40 flex items-center justify-center text-foreground cursor-pointer"
                    title="Wishlist"
                  >
                    <Heart
                      className={`w-3.5 h-3.5 ${
                        isLiked ? "fill-foreground text-foreground" : ""
                      }`}
                    />
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="w-7 h-7 rounded-full border border-border bg-muted/40 hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors text-foreground cursor-pointer"
                    title="Close"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile Native Momentum Scroll Container */}
            <div
              data-lenis-prevent
              className="flex-1 overflow-y-auto overscroll-contain p-5 space-y-5"
              style={{
                WebkitOverflowScrolling: "touch",
              }}
            >
              {/* Compact Hero Card with rounded-2xl */}
              <div className="relative border border-border/40 rounded-2xl bg-muted/30 overflow-hidden">
                <div className="aspect-[16/10] w-full overflow-hidden relative">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <span className="text-[9px] uppercase tracking-[0.2em] font-mono text-white/80 block mb-0.5">
                      {BRAND_INFO.name}
                    </span>
                    <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-white line-clamp-1">
                      {product.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-base font-medium tracking-tight text-white">
                        {product.price}
                      </span>
                      <span className="text-[8px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full bg-primary text-primary-foreground">
                        {product.itemCount} Items
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tagline & Description */}
              <div className="space-y-1.5 border-b border-border pb-4">
                {product.tagline && (
                  <p className="text-xs uppercase tracking-wider font-medium text-foreground">
                    {product.tagline}
                  </p>
                )}
                <p className="text-xs text-muted-foreground font-light leading-relaxed">
                  {product.fullDescription}
                </p>
              </div>

              {/* Included Items Section (Pill Tags only - no duplicate list) */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-[0.18em] text-foreground">
                    Included Items ({product.items.length})
                  </span>
                  <span className="text-[9px] font-mono text-muted-foreground uppercase tracking-wider">
                    All Included in Box
                  </span>
                </div>

                {/* Pill Tags (Matching homepage pill aesthetic) */}
                <div className="flex flex-wrap gap-1.5">
                  {(isItemsExpanded ? product.items : product.items.slice(0, 8)).map(
                    (item, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 text-[10px] uppercase tracking-wider rounded-full border border-border/80 bg-muted/40 text-foreground"
                      >
                        {item}
                      </span>
                    )
                  )}
                </div>

                {product.items.length > 8 && (
                  <button
                    type="button"
                    onClick={() => setIsItemsExpanded(!isItemsExpanded)}
                    className="w-full py-2.5 rounded-full border border-border hover:bg-muted text-[10px] font-mono uppercase tracking-[0.2em] text-foreground bg-muted/30 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>
                      {isItemsExpanded
                        ? "Show Fewer Items"
                        : `Show All ${product.items.length} Items`}
                    </span>
                    {isItemsExpanded ? (
                      <ChevronUp className="w-3 h-3" />
                    ) : (
                      <ChevronDown className="w-3 h-3" />
                    )}
                  </button>
                )}
              </div>

              {/* Guarantees & Specs (No repeated COD) */}
              <div className="grid grid-cols-2 gap-2 text-[10px] font-mono tracking-wider text-muted-foreground border-t border-border pt-3">
                <div className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-foreground" />
                  <span>Nationwide Courier</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-foreground" />
                  <span>Protective Outer Box</span>
                </div>
              </div>
            </div>

            {/* Mobile Fixed Sticky Bottom Action Bar */}
            <div className="p-4 border-t border-border bg-background shrink-0 space-y-2">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                  Total
                </span>
                <span className="text-base font-bold text-foreground">
                  {product.price}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <AddToCartButton
                  label="Add to Bag"
                  loadingLabel="Adding..."
                  addedLabel="Added"
                  onClick={onAddToCart}
                  className="w-full h-11 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground text-xs uppercase tracking-wider font-medium cursor-pointer shadow-md active:scale-95"
                />
                <button
                  type="button"
                  onClick={onCheckout}
                  className="w-full h-11 rounded-full border border-border bg-background text-foreground hover:bg-primary hover:text-primary-foreground text-xs uppercase tracking-wider font-medium flex items-center justify-center gap-1.5 active:scale-95 transition-colors cursor-pointer"
                >
                  <span>Checkout</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
