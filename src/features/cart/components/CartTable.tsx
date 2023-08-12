import React from 'react'

import IMG from '@/components/CloudinaryImage'
import { H3, P3 } from '@/components/typography/Typography'
import QuantitySelector from '@/features/cart/components/QuantitySelector'
import {
  CartProductType,
  useCartStore,
} from '@/features/cart/state/CartContext'
import clsxm from '@/lib/clsxm'
import { FormatCurrency } from '@/lib/FormatNumber'
import { trimString } from '@/lib/FormatString'

type Props = {
  className?: string
}

const CartTable = ({ className }: Props) => {
  const { cart, removeItemFromCart, addToCart } = useCartStore((state) => state)
  return (
    <>
      {cart.length > 0 ? (
        <table className='[border-spacing:0px]'>
          <thead>
            <tr className='sr-only'>
              <th>Image</th>
              <th>Product Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody
            className={clsxm(
              'grid table-auto border-separate gap-2  p-1 ',
              className
            )}
          >
            {cart.map((product: CartProductType, i) => {
              const { id, name, quantity, images, price, type } = product
              return (
                <tr
                  key={id}
                  className={clsxm(
                    'sm:flex-no-wrap flex flex-wrap items-center gap-2 divide-x-[8px] divide-transparent rounded-xl p-2 outline outline-1  outline-primary-50/50 sm:gap-0 sm:py-2',
                    [i % 2 === 0 && 'bg-primary-50/10']
                  )}
                >
                  <td className='w-[15%]'>
                    <IMG
                      src={images[0]?.url}
                      transformation='cartOverlayThumbnail'
                      layout='responsive'
                      className='skeleton w-full rounded-lg bg-gray-400 object-cover shadow-black transition-all duration-200'
                      height={70}
                      quality={20}
                      width={70}
                      alt=''
                    />
                  </td>
                  <td className='grid gap-[2px] sm:w-[50%]'>
                    <H3 className='break-all !leading-tight sm:break-normal lg:!text-[1.3rem]'>
                      {trimString(name, 40)}
                    </H3>
                    <P3 className='text-primary-200'>
                      <b>{FormatCurrency(quantity * price) ?? 0}</b>
                      {type === 'FURNITURE'
                        ? ` — for ${quantity}.`
                        : ` — for ${product.weight * quantity ?? 1} ${"kg's"}`}
                    </P3>
                  </td>
                  <td className='flex  justify-end gap-1 sm:w-[35%]'>
                    <QuantitySelector
                      quantity={quantity}
                      onChange={(q) => addToCart(product, q)}
                      product={product}
                      size='small'
                    />
                    <button
                      className='rounded-lg p-1 px-2 text-xl hover:bg-slate-300'
                      onClick={() => removeItemFromCart(product)}
                    >
                      &times;
                      <span className='sr-only'>
                        remove item from your cart
                      </span>
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      ) : (
        <div className='flex items-center justify-center'></div>
      )}
    </>
  )
}

CartTable.defaultProps = {
  className: '',
}

export default CartTable
