import { Request, Response, Router } from 'express'
import { toCreateScheme } from '../schemes/userSchemes'
import UserDomain from '../../domain/services/UserDomain'
import CreateUserException from '../exceptions/CreateUserException'

const userRouter = Router()

const userDomain = new UserDomain()

userRouter.post('/create', async (req: Request, res: Response) => {
  const createData = toCreateScheme.safeParse(req.body)

  if (!createData.success) {
    throw new CreateUserException(createData.error.errors[0].message)
  }

  const createdUser = await userDomain.createUser(createData.data)

  res.status(201).send(createdUser)
})

export default userRouter
