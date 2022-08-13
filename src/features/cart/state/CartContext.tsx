import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { CrossSellType, ProductType } from '@/features/products/types';

interface CartState {
  cart: CartProductType[]; // CartProductType[] | [];
  addToCart: (product: ProductType | CrossSellType, quantity: number) => void;
  removeItemFromCart: (product: ProductType | CrossSellType) => void;
  howManyInCart: (product: ProductType | CrossSellType) => number;
}

export interface CartProductType extends Omit<ProductType, 'crossSells'> {
  quantity: number;
}

const useCartStore = create<CartState>()(
  devtools(
    persist((set, get) => ({
      cart: [],

      addToCart: (product, quantity) =>
        set(({ cart }) => {
          // If we are trying to add  product that is out of stock do nothing.
          if (quantity < 0 || product.countInStock === 0) return { cart };

          //  Safe guard against adding more than the available stock.
          const safeQuantity =
            product.countInStock !== 'unlimited'
              ? Math.min(quantity, product.countInStock)
              : quantity;

          const itemIndex = cart.findIndex((item) => item.id === product.id);

          // If item is already in cart, increase set the quantity to new one
          // otherwise add new item to cart
          return {
            cart:
              itemIndex === -1
                ? [...cart, { ...product, quantity: safeQuantity }]
                : cart.map((item) =>
                    item.id === product.id
                      ? { ...item, quantity: safeQuantity }
                      : item
                  ),
          };
        }),
      removeItemFromCart: (product) =>
        set(({ cart }) => ({
          cart: cart.filter((item) => item.id !== product.id),
        })),

      // * Helper function to get how many of a product is in cart
      howManyInCart: (product) =>
        get().cart.find((item) => item.id === product.id)?.quantity ?? 0,
    }))
  )
);

export { useCartStore };
