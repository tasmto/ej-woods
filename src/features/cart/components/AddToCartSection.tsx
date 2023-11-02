import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'

import ButtonLink from '@/components/links/ButtonLink'
import { Caption, H3, P2 } from '@/components/typography/Typography'
import {
  ADD_TO_CART,
  BUY_IMMEDIATELY,
  OUT_OF_STOCK,
  REMOVE_FROM_CART,
  UPDATE_ITEMS_IN_CART,
} from '@/constants/standardNames'
import QuantitySelector from '@/features/cart/components/QuantitySelector'
import { useCartStore } from '@/features/cart/state/CartContext'
import clsxm from '@/lib/clsxm'
import { FormatCurrency } from '@/lib/FormatNumber'
import resolveIcon from '@/lib/iconResolver'
import { SingleProductType } from '@/schema/product.schema'

type Props = {
  product: SingleProductType
}

const AddToCartSection = ({ product }: Props) => {
  const { cart, addToCart, removeItemFromCart, howManyInCart } = useCartStore(
    (state) => state
  )
  const [howMany, setHowMany] = useState<number>(1)
  const [countInCart, setCountInCart] = useState(0)

  const handleAddToCart = () => {
    howManyInCart(product) !== howMany
      ? addToCart(product, howMany)
      : removeItemFromCart(product)

    setHowMany(howManyInCart(product) || 1)
  }

  // Check if product and  is in cart (every time cart changes)
  useEffect(() => {
    setCountInCart(howManyInCart(product))
  }, [cart, product, howManyInCart])

  useEffect(() => {
    setHowMany(howManyInCart(product) || 1)
  }, [])

  return (
    <div className='flex w-full flex-wrap gap-4'>
      <H3
        as='p'
        className='mt-[-17px] mb-6 flex w-full items-end tracking-tight text-primary-600'
        suppressHydrationWarning
      >
        {howManyInCart(product) ? (
          <>
            <b>{FormatCurrency((product.price || 1) * howMany ?? 1)}</b> — for{' '}
            {howMany}.
          </>
        ) : (
          <>
            <b>{FormatCurrency((product.price || 1) * howMany ?? 1)}</b> — for{' '}
            {(product.weight || 1) * howMany ?? 1} {"kg's"}
          </>
        )}
        <P2
          as='span'
          className='ml-4 text-primary-200'
          suppressHydrationWarning
        >
          ({FormatCurrency(product.price)} each).
        </P2>
      </H3>
      <div className='flex flex-wrap gap-4'>
        <QuantitySelector
          quantity={howMany}
          onChange={setHowMany}
          product={product}
        />

        <button
          onClick={handleAddToCart}
          disabled={product.countInStock === 0}
          type='submit'
          className={clsxm(
            'inline-flex items-center justify-center gap-3  font-semibold',
            'rounded-full rounded-tl-none  py-4 px-8 ',
            'bg-primary-400 text-white ',
            ' group transition-all duration-300',
            'border border-primary-300',
            'relative',
            'hover:rounded-tl-full hover:bg-primary-600',
            [
              product.countInStock === 0 &&
                'cursor-not-allowed !rounded-full !bg-gray-500',
            ]
          )}
        >
          <figure className='relative h-[30px] w-[30px]'>
            <Image
              src={
                resolveIcon(
                  product.countInStock === 0 ? '➖' : '🛒',
                  countInCart > 0
                )?.[countInCart ? 'active' : 'icon'] || ''
              }
              layout='intrinsic'
              className='shadow-2xl shadow-red-500 transition-all duration-200'
              height={30}
              width={30}
              alt=''
            />
            {countInCart > 0 && (
              <Caption
                as='figcaption'
                className={clsxm([
                  'absolute right-[-10px] top-[-10px] h-5 w-5 rounded-full p-1 ',
                  'text-xs text-[10px] font-bold leading-tight text-white',
                  'bg-primary-200 outline outline-1 outline-primary-400',
                ])}
              >
                <span>{countInCart > 5 ? '5+' : countInCart}</span>
                <span className='sr-only'>Items currently in your cart</span>
              </Caption>
            )}
          </figure>
          <P2 weight='bold'>
            {product.countInStock === 0
              ? OUT_OF_STOCK
              : countInCart > 0 && countInCart === howMany
              ? REMOVE_FROM_CART
              : countInCart > 0 && countInCart !== howMany
              ? UPDATE_ITEMS_IN_CART
              : ADD_TO_CART}
          </P2>
        </button>
      </div>
      <AnimatePresence mode='wait'>
        {countInCart && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className='xl:w-full'
          >
            <ButtonLink
              href='#'
              variant='outline'
              className='flex w-full items-center justify-center gap-3  px-8 py-[0.85rem]'
              curve='top'
              icon='💳'
              alwaysActive
            >
              {BUY_IMMEDIATELY}
            </ButtonLink>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default AddToCartSection
