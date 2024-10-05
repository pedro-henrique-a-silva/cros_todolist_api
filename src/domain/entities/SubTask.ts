import Task from './Task'

export default class SubTask extends Task {
  private _parentId: string

  constructor(
    id: string,
    title: string,
    content: string,
    userId: string,
    parentId: string,
  ) {
    super(id, title, content, userId)
    this._parentId = parentId
  }

  get parentId(): string {
    return this._parentId
  }

  set parentId(value: string) {
    this._parentId = value
  }

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      content: this.content,
      parentId: this._parentId,
    }
  }
}
