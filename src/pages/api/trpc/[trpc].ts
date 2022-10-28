import * as trpcNext from '@trpc/server/adapters/next'

import { createContext } from '../../../server/createContext'
import { appRouter } from '../../../server/route/app.router'
// This allows trpc to intercept the nextjs request
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext,

  onError({ error }) {
    if (error.code === 'INTERNAL_SERVER_ERROR') {
      console.error('Something went wrong...', error)
    } else {
      console.error(error)
    }
  },
})

// create context based of incoming request
// set as optional here so it can also be re-used for `getStaticProps()`
export const createClientContext = async (
  opts?: trpcNext.CreateNextContextOptions
) => {
  return {
    req: opts?.req,
    res: opts?.res,
    prisma,
    user: null,
  }
}
