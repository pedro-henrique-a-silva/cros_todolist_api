import Task from '../entities/Task'

export default interface TaskRepository {
  createTask(taskData: Task): Promise<Task>
  findAllTasks(userId: string): Promise<Task[]>
}
