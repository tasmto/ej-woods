import Image from 'next/image';
import * as React from 'react';

import clsxm from '@/lib/clsxm';
import resolveIcon, { Icons } from '@/lib/iconResolver';

import UnstyledLink, {
  UnstyledLinkProps,
} from '@/components/links/UnstyledLink';
import { P2 } from '@/components/typography/Typography';

enum ButtonVariant {
  'primary',
  'outline',
  'ghost',
  'light',
}

type ButtonLinkProps = {
  isDarkBg?: boolean;
  variant?: keyof typeof ButtonVariant;
  curve?: 'top' | 'bottom' | 'topLeft' | 'topRight';
  icon?: keyof typeof Icons;
  iconPosition?: 'start' | 'end';
  alwaysActive?: boolean;
  isoView?: boolean;
} & UnstyledLinkProps;

const ButtonLink = React.forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  (
    {
      children,
      className,
      variant = 'primary',
      isDarkBg = false,
      curve = 'topRight',
      icon,
      iconPosition = 'start',
      alwaysActive,
      isoView = false,
      ...rest
    },
    ref
  ) => {
    const [iconActive, setIconActive] = React.useState(alwaysActive || false);
    return (
      <UnstyledLink
        ref={ref}
        onMouseEnter={() => setIconActive(true)}
        onMouseLeave={() => setIconActive(alwaysActive || false)}
        {...rest}
        className={clsxm(
          'inline-flex items-center gap-3 rounded-[2.3rem] py-3 px-4 font-semibold',
          'focus:outline-none focus-visible:ring focus-visible:ring-primary-500',
          'shadow-sm',
          'transition-all duration-200',
          [icon && iconPosition === 'end' && 'flex-row-reverse'],
          [icon ? 'py-3' : 'py-3'],
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
            curve === 'top' && ['rounded-t-none hover:rounded-t-[2.3rem]'],
            curve === 'bottom' && ['rounded-b-none hover:rounded-b-[2.3rem]'],
            curve === 'topRight' && [
              'rounded-tr-none hover:rounded-tr-[2.3rem]',
            ],
            curve === 'topLeft' && [
              'rounded-tl-none hover:rounded-tl-[2.3rem]',
            ],
          ],
          //#endregion  //*======== Curves ===========

          'disabled:cursor-not-allowed',
          className
        )}
      >
        {icon && (
          <Image
            src={
              resolveIcon(icon, isoView)?.[
                (!alwaysActive && 'icon') || (iconActive ? 'active' : 'icon')
              ] || ''
            }
            layout='intrinsic'
            height={30}
            width={30}
            alt=''
          />
        )}
        <P2 as='span' weight='bold'>
          {children}
        </P2>
      </UnstyledLink>
    );
  }
);

export default ButtonLink;
