import { z } from 'zod'

export const toCreateTaskScheme = z.object({
  title: z.string(),
  content: z.string(),
})
