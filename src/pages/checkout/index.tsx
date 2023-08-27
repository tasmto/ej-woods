'use client'
import React from 'react'
import dynamic from 'next/dynamic'

import Container from '@/components/layout/Container'
import Seo from '@/components/Seo'
import { D2, H1, P1 } from '@/components/typography/Typography'
import { useCartStore } from '@/features/cart/state/CartContext'
import CheckoutForm from '@/features/checkout/components/CheckoutForm'
import CheckoutLayout from '@/features/checkout/components/Layout'
import { FormatCurrency } from '@/lib/FormatNumber'

const CartTable = dynamic(
  () => import('@/features/cart/components/CartTable'),
  {
    ssr: false,
  }
)

const CheckoutPage = () => {
  const { totalItemsInCart, cartValue } = useCartStore((state) => state)

  // todo: create empty cart layout
  return (
    <CheckoutLayout backLink='/shop' backLinkText='Go back to shop'>
      <Seo templateTitle='Checkout' />
      <Container
        as='section'
        className='grid grid-cols-1 items-start justify-center gap-14 md:grid-cols-2 lg:gap-20'
      >
        <article className=' grid  justify-items-start gap-8'>
          <div className='grid gap-2'>
            <D2 className=''>Ready to checkout?</D2>
            <P1>
              Step <strong>1 of 3</strong>
            </P1>
          </div>
          <CheckoutForm />
        </article>
        <aside className='grid gap-4'>
          <div>
            <H1 as='h2'>Here is what is in your cart</H1>

            <P1 className='w-full flex-1 text-primary-300'>
              Overview: {totalItemsInCart()} items · Total Price:{' '}
              {FormatCurrency(cartValue())}
            </P1>
          </div>

          <CartTable className='md:max-h-[600px] md:overflow-y-auto' />
        </aside>
      </Container>
    </CheckoutLayout>
  )
}

export default CheckoutPage
