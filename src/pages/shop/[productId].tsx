import Error from 'next/error'
import React from 'react'

import clsxm from '@/lib/clsxm'

import products from '@/data/products'

import Container from '@/components/layout/Container'
import ArrowLink from '@/components/links/ArrowLink'
import Seo from '@/components/Seo'
import { D2 } from '@/components/typography/Typography'

import ProductCard from '@/features/products/components/Card'
import SingleProductDisplay from '@/features/products/SingleProductDisplay'
import { ProductType } from '@/features/products/types'
import ShopLayout from '@/features/shop/components/ShopLayout'

type Props = { product: ProductType }

const ProductPage = ({ product }: Props) => {
  if (!product) return <Error statusCode={404} />
  return (
    <ShopLayout>
      <Seo templateTitle={product.name || 'Product'} />

      <SingleProductDisplay product={product} />
      {/* @ts-expect-error: name may not exist */}
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

export const getServerSideProps = async ({ query }: any) => {
  const { productId } = query
  const product = await products.find((item) => item.id === productId)
  if (product) {
    const crossSells = product.crossSells.map((cs) =>
      products.find((item) => item.id === cs)
    )
    // @ts-expect-error: types man
    product.crossSells = crossSells ?? null
  }

  // console.log(product);

  return { props: { product: product ?? null } }
}

ProductPage.defaultProps = {
  product: null,
}

export default ProductPage
