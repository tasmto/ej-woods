import { createServerSideHelpers } from '@trpc/react-query/server'
import * as superjson from 'superjson'

import { createClientContext } from '@/pages/api/trpc/[trpc]'
import { appRouter } from '@/server/route/app.router'

const ssg = createServerSideHelpers({
  router: appRouter,
  transformer: superjson,
  ctx: await createClientContext(),
})

export default ssg
