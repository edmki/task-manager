import { Injectable, NotFoundException } from '@nestjs/common'
import { TaskRepository } from 'src/domain/repositories/task-repository'

export interface CompleteTaskParams {
  taskId: string
  userId: string
}

export interface CompleteTaskResult {
  id: string
  title: string
  description?: string
  completed: boolean
}

@Injectable()
export class CompleteTask {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(params: CompleteTaskParams): Promise<CompleteTaskResult> {
    const task = await this.taskRepository.findById(params.taskId)

    if (!task) {
      throw new NotFoundException('Task not found')
    }

    if (task.userId !== params.userId) {
      throw new NotFoundException('Task not found')
    }

    task.complete()

    const saved = await this.taskRepository.save(task)

    return {
      id: saved.id,
      title: saved.title,
      description: saved.description,
      completed: saved.completed,
    }
  }
}
