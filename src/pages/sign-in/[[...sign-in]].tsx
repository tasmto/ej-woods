import { SignIn } from '@clerk/nextjs'

import SignUpLayout from '@/features/accounts/components/SignUpLayout'

const Page = () => {
  return (
    <SignUpLayout>
      <SignIn />
    </SignUpLayout>
  )
}

export default Page
