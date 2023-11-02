'use client'
import React from 'react'
import { FormikProps } from 'formik'

import { P1 } from '@/components/typography/Typography'
import FormAlert from '@/features/forms/components/FormAlert'
import clsxm from '@/lib/clsxm'

type Props = {
  label: string
  placeholder?: string
  name: string
  formik: FormikProps<any>
  disabled?: boolean
}

const TextArea = ({ label, placeholder, name, formik, disabled }: Props) => {
  return (
    <fieldset className='grid gap-2'>
      <P1
        weight='bold'
        htmlFor='name'
        as='label'
        className={clsxm([disabled && 'cursor-not-allowed text-gray-500'])}
      >
        {label}
      </P1>
      <textarea
        id={name}
        placeholder={placeholder || ''}
        name={name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values[name]}
        rows={3}
        disabled={disabled}
        className={clsxm([
          'ej-form-input',
          formik.touched[name] &&
            formik.errors[name] &&
            !disabled &&
            'ej-form-input-error',
          disabled && 'ej-form-input-disabled',
        ])}
      ></textarea>

      {!disabled && <FormAlert formik={formik} field={name} />}
    </fieldset>
  )
}

export default TextArea
