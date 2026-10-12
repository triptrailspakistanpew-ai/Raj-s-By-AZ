import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import { GIFT_BOX_PRODUCTS, BRAND_INFO } from "../src/data/products.ts"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, "..")
const distDir = path.resolve(rootDir, "dist")
const distIndexPath = path.resolve(distDir, "index.html")

if (!fs.existsSync(distIndexPath)) {
  console.error("Error: dist/index.html does not exist. Run 'vite build' first.")
  process.exit(1)
}

const baseHtml = fs.readFileSync(distIndexPath, "utf-8")

// 1. Generate static product pages
for (const product of GIFT_BOX_PRODUCTS) {
  const productDir = path.resolve(distDir, "products", product.handle)
  fs.mkdirSync(productDir, { recursive: true })

  const pageTitle = `${product.title} (${product.itemCount} Items) | Raj's By AZ`
  const pageDescription = `${product.shortDescription} Includes ${product.items.slice(0, 4).join(", ")} and more (${product.itemCount} items total). Rs. ${product.priceValue} with Cash on Delivery nationwide in Pakistan.`
  const canonicalUrl = `https://www.rajsbyaz.com/products/${product.handle}`
  const ogImageUrl = product.thumbnail
  const ogImageAlt = `${product.title} (${product.itemCount} Items) - Raj's By AZ Gift Box`

  const productSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        "@id": `${canonicalUrl}#product`,
        "name": `${product.title} (${product.itemCount} Items)`,
        "alternateName": `${product.itemCount}-Item Gift Box`,
        "description": product.fullDescription,
        "image": product.thumbnail,
        "sku": `RBAZ-BOX-${product.itemCount}`,
        "mpn": `RBAZ-${product.handle.toUpperCase()}`,
        "brand": {
          "@type": "Brand",
          "name": "Raj's By AZ"
        },
        "category": "Gift Baskets & Boxes > Beauty & Personal Care",
        "offers": {
          "@type": "Offer",
          "url": canonicalUrl,
          "priceCurrency": "PKR",
          "price": `${product.priceValue}`,
          "priceValidUntil": "2027-12-31",
          "availability": "https://schema.org/InStock",
          "itemCondition": "https://schema.org/NewCondition",
          "seller": {
            "@type": "OnlineStore",
            "name": "Raj's By AZ",
            "url": "https://www.rajsbyaz.com/"
          }
        }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.rajsbyaz.com/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Gift Box Collections",
            "item": "https://www.rajsbyaz.com/#final-collection"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": product.title,
            "item": canonicalUrl
          }
        ]
      }
    ]
  }

  // Pre-rendered semantic crawler fallback inside #root
  const fallbackHtml = `
    <div class="seo-crawler-content" style="background:#0a0a0a;color:#f5f5f5;min-height:100vh;padding:2rem 1.5rem;font-family:system-ui,-apple-system,sans-serif;max-width:800px;margin:0 auto;">
      <nav style="font-size:0.875rem;color:#a3a3a3;margin-bottom:1.5rem;">
        <a href="https://www.rajsbyaz.com/" style="color:#d4d4d4;text-decoration:none;">Home</a> &rsaquo;
        <a href="https://www.rajsbyaz.com/#final-collection" style="color:#d4d4d4;text-decoration:none;">Gift Boxes</a> &rsaquo;
        <span style="color:#ffffff;">${product.title}</span>
      </nav>
      <h1 style="font-size:2rem;font-weight:700;margin-bottom:0.5rem;color:#ffffff;">${product.title} (${product.itemCount} Items)</h1>
      <p style="font-size:1.25rem;color:#34d399;font-weight:600;margin-bottom:1rem;">${product.price} · Cash on Delivery Available Across Pakistan</p>
      <p style="font-size:1rem;color:#d4d4d4;line-height:1.6;margin-bottom:1.5rem;">${product.fullDescription}</p>
      <div style="margin-bottom:2rem;">
        <img src="${product.thumbnail}" alt="${product.title} (${product.itemCount} Items) - Raj's By AZ Gift Box" style="width:100%;max-width:550px;border-radius:12px;display:block;" />
      </div>
      <h2 style="font-size:1.35rem;font-weight:600;margin-bottom:1rem;color:#ffffff;">Items Included in this ${product.itemCount}-Item Collection:</h2>
      <ul style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:0.5rem;margin-bottom:2rem;padding-left:1.25rem;">
        ${product.items.map((it) => `<li style="color:#e5e5e5;font-size:0.95rem;">${it}</li>`).join("\n        ")}
      </ul>
      <div style="padding:1rem;background:#171717;border-radius:8px;border:1px solid #262626;margin-bottom:2rem;">
        <h3 style="font-size:1.1rem;font-weight:600;margin-bottom:0.5rem;color:#ffffff;">Nationwide Delivery & Ordering</h3>
        <p style="font-size:0.9rem;color:#a3a3a3;margin:0;">Dispatched swiftly across Pakistan via tracked courier. Cash on Delivery (COD) and advance payment accepted. Official WhatsApp: +92 ${BRAND_INFO.whatsappNumber.slice(1)} (${BRAND_INFO.whatsappNumber}).</p>
      </div>
      <p><a href="https://www.rajsbyaz.com/" style="display:inline-block;padding:0.75rem 1.5rem;background:#ffffff;color:#0a0a0a;text-decoration:none;border-radius:8px;font-weight:600;">Explore Full Interactive Experience</a></p>
    </div>
  `

  let html = baseHtml

  // Replace Title
  html = html.replace(/<title>.*?<\/title>/is, `<title>${pageTitle}</title>`)

  // Replace Canonical (Self-referencing canonical for each product)
  html = html.replace(/<link rel="canonical" href=".*?" \/>/is, `<link rel="canonical" href="${canonicalUrl}" />`)

  // Replace Meta Description
  html = html.replace(/<meta name="description" content=".*?" \/>/is, `<meta name="description" content="${pageDescription}" />`)

  // Replace OG tags
  html = html.replace(/<meta property="og:title" content=".*?" \/>/is, `<meta property="og:title" content="${pageTitle}" />`)
  html = html.replace(/<meta property="og:description" content=".*?" \/>/is, `<meta property="og:description" content="${pageDescription}" />`)
  html = html.replace(/<meta property="og:url" content=".*?" \/>/is, `<meta property="og:url" content="${canonicalUrl}" />`)
  html = html.replace(/<meta property="og:image" content=".*?" \/>/is, `<meta property="og:image" content="${ogImageUrl}" />`)
  html = html.replace(/<meta property="og:image:alt" content=".*?" \/>/is, `<meta property="og:image:alt" content="${ogImageAlt}" />`)
  html = html.replace(/<meta property="og:type" content=".*?" \/>/is, `<meta property="og:type" content="product" />`)

  // Replace Twitter tags
  html = html.replace(/<meta name="twitter:title" content=".*?" \/>/is, `<meta name="twitter:title" content="${pageTitle}" />`)
  html = html.replace(/<meta name="twitter:description" content=".*?" \/>/is, `<meta name="twitter:description" content="${pageDescription}" />`)
  html = html.replace(/<meta name="twitter:image" content=".*?" \/>/is, `<meta name="twitter:image" content="${ogImageUrl}" />`)

  // Strip all existing generic JSON-LD scripts from base HTML and inject dedicated product schema
  html = html.replace(/<!-- Structured Data:.*?<\/script>/gis, "")
  const schemaInjection = `\n    <!-- Dedicated Product & Breadcrumb Schema -->\n    <script type="application/ld+json">\n    ${JSON.stringify(productSchema, null, 2)}\n    </script>\n  </head>`
  html = html.replace("</head>", schemaInjection)

  // Inject fallback HTML inside #root
  html = html.replace('<div id="root"></div>', `<div id="root">${fallbackHtml}</div>`)

  const outFilePath = path.resolve(productDir, "index.html")
  fs.writeFileSync(outFilePath, html, "utf-8")
  console.log(`Generated prerendered page: /products/${product.handle}/index.html`)
}

