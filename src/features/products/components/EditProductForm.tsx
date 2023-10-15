'use client'
import React, { useState } from 'react'
import { useFormik } from 'formik'
import { AnimatePresence, motion } from 'framer-motion'
import * as Yup from 'yup'

import Button from '@/components/buttons/Button'
import ArrowLink from '@/components/links/ArrowLink'
import { H2, P2 } from '@/components/typography/Typography'
import SelectInput from '@/features/forms/components/SelectInput'
import SingleLineInput from '@/features/forms/components/SingleLineInput'
import TextArea from '@/features/forms/components/TextArea'

const EditProductForm = () => {
  const [submitted, setSubmitted] = useState(false)

  const formik = useFormik({
    initialValues: {
      name: '',
      weight: 0,
      type: 'WOOD' as 'WOOD' | 'FURNITURE',
      price: 0,
      description: '',
      countInStock: 0,
      hasInfiniteStock: false,
      published: false,
      slug: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('You need to give your product a name'),
      weight: Yup.number().required('You need to give your product a weight'),
      type: Yup.string()
        .required('You need to give your product a type')
        .oneOf(['WOOD', 'FURNITURE']),
      price: Yup.number().required('You need to give your product a price'),
      description: Yup.string().required(
        'You need to give your product a description'
      ),
      countInStock: Yup.number().required(
        'You need to give your product a stock count'
      ),
      hasInfiniteStock: Yup.boolean().required(
        'You need to set if your product has infinite stock or not'
      ),
      published: Yup.boolean().required(
        'Your product needs to be published or not'
      ),
      slug: Yup.string().required(
        'You need to give your product a unique url slug'
      ),
    }),
    onSubmit: async (values) => {
      await console.log(JSON.stringify(values, null, 2))
      // Todo return an error if the form is invalid
      setSubmitted(true)
    },
  })

  return (
    <AnimatePresence mode='wait'>
      {!submitted ? (
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
            label='Product name'
            name='name'
            type='text'
            placeholder='i.e. Coffee Table'
          />
          <TextArea
            formik={formik}
            label='Product description'
            name='description'
            placeholder='i.e. This is a coffee table made from the finest wood and reinforced with steel. It is 1m x 1m x 1m and weighs 10kg. It is a beautiful piece of furniture that will last you a lifetime.'
          />
          <SelectInput
            options={[
              {
                value: 'WOOD',
                label: 'Wood',
              },
              {
                value: 'FURNITURE',
                label: 'Furniture',
              },
            ]}
            formik={formik}
            label='Product type'
            name='type'
            placeholder='i.e. This is a coffee table made from the finest wood and reinforced with steel. It is 1m x 1m x 1m and weighs 10kg. It is a beautiful piece of furniture that will last you a lifetime.'
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
      ) : (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          exit={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className='mt-2 grid w-full gap-4 rounded-xl border border-dashed  border-slate-300 bg-slate-200/80 py-8 px-4 text-slate-800'
        >
          <H2>Thank you so much!</H2>
          <P2>
            We will get back to you as soon as we can! Incase you need immediate
            assistance please contact us on our other social media channels on
            the page linked below:
          </P2>
          <motion.div
            className='mt-6 justify-self-start'
            initial={{ opacity: 0, y: 20 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <ArrowLink href='/contact'>Our contact page.</ArrowLink>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default EditProductForm
