import React from 'react'
import dynamic from 'next/dynamic'

import Container from '@/components/layout/Container'
import Seo from '@/components/Seo'
import { D2, H1, P1 } from '@/components/typography/Typography'
import { useCartStore } from '@/features/cart/state/CartContext'
import CheckoutLayout from '@/features/checkout/components/Layout'
import PaymentMethodSelector from '@/features/checkout/components/PaymentMethodSelector'
import { FormatCurrency } from '@/lib/FormatNumber'

const CartTable = dynamic(
  () => import('@/features/cart/components/CartTable'),
  {
    ssr: false,
  }
)

const PaymentsPage = () => {
  const { totalItemsInCart, cartValue } = useCartStore((state) => state)

  // todo: create empty cart layout
  return (
    <CheckoutLayout backLink='/shipping' backLinkText='Go back to shipping'>
      <Seo templateTitle='Checkout' />
      <Container
        as='section'
        className='grid grid-cols-1 items-start justify-center gap-14 md:grid-cols-2 lg:gap-20'
      >
        <article className=' grid  justify-items-start gap-8'>
          <div className='grid gap-2'>
            <D2 className=''>Payment method.</D2>
            <P1>
              Step <strong>3 of 3</strong>
            </P1>
          </div>
          <PaymentMethodSelector />
        </article>
        <aside className='grid gap-4'>
          <div>
            <H1 as='h2'>Here is what is in your cart</H1>

            <P1 className='w-full flex-1 text-primary-300'>
              Overview: {totalItemsInCart()} items · Total Price:{' '}
              {FormatCurrency(cartValue())}
            </P1>
          </div>

          <CartTable
            className='md:max-h-[600px] md:overflow-y-auto'
            allowEditing={false}
          />
        </aside>
      </Container>
    </CheckoutLayout>
  )
}

export default PaymentsPage
