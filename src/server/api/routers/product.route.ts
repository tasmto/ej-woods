import * as trpc from '@trpc/server'

import {
  createProductSchema,
  deleteProductImageSchema,
  getMultipleProductsSchema,
  getSingleProductSchema,
  updateProductMainImageSchema,
  updateProductSchema,
  updateProductStockSchema,
  updateProductVisibilitySchema,
} from '@/schema/product.schema'

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from '@/server/api/trpc'
import { ProductImage } from '@prisma/client'

// todo: Add middleware to make sure only auth'ed users see unpublished products

const productRouter = createTRPCRouter({
  singleProduct: publicProcedure
    .input(getSingleProductSchema)
    .query(async ({ ctx, input }) => {
      const auth = await ctx?.auth?.user
      if (!input.productId && !input.slug) {
        throw new trpc.TRPCError({
          code: 'BAD_REQUEST',
          message: 'Please provide a productId or slug',
        })
      }
      const item = await (
        await ctx
      ).prisma.product.findUnique({
        where: {
          ...(input.productId ? { id: input.productId } : {}),
          ...(input.slug ? { slug: input.slug } : {}),
        },
        include: {
          crossSells: {
            include: {
              images: true,
            },
          },
          images: true,
          mainImage: true,
        },
      })
      if (!item)
        throw new trpc.TRPCError({
          code: 'NOT_FOUND',
          message: 'Product not found',
        })

      return item as typeof item & { images: ProductImage[] }
    }),
  multipleProducts: publicProcedure
    .input(getMultipleProductsSchema)
    .query(async ({ ctx, input }) => {
      const { type, limit, name, page, sortBy, showArchived, sortOrder } = input

      const products = await (
        await ctx
      ).prisma.product.findMany({
        where: {
          AND: [
            { type: type ?? undefined },
            { name: { contains: name ?? undefined } },
            { published: showArchived === true ? undefined : true },
          ],
        },
        include: {
          images: true,
        },
        skip: page && limit ? (page - 1) * limit : 0,
        take: limit ?? undefined,
        orderBy:
          sortBy === 'random' || !sortBy
            ? { id: sortOrder || 'asc' }
            : { [sortBy]: sortOrder || 'asc' },
      })
      const count = await ctx.prisma.product.count({
        where: {
          AND: [
            { type: type ?? undefined },
            { name: { contains: name ?? undefined } },
            { published: showArchived === true ? undefined : true },
          ],
        },
      })

      return {
        products,
        count,
        page: page ?? 1,
        limit,
        totalPages: limit ? Math.ceil(count / limit) : 1,
      }
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
  updateProduct: protectedProcedure
    .input(updateProductSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const product = await ctx.prisma.product.update({
          where: {
            id: input.productId,
          },
          data: {
            price: input.price,
            name: input.name,
            description: input.description,
            weight: input.weight,
            type: input.type,
            countInStock: input.countInStock,
            hasInfiniteStock: input.hasInfiniteStock,
            published: input.published,
          },
        })
        return product
      } catch (error) {
        throw new trpc.TRPCError({
          code: 'NOT_FOUND',
          message: 'Failed to update product',
        })
      }
    }),
  setProductStock: protectedProcedure
    .input(updateProductStockSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.product.update({
          where: {
            id: input.productId,
          },
          data: {
            countInStock: input.countInStock,
            hasInfiniteStock: input.hasInfiniteStock,
          },
        })
        return true
      } catch (error) {
        return false
      }
    }),
  setProductVisibility: protectedProcedure
    .input(updateProductVisibilitySchema)
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.product.update({
          where: {
            id: input.productId,
          },
          data: {
            published: input.published,
          },
        })
        return true
      } catch (error) {
        return false
      }
    }),
  setProductMainImage: protectedProcedure
    .input(updateProductMainImageSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const image = await ctx.prisma.productImage.findUnique({
          where: {
            id: input.mainImageId,
          },
        })
        if (!image) {
          throw new trpc.TRPCError({
            code: 'NOT_FOUND',
            message: 'Image not found',
          })
        }
        await ctx.prisma.product.update({
          where: {
            id: input.productId,
          },
          data: {
            mainImageId: input.mainImageId,
          },
        })
        return true
      } catch (error) {
        return false
      }
    }),
  deleteProductImage: protectedProcedure
    .input(deleteProductImageSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.product.update({
          where: {
            id: input.productId,
          },
          data: {
            images: {
              delete: {
                id: input.imageId,
              },
            },
          },
        })
        return true
      } catch (error) {
        throw new trpc.TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to delete image',
        })
      }
    }),
})

export { productRouter }
