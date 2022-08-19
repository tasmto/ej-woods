import z, { string } from 'zod'

const createUserSchema = z.object({
  name: string(),
  email: string().email(),
})
export type CreateUserInput = z.TypeOf<typeof createUserSchema>

const createUserOutputSchema = z.object({
  name: string(),
  email: string().email(),
})

const requestOtpSchema = z.object({
  email: string().email(),
  redirect: string().default('/'),
})
export type RequestOptInput = z.TypeOf<typeof requestOtpSchema>

const verifyOtpSchema = z.object({
  hash: z.string(),
})

const requestFullProfileOutputSchema = z.object({
  name: string(),
  email: string().email(),
  // Add updated at etc...
})
export type FullProfileSchema = z.TypeOf<typeof requestFullProfileOutputSchema>

export {
  createUserSchema,
  createUserOutputSchema,
  requestOtpSchema,
  verifyOtpSchema,
}
