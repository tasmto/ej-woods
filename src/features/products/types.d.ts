export type ProductType = {
  id: string;
  name: string;
  type: 'wood' | 'furniture';
  price: number;
  weight: {
    value: number;
    unit: 'g' | 'kg' | 't';
  };
  description: string;
  primaryImage: string;
  gallery: string[];
  crossSells: string[] | CrossSellType[];
  categories?: string[] | string;
  countInStock: number | 'unlimited';
  published?: boolean;
};

export interface CrossSellType extends Omit<ProductType, 'crossSells'> {
  published?: boolean;
}
