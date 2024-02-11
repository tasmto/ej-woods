import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

const adminRouter = createTRPCRouter({
  me: protectedProcedure.query(async ({ ctx }) => {
    return (await ctx).auth
  }),
})

export { adminRouter }
