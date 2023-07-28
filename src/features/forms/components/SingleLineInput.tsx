import { motion } from 'framer-motion'
import React from 'react'

import clsxm from '@/lib/clsxm'

import { P1 } from '@/components/typography/Typography'

import FormAlert from '@/features/forms/components/FormAlert'
import { FormikProps } from 'formik'

enum InputTypes {
  'text',
  'email',
  'number',
}
type Props = {
  type: keyof typeof InputTypes
  label: string
  placeholder?: string
  name: string
  formik: FormikProps<any>
}

const SingleLineInput = ({ label, placeholder, name, formik, type }: Props) => {
  return (
    <motion.fieldset className='grid gap-2' layout>
      <P1 weight='bold' htmlFor='name' as='label'>
        {label}
      </P1>
      <input
        type={type}
        id={name}
        placeholder={placeholder || ''}
        name={name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values[name]}
        className={clsxm([
          'ej-form-input',
          formik.touched[name] && formik.errors[name] && 'ej-form-input-error',
        ])}
      />
      <FormAlert formik={formik} field={name} />
    </motion.fieldset>
  )
}

export default SingleLineInput
