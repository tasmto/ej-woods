import { inferProcedureOutput } from '@trpc/server'
import { atom } from 'jotai'
import { AppRouter } from '../../../server/route/app.router'

// Some typeScript witchcraft to infer the type from our trpc queries
type TQuery = keyof AppRouter['_def']['queries']
export type InferQueryOutput<TRouteKey extends TQuery> = inferProcedureOutput<
  AppRouter['_def']['queries'][TRouteKey]
>

const userAtom = atom<InferQueryOutput<'users.me'> | undefined | null>(
  undefined
)

export { userAtom }
