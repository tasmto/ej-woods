import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { useAtom } from 'jotai';
import Image from 'next/image';
import { useRouter } from 'next/router';
import * as React from 'react';

import clsxm from '@/lib/clsxm';
import resolveIcon from '@/lib/iconResolver';

import Container from '@/components/layout/Container';
import UnstyledLink from '@/components/links/UnstyledLink';
import { Caption, P2 } from '@/components/typography/Typography';

import { cartOverlayOpen } from '@/features/cart/components/CartOverlay';
import { useCartStore } from '@/features/cart/state/CartContext';

import EjWoodsLogo from '~/svg/ej-woods-logo.svg';

const links = [
  { href: '/shop', label: 'Shop' },
  { href: '/shop?category=furniture', label: 'Furniture' },
  { href: '/shop?category=wood', label: 'Wood' },
  { href: '/gallery', label: 'Our Work' },
];

export default function Header() {
  const router = useRouter();

  const [cartOpen, setCartOpen] = useAtom(cartOverlayOpen);
  const { cart, totalItemsInCart } = useCartStore((state) => state);
  const [itemsInCart, setItemsInCart] = React.useState(totalItemsInCart());

  // Check if cart has changed and update state
  React.useEffect(() => {
    setItemsInCart(totalItemsInCart());
  }, [cart]);

  const { scrollYProgress } = useScroll();
  const navBG = useTransform(
    scrollYProgress,
    [0, 0.03],
    ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.9)']
  );

  // todo: sticky mobile nav: https://blog.logrocket.com/react-scroll-animations-framer-motion/

  return (
    <div className='sr-only bg-transparent sm:not-sr-only sm:fixed sm:top-1 sm:z-30 sm:!w-full'>
      <Container level={1}>
        <AnimatePresence>
          <motion.div
            key='full'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className='flex h-14 items-center justify-between rounded-3xl px-4 backdrop-blur-sm sm:py-2 '
            style={{ backgroundColor: navBG }}
          >
            <UnstyledLink href='/' className='font-bold hover:text-gray-600'>
              <EjWoodsLogo className='h-20 w-full md:h-24' />
            </UnstyledLink>
            <nav className='flex items-center justify-end  divide-x divide-slate-300'>
              <ul className='flex items-center justify-between'>
                {links.map(({ href, label }, i) => (
                  <li key={i}>
                    <UnstyledLink
                      href={href}
                      className={clsxm(
                        'max-[1px] rounded-xl px-2 py-2 text-primary-600 hover:bg-primary-50/50 hover:text-primary-300 md:mx-[2px] md:px-3',
                        [
                          router.asPath === href &&
                            'bg-primary-100 text-slate-200 hover:bg-primary-100/90 hover:text-slate-200',
                        ]
                      )}
                    >
                      <P2 as='span'>{label}</P2>
                    </UnstyledLink>
                  </li>
                ))}
              </ul>
              <ul className='ml-2 flex items-center justify-between gap-1 pl-1'>
                <li>
                  <button
                    className={clsxm(
                      'flex items-center gap-1 rounded-2xl px-2 py-1 hover:bg-primary-50/50 ',
                      [
                        cartOpen &&
                          'bg-primary-100 text-slate-200 hover:bg-primary-100/90',
                      ]
                    )}
                    title='Cart'
                    onClick={() => setCartOpen(!cartOpen)}
                  >
                    <div className='relative'>
                      <Image
                        src={
                          resolveIcon(
                            '🛒',
                            router.pathname === '/shop/cart' || cartOpen
                          )?.['active'] || ''
                        }
                        layout='intrinsic'
                        className='shadow-xl shadow-black transition-all duration-200'
                        height={30}
                        width={30}
                        alt=''
                      />
                      {itemsInCart > 0 && (
                        <Caption
                          as='figcaption'
                          className={clsxm([
                            'absolute right-[-10px] top-[-7px] h-5 w-5 rounded-full p-1 ',
                            'text-xs text-[10px] font-bold leading-tight text-white',
                            'bg-primary-200 ',
                          ])}
                        >
                          <span>{itemsInCart > 5 ? '5+' : itemsInCart}</span>
                          <span className='sr-only'>
                            Items currently in your cart
                          </span>
                        </Caption>
                      )}
                    </div>
                    <P2 as='span'>Cart</P2>
                  </button>
                </li>
                <li>
                  <UnstyledLink
                    href='/shop/cart'
                    className=' flex items-center gap-1 rounded-2xl  px-2 py-1  hover:bg-primary-50/50 '
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
                    <P2 as='span' className='sr-only '>
                      Search
                    </P2>
                  </UnstyledLink>
                </li>
                <li>
                  <UnstyledLink
                    href='/contact'
                    className='flex items-center gap-1 rounded-2xl  px-2 py-1  hover:bg-primary-50/50 '
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
                    <P2 as='span' className='sr-only'>
                      Contact
                    </P2>
                  </UnstyledLink>
                </li>
              </ul>
            </nav>
          </motion.div>
        </AnimatePresence>
      </Container>
    </div>
  );
}
