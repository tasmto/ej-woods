'use client'
import React from 'react'

import Container from '@/components/layout/Container'
import Typography from '@/components/typography/Typography'
import FooterCTA from '@/features/navigation/components/FooterCTA'
import clsxm from '@/lib/clsxm'

const Footer = ({ showCta = true }: { showCta?: boolean }) => {
  const links = [
    {
      title: 'Who we are',
      links: [
        {
          title: 'About Ej woods',
          href: '/about',
        },
        {
          title: 'Our previous work',
          href: '/gallery',
        },
        {
          title: 'Get in touch with us',
          href: '/contact',
        },
      ],
    },
    {
      title: 'Shop',
      links: [
        {
          title: 'Furniture Items',
          href: '/shop?category=furniture',
        },
        {
          title: 'Wood supply',
          href: '/shop?category=wood',
        },
        {
          title: 'Carpentry services',
          href: '/carpentry',
        },
      ],
    },
    {
      title: 'Orders & Returns',
      links: [
        {
          title: 'Frequently asked questions',
          href: 'shop/frequently-asked-questions',
        },
        {
          title: 'Orders & Returns',
          href: 'shop/orders-and-returns',
        },
      ],
    },
  ]

  return (
    <div className='mt-20'>
      <Container level={1} as='footer' className='grid  gap-10'>
        {showCta && <FooterCTA />}
        <div className='grid gap-5 border-t border-primary-100/40 py-8 text-primary-300 sm:grid-cols-3 md:gap-6'>
          <article className='col-span-full grid items-start gap-8 sm:grid-cols-3  md:gap-6'>
            {links.map((link, index) => (
              <ul
                key={index}
                className={clsxm([
                  'col-span-1 grid items-stretch text-center sm:text-start',
                  index === 2 && 'md:text-end',
                ])}
              >
                <Typography
                  as='li'
                  size='body2'
                  weight='bold'
                  className='mb-2 px-2 sm:mb-3'
                >
                  {link.title}
                </Typography>
                {link.links.map((item, index) => (
                  <li key={index}>
                    <Typography
                      as='a'
                      size='body2'
                      href={item.href}
                      className={clsxm([
                        'block rounded-lg py-2 px-2 hover:bg-slate-200 hover:opacity-80',
                      ])}
                    >
                      {item.title}
                    </Typography>
                  </li>
                ))}
              </ul>
            ))}
          </article>
        </div>
        <Typography
          as='p'
          size='body3'
          className='mt-[-35px] border-t border-primary-100/40 py-4 text-center  text-primary-100'
        >
          © {new Date().getFullYear()} ej-woods | Designed and developed by{' '}
          <a
            rel='noreferrer'
            href='https://tasmto.com?utm_source=ej-woods'
            target='_blank'
          >
            Tashinga
          </a>
        </Typography>
      </Container>
    </div>
  )
}

export default Footer
