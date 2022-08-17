import { motion } from 'framer-motion';
import React from 'react';

import clsxm from '@/lib/clsxm';

import Container from '@/components/layout/Container';

import ProductCard from '@/features/products/components/Card';
import { ProductType } from '@/features/products/types';

type Props = {
  type: 'all' | 'furniture' | 'wood';
  products: ProductType[];
};

const ProductList = ({ type, products }: Props) => {
  return (
    <Container
      as='section'
      level={1}
      role='tabpanel'
      className={clsxm('grid gap-5 sm:grid-cols-2 lg:grid-cols-3', [
        products && 'min-h-[300px] lg:min-h-[400px]',
      ])}
    >
      <h1 className='sr-only'>
        You have currently selected to only view our {type} products.
      </h1>

      {products?.map((product, i) => (
        <motion.div
          key={product?.id || i}
          initial={{ opacity: 0, x: '-5%' }}
          animate={{ opacity: 1, x: '0' }}
          exit={{ opacity: 0, x: '5%', transition: { duration: 0.2 } }}
          transition={{
            ease: 'backInOut',
            duration: 0.3,
            delay: i * 0.05,
          }}
        >
          <ProductCard product={product} />
        </motion.div>
      ))}
    </Container>
  );
};

export default ProductList;
