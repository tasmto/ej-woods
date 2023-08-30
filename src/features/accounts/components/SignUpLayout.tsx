import ContactDetailsCards from '@/components/forms/ContactDetailsCards'
import Layout from '@/components/layout/Layout'
import { D2 } from '@/components/typography/Typography'
import { contactInfo } from '@/constants/constants'

const SignUpLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Layout showFooterCta={false} className='!overflow-x-visible'>
      <div className='w-full-h-full  container flex  items-center gap-4'>
        {children}
        <div className='grid gap-8 self-center'>
          <D2 as='h2' weight='normal'>
            Our contact details.
          </D2>
          <ContactDetailsCards contactInfo={contactInfo} />
        </div>
      </div>
    </Layout>
  )
}

export default SignUpLayout
