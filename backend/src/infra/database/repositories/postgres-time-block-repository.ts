import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { TimeBlock } from '../../../domain/entities/time-block'
import { TimeBlockRepository } from '../../../domain/repositories/time-block-repository'
import { TimeBlockSchema } from '../schemas/time-block.schema'

export class PostgresTimeBlockRepository implements TimeBlockRepository {
  constructor(
    @InjectRepository(TimeBlockSchema)
    private readonly repository: Repository<TimeBlockSchema>,
  ) {}

  async save(timeBlock: TimeBlock): Promise<TimeBlock> {
    const schema = this.toSchema(timeBlock)
    const saved = await this.repository.save(schema)
    return this.toDomain(saved)
  }

  async delete(timeBlockId: string): Promise<void> {
    await this.repository.softDelete(timeBlockId)
  }

  async findById(timeBlockId: string): Promise<TimeBlock | null> {
    const schema = await this.repository.findOneBy({ id: timeBlockId })
    return schema ? this.toDomain(schema) : null
  }

  async findAll(): Promise<TimeBlock[]> {
    const schemas = await this.repository.find()
    return schemas.map((schema) => this.toDomain(schema))
  }

  private toDomain(schema: TimeBlockSchema): TimeBlock {
    return {
      id: schema.id,
      title: schema.title,
      startTime: schema.startTime,
      endTime: schema.endTime,
      userId: schema.userId,
      presetId: schema.presetId,
      leadMinutes: schema.leadMinutes,
      createdAt: schema.createdAt,
      updatedAt: schema.updatedAt,
      deletedAt: schema.deletedAt,
    }
  }

  private toSchema(timeBlock: TimeBlock): TimeBlockSchema {
    const schema = new TimeBlockSchema()
    schema.id = timeBlock.id
    schema.title = timeBlock.title
    schema.startTime = timeBlock.startTime
    schema.endTime = timeBlock.endTime
    schema.userId = timeBlock.userId
    schema.presetId = timeBlock.presetId
    schema.leadMinutes = timeBlock.leadMinutes
    schema.createdAt = timeBlock.createdAt
    schema.updatedAt = timeBlock.updatedAt
    schema.deletedAt = timeBlock.deletedAt
    return schema
  }
}
