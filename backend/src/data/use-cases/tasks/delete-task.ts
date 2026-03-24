import { Injectable, NotFoundException } from '@nestjs/common'
import { TaskRepository } from 'src/domain/repositories/task-repository'

export interface DeleteTaskParams {
  taskId: string
  userId: string
}

export interface DeleteTaskResult {
  id: string
  title: string
  description?: string
  completed: boolean
}

@Injectable()
export class DeleteTask {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(params: DeleteTaskParams): Promise<DeleteTaskResult> {
    const task = await this.taskRepository.findById(params.taskId)

    if (!task) {
      throw new NotFoundException('Task not found')
    }

    if (task.userId !== params.userId) {
      throw new NotFoundException('Task not found')
    }

    await this.taskRepository.delete(params.taskId)

    return {
      id: task.id,
      title: task.title,
      description: task.description,
      completed: task.completed,
    }
  }
}
