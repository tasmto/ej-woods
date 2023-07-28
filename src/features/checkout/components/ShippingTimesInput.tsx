import React from 'react'
import { FormikProps } from 'formik'
import { motion } from 'framer-motion'

import { P1 } from '@/components/typography/Typography'
import { deliveryEndTime, deliveryStartTime } from '@/constants/constants'
import FormAlert from '@/features/forms/components/FormAlert'
import clsxm from '@/lib/clsxm'

type Props = {
  label: string
  placeholder?: string
  startName: string
  endName: string
  formik: FormikProps<any>
}

const ShippingTimesInput = ({
  label,
  placeholder,
  startName,
  endName,
  formik,
}: Props) => {
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
      <div className='flex gap-4'>
        <select
          name={startName}
          id={startName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        >
          {Array(Math.abs(deliveryEndTime - deliveryStartTime))
            .fill(null)
            .map((_, i) => {
              return (
                <option value={deliveryStartTime + i} key={i}>
                  {(deliveryStartTime + i).toString().padStart(2, '0')}:00
                </option>
              )
            })}

          <option value='saab'>Saab</option>
          <option value='mercedes'>Mercedes</option>
          <option value='audi'>Audi</option>
        </select>
      </div>
      <FormAlert formik={formik} field={name} />
    </motion.fieldset>
  )
}

export default ShippingTimesInput
