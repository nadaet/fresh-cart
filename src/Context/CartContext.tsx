"use client"
import React, { useEffect, useState, createContext } from "react"
import { getUserCartAction } from "@/CartAction/getUserCart"
import { Cart, ProductCart } from "@/types/cart.type"
import { AddToCartAction } from "@/CartAction/addToCart"
import { removeCartItemAction } from "@/CartAction/removeCartItem"
import { updateCartAction } from "@/CartAction/updateCart"
import { clearCartAction } from "@/CartAction/clearCart"

type CartContextType = {
  isLoading: boolean
  numOfCartItems: number
  products: ProductCart[]
  totalCartPrice: number
  cartId: string
  addProductToCart: (id: string) => Promise<any>
  removeCartItem: (id: string) => Promise<Cart | undefined>
  updateCart: (id: string, count: number) => Promise<Cart | undefined>
  clearCart: () => Promise<void>
  afterPayment: () => void
}

export const cartContext = createContext<CartContextType>({} as CartContextType)

const CartContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [numOfCartItems, setNumOfCartItems] = useState(0)
  const [totalCartPrice, setTotalCartPrice] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [products, setProducts] = useState<ProductCart[]>([])
  const [cartId, setCartId] = useState("")

  async function addProductToCart(id: string) {
    try {
      const data = await AddToCartAction(id)
      await getUserCart()   // نحدث الكارت بالكامل
      return data
    } catch (error) {
      console.log(error)
    }
  }

  async function removeCartItem(id: string) {
    try {
      const data: Cart = await removeCartItemAction(id)
      setNumOfCartItems(data.numOfCartItems)
      setProducts(data.data.products)
      setTotalCartPrice(data.data.totalCartPrice)
      return data
    } catch (error) {
      console.log(error)
    }
  }

  async function updateCart(id: string, count: number): Promise<Cart | undefined> {
    setIsLoading(true)
    try {
      const data: Cart = await updateCartAction(id, count)
      setNumOfCartItems(data.numOfCartItems)
      setProducts(data.data.products)
      setTotalCartPrice(data.data.totalCartPrice)
      return data
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  async function clearCart() {
    try {
      const data = await clearCartAction()
      // لو السيرفر بيرجع success فقط:
      setNumOfCartItems(0)
      setProducts([])
      setTotalCartPrice(0)
      setCartId("")
    } catch (error) {
      console.log(error)
    }
  }

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
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getUserCart()
  }, [])

  function afterPayment() {
    setCartId("")
    setNumOfCartItems(0)
    setTotalCartPrice(0)
    setProducts([])
  }

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