// 2. Generate static /cart page
const cartDir = path.resolve(distDir, "cart")
fs.mkdirSync(cartDir, { recursive: true })
let cartHtml = baseHtml
cartHtml = cartHtml.replace(/<title>.*?<\/title>/is, "<title>Shopping Bag & Checkout | Raj's By AZ</title>")
cartHtml = cartHtml.replace(/<link rel="canonical" href=".*?" \/>/is, '<link rel="canonical" href="https://www.rajsbyaz.com/cart" />')
cartHtml = cartHtml.replace(/<meta property="og:url" content=".*?" \/>/is, '<meta property="og:url" content="https://www.rajsbyaz.com/cart" />')
cartHtml = cartHtml.replace(/<meta name="robots" content=".*?" \/>/is, '<meta name="robots" content="noindex, follow" />')
fs.writeFileSync(path.resolve(cartDir, "index.html"), cartHtml, "utf-8")
console.log("Generated prerendered page: /cart/index.html")

// 3. Generate static /privacy page
const privacyDir = path.resolve(distDir, "privacy")
fs.mkdirSync(privacyDir, { recursive: true })
let privacyHtml = baseHtml
privacyHtml = privacyHtml.replace(/<title>.*?<\/title>/is, "<title>Privacy Policy & Discretion Charter | Raj's By AZ</title>")
privacyHtml = privacyHtml.replace(/<link rel="canonical" href=".*?" \/>/is, '<link rel="canonical" href="https://www.rajsbyaz.com/privacy" />')
privacyHtml = privacyHtml.replace(/<meta property="og:url" content=".*?" \/>/is, '<meta property="og:url" content="https://www.rajsbyaz.com/privacy" />')
privacyHtml = privacyHtml.replace(/<meta name="description" content=".*?" \/>/is, '<meta name="description" content="Learn how Raj\'s By AZ protects your personal data, surprise gifting details, recipient addresses, and payment information with complete discretion." />')
fs.writeFileSync(path.resolve(privacyDir, "index.html"), privacyHtml, "utf-8")
console.log("Generated prerendered page: /privacy/index.html")

console.log("Successfully generated all static SEO pages!")
