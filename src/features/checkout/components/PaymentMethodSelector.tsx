'use client'
import React from 'react'
import clsx from 'clsx'
import { useFormik } from 'formik'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/router'
import * as Yup from 'yup'

import Button from '@/components/buttons/Button'
import NextImage from '@/components/NextImage'
import { paymentMethods } from '@/constants/constants'
import { useCheckoutStore } from '@/features/checkout/state/CheckoutContext'

type Props = {}

const PaymentMethodSelector = (props: Props) => {
  const { updatePaymentDetails, payment_details } = useCheckoutStore(
    (state) => state
  )
  const router = useRouter()

  const formik = useFormik({
    initialValues: {
      payment_method:
        payment_details.payment_method || paymentMethods[0]?.id || '',
    },
    validationSchema: Yup.object({
      payment_method: Yup.string()
        .required('Please select a payment method')
        .lowercase()
        .trim(),
    }),
    onSubmit: async (values) => {
      updatePaymentDetails(values)

      router.push('/payment/process')
    },
  })
  return (
    <AnimatePresence mode='wait'>
      <motion.form
        onSubmit={formik.handleSubmit}
        className='grid w-full gap-3'
        layout
        initial={{ opacity: 0, x: -20 }}
        exit={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        {paymentMethods.map((method) => (
          <label
            className={clsx([
              'flex cursor-pointer items-center gap-3 rounded-xl px-4 py-2 text-primary-900',
              formik.values['payment_method'] === method.id
                ? 'border-4 border-primary-100 bg-primary-10'
                : 'border-4 border-primary-20 bg-primary-20 hover:border-primary-50/40',
              'transition-all',
            ])}
            key={method.id}
            onClick={() => formik.setFieldValue('payment_method', method.id)}
          >
            <input
              type='radio'
              name={'payment_method'}
              id={method.id}
              value={method.id}
              checked={formik.values['payment_method'] === method.id}
              // className='text-primary-100 ring-primary-50'
            />
            <label htmlFor={method.id} className='flex flex-col gap-2'>
              <span className='sr-only'>{method.name}</span>
              <NextImage
                src={method.logo}
                height={56}
                width={150}
                imgClassName='object-contain'
                className='h-10'
                alt={method.name}
                quality={100}
              />
              <NextImage
                src={method.supportedMethodsLogos}
                height={56}
                width={250}
                imgClassName='object-contain'
                className='h-12'
                alt={method.name}
                quality={100}
              />
            </label>
          </label>
        ))}

        <Button
          type='submit'
          variant='primary'
          className='mt-3 w-full justify-center justify-self-stretch text-center'
          icon={'💳'}
          iconPosition='start'
          curve='top'
          alwaysActive
          disabled={formik.isSubmitting || formik.isValidating}
        >
          Proceed to pay
        </Button>
      </motion.form>
    </AnimatePresence>
  )
}

export default PaymentMethodSelector
