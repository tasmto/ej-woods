import Link from 'next/link'
import React from 'react'

import Layout from '../../../components/Layout'
import { trpc } from '../../../utils/trpc'

const BlogPostsPage = (props: Props) => {
  const { data, isError, isLoading } = trpc.useQuery(['posts.posts'])

  return (
    <Layout>
      <section className='max-w-lg mx-auto mt-10 grid gap-6'>
        <h1 className='text-2xl md:text-3xl lg:text-4xl font-serif'>
          Our blog posts
        </h1>
        <div className='grid gap-4'>
          {isLoading || !data
            ? Array(3)
                .fill(0)
                .map((_, i) => (
                  <article
                    key={i}
                    aria-hidden
                    className='bg-slate-500/20 grid gap-2 rounded-lg shadow-lg border border-slate-400 dark:border-slate-600 hover:bg-slate-500/30 transition-colors duration-300 p-3 cursor-wait'
                  >
                    <h3 className='bg-slate-700 h-5 w-3/4 dark:bg-slate-400 rounded-full animate-pulse'></h3>
                    <p className='flex flex-wrap gap-1'>
                      <span className='bg-slate-500 rounded-xl h-3 animate-pulse w-48 max-w-full'></span>
                      <span className='bg-slate-500 rounded-xl h-3 animate-pulse w-64 max-w-full'></span>
                      <span className='bg-slate-500 rounded-xl h-3 animate-pulse w-64 max-w-full'></span>
                      <span className='bg-slate-500 rounded-xl h-3 animate-pulse w-24 max-w-full'></span>
                      <span className='bg-slate-500 rounded-xl h-3 animate-pulse w-64 max-w-full'></span>
                    </p>
                  </article>
                ))
            : data?.map(({ id, title, body }) => (
                <Link key={id} href={`/blog/${id}`}>
                  <a>
                    <article className='bg-slate-500/20 grid gap-2 rounded-lg shadow-lg border border-slate-400 dark:border-slate-600 hover:bg-slate-500/30 transition-colors duration-300 p-3'>
                      <h3 className='text-lg font-sans md:text-xl'>{title}</h3>
                      <p className='text-sm md:text-base text-slate-500'>
                        {body.length > 100 ? body.slice(0, 100) + '..' : body}
                      </p>
                    </article>
                  </a>
                </Link>
              ))}
        </div>
      </section>
    </Layout>
  )
}

export default BlogPostsPage
