import { Task } from '../entities/task'

export abstract class TaskRepository {
  abstract save(task: Task): Promise<Task>
  abstract delete(taskId: string): Promise<void>
  abstract findById(taskId: string): Promise<Task | null>
  abstract findByUser(userId: string): Promise<Task[]>
}
