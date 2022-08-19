import * as React from 'react'

import Wrapper from '@/components/layout/Wrapper'

import CartOverlay from '@/features/cart/components/CartOverlay'
import Footer from '@/features/navigation/components/Footer'
import Header from '@/features/navigation/components/Header'
import MobileNav from '@/features/navigation/components/MobileNav'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Wrapper>
      <Header />
      <CartOverlay />
      <MobileNav />
      <main className='grid gap-16 overflow-x-hidden lg:gap-24'>
        {children}
      </main>
      <Footer />
    </Wrapper>
  )
}
