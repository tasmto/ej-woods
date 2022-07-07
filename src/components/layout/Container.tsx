import React from 'react';

type Props = {
  children: React.ReactNode;
  level?: 0 | 1 | 2 | 3;
  as?: React.ElementType;
  className?: string;
};

/**
 * @description: Controls the indentation of content mostly on large screens.
 * @param level 0: default, 1:  (2 cols), 2: (4 cols), 3: (6 cols)
 * @param as: React Element you want rendered
 */
const Container = ({
  children,
  level = 0,
  as = 'div',
  className = '',
}: Props) => {
  const Tag = as;
  const classes = `container mx-auto
  ${level === 0 && 'px-2 md:px-6 lg:px-8 xl:px-0 max-w-6xl'}
  ${level === 1 && 'px-2 md:px-6 lg:px-8 xl:px-0 max-w-5xl'}
  ${level === 2 && 'px-2 md:px-6 lg:px-8 xl:px-0 max-w-4xl'}
  ${level === 3 && 'px-2 md:px-6 lg:px-8 xl:px-0 max-w-3xl'}
  ${className};
  `;
  return <Tag className={classes}>{children}</Tag>;
};

export default Container;
