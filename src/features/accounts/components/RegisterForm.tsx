import Link from 'next/link'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import TextInput from '../../../components/forms/TextInput'
import { CreateUserInput } from '../../../schema/user.schema'
import { trpc } from '../../../utils/trpc'

type Props = {
  title?: string
  showLoginLink?: boolean
}

const RegisterForm = ({ title, showLoginLink }: Props) => {
  const router = useRouter()
  const { handleSubmit, register } = useForm<CreateUserInput>()

  // Under the hood trpc is going to use react query
  const { mutate, error } = trpc.useMutation(['users.register-user'], {
    onSuccess: () => {
      router.push('/accounts/login')
    },
  })

  const onSubmit = (values: CreateUserInput) => {
    console.log(values)
    mutate(values)
  }
  return (
    <div className='grid gap-6'>
      <form className='grid gap-5' onSubmit={handleSubmit(onSubmit)}>
        <h1 className='text-2xl md:text-3xl lg:text-4xl font-serif'>{title}</h1>

        <fieldset className='grid gap-2'>
          <label htmlFor='email' className='text-base md:text-lg'>
            <span> What is your name?</span>
            <span className='text-rose-600 ml-2'>*</span>
          </label>
          <input
            type='text'
            placeholder='i.e. James Dean'
            {...register('name')}
            id={'name'}
            className='py-2 px-3 bg-slate-100 dark:bg-slate-600 dark:text-slate-300 rounded-md border-slate-500 border focus:border-slate-500'
          />
        </fieldset>
        <fieldset className='grid gap-2'>
          <label htmlFor='email' className='text-base md:text-lg'>
            <span>What is your email</span>
            <span className='text-rose-600 ml-2'>*</span>
          </label>
          <input
            type={'email'}
            id={'email'}
            placeholder='i.e. james.d@example.com'
            {...register('email')}
            className='py-2 px-3 bg-slate-100 dark:bg-slate-600 dark:text-slate-300 rounded-md border-slate-500 border focus:border-slate-500'
          />
        </fieldset>

        {error && error.message && (
          <p className='py-2 px-1 text-base bg-rose-300 text-rose-800 rounded-lg mb-2'>
            {error.message}
          </p>
        )}
        <button
          type='submit'
          className='py-3 rounded-2xl px-2 w-full bg-blue-800 text-slate-100 hover:bg-blue-900  text-lg mt-2'
        >
          Create
        </button>
      </form>
      {showLoginLink && (
        <>
          <hr className='bg-transparent border-t-2 border-dotted border-slate-300 dark:border-slate-600' />
          <Link href='/account/login'>
            <a className='font-semibold text-blue-700 underline underline-offset-2 hover:text-blue-500'>
              Login instead...
            </a>
          </Link>
        </>
      )}
    </div>
  )
}

RegisterForm.defaultProps = {
  title: 'Register an account',
  showLoginLink: true,
}

export default RegisterForm
