// import { router } from '@trpc/server' // helper function that helps us create fully typed routes
// import { Context } from './createContext'

// const createRouter = () => {
//   return t.router({
//       superjson: t.procedure.transformer(),
//   })

// }

// export { createRouter }

import { initTRPC, TRPCError } from '@trpc/server'
import superjson from 'superjson'

import { Context } from '../../../src/server/createContext'

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
// check if the user is signed in, otherwise throw a UNAUTHORIZED CODE
const isAuthed = t.middleware(async ({ next, ctx }) => {
  const isAuthed = await ctx.auth
  console.log(
    new Date().toLocaleTimeString(),
    '🚀 ~ file createRouter.ts  ~ line 35 ~ auth object: ',
    isAuthed
  )
  if (!isAuthed?.userId) {
    throw new TRPCError({ code: 'UNAUTHORIZED' })
    // return a redirect to the login page
  }
  return next({
    ctx: {
      auth: (await ctx).auth,
    },
  })
})

/**
 * We recommend only exporting the functionality that we
 * use so we can enforce which base procedures should be used
 **/
export const router = t.router
export const mergeRouters = t.mergeRouters
export const publicProcedure = t.procedure
export const protectedProcedure = t.procedure.use(isAuthed)
