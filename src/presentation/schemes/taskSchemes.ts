import { z } from 'zod'

export const toCreateTaskScheme = z.object({
  title: z.string(),
  content: z.string(),
})

export const toUpdateTaskScheme = z.object({
  title: z.string(),
  content: z.string(),
  status: z.enum(['PENDING', 'DONE']),
})

export const idParamScheme = z.object({
  id: z.string().uuid(),
})
