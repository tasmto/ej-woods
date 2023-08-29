import { protectedProcedure, router } from '../createRouter'

const adminRouter = router({
  me: protectedProcedure.query(async ({ ctx }) => {
    return (await ctx).auth
  }),
})

export { adminRouter }
