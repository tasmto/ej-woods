import create from 'zustand'
import { devtools, persist } from 'zustand/middleware'

import { SingleProductType } from '@/schema/product.schema'

interface CartState {
  cart: CartProductType[] // CartProductType[] | [];
  addToCart: (product: SingleProductType | undefined, quantity: number) => void
  removeItemFromCart: (product?: SingleProductType) => void
  howManyInCart: (product?: SingleProductType) => number
  totalItemsInCart: () => number
  cartValue: () => number
  clearCart: () => void
}

export interface CartProductType extends SingleProductType {
  quantity: number
}

const useCartStore = create<CartState>()(
  devtools(
    persist(
      (set, get) => ({
        cart: [],

        addToCart: (product, quantity) => {
          if (!product) return
          set(({ cart }) => {
            // If we are trying to add  product that is out of stock do nothing.
            if (quantity < 0 || product.countInStock === 0) return { cart }

            //  Safe guard against adding more than the available stock.
            const safeQuantity = Math.min(quantity, product.countInStock)

            const itemIndex = cart.findIndex((item) => item.id === product.id)

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
            }
          })
        },
        removeItemFromCart: (product) => {
          if (product)
            set(({ cart }) => ({
              cart: cart.filter((item) => item.id !== product?.id),
            }))
        },

        // * Helper function to get how many of a product is in cart
        howManyInCart: (product) => {
          if (product)
            return (
              get().cart.find((item) => item.id === product.id)?.quantity ?? 0
            )
          return 0
        },

        totalItemsInCart: () =>
          get().cart.reduce((acc, item) => acc + item.quantity, 0) ?? 0,
        cartValue: () =>
          get().cart.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0
          ) ?? 0,
        clearCart: () => set({ cart: [] }),
      }),
      {
        name: 'cart-storage',
      }
    )
  )
)

export { useCartStore }
