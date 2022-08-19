import { router } from '@trpc/server' // helper function that helps us create fully typed routes
import superjson from 'superjson'
import { Context } from './createContext'

const createRouter = () => {
  return router<Context>().transformer(superjson)
}

export { createRouter }
