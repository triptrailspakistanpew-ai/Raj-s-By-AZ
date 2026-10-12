import { GiftBoxProduct } from "../data/products"

interface HeadSeoConfig {
  title: string
  description: string
  canonical: string
  ogImage?: string
  ogType?: string
}

const DEFAULT_SEO: HeadSeoConfig = {
  title: "Curated Girls & Women's Gift Boxes in Pakistan | Raj's By AZ",
  description:
    "Shop luxury curated beauty, makeup, jewellery and accessories gift boxes in Pakistan. Explore our 14-Item Mini, 20-Item Signature, and 25-Item Premium gift boxes starting from Rs. 1,499. Cash on Delivery available.",
  canonical: "https://www.rajsbyaz.com/",
  ogImage:
    "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=80",
  ogType: "website"
}

function updateMetaTag(attrName: "name" | "property", attrValue: string, content: string) {
  if (typeof document === "undefined") return
  let element = document.querySelector(`meta[${attrName}="${attrValue}"]`) as HTMLMetaElement | null
  if (!element) {
    element = document.createElement("meta")
    element.setAttribute(attrName, attrValue)
    document.head.appendChild(element)
  }
  element.setAttribute("content", content)
}

function updateCanonical(url: string) {
  if (typeof document === "undefined") return
  let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null
  if (!link) {
    link = document.createElement("link")
    link.setAttribute("rel", "canonical")
    document.head.appendChild(link)
  }
  link.setAttribute("href", url)
}

export function updateHeadSeo(type: "home" | "product" | "cart" | "privacy", product?: GiftBoxProduct | null) {
  if (typeof document === "undefined") return

  if (type === "privacy") {
    const title = "Privacy Policy & Discretion Charter | Raj's By AZ"
    const description =
      "Learn how Raj's By AZ protects your personal data, surprise gifting details, recipient addresses, and payment information with complete discretion."
    const canonical = "https://www.rajsbyaz.com/privacy"

    document.title = title
    updateCanonical(canonical)
    updateMetaTag("name", "description", description)
    updateMetaTag("property", "og:title", title)
    updateMetaTag("property", "og:description", description)
    updateMetaTag("property", "og:url", canonical)
    updateMetaTag("name", "twitter:title", title)
    updateMetaTag("name", "twitter:description", description)
    return
  }

  if (type === "product" && product) {
    const title = `${product.title} (${product.itemCount} Items) | Raj's By AZ`
    const description = `${product.shortDescription} Includes ${product.items.slice(0, 4).join(", ")} and more (${product.itemCount} items). Rs. ${product.priceValue} with Cash on Delivery nationwide in Pakistan.`
    const canonical = `https://www.rajsbyaz.com/products/${product.handle}`
    const ogImage = product.thumbnail

    document.title = title
    updateCanonical(canonical)
    updateMetaTag("name", "description", description)
    updateMetaTag("property", "og:title", title)
    updateMetaTag("property", "og:description", description)
    updateMetaTag("property", "og:url", canonical)
    updateMetaTag("property", "og:image", ogImage)
    updateMetaTag("property", "og:type", "product")
    updateMetaTag("name", "twitter:title", title)
    updateMetaTag("name", "twitter:description", description)
    updateMetaTag("name", "twitter:image", ogImage)
    return
  }

  if (type === "cart") {
    const title = "Shopping Bag & Checkout | Raj's By AZ"
    const description =
      "Review your luxury gift box selection and place your order securely with Cash on Delivery via WhatsApp at Raj's By AZ."
    const canonical = "https://www.rajsbyaz.com/cart"

    document.title = title
    updateCanonical(canonical)
    updateMetaTag("name", "description", description)
    updateMetaTag("property", "og:title", title)
    updateMetaTag("property", "og:description", description)
    updateMetaTag("property", "og:url", canonical)
    updateMetaTag("name", "twitter:title", title)
    updateMetaTag("name", "twitter:description", description)
    return
  }

  // Fallback to homepage SEO
  document.title = DEFAULT_SEO.title
  updateCanonical(DEFAULT_SEO.canonical)
  updateMetaTag("name", "description", DEFAULT_SEO.description)
  updateMetaTag("property", "og:title", DEFAULT_SEO.title)
  updateMetaTag("property", "og:description", DEFAULT_SEO.description)
  updateMetaTag("property", "og:url", DEFAULT_SEO.canonical)
  if (DEFAULT_SEO.ogImage) {
    updateMetaTag("property", "og:image", DEFAULT_SEO.ogImage)
    updateMetaTag("name", "twitter:image", DEFAULT_SEO.ogImage)
  }
  updateMetaTag("property", "og:type", DEFAULT_SEO.ogType || "website")
  updateMetaTag("name", "twitter:title", DEFAULT_SEO.title)
  updateMetaTag("name", "twitter:description", DEFAULT_SEO.description)
}
