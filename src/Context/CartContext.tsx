"use client"

import React, { createContext, useState, useEffect, ReactNode } from "react"
import { Cart, ProductCart } from "@/types/cart.type"
import { getUserCartAction } from "@/CartAction/getUserCart"
import { AddToCartAction } from "@/CartAction/addToCart"
import { removeCartItemAction } from "@/CartAction/removeCartItem"
import { updateCartAction } from "@/CartAction/updateCart"
import { clearCartAction } from "@/CartAction/clearCart"
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

  const refreshCart = async () => {
    setIsLoading(true)
    try {
      const data: Cart = await getUserCartAction()
      setProducts(data.data.products)
      setNumOfCartItems(data.numOfCartItems)
      setTotalCartPrice(data.data.totalCartPrice)
      setCartId(data.cartId)
    } catch (error) {
      console.error(error)
      toast.error("Failed to fetch cart")
    } finally {
      setIsLoading(false)
    }
  }

  const addProductToCart = async (id: string) => {
    try {
      await AddToCartAction(id)
      await refreshCart()
      toast.success("Product added to cart")
    } catch (error) {
      console.error(error)
      toast.error("Failed to add product")
    }
  }

  const removeCartItem = async (id: string) => {
    try {
      const data: Cart = await removeCartItemAction(id)
      setProducts(data.data.products)
      setNumOfCartItems(data.numOfCartItems)
      setTotalCartPrice(data.data.totalCartPrice)
      toast.success("Product removed from cart")
    } catch (error) {
      console.error(error)
      toast.error("Failed to remove product")
    }
  }

  const updateCart = async (id: string, count: number) => {
    try {
      const data: Cart = await updateCartAction(id, count)
      setProducts(data.data.products)
      setNumOfCartItems(data.numOfCartItems)
      setTotalCartPrice(data.data.totalCartPrice)
      toast.success("Cart updated")
    } catch (error) {
      console.error(error)
      toast.error("Failed to update cart")
    }
  }

  const clearCart = async () => {
    try {
      await clearCartAction()
      setProducts([])
      setNumOfCartItems(0)
      setTotalCartPrice(0)
      setCartId("")
      toast.success("Cart cleared")
    } catch (error) {
      console.error(error)
      toast.error("Failed to clear cart")
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
