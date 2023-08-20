import React, { useState } from 'react'
import { useRouter } from 'next/router'

import { D1 } from '@/components/typography/Typography'
import { useCartStore } from '@/features/cart/state/CartContext'
import { useCheckoutStore } from '@/features/checkout/state/CheckoutContext'
import { useEffectOnce } from '@/lib/hooks/useEffectOnce'
import { trpc } from '@/utils/trpc'

type Props = {}

const Process = (props: Props) => {
  const mutation = trpc.useMutation(['orders.create-order'], {
    retry: 0,
  })
  const {
    customer_details,
    order: orderState,
    payment_details,
  } = useCheckoutStore((state) => state)
  const { cart, cartValue, totalItemsInCart, clearCart } = useCartStore(
    (state) => state
  )
  const [checkoutData, setCheckoutData] = useState<any>()
  const router = useRouter()

  const handleCreateOrder = async () => {
    try {
      const order = await mutation.mutateAsync({
        totalPrice: cartValue(),
        totalQuantity: totalItemsInCart(),
        products: cart.map((item) => ({
          productId: item.id,
          price: item.price,
          quantity: item.quantity,
        })),
        customerName: customer_details.name,
        customerEmail: customer_details.email_address,
        customerPhoneNumber: customer_details.phone_number.toString(),
        deliveryTimeSlotStart: orderState.preferred_time_start,
        deliveryTimeSlotEnd: orderState.preferred_time_end,
        deliveryPhoneNumber: orderState.delivery_phone_number,
        deliveryAddress: orderState.delivery_address,
        paymentMethod: payment_details.payment_method,
      })
      // order returns html, so we need to parse it and display it
      setCheckoutData(order)
      clearCart()
      router.push(`/orders/${order}`)
    } catch (error) {
      console.log('Failed to create order', error)
    }
  }

  useEffectOnce(() => {
    handleCreateOrder()
  })

  return checkoutData ? (
    <div className='m-0 flex h-screen w-screen overflow-clip'>
      {/* <style>
        {`body {
          overflow-y: hidden !important;
        }`}
      </style> */}
      <div>{JSON.stringify(checkoutData, null, 2)}</div>
    </div>
  ) : (
    <D1>Loading...</D1>
  )
}

export default Process
