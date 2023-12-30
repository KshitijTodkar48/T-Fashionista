import { z } from 'zod'

export const productDetailsSchema = z.object({
    title: z.string().min(1).max(40),
    description: z.string().min(1).max(300).default(''),
    price: z.string().min(1).max(20),
    imageURL: z.string().min(1),
    published: z.boolean().default(false)
})