import React from 'react'

import Container from '@/components/layout/Container'
import Layout from '@/components/layout/Layout'
import NextImage from '@/components/NextImage'
import { D2, P2 } from '@/components/typography/Typography'
import ServiceCards from '@/features/services/components/Cards'

const OrdersAndReturnsPage = () => {
  return (
    <Layout>
      <Container
        as='section'
        level={1}
        className='grid grid-cols-1 items-center justify-center gap-8 md:grid-cols-2 lg:gap-20'
      >
        <Container className='overflow-y-none relative order-last grid h-full min-h-[300px] w-full content-end overflow-x-visible p-8 sm:p-10 md:order-first md:min-h-[400px]'>
          <div className='img-full-w-curve--left'>
            <NextImage
              layout='fill'
              src='https://images.unsplash.com/photo-1504624720567-64a41aa25d70?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2076&q=80'
              alt=''
              className='h-full w-full md:rounded-r-3xl'
              imgClassName='md:rounded-r-3xl object-cover w-full'
            />
          </div>
        </Container>
        <article className='grid justify-items-start gap-3 sm:gap-6 '>
          <D2 className='max-w-[600px] md:max-w-full'>
            Your bones dont break clear.
          </D2>
          <P2>
            Your bones <b>dont break</b>, mine do. Thats clear. Your cells react
            to bacteria and viruses differently than mine. You dont get sick, I
            do. Thats also clear. <b>But for some reason</b>, you and I react
            the exact same way to water. We swallow it too fast, we choke. We
            get some in our lungs, we drown.{' '}
            <b>However unreal it may seem, we are connected, you and I.</b> Were
            on the same curve, just on opposite ends.
          </P2>
        </article>
      </Container>
      <Container
        as='section'
        level={1}
        className='grid grid-cols-1 items-center justify-center gap-8 md:grid-cols-2 lg:gap-20  '
      >
        <Container className='overflow-y-none relative order-last grid h-full min-h-[300px] w-full content-end overflow-x-visible p-8 sm:p-10 md:order-last md:min-h-[400px]'>
          <div className='img-full-w-curve--right'>
            <NextImage
              layout='fill'
              src='https://images.unsplash.com/photo-1504624720567-64a41aa25d70?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2076&q=80'
              alt=''
              className='h-full w-full md:rounded-l-3xl'
              imgClassName='md:rounded-l-3xl object-cover w-full'
            />
          </div>
        </Container>
        <article className='grid justify-items-start  gap-3 sm:gap-6 '>
          <D2 className='max-w-[600px] md:max-w-full'>
            Your bones dont break.
          </D2>
          <P2>
            Your bones <b>dont break</b>, mine do. Thats clear. Your cells react
            to bacteria and viruses differently than mine. You dont get sick, I
            do. Thats also clear. <b>But for some reason</b>, you and I react
            the exact same way to water. We swallow it too fast, we choke. We
            get some in our lungs, we drown.{' '}
            <b>However unreal it may seem, we are connected, you and I.</b> Were
            on the same curve, just on opposite ends.
          </P2>
        </article>
      </Container>

      <Container as='section' level={1} className='grid gap-6'>
        <D2 className='max-w-[600px] md:max-w-full'>
          Here are the services and products we offer.
        </D2>
        <div className='grid gap-5 sm:grid-cols-3'>
          <ServiceCards include='all' />
        </div>
      </Container>
    </Layout>
  )
}

export default OrdersAndReturnsPage
