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

/**
 * @swagger
 * /task:
 *   get:
 *     tags: [Tarefas]
 *     summary: Obtém todas as tarefas principais
 *     description: Retorna todas as tasks principais (que não são subtasks de nenhuma outra). Essa rota requer um token JWT válido.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de tarefas principais retornada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: 'da500959-00cc-4c5f-8fc8-b82242fee018'
 *                   title:
 *                     type: string
 *                     example: 'Tarefa Principal 1'
 *                   content:
 *                     type: string
 *                     example: 'Conteúdo da tarefa principal 1'
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: '2021-10-10T00:00:00Z'
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     example: '2021-10-10T00:00:00Z'
 *       401:
 *         description: Token JWT inválido ou não fornecido.
 */
taskRouter.get('/', async (req: RequestWitJwt, res: Response) => {
  const tasks = await taskDomain.findAllTasks(req.user!.email)

  return res.status(200).json(tasks)
})

/**
 * @swagger
 * /task:
 *   post:
 *     tags: [Tarefas]
 *     summary: Cria uma nova task
 *     description: Cria uma nova task. Esta rota requer um token JWT válido. Retorna 401 se o token estiver incorreto ou 400 se alguma propriedade do corpo estiver incorreta.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *             properties:
 *               title:
 *                 type: string
 *                 example: 'Nova Task'
 *               content:
 *                 type: string
 *                 example: 'Detalhes da nova task.'
 *     responses:
 *       201:
 *         description: Task criada com sucesso.
 *       400:
 *         description: Parâmetro inválido ou ausente.
 *       401:
 *         description: Token JWT inválido ou não fornecido.
 */
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

/**
 * @swagger
 * /task/{id}:
 *   put:
 *     tags: [Tarefas]
 *     summary: Atualiza uma task existente
 *     description: Atualiza uma task pelo seu ID. Esta rota requer um token JWT válido. Retorna 200 com a task atualizada ou 400 se alguma propriedade do corpo estiver incorreta.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: O ID da task a ser atualizada
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *               - status
 *             properties:
 *               title:
 *                 type: string
 *                 example: 'Atualizar título da task'
 *               content:
 *                 type: string
 *                 example: 'Atualizar conteúdo da task.'
 *               status:
 *                 type: string
 *                 enum: ['PENDING', 'DONE']
 *                 example: 'DONE'
 *     responses:
 *       200:
 *         description: Task atualizada com sucesso.
 *       400:
 *         description: Parâmetro inválido ou ausente.
 *       401:
 *         description: Token JWT inválido ou não fornecido.
 *       404:
 *         description: Task não encontrada.
 */
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

/**
 * @swagger
 * /task/{id}/subtasks:
 *   get:
 *     tags: [Tarefas]
 *     summary: Retorna as subtasks de uma task específica
 *     description: Retorna todas as subtasks de uma task identificada pelo seu ID. Requer autenticação JWT. Retorna 200 com a lista de subtasks ou 400 se o ID não estiver no formato correto (UUID).
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: O ID da task principal
 *     responses:
 *       200:
 *         description: Lista de subtasks retornada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: 'da500959-00cc-4c5f-8fc8-b82242fee018'
 *                   title:
 *                     type: string
 *                     example: 'Subtask 1'
 *                   content:
 *                     type: string
 *                     example: 'Conteúdo da subtask'
 *                   status:
 *                     type: string
 *                     enum: ['PENDING', 'DONE']
 *                     example: 'PENDING'
 *       400:
 *         description: ID da task inválido (não é um UUID válido).
 *
 */
taskRouter.get('/:id/subtasks', async (req: RequestWitJwt, res: Response) => {
  const idData = idParamScheme.safeParse(req.params)

  if (!idData.success) {
    throw new BadRequestException('Bad Request')
  }

  const subtasks = await taskDomain.findAllSubtasks(
    idData.data.id,
    req.user!.email,
  )

  return res.status(200).json(subtasks)
})

/**
 * @swagger
 * /task/{id}/subtasks:
 *   post:
 *     tags: [Tarefas]
 *     summary: Cria uma nova subtask
 *     description: Cria uma nova subtask para uma task principal, usando o ID da task como referência. O JWT deve ser válido, e o ID precisa estar no formato UUID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: O ID da task principal
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *             properties:
 *               title:
 *                 type: string
 *                 example: 'Subtask 1'
 *               content:
 *                 type: string
 *                 example: 'Conteúdo da subtask'
 *     responses:
 *       201:
 *         description: Subtask criada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: 'da500959-00cc-4c5f-8fc8-b82242fee018'
 *                 title:
 *                   type: string
 *                   example: 'Subtask 1'
 *                 content:
 *                   type: string
 *                   example: 'Conteúdo da subtask'
 *                 status:
 *                   type: string
 *                   example: 'PENDING'
 *       400:
 *         description: Parâmetro ausente, body inválido, ou ID da task no formato errado (não UUID).
 *       401:
 *         description: Token JWT inválido ou ausente.
 *       404:
 *         description: Task principal não encontrada.
 */
taskRouter.post('/:id/subtasks', async (req: RequestWitJwt, res: Response) => {
  const taskData = toCreateTaskScheme.safeParse(req.body)
  const idData = idParamScheme.safeParse(req.params)

  if (!taskData.success || !idData.success) {
    throw new BadRequestException('Bad Request')
  }

  const createdTask = await taskDomain.createSubTask(
    {
      ...taskData.data,
      email: req.user!.email,
    },
    idData.data.id,
  )

  return res.status(201).json(createdTask)
})

/**
 * @swagger
 * /task/{id}:
 *   delete:
 *     tags: [Tarefas]
 *     summary: Deleta uma task
 *     description: Deleta uma task do banco de dados. A rota requer um token JWT válido.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: O ID da task a ser deletada
 *     responses:
 *       204:
 *         description: Task deletada com sucesso.
 *       400:
 *         description: ID inválido (não segue o formato UUID).
 *       401:
 *         description: Token JWT inválido ou ausente.
 */
taskRouter.delete('/:id', async (req: RequestWitJwt, res: Response) => {
  const idData = idParamScheme.safeParse(req.params)

  if (!idData.success) {
    throw new BadRequestException('Bad Request')
  }

  await taskDomain.deleteTask(idData.data.id, req.user!.email)

  return res.status(204).send()
})

export default taskRouter
