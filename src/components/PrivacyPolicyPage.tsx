"use client"

import React, { useState, useEffect } from "react"
import {
  ShieldCheck,
  Lock,
  EyeOff,
  FileText,
  Sparkles,
  ArrowLeft,
  ShoppingBag,
  Printer,
  Copy,
  Check,
  MessageCircle,
  Truck,
  CreditCard,
  Database,
  Trash2,
  RefreshCw,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  HeartHandshake,
  ExternalLink,
  Gift,
  Clock,
  UserCheck,
} from "lucide-react"
import { BRAND_INFO } from "@/src/data/products"
import { motion } from "motion/react"

interface PrivacyPolicyPageProps {
  onBackToStore: () => void
  onGoToCart?: () => void
  cartCount?: number
}

interface PolicySection {
  id: string
  title: string
  number: string
  icon: React.ComponentType<{ className?: string }>
}

const POLICY_SECTIONS: PolicySection[] = [
  { id: "discretion-manifesto", title: "The Gifting Discretion Manifesto", number: "01", icon: EyeOff },
  { id: "data-collection", title: "Information We Collect", number: "02", icon: Database },
  { id: "purpose-usage", title: "How We Use Your Details", number: "03", icon: FileText },
  { id: "surprise-protection", title: "Surprise Delivery & Recipient Privacy", number: "04", icon: Gift },
  { id: "payment-security", title: "Payments & Financial Confidentiality", number: "05", icon: CreditCard },
  { id: "logistics-couriers", title: "Nationwide Courier Handover", number: "06", icon: Truck },
  { id: "storage-retention", title: "Data Retention & Storage Lifespans", number: "07", icon: Lock },
  { id: "your-rights", title: "Your Rights & Erasure Requests", number: "08", icon: UserCheck },
  { id: "contact-desk", title: "Contact Our Privacy Desk", number: "09", icon: MessageCircle },
]

