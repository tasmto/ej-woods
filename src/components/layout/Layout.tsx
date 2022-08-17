import * as React from 'react';

import CartOverlay from '@/features/cart/components/CartOverlay';
import Footer from '@/features/navigation/components/Footer';
import Header from '@/features/navigation/components/Header';
import MobileNav from '@/features/navigation/components/MobileNav';

export default function Layout({ children }: { children: React.ReactNode }) {
  // Put Header or Footer Here
  return (
    <div className=' bg-gray-50 bg-[url("/images/glow.png")] bg-auto bg-top  bg-no-repeat pt-10 pb-24  selection:bg-primary-500 selection:text-primary-50 sm:pb-2 sm:pt-20 md:pt-24'>
      <Header />
      <CartOverlay />
      <MobileNav />
      <main className='grid gap-16 overflow-x-hidden lg:gap-24'>
        {children}
      </main>
      <Footer />
    </div>
  );
}
