"use client"
import React, { useEffect, useState, createContext } from "react"
import { getUserCartAction } from "@/CartAction/getUserCart"
import { Cart, ProductCart } from "@/types/cart.type"   // 👈 اتأكد ان ProductCart متعرف هنا
import { AddToCartAction } from "@/CartAction/addToCart"
import { removeCartItemAction } from "@/CartAction/removeCartItem"
import { updateCartAction } from "@/CartAction/updateCart"
import { clearCartAction } from "@/CartAction/clearCart"

// 👇 ممكن تعرفي نوع الـ context بدل ما تعمليه any
type CartContextType = {
  isLoading: boolean
  numOfCartItems: number
  products: ProductCart[]
  totalCartPrice: number
  cartId: string
  addProductToCart: (id: string) => Promise<any>
  removeCartItem: (id: string) => Promise<Cart | undefined>
  updateCart: (id: string, count: number) => Promise<void>
  clearCart: () => Promise<void>
  afterPayment: () => void
}

export const cartContext = createContext<CartContextType>({} as CartContextType)

const CartContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [numOfCartItems, setNumOfCartItems] = useState<number>(0)
  const [totalCartPrice, setTotalCartPrice] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [products, setProducts] = useState<ProductCart[]>([])   // 👈 هنا الأساس
  const [cartId, setCartId] = useState<string>("")

  // اضافة منتج للكارت
  async function addProductToCart(id: string) {
    try {
      const data = await AddToCartAction(id)
      getUserCart()
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
    setIsLoading(false)
    return data   // 👈 كده هترجع الداتا
  } catch (error) {
    console.log(error)
    setIsLoading(false)
  }
}


  async function clearCart() {
    try {
      await clearCartAction()
      setNumOfCartItems(0)
      setProducts([])
      setTotalCartPrice(0)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  async function getUserCart() {
    setIsLoading(true)
    try {
      const data: Cart = await getUserCartAction()
      setNumOfCartItems(data.numOfCartItems)
      setProducts(data.data.products)
      setTotalCartPrice(data.data.totalCartPrice)
      setCartId(data.cartId)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
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
