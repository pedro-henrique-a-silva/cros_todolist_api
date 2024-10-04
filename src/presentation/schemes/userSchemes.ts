import { z } from 'zod'

export const toCreateScheme = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
})

export const toLoginScheme = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export default {}
