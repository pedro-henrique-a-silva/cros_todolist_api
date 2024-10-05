import PrismaTaskRepository from '../../infra/database/repository/PrismaTaskRepository'
import PrismaUserRepository from '../../infra/database/repository/PrismaUserRepository'
import Task from '../entities/Task'
import { randomUUID } from 'node:crypto'
import UserNotFoundExeption from '../exceptions/UserNotFoundExeption'
import {
  TaskDomainInterface,
  TaskForCreateDto,
  TaskForUpdateDto,
} from '../interfaces/Task'
import UserRepository from '../repository/UserRepository'
import TaskRepository from '../repository/TaskRepository'

export default class TaskDomain implements TaskDomainInterface {
  private userRepository: UserRepository = new PrismaUserRepository()
  private taskRepository: TaskRepository = new PrismaTaskRepository()

  private async userExists(email: string) {
    const userExists = await this.userRepository.findUserByEmail(email)

    if (!userExists) {
      throw new UserNotFoundExeption('User Not Found')
    }

    return userExists
  }

  async createTask(taskData: TaskForCreateDto): Promise<Task> {
    const userExists = await this.userExists(taskData.email)

    const task = new Task(
      randomUUID(),
      taskData.title,
      taskData.content,
      userExists.id,
    )

    const taskCreated = await this.taskRepository.createTask(task)

    return taskCreated
  }

  async findAllTasks(userEmail: string): Promise<Task[]> {
    const userExists = await this.userExists(userEmail)

    const tasks = await this.taskRepository.findAllTasks(userExists.id)

    return tasks
  }

  async updateTask(
    id: string,
    taskData: TaskForUpdateDto,
    userEmail: string,
  ): Promise<Task> {
    const userExists = await this.userExists(userEmail)

    const task = new Task(id, taskData.title, taskData.content, userExists.id)
    task.status = taskData.status

    const taskUpdated = await this.taskRepository.updateTask(task)

    return taskUpdated
  }

  async findAllSubtasks(id: string, userEmail: string): Promise<Task[]> {
    const userExists = await this.userExists(userEmail)

    const taskUpdated = await this.taskRepository.findAllSubtasks(
      id,
      userExists.id,
    )

    return taskUpdated
  }
}
