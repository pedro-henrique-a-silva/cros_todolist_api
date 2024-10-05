import { Request } from 'express'
import Task from '../entities/Task'

export interface TaskForCreateDto {
  title: string
  content: string
  email: string
}

export interface RequestWitJwt extends Request {
  user?: {
    name: string
    email: string
  }
}

export interface TaskDomainInterface {
  createTask(taskData: TaskForCreateDto): Promise<Task>
  findAllTasks(userEmail: string): Promise<Task[]>
}
