export default class CreateUserException extends Error {
  private statusCode: number = 400
  constructor(message: string) {
    super(message)
    this.name = 'CreateUserException'
  }
}
