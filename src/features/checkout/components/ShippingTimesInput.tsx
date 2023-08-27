'use client'
import React from 'react'
import { FormikProps } from 'formik'
import { motion } from 'framer-motion'

import { P1 } from '@/components/typography/Typography'
import { deliveryTimes } from '@/constants/constants'
import FormAlert from '@/features/forms/components/FormAlert'

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
  const startTime = formik.values[startName] as string
  const endTime = formik.values[endName] as string

  return (
    <motion.fieldset className='grid gap-2' layout>
      <P1 weight='bold' htmlFor='name' as='label'>
        {label}
      </P1>

      <div className='grid grid-cols-2 gap-4'>
        <fieldset className='grid gap-2'>
          <select
            name={startName}
            id={startName}
            className='ej-form-input w-full self-start'
            onChange={(e) => {
              formik.handleChange(e)
              // set the end time to the next time in the array if the start time is now after the end time
              if (
                deliveryTimes.indexOf(e.target.value) >
                deliveryTimes.indexOf(endTime)
              )
                formik.setFieldValue(
                  endName,
                  deliveryTimes[deliveryTimes.indexOf(e.target.value) + 1]
                )
            }}
            onBlur={formik.handleBlur}
            value={startTime}
          >
            <option className='sr-only hidden' selected>
              pick a time
            </option>
            {deliveryTimes.slice(0, -1).map((time, i) => {
              return (
                <option value={time} key={i}>
                  {time}
                </option>
              )
            })}
          </select>
          <FormAlert formik={formik} field={endName} />
        </fieldset>
        <fieldset className='grid gap-2'>
          <select
            name={endName}
            id={endName}
            className='ej-form-input w-full self-start'
            onChange={(e) => {
              formik.handleChange(e)
              // set the start time to the previous time in the array if the end time is now before the start time
              if (
                deliveryTimes.indexOf(e.target.value) <
                deliveryTimes.indexOf(startTime)
              )
                formik.setFieldValue(
                  startName,
                  deliveryTimes[deliveryTimes.indexOf(e.target.value) - 1]
                )
            }}
            onBlur={formik.handleBlur}
            value={endTime}
          >
            {/* option just as a default value, should be unselectable afterwards */}
            <option className='sr-only hidden' selected>
              pick a time
            </option>
            {deliveryTimes.slice(1).map((time, i) => {
              return (
                <option
                  value={time}
                  key={i}
                  disabled={i < deliveryTimes.indexOf(startTime) + 1}
                >
                  {time}
                </option>
              )
            })}
          </select>
          <FormAlert formik={formik} field={startName} />
        </fieldset>
      </div>
    </motion.fieldset>
  )
}

export default ShippingTimesInput
