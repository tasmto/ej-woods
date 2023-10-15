import React from 'react'
import { IoInfiniteOutline } from 'react-icons/io5'
import { Product, ProductImage } from '@prisma/client'

import clsxm from '@/lib/clsxm'

type Props = {
  product:
    | Product
    | (Product & {
        images: ProductImage[]
      })
  stock?: number
  hasInfiniteStock?: boolean
  onChange: (howMany: number, e: React.ChangeEvent<HTMLInputElement>) => void
  onToggleInfiniteStock: () => void
  className?: string
}

const StockInput = ({
  product,
  onChange,
  onToggleInfiniteStock,
  className,
  stock,
  hasInfiniteStock,
}: Props) => {
  return (
    <label className={clsxm(['flex gap-1', className])}>
      <input
        disabled={hasInfiniteStock ?? product.hasInfiniteStock}
        title={
          hasInfiniteStock ?? product.hasInfiniteStock
            ? 'Disable infinite stock'
            : 'Edit quantity'
        }
        type='number'
        min={1}
        max={9999}
        maxLength={4}
        value={stock ?? product.countInStock}
        onChange={(e) => onChange(Number(e.target.value), e)}
        onClick={(e) => {
          // if (e.target.closest('input')) return
          if (hasInfiniteStock ?? product.hasInfiniteStock) {
            onToggleInfiniteStock()
          }
        }}
        className={clsxm(
          'rounded-sm  bg-gray-200 text-center focus-within:border-primary-200 focus-within:ring-primary-200',
          [
            (hasInfiniteStock ?? product.hasInfiniteStock) &&
              'cursor-not-allowed',
          ],
          ['w-auto py-1 px-1 text-[0.7rem]'],
          [
            'disabled:cursor-not-allowed disabled:bg-gray-400 disabled:text-gray-600',
          ]
        )}
      />
      <span className='sr-only'>Edit quantity</span>
      <button
        title={
          hasInfiniteStock ?? product.hasInfiniteStock
            ? 'Disable infinite stock'
            : 'Enable infinite stock'
        }
        onClick={onToggleInfiniteStock}
        className={clsxm([
          'rounded-sm border border-gray-500 bg-transparent p-1 hover:bg-gray-700 hover:text-white',
          [
            (hasInfiniteStock ?? product.hasInfiniteStock) &&
              'border-gray-600 bg-gray-600 text-white',
          ],
        ])}
      >
        <IoInfiniteOutline className='h-5 w-5' />
        <span className='sr-only'>Toggle inifinite stock</span>
      </button>
    </label>
  )
}

export default StockInput
