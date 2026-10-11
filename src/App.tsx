/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from "react"
import Lenis from "lenis"
import DemoOne from "@/demo"
import CartCheckoutPage, { CartItem } from "@/src/components/CartCheckoutPage"
import ProductQuickViewModal from "@/src/components/ProductQuickViewModal"
import { ShoppingBag, ArrowUpRight, ArrowLeft } from "lucide-react"
import { GIFT_BOX_PRODUCTS, GiftBoxProduct, BRAND_INFO } from "@/src/data/products"

export default function App() {
  const lenisRef = useRef<Lenis | null>(null)
  const [currentPage, setCurrentPage] = useState<"showcase" | "cart">("showcase")
  const [activeModalProduct, setActiveModalProduct] = useState<GiftBoxProduct | null>(null)
  const [addedToBag, setAddedToBag] = useState(false)

  // Initial cart with the Signature Beauty Box
  const [cart, setCart] = useState<CartItem[]>([
    {
      id: "cart-item-1",
      productId: GIFT_BOX_PRODUCTS[1].id,
      title: GIFT_BOX_PRODUCTS[1].title,
      handle: GIFT_BOX_PRODUCTS[1].handle,
      thumbnail: GIFT_BOX_PRODUCTS[1].thumbnail,
      price: GIFT_BOX_PRODUCTS[1].price,
      priceValue: GIFT_BOX_PRODUCTS[1].priceValue,
      collection: GIFT_BOX_PRODUCTS[1].collection.title,
      itemCount: GIFT_BOX_PRODUCTS[1].itemCount,
      itemsIncluded: GIFT_BOX_PRODUCTS[1].items,
      quantity: 1,
    }
  ])

  // Total quantity of items in bag
  const totalBagItems = cart.reduce((sum, item) => sum + item.quantity, 0)

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

    // Listen to custom quick view events from product buttons
    const handleQuickView = (event: Event) => {
      const customEvent = event as CustomEvent<{ handle: string }>
      const handle = customEvent.detail?.handle
      const product = GIFT_BOX_PRODUCTS.find((p) => p.handle === handle)
      if (product) {
        setActiveModalProduct(product)
        setAddedToBag(false)
      }
    }

    window.addEventListener("open-product-preview", handleQuickView)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener("open-product-preview", handleQuickView)
      lenis.destroy()
    }
  }, [])

  // Lock body scroll and pause Lenis when quick view modal is open
  useEffect(() => {
    if (activeModalProduct) {
      if (lenisRef.current) lenisRef.current.stop()
      document.body.style.overflow = "hidden"
    } else {
      if (lenisRef.current) lenisRef.current.start()
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [activeModalProduct])

  // Scroll to top whenever page view toggles
  const navigateTo = (page: "showcase" | "cart") => {
    setCurrentPage(page)
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true })
    } else {
      window.scrollTo(0, 0)
    }
  }

  const scrollToTop = () => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { duration: 1.5 })
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  // Cart operations
  const handleUpdateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const nextQty = item.quantity + delta
            return nextQty > 0 ? { ...item, quantity: nextQty } : null
          }
          return item
        })
        .filter(Boolean) as CartItem[]
    )
  }

  const handleRemoveItem = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id))
  }

  const handleAddSampleItem = () => {
    const existingHandles = new Set(cart.map((c) => c.handle))
    const candidate =
      GIFT_BOX_PRODUCTS.find((p) => !existingHandles.has(p.handle)) ||
      GIFT_BOX_PRODUCTS[0]

    const newItem: CartItem = {
      id: `cart-item-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      productId: candidate.id,
      title: candidate.title,
      handle: candidate.handle,
      thumbnail: candidate.thumbnail,
      price: candidate.price,
      priceValue: candidate.priceValue,
      collection: candidate.collection.title,
      itemCount: candidate.itemCount,
      itemsIncluded: candidate.items,
      quantity: 1,
    }
    setCart((prev) => [...prev, newItem])
  }

  const handleAddToCartFromModal = () => {
    if (!activeModalProduct) return

    const newItem: CartItem = {
      id: `cart-item-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      productId: activeModalProduct.id,
      title: activeModalProduct.title,
      handle: activeModalProduct.handle,
      thumbnail: activeModalProduct.thumbnail,
      price: activeModalProduct.price,
      priceValue: activeModalProduct.priceValue,
      collection: activeModalProduct.collection.title,
      itemCount: activeModalProduct.itemCount,
      itemsIncluded: activeModalProduct.items,
      quantity: 1,
    }

    setCart((prev) => [...prev, newItem])
    setAddedToBag(true)
    setTimeout(() => {
      setAddedToBag(false)
    }, 2000)
  }

  const handleClearCart = () => {
    setCart([])
  }

  return (
    <div className="min-h-screen bg-background text-foreground antialiased selection:bg-neutral-900 selection:text-white dark:selection:bg-white dark:selection:text-black">
      {/* Top Floating Luxury Header (Restored exact original styling) */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/40 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button
              onClick={() => navigateTo("showcase")}
              className="font-bold text-sm sm:text-base tracking-[0.3em] uppercase hover:opacity-80 transition-opacity cursor-pointer text-left"
            >
              {BRAND_INFO.name}
            </button>
            <span className="hidden sm:inline-block text-[10px] uppercase tracking-widest text-muted-foreground border-l border-border/60 pl-6">
              {BRAND_INFO.tagline}
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-6">
            {/* View switcher button */}
            {currentPage === "cart" ? (
              <button
                onClick={() => navigateTo("showcase")}
                className="flex items-center gap-1.5 text-xs uppercase tracking-widest font-semibold hover:opacity-75 transition-opacity cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Back to Showcase</span>
              </button>
            ) : (
              <button
                onClick={() => navigateTo("cart")}
                className="text-xs uppercase tracking-widest font-semibold text-muted-foreground hover:text-foreground transition-colors cursor-pointer hidden md:inline"
              >
                Checkout
              </button>
            )}

            {/* Bag counter */}
            <button
              onClick={() => navigateTo(currentPage === "cart" ? "showcase" : "cart")}
              title="Open Bag &amp; Checkout"
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all cursor-pointer ${
                currentPage === "cart"
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border hover:border-primary/60 bg-muted/30"
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="text-xs font-mono font-medium">{totalBagItems}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main View: Showcase or Cart Page */}
      <main className="relative pt-16">
        {currentPage === "showcase" ? (
          <DemoOne />
        ) : (
          <CartCheckoutPage
            cart={cart}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onAddSampleItem={handleAddSampleItem}
            onBackToStore={() => navigateTo("showcase")}
            onClearCart={handleClearCart}
          />
        )}
      </main>

      {/* Quick View Drawer / Modal with collapsible sticky image and full smooth scrolling */}
      <ProductQuickViewModal
        product={activeModalProduct}
        onClose={() => setActiveModalProduct(null)}
        onAddToCart={handleAddToCartFromModal}
        onCheckout={() => {
          handleAddToCartFromModal()
          setActiveModalProduct(null)
          navigateTo("cart")
        }}
        addedToBag={addedToBag}
      />

      {/* Editorial Footer (Restored exact original styling) */}
      <footer className="border-t border-border bg-background py-16 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <div className="font-bold text-lg tracking-[0.3em] uppercase mb-2">
              {BRAND_INFO.name}
            </div>
            <p className="text-xs text-muted-foreground max-w-md font-light leading-relaxed">
              {BRAND_INFO.tagline} Curated beauty, jewellery and fashion gift boxes for life's lovely little moments.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs uppercase tracking-widest text-muted-foreground">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-foreground hover:opacity-75 transition-opacity font-bold cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
            <span className="text-border">/</span>
            <button
              onClick={() => navigateTo(currentPage === "cart" ? "showcase" : "cart")}
              className="hover:text-foreground transition-colors cursor-pointer"
            >
              {currentPage === "cart" ? "Gallery" : "Shopping Bag"}
            </button>
            <span className="text-border">/</span>
            <span>&copy; {new Date().getFullYear()} All rights reserved</span>
            <span className="text-border">/</span>
            <span>
              Developed by{" "}
              <a
                href="https://www.thekhubaib.me/"
                target="_blank"
                rel="noreferrer"
                className="text-foreground font-semibold hover:underline transition-all"
              >
                Khubaib Shah
              </a>
            </span>
          </div>
        </div>
      </footer>
    </div>
  )
}
