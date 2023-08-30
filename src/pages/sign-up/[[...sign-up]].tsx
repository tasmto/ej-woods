import { SignUp } from '@clerk/nextjs'

import SignUpLayout from '@/features/accounts/components/SignUpLayout'

const Page = () => {
  return (
    <SignUpLayout>
      <SignUp />
    </SignUpLayout>
  )
}

export default Page
