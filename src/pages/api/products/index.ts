// TODO: Crete route to get all products

import type { NextApiRequest, NextApiResponse } from 'next';

import products from '@/data/products';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const { select } = req.query;
  const filters =
    typeof select === 'string' ? select?.slice(1, -1)?.split(',') : select;
  const limit = Number(req.query.limit);

  switch (req.method) {
    /**
     * @description: Fetches all  products
     * @route        GET /api/products
     * @access       Public
     */
    case 'GET': {
      const adminReq = req.headers.authorization;
      return res
        .status(200)
        .json(getAllProducts(adminReq ? true : false, filters, limit));
    }
    /*
    case 'POST': {
      // TODO: Create new product
      // TODO: Add crossSells to popular products of same type (if none are supplied)
    }

    case 'PATCH': {
      // TODO: Update a product new product
      // TODO: Add crossSells to popular products of same type (if none are supplied)
    } */
  }
};

function getAllProducts(
  isAdmin?: boolean,
  filters?: string[],
  limit?: number
): object[] {
  const publishedProducts = isAdmin
    ? products
    : products
        .filter((product) => product.published)
        .slice(0, limit || products.length);
  if (!filters) return publishedProducts;

  const filteredProducts = publishedProducts.reduce(
    (acc: Array<any>, product) => {
      const filteredProduct = {};
      filters.forEach((filter) => {
        // @ts-expect-error: filter can be any string and can therefore possibly not be a valid property of the productType
        if (product[filter]) filteredProduct[filter] = product[filter];
      });

      if (Object.keys(filteredProduct).length !== 0) acc.push(filteredProduct);
      return acc;
    },
    []
  );
  return filteredProducts;
}

export default handler;
