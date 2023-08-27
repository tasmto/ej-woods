'use client'
import React from 'react'
import { ChangeHandler, UseFormRegister } from 'react-hook-form'

type Props = {
  type: 'text' | 'email'
  placeholder?: string
  name: string
  children: string
  // onChange: ChangeHandler
  // onBlur: ChangeHandler
  required: boolean
} & React.ComponentPropsWithRef<'input'>

const TextInput = ({
  type,
  placeholder,
  name,
  children,
  required,
  ref,
  ...rest
}: Props) => {
  if (!name || !children) return null

  return (
    <fieldset className='grid gap-2'>
      <label htmlFor={name} className='text-base md:text-lg'>
        {children} {required && <span className='ml-2 text-rose-600'>*</span>}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder ?? ''}
        {...rest}
        className='rounded-md border border-slate-500 bg-slate-100 py-2 px-3 focus:border-slate-500 dark:bg-slate-600 dark:text-slate-300'
      />
    </fieldset>
  )
}
TextInput.defaultProps = { required: false }

export default TextInput
