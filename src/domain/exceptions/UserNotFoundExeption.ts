import CustomException from './CustomException'

export default class UserNotFoundExeption extends CustomException {
  protected _statusCode: number = 400
  constructor(message: string) {
    super(message)
    this.name = 'UserNotFoundExeption'
  }
}
