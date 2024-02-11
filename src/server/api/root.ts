// import { postRouter } from "@/server/api/routers/post";
import { adminRouter } from '@/server/api/routers/account.router'
import { orderRouter } from '@/server/api/routers/order.route'
import { productRouter } from '@/server/api/routers/product.route'
import { createTRPCRouter } from "@/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  // post: postRouter,
  products: productRouter,
  orders: orderRouter,
  admin: adminRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
