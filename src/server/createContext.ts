import { NextApiRequest, NextApiResponse } from 'next'
import { verifyJWT } from '../utils/jwt'
import { prisma } from '../utils/prisma'

interface ctxUser {
  id: string
  email: string
  name: string
  iat: string
  exp: number
}

// Gets the user from the request cookie
const getUserFromRequest = (req: NextApiRequest) => {
  const token = req.cookies.token
  if (!token) return null

  try {
    const verified = verifyJWT<ctxUser>(token)
    return verified
  } catch (error) {
    return null
  }
}

const createContext = ({
  req,
  res,
}: {
  req: NextApiRequest
  res: NextApiResponse
}) => {
  const user = getUserFromRequest(req)
  return { req, res, prisma, user }
}

export { createContext }
export type Context = ReturnType<typeof createContext>
