import { Product } from '@prisma/client'
import * as trpc from '@trpc/server'

import { CreateSaleInput, createSaleSchema } from '@/schema/sale.schema'

import { createRouter } from '../createRouter'

// todo: Add middleware to make sure only auth'ed users see unpublished products

const saleRouter = createRouter().mutation('create-sale', {
  input: createSaleSchema,
  async resolve({ input, ctx }) {
    // check that all products exist and have enough stock
    const products = await ctx.prisma.product.findMany({
      where: {
        id: { in: input.products.map(({ productId }) => productId) },
      },
    })

    // if any products are not found, throw an error
    if (products.length !== input.products.length) {
      throw new trpc.TRPCError({
        code: 'NOT_FOUND',
        message: 'One or more products not found',
      })
    }

    // create a map of products to make it easier to check stock
    const productMap = products.reduce(
      (acc, product) => {
        const productInCart = input.products.find(
          (prod) => prod.productId === product.id
        )
        if (!productInCart) return acc
        acc[product.id] = { data: product, productInCart }
        return acc
      },
      {} as Record<
        string,
        {
          data: Product
          productInCart: CreateSaleInput['products'][0]
        }
      >
    )

    const cartHasSomeProductsOutOfStock = Object.values(productMap).some(
      (product) =>
        product.data.countInStock < product.productInCart.quantity &&
        product.data.hasInfiniteStock === false
    )

    if (cartHasSomeProductsOutOfStock) {
      throw new trpc.TRPCError({
        code: 'BAD_REQUEST',
        message: 'One or more products are out of stock',
      })
    }

    // Check each product's price
    const cartHasSomeProductsWithIncorrectPrices = Object.values(
      productMap
    ).some((product) => product.data.price !== product.productInCart.price)

    if (cartHasSomeProductsWithIncorrectPrices) {
      throw new trpc.TRPCError({
        code: 'BAD_REQUEST',
        message: 'One or more products have an incorrect price',
      })
    }

    // check total price
    const totalPrice = products.reduce((acc, product) => {
      const price =
        product.price * (productMap[product.id]?.productInCart.quantity || 0)
      return acc + price
    }, 0)

    if (totalPrice !== input.totalPrice) {
      throw new trpc.TRPCError({
        code: 'BAD_REQUEST',
        message: 'Total price does not match',
      })
    }

    const sale = await ctx.prisma.sale.create({
      data: {
        ...input,
        products: {
          create: input.products.map(({ productId, price, quantity }) => ({
            productId,
            quantity,
            price,
          })),
        },
      },
    })

    try {
      const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

      const paymentIntent = await stripe.paymentIntents.create({
        amount: sale.totalPrice,
        currency: 'zar',
        automatic_payment_methods: {
          enabled: true,
        },
      })
      console.log(
        '🚀 ~ file: sale.route.ts ~ line 113 ~ resolve ~ paymentIntent',
        paymentIntent
      )

      return {
        clientSecret: paymentIntent.client_secret as string,
      }
    } catch (error) {
      console.log(
        '🚀 ~ file: sale.route.ts ~ line 121 ~ resolve ~ error',
        error
      )
      throw new trpc.TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Error creating payment intent',
      })
    }
  },
})

export { saleRouter }
