'use client'
import React from 'react'

type Props = {
  children: React.ReactNode | React.ReactNode[]
}

const Layout = ({ children }: Props) => {
  return (
    <main className='min-w-screen relative min-h-screen overflow-y-auto bg-slate-50 py-6 text-slate-800 dark:bg-slate-900 dark:text-slate-100'>
      {children}
    </main>
  )
}

export default Layout
