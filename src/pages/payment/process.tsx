import React, { useState } from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

import { D1 } from '@/components/typography/Typography'
import { useCartStore } from '@/features/cart/state/CartContext'
import StripePaymentsForm from '@/features/checkout/components/StripePaymentsForm'
import { useCheckoutStore } from '@/features/checkout/state/CheckoutContext'
import { useEffectOnce } from '@/lib/hooks/useEffectOnce'
import { trpc } from '@/utils/trpc'

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
)

type Props = {}

const ProcessPage = (props: Props) => {
  const mutation = trpc.useMutation(['sales.create-sale'])
  const { customer_details, order, payment_details } = useCheckoutStore(
    (state) => state
  )
  const { cart, cartValue, totalItemsInCart } = useCartStore((state) => state)
  const [clientSecret, setClientSecret] = useState<string>()

  const handleCreateSale = async () => {
    try {
      const sale = await mutation.mutateAsync({
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
        deliveryTimeSlotStart: order.preferred_time_start,
        deliveryTimeSlotEnd: order.preferred_time_end,
        deliveryPhoneNumber: order.delivery_phone_number,
        deliveryAddress: order.delivery_address,
        paymentMethod: payment_details.payment_method,
      })
      // sale returns html, so we need to parse it and display it
      setClientSecret(sale?.clientSecret)
    } catch (error) {
      console.log('Failed to create sale', error)
    }
  }

  useEffectOnce(() => {
    handleCreateSale()
  })

  return clientSecret ? (
    <div className='App'>
      {clientSecret && (
        <Elements
          options={{
            clientSecret,
            appearance: {
              theme: 'stripe',
            },
          }}
          stripe={stripePromise}
        >
          <StripePaymentsForm />
        </Elements>
      )}
    </div>
  ) : (
    <D1>Loading...</D1>
  )
}

export default ProcessPage
