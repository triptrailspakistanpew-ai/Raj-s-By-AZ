import React, { useEffect } from "react"
import { Component as Showcase } from "@/src/components/ui/cinematic-product-scroll-section"
import { updateHeadSeo } from "@/src/utils/seo"

export function HomePage() {
  useEffect(() => {
    updateHeadSeo("home")
  }, [])

  return <Showcase />
}

export default HomePage
