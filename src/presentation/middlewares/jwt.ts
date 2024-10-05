import { NextFunction, Response } from 'express'
import JWTDomain from '../../domain/services/JwtDomain'
import BadRequestException from '../exceptions/BadRequestException'
import { jwtScheme } from '../schemes/jwtScheme'
import { RequestWitJwt } from '../../domain/interfaces/Task'
import UnauthorizedException from '../exceptions/UnauthorizedException'

export const jwtValidator = (
  req: RequestWitJwt,
  res: Response,
  next: NextFunction,
) => {
  const tokenData = jwtScheme.safeParse(req.headers)

  if (!tokenData.success) {
    throw new UnauthorizedException('Token not provided')
  }

  try {
    const decoded = JWTDomain.verify(tokenData.data.authorization.split(' ')[1])

    req.user = {
      name: decoded?.name,
      email: decoded?.email,
    }
    return next()
  } catch {
    throw new BadRequestException('Token not provided')
  }
}
