import React from 'react'

import Container from '@/components/layout/Container'
import Layout from '@/components/layout/Layout'
import RegionMap from '@/components/maps/RegionMap'
import { D2 } from '@/components/typography/Typography'
import ContactForm from '@/features/forms/ContactForm'

const ContactPage = () => {
  return (
    <Layout>
      <Container
        as='section'
        level={1}
        className='grid grid-cols-1 items-center justify-center gap-14 md:grid-cols-2  lg:gap-20'
      >
        <div className='grid justify-items-start gap-8  '>
          <D2 className='max-w-[600px] md:max-w-full'>
            Fill in the form below if you have any questions and we will get
            right back to you.
          </D2>
          <ContactForm />
        </div>
        <RegionMap />
      </Container>
    </Layout>
  )
}

export default ContactPage
