import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import clsxm from '@/lib/clsxm';

import Container from '@/components/layout/Container';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import { D2 } from '@/components/typography/Typography';

import ProductCard from '@/features/products/components/Card';
import { fetchAllProducts } from '@/features/products/lib/fetchProduct';
import { ProductType } from '@/features/products/types';

type Props = {
  products: ProductType[];
};

const ShopPage = ({ products }: Props) => {
  const router = useRouter();
  const [selected, setSelected] = React.useState<'furniture' | 'wood'>(
    router.query.category
      ? (router.query.category as 'furniture' | 'wood')
      : 'furniture'
  );

  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    setFilteredProducts(
      products.filter((product) => product.type === selected)
    );
  }, [products, selected]);

  useEffect(() => {
    if (router.query.category) {
      setSelected(router.query.category as 'furniture' | 'wood');
    }
  }, [router.query.category]);

  const variants = {
    hidden: {
      scaleX: 0,
      x: '50%',

      transition: {
        duration: 0.2,
      },
    },
    visible: {
      scaleX: 1,
      transition: {
        // duration: 0.5,
        delay: 0.2,
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
    exit: {
      scaleX: 0,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <Layout>
      <Seo templateTitle='Shop' />
      <Container
        as='div'
        role='tablist'
        level={1}
        className='mb-[-1rem] flex justify-center gap-6 lg:mb-[-1.5rem]'
      >
        <motion.button
          aria-selected={selected === 'furniture' ? 'true' : 'false'}
          role='tab'
          onClick={() => {
            setSelected('furniture');
            router.push(
              {
                pathname: '/shop',
                query: { ...router.query, category: 'furniture' },
              },
              undefined,
              {}
            );
          }}
          className='relative'
        >
          <D2
            className={`${
              selected === 'furniture' ? 'opacity-100' : 'opacity-80'
            }`}
          >
            Furniture
          </D2>
          <AnimatePresence>
            {selected === 'furniture' && (
              <motion.span
                variants={variants}
                initial='hidden'
                exit='exit'
                animate='visible'
                className='absolute bottom-[-0.3rem] right-1/2 h-1 w-full !origin-right translate-x-1/2 bg-primary-500 '
              ></motion.span>
            )}
          </AnimatePresence>
        </motion.button>
        <motion.button
          role='tab'
          aria-selected={selected === 'wood' ? 'true' : 'false'}
          onClick={() => {
            setSelected('wood');
            router.push(
              {
                pathname: '/shop',
                query: { ...router.query, category: 'wood' },
              },
              undefined,
              {}
            );
          }}
          className='relative'
        >
          <D2
            className={`${selected === 'wood' ? 'opacity-100' : 'opacity-80'}`}
          >
            Wood
          </D2>
          <AnimatePresence exitBeforeEnter>
            {selected === 'wood' && (
              <motion.span
                variants={variants}
                initial='hidden'
                exit='exit'
                animate='visible'
                className='absolute bottom-[-0.3rem] right-1/2 h-1 w-full origin-left translate-x-1/2 bg-primary-500'
              ></motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </Container>

      <Container
        as='section'
        level={1}
        role='tabpanel'
        className={clsxm('grid gap-5 sm:grid-cols-2 lg:grid-cols-3', [
          filteredProducts && 'min-h-[300px] lg:min-h-[400px]',
        ])}
      >
        <h1 className='sr-only'>
          You have currently selected to only view our {selected} furnitures.{' '}
        </h1>

        {filteredProducts?.map((product, i) => (
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
    </Layout>
  );
};

export const getServerSideProps = async () => {
  const products = await fetchAllProducts(); // todo handle through react query
  return {
    props: {
      products,
    },
  };
};

export default ShopPage;
