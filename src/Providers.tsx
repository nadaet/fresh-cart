"use client"
import React from 'react'
import { SessionProvider } from 'next-auth/react';
import CartContextProvider from './Context/CartContext';

const Providers = ({children}: {children:React.ReactNode}) => {
  return (
    <SessionProvider>
      <CartContextProvider>
      {children}
      </CartContextProvider>
    </SessionProvider>
  )
}

export default Providers
