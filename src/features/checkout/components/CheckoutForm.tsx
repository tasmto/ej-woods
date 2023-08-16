import React from 'react'
import { useFormik } from 'formik'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/dist/client/router'
import * as Yup from 'yup'

import Button from '@/components/buttons/Button'
import { useCheckoutStore } from '@/features/checkout/state/CheckoutContext'
import SingleLineInput from '@/features/forms/components/SingleLineInput'

const CheckoutForm = () => {
  const router = useRouter()
  const { updateCustomerDetails, customer_details } = useCheckoutStore(
    (state) => state
  )

  const formik = useFormik({
    initialValues: {
      name: customer_details.name,
      phone_number: customer_details.phone_number,
      email_address: customer_details.email_address,
    },
    validationSchema: Yup.object({
      name: Yup.string().required('We need your name'),
      phone_number: Yup.number()
        .required('We need your phone number')
        .test(
          'tooLong',
          'A phone number can only have a maximum of 12 numbers',
          (val) => (val ? val?.toString().length <= 11 : false)
        )
        .test(
          'tooShort',
          'Your phone number needs to have at least 10 digits',
          (val) => (val ? val?.toString().length >= 9 : false)
        ),
      email_address: Yup.string()
        .email('Please enter a valid email')
        .required('We need to know your email')
        .lowercase()
        .trim(),
    }),
    onSubmit: async (values) => {
      updateCustomerDetails(values)

      router.push('/shipping')
    },
  })

  return (
    <AnimatePresence exitBeforeEnter>
      <motion.form
        onSubmit={formik.handleSubmit}
        className='grid w-full gap-5'
        layout
        initial={{ opacity: 0, x: -20 }}
        exit={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <SingleLineInput
          formik={formik}
          label='What is your name?'
          name='name'
          type='text'
          placeholder='i.e. Handsome'
        />
        <SingleLineInput
          formik={formik}
          label='What is your phone number?'
          name='phone_number'
          type='number'
          placeholder='i.e. E.g. 074 635 2662'
        />
        <SingleLineInput
          formik={formik}
          label='What is your email?'
          name='email_address'
          type='email'
          placeholder='i.e. handsome@example.co.za'
        />

        <Button
          type='submit'
          variant='outline'
          className='mt-3 w-full justify-center justify-self-stretch text-center'
          icon='🛒'
          iconPosition='start'
          curve='top'
          disabled={formik.isSubmitting || formik.isValidating}
        >
          Next 1/2
        </Button>
      </motion.form>
    </AnimatePresence>
  )
}

export default CheckoutForm
