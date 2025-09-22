"use client"

import React, { createContext, useState, useEffect, ReactNode } from "react"
import { getUserCartAction } from "@/CartAction/getUserCart"
import { AddToCartAction } from "@/CartAction/addToCart"
import { removeCartItemAction } from "@/CartAction/removeCartItem"
import { updateCartAction } from "@/CartAction/updateCart"
import { clearCartAction } from "@/CartAction/clearCart"
import { Cart, ProductCart } from "@/types/cart.type"
import { toast } from "sonner"

interface CartContextType {
  isLoading: boolean
  products: ProductCart[]
  numOfCartItems: number
  totalCartPrice: number
  cartId: string
  addProductToCart: (id: string) => Promise<void>
  removeCartItem: (id: string) => Promise<void>
  updateCart: (id: string, count: number) => Promise<void>
  clearCart: () => Promise<void>
  refreshCart: () => Promise<void>
  afterPayment: () => void
}

export const cartContext = createContext<CartContextType>({} as CartContextType)

const CartContextProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<ProductCart[]>([])
  const [numOfCartItems, setNumOfCartItems] = useState(0)
  const [totalCartPrice, setTotalCartPrice] = useState(0)
  const [cartId, setCartId] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Refresh cart بأمان
  const refreshCart = async () => {
    setIsLoading(true)
    try {
      const tokenExists = localStorage.getItem("token") // تأكد الـ token موجود
      if (!tokenExists) {
        // لو مش عامل login خلي الكارت فاضي
        setProducts([])
        setNumOfCartItems(0)
        setTotalCartPrice(0)
        setCartId("")
        return
      }

      const data: Cart = await getUserCartAction()
      if (data && data.data) {
        setProducts(data.data.products || [])
        setNumOfCartItems(data.numOfCartItems || 0)
        setTotalCartPrice(data.data.totalCartPrice || 0)
        setCartId(data.cartId || "")
      } else {
        setProducts([])
        setNumOfCartItems(0)
        setTotalCartPrice(0)
        setCartId("")
      }
    } catch (error) {
      console.error("Cart fetch error:", error)
      setProducts([])
      setNumOfCartItems(0)
      setTotalCartPrice(0)
      setCartId("")
      // لو تحب تفعيل toast للخطأ
      // toast.error("Failed to fetch cart")
    } finally {
      setIsLoading(false)
    }
  }

  const addProductToCart = async (id: string) => {
    try {
      await AddToCartAction(id)
      await refreshCart()
      toast.success("Product added to cart", { duration: 1000, position: "top-center" })
    } catch (error) {
      console.error(error)
      toast.error("Failed to add product", { duration: 1000, position: "top-center" })
    }
  }

  const removeCartItem = async (id: string) => {
    try {
      await removeCartItemAction(id)
      setProducts((prev) => prev.filter((p) => p.product._id !== id))
      setNumOfCartItems((prev) => Math.max(prev - 1, 0))
      toast.success("Product removed from cart", { duration: 1000, position: "top-center" })
    } catch (error) {
      console.error(error)
      toast.error("Failed to remove product", { duration: 1000, position: "top-center" })
    }
  }

  const updateCart = async (id: string, count: number) => {
    if (count < 1) {
      toast.error("Count must be at least 1", { duration: 1000 })
      return
    }
    try {
      const data: Cart = await updateCartAction(id, count)
      if (data && data.data) {
        setProducts(data.data.products || [])
        setNumOfCartItems(data.numOfCartItems || 0)
        setTotalCartPrice(data.data.totalCartPrice || 0)
        toast.success("Cart updated", { duration: 1000, position: "top-center" })
      }
    } catch (error) {
      console.error(error)
      toast.error("Failed to update cart", { duration: 1000, position: "top-center" })
    }
  }

  const clearCart = async () => {
    try {
      await clearCartAction()
      setProducts([])
      setNumOfCartItems(0)
      setTotalCartPrice(0)
      setCartId("")
      toast.success("Cart cleared", { duration: 1000, position: "top-center" })
    } catch (error) {
      console.error(error)
      toast.error("Failed to clear cart", { duration: 1000, position: "top-center" })
    }
  }

  const afterPayment = () => {
    setProducts([])
    setNumOfCartItems(0)
    setTotalCartPrice(0)
    setCartId("")
  }

  useEffect(() => {
    refreshCart()
  }, [])

  return (
    <cartContext.Provider
      value={{
        isLoading,
        products,
        numOfCartItems,
        totalCartPrice,
        cartId,
        addProductToCart,
        removeCartItem,
        updateCart,
        clearCart,
        refreshCart,
        afterPayment,
      }}
    >
      {children}
    </cartContext.Provider>
  )
}

export default CartContextProvider
