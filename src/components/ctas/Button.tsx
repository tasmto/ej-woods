import React from 'react'
import clsxm from '../../utils/clsxm'

enum ButtonVariants {
  'primary',
  'error',
  'success',
  'info',
  'muted',
  'ouline',
}

type Props = {
  variant?: keyof typeof ButtonVariants
  size?: 'huge' | 'large' | 'small' | 'tiny'
  onClick?: () => void
  href?: string
  className?: string
}

const Button = ({ variant, size, onClick, href, className }: Props) => {
  return (
    <button
      className={clsxm(
        'py-3 rounded-2xl px-2 w-fulltext-lg mt-2',
        // * startRegion variants
        [
          variant === 'primary' &&
            ' bg-blue-800 text-slate-100 hover:bg-blue-900',
        ]
      )}
    >
      Create
    </button>
  )
}

export default Button
