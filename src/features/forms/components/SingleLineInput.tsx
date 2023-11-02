'use client'
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
  className?: string
  disabled?: boolean
}

const SingleLineInput = ({
  label,
  placeholder,
  name,
  formik,
  type,
  className,
  disabled,
}: Props) => {
  return (
    <motion.fieldset
      className={`flex w-full flex-col gap-2 ${className}`}
      layout
    >
      <P1
        weight='bold'
        htmlFor='name'
        as='label'
        className={clsxm([disabled && 'cursor-not-allowed text-gray-500'])}
      >
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
        disabled={disabled}
        className={clsxm([
          'ej-form-input',
          formik.touched[name] &&
            formik.errors[name] &&
            !disabled &&
            'ej-form-input-error',
          disabled && 'ej-form-input-disabled',
        ])}
      />
      {!disabled && <FormAlert formik={formik} field={name} />}
    </motion.fieldset>
  )
}

export default SingleLineInput
