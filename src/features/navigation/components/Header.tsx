import * as React from 'react'
import { IoArrowBackOutline } from 'react-icons/io5'
import { useAuth, UserButton } from '@clerk/nextjs'
import clsx from 'clsx'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import dynamic from 'next/dynamic'
import Image from "next/image"
import { useRouter } from 'next/router'

import Container from '@/components/layout/Container'
import UnstyledLink from '@/components/links/UnstyledLink'
import { P2 } from '@/components/typography/Typography'
import clsxm from '@/lib/clsxm'
import resolveIcon from '@/lib/iconResolver'

const links = [
  { href: '/shop', label: 'Shop' },
  { href: '/shop?category=furniture', label: 'Furniture' },
  { href: '/shop?category=wood', label: 'Wood' },
  { href: '/gallery', label: 'Our Work' },
]

const adminLinks = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/products', label: 'Products' },
  { href: '/admin/orders', label: 'Orders' },
  { href: '/admin/customers', label: 'Customers' },
]

const CartIndicatorButton = dynamic(
  () => import('../../cart/components/CartIndicator'),
  {
    ssr: false,
  }
)

const Header = ({ hideOnMobile = true, isAdmin = false }) => {
  const router = useRouter()

  const { scrollYProgress } = useScroll()
  const navBG = useTransform(
    scrollYProgress,
    [0, 0.03],
    ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.9)']
  )
  const { isLoaded, isSignedIn, sessionId, getToken } = useAuth()

  // todo: sticky mobile nav: https://blog.logrocket.com/react-scroll-animations-framer-motion/

  return (
    <div
      className={clsx([
        'bg-transparent  sm:z-30 sm:!w-full',
        hideOnMobile
          ? 'sr-only sm:not-sr-only sm:fixed sm:top-1 '
          : 'fixed top-1 ',
      ])}
    >
      <Container level={1}>
        <AnimatePresence>
          <motion.div
            key='full'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className='flex h-14 items-center justify-between rounded-3xl px-4 backdrop-blur-sm sm:py-2 '
            // style={{ backgroundColor: navBG }}
          >
            <UnstyledLink href='/' className='font-bold hover:text-gray-600'>
              <img src="/svg/ej-woods-logo.svg" className='h-10 w-full md:h-12' />
            </UnstyledLink>
            <nav className='flex items-center justify-end  divide-x divide-slate-300'>
              <ul className='flex items-center justify-between'>
                {isAdmin && (
                  <li>
                    <UnstyledLink
                      href={'/'}
                      className={clsxm(
                        'max-[1px] flex items-center gap-2 rounded-xl px-2 py-2 text-primary-600 hover:bg-primary-50/50 hover:text-primary-300 md:mx-[2px] md:px-3',
                        []
                      )}
                    >
                      <IoArrowBackOutline className='h-5 w-5' />
                      <P2 as='span'>Back to shop</P2>
                    </UnstyledLink>
                  </li>
                )}
                {(isAdmin ? adminLinks : links).map(({ href, label }, i) => (
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
                {!isAdmin && (
                  <li>
                    <CartIndicatorButton />
                  </li>
                )}
                <li>
                  <UnstyledLink
                    href='/shop/cart'
                    className=' flex items-center gap-1 rounded-2xl  px-2 py-1  hover:bg-primary-50/50 '
                    title='Search'
                  >
                    <Image
                      src={resolveIcon('🔍', true)?.['active'] || ''}
                      className='transition-all duration-200'
                      height={35}
                      width={35}
                      alt=''
                      style={{
                        maxWidth: "100%",
                        height: "auto"
                      }} />
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
                      className=' transition-all duration-200'
                      height={30}
                      width={30}
                      alt=''
                      style={{
                        maxWidth: "100%",
                        height: "auto"
                      }} />
                    <P2 as='span' className='sr-only'>
                      Contact
                    </P2>
                  </UnstyledLink>
                </li>
                <li
                  className='flex items-center gap-1 rounded-2xl  px-2 py-1  hover:bg-primary-50/50 '
                  title='Account'
                >
                  {isSignedIn ? (
                    <UserButton afterSignOutUrl='/' />
                  ) : (
                    <UnstyledLink href='/sign-in' title='Sign-in'>
                      <Image
                        src={resolveIcon('👤', true)?.['active'] || ''}
                        className=' transition-all duration-200'
                        height={30}
                        width={30}
                        alt=''
                        style={{
                          maxWidth: "100%",
                          height: "auto"
                        }} />
                    </UnstyledLink>
                  )}
                </li>
              </ul>
            </nav>
          </motion.div>
        </AnimatePresence>
      </Container>
    </div>
  );
}
export default Header
