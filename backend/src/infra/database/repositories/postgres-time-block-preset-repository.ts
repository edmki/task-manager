import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { TimeBlockPreset } from '../../../domain/entities/time-block-preset'
import { TimeBlockPresetRepository } from '../../../domain/repositories/time-block-preset-repository'
import { TimeBlockPresetSchema } from '../schemas/time-block-preset.schema'

export class PostgresTimeBlockPresetRepository implements TimeBlockPresetRepository {
  constructor(
    @InjectRepository(TimeBlockPresetSchema)
    private readonly repository: Repository<TimeBlockPresetSchema>,
  ) {}

  async save(preset: TimeBlockPreset): Promise<TimeBlockPreset> {
    const schema = this.toSchema(preset)
    const saved = await this.repository.save(schema)
    return this.toDomain(saved)
  }

  async delete(presetId: string): Promise<void> {
    await this.repository.softDelete(presetId)
  }

  async findById(presetId: string): Promise<TimeBlockPreset | null> {
    const schema = await this.repository.findOneBy({ id: presetId })
    return schema ? this.toDomain(schema) : null
  }

  async findByUser(userId: string): Promise<TimeBlockPreset[]> {
    const schemas = await this.repository.findBy({ userId })
    return schemas.map((schema) => this.toDomain(schema))
  }

  private toDomain(schema: TimeBlockPresetSchema): TimeBlockPreset {
    return new TimeBlockPreset({
      id: schema.id,
      userId: schema.userId,
      title: schema.title,
      durationMinutes: schema.durationMinutes,
      leadMinutes: schema.leadMinutes,
      createdAt: schema.createdAt,
      updatedAt: schema.updatedAt,
    })
  }

  private toSchema(preset: TimeBlockPreset): TimeBlockPresetSchema {
    const schema = new TimeBlockPresetSchema()
    schema.id = preset.id
    schema.title = preset.title
    schema.durationMinutes = preset.durationMinutes
    schema.leadMinutes = preset.leadMinutes
    schema.userId = preset.userId
    schema.createdAt = preset.createdAt
    schema.updatedAt = preset.updatedAt
    return schema
  }
}
