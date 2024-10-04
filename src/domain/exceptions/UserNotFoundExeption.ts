import CustomException from './CustomException'

export default class UserNotFoundExeption extends CustomException {
  protected _statusCode: number = 404
  constructor(message: string) {
    super(message)
    this.name = 'UserNotFoundExeption'
  }
}