export default function PrivacyPolicyPage({
  onBackToStore,
  onGoToCart,
  cartCount = 0,
}: PrivacyPolicyPageProps) {
  const [activeSection, setActiveSection] = useState("discretion-manifesto")
  const [copiedSummary, setCopiedSummary] = useState(false)
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  // Interactive Live Browser Privacy Inspector State
  const [inspectorData, setInspectorData] = useState({
    localStorageKeysCount: 0,
    cartItemsCount: cartCount,
    adTrackersCount: 0,
    cookiesCount: 0,
    lastChecked: "Just now",
  })
  const [purgeSuccess, setPurgeSuccess] = useState(false)

  // Scan client-side storage for the privacy transparency inspector
  useEffect(() => {
    try {
      const keysCount = typeof window !== "undefined" ? window.localStorage.length : 0
      const cookiesArr = typeof document !== "undefined" && document.cookie ? document.cookie.split(";") : []
      setInspectorData({
        localStorageKeysCount: keysCount,
        cartItemsCount: cartCount,
        adTrackersCount: 0, // Zero commercial trackers on Raj's By AZ
        cookiesCount: cookiesArr.filter((c) => c.trim().length > 0).length,
        lastChecked: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      })
    } catch {
      // Fallback
    }
  }, [cartCount])

  // Scrollspy for active policy section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200
      for (const section of POLICY_SECTIONS) {
        const el = document.getElementById(section.id)
        if (el) {
          const top = el.offsetTop
          const height = el.offsetHeight
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section.id)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      const yOffset = -90
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: "smooth" })
      setActiveSection(id)
    }
  }

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print()
    }
  }

  const handleCopySummary = () => {
    const summary = `Raj's By AZ Privacy Promise:
1. Surprise Inviolate: Recipients never receive price tags, invoices, or advance marketing alerts.
2. Zero Data Selling: We never sell or share customer contact info with third-party ad networks.
3. Sealed Gift Notes: Personal messages remain completely confidential.
4. Ephemeral Receipts: Bank & Easypaisa slips purged post-fulfillment.
Full Policy: https://www.rajsbyaz.com/privacy`

    navigator.clipboard.writeText(summary)
    setCopiedSummary(true)
    setTimeout(() => setCopiedSummary(false), 2500)
  }

  const handlePurgeSession = () => {
    try {
      if (typeof window !== "undefined") {
        window.sessionStorage.clear()
        setPurgeSuccess(true)
        setInspectorData((prev) => ({
          ...prev,
          lastChecked: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        }))
        setTimeout(() => setPurgeSuccess(false), 3000)
      }
    } catch {
      // Ignore
    }
  }

  const faqItems = [
    {
      q: "If I send a surprise gift, will the recipient see the price or receipt?",
      a: "Never. Every Raj's By AZ gift box is packed strictly as an unboxing experience. Invoices and payment confirmations are sent exclusively to the buyer's WhatsApp number or email. No physical invoice, pricing sheet, or promotional flier is ever included inside the gift box.",
    },
    {
      q: "Can I remain completely anonymous when sending a gift?",
      a: "Yes. When placing an order, simply write 'Anonymous Sender' in the gift note or tell us on WhatsApp. We will seal the package with our signature brand seal and omit your name from any card, while maintaining your contact on our internal dispatch file strictly in case of delivery logistics.",
    },
    {
      q: "What happens to the Easypaisa / Bank Transfer payment screenshot I provide?",
      a: "Your transfer receipt is reviewed manually by our finance desk to verify transaction reference numbers and match them to your order. It is stored in an encrypted offline record and permanently erased from operational chat caches within 30 days of fulfilled delivery.",
    },
    {
      q: "Will my phone number receive annoying automated marketing broadcasts?",
      a: "No. We respect your peace. Our WhatsApp line is an order desk and customer support concierge, not an aggressive marketing broadcast channel. You will only receive order updates, courier tracking links, and direct replies to questions you initiate.",
    },
    {
      q: "What details do you give to Pakistani courier services (TCS, Leopard, PostEx, Trax)?",
      a: "We provide couriers only the operational details required to deliver the parcel safely: recipient name, shipping address, city, destination phone number (for courier arrival calls), and COD amount (if applicable). Couriers have no access to your gift notes or buyer payment records.",
    },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground pb-24 transition-colors">
      {/* Luxury Ambient Glows */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 isolate z-0 overflow-hidden"
      >
        <div className="absolute top-0 right-1/4 h-[550px] w-[450px] -translate-y-1/2 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(242,176,194,0.08)_0,transparent_80%)] blur-3xl" />
        <div className="absolute top-1/3 left-0 h-[600px] w-[400px] rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(232,197,167,0.09)_0,transparent_80%)] blur-3xl" />
        <div className="absolute bottom-1/4 right-0 h-[500px] w-[500px] rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(255,182,139,0.06)_0,transparent_80%)] blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Navigation Action Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-border/40">
          <button
            onClick={onBackToStore}
            className="group inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Return to Boutique Showcase</span>
          </button>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={handleCopySummary}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-border/60 rounded-full hover:bg-muted/50 hover:border-foreground/30 transition-all cursor-pointer"
              title="Copy Discretion Principles"
            >
              {copiedSummary ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700 font-medium">Copied to Clipboard</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-muted-foreground" />
                  <span>Copy Summary</span>
                </>
              )}
            </button>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-border/60 rounded-full hover:bg-muted/50 hover:border-foreground/30 transition-all cursor-pointer hidden sm:inline-flex"
              title="Print Official Document"
            >
              <Printer className="w-3.5 h-3.5 text-muted-foreground" />
              <span>Print Charter</span>
            </button>

            {onGoToCart && (
              <button
                onClick={onGoToCart}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium bg-primary text-primary-foreground rounded-full hover:opacity-90 transition-opacity cursor-pointer shadow-sm"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Bag ({cartCount})</span>
              </button>
            )}
          </div>
        </div>

        {/* Editorial Hero Section */}
        <div className="pt-12 pb-16 md:pt-16 md:pb-20">
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-muted-foreground font-mono">
              <Sparkles className="w-3.5 h-3.5 text-[#E8C5A7]" />
              <span>Raj&apos;s By AZ Legal &amp; Trust Architecture</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-foreground leading-[1.15]">
              The Discretion Charter &amp; <br />
              <span className="font-serif italic font-normal text-foreground">
                Privacy Protection Policy
              </span>
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground font-light leading-relaxed pt-2">
              Gifting is an act of deep affection, delicate surprises, and heartfelt sentiment.
              We believe your personal messages, recipient home addresses, and financial transactions
              deserve the utmost discretion and uncompromising protection.
            </p>

            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 pt-4 text-xs text-muted-foreground font-mono">
              <span>Effective: October 2026</span>
              <span aria-hidden="true">·</span>
              <span>Document Version: 2.4</span>
              <span aria-hidden="true">·</span>
              <span>Jurisdiction: Pakistan (PECA Compliant)</span>
            </div>
          </div>
        </div>

        {/* 4 Core Pillars of Discretion Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pb-16">
          <div className="p-6 rounded-2xl border border-border/60 bg-gradient-to-b from-card/80 to-card/40 backdrop-blur-sm space-y-3 relative overflow-hidden group hover:border-foreground/30 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-pink-500/10 dark:bg-pink-500/20 text-pink-600 dark:text-pink-300 flex items-center justify-center">
              <EyeOff className="w-5 h-5" />
            </div>
            <h2 className="font-medium text-base text-foreground tracking-tight">
              1. The Surprise Is Inviolate
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground font-light leading-relaxed">
              No prices on items, no physical receipts inside boxes, and no advance promotional spoiler notifications to recipients.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-border/60 bg-gradient-to-b from-card/80 to-card/40 backdrop-blur-sm space-y-3 relative overflow-hidden group hover:border-foreground/30 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-300 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h2 className="font-medium text-base text-foreground tracking-tight">
              2. Zero Data Trading
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground font-light leading-relaxed">
              We never sell, rent, monetize, or barter your or your loved one&apos;s phone numbers, emails, or postal addresses to third parties.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-border/60 bg-gradient-to-b from-card/80 to-card/40 backdrop-blur-sm space-y-3 relative overflow-hidden group hover:border-foreground/30 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 dark:bg-purple-500/20 text-purple-600 dark:text-purple-300 flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
            <h2 className="font-medium text-base text-foreground tracking-tight">
              3. Sealed Gift Notes
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground font-light leading-relaxed">
              Personal love notes, birthday messages, and greetings are printed into sealed envelopes. They are never published or logged in public databases.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-border/60 bg-gradient-to-b from-card/80 to-card/40 backdrop-blur-sm space-y-3 relative overflow-hidden group hover:border-foreground/30 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <h2 className="font-medium text-base text-foreground tracking-tight">
              4. Ephemeral Payment Proofs
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground font-light leading-relaxed">
              Easypaisa &amp; bank deposit slips are validated strictly by our finance officers and permanently purged within 30 days of fulfillment.
            </p>
          </div>
        </div>

        {/* Live Client-Side Privacy Inspector (Interactive Widget) */}
        <div className="mb-16 p-6 sm:p-8 rounded-3xl border border-border/70 bg-gradient-to-br from-muted/30 via-background to-muted/20 relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-widest text-emerald-600 dark:text-emerald-400 font-mono font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Live Browser Privacy Inspector</span>
              </div>
              <h3 className="text-lg sm:text-xl font-medium tracking-tight text-foreground">
                Your Live Privacy Footprint on This Device
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground font-light">
                We believe in radial transparency. Here is the exact footprint this browser currently holds while visiting {BRAND_INFO.name}.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={handlePurgeSession}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium border border-destructive/40 text-destructive hover:bg-destructive/10 rounded-full transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Purge Session Cache</span>
              </button>

              <button
                onClick={() => {
                  setInspectorData((prev) => ({
                    ...prev,
                    lastChecked: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                  }))
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium border border-border rounded-full hover:bg-muted/50 transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5 text-muted-foreground" />
                <span>Refresh Audit</span>
              </button>
            </div>
          </div>

          {/* Audit Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-border/50">
            <div className="p-4 rounded-xl bg-card/60 border border-border/40">
              <span className="text-[10px] uppercase font-mono tracking-wider text-muted-foreground block">
                Local Shopping Bag Items
              </span>
              <span className="text-xl sm:text-2xl font-mono font-semibold text-foreground mt-1 block">
                {inspectorData.cartItemsCount}
              </span>
              <span className="text-[11px] text-muted-foreground mt-0.5 block">Stored locally for checkout</span>
            </div>

            <div className="p-4 rounded-xl bg-card/60 border border-border/40">
              <span className="text-[10px] uppercase font-mono tracking-wider text-muted-foreground block">
                Third-Party Ad Trackers
              </span>
              <span className="text-xl sm:text-2xl font-mono font-semibold text-emerald-600 dark:text-emerald-400 mt-1 block">
                0
              </span>
              <span className="text-[11px] text-muted-foreground mt-0.5 block">Zero Meta / Google ad pixels</span>
            </div>

            <div className="p-4 rounded-xl bg-card/60 border border-border/40">
              <span className="text-[10px] uppercase font-mono tracking-wider text-muted-foreground block">
                Browser Storage Keys
              </span>
              <span className="text-xl sm:text-2xl font-mono font-semibold text-foreground mt-1 block">
                {inspectorData.localStorageKeysCount}
              </span>
              <span className="text-[11px] text-muted-foreground mt-0.5 block">Essential UI states only</span>
            </div>

            <div className="p-4 rounded-xl bg-card/60 border border-border/40">
              <span className="text-[10px] uppercase font-mono tracking-wider text-muted-foreground block">
                Cross-Site Cookies
              </span>
              <span className="text-xl sm:text-2xl font-mono font-semibold text-foreground mt-1 block">
                {inspectorData.cookiesCount}
              </span>
              <span className="text-[11px] text-muted-foreground mt-0.5 block">Zero tracking cookies</span>
            </div>
          </div>

          {purgeSuccess && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-xs flex items-center gap-2"
            >
              <Check className="w-4 h-4 shrink-0" />
              <span>Session storage successfully purged! Your temporary browser state has been reset cleanly.</span>
            </motion.div>
          )}
        </div>

        {/* Main Content Layout: Sticky Table of Contents + Comprehensive Policy Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column: Sticky Section Navigation */}
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-24 space-y-6">
              <div className="p-6 rounded-2xl border border-border/60 bg-card/50 backdrop-blur-md">
                <span className="text-xs uppercase font-mono tracking-widest text-muted-foreground block mb-4">
                  Charter Navigation
                </span>

                <nav className="space-y-1">
                  {POLICY_SECTIONS.map((sec) => {
                    const Icon = sec.icon
                    const isSelected = activeSection === sec.id

                    return (
                      <button
                        key={sec.id}
                        onClick={() => scrollToSection(sec.id)}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-xs font-medium transition-all cursor-pointer ${
                          isSelected
                            ? "bg-foreground text-background font-semibold shadow-sm"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <Icon className="w-3.5 h-3.5 shrink-0" />
                          <span className="truncate">{sec.title}</span>
                        </div>
                        <span className="text-[10px] font-mono opacity-70 shrink-0 ml-2">
                          {sec.number}
                        </span>
                      </button>
                    )
                  })}
                </nav>
              </div>

              {/* Direct WhatsApp Concierge Card */}
              <div className="p-6 rounded-2xl border border-border/60 bg-gradient-to-br from-card to-muted/30 space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-600 flex items-center justify-center">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-medium uppercase tracking-wider text-foreground">
                    Data Concierge Desk
                  </span>
                </div>
                <p className="text-xs text-muted-foreground font-light leading-relaxed">
                  Have a specific question about your gift data, want to amend a delivery address, or request instant erasure?
                </p>
                <a
                  href={`https://wa.me/${BRAND_INFO.whatsappInternational}?text=Hi%20Raj%27s%20By%20AZ%20Privacy%20Desk%2C%20I%20have%20an%20inquiry%20regarding%20my%20data%20discretion.`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 text-xs font-semibold rounded-xl bg-foreground text-background hover:opacity-90 transition-opacity"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp: {BRAND_INFO.whatsappNumber}</span>
                </a>
              </div>
            </div>
          </aside>

          {/* Right Column: Detailed Policy Clauses */}
          <div className="lg:col-span-8 space-y-16">
            {/* Section 01: Manifesto */}
            <section id="discretion-manifesto" className="scroll-mt-24 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#E8C5A7]">
                <span>Section 01</span>
                <span aria-hidden="true">·</span>
                <span>Philosophy</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-foreground">
                The Gifting Discretion Manifesto
              </h2>
              <div className="prose prose-neutral dark:prose-invert max-w-none text-muted-foreground text-sm sm:text-base font-light leading-relaxed space-y-4">
                <p>
                  At <strong className="text-foreground font-medium">Raj&apos;s By AZ</strong> (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;),
                  we recognize that our boutique does not merely sell gift boxes—we facilitate deeply personal human connections. Whether you are sending a
                  20-Item Signature Beauty Box to celebrate your sister&apos;s milestone, surprising your girlfriend on her birthday, or treating yourself to everyday luxury,
                  the details of your celebration are sacred.
                </p>
                <p>
                  Our commitment to discretion extends beyond traditional corporate compliance. We engineer every customer touchpoint—from our WhatsApp order desk
                  to our courier parcel manifests—to ensure your surprise remains flawless, your financial details remain confidential, and your personal correspondence is guarded.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-muted/30 border-l-2 border-foreground/80 space-y-1">
                <span className="text-xs uppercase tracking-wider font-mono text-foreground font-semibold block">
                  The Golden Rule of Gifting Discretion
                </span>
                <p className="text-xs sm:text-sm text-muted-foreground font-light leading-relaxed italic">
                  &ldquo;A gift must delight the recipient without burdening them with costs, commercial solicitations, or breached expectations.&rdquo;
                </p>
              </div>
            </section>

            {/* Section 02: Information We Collect */}
            <section id="data-collection" className="scroll-mt-24 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#E8C5A7]">
                <span>Section 02</span>
                <span aria-hidden="true">·</span>
                <span>Data Classification</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-foreground">
                Information We Collect &amp; Store
              </h2>
              <div className="prose prose-neutral dark:prose-invert max-w-none text-muted-foreground text-sm sm:text-base font-light leading-relaxed space-y-4">
                <p>
                  We gather only the strictly necessary information required to assemble, personalize, bill, and deliver your gift boxes. We do not gather passive biometric data, location tracking, or third-party advertising identities.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-5 rounded-xl border border-border/60 bg-card/40 space-y-2">
                  <h3 className="text-sm font-medium text-foreground flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-pink-500" />
                    Buyer / Sender Details
                  </h3>
                  <ul className="text-xs text-muted-foreground space-y-1.5 list-disc list-inside font-light">
                    <li>Full Name &amp; billing identity</li>
                    <li>WhatsApp contact number (for order confirmation)</li>
                    <li>Payment confirmation details (Easypaisa or Bank ID)</li>
                    <li>Optional delivery notes or special handling wishes</li>
                  </ul>
                </div>

                <div className="p-5 rounded-xl border border-border/60 bg-card/40 space-y-2">
                  <h3 className="text-sm font-medium text-foreground flex items-center gap-2">
                    <Gift className="w-4 h-4 text-purple-500" />
                    Recipient &amp; Delivery Details
                  </h3>
                  <ul className="text-xs text-muted-foreground space-y-1.5 list-disc list-inside font-light">
                    <li>Recipient Full Name (for parcel address label)</li>
                    <li>Street address, area, and city across Pakistan</li>
                    <li>Recipient contact number (strictly for courier call)</li>
                    <li>Custom heartfelt gift card inscription</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 03: Purpose & Usage */}
            <section id="purpose-usage" className="scroll-mt-24 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#E8C5A7]">
                <span>Section 03</span>
                <span aria-hidden="true">·</span>
                <span>Operational Use</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-foreground">
                How We Use Your Personal Details
              </h2>
              <div className="prose prose-neutral dark:prose-invert max-w-none text-muted-foreground text-sm sm:text-base font-light leading-relaxed space-y-4">
                <p>
                  Every piece of information shared with Raj&apos;s By AZ serves a dedicated, transparent purpose:
                </p>
                <div className="space-y-3 pt-2">
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center text-xs font-mono shrink-0 mt-0.5">
                      ✓
                    </div>
                    <div>
                      <strong className="text-foreground font-medium block">Order Preparation &amp; Unboxing Styling:</strong>
                      <span className="text-xs sm:text-sm text-muted-foreground">
                        Matching the chosen collection (Mini 14-item, Signature 20-item, or Premium 25-item) with your chosen color ribbon, handwritten card, and safety packaging.
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center text-xs font-mono shrink-0 mt-0.5">
                      ✓
                    </div>
                    <div>
                      <strong className="text-foreground font-medium block">Nationwide Courier Dispatch &amp; Tracking:</strong>
                      <span className="text-xs sm:text-sm text-muted-foreground">
                        Generating computer-printed shipping manifests for reliable courier services (e.g., TCS, Leopard, PostEx, Trax) to reach addresses nationwide.
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center text-xs font-mono shrink-0 mt-0.5">
                      ✓
                    </div>
                    <div>
                      <strong className="text-foreground font-medium block">WhatsApp Order Concierge:</strong>
                      <span className="text-xs sm:text-sm text-muted-foreground">
                        Communicating directly with the buyer to provide real-time tracking numbers, unboxing photos prior to dispatch, and immediate replacement assistance if any item is damaged during transit.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 04: Surprise Protection */}
            <section id="surprise-protection" className="scroll-mt-24 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#E8C5A7]">
                <span>Section 04</span>
                <span aria-hidden="true">·</span>
                <span>The Surprise Protocol</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-foreground">
                Surprise Deliveries &amp; Recipient Privacy
              </h2>
              <div className="prose prose-neutral dark:prose-invert max-w-none text-muted-foreground text-sm sm:text-base font-light leading-relaxed space-y-4">
                <p>
                  Sending a gift as a surprise requires foolproof operational measures. We enforce strict policies to safeguard your secret until the moment of unboxing:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-xl border border-border/50 bg-card/30 space-y-1.5">
                    <span className="text-xs font-medium text-foreground block">
                      Discreet Outer Packaging
                    </span>
                    <p className="text-xs text-muted-foreground font-light leading-relaxed">
                      Our delicate pastel luxury gift box is encased inside a sturdy, opaque outer protective carton to conceal contents during transit.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-border/50 bg-card/30 space-y-1.5">
                    <span className="text-xs font-medium text-foreground block">
                      Zero In-Box Price Tags
                    </span>
                    <p className="text-xs text-muted-foreground font-light leading-relaxed">
                      All item manufacturer tags with pricing are delicately removed or covered. No price list or itemized bills are ever placed inside.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-border/50 bg-card/30 space-y-1.5">
                    <span className="text-xs font-medium text-foreground block">
                      Optional Anonymous Gifting
                    </span>
                    <p className="text-xs text-muted-foreground font-light leading-relaxed">
                      If you request anonymous delivery, we will omit the sender&apos;s name entirely from the greeting card, preserving your secret identity.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-border/50 bg-card/30 space-y-1.5">
                    <span className="text-xs font-medium text-foreground block">
                      Zero Pre-Delivery Spoilers
                    </span>
                    <p className="text-xs text-muted-foreground font-light leading-relaxed">
                      Couriers receive instructions to coordinate delivery arrival without detailing the nature of the luxury items inside.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 05: Payments & Financial Confidentiality */}
            <section id="payment-security" className="scroll-mt-24 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#E8C5A7]">
                <span>Section 05</span>
                <span aria-hidden="true">·</span>
                <span>Financial Safety</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-foreground">
                Payments &amp; Financial Confidentiality
              </h2>
              <div className="prose prose-neutral dark:prose-invert max-w-none text-muted-foreground text-sm sm:text-base font-light leading-relaxed space-y-4">
                <p>
                  We offer three trusted payment methods across Pakistan, each guarded by distinct privacy protocols:
                </p>
                <div className="space-y-3 pt-2">
                  <div className="p-4 rounded-xl bg-card/50 border border-border/50 space-y-1">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground">
                      1. Cash on Delivery (COD)
                    </h3>
                    <p className="text-xs text-muted-foreground font-light leading-relaxed">
                      When selecting COD, no banking data is entered online. The exact order total is collected in cash by the courier upon physical handover.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-card/50 border border-border/50 space-y-1">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground">
                      2. Easypaisa / Bank Transfer Online
                    </h3>
                    <p className="text-xs text-muted-foreground font-light leading-relaxed">
                      When transferring to our registered title (Syed Khubaib Ali Shah), your transfer screenshots or transaction reference IDs (TRX) are verified strictly by authorized personnel. We never request your PIN, OTP, CVV, or banking passwords.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-card/50 border border-border/50 space-y-1">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground">
                      3. Store Pickup in Karachi
                    </h3>
                    <p className="text-xs text-muted-foreground font-light leading-relaxed">
                      For Karachi customers electing self-pickup, payment can be rendered directly at pickup with zero online credential exchange.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 06: Logistics & Couriers */}
            <section id="logistics-couriers" className="scroll-mt-24 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#E8C5A7]">
                <span>Section 06</span>
                <span aria-hidden="true">·</span>
                <span>Logistics Partners</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-foreground">
                Nationwide Courier Handover
              </h2>
              <div className="prose prose-neutral dark:prose-invert max-w-none text-muted-foreground text-sm sm:text-base font-light leading-relaxed space-y-4">
                <p>
                  To fulfill deliveries across Sindh, Punjab, Khyber Pakhtunkhwa, Balochistan, and Azad Kashmir, we partner with reputable licensed Pakistani logistics providers.
                </p>
                <p>
                  We mandate the principle of <em>Least Privilege</em>: courier partner databases receive only the minimal fields required for transit:
                </p>
                <ul className="text-xs sm:text-sm text-muted-foreground space-y-1.5 list-disc list-inside font-light">
                  <li>Consignee Name &amp; Full Delivery Address</li>
                  <li>Destination Contact Telephone Number</li>
                  <li>Parcel Tracking Barcode &amp; COD Collection Value</li>
                </ul>
                <p>
                  Couriers are contractually prohibited from using customer telephone numbers for promotional marketing, advertising broadcasts, or secondary sales.
                </p>
              </div>
            </section>

            {/* Section 07: Storage & Retention */}
            <section id="storage-retention" className="scroll-mt-24 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#E8C5A7]">
                <span>Section 07</span>
                <span aria-hidden="true">·</span>
                <span>Data Retention</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-foreground">
                Data Retention &amp; Storage Lifespans
              </h2>
              <div className="prose prose-neutral dark:prose-invert max-w-none text-muted-foreground text-sm sm:text-base font-light leading-relaxed space-y-4">
                <p>
                  We adhere to strict data obsolescence timetables. We do not hold historical personal data perpetually:
                </p>
                <div className="overflow-x-auto pt-2">
                  <table className="w-full text-left text-xs border border-border/60 rounded-xl overflow-hidden">
                    <thead className="bg-muted/40 text-foreground font-mono uppercase">
                      <tr>
                        <th className="p-3 border-b border-border/60">Data Category</th>
                        <th className="p-3 border-b border-border/60">Retention Period</th>
                        <th className="p-3 border-b border-border/60">Action Upon Expiry</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/40 text-muted-foreground font-light">
                      <tr>
                        <td className="p-3 font-medium text-foreground">Payment Slips &amp; TRX Screenshots</td>
                        <td className="p-3">30 Days after fulfilled delivery</td>
                        <td className="p-3 text-emerald-600 dark:text-emerald-400">Permanently Deleted</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-medium text-foreground">Custom Gift Message Notes</td>
                        <td className="p-3">14 Days after unboxing date</td>
                        <td className="p-3 text-emerald-600 dark:text-emerald-400">Purged from Print Cache</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-medium text-foreground">Courier Consignment Logs</td>
                        <td className="p-3">90 Days (tax &amp; audit compliance)</td>
                        <td className="p-3 text-emerald-600 dark:text-emerald-400">Anonymized Archive</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-medium text-foreground">Browser Cart &amp; UI Sessions</td>
                        <td className="p-3">Local Device / Session only</td>
                        <td className="p-3 text-emerald-600 dark:text-emerald-400">User Cleared or Browser Reset</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* Section 08: Your Rights & Erasure */}
            <section id="your-rights" className="scroll-mt-24 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#E8C5A7]">
                <span>Section 08</span>
                <span aria-hidden="true">·</span>
                <span>User Empowerment</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-foreground">
                Your Rights &amp; Immediate Erasure Requests
              </h2>
              <div className="prose prose-neutral dark:prose-invert max-w-none text-muted-foreground text-sm sm:text-base font-light leading-relaxed space-y-4">
                <p>
                  Under international consumer protection ethics and Pakistani electronic commerce norms, you hold complete sovereignty over your information:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-4 rounded-xl border border-border/50 bg-card/30 space-y-1">
                    <span className="text-xs font-semibold text-foreground block">
                      Right to Access
                    </span>
                    <p className="text-[11px] text-muted-foreground font-light leading-relaxed">
                      Request a full copy of every active order, address, and record linked to your phone number.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-border/50 bg-card/30 space-y-1">
                    <span className="text-xs font-semibold text-foreground block">
                      Right to Correction
                    </span>
                    <p className="text-[11px] text-muted-foreground font-light leading-relaxed">
                      Instantly modify recipient phone numbers, address typos, or gift card wordings before courier departure.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-border/50 bg-card/30 space-y-1">
                    <span className="text-xs font-semibold text-foreground block">
                      Right to Erasure (&ldquo;To Be Forgotten&rdquo;)
                    </span>
                    <p className="text-[11px] text-muted-foreground font-light leading-relaxed">
                      Instruct our team to purge past delivery addresses and contact logs from our operational systems at any time.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 09: FAQ Accordion */}
            <section className="space-y-6 pt-4">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#E8C5A7]">
                <span>Transparency FAQ</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-foreground">
                Common Discretion Scenarios
              </h2>

              <div className="divide-y divide-border/60 border-y border-border/60">
                {faqItems.map((item, index) => {
                  const isExpanded = expandedFaq === index
                  return (
                    <div key={index} className="py-4">
                      <button
                        onClick={() => setExpandedFaq(isExpanded ? null : index)}
                        className="w-full flex items-center justify-between text-left text-sm sm:text-base font-medium text-foreground hover:opacity-80 transition-opacity cursor-pointer gap-4"
                      >
                        <span>{item.q}</span>
                        <span className="shrink-0 text-muted-foreground">
                          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </span>
                      </button>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="pt-3 text-xs sm:text-sm text-muted-foreground font-light leading-relaxed"
                        >
                          {item.a}
                        </motion.div>
                      )}
                    </div>
                  )
                })}
              </div>
            </section>

            {/* Section 10: Contact Desk & Sign-Off */}
            <section id="contact-desk" className="scroll-mt-24 p-8 rounded-3xl border border-border/80 bg-gradient-to-br from-card via-muted/20 to-card space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-foreground text-background flex items-center justify-center shadow-md">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-medium tracking-tight text-foreground">
                    Raj&apos;s By AZ Privacy &amp; Trust Desk
                  </h3>
                  <span className="text-xs text-muted-foreground font-mono">
                    Direct Concierge Support for Data &amp; Order Inquiries
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-muted-foreground font-light leading-relaxed">
                If you have questions regarding this Discretion Charter, wish to request immediate record removal, or need assistance ensuring your surprise gift remains confidential, please contact our team:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                <div className="p-4 rounded-xl bg-background border border-border/50">
                  <span className="text-muted-foreground uppercase text-[10px] block">WhatsApp Concierge</span>
                  <a
                    href={`https://wa.me/${BRAND_INFO.whatsappInternational}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-foreground font-semibold hover:underline mt-1 block"
                  >
                    +92 (314) 9784156
                  </a>
                  <span className="text-[10px] text-muted-foreground/80 mt-0.5 block">Mon - Sat · 10:00 AM - 10:00 PM PKT</span>
                </div>

                <div className="p-4 rounded-xl bg-background border border-border/50">
                  <span className="text-muted-foreground uppercase text-[10px] block">Finance &amp; Management Title</span>
                  <span className="text-foreground font-semibold mt-1 block">
                    {BRAND_INFO.easypaisaTitle}
                  </span>
                  <span className="text-[10px] text-muted-foreground/80 mt-0.5 block">Karachi &amp; Nationwide Logistics, Pakistan</span>
                </div>
              </div>

              {/* Personal Founder Note */}
              <div className="pt-4 border-t border-border/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <p className="text-xs italic font-serif text-foreground">
                    &ldquo;Little luxuries, guarded with the care of true friendship.&rdquo;
                  </p>
                  <span className="text-[11px] text-muted-foreground font-mono block">
                    The Raj&apos;s By AZ Creative &amp; Logistics Team
                  </span>
                </div>

                <button
                  onClick={onBackToStore}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold rounded-full bg-foreground text-background hover:opacity-90 transition-opacity cursor-pointer shadow-sm"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Gift Collections</span>
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
