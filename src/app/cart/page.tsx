"use client"
import { cartContext } from '@/Context/CartContext'
import React, { useContext } from 'react'
import Loading from '../loading'
import { ProductCart } from '@/types/cart.type';
import Image from 'next/image'
import { Button } from '@/components/ui/button';
import { removeCartItemAction } from '@/CartAction/removeCartItem';
import { toast } from 'sonner';
import { Card, CardHeader, CardTitle, CardDescription, CardAction, CardContent, CardFooter } from '@/components/ui/card';
import Link from 'next/link';
import Payment from './../payment/page';

const Cart = () => {
  const { isLoading, numOfCartItems, products, totalCartPrice, removeCartItem ,updateCart,clearCart } = useContext(cartContext)

  async function removeItem(id: string) {
    const data = await removeCartItem(id)
    if (data?.status === "success") {
      toast.success("Success to remove from cart", {
        duration: 1000,
        position: "top-center",
      })
    } else {
      toast.error("Failed to remove from cart", {
        duration: 1000,
        position: "top-center",
      })
    }
  }

  if (isLoading) {
    return <Loading />
  }
async function updatecount(id: string) {
    const data = await updateCart(id)
    if (data?.status === "success") {
      toast.success("Success", {
        duration: 1000,
        position: "top-center",
      })
    } else {
      toast.error("Failed", {
        duration: 1000,
        position: "top-center",
      })
    }
  }

  if (isLoading) {
    return <Loading />
  }
  if(products.length == 0)
{
return  <div className=" flex justify-center items-center">
      <Card className='w-3xl mt-6'>
  <CardHeader>
    <CardTitle className='text-3xl text-green-600'>Cart shop</CardTitle>
  </CardHeader>
  <CardContent>
    <p className='text-2xl text'>Cart is empty try to add products</p>
  </CardContent>

</Card>
</div>
}
  return (
    <div className='w-full md:w-[80%] mx-auto my-10 px-5 md:px-0 bg-slate-100'>
      <div className='p-5'>
        <h1 className='text-2xl font-bold'>Cart Shop</h1>
        <p className="text-lg font-medium">
          total price :{" "}
          <span className="text-green-600 font-mono">{totalCartPrice}</span>{" "}
          EGP
        </p>
        <Button className='mb-10 ms-5 bg-green-600 hover:bg-red-500'>
          <Link href={"/payment"}>CheckOut </Link>
        </Button>

        <div className='allProducts'>
          {products.map(function (product: ProductCart, idx: number) {
            return (
              <div key={idx} className='flex items-center justify-between border-b py-3'>
                {/* product details */}
                <div className='flex items-center gap-4 mb-2'>
                  <div>
                    <Image
                      alt="sora"
                      src={product.product.imageCover}
                      height={200}
                      width={200}
                    />
                  </div>
                  <div>
                    <h1 className="font-medium text-2xl">{product.product.title}</h1>
                    <p className="font-medium">{product.price} EGP</p>

                    <Button
                      onClick={() => removeItem(product.product.id)}
                      variant="ghost"
                      className="text-red-600"
                    >
                      <i className="fa-solid fa-trash"></i> Remove
                    </Button>
                  </div>
                </div>

                {/* controls */}
                <div className='flex items-center gap-2'>
                  <Button onClick={()=>updateCart(product.product.id , product.count + 1)}
                    variant="outline"
                    size="sm"
                    className="border-green-600 text-black"
                  >
                    +
                  </Button>
                  <p className="px-2">{product.count}</p>
                  <Button onClick={()=>updateCart(product.product.id , product.count - 1)}
                    variant="outline"
                    size="sm"
                    className="border-green-600 text-black"
                  >
                    -
                  </Button>
                </div>
              </div>
            )
          })}
        </div>

        <div className="flex justify-center mt-5">
          <Button
          onClick={clearCart}
            variant="outline"
            className="border-green-600"
          >
            Clear Your Cart
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Cart
