"use client"

import React, { useEffect, useState, createContext } from "react"
import { Root, Daum } from "@/types/wishlist.type"
import { getUserWishlistAction } from "@/WishListAction/getUserWishlist"
import { AddToWishlistAction } from "@/WishListAction/addToWishlist"
import { removeFromWishlist } from "@/WishListAction/removeFromWishlist"

interface WishlistContextType {
  isLoading: boolean
  products: Daum[]
  addProductToWishlist: (id: string) => Promise<void>
  removeProductFromWishlist: (id: string) => Promise<void>
  refreshWishlist: () => Promise<void>
}

export const wishlistContext = createContext<WishlistContextType>({} as WishlistContextType)

const WishlistContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [products, setProducts] = useState<Daum[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const refreshWishlist = async () => {
    setIsLoading(true)
    try {
      const res: Root = await getUserWishlistAction()
      setProducts(res.data)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const addProductToWishlist = async (id: string) => {
    try {
      await AddToWishlistAction(id)
      await refreshWishlist()
    } catch (error) {
      console.error(error)
    }
  }

  const removeProductFromWishlist = async (id: string) => {
    try {
      await removeFromWishlist(id)
      setProducts((prev) => prev.filter((p) => p._id !== id))
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    refreshWishlist()
  }, [])

  return (
    <wishlistContext.Provider
      value={{
        isLoading,
        products,
        addProductToWishlist,
        removeProductFromWishlist,
        refreshWishlist,
      }}
    >
      {children}
    </wishlistContext.Provider>
  )
}

export default WishlistContextProvider
