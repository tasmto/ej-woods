import React from 'react';

import Container from '@/components/layout/Container';
import ArrowLink from '@/components/links/ArrowLink';
import UnstyledLink from '@/components/links/UnstyledLink';
import { P3 } from '@/components/typography/Typography';

import EjWoodsLogo from '~/svg/ej-woods-logo.svg';

const CheckoutLayout = ({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) => (
  <div className='min-h-screen bg-gray-50  bg-[url("/images/glow.png")] bg-auto bg-top  bg-no-repeat pt-4 pb-2 selection:bg-primary-500 selection:text-primary-50 '>
    <Container level={1} className='relative grid  gap-4'>
      <header className=' flex items-center justify-between gap-4 '>
        <ArrowLink href='/shop' direction='left' className=' text-start'>
          Back to Shop
        </ArrowLink>
        <UnstyledLink href='/' className=' text-start  hover:text-gray-600'>
          <EjWoodsLogo className='h-auto w-24' />
        </UnstyledLink>
      </header>
      <main className='grid gap-16 overflow-x-hidden lg:gap-20'>
        {children}
      </main>
      <footer className='mt-12 '>
        <P3 className='flex justify-between gap-1 border-t border-primary-100/40 py-4 text-primary-100'>
          <span> © 2022 ej-woods.</span>
          <span className='flex gap-1'>
            <span>Designed and developed by </span>
            <ArrowLink
              rel='noreferrer'
              href='https://tasmto.com?utm_source=ej-woods'
              target='_blank'
            >
              Tashinga.
            </ArrowLink>
          </span>
        </P3>
      </footer>
    </Container>
  </div>
);
export default CheckoutLayout;
