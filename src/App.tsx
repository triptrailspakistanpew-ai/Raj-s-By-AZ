import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { CartProvider } from "@/src/context/CartContext"
import { RootLayout } from "@/src/components/layout/RootLayout"
import { HomePage } from "@/src/pages/HomePage"
import { ProductDetailPage } from "@/src/pages/ProductDetailPage"
import { CartPage } from "@/src/pages/CartPage"
import { PrivacyPage } from "@/src/pages/PrivacyPage"
import { NotFoundPage } from "@/src/pages/NotFoundPage"

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<HomePage />} />
            <Route path="products/:handle" element={<ProductDetailPage />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="checkout" element={<CartPage />} />
            <Route path="privacy" element={<PrivacyPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </CartProvider>
    </BrowserRouter>
  )
}
