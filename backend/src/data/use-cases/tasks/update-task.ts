import { Injectable, NotFoundException } from '@nestjs/common'
import { TaskRepository } from 'src/domain/repositories/task-repository'

export interface UpdateTaskParams {
  taskId: string
  userId: string
  title?: string
  description?: string
}

export interface UpdateTaskResult {
  id: string
  title: string
  description?: string
  completed: boolean
  updatedAt: Date
}

@Injectable()
export class UpdateTask {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(params: UpdateTaskParams): Promise<UpdateTaskResult> {
    const task = await this.taskRepository.findById(params.taskId)

    if (!task) {
      throw new NotFoundException('Task not found')
    }

    if (task.userId !== params.userId) {
      throw new NotFoundException('Task not found')
    }

    if (params.title) {
      task.updateTitle(params.title)
    }

    if (params.description !== undefined) {
      task.updateDescription(params.description)
    }

    const saved = await this.taskRepository.save(task)

    return {
      id: saved.id,
      title: saved.title,
      description: saved.description,
      completed: saved.completed,
      updatedAt: saved.updatedAt,
    }
  }
}
