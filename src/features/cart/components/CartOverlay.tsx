import { AnimatePresence, motion } from 'framer-motion';
import { atom, useAtom } from 'jotai';
import Image from 'next/image';
import React from 'react';

import clsxm from '@/lib/clsxm';
import { FormatCurrency } from '@/lib/FormatNumber';
import resolveIcon from '@/lib/iconResolver';

import Container from '@/components/layout/Container';
import ButtonLink from '@/components/links/ButtonLink';
import { H2, P1, P3 } from '@/components/typography/Typography';

import { useCartStore } from '@/features/cart/state/CartContext';

export const cartOverlayOpen = atom<boolean>(true);

const CartOverlay = () => {
  const [cartOpen, setCartOpen] = useAtom(cartOverlayOpen);
  const { cart, removeItemFromCart, addToCart } = useCartStore(
    (state) => state
  );

  const menuAnimation = {
    enter: {
      opacity: 0,
      y: '20%',
    },
    exit: {
      opacity: 0,
      y: 0,
      x: '20%',
      transition: { delay: 0.1, duration: 0.4 },
    },
    present: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: { duration: 0.2, type: 'spring', damping: 10 },
    },
  };
  const overlayAnimation = {
    enter: { opacity: 0 },
    exit: { opacity: 0 },
    present: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  return (
    <AnimatePresence>
      {cartOpen && (
        <div className='fixed z-40 w-full'>
          <Container
            level={1}
            onClick={(e) => e.currentTarget === e.target && setCartOpen(false)}
            className='relative z-50 flex w-full cursor-pointer items-start justify-end py-6 sm:py-16'
          >
            <motion.div
              variants={menuAnimation}
              initial='enter'
              animate='present'
              exit='exit'
              className='grid w-full min-w-[300px] max-w-[300px] cursor-default gap-4 rounded-2xl bg-slate-100 py-4 px-6 pb-6 shadow-xl sm:min-w-[400px] md:min-w-[500px] md:max-w-[500px] md:rounded-3xl lg:min-w-[550px] lg:max-w-[450px]'
            >
              <div className='flex items-center justify-between gap-3'>
                <H2>Here is what is in your cart</H2>
                <button
                  onClick={() => setCartOpen(false)}
                  className='rounded-xl p-1 hover:bg-slate-200'
                >
                  <Image
                    src={resolveIcon('➖', false)?.['active'] || ''}
                    layout='intrinsic'
                    className='shadow-xl transition-all duration-200'
                    height={50}
                    width={50}
                    alt=''
                  />
                </button>
              </div>
              {cart.length > 0 ? (
                <table className='[border-spacing:0px]'>
                  <thead>
                    <tr className='sr-only'>
                      <th>Image</th>
                      <th>Product Name</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody className='grid max-h-[300px] table-auto border-separate gap-2 overflow-y-scroll  p-1 md:max-h-[400px] lg:max-h-[450px]'>
                    {cart.map(
                      ({ id, name, quantity, primaryImage, price }, i) => (
                        <tr
                          key={id}
                          className={clsxm(
                            'flex items-center divide-x-[8px] divide-transparent rounded-xl p-2 outline  outline-1 outline-primary-50/50 sm:py-3',
                            [i % 2 === 0 && 'bg-primary-50/10']
                          )}
                        >
                          <td className='w-[15%]'>
                            <Image
                              src={primaryImage ?? ''}
                              layout='responsive'
                              className='skeleton w-full rounded-lg bg-gray-400 object-cover shadow-black transition-all duration-200'
                              height={70}
                              quality={20}
                              width={70}
                              alt=''
                            />
                          </td>
                          <td className='grid w-[65%] gap-1'>
                            <P1>{name}</P1>
                            <P3 className='text-primary-300'>
                              <b>{FormatCurrency(quantity * price) ?? 0}</b> for
                              2kg
                            </P3>
                          </td>
                          <td className='w-[20%]'>Action..</td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              ) : (
                <div className='flex items-center justify-center'></div>
              )}
              <ButtonLink
                href='/cart'
                variant='outline'
                className='mt-3 w-full justify-center justify-self-stretch text-center'
                icon='💳'
                alwaysActive
                iconPosition='start'
                curve='top'
              >
                Go To Cart
              </ButtonLink>
            </motion.div>
          </Container>
          <motion.button
            role='button'
            onClick={(e) => e.currentTarget === e.target && setCartOpen(false)}
            initial='enter'
            animate='present'
            exit='exit'
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            variants={overlayAnimation}
            className='fixed top-0 z-30 h-screen w-screen cursor-pointer bg-primary-500/50 backdrop-blur-md'
          ></motion.button>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CartOverlay;
