import { Product } from '@prisma/client'
import * as trpc from '@trpc/server'
import { randomUUID } from 'crypto'
import CryptoJS from 'crypto-js'

import {
  CreateOrderInput,
  createOrderSchema,
  getOrderSchema,
} from '@/schema/order.schema'

import { createRouter } from '../createRouter'
// todo: Add middleware to make sure only auth'ed users see unpublished products

const orderRouter = createRouter()
  .mutation('create-order', {
    input: createOrderSchema,
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
            productInCart: CreateOrderInput['products'][0]
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

      const order = await ctx.prisma.order.create({
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

      const uniqueNonce = randomUUID().replaceAll('-', '')
      try {
        const paymentRequestBody = {
          amount: '2',
          'authentication.entityId': process.env.PEACH_ENTITY_ID,
          // 'billing.city': 'Cape Town',
          // 'billing.company': 'CompanyA',
          // 'billing.country': 'ZA',
          // 'billing.postcode': '1234',
          // 'billing.state': 'Western Cape',
          // 'billing.street1': '1 Example Road',
          // 'billing.street2': 'LocalityA',
          // cancelUrl: 'https://ejwoods.co.za/OrderNo453432/cancelled',
          // 'cart.discount': '02.25',
          // 'cart.shippingAmount': '12.25',
          // 'cart.tax': '15.00',
          // createRegistration: 'false',
          currency: 'ZAR',
          // 'customer.birthDate': '1970-02-17',
          // 'customer.email': 'johnsmith@mail.com',
          // 'customer.givenName': 'John',
          // 'customer.idNumber': '9001010000084',
          // 'customer.ip': '192.168.1.1',
          // 'customer.merchantCustomerId': '971020',
          // 'customer.mobile': '27123456789',
          // 'customer.phone': '27123456789',
          // 'customer.status': 'EXISTING',
          // 'customer.surname': 'Smith',
          defaultPaymentMethod: 'CARD',
          // forceDefaultMethod: 'false',
          // merchantInvoiceId: 'INV-0001',
          merchantTransactionId: 'OrderNo453432' + order.id,
          nonce: uniqueNonce,
          notificationUrl: 'https://ejwoods.co.za/OrderNo453432/webhook',
          // originator: 'Webstore',
          paymentType: 'DB',
          // returnTo: 'STORE',
          shopperResultUrl: 'https://ejwoods.co.za/OrderNo453432',
          // 'shipping.city': 'Cape Town',
          // 'shipping.company': 'CompanyA',
          // 'shipping.country': 'ZA',
          // 'shipping.postcode': '1234',
          // 'shipping.state': 'Western Cape',
          // 'shipping.street1': '1 Example Road',
          // 'shipping.street2': 'LocalityA',
        }

        const message = Object.keys(paymentRequestBody)
          .map(
            (key) =>
              // @ts-expect-error: key is a key of paymentRequestBody
              key + paymentRequestBody[key]
          )
          .join('')
          .replaceAll(' ', '')
        const secret = process.env.PEACH_CLIENT_SECRET as string
        console.log('message', message)
        const signature = CryptoJS.HmacSHA256(message, secret).toString(
          CryptoJS.enc.Hex
        )

        console.log(
          '🚀 ~ file: order.route.ts ~ line 144 ~ .then ~ sig',
          signature
        )

        const options = {
          method: 'POST',
          url: 'https://testsecure.peachpayments.com/checkout/initiate',
          headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            referer: 'https://ejwoods.co.za',
            Referer: 'https://ejwoods.co.za',
          },
          body: JSON.stringify({
            ...paymentRequestBody,
            signature,
          }),
        }

        const req = await fetch(
          'https://testsecure.peachpayments.com/checkout/initiate',
          options
        )
        const data = await req.json()
        console.log('🚀 ~ file: order.route.ts ~ line 149 ~ .then ~ data', data)

        // return data
        return order.id
      } catch (error) {
        console.error(error)
        throw new trpc.TRPCError({
          code: 'BAD_REQUEST',
          message: 'Payment failed, payment gateway error',
          cause: error,
        })
      }
    },
  })
  .query('get-order', {
    input: getOrderSchema,
    async resolve({ input, ctx }) {
      const order = await ctx.prisma.order.findUnique({
        where: { id: input.orderId },
        include: {
          products: {
            include: {
              product: {
                select: {
                  id: true,
                  name: true,
                  weight: true,
                  description: true,
                  type: true,
                  images: {
                    // take only the first image
                    take: 1,
                  },
                },
              },
            },
          },
        },
      })
      if (!order) {
        throw new trpc.TRPCError({
          code: 'NOT_FOUND',
          message: 'order not found',
        })
      }
      return order
    },
  })

export { orderRouter }
