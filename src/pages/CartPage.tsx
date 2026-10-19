import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import CartCheckoutPage from "@/src/components/CartCheckoutPage"
import { useCart } from "@/src/context/CartContext"
import { GIFT_BOX_PRODUCTS } from "@/src/data/products"
import { updateHeadSeo } from "@/src/utils/seo"

export function CartPage() {
  const navigate = useNavigate()
  const { cart, updateQuantity, removeFromCart, addToCart, clearCart } = useCart()

  useEffect(() => {
    updateHeadSeo("cart")
  }, [])

  const handleAddSampleItem = () => {
    // Add Signature Box (20 Items)
    const signatureBox = GIFT_BOX_PRODUCTS[1] || GIFT_BOX_PRODUCTS[0]
    addToCart(signatureBox)
  }

  return (
    <CartCheckoutPage
      cart={cart}
      onUpdateQuantity={updateQuantity}
      onRemoveItem={removeFromCart}
      onAddSampleItem={handleAddSampleItem}
      onBackToStore={() => navigate("/")}
      onClearCart={clearCart}
      onOpenPrivacy={() => navigate("/privacy")}
    />
  )
}

export default CartPage
