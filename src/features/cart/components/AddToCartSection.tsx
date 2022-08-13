import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import React from 'react';

import clsxm from '@/lib/clsxm';
import { FormatCurrency } from '@/lib/FormatNumber';
import resolveIcon from '@/lib/iconResolver';

import ButtonLink from '@/components/links/ButtonLink';
import { Caption, H3, P2 } from '@/components/typography/Typography';

import { useCartStore } from '@/features/cart/state/CartContext';
import { ProductType } from '@/features/products/types';

type Props = {
  product: ProductType;
};

const AddToCartSection = ({ product }: Props) => {
  const { cart, addToCart, removeItemFromCart, howManyInCart } = useCartStore(
    (state) => state
  );
  const [howMany, setHowMany] = React.useState<number>(1);
  const [countInCart, setCountInCart] = React.useState(0);

  const handleAddToCart = () => {
    howManyInCart(product) !== howMany
      ? addToCart(product, howMany)
      : removeItemFromCart(product);

    setHowMany(howManyInCart(product) || 1);
  };

  // Check if product and  is in cart (every time cart changes)
  React.useEffect(() => {
    setCountInCart(howManyInCart(product));
  }, [cart, product, howManyInCart]);

  React.useEffect(() => {
    setHowMany(howManyInCart(product) || 1);
  }, []);

  return (
    <div className='flex w-full flex-wrap gap-4'>
      <H3
        as='p'
        className='mt-[-17px] mb-6 flex w-full items-end tracking-tight text-primary-600'
      >
        {howManyInCart(product) ? (
          <>
            <b>{FormatCurrency(product.price * howMany ?? 1)}</b> — for{' '}
            {howMany}.
          </>
        ) : (
          <>
            <b>{FormatCurrency(product.price * howMany ?? 1)}</b> — for{' '}
            {product.weight.value * howMany ?? 1} {product.weight.unit}
          </>
        )}
        <P2 as='span' className='ml-4 text-primary-200'>
          ({FormatCurrency(product.price)} each).
        </P2>
      </H3>
      <div className='flex flex-wrap gap-6'>
        <fieldset className='flex gap-1'>
          <input
            disabled={product.countInStock === 0}
            type='number'
            max={product.countInStock}
            min={1}
            maxLength={5}
            value={howMany}
            onChange={(e) => setHowMany(Number(e.target.value))}
            className={clsxm(
              'font-lg w-24 rounded-l-full border border-slate-400 bg-slate-200 py-4 px-4 text-center focus-within:border-primary-200 focus-within:ring-primary-200 md:text-xl',
              [product.countInStock === 0 && 'cursor-not-allowed']
            )}
          />

          <select
            disabled={product.countInStock === 0}
            defaultValue={`${howMany}`}
            onChange={(e) => setHowMany(Number(e.target.value))}
            className={clsxm(
              'md:text-x h-full rounded-r-full border border-slate-400  bg-gray-300 bg-center py-4 px-6 pr-8 text-transparent focus-within:border-primary-200 focus-within:ring-primary-200',
              [product.countInStock === 0 && 'cursor-not-allowed']
            )}
          >
            {product.countInStock !== 'unlimited' &&
              Array(product.countInStock)
                .fill(0)
                .map((_, i) => (
                  <option key={i + 1} value={i + 1} className='text-slate-700'>
                    {1 + i}
                  </option>
                ))}
            {product.countInStock === 'unlimited' && (
              <>
                {Array(8)
                  .fill(0)
                  .map((_, i) => (
                    <option
                      key={i + 1}
                      value={i + 1}
                      className='text-slate-700'
                    >
                      {1 + i}
                    </option>
                  ))}
                {[10, 12, 15, 20, 25].map((i) => (
                  <option key={i} value={i} className='text-slate-700'>
                    {i}
                  </option>
                ))}
              </>
            )}
          </select>
        </fieldset>
        <button
          onClick={handleAddToCart}
          disabled={product.countInStock === 0}
          type='submit'
          className={clsxm(
            'inline-flex items-center justify-center gap-3  font-semibold',
            'rounded-full rounded-tl-none  py-4 px-8 ',
            'bg-primary-400 text-white ',
            ' group transition-all duration-300',
            'border border-primary-300',
            'relative',
            'hover:rounded-tl-full hover:bg-primary-600',
            [
              product.countInStock === 0 &&
                'cursor-not-allowed !rounded-full !bg-gray-500',
            ]
          )}
        >
          <figure className='relative h-[30px] w-[30px]'>
            <Image
              src={
                resolveIcon(
                  product.countInStock === 0 ? '➖' : '🛒',
                  countInCart > 0
                )?.[countInCart ? 'active' : 'icon'] || ''
              }
              layout='intrinsic'
              className='shadow-2xl shadow-red-500 transition-all duration-200'
              height={30}
              width={30}
              alt=''
            />
            {countInCart > 0 && (
              <Caption
                as='figcaption'
                className={clsxm([
                  'absolute right-[-10px] top-[-10px] h-5 w-5 rounded-full p-1 ',
                  'text-xs text-[10px] font-bold leading-tight text-white',
                  'bg-primary-200 outline outline-1 outline-primary-400',
                ])}
              >
                <span>{countInCart > 5 ? '5+' : countInCart}</span>
                <span className='sr-only'>Items currently in your cart</span>
              </Caption>
            )}
          </figure>
          <P2 weight='bold'>
            {product.countInStock === 0
              ? 'Out of stock'
              : countInCart > 0 && countInCart === howMany
              ? 'Remove from Cart'
              : 'Add to Cart'}
          </P2>
        </button>
      </div>
      <AnimatePresence exitBeforeEnter>
        {countInCart && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            <ButtonLink
              href='#'
              variant='outline'
              className='flex w-full items-center justify-center gap-3 px-8 py-[0.85rem]'
              curve='top'
              icon='💳'
              alwaysActive
            >
              Buy it now
            </ButtonLink>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AddToCartSection;
