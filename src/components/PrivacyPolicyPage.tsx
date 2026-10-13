"use client"

import React, { useState, useEffect } from "react"
import {
  ShieldCheck,
  EyeOff,
  Sparkles,
  ArrowLeft,
  MessageCircle,
  Truck,
  CreditCard,
  ChevronDown,
  ChevronUp,
  Gift,
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
  { id: "surprises", title: "Surprises Stay Secret", number: "01", icon: EyeOff },
  { id: "information", title: "What We Collect", number: "02", icon: UserCheck },
  { id: "payments", title: "Safe Payments", number: "03", icon: CreditCard },
  { id: "couriers", title: "Courier Deliveries", number: "04", icon: Truck },
  { id: "control", title: "Your Privacy & Control", number: "05", icon: ShieldCheck },
  { id: "contact", title: "Chat With Us", number: "06", icon: MessageCircle },
]

export default function PrivacyPolicyPage({
  onBackToStore,
}: PrivacyPolicyPageProps) {
  const [activeSection, setActiveSection] = useState("surprises")
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  // Scrollspy for active policy section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 180
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

  const faqItems = [
    {
      q: "Will the recipient see the price or receipt?",
      a: "Never. We never include invoices or price tags inside any gift box. All receipts and confirmation messages are sent strictly to your WhatsApp.",
    },
    {
      q: "Can I send a gift anonymously?",
      a: "Yes. Simply tell us or add 'Anonymous' in your order notes. We will omit your name from the card while keeping your delivery details safe on file.",
    },
    {
      q: "What happens to my payment screenshot?",
      a: "Once our team verifies your Easypaisa or bank transfer reference, your payment slip is checked and permanently deleted after delivery.",
    },
    {
      q: "Will I receive promotional spam messages?",
      a: "No. We never send broadcast spam. Our WhatsApp line is used only to confirm orders, share tracking codes, and answer your questions.",
    },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground pb-20 transition-colors">
      {/* Soft Luxury Glows */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 isolate z-0 overflow-hidden"
      >
        <div className="absolute top-0 right-1/4 h-[400px] w-[350px] -translate-y-1/2 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(242,176,194,0.07)_0,transparent_80%)] blur-3xl" />
        <div className="absolute top-1/3 left-0 h-[450px] w-[300px] rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(232,197,167,0.08)_0,transparent_80%)] blur-3xl" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Navigation Action Bar */}
        <div className="flex items-center justify-between pb-6 border-b border-border/40">
          <button
            onClick={onBackToStore}
            className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Return to Boutique Showcase</span>
          </button>
        </div>

        {/* Editorial Hero Section */}
        <div className="pt-10 pb-12 sm:pb-14">
          <div className="max-w-2xl space-y-3">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-muted-foreground font-medium">
              <Sparkles className="w-3.5 h-3.5 text-[#E8C5A7]" />
              <span>Raj&apos;s By AZ · Privacy Promise</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-foreground uppercase">
              Privacy &amp; Discretion
            </h1>

            <p className="text-sm sm:text-base text-muted-foreground font-light leading-relaxed pt-1">
              Gifting is personal. When you trust us with a surprise for someone you love, we protect your personal messages, recipient addresses, and payment details with complete confidentiality.
            </p>

            <div className="flex items-center gap-3 pt-2 text-xs text-muted-foreground uppercase tracking-wider font-light">
              <span>Updated October 2026</span>
              <span aria-hidden="true">·</span>
              <span>Simple &amp; Transparent</span>
            </div>
          </div>
        </div>

        {/* 3 Core Quick Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-12">
          <div className="p-5 rounded-2xl border border-border/60 bg-card/60 backdrop-blur-sm space-y-2">
            <div className="w-8 h-8 rounded-lg bg-pink-500/10 text-pink-600 dark:text-pink-300 flex items-center justify-center">
              <EyeOff className="w-4 h-4" />
            </div>
            <h3 className="font-medium text-sm text-foreground">
              No Price Tags or Invoices
            </h3>
            <p className="text-xs text-muted-foreground font-light leading-relaxed">
              Recipients only see the unboxing experience. Pricing stays strictly between you and us.
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-border/60 bg-card/60 backdrop-blur-sm space-y-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-300 flex items-center justify-center">
              <Gift className="w-4 h-4" />
            </div>
            <h3 className="font-medium text-sm text-foreground">
              Sealed Personal Notes
            </h3>
            <p className="text-xs text-muted-foreground font-light leading-relaxed">
              Your heartfelt words are printed and placed into a sealed card envelope—never stored publicly.
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-border/60 bg-card/60 backdrop-blur-sm space-y-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h3 className="font-medium text-sm text-foreground">
              Zero Marketing Spam
            </h3>
            <p className="text-xs text-muted-foreground font-light leading-relaxed">
              We never sell your phone number or add you to annoying WhatsApp marketing broadcast lists.
            </p>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Quick Nav Anchor List */}
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-24 space-y-4">
              <div className="p-5 rounded-2xl border border-border/60 bg-card/50">
                <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground block mb-3 font-medium">
                  Quick Sections
                </span>

                <nav className="space-y-1">
                  {POLICY_SECTIONS.map((sec) => {
                    const Icon = sec.icon
                    const isSelected = activeSection === sec.id

                    return (
                      <button
                        key={sec.id}
                        onClick={() => scrollToSection(sec.id)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs font-medium transition-all cursor-pointer ${
                          isSelected
                            ? "bg-foreground text-background font-semibold"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                        }`}
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <Icon className="w-3.5 h-3.5 shrink-0" />
                          <span className="truncate">{sec.title}</span>
                        </div>
                        <span className="text-[10px] tracking-wider opacity-60 ml-2">
                          {sec.number}
                        </span>
                      </button>
                    )
                  })}
                </nav>
              </div>

              {/* Direct Help */}
              <div className="p-5 rounded-2xl border border-border/60 bg-muted/20 space-y-2 text-xs">
                <p className="text-foreground font-medium">Need immediate assistance?</p>
                <p className="text-muted-foreground font-light leading-relaxed">
                  Message our team on WhatsApp if you want to update an address or remove past order records.
                </p>
                <a
                  href={`https://wa.me/${BRAND_INFO.whatsappInternational}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-foreground font-semibold hover:underline pt-1"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp: {BRAND_INFO.whatsappNumber}</span>
                </a>
              </div>
            </div>
          </aside>

          {/* Simple Natural Language Content */}
          <div className="lg:col-span-8 space-y-10">
            {/* 01. Surprises */}
            <section id="surprises" className="scroll-mt-24 space-y-3">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#E8C5A7] font-medium">
                <span>01</span>
                <span aria-hidden="true">·</span>
                <span>The Surprise Protocol</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-normal text-foreground uppercase tracking-wide">
                Surprises Stay 100% Secret
              </h2>
              <p className="text-sm text-muted-foreground font-light leading-relaxed">
                If you are sending a gift box as a surprise, we take special care to make sure it remains a complete delight:
              </p>
              <ul className="text-xs sm:text-sm text-muted-foreground space-y-2 list-disc list-inside font-light">
                <li><strong className="text-foreground font-medium">No prices in the box:</strong> We remove all manufacturer price tags and never include an invoice inside.</li>
                <li><strong className="text-foreground font-medium">Discreet exterior box:</strong> The pretty pastel gift box is packed inside a plain protective delivery carton so no one knows what is inside until it is opened.</li>
                <li><strong className="text-foreground font-medium">Anonymous option:</strong> If you prefer to stay anonymous, just tell us on WhatsApp. We will print the card without your name.</li>
              </ul>
            </section>

            {/* 02. Information */}
            <section id="information" className="scroll-mt-24 space-y-3">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#E8C5A7] font-medium">
                <span>02</span>
                <span aria-hidden="true">·</span>
                <span>Simple Details</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-normal text-foreground uppercase tracking-wide">
                What Information We Ask For
              </h2>
              <p className="text-sm text-muted-foreground font-light leading-relaxed">
                We only ask for details needed to pack and deliver your order smoothly:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="p-4 rounded-xl border border-border/50 bg-card/40 space-y-1">
                  <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider">Your Details</h4>
                  <p className="text-xs text-muted-foreground font-light">Your name and WhatsApp number so we can confirm the box and send tracking details.</p>
                </div>
                <div className="p-4 rounded-xl border border-border/50 bg-card/40 space-y-1">
                  <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider">Recipient Details</h4>
                  <p className="text-xs text-muted-foreground font-light">Recipient name, delivery address, and phone number so the courier can deliver the parcel.</p>
                </div>
              </div>
            </section>

            {/* 03. Payments */}
            <section id="payments" className="scroll-mt-24 space-y-3">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#E8C5A7] font-medium">
                <span>03</span>
                <span aria-hidden="true">·</span>
                <span>Payment Privacy</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-normal text-foreground uppercase tracking-wide">
                Safe &amp; Confidential Payments
              </h2>
              <p className="text-sm text-muted-foreground font-light leading-relaxed">
                Whether you pay by Cash on Delivery (COD), Easypaisa, or Bank Transfer:
              </p>
              <ul className="text-xs sm:text-sm text-muted-foreground space-y-2 list-disc list-inside font-light">
                <li><strong className="text-foreground font-medium">Cash on Delivery:</strong> No card or banking numbers are shared. You or the recipient pay cash to the rider upon delivery.</li>
                <li><strong className="text-foreground font-medium">Easypaisa &amp; Bank Transfer:</strong> Your transfer receipt screenshot is reviewed once by our team to confirm payment, and then deleted from our active records.</li>
                <li>We never ask for your passwords, OTP codes, or ATM PIN numbers.</li>
              </ul>
            </section>

            {/* 04. Couriers */}
            <section id="couriers" className="scroll-mt-24 space-y-3">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#E8C5A7] font-medium">
                <span>04</span>
                <span aria-hidden="true">·</span>
                <span>Delivery Dispatch</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-normal text-foreground uppercase tracking-wide">
                Nationwide Courier Deliveries
              </h2>
              <p className="text-sm text-muted-foreground font-light leading-relaxed">
                We use reliable couriers across Pakistan (like TCS, Leopard, PostEx, Trax). Couriers only receive what is printed on the shipping label:
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground font-light bg-muted/30 p-3 rounded-xl border border-border/40">
                Recipient name, city, delivery address, phone number for the rider&apos;s arrival call, and COD amount (if applicable). They never see your private card notes.
              </p>
            </section>

            {/* 05. Control */}
            <section id="control" className="scroll-mt-24 space-y-3">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#E8C5A7] font-medium">
                <span>05</span>
                <span aria-hidden="true">·</span>
                <span>Your Control</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-normal text-foreground uppercase tracking-wide">
                You Are Always in Control
              </h2>
              <p className="text-sm text-muted-foreground font-light leading-relaxed">
                If you ever want us to delete your past order history, remove your address, or delete your contact from our logs, simply text us on WhatsApp. We will clear it without questions.
              </p>
            </section>

            {/* FAQs */}
            <section className="space-y-4 pt-4 border-t border-border/50">
              <h3 className="text-lg font-normal text-foreground uppercase tracking-wide">
                Frequently Asked Questions
              </h3>
              <div className="divide-y divide-border/60">
                {faqItems.map((item, index) => {
                  const isExpanded = expandedFaq === index
                  return (
                    <div key={index} className="py-3">
                      <button
                        onClick={() => setExpandedFaq(isExpanded ? null : index)}
                        className="w-full flex items-center justify-between text-left text-sm font-medium text-foreground hover:opacity-80 transition-opacity cursor-pointer gap-4"
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
                          className="pt-2 text-xs sm:text-sm text-muted-foreground font-light leading-relaxed"
                        >
                          {item.a}
                        </motion.div>
                      )}
                    </div>
                  )
                })}
              </div>
            </section>

            {/* 06. Contact */}
            <section id="contact" className="scroll-mt-24 p-6 rounded-2xl border border-border/70 bg-gradient-to-br from-card to-muted/20 space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
                    Raj&apos;s By AZ Concierge
                  </h3>
                  <span className="text-[11px] text-muted-foreground font-light">
                    Direct Support in Karachi &amp; Nationwide
                  </span>
                </div>
              </div>

              <p className="text-xs text-muted-foreground font-light leading-relaxed">
                Have questions about your gift or privacy? Message us directly on WhatsApp and we will be happy to assist you:
              </p>

              <div className="pt-1 flex flex-wrap items-center gap-3">
                <a
                  href={`https://wa.me/${BRAND_INFO.whatsappInternational}?text=Hi%20Raj%27s%20By%20AZ%2C%20I%20have%20a%20privacy%20question`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-full bg-foreground text-background hover:opacity-90 transition-opacity"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp: {BRAND_INFO.whatsappNumber}</span>
                </a>

                <button
                  onClick={onBackToStore}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Gift Boxes</span>
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
