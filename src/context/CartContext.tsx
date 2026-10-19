import React, { createContext, useContext, useEffect, useState } from "react"
import { GIFT_BOX_PRODUCTS, GiftBoxProduct } from "@/src/data/products"

export interface CartItem {
  id: string
  productId: string
  title: string
  handle: string
  thumbnail: string
  price: string
  priceValue: number
  collection: string
  itemCount: number
  itemsIncluded: string[]
  quantity: number
}

interface CartContextType {
  cart: CartItem[]
  addToCart: (product: GiftBoxProduct) => void
  removeFromCart: (cartItemId: string) => void
  updateQuantity: (cartItemId: string, delta: number) => void
  clearCart: () => void
  totalItems: number
  subtotal: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const CART_STORAGE_KEY = "rajs_by_az_cart_v2"

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem(CART_STORAGE_KEY)
        if (saved) {
          const parsed = JSON.parse(saved)
          if (Array.isArray(parsed) && parsed.length > 0) {
            return parsed
          }
        }
      } catch (e) {
        console.warn("Could not read cart from localStorage", e)
      }
    }
    // Default initial cart: Signature Beauty Box
    const defaultProduct = GIFT_BOX_PRODUCTS[1] || GIFT_BOX_PRODUCTS[0]
    return [
      {
        id: "cart-item-default",
        productId: defaultProduct.id,
        title: defaultProduct.title,
        handle: defaultProduct.handle,
        thumbnail: defaultProduct.thumbnail,
        price: defaultProduct.price,
        priceValue: defaultProduct.priceValue,
        collection: defaultProduct.collection.title,
        itemCount: defaultProduct.itemCount,
        itemsIncluded: defaultProduct.items,
        quantity: 1,
      },
    ]
  })

  // Sync to localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart))
      } catch (e) {
        console.warn("Could not save cart to localStorage", e)
      }
    }
  }, [cart])

  const addToCart = (product: GiftBoxProduct) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.productId === product.id)
      if (existing) {
        return prev.map((item) =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      const newItem: CartItem = {
        id: `cart-item-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        productId: product.id,
        title: product.title,
        handle: product.handle,
        thumbnail: product.thumbnail,
        price: product.price,
        priceValue: product.priceValue,
        collection: product.collection.title,
        itemCount: product.itemCount,
        itemsIncluded: product.items,
        quantity: 1,
      }
      return [...prev, newItem]
    })
  }

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId))
  }

  const updateQuantity = (cartItemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === cartItemId) {
            const nextQty = item.quantity + delta
            return nextQty > 0 ? { ...item, quantity: nextQty } : null
          }
          return item
        })
        .filter((item): item is CartItem => item !== null)
    )
  }

  const clearCart = () => {
    setCart([])
  }

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = cart.reduce((sum, item) => sum + item.priceValue * item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
