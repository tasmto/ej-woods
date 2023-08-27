'use client'
import React from 'react'
import { Product, ProductImage } from '@prisma/client'
import clsx from 'clsx'

import IMG from '@/components/CloudinaryImage'
import { H3, P3 } from '@/components/typography/Typography'
import clsxm from '@/lib/clsxm'
import { FormatCurrency } from '@/lib/FormatNumber'
import { trimString } from '@/lib/FormatString'

interface ProductType
  extends Pick<Product, 'id' | 'name' | 'price' | 'type' | 'weight'> {
  image: ProductImage
  quantity: number
}

type Props = {
  className?: string
  allowEditing?: boolean
  products: ProductType[]
}

const ProductsTable = ({ className, products }: Props) => {
  return (
    <>
      {products.length > 0 ? (
        <table className='w-full'>
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
            {products.map((product, i) => {
              const { id, name, quantity, image, price, type } = product
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
                      src={image?.url}
                      transformation='cartOverlayThumbnail'
                      layout='responsive'
                      className='skeleton w-full rounded-lg bg-gray-400 object-cover shadow-black/10 transition-all duration-200'
                      height={70}
                      quality={20}
                      width={70}
                      alt=''
                    />
                  </td>
                  <td className={clsx(['grid gap-[2px]', 'sm:w-[85%]'])}>
                    <H3 className='break-all !leading-tight sm:break-normal lg:!text-[1.3rem]'>
                      {trimString(name, 40)}
                    </H3>
                    <P3 className='text-primary-200' suppressHydrationWarning>
                      <b>{FormatCurrency(quantity * price) ?? 0}</b>
                      {type === 'FURNITURE'
                        ? ` — for ${quantity}.`
                        : ` — for ${product.weight * quantity ?? 1} ${"kg's"}`}
                    </P3>
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

ProductsTable.defaultProps = {
  className: '',
}

export default ProductsTable
