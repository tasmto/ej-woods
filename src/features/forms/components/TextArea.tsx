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
}

const TextArea = ({ label, placeholder, name, formik }: Props) => {
  return (
    <fieldset className='grid gap-2'>
      <P1 weight='bold' htmlFor='name' as='label'>
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
        className={clsxm([
          'ej-form-input',
          formik.touched[name] && formik.errors[name] && 'ej-form-input-error',
        ])}
      ></textarea>

      <FormAlert formik={formik} field={name} />
    </fieldset>
  )
}

export default TextArea
