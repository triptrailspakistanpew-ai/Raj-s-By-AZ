import React from "react"

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  children: React.ReactNode
}

export default function Link({ href, children, className, onClick, ...props }: LinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      onClick(e)
    }
    if (href.startsWith("/products/")) {
      e.preventDefault()
      const handle = href.replace("/products/", "")
      window.dispatchEvent(new CustomEvent("open-product-preview", { detail: { handle } }))
      return
    }
    if (href === "/store" || href === "#gift-collection" || href === "#final-collection") {
      e.preventDefault()
      const el = document.getElementById("gift-collection") || document.getElementById("final-collection")
      if (el) {
        el.scrollIntoView({ behavior: "smooth" })
      }
      return
    }
    if (href.startsWith("#")) {
      e.preventDefault()
      const targetElement = document.querySelector(href)
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" })
      }
    }
  }

  return (
    <a href={href} className={className} onClick={handleClick} {...props}>
      {children}
    </a>
  )
}
