import { Request, Response, Router } from 'express'
import { toCreateScheme, toLoginScheme } from '../schemes/userSchemes'
import UserDomain from '../../domain/services/UserDomain'
import BadRequestException from '../exceptions/BadRequestException'

const userDomain = new UserDomain()
const userRouter = Router()

userRouter.post('/create', async (req: Request, res: Response) => {
  const createData = toCreateScheme.safeParse(req.body)

  if (!createData.success) {
    throw new BadRequestException(createData.error.errors[0].message)
  }

  const createdUser = await userDomain.createUser(createData.data)

  return res.status(201).json(createdUser)
})

userRouter.post('/login', async (req: Request, res: Response) => {
  const loginData = toLoginScheme.safeParse(req.body)

  if (!loginData.success) {
    throw new BadRequestException(loginData.error.errors[0].message)
  }

  const userAuthenticated = await userDomain.login(loginData.data)

  return res.status(200).json(userAuthenticated)
})

export default userRouter
