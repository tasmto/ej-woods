'use client'
import React from 'react'
import { useRouter } from 'next/router'

import Container from '@/components/layout/Container'
import ArrowLink from '@/components/links/ArrowLink'
import { H1, H3 } from '@/components/typography/Typography'
import AdminLayout from '@/features/accounts/components/AdminLayout'
import EditProductForm from '@/features/products/components/EditProductForm'
import { trpc } from '@/utils/trpc'
import AdminProductImage from '@/features/products/components/AdminProductImage'

type Props = {}

const Page = ({}: Props) => {
  const router = useRouter()
  const { slug } = router.query
  const {
    data: product,
    isLoading,
    isError,
    error,
  } = trpc.products.singleProduct.useQuery(
    {
      slug: slug as string,
    },
    { staleTime: Infinity },
  )
  if (isError || !product) {
    return <div>Still loading</div>
  }
  return (
    <AdminLayout>
      <Container
        level={1}
        className='grid gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-5'
      >
        <div className='lg:col-span-3'>
          <EditProductForm product={product} />
        </div>
        <div className='grid gap-6 self-start lg:col-span-2'>
          <div className='flex justify-between'>
            <H3 as='h3' weight='normal'>
              Images:
            </H3>
          </div>

          <ul className='grid gap-2 md:grid-cols-2'>
            {product.images.map((image) => (
              <AdminProductImage key={image.id} image={image} />
            ))}
          </ul>
        </div>
      </Container>
    </AdminLayout>
  )
}

export default Page
