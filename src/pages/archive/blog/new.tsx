import { useRouter } from 'next/router'
import React from 'react'
import { useForm } from 'react-hook-form'

import Layout from '../../../components/Layout'
import { CreatePostInput } from '../../../schema/post.schema'
import clsxm from '../../../utils/clsxm'
import { trpc } from '../../../utils/trpc'

const NewPostPage = () => {
  const router = useRouter()
  const { handleSubmit, register } = useForm<CreatePostInput>()
  const { mutate, error, isLoading, isSuccess } = trpc.useMutation(
    ['posts.create-post'],
    {
      onSuccess(data) {
        setTimeout(() => {
          router.push(`/blog/${data.id}`)
        }, 2000)
      },
    }
  )

  const onSubmit = (values: CreatePostInput) => {
    mutate(values)
  }

  return (
    <Layout>
      <div className='max-w-md mx-auto mt-12 relative'>
        {(isLoading || isSuccess) && (
          <p
            className={clsxm(
              'animate-pulse text-lg md:text-xl font-mono p-6 z-20 rounded-xl w-full shadow-2xl absolute bottom-1/2 right-1/2 translate-x-1/2 after:fixed bg-teal-800 text-teal-100 '
            )}
          >
            Hang on for a sec while we create save and publish your post{' '}
            <span className='animate-spin'>🦝</span>
          </p>
        )}
        <form
          className={clsxm('grid gap-5', [
            (isLoading || isSuccess) && 'blur-[2px]',
          ])}
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className='text-2xl md:text-3xl lg:text-4xl font-serif'>
            What will you write about on this fine day?
          </h1>

          <fieldset className='grid gap-2'>
            <label htmlFor='title' className='text-base md:text-lg'>
              <span>Blog post title?</span>
              <span className='text-rose-600 ml-2'>*</span>
            </label>
            <input
              type='text'
              placeholder='i.e. What a lovely day this is...'
              {...register('title')}
              id='title'
              className='py-2 px-3 bg-slate-100 dark:bg-slate-600 dark:text-slate-300 rounded-md border-slate-500 border focus:border-slate-500'
            />
          </fieldset>
          <fieldset className='grid gap-2'>
            <label htmlFor='body' className='text-base md:text-lg'>
              <span>Content</span>
              <span className='text-rose-600 ml-2'>*</span>
            </label>
            <textarea
              id='body'
              placeholder="i.e. The sun is bright, our shirts are clean 🎶 
              We're sitting up above the sea 🎶
              Come on and share this jam with me 🎶"
              rows={4}
              {...register('body')}
              className='py-2 px-3 bg-slate-100 dark:bg-slate-600 dark:text-slate-300 rounded-md border-slate-500 border focus:border-slate-500'
            ></textarea>
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
      </div>
    </Layout>
  )
}

export default NewPostPage
