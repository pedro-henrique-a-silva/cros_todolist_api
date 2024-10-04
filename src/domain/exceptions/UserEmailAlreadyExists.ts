export default class UserEmailAlreadyExists extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'UserEmailAlreadyExists'
  }
}
