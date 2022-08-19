import Link from 'next/link'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import TextInput from '../../../components/forms/TextInput'
import { CreateUserInput } from '../../../schema/user.schema'
import { trpc } from '../../../utils/trpc'
import clsxm from '../../../utils/clsxm'
import { useAtom, useSetAtom } from 'jotai'
import { userAtom } from '../state/userState'
import { timeUntilStale } from 'react-query/types/core/utils'

const VerifyingToken = ({ hash }: { hash: string }) => {
  const router = useRouter()

  const { data, isLoading } = trpc.useQuery([
    'users.verify-otp',
    {
      hash,
    },
  ])

  if (data)
    setTimeout(() => {
      router.push(data.redirect.includes('login') ? '/' : data.redirect)
    }, 2000)

  return (
    <p
      className={clsxm(
        'animate-pulse text-lg md:text-xl font-mono p-6 z-20 rounded-xl w-full shadow-2xl absolute bottom-1/2 right-1/2 translate-x-1/2 after:fixed bg-slate-500',
        [data && 'bg-teal-800 text-teal-100 animate-none']
      )}
    >
      {(isLoading || !data) &&
        'Hang on a sec while we verify you are who you say you are... 🦝'}
      {data &&
        "Alright punk, secret code excepted (I've still got my eye on you..."}
    </p>
  )
}

type LoginFormProps = {
  title?: string
  showLoginLink?: boolean
}

const LoginForm = ({ title, showLoginLink }: LoginFormProps) => {
  const router = useRouter()
  const hash = router.asPath.split('#token=').at(1)

  const { handleSubmit, register } = useForm<CreateUserInput>()
  const [success, setSuccess] = useState(false)
  const [currentUser, setCurrentUser] = useAtom(userAtom)

  // Under the hood trpc is going to use react query
  const { mutate, error, data } = trpc.useMutation(['users.request-otp'], {
    onSuccess: () => {
      setSuccess(true)

      // Add back the user to state
      setCurrentUser(data)
    },
    onError: () => router.push(router.pathname),
  })

  const onSubmit = (values: CreateUserInput) => {
    setSuccess(false)
    setCurrentUser(null) // Remove possible current user from state
    mutate({ ...values, redirect: router.asPath })
  }

  // todo: display do you want to logout if currentUser is defined
  return (
    <div className='grid gap-6'>
      {hash && <VerifyingToken hash={hash} />}
      <form
        className={clsxm('grid gap-5', [hash && 'opacity-80 blur-[2px]'])}
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className='text-2xl md:text-3xl lg:text-4xl font-serif'>{title}</h1>
        {success && (
          <p className='py-2 px-3 text-base bg-teal-400 text-teal-800 rounded-lg mb-2 shadow-inner'>
            <b>Please check your email for a login link</b> (you can close this
            tab 🦝).
          </p>
        )}
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
          <p className='py-2 px-3 text-base bg-rose-300 text-rose-800 rounded-lg mb-2 shadow-inner'>
            {error.message}
          </p>
        )}
        <button
          type='submit'
          className='py-3 rounded-2xl px-2 w-full bg-blue-800 text-slate-100 hover:bg-blue-900  text-lg mt-2'
        >
          Login
        </button>
      </form>
      {showLoginLink && (
        <>
          <hr className='bg-transparent border-t-2 border-dotted border-slate-300 dark:border-slate-600' />
          <Link href='/account/register'>
            <a className='font-semibold text-blue-700 underline underline-offset-2 hover:text-blue-500'>
              Register instead...
            </a>
          </Link>
        </>
      )}
    </div>
  )
}

LoginForm.defaultProps = {
  title: 'Login to your account',
  showLoginLink: true,
}

export default LoginForm
