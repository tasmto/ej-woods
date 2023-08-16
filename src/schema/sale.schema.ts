import z from 'zod'

import {
  deliveryTimes,
  PaymentMethodsIds,
  paymentMethodsIds,
} from '@/constants/constants'
import { InferQueryOutput } from '@/utils/trpc'

const createSaleSchema = z.object({
  totalPrice: z.number(),
  totalQuantity: z.number(),
  products: z
    .object({
      productId: z.number(),
      quantity: z.number(),
      price: z.number(),
    })
    .array(),
  customerName: z.string(),
  customerEmail: z.string().email(),
  customerPhoneNumber: z.string(),

  deliveryTimeSlotStart: z.enum([
    deliveryTimes.at(0) as string,
    ...deliveryTimes.slice(1),
  ]),
  deliveryTimeSlotEnd: z.enum([
    deliveryTimes.at(0) as string,
    ...deliveryTimes.slice(1),
  ]),
  deliveryPhoneNumber: z.string(),
  deliveryAddress: z.string(),
  paymentMethod: z.enum([
    paymentMethodsIds[0] as PaymentMethodsIds,
    ...paymentMethodsIds,
  ]),
})
export type CreateSaleInput = z.TypeOf<typeof createSaleSchema>

// ------------ Request Response Types --------------------

export type SingleProductTypeWithCrossSells =
  InferQueryOutput<'products.single-product'>

export type SingleProductType = Omit<
  SingleProductTypeWithCrossSells,
  'crossSells'
>

export { createSaleSchema }
