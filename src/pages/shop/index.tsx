import { atom, useAtom } from 'jotai';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import Seo from '@/components/Seo';

import { fetchAllProducts } from '@/features/products/lib/fetchProduct';
import { ProductType } from '@/features/products/types';
import ShopLayout from '@/features/shop/components/Layout';
import ProductList from '@/features/shop/components/ProductList';
import TabSelector from '@/features/shop/components/TabSelector';

type Props = {
  products: ProductType[];
};

const productQuery = atom<'furniture' | 'all' | 'wood'>('all');

const ShopPage = ({ products }: Props) => {
  const router = useRouter();
  const [selected, setSelected] = useAtom(productQuery);

  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    setFilteredProducts(
      products.filter((product) => {
        if (selected === 'all') {
          return true;
        }

        return product.type === selected;
      })
    );
  }, [products, selected]);

  useEffect(() => {
    if (router.query.category) {
      setSelected(router.query.category as 'furniture' | 'wood');
    }
  }, [router.query.category]);

  return (
    <ShopLayout>
      <Seo templateTitle='Shop' />
      <TabSelector />
      <ProductList type={selected} products={filteredProducts} />
    </ShopLayout>
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
