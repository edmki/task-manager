import { Task } from '../entities/task'

export interface TaskRepository {
  save(task: Task): Promise<Task>
  delete(taskId: string): Promise<void>
  findById(taskId: string): Promise<Task | null>
  findByUser(userId: string): Promise<Task[]>
}
