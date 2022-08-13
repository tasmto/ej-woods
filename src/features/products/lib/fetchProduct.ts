import Error from 'next/error';
import { useEffect, useState } from 'react';

import API from '@/features/products/lib/api';
import { ProductType } from '@/features/products/types';

export type ProductReturnType = { data?: ProductType; error?: Error };

const useFetchProduct = (productId: string): ProductReturnType => {
  const [data, setData] = useState<ProductReturnType>({});
  useEffect(() => {
    fetch(`${API}/products/${productId}`, {
      method: 'GET',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.json())
      .then((data: ProductType) => setData({ data: data }))
      .catch((err: Error) => setData({ error: err }));
  }, [productId]);

  return data;
};

const fetchProductById = async (
  productId: string,
  attachCrossSells?: boolean
) => {
  const data = fetch(
    `${API}/products/${productId}?attachCrossSells=${
      attachCrossSells || false
    }`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
    .then((res) => res.json())
    .then((data: ProductType) => ({ data: data }))
    .catch((err: Error) => ({ error: err }));

  return data;
};

const fetchAllProducts = async (
  filters: {
    select?: Array<'name' | 'id' | 'primaryImage'>;
    limit?: number;
  } = {}
) => {
  const { select, limit } = filters;
  try {
    const isAdmin = false;
    const res = await fetch(
      `${API}/products?${limit && 'limit=' + limit}&${
        select && `select=[${select}]`
      }`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: isAdmin ? 'Bearer admin' : '',
        },
      }
    );
    const data: ProductType[] = await res.json();
    return data;
  } catch (error: any) {
    return error;
  }
};

export { fetchAllProducts, fetchProductById };
export default useFetchProduct;
