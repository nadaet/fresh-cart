"use client"
import React, { useContext, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { useSession, signOut } from 'next-auth/react'
import { cartContext } from '@/Context/CartContext'

const Navbar = () => {
  const { data: session, status } = useSession()
  const path = usePathname()
  const { numOfCartItems } = useContext(cartContext)
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="py-5 bg-slate-100">
      <div className="w-full md:w-[80%] mx-auto flex justify-between items-center">
        
        {/* logo */}
        <Link href='/'>
          <Image
            src="/screens/freshcart-logo.svg"
            alt="logo"
            width={150}
            height={50}
          />
        </Link>

        {/* ===== Desktop Links ===== */}
        {status === "authenticated" && (
          <ul className="hidden md:flex gap-6 text-gray-700 items-center">
            <li>
              <Link className={path === "/cart" ? "text-black" : ""} href="/cart">Cart </Link>
            </li>
            <li>
              <Link className={path === "/wishlist" ? "text-black" : ""} href="/wishlist">Wishlist</Link>
            </li>
            <li>
              <Link className={path === "/products" ? "text-black" : ""} href="/products">Products</Link>
            </li>
            <li>
              <Link className={path === "/categories" ? "text-black" : ""} href="/categories">Categories</Link>
            </li>
            <li>
              <Link className={path === "/brands" ? "text-black" : ""} href="/brands">Brands</Link>
            </li>
            <li>
              <Link className={path === "/allorders" ? "text-black" : ""} href="/allorders">All Orders</Link>
            </li>
          </ul>
        )}

        {/* يمين الناف - Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {status === "authenticated" && (
            <>
              <Link href="/cart" className="relative cursor-pointer">
                <i className="fa-solid fa-cart-shopping text-2xl text-black"></i>
                <span className="absolute -top-2 -right-3 bg-green-600 text-white rounded-full px-2 text-xs">
                  {numOfCartItems}
                </span>
              </Link>
              <button
                onClick={() => signOut({ redirect: true, callbackUrl: "/login" })}
                className="text-gray-600 transition"
              >
                Log out
              </button>
            </>
          )}

          {status === "unauthenticated" && (
            <div className="flex gap-3">
              <Link href="/register"><button>Register</button></Link>
              <Link href="/login"><button>Login</button></Link>
            </div>
          )}

          {status === "loading" && <h1>Loading</h1>}
        </div>

        {/*  Mobile Menu Button  */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            <i className="fa-solid fa-bars text-2xl"></i>
          </button>
        </div>
      </div>

      {/*  Mobile Menu (Dropdown) */}
      {isOpen && (
        <div className="md:hidden px-5 py-4 space-y-4">
          {status === "authenticated" && (
            <>
              <Link href="/cart" className="block">Cart</Link>
              <Link href="/wishlist" className="block">Wishlist</Link>
              <Link href="/products" className="block">Products</Link>
              <Link href="/categories" className="block">Categories</Link>
              <Link href="/brands" className="block">Brands</Link>
                            <Link href="/allorders" className="block">All Orders</Link>


              {/* Cart + Logout عمودي في النص */}
              <div className="flex flex-col items-center gap-4 mt-6 w-full">
                <Link href="/cart" className="relative cursor-pointer">
                  <i className="fa-solid fa-cart-shopping text-2xl text-black"></i>
                  <span className="absolute -top-2 -right-3 bg-green-600 text-white rounded-full px-2 text-xs">
                    {numOfCartItems}
                  </span>
                </Link>
                <button
                  onClick={() => signOut({ redirect: true, callbackUrl: "/login" })}
                  className="text-gray-600 transition"
                >
                  Log out
                </button>
              </div>
            </>
          )}

          {status === "unauthenticated" && (
            <div className="flex gap-3">
              <Link href="/register"><button>Register</button></Link>
              <Link href="/login"><button>Login</button></Link>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Navbar
