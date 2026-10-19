import React, { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Component as Showcase } from "@/src/components/ui/cinematic-product-scroll-section"
import ProductQuickViewModal from "@/src/components/ProductQuickViewModal"
import { GIFT_BOX_PRODUCTS } from "@/src/data/products"
import { updateHeadSeo } from "@/src/utils/seo"
import { useCart } from "@/src/context/CartContext"

export function ProductDetailPage() {
  const { handle } = useParams<{ handle: string }>()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const [addedToBag, setAddedToBag] = useState(false)

  const product = GIFT_BOX_PRODUCTS.find((p) => p.handle === handle) || null

  useEffect(() => {
    if (product) {
      updateHeadSeo("product", product)
    } else {
      updateHeadSeo("home")
    }
  }, [product])

  const handleClose = () => {
    navigate("/")
  }

  const handleAddToCart = () => {
    if (product) {
      addToCart(product)
      setAddedToBag(true)
      setTimeout(() => setAddedToBag(false), 2000)
    }
  }

  const handleCheckout = () => {
    if (product) {
      addToCart(product)
    }
    navigate("/cart")
  }

  return (
    <>
      <Showcase />
      <ProductQuickViewModal
        product={product}
        onClose={handleClose}
        onAddToCart={handleAddToCart}
        onCheckout={handleCheckout}
        addedToBag={addedToBag}
      />
    </>
  )
}

export default ProductDetailPage
