import React from 'react';

import clsxm from '@/lib/clsxm';

import Container from '@/components/layout/Container';
import Layout from '@/components/layout/Layout';
import ArrowLink from '@/components/links/ArrowLink';
import Seo from '@/components/Seo';
import { D2 } from '@/components/typography/Typography';

import ProductCard from '@/features/products/components/Card';
import {
  fetchAllProducts,
  fetchProductById,
  ProductReturnType,
} from '@/features/products/lib/fetchProduct';
import SingleProductDisplay from '@/features/products/SingleProductDisplay';

type Props = { product: ProductReturnType };

const ProductPage = ({ product }: Props) => {
  if (!product?.data) return null; // todo - handle error

  const { data: item, error } = product;

  return (
    <Layout>
      <Seo templateTitle={item.name || 'Product'} />

      <SingleProductDisplay product={item} />
      {item?.crossSells?.length > 0 && (
        <Container as='section' level={1} className='grid gap-4  sm:gap-8'>
          <div className='flex justify-between gap-4'>
            <D2>You may also like</D2>
            <ArrowLink className='justify-self-end' href='/'>
              Show More Products
            </ArrowLink>
          </div>
          <Container
            as='div'
            className={clsxm('grid gap-5 sm:grid-cols-2', [
              item.crossSells.length === 3 && 'lg:grid-cols-3',
            ])}
          >
            {item.crossSells?.map((product, i) => (
              // @ts-expect-error: Cross sells could be strings based on type (but wont be)
              <ProductCard key={i} product={product} />
            ))}
          </Container>
        </Container>
      )}
    </Layout>
  );
};

export const getStaticPaths = async () => {
  // Get the paths we want to prerender based on products
  const idList: { id: string }[] = await fetchAllProducts({ select: ['id'] });
  const paths = idList.map((item) => ({
    params: { productId: item.id },
  }));

  return { paths, fallback: true };
};

export const getStaticProps = async ({ params }: any) => {
  const { productId } = params;
  const product = await fetchProductById(productId, true);
  return { props: { product: product } };
};

export default ProductPage;
