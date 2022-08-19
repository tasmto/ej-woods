import { productRouter } from '@/server/route/product.route'

import { postRouter } from './post.router'
import { userRouter } from './user.router'
import { createRouter } from '../createRouter'

const appRouter = createRouter()
  .merge('users.', userRouter)
  .merge('posts.', postRouter)
  .merge('products.', productRouter)

export { appRouter }
export type AppRouter = typeof appRouter
