import { createGzip } from 'zlib'
import {
  createUserOutputSchema,
  createUserSchema,
  requestOtpSchema,
  verifyOtpSchema,
} from '../../schema/user.schema'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import { createRouter } from '../createRouter'
import * as trpc from '@trpc/server'
import { sendLoginEmail } from '../../utils/mailer'
import { baseUrl } from '../../constants/constants'
import { decode, encode } from '../../utils/base64'
import { signJWT } from '../../utils/jwt'
import { serialize } from 'cookie'

const userRouter = createRouter()
  .mutation('register-user', {
    input: createUserSchema, // validates our input for us

    async resolve({ ctx, input }) {
      const { email, name } = input

      try {
        const user = await ctx.prisma.user.create({
          data: {
            name,
            email,
          },
        })

        return user
      } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === 'P2002')
            throw new trpc.TRPCError({
              code: 'CONFLICT',
              message: 'User already exists...',
            })
        }
        throw new trpc.TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Something went wrong...',
        })
      }
    },
  })
  .mutation('request-otp', {
    input: requestOtpSchema,
    async resolve({ input, ctx }) {
      const { email, redirect } = input

      const user = await ctx.prisma.user.findUnique({
        where: {
          email,
        },
      })

      if (!user)
        throw new trpc.TRPCError({
          code: 'NOT_FOUND',
          message: 'User account not found',
        })

      const token = await ctx.prisma.loginToken.create({
        data: {
          redirect,
          user: {
            connect: {
              id: user.id,
            },
          },
        },
      })

      // Send email to user
      await sendLoginEmail({
        token: encode(`${email}:${token.id}`),
        email,
        url: baseUrl,
      })

      return user
    },
  })
  .query('verify-otp', {
    input: verifyOtpSchema,
    async resolve({ ctx, input }) {
      const [email, id] = decode(input.hash).split(':')

      const token = await ctx.prisma.loginToken.findFirst({
        where: {
          id,
          user: { email },
        },
        include: { user: true },
      })

      if (!token)
        throw new trpc.TRPCError({
          code: 'FORBIDDEN',
          message: 'Invalid token',
        })

      const jwt = signJWT({ email: token.user.email, id: token.user.id })
      ctx.res.setHeader(
        'Set-Cookie',
        serialize('token', jwt, { path: '/', maxAge: 24 * 60 * 60 * 100 })
      )

      return { redirect: token.redirect }
    },
  })
  .query('me', {
    async resolve({ ctx }) {
      if (!ctx.user)
        throw new trpc.TRPCError({
          code: 'UNAUTHORIZED',
          message: 'User not logged in ',
        })

      const user = await ctx.prisma.user.findUnique({
        where: {
          id: ctx.user?.id,
        },
      })

      if (!user)
        throw new trpc.TRPCError({
          code: 'UNAUTHORIZED',
          message: 'User session not valid',
        })

      return user
    },
  })

export { userRouter }
