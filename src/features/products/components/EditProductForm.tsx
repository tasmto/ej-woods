'use client'
import React from 'react'
import { Product, ProductImage } from '@prisma/client'
import { useFormik } from 'formik'
import { AnimatePresence, motion } from 'framer-motion'
import * as Yup from 'yup'

import Button from '@/components/buttons/Button'
import CheckboxInput from '@/features/forms/components/CheckboxInput'
import SelectInput from '@/features/forms/components/SelectInput'
import SingleLineInput from '@/features/forms/components/SingleLineInput'
import TextArea from '@/features/forms/components/TextArea'

type Props = {
  product?: Product & {
    images: ProductImage[]
    crossSells: (Product & {
      images: ProductImage[]
    })[]
  }
}

const EditProductForm = ({ product }: Props) => {
  const formik = useFormik({
    initialValues: {
      name: product ? product.name : '',
      weight: product ? product.weight : 0,
      type: product ? product.type : 'WOOD',
      price: product ? product.price : 0,
      description: product ? product.description : '',
      countInStock: product ? product.countInStock : 0,
      hasInfiniteStock: product ? product.hasInfiniteStock : false,
      published: product ? product.published : false,
      slug: product ? product.slug : '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('You need to give your product a name'),
      weight: Yup.number()
        .required('You need to give your product a weight')
        .min(0.1, 'Your product needs to weigh at least 0.1kg'),
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
      // eslint-disable-next-line no-console
      console.log(JSON.stringify(values, null, 2))
      // Todo return an error if the form is invalid
    },
  })

  return (
    <AnimatePresence mode='wait'>
      <motion.form
        onSubmit={formik.handleSubmit}
        className='grid w-full gap-5'
        layout
        initial={{ opacity: 0, x: -20 }}
        exit={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <SingleLineInput
          formik={{
            ...formik,
            handleChange: (e: any) => {
              formik.handleChange(e)
              const slug: string =
                e?.target?.value.toLowerCase().replace(/ /g, '-') || ''
              const isSlugGeneratedFromName =
                formik.values.slug === slug ||
                formik.values.slug === '' ||
                formik.values.slug.length - slug.length > 1 ||
                formik.values.slug.length - slug.length < -1

              if (formik.values.slug === '' || isSlugGeneratedFromName) {
                formik.setFieldValue('slug', slug)
              }
            },
          }}
          label='Product name'
          name='name'
          type='text'
          placeholder='i.e. Coffee Table'
        />
        <SingleLineInput
          formik={formik}
          label='Product slug (url)'
          name='slug'
          type='text'
          placeholder='i.e. coffee-table'
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
        <SingleLineInput
          formik={formik}
          label='Price of the product'
          name='price'
          type='number'
          placeholder='i.e. 20000'
        />
        <fieldset className='flex flex-col gap-5 sm:flex-row'>
          <SingleLineInput
            formik={formik}
            label="Weight (in kg's)"
            name='weight'
            type='number'
            placeholder='i.e. 1kg'
          />
          <SingleLineInput
            formik={formik}
            label='Products in stock'
            name='countInStock'
            type='number'
            placeholder='i.e. 20000'
            disabled={formik.values.hasInfiniteStock}
          />
        </fieldset>

        <CheckboxInput
          formik={formik}
          label='Is this product published?'
          name='published'
        />
        <CheckboxInput
          formik={formik}
          label='Does this product have infinite stock?'
          name='hasInfiniteStock'
        />

        <Button
          type='submit'
          variant='outline'
          className='mt-3 w-full justify-center justify-self-stretch text-center'
          icon='🚀'
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

export default EditProductForm
