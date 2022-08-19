import { useAtom } from 'jotai'
import type { NextPage } from 'next'
import Link from 'next/link'
import { useEffect } from 'react'

import Layout from '../../components/Layout'
import { userAtom } from '../../features/accounts/state/userState'
import { trpc } from '../../utils/trpc'

const Home: NextPage = () => {
  const [currentUser, setCurrentUser] = useAtom(userAtom)
  const { data, isLoading } = trpc.useQuery(['users.me'], {
    staleTime: 3 * 60 * 60 * 1000, // stale after 3hrs
  })

  useEffect(() => {
    setCurrentUser(data)
  }, [isLoading])

  return (
    <Layout>
      {!currentUser ? (
        <div className='mx-auto mt-10 max-w-lg'>
          <Link href='/account/login'>
            <a className='rounded-xl bg-slate-400 px-3 py-2 text-slate-800 hover:bg-slate-500'>
              Login
            </a>
          </Link>
        </div>
      ) : (
        <h1>Hi User</h1>
      )}
    </Layout>
  )
}

export default Home
