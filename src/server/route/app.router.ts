import { productRouter } from '@/server/route/product.route'
import { saleRouter } from '@/server/route/sale.route'

import { createRouter } from '../createRouter'

// import { postRouter } from './post.router'
// import { userRouter } from './user.router'

const appRouter = createRouter()
  // .merge('users.', userRouter)
  // .merge('posts.', postRouter)
  .merge('products.', productRouter)
  .merge('sales.', saleRouter)

export { appRouter }
export type AppRouter = typeof appRouter
