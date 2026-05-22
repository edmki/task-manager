import { Injectable, NotFoundException } from '@nestjs/common'
import { TaskRepository } from 'src/domain/repositories/task-repository'

export interface UncompleteTaskParams {
  taskId: string
  userId: string
}

export interface UncompleteTaskResult {
  id: string
  title: string
  description?: string
  completed: boolean
}

@Injectable()
export class UncompleteTask {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute({
    taskId,
    userId,
  }: UncompleteTaskParams): Promise<UncompleteTaskResult> {
    const task = await this.taskRepository.findById(taskId)

    if (!task) {
      throw new NotFoundException('Task not found')
    }

    if (task.userId !== userId) {
      throw new NotFoundException('Task not found')
    }

    task.uncomplete()

    const saved = await this.taskRepository.save(task)

    return {
      id: saved.id,
      title: saved.title,
      description: saved.description,
      completed: saved.completed,
    }
  }
}
