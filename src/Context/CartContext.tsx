"use client"
import React, { useEffect, useState, createContext } from "react"
import { getUserCartAction } from "@/CartAction/getUserCart"
import { Cart } from "@/types/cart.type"
import { AddToCartAction } from "@/CartAction/addToCart"
import { removeCartItemAction } from "@/CartAction/removeCartItem"
import { log } from "console"
import { updateCartAction } from "@/CartAction/updateCart"
import { clearCartAction } from "@/CartAction/clearCart"


export const cartContext = createContext({} as any)

const CartContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [numOfCartItems, setNumOfCartItems] = useState(0)
  const [totalCartPrice, setTotalCartPrice] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [products, setProducts] = useState([])
    const [cartId, setCartId] = useState("")


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
  async function updateCart(id:string , count: number) {
    setIsLoading(true)
    try {
      const data = await updateCartAction(id , count)
            setNumOfCartItems(data.numOfCartItems)
      setProducts(data.data.products)
      setTotalCartPrice(data.data.totalCartPrice)
    setIsLoading(false)

    } catch (error) {
      console.log(error);
      
    }
    
  }
 async function clearCart(){
     try {
      const data = await clearCartAction()
            setNumOfCartItems(0)
      setProducts([])
      setTotalCartPrice(0)
    setIsLoading(false)

    } catch (error) {
      console.log(error);
      
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
  function afterPayment(){
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
        afterPayment
      }}
    >
      {children}
    </cartContext.Provider>
  )
}

export default CartContextProvider
