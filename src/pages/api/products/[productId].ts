import type { NextApiRequest, NextApiResponse } from 'next';

import products from '@/data/products';

import { ProductType } from '@/features/products/types';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const { productId, attachCrossSells } = req.query;
  // const attachCrossSells req.body.attachCrossSells;

  // Todo: Implement Firebase API
  const data: ProductType | undefined = products.find(
    (product) => product.id === productId
  );

  if (!data) return res.status(404).json({ message: 'Product not found' });

  // Attach product cross-sells

  const crossSellProducts =
    attachCrossSells === 'true'
      ? data.crossSells.map((id) => {
          const product = products.find((product) => product.id === id);
          if (product)
            return {
              name: product?.name,
              id: product?.id,
              price: product?.price,
              primaryImage: product?.primaryImage,
              type: product?.type,
              weight: product?.weight,
              crossSell: true,
              countInStock: product?.countInStock,
            };
        })
      : data.crossSells;

  res.status(200).json({ ...data, crossSells: crossSellProducts });
};

export default handler;
