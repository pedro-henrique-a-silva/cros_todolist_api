import { z } from 'zod'

export const jwtScheme = z.object({
  authorization: z.string(),
})
