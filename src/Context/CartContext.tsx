"use client"

import React, { createContext, useState, useEffect, ReactNode } from "react"
import { getUserCartAction } from "@/CartAction/getUserCart"
import { AddToCartAction } from "@/CartAction/addToCart"
import { removeCartItemAction } from "@/CartAction/removeCartItem"
import { updateCartAction } from "@/CartAction/updateCart"
import { clearCartAction } from "@/CartAction/clearCart"
import { Cart, ProductCart } from "@/types/cart.type"

type CartContextType = {
  isLoading: boolean
  numOfCartItems: number
  products: ProductCart[]
  totalCartPrice: number
  cartId: string
  addProductToCart: (id: string) => Promise<Cart | undefined>
  removeCartItem: (id: string) => Promise<Cart | undefined>
  updateCart: (id: string, count: number) => Promise<Cart | undefined>
  clearCart: () => Promise<void>
  afterPayment: () => void
}

export const cartContext = createContext<CartContextType>({} as CartContextType)

const CartContextProvider = ({ children }: { children: ReactNode }) => {
  const [numOfCartItems, setNumOfCartItems] = useState(0)
  const [totalCartPrice, setTotalCartPrice] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [products, setProducts] = useState<ProductCart[]>([])
  const [cartId, setCartId] = useState("")

  // 🔹 Get User Cart
  async function getUserCart() {
    setIsLoading(true)
    try {
      const data: Cart = await getUserCartAction()
      if (data) {
        setNumOfCartItems(data.numOfCartItems)
        setProducts(data.data.products)
        setTotalCartPrice(data.data.totalCartPrice)
        setCartId(data.cartId)
      }
      return data
    } catch (error) {
      console.error("❌ Error fetching cart:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // 🔹 Add Product - تحديث مباشر للـ state
  async function addProductToCart(id: string) {
    try {
      const data: Cart = await AddToCartAction(id)
      if (data) {
        setNumOfCartItems(data.numOfCartItems)
        setProducts(data.data.products)
        setTotalCartPrice(data.data.totalCartPrice)
        setCartId(data.cartId)
      }
      return data
    } catch (error) {
      console.error("❌ Error adding to cart:", error)
    }
  }

  // 🔹 Remove Product
  async function removeCartItem(id: string) {
    try {
      const data: Cart = await removeCartItemAction(id)
      if (data) {
        setNumOfCartItems(data.numOfCartItems)
        setProducts(data.data.products)
        setTotalCartPrice(data.data.totalCartPrice)
      }
      return data
    } catch (error) {
      console.error("❌ Error removing cart item:", error)
    }
  }

  // 🔹 Update Quantity
  async function updateCart(id: string, count: number) {
    setIsLoading(true)
    try {
      const data: Cart = await updateCartAction(id, count)
      if (data) {
        setNumOfCartItems(data.numOfCartItems)
        setProducts(data.data.products)
        setTotalCartPrice(data.data.totalCartPrice)
      }
      return data
    } catch (error) {
      console.error("❌ Error updating cart:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // 🔹 Clear Cart
  async function clearCart() {
    try {
      await clearCartAction()
      setNumOfCartItems(0)
      setProducts([])
      setTotalCartPrice(0)
      setCartId("")
    } catch (error) {
      console.error("❌ Error clearing cart:", error)
    }
  }

  // 🔹 After Payment
  function afterPayment() {
    setCartId("")
    setNumOfCartItems(0)
    setTotalCartPrice(0)
    setProducts([])
  }

  useEffect(() => {
    getUserCart()
  }, [])

  return (
    <cartContext.Provider
      value={{
        isLoading,
        numOfCartItems,
        products,
        totalCartPrice,
        addProductToCart,
        removeCartItem,
        updateCart,
        clearCart,
        cartId,
        afterPayment,
      }}
    >
      {children}
    </cartContext.Provider>
  )
}

export default CartContextProvider
