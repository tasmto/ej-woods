import * as trpc from '@trpc/server'

import {
  createProductSchema,
  getMultipleProductsSchema,
  getSingleProductSchema,
} from '@/schema/product.schema'

import { protectedProcedure, publicProcedure, router } from '../createRouter'

// todo: Add middleware to make sure only auth'ed users see unpublished products

const productRouter = router({
  singleProduct: publicProcedure
    .input(getSingleProductSchema)
    .query(async ({ ctx, input }) => {
      const auth = await (await ctx).user
      console.log(auth)
      const item = await (
        await ctx
      ).prisma.product.findUnique({
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

      return item
    }),
  multipleProducts: publicProcedure
    .input(getMultipleProductsSchema)
    .query(async ({ ctx, input }) => {
      const { type, limit, name, page } = input

      const products = await (
        await ctx
      ).prisma.product.findMany({
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
    }),
  createProduct: protectedProcedure
    .input(createProductSchema)
    .mutation(async ({ ctx, input }) => {
      const product = await (
        await ctx
      ).prisma.product.create({
        data: { ...input },
      })

      return product
    }),
})

export { productRouter }
