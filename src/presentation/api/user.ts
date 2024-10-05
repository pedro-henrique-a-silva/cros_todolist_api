import { Request, Response, Router } from 'express'
import { toCreateScheme, toLoginScheme } from '../schemes/userSchemes'
import UserDomain from '../../domain/services/UserDomain'
import BadRequestException from '../exceptions/BadRequestException'

const userDomain = new UserDomain()
const userRouter = Router()

/**
 * @swagger
 * /user/create:
 *   post:
 *     tags: [Usuários]
 *     summary: Cria um novo usuário
 *     description: Faz o cadastro de um usuário com nome, email e senha. Retorna 201 se o cadastro for bem-sucedido ou 400 se algum parâmetro estiver inválido ou ausente.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: 'João Silva'
 *               email:
 *                 type: string
 *                 format: email
 *                 example: 'joao@example.com'
 *               password:
 *                 type: string
 *                 example: 'senhaSegura123'
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso.
 *       400:
 *         description: Parâmetro inválido ou ausente.
 */
userRouter.post('/create', async (req: Request, res: Response) => {
  const createData = toCreateScheme.safeParse(req.body)

  if (!createData.success) {
    throw new BadRequestException(createData.error.errors[0].message)
  }

  const createdUser = await userDomain.createUser(createData.data)

  return res.status(201).json(createdUser)
})

/**
 * @swagger
 * /user/login:
 *   post:
 *     tags: [Usuários]
 *     summary: Realiza o login do usuário
 *     description: Faz o login de um usuário utilizando o email e a senha. Retorna 200 com um token JWT, nome e email do usuário se tudo ocorrer bem. Se algum parâmetro estiver incorreto ou faltando ou se o usuário não existir, retorna 400 com a mensagem "User not found". Se a senha estiver incorreta, retorna 400.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: 'john@doe.com'
 *               password:
 *                 type: string
 *                 example: '123456'
 *     responses:
 *       200:
 *         description: Login realizado com sucesso. Retorna um token JWT, nome e email do usuário.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: 'seu_token_jwt_aqui'
 *                 name:
 *                   type: string
 *                   example: 'João Silva'
 *                 email:
 *                   type: string
 *                   example: 'joao@example.com'
 *       400:
 *         description: Parâmetro inválido.
 *       404:
 *         description: Usuário não encontrado.
 *       401:
 *        description: Usuário não autorizado.
 */
userRouter.post('/login', async (req: Request, res: Response) => {
  const loginData = toLoginScheme.safeParse(req.body)

  if (!loginData.success) {
    throw new BadRequestException(loginData.error.errors[0].message)
  }

  const userAuthenticated = await userDomain.login(loginData.data)

  return res.status(200).json(userAuthenticated)
})

export default userRouter
