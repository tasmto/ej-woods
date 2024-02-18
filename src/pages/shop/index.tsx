'use client'
import React, { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { atom, useAtom } from 'jotai'
import Link from 'next/link'
import { useRouter } from 'next/router'

import Container from '@/components/layout/Container'
import Seo from '@/components/Seo'
import { D1, D2 } from '@/components/typography/Typography'
import { pageSize } from '@/constants/constants'
import ProductCard, {
  ProductCardSkeleton,
} from '@/features/products/components/Card'
import ShopLayout from '@/features/shop/components/ShopLayout'
import clsxm from '@/lib/clsxm'
import { trpc } from '@/utils/trpc'
import { prisma } from '@/server/createContext'
import ssg from '@/server/createSSGHelpers'
import {
  type InferGetStaticPropsType,
  type GetServerSidePropsContext,
} from 'next'
import { createServerSideHelpers } from '@trpc/react-query/server'
import { appRouter } from '@/server/api/routers/app.router'
import { createClientContext } from '@/pages/api/trpc/[trpc]'
import * as superjson from 'superjson'
import { api } from '@/utils/api'

export const productQuery = atom<'furniture' | undefined | 'wood'>(undefined)

export async function getStaticProps(
  context: GetServerSidePropsContext<{
    category: 'furniture' | 'wood'
  }>,
) {
  // get the category from the query
  const category =
    (context.params?.category as 'furniture' | 'wood' | undefined) ?? null

  // get the products
  await ssg.products.multipleProducts.prefetch({
    limit: pageSize,
    page: 1,
    type: category
      ? (category.toString().toUpperCase() as 'FURNITURE' | 'WOOD')
      : null,
    sortBy: 'random',
  })

  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
    revalidate: 1,
  }
}

const ShopPage = ({}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter()
  const [selected, setSelected] = useAtom(productQuery)

  const { data, isLoading, isError, error } =
    trpc.products.multipleProducts.useQuery(
      {
        limit: pageSize,
        page: 1,
        type: selected
          ? (selected.toString().toUpperCase() as 'FURNITURE' | 'WOOD')
          : undefined,
        sortBy: 'random',
      },
      { staleTime: 1300 },
    )

  useEffect(() => {
    if (router.query.category !== selected)
      setSelected(router.query.category as 'furniture' | 'wood')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query])

  const paths = [
    {
      path: undefined,
      label: 'All',
    },
    {
      path: 'furniture',
      label: 'Furniture',
    },
    {
      path: 'wood',
      label: 'Raw Wood',
    },
  ]
  const tabAnimations = {
    hidden: {
      scaleX: 0,
      y: '50%',
      x: '50%',
      transition: {
        duration: 0.2,
      },
    },
    visible: {
      scaleX: 1,
      y: 0,
      x: '50%',
      transition: {
        delay: 0.2,
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
    exit: {
      scaleX: 0,
      y: '50%',
      x: '50%',
      transition: {
        duration: 0.2,
      },
    },
  }
  // Todo: handle pagination
  return (
    <ShopLayout>
      <Seo templateTitle='Shop' />
      <Container
        as='div'
        role='tablist'
        level={1}
        className='flex justify-center gap-8 lg:mb-[-25px]'
      >
        {paths.map(({ path, label }, i) => (
          <Link
            legacyBehavior
            key={path ?? i}
            href={`/shop${path ? `?category=${path}` : ''}`}
          >
            <motion.a className='relative cursor-pointer'>
              <D2
                className={`${
                  router.query.category === path ||
                  (router.query.category === undefined && path === 'all')
                    ? 'opacity-100'
                    : 'opacity-80'
                }`}
              >
                {label}
              </D2>
              <AnimatePresence>
                {(router.query.category === path ||
                  (router.query.category === undefined && path === 'all')) && (
                  <motion.span
                    variants={tabAnimations}
                    initial='hidden'
                    exit='exit'
                    animate='visible'
                    className='absolute bottom-[-0.3rem] right-1/2 h-1 w-full translate-x-1/2 bg-primary-500 '
                  ></motion.span>
                )}
              </AnimatePresence>
            </motion.a>
          </Link>
        ))}
      </Container>
      {isError ? (
        <Container level={2}>
          <D1
            weight='bold'
            className='col-span-full text-center text-4xl text-slate-400 lg:text-5xl'
          >
            Could not find any products
          </D1>
        </Container>
      ) : (
        <Container
          as='section'
          level={1}
          role='tabpanel'
          className={clsxm('grid gap-5 sm:grid-cols-2 lg:grid-cols-3', [
            data?.products && 'min-h-[300px] lg:min-h-[400px]',
          ])}
        >
          <h1 className='sr-only'>
            You have currently selected to only view our {selected} products.
          </h1>
          {isLoading
            ? new Array(3)
                .fill(undefined)
                .map((_, i) => <ProductCardSkeleton key={i} />)
            : data?.products?.map((product, i) => (
                <ProductCard key={i} position={i} product={product} />
              ))}
        </Container>
      )}
    </ShopLayout>
  )
}

export default ShopPage
