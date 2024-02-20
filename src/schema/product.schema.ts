import { ProductImage } from '@prisma/client'
import z from 'zod'

import { maxItemsFetchLimit } from '@/constants/constants'
import { InferQueryOutput } from '@/utils/trpc'

const createProductSchema = z.object({
  name: z.string(),
  description: z.string(),
  images: z.string().array().default([]),
  crossSells: z.number().array().default([]),
  countInStock: z.number().default(10),
  published: z.boolean().default(true),
  type: z.enum(['WOOD', 'FURNITURE']),
  weight: z.number().default(0),
  price: z.number().default(0),
})
export type CreateProductInput = z.TypeOf<typeof createProductSchema>

const updateProductSchema = z.object({
  productId: z.number(),
  name: z.string(),
  description: z.string(),
  type: z.enum(['WOOD', 'FURNITURE']),
  weight: z.number(),
  price: z.number(),
  countInStock: z.number(),
  hasInfiniteStock: z.boolean(),
  published: z.boolean(),
})
export type UpdateProductInput = z.TypeOf<typeof updateProductSchema>

const updateProductStockSchema = z.object({
  productId: z.number(),
  countInStock: z.number(),
  hasInfiniteStock: z.boolean(),
})
export type UpdateProductStockInput = z.TypeOf<typeof updateProductStockSchema>

const updateProductVisibilitySchema = z.object({
  productId: z.number(),
  published: z.boolean(),
})
export type UpdateProductVisibilityInput = z.TypeOf<
  typeof updateProductVisibilitySchema
>
const updateProductMainImageSchema = z.object({
  productId: z.number(),
  mainImageId: z.number(),
})
export type UpdateProductMainImageInput = z.TypeOf<
  typeof updateProductMainImageSchema
>

const deleteProductImageSchema = z.object({
  productId: z.number(),
  imageId: z.number(),
})
export type DeleteProductImageInput = z.TypeOf<typeof deleteProductImageSchema>

const getSingleProductSchema = z.object({
  productId: z.number().optional(),
  slug: z.string().optional(),
})

const getMultipleProductsSchema = z.object({
  limit: z
    .number()
    .max(maxItemsFetchLimit)
    .min(2)
    .default(maxItemsFetchLimit)
    .optional(),
  type: z.enum(['WOOD', 'FURNITURE']).nullable().default(null), // todo; infer this from a global source
  name: z
    .string()
    .min(3, 'Please type at least 3 characters')
    .nullable()
    .default(null),
  page: z.number().nullable().default(null),
  sortBy: z
    .enum(['name', 'price', 'random', 'type', 'createdAt', 'updatedAt'])
    .nullable()
    .default('random'),
  showArchived: z.boolean().default(false),
  sortOrder: z.enum(['asc', 'desc']).nullable().default('asc'),
})
export type GetMultipleProductsInput = z.TypeOf<
  typeof getMultipleProductsSchema
>

// ------------ Request Response Types --------------------

export type SingleProductTypeWithCrossSells =
  InferQueryOutput<'products.single-product'>

export type SingleProductType = Omit<
  SingleProductTypeWithCrossSells,
  'crossSells'
> & {
  images: ProductImage[]
}

export {
  createProductSchema,
  getMultipleProductsSchema,
  getSingleProductSchema,
  updateProductStockSchema,
  updateProductVisibilitySchema,
  updateProductMainImageSchema,
  deleteProductImageSchema,
  updateProductSchema,
}
