import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import resolveIcon, { Icons } from '@/lib/iconResolver';

import { P3 } from '@/components/typography/Typography';

const MobileNav = () => {
  const router = useRouter();
  const routes: { name: string; href: string; icon: keyof typeof Icons }[] = [
    {
      name: 'Shop',
      href: '/shop',
      icon: '🛒',
    },
    {
      name: 'Cart',
      href: '/shop/cart',
      icon: '💳',
    },
    {
      name: 'Contact',
      href: '/contact',
      icon: '💬',
    },
  ];

  return (
    <nav
      aria-hidden
      className='fixed bottom-0 z-[10000]  w-full bg-primary-400/95 text-center  text-white backdrop-blur-sm sm:hidden'
    >
      <ul className='flex items-center justify-center divide-x divide-primary-300'>
        {routes.map(({ name, href, icon }) => (
          <li key={href}>
            <Link href={href}>
              <a className='grid items-center gap-1 px-6 py-3 hover:bg-primary-800/20'>
                <Image
                  src={
                    resolveIcon(icon, true)?.[
                      router.pathname === href ? 'active' : 'icon'
                    ] || ''
                  }
                  layout='intrinsic'
                  className='shadow-2xl transition-all duration-200'
                  height={40}
                  width={40}
                  alt=''
                />
                <P3>{name}</P3>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default MobileNav;
