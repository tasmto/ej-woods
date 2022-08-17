import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';
import React from 'react';

import Container from '@/components/layout/Container';
import { D2 } from '@/components/typography/Typography';

const TabSelector = () => {
  const router = useRouter();

  const paths = [
    {
      path: 'all',
      label: 'All',
    },
    {
      path: 'furniture',
      label: 'Furniture',
    },
    {
      path: 'wood',
      label: 'Raw Wood',
    },
  ];
  const variants = {
    hidden: {
      scaleX: 0,
      y: '50%',
      x: '50%',
      transition: {
        duration: 0.2,
      },
    },
    visible: {
      scaleX: 1,
      y: 0,
      x: '50%',
      transition: {
        delay: 0.2,
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
    exit: {
      scaleX: 0,
      y: '50%',
      x: '50%',
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <Container
      as='div'
      role='tablist'
      level={1}
      className=' flex justify-center gap-8'
    >
      {paths.map(({ path, label }) => (
        <motion.button
          key={path}
          aria-selected={router.query.category === path ? 'true' : 'false'}
          role='tab'
          onClick={() =>
            router.push({
              pathname: '/shop',
              query: { ...router.query, category: path },
            })
          }
          className='relative'
        >
          <D2
            className={`${
              router.query.category === path ||
              (router.query.category === undefined && path === 'all')
                ? 'opacity-100'
                : 'opacity-80'
            }`}
          >
            {label}
          </D2>
          <AnimatePresence>
            {(router.query.category === path ||
              (router.query.category === undefined && path === 'all')) && (
              <motion.span
                variants={variants}
                initial='hidden'
                exit='exit'
                animate='visible'
                className='absolute bottom-[-0.3rem] right-1/2 h-1 w-full translate-x-1/2 bg-primary-500 '
              ></motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      ))}
    </Container>
  );
};

export default TabSelector;
