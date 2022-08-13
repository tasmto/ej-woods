import Link from 'next/link';
import React from 'react';

import clsxm from '@/lib/clsxm';

import { D2, P2 } from '@/components/typography/Typography';

type Props = {
  include: 'all' | 'wood' | 'carpentry' | 'furniture';
};

const ServiceCards = ({ include }: Props) => {
  const categories = [
    {
      name: 'Wood supply',
      id: 'wood',
      href: '/shop?filter=furniture',
      description: '24 items.',
      image: '/images/wood-supply-cat--banner.jpg',
    },
    {
      name: 'Furniture',
      id: 'furniture',
      href: '/shop?filter=furniture',
      description: '24 items.',
      image: '/images/furniture-cat--banner.jpg',
    },
    {
      name: 'Carpentry',
      id: 'carpentry',
      href: '/custom-furniture',
      description: '(We also create custom furniture items.)',
      image: '/images/carpentry-cat--banner.jpg',
    },
  ];
  return (
    <>
      {(include !== 'all'
        ? categories.filter((cat) => cat.id === include)
        : categories
      ).map(({ name, id, description, image, href }) => (
        <Link href={href} key={id}>
          <a
            className={clsxm(
              ' relative grid h-80 w-full content-end overflow-hidden rounded-xl  p-8 sm:p-6',
              ' bg-gray-400 bg-cover text-slate-50',
              'after:absolute after:top-0 after:block after:h-full after:w-full after:bg-gradient-to-t after:from-black/90 after:via-black/0 after:to-black/0',
              ' hover:shadow-xl hover:after:from-slate-700/90 hover:after:via-slate-700/20 hover:after:to-slate-800/10',
              'after:transition-all after:duration-200 after:ease-in-out'
            )}
            style={{ backgroundImage: `url(${image})` }}
          >
            <D2
              as='h3'
              weight='semiBold'
              className='z-10 self-end drop-shadow-md'
            >
              {name}
            </D2>
            <P2 className='z-10 mt-2 self-end drop-shadow-md'>{description}</P2>
          </a>
        </Link>
      ))}
    </>
  );
};

export default ServiceCards;
