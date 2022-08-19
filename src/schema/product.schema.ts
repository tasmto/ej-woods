import z from 'zod'

import { maxItemsFetchLimit } from '@/constants/constants'

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

const getSingleProductSchema = z.object({
  productId: z.number(),
})

const getMultipleProductsSchema = z.object({
  limit: z
    .number()
    .max(maxItemsFetchLimit)
    .min(2)
    .default(maxItemsFetchLimit)
    .nullable(),
  type: z.enum(['WOOD', 'FURNITURE']).nullable().default(null), // todo; infer this from a global source
  name: z
    .string()
    .min(3, 'Please type at least 3 characters')
    .nullable()
    .default(null),
  page: z.number().nullable().default(null),
})
export type GetMultipleProductsInput = z.TypeOf<
  typeof getMultipleProductsSchema
>

export {
  createProductSchema,
  getMultipleProductsSchema,
  getSingleProductSchema,
}
