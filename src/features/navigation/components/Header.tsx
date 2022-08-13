import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/router';
import * as React from 'react';

import clsxm from '@/lib/clsxm';
import resolveIcon from '@/lib/iconResolver';

import Container from '@/components/layout/Container';
import UnstyledLink from '@/components/links/UnstyledLink';
import { P2 } from '@/components/typography/Typography';

import EjWoodsLogo from '~/svg/ej-woods-logo.svg';

const links = [
  { href: '/shop', label: 'Shop' },
  { href: '/shop?category=furniture', label: 'Furniture' },
  { href: '/shop?category=wood', label: 'Wood' },
  { href: '/gallery', label: 'Our Work' },
];

export default function Header() {
  const router = useRouter();

  const { scrollYProgress } = useScroll();
  const navBG = useTransform(
    scrollYProgress,
    [0, 0.03],
    ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.9)']
  );

  // todo: sticky mobile nav: https://blog.logrocket.com/react-scroll-animations-framer-motion/

  return (
    <header className='sr-only bg-transparent sm:not-sr-only sm:fixed sm:top-1 sm:z-50 sm:!w-full'>
      <Container level={1}>
        <AnimatePresence>
          <motion.div
            key='full'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className='mx-2 flex h-14 items-center justify-between rounded-3xl px-4 backdrop-blur-sm sm:py-2'
            style={{ backgroundColor: navBG }}
          >
            <UnstyledLink href='/' className='font-bold hover:text-gray-600'>
              <EjWoodsLogo className='h-20 w-full md:h-24' />
            </UnstyledLink>
            <nav>
              <ul className='flex items-center justify-between'>
                {links.map(({ href, label }, i) => (
                  <li key={i}>
                    <UnstyledLink
                      href={href}
                      className={clsxm(
                        'mx-[2px] rounded-xl px-3 py-2 text-primary-600 hover:bg-primary-50/50 hover:text-primary-300',
                        [
                          router.asPath === href &&
                            'bg-primary-50 text-primary-300 hover:bg-primary-50/90',
                        ]
                      )}
                    >
                      <P2 as='span'>{label}</P2>
                    </UnstyledLink>
                  </li>
                ))}
                <li>
                  <UnstyledLink
                    href='/shop/cart'
                    className='ml-2 flex items-center rounded-2xl bg-primary-100  px-2 py-1 text-white hover:bg-primary-200 hover:text-slate-200 '
                    title='Cart'
                  >
                    <Image
                      src={
                        resolveIcon('🛒', true)?.[
                          router.pathname === '/shop/cart' ? 'active' : 'icon'
                        ] || ''
                      }
                      layout='intrinsic'
                      className='shadow-xl shadow-black transition-all duration-200'
                      height={30}
                      width={30}
                      alt=''
                    />
                    <P2 as='span' weight='bold'>
                      Cart
                    </P2>
                  </UnstyledLink>
                </li>
                <li>
                  <UnstyledLink
                    href='/shop/cart'
                    className='ml-2 flex items-center rounded-2xl bg-gray-300 px-2 py-1 text-white hover:bg-gray-400 hover:text-slate-200'
                    title='Search'
                  >
                    <Image
                      src={resolveIcon('🔍', true)?.['active'] || ''}
                      layout='intrinsic'
                      className='shadow-xl shadow-black transition-all duration-200'
                      height={35}
                      width={35}
                      alt=''
                    />
                  </UnstyledLink>
                </li>
                <li>
                  <UnstyledLink
                    href='/contact'
                    className='ml-2 flex items-center rounded-2xl bg-gray-300  px-2 py-1 hover:bg-gray-400'
                    title='Contact'
                  >
                    <Image
                      src={resolveIcon('💬', true)?.['active'] || ''}
                      layout='intrinsic'
                      className='shadow-xl shadow-black transition-all duration-200'
                      height={30}
                      width={30}
                      alt=''
                    />
                  </UnstyledLink>
                </li>
              </ul>
            </nav>
          </motion.div>
        </AnimatePresence>
      </Container>
    </header>
  );
}
