'use client'
import React from 'react'
import { FormikProps } from 'formik'
import { motion } from 'framer-motion'

import { P1 } from '@/components/typography/Typography'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import FormAlert from '@/features/forms/components/FormAlert'
type Props = {
  label: string
  placeholder?: string
  name: string
  formik: FormikProps<any>
  options: {
    value: string
    label: string
  }[]
}

const SelectInput = ({ label, placeholder, name, formik, options }: Props) => {
  return (
    <motion.fieldset className='grid gap-2' layout>
      <P1 weight='bold' htmlFor='name' as='label' className=''>
        {label}
      </P1>
      <Select
        onValueChange={formik.handleBlur}
        defaultValue={formik.values[name]}
      >
        <SelectTrigger className='max-w-'>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options.map(({ value, label }, i) => (
              <SelectItem key={i} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <FormAlert formik={formik} field={name} />
    </motion.fieldset>
  )
}

export default SelectInput
