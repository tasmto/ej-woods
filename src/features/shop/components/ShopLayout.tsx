import * as React from 'react'

import Wrapper from '@/components/layout/Wrapper'
import CartOverlay from '@/features/cart/components/CartOverlay'
import Footer from '@/features/navigation/components/Footer'
import Header from '@/features/navigation/components/Header'
import MobileNav from '@/features/navigation/components/MobileNav'

const ShopLayout = ({ children }: { children: React.ReactNode }) => (
  <Wrapper>
    <Header />
    <CartOverlay />
    <MobileNav />
    <main className='grid gap-16  lg:gap-20'>{children}</main>
    <Footer />
  </Wrapper>
)

export default ShopLayout
