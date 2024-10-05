import Task from '../entities/Task'

export default interface TaskRepository {
  createTask(taskData: Task): Promise<Task>
  findAllTasks(userId: string): Promise<Task[]>
  updateTask(task: Task): Promise<Task>
  findAllSubtasks(id: string, userId: string): Promise<Task[]>
  createSubTask(taskData: Task): Promise<Task>
}
