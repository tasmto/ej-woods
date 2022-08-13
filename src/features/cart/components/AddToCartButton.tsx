import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import React from 'react';

import clsxm from '@/lib/clsxm';
import resolveIcon from '@/lib/iconResolver';

import { Caption } from '@/components/typography/Typography';

import { useCartStore } from '@/features/cart/state/CartContext';
import { CrossSellType, ProductType } from '@/features/products/types';

type Props = {
  product: ProductType | CrossSellType;
  className?: string;
};

const AddToCartButton = ({ product }: Props) => {
  const { cart, addToCart, removeItemFromCart, howManyInCart } = useCartStore(
    (state) => state
  );
  const [countInCart, setCountInCart] = React.useState(0);
  const [hover, setHover] = React.useState(false);

  const handleAddToCart = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    howManyInCart(product)
      ? removeItemFromCart(product)
      : addToCart(product, 1);

    e.stopPropagation();
    e.preventDefault();
  };

  // Check if product and  is in cart (every time cart changes)
  React.useEffect(() => {
    setCountInCart(howManyInCart(product));
  }, [cart, howManyInCart, product]);

  return (
    <button
      onClick={handleAddToCart}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      type='button'
      className={clsxm(
        'inline-flex items-center justify-center gap-3  font-semibold',
        'rounded-full rounded-tl-none  py-4 px-4 ',
        ' delay-200',
        'bg-primary-100 text-white ',
        ' group transition-all duration-300',

        'relative',
        [hover && 'rounded-l-none bg-primary-300'],
        [countInCart && 'bg-primary-300 hover:bg-primary-600'],
        [product.countInStock === 0 && 'cursor-not-allowed !bg-gray-500']
      )}
    >
      <AnimatePresence exitBeforeEnter>
        {hover && (
          <motion.span
            initial={{
              opacity: 0,
              x: '-80%',
              backgroundColor: countInCart
                ? 'rgb(65 65 66)'
                : 'rgb(141 127 127)',
            }}
            animate={{
              opacity: 1,
              x: '-100%',
              backgroundColor: countInCart ? 'rgb(23 23 23)' : 'rgb(65 65 66)',
            }}
            exit={{
              opacity: 0,
              x: '-70%',
              zIndex: -1,
              backgroundColor: countInCart
                ? 'rgb(65 65 66)'
                : 'rgb(141 127 127)',
            }}
            transition={{ type: 'linear', duration: 0.3 }}
            className={clsxm(
              'absolute left-[10px] z-10 flex translate-x-[-100%] items-center justify-center',
              'bg-primary-300 text-base',
              'rounded-l-full',
              ' block h-[100%] w-full min-w-[120px] py-5 pl-4',
              [countInCart && ' min-w-[160px] '],
              [countInCart && 'bg-primary-300 hover:bg-primary-600'],
              [product.countInStock === 0 && 'cursor-not-allowed !bg-gray-500']
            )}
          >
            {product.countInStock === 0
              ? 'Out of stock'
              : countInCart
              ? 'Remove from Cart'
              : 'Add to Cart'}
          </motion.span>
        )}
      </AnimatePresence>
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
              'bg-primary-200 ',
            ])}
          >
            <span>{countInCart > 5 ? '5+' : countInCart}</span>
            <span className='sr-only'>Items currently in your cart</span>
          </Caption>
        )}
      </figure>
    </button>
  );
};

export default AddToCartButton;
