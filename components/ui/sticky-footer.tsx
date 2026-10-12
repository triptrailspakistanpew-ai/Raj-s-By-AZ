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
}

interface FooterLinkGroup {
  label: string
  links: FooterLink[]
}

type StickyFooterProps = React.ComponentProps<"footer"> & {
  onNavigate?: (page: "showcase" | "cart" | "privacy") => void
  onScrollToTop?: () => void
}

export function StickyFooter({ className, onNavigate, onScrollToTop, ...props }: StickyFooterProps) {
  const footerLinkGroups: FooterLinkGroup[] = [
    {
      label: "Gift Collections",
      links: [
        { title: "14-Item Mini Beauty Box (Rs. 1,499)", href: "/products/mini-beauty-box" },
        { title: "20-Item Signature Beauty Box (Rs. 2,499)", href: "/products/signature-beauty-box" },
        { title: "25-Item Deluxe Beauty Box (Rs. 3,499)", href: "/products/premium-beauty-box" },
        { title: "Browse All Gift Boxes", href: "#final-collection" },
        { title: "Shopping Bag & Checkout", href: "/cart" },
      ],
    },
    {
      label: "Occasions & Giving",
      links: [
        { title: "Birthday Gift Boxes", href: "#final-collection" },
        { title: "Anniversary Surprises", href: "#final-collection" },
        { title: "For Sisters & Best Friends", href: "#final-collection" },
        { title: "Everyday Self-Care Treats", href: "#final-collection" },
        { title: "Handmade Greeting Cards", href: "#final-collection" },
      ],
    },
    {
      label: "Customer Care",
      links: [
        { title: `WhatsApp Order: ${BRAND_INFO.whatsappNumber}`, href: `https://wa.me/${BRAND_INFO.whatsappInternational}` },
        { title: "Cash on Delivery (COD) Nationwide", href: "#final-collection" },
        { title: "Easypaisa & Bank Transfer", href: "/cart" },
        { title: "Privacy Policy & Discretion Charter", href: "/privacy" },
        { title: "Frequently Asked Questions", href: "#final-collection" },
      ],
    },
    {
      label: "About Raj's By AZ",
      links: [
        { title: "Our Story & Philosophy", href: "#final-collection" },
        { title: "What's Inside Our Boxes", href: "#final-collection" },
        { title: "100% Quality & Packaging Guarantee", href: "#final-collection" },
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

  return (
    <footer
      className={cn("relative h-[780px] md:h-[720px] w-full bg-background text-foreground", className)}
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
      {...props}
    >
      <div className="fixed bottom-0 h-[780px] md:h-[720px] w-full bg-background">
        <div className="sticky top-[calc(100vh-780px)] md:top-[calc(100vh-720px)] h-full overflow-y-auto">
          <div className="relative flex size-full flex-col justify-between gap-5 border-t border-border/60 bg-gradient-to-b from-background via-background to-muted/20 px-6 py-8 sm:px-8 md:px-12 lg:px-16">
            
            {/* Ambient luxury radial glow accents */}
            <div
              aria-hidden
              className="absolute inset-0 isolate z-0 contain-strict pointer-events-none overflow-hidden"
            >
              <div className="bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,rgba(232,197,167,0.12)_0,rgba(242,176,194,0.04)_50%,transparent_80%)] absolute top-0 left-0 h-[500px] w-[350px] -translate-y-40 -rotate-45 rounded-full" />
              <div className="bg-[radial-gradient(50%_50%_at_50%_50%,rgba(255,187,146,0.08)_0,transparent_80%)] absolute top-0 right-0 h-[500px] w-[300px] [translate:10%_-40%] -rotate-45 rounded-full" />
              <div className="bg-[radial-gradient(50%_50%_at_50%_50%,rgba(22,20,18,0.04)_0,transparent_80%)] dark:bg-[radial-gradient(50%_50%_at_50%_50%,rgba(255,255,255,0.04)_0,transparent_80%)] absolute bottom-0 left-1/3 h-[400px] w-[300px] rounded-full" />
            </div>

            {/* Main Links & Brand Bio Grid */}
            <div className="relative z-10 mt-6 flex flex-col gap-8 md:flex-row xl:mt-2">
              {/* Brand Col */}
              <AnimatedContainer className="w-full max-w-sm min-w-2xs space-y-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#161311] text-[#FFB68B] flex items-center justify-center shadow-md">
                    <Sparkles className="size-4" />
                  </div>
                  <div>
                    <span className="font-bold text-base tracking-[0.25em] uppercase block">
                      {BRAND_INFO.name}
                    </span>
                    <span className="text-[10px] uppercase font-mono tracking-widest text-muted-foreground block">
                      {BRAND_INFO.tagline}
                    </span>
                  </div>
                </div>

                <p className="text-muted-foreground mt-4 text-xs sm:text-sm font-light leading-relaxed">
                  Curated beauty, makeup, jewellery and accessories gift boxes for girls &amp; women in Pakistan. Thoughtfully assembled for birthdays, anniversaries, celebrations and life&apos;s lovely little surprises.
                </p>

                {/* Social Channels */}
                <div className="flex items-center gap-2 pt-2">
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
                        className="size-9 rounded-full border-border/80 hover:border-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 cursor-pointer"
                      >
                        <link.icon className="size-4" />
                      </Button>
                    </a>
                  ))}
                </div>

                {/* Quick Trust Badges */}
                <div className="pt-2 text-[11px] font-mono uppercase tracking-wider text-muted-foreground/90 space-y-1">
                  <p>• Free Nationwide Shipping on Orders</p>
                  <p>• Cash on Delivery (COD) Available</p>
                  <p>• Easy WhatsApp Ordering</p>
                </div>
              </AnimatedContainer>

              {/* Navigation Link Groups */}
              <div className="grid grid-cols-2 gap-8 sm:grid-cols-2 md:grid-cols-4 w-full">
                {footerLinkGroups.map((group, index) => (
                  <AnimatedContainer
                    key={group.label}
                    delay={0.1 + index * 0.08}
                    className="w-full"
                  >
                    <div>
                      <h3 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-foreground">
                        {group.label}
                      </h3>
                      <ul className="text-muted-foreground mt-4 space-y-2.5 text-xs sm:text-sm font-light">
                        {group.links.map((link) => (
                          <li key={link.title}>
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
                              {link.icon && <link.icon className="me-1 size-3.5" />}
                              <span className="group-hover:translate-x-0.5 transition-transform">
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
            <div className="relative z-10 text-muted-foreground flex flex-col items-center justify-between gap-3 border-t border-border/60 pt-4 text-xs sm:text-sm md:flex-row">
              <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
                <p>&copy; {new Date().getFullYear()} {BRAND_INFO.name}. All rights reserved.</p>
                <span className="hidden sm:inline text-border">/</span>
                {onNavigate ? (
                  <button
                    onClick={() => onNavigate("privacy")}
                    className="hover:text-foreground hover:underline transition-colors cursor-pointer"
                  >
                    Privacy Policy &amp; Discretion Charter
                  </button>
                ) : (
                  <a href="/privacy" className="hover:text-foreground hover:underline transition-colors">
                    Privacy Policy
                  </a>
                )}
                <span className="hidden sm:inline text-border">/</span>
                <p className="text-[11px] font-mono text-muted-foreground/80">
                  {BRAND_INFO.announcement}
                </p>
              </div>

              <div className="flex items-center gap-4 text-xs">
                {onScrollToTop && (
                  <button
                    onClick={onScrollToTop}
                    className="flex items-center gap-1 text-foreground hover:opacity-75 transition-opacity font-semibold cursor-pointer"
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

interface AnimatedContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
  delay?: number
  className?: string
}

function AnimatedContainer({
  delay = 0.1,
  children,
  className,
  ...props
}: AnimatedContainerProps) {
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) {
    return <div className={className} {...props}>{children}</div>
  }

  return (
    <motion.div
      initial={{ filter: "blur(4px)", translateY: -8, opacity: 0 }}
      whileInView={{ filter: "blur(0px)", translateY: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
export default StickyFooter
