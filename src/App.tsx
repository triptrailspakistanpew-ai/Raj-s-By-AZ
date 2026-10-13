/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from "react"
import Lenis from "lenis"
import DemoOne from "@/demo"
import CartCheckoutPage, { CartItem } from "@/src/components/CartCheckoutPage"
import ProductQuickViewModal from "@/src/components/ProductQuickViewModal"
import PrivacyPolicyPage from "@/src/components/PrivacyPolicyPage"
import { ShoppingBag, ArrowUpRight, ArrowLeft } from "lucide-react"
import { GIFT_BOX_PRODUCTS, GiftBoxProduct, BRAND_INFO } from "@/src/data/products"
import { updateHeadSeo } from "@/src/utils/seo"
import { StickyFooter } from "@/components/ui/sticky-footer"

export default function App() {
  const lenisRef = useRef<Lenis | null>(null)
  const [currentPage, setCurrentPage] = useState<"showcase" | "cart" | "privacy">("showcase")
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

    // Check initial URL pathname for deep-linked product (e.g. /products/signature-beauty-box)
    if (typeof window !== "undefined") {
      const path = window.location.pathname
      if (path.startsWith("/products/")) {
        const handle = path.replace("/products/", "")
        const initialProduct = GIFT_BOX_PRODUCTS.find((p) => p.handle === handle)
        if (initialProduct) {
          setActiveModalProduct(initialProduct)
        }
      } else if (path === "/cart" || path === "/checkout") {
        setCurrentPage("cart")
      } else if (path === "/privacy" || path === "/privacy-policy") {
        setCurrentPage("privacy")
      }
    }

    // Listen to custom quick view events from product buttons
    const handleQuickView = (event: Event) => {
      const customEvent = event as CustomEvent<{ handle: string }>
      const handle = customEvent.detail?.handle
      const product = GIFT_BOX_PRODUCTS.find((p) => p.handle === handle)
      if (product) {
        setActiveModalProduct(product)
        setAddedToBag(false)
        if (typeof window !== "undefined" && window.history?.pushState) {
          window.history.pushState({ handle }, "", `/products/${product.handle}`)
        }
      }
    }

    const handlePopState = () => {
      const path = window.location.pathname
      if (path.startsWith("/products/")) {
        const handle = path.replace("/products/", "")
        const prod = GIFT_BOX_PRODUCTS.find((p) => p.handle === handle)
        setActiveModalProduct(prod || null)
      } else if (path === "/cart" || path === "/checkout") {
        setCurrentPage("cart")
        setActiveModalProduct(null)
      } else if (path === "/privacy" || path === "/privacy-policy") {
        setCurrentPage("privacy")
        setActiveModalProduct(null)
      } else {
        setActiveModalProduct(null)
        setCurrentPage("showcase")
      }
    }

    const handleDocumentClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest?.("a")
      if (target) {
        const href = target.getAttribute("href")
        if (href && href.startsWith("/products/")) {
          e.preventDefault()
          const handle = href.replace("/products/", "")
          const prod = GIFT_BOX_PRODUCTS.find((p) => p.handle === handle)
          if (prod) {
            setActiveModalProduct(prod)
            setAddedToBag(false)
            if (typeof window !== "undefined" && window.history?.pushState) {
              window.history.pushState({ handle }, "", `/products/${prod.handle}`)
            }
          }
        }
      }
    }

    document.addEventListener("click", handleDocumentClick)
    window.addEventListener("open-product-preview", handleQuickView)
    window.addEventListener("popstate", handlePopState)

    return () => {
      cancelAnimationFrame(rafId)
      document.removeEventListener("click", handleDocumentClick)
      window.removeEventListener("open-product-preview", handleQuickView)
      window.removeEventListener("popstate", handlePopState)
      lenis.destroy()
    }
  }, [])

  // Lock body scroll when quick view modal is open
  useEffect(() => {
    if (activeModalProduct) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [activeModalProduct])

  // Synchronize document title, canonical link, and Open Graph tags
  useEffect(() => {
    if (activeModalProduct) {
      updateHeadSeo("product", activeModalProduct)
    } else if (currentPage === "cart") {
      updateHeadSeo("cart")
    } else if (currentPage === "privacy") {
      updateHeadSeo("privacy")
    } else {
      updateHeadSeo("home")
    }
  }, [activeModalProduct, currentPage])

  // Scroll to top whenever page view toggles
  const navigateTo = (page: "showcase" | "cart" | "privacy") => {
    setCurrentPage(page)
    if (typeof window !== "undefined" && window.history?.pushState) {
      if (page === "showcase") {
        window.history.pushState({}, "", "/")
      } else if (page === "cart") {
        window.history.pushState({}, "", "/cart")
      } else if (page === "privacy") {
        window.history.pushState({}, "", "/privacy")
      }
    }
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
            {currentPage === "cart" || currentPage === "privacy" ? (
              <button
                onClick={() => navigateTo("showcase")}
                className="flex items-center gap-1.5 text-xs uppercase tracking-widest font-semibold hover:opacity-75 transition-opacity cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Back to Showcase</span>
              </button>
            ) : (
              <>
                <button
                  onClick={() => navigateTo("privacy")}
                  className="text-xs uppercase tracking-widest font-semibold text-muted-foreground hover:text-foreground transition-colors cursor-pointer hidden lg:inline"
                >
                  Privacy Charter
                </button>
                <button
                  onClick={() => navigateTo("cart")}
                  className="text-xs uppercase tracking-widest font-semibold text-muted-foreground hover:text-foreground transition-colors cursor-pointer hidden md:inline"
                >
                  Checkout
                </button>
              </>
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

      {/* Main View: Showcase, Cart, or Privacy Policy Page */}
      <main className="relative z-10 bg-background pt-16">
        {currentPage === "showcase" ? (
          <DemoOne />
        ) : currentPage === "cart" ? (
          <CartCheckoutPage
            cart={cart}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onAddSampleItem={handleAddSampleItem}
            onBackToStore={() => navigateTo("showcase")}
            onClearCart={handleClearCart}
            onOpenPrivacy={() => navigateTo("privacy")}
          />
        ) : (
          <PrivacyPolicyPage
            onBackToStore={() => navigateTo("showcase")}
            onGoToCart={() => navigateTo("cart")}
            cartCount={totalBagItems}
          />
        )}
      </main>

      {/* Quick View Drawer / Modal with collapsible sticky image and full smooth scrolling */}
      <ProductQuickViewModal
        product={activeModalProduct}
        onClose={() => {
          setActiveModalProduct(null)
          if (typeof window !== "undefined" && window.location.pathname.startsWith("/products/")) {
            window.history.pushState({}, "", currentPage === "cart" ? "/cart" : "/")
          }
        }}
        onAddToCart={handleAddToCartFromModal}
        onCheckout={() => {
          handleAddToCartFromModal()
          setActiveModalProduct(null)
          navigateTo("cart")
        }}
        addedToBag={addedToBag}
      />

      {/* Sticky Curtain Reveal Luxury Footer */}
      <StickyFooter
        onNavigate={navigateTo}
        onScrollToTop={scrollToTop}
      />
    </div>
  )
}
