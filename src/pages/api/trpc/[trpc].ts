import { createNextApiHandler } from '@trpc/server/adapters/next'
import type * as trpcNext from '@trpc/server/adapters/next'
import { env } from '@/env'
import { appRouter } from '@/server/api/root'
import { createTRPCContext } from '@/server/api/trpc'
import { type PrismaClient, Prisma } from '@prisma/client'
import { type PrismaClientOptions } from '@prisma/client/runtime/library'

// export API handler
export default createNextApiHandler({
  router: appRouter,
  createContext: createTRPCContext,
  onError:
    env.NODE_ENV === 'development'
      ? ({ path, error }) => {
          console.error(
            `❌ tRPC failed on ${path ?? '<no-path>'}: ${error.message}`,
          )
        }
      : undefined,
})

export const createClientContext = async (
  opts?: trpcNext.CreateNextContextOptions,
) => {
  return {
    req: opts?.req,
    res: opts?.res,
    prisma,
    auth: null,
  } as unknown as {
    req: trpcNext.CreateNextContextOptions['req']
    res: trpcNext.CreateNextContextOptions['res']
    prisma: PrismaClient<
      PrismaClientOptions,
      never,
      // Prisma.RejectOnNotFound | Prisma.RejectPerOperation
      any
    >
    auth: null
  }
}
