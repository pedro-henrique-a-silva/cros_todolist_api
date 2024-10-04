import { JwtPayload, Secret, sign, SignOptions, verify } from 'jsonwebtoken'

export default class JWTDomain {
  private static secret: Secret =
    process.env.JWT_SECRET || 'password-super-secret'

  private static jwtConfig: SignOptions = {
    expiresIn: '1d',
    algorithm: 'HS256',
  }

  static sign(payload: JwtPayload): string {
    return sign({ ...payload }, this.secret, this.jwtConfig)
  }

  static verify(token: string): JwtPayload | null {
    try {
      return verify(token, this.secret) as JwtPayload
    } catch {
      return null
    }
  }
}
