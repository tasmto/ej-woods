import { TRPCError } from '@trpc/server'

import { createRouter } from '../../createRouter'
// todo: Add middleware to make sure only auth'ed users see unpublished products

const adminRouter = createRouter()
  .middleware(async ({ path, type, next }) => {
    const start = Date.now()
    const result = await next()
    const user = (await result.ctx).user
    if (!user) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'You must be logged in to do that',
      })
    }
    return result
  })
  .query('single-product', {})

export { adminRouter }
