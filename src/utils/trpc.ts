import { createReactQueryHooks } from '@trpc/react'
import { AppRouter } from '../server/route/app.router'

// This is the trpc instance we can use on the frontend
// We add the _app router as generic
const trpc = createReactQueryHooks<AppRouter>()

export { trpc }
