import React from 'react'

import Container from '@/components/layout/Container'
import RegionMap from '@/components/maps/RegionMap'
import Seo from '@/components/Seo'
import { D2, H1, P1 } from '@/components/typography/Typography'
import { useCartStore } from '@/features/cart/state/CartContext'
import CheckoutLayout from '@/features/checkout/components/Layout'
import ShippingForm from '@/features/checkout/components/ShippingForm'

const CheckoutPage = () => {
  const { totalItemsInCart, cartValue } = useCartStore((state) => state)

  // todo: create empty cart layout
  return (
    <CheckoutLayout backLink='/checkout' backLinkText='Go back to checkout'>
      <Seo templateTitle='Checkout' />
      <Container
        as='section'
        className='grid grid-cols-1 items-start justify-center gap-14 md:grid-cols-2 lg:gap-20'
      >
        <article className=' grid  justify-items-start gap-8'>
          <div className='grid gap-2'>
            <D2 className=''>Your shipping details:</D2>
            <P1>
              Step <strong>2 of 3</strong>
            </P1>
          </div>
          <ShippingForm />
        </article>
        <aside className='flex flex-col gap-4 self-stretch'>
          <H1 as='h2'>Here is the area we deliver in:</H1>

          <RegionMap />
        </aside>
      </Container>
    </CheckoutLayout>
  )
}

export default CheckoutPage
