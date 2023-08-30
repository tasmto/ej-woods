import React, { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { atom, useAtom } from 'jotai'
import Image from 'next/image'

import Container from '@/components/layout/Container'
import ButtonLink from '@/components/links/ButtonLink'
import { H1, P1 } from '@/components/typography/Typography'
import {
  GO_TO_CHECKOUT,
  HERE_IS_WHAT_IS_IN_YOUR_CART,
} from '@/constants/standardNames'
import CartTable from '@/features/cart/components/CartTable'
import EmptyCartGif from '@/features/cart/components/EmptyCartGif'
import { useCartStore } from '@/features/cart/state/CartContext'
import { FormatCurrency } from '@/lib/FormatNumber'
import resolveIcon from '@/lib/iconResolver'

export const cartOverlayOpen = atom<boolean>(false)

const CartOverlay = () => {
  const [cartOpen, setCartOpen] = useAtom(cartOverlayOpen)
  const { cart, removeItemFromCart, addToCart, totalItemsInCart, cartValue } =
    useCartStore((state) => state)

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
  }
  const overlayAnimation = {
    enter: { opacity: 0 },
    exit: { opacity: 0 },
    present: { opacity: 1, y: 0, transition: { duration: 1 } },
  }
  useEffect(() => {
    return () => {
      setCartOpen(false)
    }
  }, [])

  return (
    <AnimatePresence>
      {cartOpen && (
        <div className='fixed top-8 z-40 w-full'>
          <Container
            level={1}
            onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
              e.currentTarget === e.target && setCartOpen(false)
            }
            className='relative z-50 flex w-full cursor-pointer items-start justify-end py-6 sm:py-16'
          >
            <motion.div
              variants={menuAnimation}
              initial='enter'
              animate='present'
              exit='exit'
              className='grid w-full min-w-[80vw] max-w-[400px] cursor-default gap-6 rounded-2xl bg-slate-100 py-6 px-6   shadow-xl md:rounded-3xl lg:min-w-[400px] lg:max-w-[500px]'
            >
              <div className='grid gap-1'>
                <div className='flex items-center justify-between gap-3'>
                  <H1>{HERE_IS_WHAT_IS_IN_YOUR_CART}</H1>
                  <button
                    onClick={() => setCartOpen(false)}
                    className='rounded-xl bg-slate-200 px-1 py-[1px] hover:bg-slate-300'
                  >
                    <Image
                      src={resolveIcon('➖', false)?.['active'] || ''}
                      layout='intrinsic'
                      className='transition-all duration-200'
                      height={50}
                      width={50}
                      alt=''
                    />
                  </button>
                </div>
                {
                  <P1 className='w-full flex-1 text-primary-300'>
                    Overview: {totalItemsInCart()} items · Total Price:{' '}
                    {FormatCurrency(cartValue())}
                  </P1>
                }
              </div>

              {cart.length === 0 ? (
                <EmptyCartGif />
              ) : (
                <>
                  <CartTable className='max-h-[300px] overflow-y-scroll md:max-h-[400px]  lg:max-h-[450px]' />
                  <ButtonLink
                    href='/checkout'
                    variant='outline'
                    className='mt-3 w-full justify-center justify-self-stretch text-center'
                    icon='💳'
                    alwaysActive
                    iconPosition='start'
                    curve='top'
                  >
                    {GO_TO_CHECKOUT}
                  </ButtonLink>
                </>
              )}
            </motion.div>
          </Container>
          {/* Overlay on background */}
          <motion.button
            role='button'
            onClick={(e) => e.currentTarget === e.target && setCartOpen(false)}
            initial='enter'
            animate='present'
            exit='exit'
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            variants={overlayAnimation}
            className='fixed top-0 z-30 h-screen w-screen cursor-pointer bg-primary-500/50 backdrop-blur-md'
          >
            <div className='sr-only'>Close cart overlay</div>
          </motion.button>
        </div>
      )}
    </AnimatePresence>
  )
}

export default CartOverlay
