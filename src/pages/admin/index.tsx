'use client'
import React from 'react'
import { createServerSideHelpers } from '@trpc/react-query/server'
import { type InferGetStaticPropsType } from 'next'
import superjson from 'superjson'

import Container from '@/components/layout/Container'
import ArrowLink from '@/components/links/ArrowLink'
import { H1 } from '@/components/typography/Typography'
import AdminLayout from '@/features/accounts/components/AdminLayout'
import HorizontalProductCard from '@/features/products/components/HorizontalProductCard'
import { createClientContext } from '@/pages/api/trpc/[trpc]'
import { appRouter } from '@/server/api/routers/app.router'
import { trpc } from '@/utils/trpc'
import ssg from '@/server/createSSGHelpers'

export const getStaticProps = async () => {
  await ssg.products.multipleProducts.prefetch({
    limit: 8,
    page: 1,
    type: null,
    sortBy: 'random',
    sortOrder: 'desc',
    showArchived: true,
  })

  return {
    props: {},
    // revalidate: 120,
  }
}

const Page = (
  {
    // products: productsFromGSP,
  }: InferGetStaticPropsType<typeof getStaticProps>,
) => {
  const { data, isLoading, isError, error, refetch } =
    trpc.products.multipleProducts.useQuery(
      {
        limit: 8,
        page: 1,
        type: null,
        sortBy: 'random',
        sortOrder: 'desc',
        showArchived: true,
      },
      {
        staleTime: 1300,
        // initialData: productsFromGSP,
      },
    )

  return (
    <AdminLayout>
      <Container
        level={1}
        className='grid gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-5'
      >
        <div className='lg:col-span-3'>Col 1</div>
        <div className='grid gap-6 self-center lg:col-span-2'>
          <div className='flex justify-between'>
            <H1 as='h2' weight='normal'>
              Products:
            </H1>
            <ArrowLink href='/admin/products' className='justify-self-start'>
              View all <span className='sr-only sm:not-sr-only'>products</span>
            </ArrowLink>
          </div>

          <ul className='grid gap-2'>
            {data?.products?.map((product, key) => (
              <li key={key}>
                <HorizontalProductCard
                  product={product}
                  handleRefreshData={refetch}
                />
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </AdminLayout>
  )
}

export default Page
