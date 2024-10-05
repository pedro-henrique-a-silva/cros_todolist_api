import { Response, Router } from 'express'
import { jwtValidator } from '../middlewares/jwt'
import TaskDomain from '../../domain/services/TaskDomain'
import {
  idParamScheme,
  toCreateTaskScheme,
  toUpdateTaskScheme,
} from '../schemes/taskSchemes'
import BadRequestException from '../exceptions/BadRequestException'
import { RequestWitJwt } from '../../domain/interfaces/Task'

const taskDomain = new TaskDomain()
const taskRouter = Router()

taskRouter.use(jwtValidator)

taskRouter.get('/', async (req: RequestWitJwt, res: Response) => {
  const tasks = await taskDomain.findAllTasks(req.user!.email)

  return res.status(200).json(tasks)
})

taskRouter.post('/', async (req: RequestWitJwt, res: Response) => {
  const taskData = toCreateTaskScheme.safeParse(req.body)

  if (!taskData.success) {
    throw new BadRequestException(taskData.error.errors[0].message)
  }

  const createdTask = await taskDomain.createTask({
    ...taskData.data,
    email: req.user!.email,
  })

  return res.status(201).json(createdTask)
})

taskRouter.put('/:id', async (req: RequestWitJwt, res: Response) => {
  const tasksData = toUpdateTaskScheme.safeParse(req.body)
  const idData = idParamScheme.safeParse(req.params)

  if (!tasksData.success || !idData.success) {
    throw new BadRequestException('Bad Request')
  }

  const updatedTask = await taskDomain.updateTask(
    idData.data.id,
    tasksData.data,
    req.user!.email,
  )

  return res.status(200).json(updatedTask)
})

export default taskRouter
