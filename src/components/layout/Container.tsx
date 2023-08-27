'use client'
import React from 'react'

import clsxm from '@/lib/clsxm'

type Props = {
  children: React.ReactNode
  level?: 0 | 1 | 2 | 3 | 4
  as?: React.ElementType
  className?: string
} & React.HTMLAttributes<Element>

/**
 * @description: A container component that wraps its children in a div (as a defined tag) with a specific level of nesting.
 * @param level 1: default, 2:  (2 cols), 3: (4 cols), 4: (6 cols), 0: (no nesting)
 * @param as: React Element you want rendered
 */
const Container = ({ children, level = 0, as, className, ...rest }: Props) => {
  const Tag = as || 'div'

  return (
    <Tag
      {...rest}
      className={clsxm(
        'container mx-auto',

        //#region  //*=========== Levels ===========
        [
          level === 0 && ['max-w-full'],
          level === 1 && ['max-w-6xl px-2 md:px-6 lg:px-8 xl:px-0'],
          level === 2 && ['max-w-5xl px-2 md:px-6 lg:px-8 xl:px-0'],
          level === 3 && ['max-w-4xl px-2 md:px-6 lg:px-8 xl:px-0'],
          level === 4 && ['max-w-3xl px-2 md:px-6 lg:px-8 xl:px-0'],
        ],
        //#endregion  //*=========== Levels ===========
        className
      )}
    >
      {children}
    </Tag>
  )
}

export default Container
