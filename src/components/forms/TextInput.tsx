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
        {children} {required && <span className='text-rose-600 ml-2'>*</span>}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder ?? ''}
        {...rest}
        className='py-2 px-3 bg-slate-100 dark:bg-slate-600 dark:text-slate-300 rounded-md border-slate-500 border focus:border-slate-500'
      />
    </fieldset>
  )
}
TextInput.defaultProps = { required: false }

export default TextInput
