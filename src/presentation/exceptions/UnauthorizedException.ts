import CustomException from '../../domain/exceptions/CustomException'

export default class UnauthorizedException extends CustomException {
  protected _statusCode: number = 401
  constructor(message: string) {
    super(message)
    this.name = 'UnauthorizedException'
  }
}
