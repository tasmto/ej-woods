import React from 'react';

import clsxm from '@/lib/clsxm';

type TypographyType = {
  children: React.ReactNode | React.ReactNode[];
  as?: React.ElementType;
  className?: string;
  size?: keyof typeof Size;
  weight?: 'normal' | 'bold' | 'semiBold' | 'light';
} & React.ComponentPropsWithRef<
  | 'div'
  | 'p'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'label'
  | 'span'
  | 'strong'
  | 'b'
  | 'figcaption'
  | 'a'
>;

enum Size {
  'display1',
  'display2',
  'display3',
  'heading1',
  'heading2',
  'heading3',
  'body1',
  'body2',
  'body3',
  'caption',
  'small',
}

const Typography = ({
  as,
  weight = 'normal',
  className,
  children,
  size = 'body2',
  ...rest
}: TypographyType) => {
  const Tag = as || 'div';

  return (
    <Tag
      className={clsxm(
        [
          weight === 'light' && ['font-light'],
          weight === 'bold' && ['font-bold'],
          weight === 'semiBold' && ['font-semibold'],
          weight === 'normal' && ['font-normal'],
        ],
        [
          size === 'display1' && [
            'text-[2.5rem] leading-tight tracking-tight lg:text-5xl',
          ],
          size === 'display2' && [
            'text-4xl leading-tight tracking-tight lg:text-[2.5rem]',
          ],
          size === 'display3' && [
            'text-3xl leading-tight tracking-tight lg:text-4xl',
          ],
          size === 'heading1' && [
            'text-[1.75rem] leading-tight  tracking-tight lg:text-[2rem]',
          ],
          size === 'heading2' && [
            'text-2xl leading-tight tracking-tight lg:text-[1.65rem]',
          ],
          size === 'heading3' && [
            'text-xl leading-tight tracking-tight lg:text-2xl',
          ],
          size === 'body1' && ['text-lg'],
          size === 'body2' && ['text-base'],
          size === 'body3' && ['text-sm'],
          size === 'caption' && ['text-sm tracking-wide'],
          size === 'small' && ['text-xs'],
        ],

        className
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
};

const D1 = ({ ...props }: TypographyType) => (
  <Typography as='h1' size='display1' {...props} />
);
const D2 = ({ ...props }: TypographyType) => (
  <Typography as='h1' size='display2' {...props} />
);
const D3 = ({ ...props }: TypographyType) => (
  <Typography as='h1' size='display3' {...props} />
);
const H1 = ({ ...props }: TypographyType) => (
  <Typography as='h1' size='heading1' {...props} />
);
const H2 = ({ ...props }: TypographyType) => (
  <Typography as='h2' size='heading2' {...props} />
);
const H3 = ({ ...props }: TypographyType) => (
  <Typography as='h3' size='heading3' {...props} />
);
const P1 = ({ ...props }: TypographyType) => (
  <Typography as='p' size='body1' {...props} />
);
const P2 = ({ ...props }: TypographyType) => (
  <Typography as='p' size='body2' {...props} />
);
const P3 = ({ ...props }: TypographyType) => (
  <Typography as='p' size='body3' {...props} />
);
const Caption = ({ ...props }: TypographyType) => (
  <Typography as='span' size='caption' {...props} />
);

export default Typography;
export { Caption, D1, D2, D3, H1, H2, H3, P1, P2, P3 };
