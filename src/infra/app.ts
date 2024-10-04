import express, { NextFunction, Request, Response } from 'express'
import routes from '../presentation/api'
import CustomException from '../domain/exceptions/CustomException'

const app = express()

app.use(express.json())

app.get('/', (_req: Request, res: Response) => {
  return res.status(200).send('Hello World')
})

app.use(routes)

app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof CustomException) {
    return res.status(err.statusCode).json({
      errorDescription: err.message,
    })
  }

  return res.status(500).json({
    errorCode: 'internal_server_error',
    message: 'Opss! Ocorreu um erro',
  })
})

export default app
