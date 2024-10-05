export default class Task {
  private readonly _id: string
  private _title: string
  private _content: string
  private _userId: string
  private _status: 'PENDING' | 'DONE' = 'PENDING'

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

  get status(): 'PENDING' | 'DONE' {
    return this._status
  }

  set status(value: 'PENDING' | 'DONE') {
    this._status = value
  }

  toJSON() {
    return {
      id: this._id,
      title: this._title,
      content: this._content,
    }
  }
}
