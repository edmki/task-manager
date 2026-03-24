import { Injectable } from '@nestjs/common'
import { Task } from 'src/domain/entities/task'
import { TaskRepository } from 'src/domain/repositories/task-repository'
import { v4 as uuid } from 'uuid'

export interface CreateTaskParams {
  title: string
  description?: string
  userId: string
}

export interface CreateTaskResult {
  id: string
  title: string
  description?: string
  completed: boolean
  createdAt: Date
}

@Injectable()
export class CreateTask {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(params: CreateTaskParams): Promise<CreateTaskResult> {
    const task = new Task({
      id: uuid(),
      title: params.title,
      description: params.description,
      completed: false,
      userId: params.userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    const saved = await this.taskRepository.save(task)

    return {
      id: saved.id,
      title: saved.title,
      description: saved.description,
      completed: saved.completed,
      createdAt: saved.createdAt,
    }
  }
}
