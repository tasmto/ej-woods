import { getAuth } from '@clerk/nextjs/server'
import { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from '../utils/prisma'

const userContext = (req: NextApiRequest) => {
  const user = getAuth(req)
  return user
}

const createContext = async ({
  req,
  res,
}: {
  req: NextApiRequest
  res: NextApiResponse
}) => {
  const user = getAuth(req)
  return { req, res, prisma, user: userContext(req) }
}

export { createContext }
export type Context = ReturnType<typeof createContext>
