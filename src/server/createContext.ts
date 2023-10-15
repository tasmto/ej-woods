import {
  getAuth,
  SignedInAuthObject,
  SignedOutAuthObject,
} from '@clerk/nextjs/server'
import { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from '../utils/prisma'

interface AuthContext {
  auth: SignedInAuthObject | SignedOutAuthObject | null
  req: NextApiRequest
  res: NextApiResponse
  prisma: typeof prisma
}

export const createContextInner = ({ auth, req, res, prisma }: AuthContext) => {
  return {
    auth,
    prisma,
    req,
    res,
  }
}

const createContext = ({
  req,
  res,
}: {
  req: NextApiRequest
  res: NextApiResponse
}) => {
  // return { req, res, prisma, user: userContext(req) }
  return createContextInner({ auth: getAuth(req), req, res, prisma })
}

export { createContext }
export type Context = ReturnType<typeof createContext>
