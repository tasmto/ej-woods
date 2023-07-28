import React from 'react'
import { useFormik } from 'formik'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/dist/client/router'
import * as Yup from 'yup'

import Button from '@/components/buttons/Button'
import ShippingTimesInput from '@/features/checkout/components/ShippingTimesInput'
import { useCheckoutStore } from '@/features/checkout/state/CheckoutContext'
import SingleLineInput from '@/features/forms/components/SingleLineInput'
import TextArea from '@/features/forms/components/TextArea'

const CheckoutForm = () => {
  const router = useRouter()
  const { updateOrderDetails } = useCheckoutStore((state) => state)

  const formik = useFormik({
    initialValues: {
      delivery_address: '',
      delivery_phone_number: '',
      preferred_time_start: '',
      preferred_time_end: '',
    },
    validationSchema: Yup.object({
      delivery_address: Yup.string()
        .required('Please enter your address')
        .lowercase()
        .trim(),
      delivery_phone_number: Yup.number()
        .test(
          'tooLong',
          'A phone number can only have a maximum of 12 numbers',
          (val) => (val ? val?.toString().length <= 12 : false)
        )
        .test(
          'tooShort',
          'Your phone number needs to have at least 10 digits',
          (val) => (val ? val?.toString().length >= 10 : false)
        ),
      preferred_time_start: Yup.number().required(
        'Please select a starting range'
      ),
      preferred_time_end: Yup.number().required('Please select a end range'),
    }),
    onSubmit: async (values) => {
      updateOrderDetails(values)

      router.push('/payment')
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
        <TextArea
          formik={formik}
          label='Where do you want the items delivered?'
          name='delivery_address'
          placeholder='i.e 33 Granular Place, Milnerton, Cape Town.'
        />
        <SingleLineInput
          formik={formik}
          label='What phone number can we call to confirm delivery?'
          name='delivery_phone_number'
          type='text'
          placeholder='i.e. E.g. 074 635 2662'
        />
        <ShippingTimesInput
          formik={formik}
          label='What is your email?'
          name='email_address'
          type='text'
          placeholder='i.e. handsome@example.co.za'
        />

        <Button
          type='submit'
          variant='outline'
          className='mt-3 w-full justify-center justify-self-stretch text-center'
          icon={'🚀'}
          iconPosition='start'
          curve='top'
          disabled={formik.isSubmitting || formik.isValidating}
        >
          Proceed to payments
        </Button>
      </motion.form>
    </AnimatePresence>
  )
}

export default CheckoutForm
