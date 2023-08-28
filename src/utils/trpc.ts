import { createReactQueryHooks } from '@trpc/react-query'
import { inferProcedureOutput } from '@trpc/server'

import { AppRouter } from '../server/route/app.router'

// This is the trpc instance we can use on the frontend
// We add the _app router as generic
const trpc = createReactQueryHooks<AppRouter>()

// Some typeScript witchcraft to infer the type from our trpc queries
type TQuery = keyof AppRouter['_def']['queries']
export type InferQueryOutput<TRouteKey extends TQuery> = inferProcedureOutput<
  AppRouter['_def']['queries'][TRouteKey]
>

export { trpc }
