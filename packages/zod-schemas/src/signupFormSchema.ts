import { z } from 'zod'

export const signupFormSchema = z.object({
  name: z.string().max(50),
  email: z.string().email(),
  password: z.string().min(6),
})