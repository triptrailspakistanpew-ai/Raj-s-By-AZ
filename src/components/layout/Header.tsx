import React from "react"
import { Link, useLocation } from "react-router-dom"
import { ShoppingBag, ArrowLeft } from "lucide-react"
import { BRAND_INFO } from "@/src/data/products"
import { BrandLogoWithText } from "@/src/components/BrandLogo"
import { useCart } from "@/src/context/CartContext"

export function Header() {
  const location = useLocation()
  const { totalItems } = useCart()

  const isCartPage = location.pathname === "/cart" || location.pathname === "/checkout"
  const isPrivacyPage = location.pathname === "/privacy"

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/40 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand Logo & Tagline */}
        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="hover:opacity-85 transition-opacity text-left focus:outline-none"
            aria-label="Raj's By AZ - Home"
          >
            <BrandLogoWithText iconSize={36} />
          </Link>
          <span className="hidden sm:inline-block text-[10px] uppercase tracking-widest text-muted-foreground border-l border-border/60 pl-6">
            {BRAND_INFO.tagline}
          </span>
        </div>

        {/* Right Navigation & Cart Counter */}
        <div className="flex items-center gap-3 sm:gap-6">
          {isCartPage || isPrivacyPage ? (
            <Link
              to="/"
              className="flex items-center gap-1.5 text-xs uppercase tracking-widest font-semibold hover:opacity-75 transition-opacity"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Back to Boutique</span>
            </Link>
          ) : (
            <>
              <a
                href="/#final-collection"
                className="text-xs uppercase tracking-widest font-semibold text-muted-foreground hover:text-foreground transition-colors hidden md:inline"
              >
                Collections
              </a>
              <Link
                to="/cart"
                className="text-xs uppercase tracking-widest font-semibold text-muted-foreground hover:text-foreground transition-colors hidden md:inline"
              >
                Checkout
              </Link>
            </>
          )}

          {/* Bag Counter Button */}
          <Link
            to="/cart"
            title="Open Shopping Bag & Checkout"
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full border transition-all ${
              isCartPage
                ? "bg-primary text-primary-foreground border-primary shadow-sm"
                : "bg-card hover:bg-muted text-foreground border-border shadow-xs"
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs uppercase tracking-wider font-semibold font-mono">
              Bag ({totalItems})
            </span>
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header
