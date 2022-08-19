import dynamic from 'next/dynamic'
import React from 'react'

import Layout from '../../../components/Layout'

const LoginForm = dynamic(
  () => import('../../../features/accounts/components/LoginForm'),
  {
    ssr: false,
  }
)

const RegisterPage = () => {
  return (
    <Layout>
      <div className='max-w-md mx-auto mt-12 relative'>
        <LoginForm />
      </div>
    </Layout>
  )
}

export default RegisterPage
