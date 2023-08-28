import { router } from '@trpc/server' // helper function that helps us create fully typed routes
import { Context } from './createContext'

const createRouter = () => {
  return t.router({
      superjson: t.procedure.transformer(),
  })

}

export { createRouter }
