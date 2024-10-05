export default class User {
  private _id: string
  private _name: string
  private _email: string
  private _password: string

  constructor(id: string, name: string, email: string, password: string) {
    this._id = id
    this._name = name
    this._email = email
    this._password = password
  }

  get id(): string {
    return this._id
  }

  set id(id: string) {
    this._id = id
  }

  get name(): string {
    return this._name
  }

  set name(name: string) {
    this._name = name
  }

  get email(): string {
    return this._email
  }

  set email(email: string) {
    this._email = email
  }

  get password(): string {
    return this._password
  }

  set password(password: string) {
    this._password = password
  }

  toJson() {
    return {
      id: this._id,
      name: this._name,
      email: this._email,
    }
  }
}
