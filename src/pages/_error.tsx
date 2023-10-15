import * as React from 'react'
import { NextApiResponse } from 'next'
import Image from 'next/image'

import Container from '@/components/layout/Container'
import Layout from '@/components/layout/Layout'
import ButtonLink from '@/components/links/ButtonLink'
import Seo from '@/components/Seo'
import { D1, D3 } from '@/components/typography/Typography'
import { errorPageGif } from '@/constants/constants'

const Error = ({ statusCode }: { statusCode: number }) => {
  return (
    <Layout>
      <Seo templateTitle='error error' />
      <Container
        as='section'
        level={1}
        className='grid grid-cols-1 items-center justify-center gap-14 md:grid-cols-2 md:gap-12 lg:grid-cols-5 '
      >
        <Container
          as='article'
          className='grid justify-items-start gap-6 pt-10 pb-0  md:pt-20 md:pb-16 lg:col-span-2'
        >
          <D1 className=''>{statusCode}</D1>
          <D3>Hey, something seems to have gone wrong</D3>
          <ButtonLink variant='outline' href='/'>
            Go back to the homepage
          </ButtonLink>
        </Container>
        <Container className='h-full w-full lg:col-span-3'>
          <Image
            alt=''
            width={480}
            height={200}
            className='h-full w-full object-contain'
            src={errorPageGif}
          />
        </Container>
      </Container>
    </Layout>
  )
}
Error.getInitialProps = ({
  res,
  err,
}: {
  res: NextApiResponse
  err: NextApiResponse
}) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}
export default Error
