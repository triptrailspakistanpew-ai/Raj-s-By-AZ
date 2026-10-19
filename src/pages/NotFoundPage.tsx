import React from "react"
import { Link } from "react-router-dom"
import { ArrowLeft, Sparkles } from "lucide-react"
import { BrandLogoIcon } from "@/src/components/BrandLogo"

export function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-16">
      <div className="w-16 h-16 rounded-full bg-muted/60 flex items-center justify-center mx-auto mb-6 border border-border">
        <BrandLogoIcon size={40} />
      </div>

      <span className="text-[10px] uppercase font-mono tracking-[0.35em] text-muted-foreground mb-2">
        404 · Page Not Found
      </span>

      <h1 className="text-3xl sm:text-4xl md:text-5xl font-light uppercase tracking-wider text-foreground mb-4">
        A Little Lost?
      </h1>

      <p className="text-sm text-muted-foreground max-w-md mx-auto mb-8 font-light leading-relaxed">
        The gift collection or page you were looking for doesn&apos;t exist or may have been moved. Let&apos;s return to our boutique showcase.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-3">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-primary text-primary-foreground text-xs uppercase tracking-widest font-semibold hover:opacity-90 transition-opacity shadow-sm"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Boutique</span>
        </Link>
        <Link
          to="/cart"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border text-xs uppercase tracking-widest font-medium hover:bg-muted transition-colors"
        >
          <Sparkles className="w-3.5 h-3.5 text-primary" />
          <span>View Shopping Bag</span>
        </Link>
      </div>
    </div>
  )
}

export default NotFoundPage
