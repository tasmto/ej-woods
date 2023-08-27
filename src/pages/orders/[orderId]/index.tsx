'use client'
import React from 'react'
import { ProductImage } from '@prisma/client'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/router'

import Container from '@/components/layout/Container'
import ArrowLink from '@/components/links/ArrowLink'
import Seo from '@/components/Seo'
import { H1, P1, P2 } from '@/components/typography/Typography'
import { paymentMethods } from '@/constants/constants'
import ProductsTable from '@/features/products/components/ProductsTable'
import ShopLayout from '@/features/shop/components/ShopLayout'
import { FormatCurrency, FormatDate } from '@/lib/FormatNumber'
import { trpc } from '@/utils/trpc'

type Props = {}

const SingleOrderPage = (props: Props) => {
  const router = useRouter()
  const { orderId } = router.query

  const {
    data: order,
    isLoading,
    isError,
    error,
  } = trpc.useQuery(
    [
      'orders.get-order',
      {
        orderId: Number(orderId),
      },
    ],
    { staleTime: Infinity }
  )

  return isLoading ? (
    <div>Loading</div>
  ) : isError || !order ? (
    <div>Error</div>
  ) : (
    <ShopLayout>
      <Seo templateTitle='Checkout' />
      <Container
        as='section'
        level={1}
        className='grid grid-cols-1 items-stretch justify-center gap-14 md:grid-cols-2 lg:gap-20'
      >
        <AnimatePresence mode='wait'>
          <article className='flex h-full flex-col items-start justify-center gap-2 rounded-xl border-2 border-dashed border-slate-400 p-6 md:p-4'>
            <H1 className=''>Order Summary</H1>

            <P1 className=' text-primary-300'>
              Overview: <strong>{order.totalQuantity}</strong> items · Total
              Price: <strong>{FormatCurrency(order.totalPrice)}</strong>
            </P1>
            <div className='mt-6'>
              {[
                {
                  name: 'Order Id',
                  value: order.id,
                },
                {
                  name: 'Ordered at',
                  value: FormatDate(order.createdAt, {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  }),
                },
                {
                  name: 'Delivery address',
                  value: order?.deliveryAddress,
                },
                {
                  name:
                    order.deliveryStatus === 'DELIVERED'
                      ? 'Delivered at'
                      : 'Delivery status',
                  value:
                    order.deliveryStatus === 'DELIVERED'
                      ? FormatDate(order?.deliveredAt || '', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })
                      : order.deliveryStatus,
                },
                {
                  name: 'Phone number',
                  value:
                    order?.deliveryPhoneNumber || order.customerPhoneNumber,
                },
                {
                  name: 'Payment method',
                  value: paymentMethods.find(
                    (method) => method.id === order.paymentMethod
                  )?.name,
                },
                {
                  name: 'Payment status',
                  value: order.status,
                },
              ].map((field, i) => (
                <P2 className='flex gap-2' key={i}>
                  <span>{field.name}:</span>
                  <span>{field.value}</span>
                </P2>
              ))}
            </div>

            <motion.div
              className='mt-6 justify-self-start'
              initial={{ opacity: 0, y: 20 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <ArrowLink href='/contact'>Download Invoice</ArrowLink>
            </motion.div>
            <motion.div
              className='mt-2 justify-self-start'
              initial={{ opacity: 0, y: 20 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <ArrowLink href='/contact'>Go back to shop</ArrowLink>
            </motion.div>
          </article>
        </AnimatePresence>
        <aside className='flex w-full flex-col gap-4'>
          <H1>What you ordered:</H1>
          <ProductsTable
            products={order.products.map((product) => ({
              name: product.product.name,
              price: product.price,
              quantity: product.quantity,
              type: product.product.type,
              image: product.product.images[0] as ProductImage,
              weight: product.product.weight,
              id: product.productId,
            }))}
            className='md:max-h-[68vh] md:overflow-y-auto'
          />
        </aside>
      </Container>
    </ShopLayout>
  )
}

export default SingleOrderPage
