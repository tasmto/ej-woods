// import { createServerSideHelpers } from '@trpc/react-query/server'
// import * as superjson from 'superjson'

import { createClientContext } from '@/pages/api/trpc/[trpc]'
import { appRouter } from '@/server/api/routers/app.router'

// const ssg = createServerSideHelpers({
//   router: appRouter,
//   transformer: superjson,
//   ctx: await createClientContext(),
// })

// export default ssg

import { createServerSideHelpers } from '@trpc/react-query/server'
import { createContext } from '@/server/createContext'
import superjson from 'superjson'
import { NextResponse } from 'next/server'

const ssg = createServerSideHelpers({
  router: appRouter,
  ctx: {},
  transformer: superjson, // optional - adds superjson serialization
})
export default ssg
