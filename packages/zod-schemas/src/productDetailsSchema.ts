import { z } from 'zod'

export const productDetailsSchema = z.object({
    title: z.string().max(40),
    description: z.string().max(300).default(''),
    price: z.string(),
    imageURL: z.string(),
    published: z.boolean().default(false)
})