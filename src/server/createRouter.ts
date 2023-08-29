// import { router } from '@trpc/server' // helper function that helps us create fully typed routes
// import { Context } from './createContext'

// const createRouter = () => {
//   return t.router({
//       superjson: t.procedure.transformer(),
//   })

// }

// export { createRouter }

import { initTRPC } from '@trpc/server'
import superjson from 'superjson'

import { Context } from './createContext'

const t = initTRPC.context<Context>().create({
  // Optional:
  transformer: superjson,
  // Optional:
  errorFormatter(opts) {
    const { shape } = opts
    return {
      ...shape,
      data: {
        ...shape.data,
      },
    }
  },
})

/**
 * We recommend only exporting the functionality that we
 * use so we can enforce which base procedures should be used
 **/
export const router = t.router
export const mergeRouters = t.mergeRouters
export const publicProcedure = t.procedure
export const protectedProcedure = t.procedure
