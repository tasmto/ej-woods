import Image from "next/image"
import * as React from 'react'
import { ImSpinner2 } from 'react-icons/im'

import clsxm from '@/lib/clsxm'
import resolveIcon, { Icons } from '@/lib/iconResolver'

enum ButtonVariant {
  'primary',
  'outline',
  'ghost',
  'light',
}

type ButtonProps = {
  isLoading?: boolean
  isDarkBg?: boolean
  variant?: keyof typeof ButtonVariant
  curve?: 'top' | 'bottom' | 'topLeft' | 'topRight'
  icon?: keyof typeof Icons
  iconPosition?: 'start' | 'end'
  alwaysActive?: boolean
  isoView?: boolean
} & React.ComponentPropsWithRef<'button'>

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      curve = 'topRight',
      icon,
      iconPosition = 'start',
      disabled: buttonDisabled,
      isLoading,
      variant = 'primary',
      isDarkBg = false,
      alwaysActive,
      isoView = false,
      ...rest
    },
    ref
  ) => {
    const disabled = isLoading || buttonDisabled
    const [iconActive, setIconActive] = React.useState(alwaysActive || false)

    return (
      <button
        ref={ref}
        onMouseEnter={() => setIconActive(true)}
        onMouseLeave={() => setIconActive(alwaysActive || false)}
        type='button'
        disabled={disabled}
        className={clsxm(
          'inline-flex items-center gap-3 rounded-3xl  px-4 font-semibold',
          'focus:outline-none focus-visible:ring focus-visible:ring-primary-500',
          'shadow-sm',
          'transition-all duration-200',
          [icon && iconPosition === 'end' && 'flex-row-reverse'],
          [icon ? 'py-2' : 'py-[0.65rem]'],
          //#region  //*=========== Variants ===========
          [
            variant === 'primary' && [
              'bg-primary-500 text-white',
              'border border-primary-600',
              'hover:bg-primary-400 hover:text-slate-200',
              'active:bg-primary-500',
              'disabled:bg-primary-200 disabled:hover:bg-primary-300',
            ],
            variant === 'outline' && [
              'text-primary-500',
              'border-2 border-primary-500',
              'hover:bg-primary-500 hover:text-white active:bg-primary-400 disabled:bg-primary-100',
              isDarkBg &&
                'hover:bg-gray-900 active:bg-gray-800 disabled:bg-gray-800',
            ],
            variant === 'ghost' && [
              'text-primary-500',
              'shadow-none',
              'hover:bg-primary-50/50 active:bg-primary-100 disabled:bg-primary-100',
              isDarkBg &&
                'hover:bg-gray-900 active:bg-gray-800 disabled:bg-gray-800',
            ],
            variant === 'light' && [
              'bg-white text-dark ',
              'border border-gray-300',
              'hover:bg-gray-100 hover:text-dark',
              'active:bg-white/80 disabled:bg-gray-200',
            ],
          ],
          //#endregion  //*======== Variants ===========

          //#region  //*=========== Curves ===========
          [
            curve === 'top' && ['rounded-t-none hover:rounded-t-3xl'],
            curve === 'bottom' && ['rounded-b-none hover:rounded-b-3xl'],
            curve === 'topRight' && ['rounded-tr-none hover:rounded-tr-3xl'],
            curve === 'topLeft' && ['rounded-tl-none hover:rounded-tl-3xl'],
          ],
          //#endregion  //*======== Curves ===========

          'disabled:cursor-not-allowed',
          isLoading &&
            'relative rounded-full text-transparent transition-none hover:text-transparent disabled:cursor-wait',
          className
        )}
        {...rest}
      >
        {isLoading && (
          <div
            className={clsxm(
              'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
              {
                'text-white': ['primary', 'dark'].includes(variant),
                'text-black': ['light'].includes(variant),
                'text-primary-500': ['outline', 'ghost'].includes(variant),
              }
            )}
          >
            <ImSpinner2 className='animate-spin' />
          </div>
        )}

        {icon && (
          <Image
            src={
              resolveIcon(icon, isoView)?.[
                (disabled && !alwaysActive && 'icon') ||
                  (iconActive ? 'active' : 'icon')
              ] || ''
            }
            height={30}
            width={30}
            alt=''
            style={{
              maxWidth: "100%",
              height: "auto"
            }} />
        )}
        <span>{children}</span>
      </button>
    );
  }
)

export default Button
