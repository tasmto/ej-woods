'use client'
import React from 'react'
import { Product, ProductImage } from '@prisma/client'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import Link from 'next/link'

import IMG from '@/components/CloudinaryImage'
import { H3, P1 } from '@/components/typography/Typography'
import { FormatCurrency } from '@/features/products/lib/formatNumber'
import clsxm from '@/lib/clsxm'
import { trimString } from '@/lib/FormatString'
import { SingleProductType } from '@/schema/product.schema'

const AddToCartButton = dynamic(
  () => import('@/features/cart/components/AddToCartButton'),
  {
    ssr: false,
  }
)

type Props = {
  product:
    | SingleProductType
    | (Product & {
        images: ProductImage[]
      })
  position: number
}
const ProductCard = ({ product, position }: Props) => {
  if (!product || !product?.name) return null

  const { name, price, type, images, id } = product

  return (
    <Link href={`/shop/${id}`} legacyBehavior>
      <motion.a
        initial={{ opacity: 0, x: '-5%' }}
        animate={{ opacity: 1, x: '0' }}
        exit={{ opacity: 0, x: '5%', transition: { duration: 0.2 } }}
        transition={{
          ease: 'backInOut',
          duration: 0.3,
          delay: position * 0.05,
        }}
        className='cursor-pointer'
      >
        <article
          className={clsxm([
            'content-stretch relative grid h-80 w-full content-end items-stretch justify-items-stretch overflow-hidden rounded-xl  bg-gray-400 text-slate-50 after:absolute after:bottom-0 after:block after:h-2/3 after:w-full after:bg-gradient-to-t after:from-black/90 after:via-black/60 after:to-black/0 md:h-[24rem]',
          ])}
        >
          <IMG
            transformation='productImageThumbnail'
            src={images?.at(0)?.url}
            alt={name}
            quality={50}
            useSkeleton
            width={400}
            height={400}
            imgClassName='h-full w-full object-cover '
          />
          <div className='absolute bottom-0 z-10 flex w-full items-end justify-between gap-4 p-8 sm:p-6 md:py-8'>
            <div className='flex-1'>
              <H3 weight='semiBold' className='drop-shadow-md'>
                {trimString(name, 65)}
              </H3>

              <P1 className='mt-2 drop-shadow-md' suppressHydrationWarning>
                {FormatCurrency(price)} {type === 'WOOD' ? ' per kg' : 'each'}
              </P1>
            </div>
            <AddToCartButton product={product} />
          </div>
        </article>
      </motion.a>
    </Link>
  )
}

const ProductCardSkeleton = () => {
  return (
    <div
      role='presentation'
      className={clsxm([
        'content-stretch skeleton relative grid h-80 w-full content-end items-stretch justify-items-stretch overflow-hidden rounded-xl bg-cover text-slate-50  md:h-[24rem]',
      ])}
    ></div>
  )
}

ProductCard.defaultProps = {
  position: 1,
}

export default ProductCard
export { ProductCardSkeleton }
