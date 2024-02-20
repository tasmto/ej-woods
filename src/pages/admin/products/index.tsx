'use client'
import React, { useEffect, useState } from 'react'
import { IoChevronBack, IoChevronForward } from 'react-icons/io5'
import { createServerSideHelpers } from '@trpc/react-query/server'
import { InferGetStaticPropsType } from 'next'
import superjson from 'superjson'

import Container from '@/components/layout/Container'
import { H1 } from '@/components/typography/Typography'
import AdminLayout from '@/features/accounts/components/AdminLayout'
import HorizontalProductCard from '@/features/products/components/HorizontalProductCard'
import clsxm from '@/lib/clsxm'
import { createClientContext } from '@/pages/api/trpc/[trpc]'
import { appRouter } from '@/server/api/routers/app.router'
import { trpc } from '@/utils/trpc'

const Page = (
  {
    // products: productsFromGSP,
  }: InferGetStaticPropsType<typeof getStaticProps>,
) => {
  const [currentPage, setCurrentPage] = useState(1)
  const { data, isLoading, isError, error, refetch } =
    trpc.products.multipleProducts.useQuery(
      {
        limit: 14,
        page: currentPage,
        type: null,
        sortBy: 'random',
        sortOrder: 'desc',
        showArchived: true,
      },
      {
        staleTime: 1000 * 60 * 60 * 24 * 7,
        // initialData: productsFromGSP,
        keepPreviousData: true,
      },
    )

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  useEffect(() => {
    refetch()
  }, [currentPage, refetch])

  if (isError || !data) {
    return <div>Still loading</div>
  }

  return (
    <AdminLayout>
      <Container level={1} className=' '>
        <div className='grid gap-6 self-center  '>
          <div className='flex justify-between'>
            <H1 as='h2' weight='normal'>
              Products ({data.count})
            </H1>
            <nav className='flex gap-0' aria-label='Navigate between pages'>
              <button
                title={`Previous page ${(data?.page || 0) - 1}`}
                disabled={(data?.page || 1) <= 1 || isLoading}
                onClick={() => {
                  handlePageChange((data?.page || 1) - 1)
                }}
                className={clsxm([
                  'rounded-l-lg border border-r-0 border-primary-100 px-3 py-2 hover:bg-primary-100 hover:text-primary-10',
                  'disabled:bg-primary-20 disabled:text-primary-100',
                ])}
              >
                <IoChevronBack />
                <span className='sr-only'>Previous page</span>
              </button>
              <button
                title={`Next Page ${(data?.page || 0) + 1}`}
                disabled={data.page >= data.totalPages || isLoading}
                onClick={() => {
                  handlePageChange((data?.page || 0) + 1)
                }}
                className={clsxm([
                  'rounded-r-lg border   border-primary-100 px-3 py-2 hover:bg-primary-100 hover:text-primary-10',
                  'disabled:bg-primary-20 disabled:text-primary-100',
                ])}
              >
                <IoChevronForward />
                <span className='sr-only'>Next page</span>
              </button>
            </nav>
          </div>

          <ul className='grid gap-2 sm:grid-cols-2 lg:grid-cols-3'>
            {data?.products?.map((product, key) => (
              <li key={key}>
                <HorizontalProductCard
                  product={product}
                  handleRefreshData={refetch}
                  showMoreInfo
                />
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </AdminLayout>
  )
}

// export const getStaticProps = async () => {
//   const ssg = createServerSideHelpers({
//     router: appRouter,
//     transformer: superjson,
//     ctx: await createClientContext(),
//   })

//   const products = await ssg.products.multipleProducts.fetch({
//     limit: 14,
//     page: 1,
//     type: null,
//     sortBy: 'random',
//     sortOrder: 'desc',
//     showArchived: true,
//   })

//   return {
//     props: {
//       products,
//     },
//     revalidate: 120,
//   }
// }

export default Page
