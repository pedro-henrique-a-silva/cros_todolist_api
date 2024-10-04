export default abstract class CustomException extends Error {
  protected _statusCode: number = 500

  constructor(message: string) {
    super(message)
    this.name = 'CustomException'
  }

  get statusCode(): number {
    return this._statusCode
  }
}
