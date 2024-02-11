import * as React from 'react'
import clsx from 'clsx'

import Wrapper from '@/components/layout/Wrapper'
import Header from '@/features/navigation/components/Header'
import CartOverlay from '@/features/cart/components/CartOverlay'
import MobileNav from '@/features/navigation/components/MobileNav'
import Footer from '@/features/navigation/components/Footer'
 

const Layout = ({
  children,
  showFooterCta = true,
  className = '',
}: {
  children: React.ReactNode
  showFooterCta?: boolean
  className?: string
}) => {
  return (
    <Wrapper>
      <Header />
      <CartOverlay />
      <MobileNav />
      <main
        className={clsx(['grid gap-16 overflow-x-hidden lg:gap-24', className])}
      >
        {children}
      </main>
      <Footer showCta={showFooterCta} />
    </Wrapper>
  )
}

export default Layout
