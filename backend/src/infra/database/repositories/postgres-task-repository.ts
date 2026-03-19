import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Task } from '../../../domain/entities/task'
import { TaskRepository } from '../../../domain/repositories/task-repository'
import { TaskSchema } from '../schemas/task.schema'

export class PostgresTaskRepository implements TaskRepository {
  constructor(
    @InjectRepository(TaskSchema)
    private readonly repository: Repository<TaskSchema>,
  ) {}
  async save(task: Task): Promise<Task> {
    const schema = this.toSchema(task)
    const saved = await this.repository.save(schema)
    return this.toDomain(saved)
  }

  async delete(taskId: string): Promise<void> {
    await this.repository.delete(taskId)
  }

  async findById(taskId: string): Promise<Task | null> {
    const schema = await this.repository.findOneBy({ id: taskId })
    if (!schema) return null
    return this.toDomain(schema)
  }

  async findByUser(userId: string): Promise<Task[]> {
    const schemas = await this.repository.findBy({ userId })
    return schemas.map(this.toDomain.bind(this))
  }

  private toDomain(schema: TaskSchema): Task {
    return new Task({
      id: schema.id,
      title: schema.title,
      description: schema.description,
      completed: schema.completed,
      userId: schema.userId,
      createdAt: schema.createdAt,
      updatedAt: schema.updatedAt,
    })
  }

  private toSchema(task: Task): TaskSchema {
    const schema = new TaskSchema()
    schema.id = task.id
    schema.title = task.title
    schema.description = task.description
    schema.completed = task.completed
    schema.userId = task.userId
    schema.createdAt = task.createdAt
    schema.updatedAt = task.updatedAt
    return schema
  }
}
