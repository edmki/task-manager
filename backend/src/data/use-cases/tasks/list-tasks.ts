import { Injectable } from '@nestjs/common'
import { TaskRepository } from 'src/domain/repositories/task-repository'

export interface ListTasksResultItem {
  id: string
  title: string
  description?: string
  completed: boolean
  createdAt: Date
  updatedAt: Date
}

@Injectable()
export class ListTasks {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(userId: string): Promise<ListTasksResultItem[]> {
    const tasks = await this.taskRepository.findByUser(userId)

    return tasks.map((task) => ({
      id: task.id,
      title: task.title,
      description: task.description,
      completed: task.completed,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
    }))
  }
}
