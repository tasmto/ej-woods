import { atom } from 'jotai';
import React from 'react';

import { FormatCurrency } from '@/lib/FormatNumber';

import Container from '@/components/layout/Container';
import Seo from '@/components/Seo';
import { D2, H1, P1 } from '@/components/typography/Typography';

import CartTable from '@/features/cart/components/CartTable';
import { useCartStore } from '@/features/cart/state/CartContext';
import CheckoutLayout from '@/features/checkout/components/Layout';
import ContactForm from '@/features/forms/ContactForm';

const checkoutStage = atom(0);
const CheckoutPage = () => {
  const { totalItemsInCart, cartValue } = useCartStore((state) => state);

  return (
    <CheckoutLayout>
      <Seo templateTitle='Checkout' />
      <Container
        as='section'
        className='grid grid-cols-1 items-start justify-center gap-14 md:grid-cols-2 lg:gap-20'
      >
        <article className=' grid  justify-items-start gap-8'>
          <D2 className=''>Ready to checkout?</D2>
          <ContactForm />
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
  );
};

export default CheckoutPage;
