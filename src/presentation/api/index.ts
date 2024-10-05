import { Router } from 'express'
import userRouter from './user'
import taskRouter from './tasks'

const router = Router()

router.use('/user', userRouter)

router.use('/task', taskRouter)

export default router
