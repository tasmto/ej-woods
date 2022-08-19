import React from 'react'

type Props = {
  children: React.ReactNode | React.ReactNode[]
}

const Layout = ({ children }: Props) => {
  return (
    <main className='min-w-screen min-h-screen overflow-y-auto bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 py-6 relative'>
      {children}
    </main>
  )
}

export default Layout
