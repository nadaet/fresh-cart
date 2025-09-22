"use client"
import React from 'react'
import { SessionProvider } from 'next-auth/react'
import { CartContextProvider } from './Context/CartContext'
import WishlistContextProvider from './Context/WishlistContext' 

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <WishlistContextProvider>
        <CartContextProvider>
          {children}
        </CartContextProvider>
      </WishlistContextProvider>
    </SessionProvider>
  )
}

export default Providers
