import CustomException from '../../domain/exceptions/CustomException'

export default class BadRequestException extends CustomException {
  protected _statusCode: number = 400
  constructor(message: string) {
    super(message)
    this.name = 'CreateUserException'
  }
}
