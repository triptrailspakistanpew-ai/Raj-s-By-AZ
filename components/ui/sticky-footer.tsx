import React from "react"
import { cn } from "@/lib/utils"
import { motion, useReducedMotion } from "motion/react"
import {
  FacebookIcon,
  InstagramIcon,
  YoutubeIcon,
  MessageCircle,
  Sparkles,
  ArrowUpRight,
} from "lucide-react"
import { Button } from "./button"
import { BRAND_INFO } from "@/src/data/products"

interface FooterLink {
  title: string
  href: string
  icon?: React.ComponentType<{ className?: string }>
  hideOnMobile?: boolean
}

interface FooterLinkGroup {
  label: string
  hideOnMobile?: boolean
  links: FooterLink[]
}

type StickyFooterProps = React.ComponentProps<"footer"> & {
  onNavigate?: (page: "showcase" | "cart" | "privacy") => void
  onScrollToTop?: () => void
}

export function StickyFooter({
  className,
  onNavigate,
  onScrollToTop,
  ...props
}: StickyFooterProps) {
  const footerLinkGroups: FooterLinkGroup[] = [
    {
      label: "Gift Collections",
      links: [
        { title: "14-Item Mini Box (Rs. 1,499)", href: "/products/mini-beauty-box" },
        { title: "20-Item Signature Box (Rs. 2,499)", href: "/products/signature-beauty-box" },
        { title: "25-Item Deluxe Box (Rs. 3,499)", href: "/products/premium-beauty-box" },
        { title: "Browse All Gift Boxes", href: "#final-collection", hideOnMobile: true },
        { title: "Shopping Bag & Checkout", href: "/cart" },
      ],
    },
    {
      label: "Occasions & Giving",
      hideOnMobile: true, // Removed on small screens to fit neatly without overflowing
      links: [
        { title: "Birthday Gift Boxes", href: "#final-collection" },
        { title: "Anniversary Surprises", href: "#final-collection" },
        { title: "For Sisters & Friends", href: "#final-collection" },
        { title: "Everyday Self-Care", href: "#final-collection" },
        { title: "Handmade Cards", href: "#final-collection" },
      ],
    },
    {
      label: "Customer Care",
      links: [
        { title: `WhatsApp: ${BRAND_INFO.whatsappNumber}`, href: `https://wa.me/${BRAND_INFO.whatsappInternational}` },
        { title: "Cash on Delivery Nationwide", href: "#final-collection" },
        { title: "Easypaisa & Bank Transfer", href: "/cart", hideOnMobile: true },
        { title: "Privacy Policy", href: "/privacy" },
        { title: "FAQs & Delivery Times", href: "#final-collection", hideOnMobile: true },
      ],
    },
    {
      label: "About Raj's By AZ",
      hideOnMobile: true, // Removed on small screens because story & developer credit are in bio and bottom legal bar
      links: [
        { title: "Our Story & Philosophy", href: "#final-collection" },
        { title: "What's Inside Our Boxes", href: "#final-collection" },
        { title: "100% Packaging Guarantee", href: "#final-collection" },
        { title: "Developed by Khubaib Shah", href: "https://www.thekhubaib.me/" },
      ],
    },
  ]

  const socialLinks = [
    {
      title: "WhatsApp",
      href: `https://wa.me/${BRAND_INFO.whatsappInternational}?text=Hi%20Raj%27s%20By%20AZ%2C%20I%20want%20to%20inquire%20about%20gift%20boxes`,
      icon: MessageCircle,
    },
    {
      title: "Instagram",
      href: "https://www.instagram.com/",
      icon: InstagramIcon,
    },
    {
      title: "Facebook",
      href: "https://www.facebook.com/",
      icon: FacebookIcon,
    },
    {
      title: "YouTube",
      href: "https://www.youtube.com/",
      icon: YoutubeIcon,
    },
  ]

  // Fixed responsive height classes shared between outer clipPath container and inner fixed container
  const FOOTER_HEIGHT = "h-[470px] sm:h-[450px] md:h-[460px] lg:h-[480px]"

  return (
    <footer
      className={cn(
        "relative w-full overflow-hidden",
        FOOTER_HEIGHT,
        className
      )}
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
      {...props}
    >
      {/* 
        Fixed curtain-reveal footer container anchored at bottom of viewport.
        As the user scrolls to the bottom of the page, the preceding content slides up,
        revealing this fixed footer from underneath.
      */}
      <div className={cn("fixed bottom-0 left-0 right-0 w-full z-0", FOOTER_HEIGHT)}>
        <div className="relative flex size-full flex-col justify-between border-t border-border/60 bg-gradient-to-b from-background via-background to-muted/20 text-foreground px-4 py-5 sm:px-8 sm:py-6 md:px-12 md:py-8 overflow-hidden select-none">
          {/* Ambient luxury radial glow accents */}
          <div
            aria-hidden
            className="absolute inset-0 isolate z-0 pointer-events-none overflow-hidden"
          >
            <div className="bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,rgba(232,197,167,0.12)_0,rgba(242,176,194,0.04)_50%,transparent_80%)] absolute top-0 left-0 h-[450px] w-[350px] -translate-y-24 -rotate-45 rounded-full" />
            <div className="bg-[radial-gradient(50%_50%_at_50%_50%,rgba(255,187,146,0.08)_0,transparent_80%)] absolute top-0 right-0 h-[450px] w-[300px] [translate:10%_-30%] -rotate-45 rounded-full" />
            <div className="bg-[radial-gradient(50%_50%_at_50%_50%,rgba(22,20,18,0.04)_0,transparent_80%)] dark:bg-[radial-gradient(50%_50%_at_50%_50%,rgba(255,255,255,0.04)_0,transparent_80%)] absolute bottom-0 left-1/3 h-[350px] w-[300px] rounded-full" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto w-full flex-1 flex flex-col justify-between">
            {/* Top row: Brand summary & Navigation links */}
            <div className="flex flex-col gap-6 md:flex-row md:justify-between items-start pt-1">
              {/* Brand Col */}
              <AnimatedContainer className="w-full md:max-w-xs space-y-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#161311] text-[#FFB68B] flex items-center justify-center shadow-md">
                    <Sparkles className="size-3.5 sm:size-4" />
                  </div>
                  <div>
                    <span className="font-bold text-sm sm:text-base tracking-[0.25em] uppercase block">
                      {BRAND_INFO.name}
                    </span>
                    <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-muted-foreground block font-light">
                      {BRAND_INFO.tagline}
                    </span>
                  </div>
                </div>

                <p className="text-muted-foreground text-xs sm:text-sm font-light leading-relaxed max-w-sm">
                  Curated beauty, makeup, jewellery and accessories gift boxes for girls &amp; women in Pakistan. Thoughtfully assembled for life&apos;s lovely little surprises.
                </p>

                {/* Social Channels */}
                <div className="flex items-center gap-2 pt-0.5">
                  {socialLinks.map((link) => (
                    <a
                      key={link.title}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      title={link.title}
                    >
                      <Button
                        size="icon"
                        variant="outline"
                        className="size-7 sm:size-8 rounded-full border-border/80 hover:border-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 cursor-pointer"
                      >
                        <link.icon className="size-3 sm:size-3.5" />
                      </Button>
                    </a>
                  ))}
                </div>

                {/* Quick Trust Badges (Hidden on mobile to preserve vertical space and ensure zero overflow) */}
                <div className="hidden sm:block pt-1 text-[11px] uppercase tracking-wider text-muted-foreground/90 space-y-0.5 font-light">
                  <p>• Free Nationwide Shipping on Orders</p>
                  <p>• Cash on Delivery (COD) Available</p>
                  <p>• Easy WhatsApp Ordering</p>
                </div>
              </AnimatedContainer>

              {/* Navigation Link Groups: 2 columns on small screens, 4 columns on desktop */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 w-full md:max-w-2xl lg:max-w-3xl">
                {footerLinkGroups.map((group, index) => (
                  <AnimatedContainer
                    key={group.label}
                    delay={0.1 + index * 0.08}
                    className={cn(
                      "w-full",
                      group.hideOnMobile && "hidden md:block"
                    )}
                  >
                    <div>
                      <h3 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-foreground">
                        {group.label}
                      </h3>
                      <ul className="text-muted-foreground mt-2.5 sm:mt-4 space-y-1.5 sm:space-y-2.5 text-xs sm:text-sm font-light">
                        {group.links.map((link) => (
                          <li
                            key={link.title}
                            className={cn(link.hideOnMobile && "hidden sm:block")}
                          >
                            <a
                              href={link.href}
                              onClick={(e) => {
                                if (link.href === "/cart" && onNavigate) {
                                  e.preventDefault()
                                  onNavigate("cart")
                                } else if (link.href === "/privacy" && onNavigate) {
                                  e.preventDefault()
                                  onNavigate("privacy")
                                } else if (link.href === "#final-collection" && onNavigate) {
                                  e.preventDefault()
                                  onNavigate("showcase")
                                  const el = document.getElementById("final-collection")
                                  if (el) el.scrollIntoView({ behavior: "smooth" })
                                }
                              }}
                              className="hover:text-foreground inline-flex items-center transition-all duration-300 group cursor-pointer"
                            >
                              {link.icon && <link.icon className="me-1 size-3 sm:size-3.5" />}
                              <span className="group-hover:translate-x-0.5 transition-transform truncate max-w-[160px] sm:max-w-none">
                                {link.title}
                              </span>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </AnimatedContainer>
                ))}
              </div>
            </div>

            {/* Bottom Row Legal & Creator Attribution */}
            <div className="text-muted-foreground flex flex-col items-center justify-between gap-2.5 border-t border-border/60 pt-3 sm:pt-4 text-xs sm:text-sm md:flex-row">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-4 text-center sm:text-left text-[11px] sm:text-xs">
                <p>&copy; {new Date().getFullYear()} {BRAND_INFO.name}. All rights reserved.</p>
                <span className="hidden sm:inline text-border">/</span>
                {onNavigate ? (
                  <button
                    onClick={() => onNavigate("privacy")}
                    className="hover:text-foreground hover:underline transition-colors cursor-pointer"
                  >
                    Privacy Policy
                  </button>
                ) : (
                  <a href="/privacy" className="hover:text-foreground hover:underline transition-colors">
                    Privacy Policy
                  </a>
                )}
                <span className="hidden lg:inline text-border">/</span>
                <p className="hidden lg:inline text-[11px] uppercase tracking-wider text-muted-foreground/80 font-light">
                  {BRAND_INFO.announcement}
                </p>
              </div>

              <div className="flex items-center gap-3 sm:gap-4 text-[11px] sm:text-xs">
                {onScrollToTop && (
                  <button
                    onClick={onScrollToTop}
                    className="flex items-center gap-1 text-foreground hover:opacity-75 transition-opacity font-semibold cursor-pointer uppercase tracking-wider text-[11px]"
                  >
                    <span>Back to Top</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                )}
                <span className="text-border">/</span>
                <p>
                  Developed by{" "}
                  <a
                    href="https://www.thekhubaib.me/"
                    target="_blank"
                    rel="noreferrer"
                    className="text-foreground font-semibold hover:underline transition-all"
                  >
                    Khubaib Shah
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

type AnimatedContainerProps = React.ComponentProps<typeof motion.div> & {
  children?: React.ReactNode
  delay?: number
}

function AnimatedContainer({
  delay = 0.1,
  children,
  className,
  ...props
}: AnimatedContainerProps) {
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      initial={{ filter: "blur(4px)", translateY: -8, opacity: 0 }}
      whileInView={{ filter: "blur(0px)", translateY: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8 }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export default StickyFooter
