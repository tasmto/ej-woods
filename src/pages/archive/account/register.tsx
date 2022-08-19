import dynamic from 'next/dynamic'
import React from 'react'

import Layout from '../../../components/Layout'

const RegisterForm = dynamic(
  () => import('../../../features/accounts/components/RegisterForm'),
  {
    ssr: false,
  }
)

const RegisterPage = () => {
  return (
    <Layout>
      <div className='max-w-md mx-auto mt-12'>
        <RegisterForm />
      </div>
    </Layout>
  )
}

export default RegisterPage
