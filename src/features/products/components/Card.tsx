import Link from 'next/link';
import React from 'react';

import clsxm from '@/lib/clsxm';
import { trimString } from '@/lib/FormatString';

import NextImage from '@/components/NextImage';
import { H3, P1 } from '@/components/typography/Typography';

import AddToCartButton from '@/features/cart/components/AddToCartButton';
import { FormatCurrency } from '@/features/products/lib/formatNumber';
import { CrossSellType, ProductType } from '@/features/products/types';

type Props = {
  product: ProductType | CrossSellType;
};
const ProductCard = ({ product }: Props) => {
  if (!product) return null;

  const { name, price, type, primaryImage, id } = product;

  return (
    <Link href={`/shop/${id}`}>
      <a>
        <article
          className={clsxm([
            'content-stretch relative grid h-80 w-full content-end items-stretch justify-items-stretch overflow-hidden rounded-xl  bg-gray-400 text-slate-50 after:absolute after:bottom-0 after:block after:h-2/3 after:w-full after:bg-gradient-to-t after:from-black/90 after:via-black/60 after:to-black/0 md:h-[24rem]',
          ])}
        >
          <NextImage
            src={primaryImage}
            alt={name}
            quality={50}
            useSkeleton
            layout='fill'
            imgClassName='h-full w-full object-cover '
          />
          <div className='absolute bottom-0 z-10 flex w-full items-end justify-between gap-4 p-8 sm:p-6 md:py-8'>
            <div className='flex-1'>
              <H3 weight='semiBold' className='drop-shadow-md'>
                {trimString(name, 65)}
              </H3>

              <P1 className='mt-2 drop-shadow-md'>
                {FormatCurrency(price)} {type === 'wood' ? ' per kg' : 'each'}
              </P1>
            </div>
            <AddToCartButton product={product} />
          </div>
        </article>
      </a>
    </Link>
  );
};

export default ProductCard;
