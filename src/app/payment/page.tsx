"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cartContext } from '@/Context/CartContext'
import React, { useContext, useRef } from 'react'
import { cashPaymentAction } from '@/PaymentAction/cashPayment'

import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { onlinePaymentAction } from '@/PaymentAction/onlinepayment'

const Payment = () => {
  const router = useRouter()
  const { cartId,afterPayment } = useContext(cartContext)
  const details = useRef<HTMLInputElement>(null)
  const phone = useRef<HTMLInputElement>(null)
  const city = useRef<HTMLInputElement>(null)

  async function cashPayment() {
    const values = {
      shippingAddress: {
        details: details.current?.value,
        phone: phone.current?.value,
        city: city.current?.value
      }
    }

    try {
      const data = await cashPaymentAction(cartId, values)
      console.log(data)

     toast.success(data.status, {
      position:"top-center",
      duration:1000
     })
      
     afterPayment()
     router.push("/allOrders")
     
     
    } catch (error) {
      console.log(error)
    }

  }
   async function onlinePayment() {
    const values = {
      shippingAddress: {
        details: details.current?.value,
        phone: phone.current?.value,
        city: city.current?.value
      }
    }

    try {
      const data = await onlinePaymentAction(cartId, values)
      console.log(data)
      if(data.status=== "success"){
        window.location.href = data.session.url
      }

    //  toast.success(data.status, {
    //   position:"top-center",
    //   duration:1000
    //  })
      
    //  afterPayment()
    //  router.push("/allOrders")
     
     
    } catch (error) {
      console.log(error)
    }

  }

  return (
    <div className="w-full md:w-1/2 my-10 mx-auto px-5 md:px-0">
      <div>
        <label htmlFor="details">Details</label>
        <Input ref={details} type="text" id="details" className="mb-4" />

        <label htmlFor="phone">Phone</label>
        <Input ref={phone} type="tel" id="phone" className="mb-4" />

        <label htmlFor="city">City</label>
        <Input ref={city} type="text" id="city" className="mb-4" />

        <Button onClick={cashPayment} className="hover:bg-green-500">
          Cash Payment
        </Button>
        <Button onClick={onlinePayment}className="ms-5 hover:bg-green-500">Online Payment</Button>
      </div>
    </div>
  )
}

export default Payment
