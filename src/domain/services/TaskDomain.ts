import PrismaTaskRepository from '../../infra/database/repository/PrismaTaskRepository'
import PrismaUserRepository from '../../infra/database/repository/PrismaUserRepository'
import Task from '../entities/Task'
import { randomUUID } from 'node:crypto'
import UserNotFoundExeption from '../exceptions/UserNotFoundExeption'
import { TaskDomainInterface, TaskForCreateDto } from '../interfaces/Task'
import UserRepository from '../repository/UserRepository'
import TaskRepository from '../repository/TaskRepository'

export default class TaskDomain implements TaskDomainInterface {
  private userRepository: UserRepository = new PrismaUserRepository()
  private taskRepository: TaskRepository = new PrismaTaskRepository()

  async createTask(taskData: TaskForCreateDto): Promise<Task> {
    const userExists = await this.userRepository.findUserByEmail(taskData.email)

    if (!userExists) {
      throw new UserNotFoundExeption('User Not Found exists')
    }

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
    const userExists = await this.userRepository.findUserByEmail(userEmail)

    if (!userExists) {
      throw new UserNotFoundExeption('User Not Found exists')
    }

    const tasks = await this.taskRepository.findAllTasks(userExists.id)

    return tasks
  }
}
