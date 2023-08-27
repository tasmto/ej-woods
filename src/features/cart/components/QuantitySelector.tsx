'use client'
import React from 'react'

import { CartProductType } from '@/features/cart/state/CartContext'
import clsxm from '@/lib/clsxm'
import { SingleProductType } from '@/schema/product.schema'

type Props = {
  product: SingleProductType | CartProductType
  onChange: (howMany: number) => void
  quantity: number
  size: 'small' | 'large'
}

const QuantitySelector = ({ product, onChange, quantity, size }: Props) => {
  return (
    <fieldset
      className={clsxm(
        'flex',
        [size === 'small' && 'gap-[2px]'],
        [size === 'large' && 'gap-1']
      )}
    >
      <input
        disabled={product.countInStock === 0}
        type='number'
        max={product.countInStock}
        min={1}
        maxLength={5}
        value={quantity}
        onChange={(e) => onChange(Number(e.target.value))}
        className={clsxm(
          'rounded-l-full border border-slate-400 bg-slate-200 text-center focus-within:border-primary-200 focus-within:ring-primary-200',
          [product.countInStock === 0 && 'cursor-not-allowed'],
          [size === 'small' && 'w-14 py-2 px-2 text-base  md:text-lg'],
          [size === 'large' && 'font-lg  w-24 py-4 px-4 md:text-xl']
        )}
      />

      <select
        disabled={product.countInStock === 0}
        defaultValue={`${quantity}`}
        onChange={(e) => onChange(Number(e.target.value))}
        className={clsxm(
          'h-full rounded-r-full border border-slate-400  bg-gray-300 bg-center text-transparent focus-within:border-primary-200 focus-within:ring-primary-200',
          [product.countInStock === 0 && 'cursor-not-allowed'],
          [size === 'small' && 'py-2 px-2 pr-4 text-base  md:text-lg'],
          [size === 'large' && 'font-lg py-4 px-6 pr-8 md:text-xl']
        )}
      >
        {!product.hasInfiniteStock &&
          Array(product.countInStock)
            .fill(0)
            .map((_, i) => (
              <option key={i + 1} value={i + 1} className='text-slate-700'>
                {1 + i}
              </option>
            ))}
        {product.hasInfiniteStock && (
          <>
            {Array(8)
              .fill(0)
              .map((_, i) => (
                <option key={i + 1} value={i + 1} className='text-slate-700'>
                  {1 + i}
                </option>
              ))}
            {[10, 12, 15, 20, 25].map((i) => (
              <option key={i} value={i} className='text-slate-700'>
                {i}
              </option>
            ))}
          </>
        )}
      </select>
    </fieldset>
  )
}

QuantitySelector.defaultProps = {
  size: 'large',
}

export default QuantitySelector
