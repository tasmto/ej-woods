import React from 'react'

const Wrapper = ({
  children,
}: {
  children: React.ReactNode | React.ReactNode[]
}) => {
  return (
    <div className='bg-gray-50 bg-[url("/images/glow.png")] bg-auto bg-top  bg-no-repeat pt-10 pb-24 selection:bg-primary-500 selection:text-primary-50 sm:pb-2 sm:pt-20 md:pt-24'>
      {children}
    </div>
  )
}

export default Wrapper
