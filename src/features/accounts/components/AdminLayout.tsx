'use client'
import React from 'react'
import { useAuth } from '@clerk/nextjs'
import Error from 'next/error'

import Container from '@/components/layout/Container'
import Typography from '@/components/typography/Typography'
import CartOverlay from '@/features/cart/components/CartOverlay'
import Header from '@/features/navigation/components/Header'
import Seo from '@/components/Seo'

type Props = {
  children: React.ReactNode | React.ReactNode[]
}

const AdminLayout = ({ children }: Props) => {
  const isAuthed = useAuth()

  if (!isAuthed) {
    // set up auth boundry
    return <Error statusCode={401} title='Unauthorized' />
  }

  return (
    <>
      <Header isAdmin={true} hideOnMobile={false} />
      <CartOverlay />
      <Seo templateTitle='Admin' />
      <main className='mb-16 mt-20 grid gap-16 lg:gap-20'>{children}</main>
      <Container>
        <Typography
          as='p'
          size='body3'
          className='mt-[-35px] border-t border-primary-100/40 py-4 text-center  text-primary-100'
        >
          © {new Date().getFullYear()} ej-woods | Designed and developed by{' '}
          <a
            rel='noreferrer'
            href='https://tasmto.com?utm_source=ej-woods'
            target='_blank'
          >
            Tashinga
          </a>
        </Typography>
      </Container>
    </>
  )
}

export default AdminLayout
