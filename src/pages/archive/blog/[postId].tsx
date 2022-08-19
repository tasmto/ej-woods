import Error from 'next/error'
import { useRouter } from 'next/router'
import React from 'react'

import Layout from '../../../components/Layout'
import { trpc } from '../../../utils/trpc'

const SingleBlogPostPage = () => {
  const router = useRouter()
  const postId = router.query.postId as string

  const { data, isError, isLoading } = trpc.useQuery([
    'posts.single-post',
    { postId },
  ])

  if (isError) return <Error statusCode={404} />

  return (
    <Layout>
      <section className='max-w-lg mx-auto mt-10 grid gap-8'>
        {isLoading || !data ? (
          <>
            <h1 className='bg-slate-700 h-10 w-3/4 dark:bg-slate-400 rounded-full animate-pulse'></h1>
            <div className='grid gap-6'>
              {Array(3)
                .fill(0)
                .map((_, i) => (
                  <p className='flex flex-wrap gap-1' key={i}>
                    <span className='bg-slate-500 rounded-xl h-6 animate-pulse w-[50%] max-w-full'></span>
                    <span className='bg-slate-500 rounded-xl h-6 animate-pulse w-[30%] max-w-full'></span>
                    <span className='bg-slate-500 rounded-xl h-6 animate-pulse w-[85%] max-w-full'></span>
                    <span className='bg-slate-500 rounded-xl h-6 animate-pulse w-[45%] max-w-full'></span>
                    <span className='bg-slate-500 rounded-xl h-6 animate-pulse w-[30%] max-w-full'></span>
                  </p>
                ))}
            </div>
          </>
        ) : (
          <>
            <h1 className='text-2xl md:text-3xl lg:text-4xl font-serif'>
              {data.title}
            </h1>

            <p className='text-xl'>{data.body}</p>
          </>
        )}
      </section>
    </Layout>
  )
}

export default SingleBlogPostPage
