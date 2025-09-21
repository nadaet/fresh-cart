"use client"

import React, { createContext, useState, useEffect } from "react"
import { AddToWishlistAction } from "@/WishListAction/addToWishlist"
import { removeFromWishlist } from "@/WishListAction/removeFromWishlist"

export const WishlistContext = createContext<any>(null)

const WishlistContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [wishlist, setWishlist] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)

  async function addToWishlist(product: any) {
    try {
      const data = await AddToWishlistAction(product.id || product._id)
      setWishlist(data.data) 
      return data
    } catch (error) {
      console.error("Error adding to wishlist:", error)
    }
  }

  async function removeFromWishlistAction(id: string) {
    try {
      const data = await removeFromWishlist(id)
      setWishlist((prev) => prev.filter((item: any) => item.id !== id && item._id !== id))
      return data
    } catch (error) {
      console.error("Error removing from wishlist:", error)
    }
  }

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        isLoading,
        addToWishlist,
        removeFromWishlist: removeFromWishlistAction,
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

export default WishlistContextProvider
