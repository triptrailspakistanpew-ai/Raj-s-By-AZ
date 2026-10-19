import React from "react"
import { cn } from "@/src/lib/utils"
import { motion, useReducedMotion } from "motion/react"
import {
  FacebookIcon,
  InstagramIcon,
  YoutubeIcon,
  MessageCircle,
  ArrowUpRight,
} from "lucide-react"
import { Link } from "react-router-dom"
import { BRAND_INFO } from "@/src/data/products"
import { BrandLogoWithText } from "@/src/components/BrandLogo"

interface FooterLink {
  title: string
  href: string
  icon?: React.ComponentType<{ className?: string }>
  isExternal?: boolean
}

export function StickyFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const collections = [
    { title: "14-Item Mini Beauty Box", href: "/#final-collection" },
    { title: "20-Item Signature Beauty Box", href: "/#final-collection" },
    { title: "25-Item Deluxe Beauty Box", href: "/#final-collection" },
    { title: "Curated Makeup & Jewellery", href: "/#occasions" },
    { title: "Birthday & Special Gifts", href: "/#occasions" },
  ]

  const customerCare: FooterLink[] = [
    { title: "Your Gift Bag & Checkout", href: "/cart" },
    { title: "Cash on Delivery Nationwide", href: "/#faqs" },
    { title: "Privacy Policy & Discretion Charter", href: "/privacy" },
    { title: "Ordering via WhatsApp", href: "/#how-it-works" },
    { title: "Frequently Asked Questions", href: "/#faqs" },
  ]

  const socialLinks = [
    {
      title: "WhatsApp Order Line",
      href: `https://wa.me/${BRAND_INFO.whatsappInternational}?text=Hi%20Raj's%20By%20AZ,%20I%20have%20an%20inquiry%20about%20your%20gift%20boxes.`,
      icon: MessageCircle,
      desc: "Fast Customer Care",
    },
    {
      title: "Instagram",
      href: "https://instagram.com/rajsbyaz",
      icon: InstagramIcon,
      desc: "@rajsbyaz",
    },
    {
      title: "Facebook",
      href: "https://facebook.com/rajsbyaz",
      icon: FacebookIcon,
      desc: "Raj's By AZ",
    },
    {
      title: "YouTube",
      href: "https://youtube.com/@rajsbyaz",
      icon: YoutubeIcon,
      desc: "Unboxing Channel",
    },
  ]

  return (
    <div
      className="relative w-full min-h-[640px] sm:min-h-[580px] lg:h-[560px]"
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      <div className="relative w-full h-[calc(100vh+640px)] sm:h-[calc(100vh+580px)] lg:h-[calc(100vh+560px)] -top-[100vh]">
        <div className="sticky top-[calc(100vh-640px)] sm:top-[calc(100vh-580px)] lg:top-[calc(100vh-560px)] w-full min-h-[640px] sm:min-h-[580px] lg:h-[560px] flex flex-col justify-between">
          <footer className="w-full h-full bg-background border-t border-border/80 flex flex-col justify-between py-12 px-4 sm:px-6 lg:px-8">
            <div className="relative z-10 max-w-7xl mx-auto w-full flex-1 flex flex-col justify-between">
              {/* Top row: Brand summary & Navigation links */}
              <div className="flex flex-col gap-8 md:flex-row md:justify-between items-start pt-1">
                {/* Brand Col */}
                <AnimatedContainer className="w-full md:max-w-xs space-y-4">
                  <Link to="/" className="inline-block hover:opacity-85 transition-opacity">
                    <BrandLogoWithText iconSize={42} />
                  </Link>

                  <p className="text-muted-foreground text-xs sm:text-sm font-light leading-relaxed max-w-sm">
                    Curated beauty, makeup, jewellery and accessories gift boxes for girls &amp; women in Pakistan. Thoughtfully assembled for life&apos;s lovely little surprises.
                  </p>

                  {/* Social Channels */}
                  <div className="flex items-center gap-2 pt-1">
                    {socialLinks.map((link) => (
                      <a
                        key={link.title}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={link.title}
                        className="w-8 h-8 rounded-full border border-border bg-card/60 hover:bg-muted text-foreground flex items-center justify-center transition-colors shadow-sm"
                      >
                        <link.icon className="size-3.5" />
                      </a>
                    ))}
                  </div>
                </AnimatedContainer>

                {/* Links Columns */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12 w-full md:w-auto">
                  {/* Collections */}
                  <AnimatedContainer delay={0.2} className="space-y-3">
                    <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-foreground font-mono">
                      Collections
                    </h3>
                    <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground font-light">
                      {collections.map((item) => (
                        <li key={item.title}>
                          <a
                            href={item.href}
                            className="hover:text-foreground hover:translate-x-1 inline-block transition-all duration-200"
                          >
                            {item.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </AnimatedContainer>

                  {/* Customer Care */}
                  <AnimatedContainer delay={0.3} className="space-y-3">
                    <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-foreground font-mono">
                      Customer Care
                    </h3>
                    <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground font-light">
                      {customerCare.map((item) => (
                        <li key={item.title}>
                          {item.href.startsWith("/") && !item.href.includes("#") ? (
                            <Link
                              to={item.href}
                              className="hover:text-foreground hover:translate-x-1 inline-block transition-all duration-200"
                            >
                              {item.title}
                            </Link>
                          ) : (
                            <a
                              href={item.href}
                              className="hover:text-foreground hover:translate-x-1 inline-block transition-all duration-200"
                            >
                              {item.title}
                            </a>
                          )}
                        </li>
                      ))}
                    </ul>
                  </AnimatedContainer>
                </div>
              </div>

              {/* Quick WhatsApp Ordering Callout Banner */}
              <AnimatedContainer delay={0.35} className="my-8 pt-6 border-t border-border/40">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-card border border-border shadow-sm">
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-primary font-semibold block">
                      Direct WhatsApp Assistance
                    </span>
                    <h4 className="text-sm font-semibold tracking-wide uppercase text-foreground">
                      Need Help Choosing or Customizing a Box?
                    </h4>
                    <p className="text-xs text-muted-foreground font-light">
                      Chat with our team directly. Cash on Delivery nationwide across Pakistan.
                    </p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <a
                      href={`https://wa.me/${BRAND_INFO.whatsappInternational}?text=Hi%20Raj's%20By%20AZ,%20I%20would%20like%20to%20order%20a%20gift%20box.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-xs uppercase tracking-wider font-semibold shadow hover:opacity-90 transition-opacity"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Chat on WhatsApp</span>
                    </a>
                    <Link
                      to="/cart"
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-border text-xs uppercase tracking-wider font-medium hover:bg-muted transition-colors"
                    >
                      <span>View Bag</span>
                    </Link>
                  </div>
                </div>
              </AnimatedContainer>

              {/* Bottom Bar: Copyright & Designer credit */}
              <div className="pt-6 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground font-light">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-center sm:text-left">
                  <p>
                    &copy; {new Date().getFullYear()} {BRAND_INFO.name}. All rights reserved.
                  </p>
                  <span className="text-border">/</span>
                  <Link to="/privacy" className="hover:text-foreground hover:underline transition-colors">
                    Privacy Policy
                  </Link>
                  <span className="hidden lg:inline text-border">/</span>
                  <p className="hidden lg:inline text-[11px] uppercase tracking-wider text-muted-foreground/80 font-light">
                    {BRAND_INFO.announcement}
                  </p>
                </div>

                <div className="flex items-center gap-3 sm:gap-4 text-[11px] sm:text-xs">
                  <button
                    type="button"
                    onClick={scrollToTop}
                    className="flex items-center gap-1 text-foreground hover:opacity-75 transition-opacity font-semibold cursor-pointer uppercase tracking-wider text-[11px]"
                  >
                    <span>Back to Top</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
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
          </footer>
        </div>
      </div>
    </div>
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
