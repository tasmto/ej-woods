import * as React from 'react'
import clsx from 'clsx'

import Wrapper from '@/components/layout/Wrapper'
import CartOverlay from '@/features/cart/components/CartOverlay'
import Footer from '@/features/navigation/components/Footer'
import Header from '@/features/navigation/components/Header'
import MobileNav from '@/features/navigation/components/MobileNav'

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
