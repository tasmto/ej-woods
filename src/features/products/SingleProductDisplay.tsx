import React from 'react'
import { motion } from 'framer-motion'

import Container from '@/components/layout/Container'
import NextImage from '@/components/NextImage'
import Typography from '@/components/typography/Typography'
import AddToCartSection from '@/features/cart/components/AddToCartSection'
import { SingleProductType } from '@/schema/product.schema'

type Props = {
  product: SingleProductType
}

const SingleProductDisplay = ({ product }: Props) => {
  return (
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
            src={product.images[0] ?? ''}
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
          <Typography
            as='h1'
            size='display1'
            className='max-w-[600px] md:max-w-full'
          >
            {product.name}
          </Typography>
        </div>

        <AddToCartSection product={product} />

        <Typography
          size='body2'
          as='p'
          className='tracking-tight text-primary-300'
        >
          <b>Description: </b>
          {product.description}
        </Typography>
      </motion.article>
    </Container>
  )
}

export default SingleProductDisplay
