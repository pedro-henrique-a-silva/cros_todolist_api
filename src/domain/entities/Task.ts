export default class Task {
  public readonly _id: string
  public _title: string
  public _content: string
  public _userId: string

  constructor(id: string, title: string, content: string, userId: string) {
    this._id = id
    this._title = title
    this._content = content
    this._userId = userId
  }

  get id(): string {
    return this._id
  }

  get title(): string {
    return this._title
  }

  set title(value: string) {
    this._title = value
  }

  get content(): string {
    return this._content
  }

  set content(value: string) {
    this._content = value
  }

  get userId(): string {
    return this._userId
  }

  set userId(value: string) {
    this._userId = value
  }
}
