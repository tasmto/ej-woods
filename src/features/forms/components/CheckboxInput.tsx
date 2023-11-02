'use client'
import React from 'react'
import { FormikProps } from 'formik'
import { motion } from 'framer-motion'

import { P1 } from '@/components/typography/Typography'
import { Checkbox } from '@/components/ui/checkbox'
import FormAlert from '@/features/forms/components/FormAlert'
type Props = {
  label: string
  name: string
  formik: FormikProps<any>
}

const CheckboxInput = ({ label, name, formik }: Props) => {
  return (
    <motion.fieldset className='flex items-center gap-2' layout>
      <Checkbox
        id={name}
        onChange={formik.handleChange}
        value={formik.values[name]}
      />
      <P1 weight='bold' htmlFor={name} as='label' className='cursor-pointer'>
        {label}
      </P1>
      <FormAlert formik={formik} field={name} />
    </motion.fieldset>
  )
}

export default CheckboxInput
