import z from 'zod'

const createPostSchema = z.object({
  title: z.string().max(200, 'Titles need to be less than 200 characters...'),
  body: z.string().min(15, 'Your post needs to be longer...'),
})
export type CreatePostInput = z.TypeOf<typeof createPostSchema>

const getPostSinglePostSchema = z.object({
  postId: z.string().uuid(),
})

export { createPostSchema, getPostSinglePostSchema }
