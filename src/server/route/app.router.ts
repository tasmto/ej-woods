import { adminRouter } from '@/server/route/account.router'
import { orderRouter } from '@/server/route/order.route'
import { productRouter } from '@/server/route/product.route'

import { router } from '../createRouter'

// import { postRouter } from './post.router'
// import { userRouter } from './user.router'

const appRouter = router({
  products: productRouter,
  orders: orderRouter,
  admin: adminRouter,
})
// .middleware(async ({ path, type, next }) => {
//   const start = Date.now()
//   const result = await next()
//   const durationMs = Date.now() - start
//   result.ok
//     ? console.log('OK request timing:', { path, type, durationMs })
//     : console.error('Non-OK request timing', { path, type, durationMs })
//   return result
// })
// // .merge('users.', userRouter)
// // .merge('posts.', postRouter)
// .merge('products.', productRouter)
// .merge('orders.', orderRouter)
// .interop()

export { appRouter }
export type AppRouter = typeof appRouter
