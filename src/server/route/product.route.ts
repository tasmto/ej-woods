import * as trpc from '@trpc/server'

import {
  createProductSchema,
  getMultipleProductsSchema,
  getSingleProductSchema,
} from '@/schema/product.schema'

import { createRouter } from '../createRouter'

// todo: Add middleware to make sure only auth'ed users see unpublished products

const productRouter = createRouter()
  .query('single-product', {
    input: getSingleProductSchema,
    async resolve({ input, ctx }) {
      const item = await ctx.prisma.product.findUnique({
        where: {
          id: input.productId,
        },
        include: {
          crossSells: {
            include: {
              images: true,
            },
          },
          images: true,
        },
      })
      if (!item)
        throw new trpc.TRPCError({
          code: 'NOT_FOUND',
          message: 'Product not found',
        })

      // if (!ctx.user)
      //   throw new trpc.TRPCError({
      //     code: 'UNAUTHORIZED',
      //     message: 'This item is currently unavailable...',
      //   })

      // const crossSells = await  ctx.prisma.product.findMany({
      //   where: {
      //     id: {in: item.crossSells}
      //   }
      // })

      return item
    },
  })
  .query('multiple-products', {
    input: getMultipleProductsSchema,
    async resolve({ input, ctx }) {
      const { type, limit, name, page } = input

      const products = await ctx.prisma.product.findMany({
        where: {
          AND: [
            { type: type ?? undefined },
            { name: { contains: name ?? undefined } },
            { published: true },
          ],
        },
        include: {
          images: true,
        },
        skip: page && limit ? (page - 1) * limit : 0,
        take: limit ?? undefined,
        orderBy: {
          name: 'desc',
        },
      })

      return products
    },
  })
  .mutation('create-product', {
    input: createProductSchema,
    async resolve({ input, ctx }) {
      const product = await ctx.prisma.product.create({
        data: input,
      })

      return product
    },
  })

export { productRouter }
