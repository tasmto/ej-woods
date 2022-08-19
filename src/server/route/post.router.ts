import {
  createPostSchema,
  getPostSinglePostSchema,
} from '../../schema/post.schema'
import { createRouter } from '../createRouter'
import * as trpc from '@trpc/server'

const postRouter = createRouter()
  .mutation('create-post', {
    input: createPostSchema,
    async resolve({ input, ctx }) {
      if (!ctx.user)
        throw new trpc.TRPCError({
          code: 'FORBIDDEN',
          message:
            'User not currently logged in, cannot create post while logged out',
        })

      const post = await ctx.prisma.post.create({
        data: { ...input, user: { connect: { id: ctx.user.id } } },
      })

      return post
    },
  })
  .query('posts', {
    resolve({ input, ctx }) {
      return ctx.prisma.post.findMany()
    },
  })
  .query('single-post', {
    input: getPostSinglePostSchema,
    resolve({ input, ctx }) {
      return ctx.prisma.post.findUnique({
        where: {
          id: input.postId,
        },
      })
    },
  })

export { postRouter }
