import React from 'react'
import { useFormik } from 'formik'
import { AnimatePresence, motion } from 'framer-motion'
import * as Yup from 'yup'

import Button from '@/components/buttons/Button'
import SingleLineInput from '@/features/forms/components/SingleLineInput'

const CheckoutForm = () => {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    message: '',
  })
  const [submitted, setSubmitted] = React.useState(false)

  const handleFormMutate = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setFormData({ ...formData, [e.target.name]: e.target.value })

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      message: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('We need your name'),
      number: Yup.number()
        .max(12, 'A phone number can only have a maximum of 12 numbers')
        .min(10, 'Your phone number needs to have at least 10 digits')
        .required('We need your phone number'),
      email: Yup.string()
        .email('Please enter a valid email')
        .required('We need to know your email')
        .lowercase()
        .trim(),
      message: Yup.string().required('Please enter a message'),
      address: Yup.string()
        .required('Please enter your address')
        .lowercase()
        .trim(),
      secondaryPhone: Yup.number()
        .max(12, 'A phone number can only have a maximum of 12 numbers')
        .min(10, 'Your phone number needs to have at least 10 digits'),
      deliveryTimeStart: Yup.number().required(
        'Please select a starting range'
      ),
      deliveryTimeEnd: Yup.number().required('Please select a end range'),
    }),
    onSubmit: async (values) => {
      await console.log(JSON.stringify(values, null, 2))

      setSubmitted(true)
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
          name='phoneNumber'
          type='number'
          placeholder='i.e. E.g. 074 635 2662'
        />
        <SingleLineInput
          formik={formik}
          label='What is your email?'
          name='email'
          type='email'
          placeholder='i.e. handsome@example.co.za'
        />

        <Button
          type='submit'
          variant='outline'
          className='mt-3 w-full justify-center justify-self-stretch text-center'
          icon='💬'
          iconPosition='start'
          curve='top'
          disabled={formik.isSubmitting || formik.isValidating}
        >
          Submit
        </Button>
      </motion.form>
    </AnimatePresence>
  )
}

export default CheckoutForm
