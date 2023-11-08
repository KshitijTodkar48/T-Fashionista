import { z } from 'zod'

export const signupFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})