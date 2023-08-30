import React from 'react'

import ssg from '@/server/createSSGHelpers'

type Props = {}

const Page = (props: Props) => {
  return <div>Page</div>
}

export const getStaticProps = async () => {
  const products = await ssg.products.multipleProducts.fetch({
    limit: 7,
  })

  return {
    props: {
      contactInfo: {
        openingHours:
          'Open 6am/10pm Monday - Friday & 8am - 6pm Saturday- Sunday',
        phoneNumber: '+27 65 000 0000',
        email: 'info@ej-wood.co.za',
        whatsAppLink: 'https://wa.me/0000000000',
        location: '0000 Street Name, City, Province, Country',
      },
      products,
    },
    revalidate: 120,
  }
}

export default Page
