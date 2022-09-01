import Error from 'next/error'
import { motion } from 'framer-motion'
import React from 'react'

import clsxm from '@/lib/clsxm'

import products from '@/data/products'

import Container from '@/components/layout/Container'
import ArrowLink from '@/components/links/ArrowLink'
import Seo from '@/components/Seo'
import { D1, D2, P2 } from '@/components/typography/Typography'
import AddToCartSection from '@/features/cart/components/AddToCartSection'

import ProductCard from '@/features/products/components/Card'
import SingleProductDisplay from '@/features/products/SingleProductDisplay'
import { ProductType } from '@/features/products/types'
import ShopLayout from '@/features/shop/components/ShopLayout'
import { trpc } from '@/utils/trpc'
import { useRouter } from 'next/router'
import NextImage from '@/components/NextImage'

type Props = {}

const ProductPage = () => {
  const router = useRouter()
  const { productId } = router.query

  const {
    data: product,
    isLoading,
    isError,
    error,
  } = trpc.useQuery(
    [
      'products.single-product',
      {
        productId: Number(productId),
      },
    ],
    { staleTime: Infinity }
  )

  if (isLoading) return <D1>Loading...</D1>
  if (error || !product) return <D1>Loading...</D1>

  return (
    <ShopLayout>
      <Seo templateTitle={product?.name ?? 'Product'} />

      {/* ------------- Product display start ---------- */}

      <Container
        as='section'
        level={1}
        className='relative grid grid-cols-1 items-center justify-center gap-14 md:grid-cols-2 md:gap-8 lg:gap-10 '
      >
        <Container className='overflow-y-none  sticky top-0 order-last grid h-full max-h-[550px] min-h-[350px] w-full content-end overflow-x-visible p-8 sm:p-10 md:order-first md:min-h-[450px] lg:p-12'>
          <div className='img-full-w-curve--left children-h-full children-w-full h-full w-full'>
            <NextImage
              layout='intrinsic'
              width={1000}
              height={500}
              src={product?.images?.at(0)}
              alt=''
              quality={100}
              className='skeleton relative h-full w-full  object-cover md:rounded-r-3xl'
              imgClassName='md:rounded-r-[2.5rem]  h-full w-full object-cover w-full '
              priority
            />
          </div>
        </Container>
        <motion.article className='grid justify-items-start gap-8' layout>
          <div className='grid justify-items-start gap-3'>
            <D1 className='max-w-[600px] md:max-w-full'>{product.name}</D1>
          </div>

          <AddToCartSection product={product} />

          <P2 className='tracking-tight text-primary-300'>
            <b>Description: </b>
            {product.description}
          </P2>
        </motion.article>
      </Container>

      {/* ------------- Product display end ---------- */}

      {product?.crossSells?.length > 0 && product?.crossSells[0]?.name && (
        <Container as='section' level={1} className='grid gap-4  sm:gap-8'>
          <div className='flex justify-between gap-4'>
            <D2>You may also like</D2>
            <ArrowLink className='justify-self-end' href='/'>
              Show More Products
            </ArrowLink>
          </div>
          <Container
            as='div'
            className={clsxm('grid gap-5 sm:grid-cols-2', [
              product.crossSells.length === 3 && 'lg:grid-cols-3',
            ])}
          >
            {product?.crossSells?.map((item, i) => (
              // @ts-expect-error: Cross sells could be strings based on type (but wont be)
              <ProductCard key={i} product={item} />
            ))}
          </Container>
        </Container>
      )}
    </ShopLayout>
  )
}

ProductPage.defaultProps = {
  product: null,
}

export default ProductPage
