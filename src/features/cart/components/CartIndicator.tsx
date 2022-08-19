import { useAtom } from 'jotai'
import Image from 'next/image'
import { useRouter } from 'next/router'
import * as React from 'react'

import clsxm from '@/lib/clsxm'
import resolveIcon from '@/lib/iconResolver'

import { Caption, P2 } from '@/components/typography/Typography'

import { cartOverlayOpen } from '@/features/cart/components/CartOverlay'
import { useCartStore } from '@/features/cart/state/CartContext'

const CartIndicatorButton = () => {
  const router = useRouter()
  const [cartOpen, setCartOpen] = useAtom(cartOverlayOpen)
  const { totalItemsInCart } = useCartStore((state) => state)

  return (
    <button
      className={clsxm(
        'flex items-center gap-1 rounded-2xl px-2 py-1 hover:bg-primary-50/50 ',
        [cartOpen && 'bg-primary-100 text-slate-200 hover:bg-primary-100/90']
      )}
      title='Cart'
      onClick={() => setCartOpen(!cartOpen)}
    >
      <div className='relative'>
        <Image
          src={
            resolveIcon('🛒', router.pathname === '/shop/cart' || cartOpen)?.[
              'active'
            ] || ''
          }
          layout='intrinsic'
          className='shadow-xl shadow-black transition-all duration-200'
          height={30}
          width={30}
          alt=''
        />
        {totalItemsInCart() > 0 && (
          <Caption
            as='figcaption'
            className={clsxm([
              'absolute right-[-10px] top-[-7px] h-5 w-5 rounded-full p-1 ',
              'text-xs text-[10px] font-bold leading-tight text-white',
              'bg-primary-200 ',
            ])}
          >
            <span>{totalItemsInCart() > 10 ? '9+' : totalItemsInCart()}</span>
            <span className='sr-only'>Items currently in your cart</span>
          </Caption>
        )}
      </div>
      <P2 as='span'>Cart</P2>
    </button>
  )
}

export default CartIndicatorButton
