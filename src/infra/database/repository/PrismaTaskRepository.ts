import { PrismaClient } from '@prisma/client'
import Task from '../../../domain/entities/Task'
import TaskRepository from '../../../domain/repository/TaskRepository'

export default class PrismaTaskRepository implements TaskRepository {
  private prisma: PrismaClient = new PrismaClient()

  async createTask(taskData: Task): Promise<Task> {
    const task = await this.prisma.tasks.create({
      data: {
        id: taskData.id,
        title: taskData.title,
        content: taskData.content,
        userId: taskData.userId,
      },
    })

    return new Task(task.id, task.title, task.content, task.userId)
  }

  async findAllTasks(userId: string): Promise<Task[]> {
    const tasks = await this.prisma.tasks.findMany({
      where: {
        userId,
        parentId: null,
      },
    })

    return tasks.map(
      (task) => new Task(task.id, task.title, task.content, task.userId),
    )
  }
}
