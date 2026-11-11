import { Injectable } from '@nestjs/common'
import { TimeBlockPreset } from 'domain/entities/time-block-preset'
import { TimeBlockPresetRepository } from 'domain/repositories/time-block-preset-repository'
import { v4 as uuid } from 'uuid'

export interface CreateTimeBlockPresetParams {
  title: string
  durationMinutes: number
  leadMinutes?: number
  userId: string
}

@Injectable()
export class CreateTimeBlockPreset {
  constructor(private readonly repository: TimeBlockPresetRepository) {}

  async execute(params: CreateTimeBlockPresetParams) {
    const now = new Date()
    const preset = new TimeBlockPreset({
      id: uuid(),
      userId: params.userId,
      title: params.title,
      durationMinutes: params.durationMinutes,
      leadMinutes: params.leadMinutes ?? 10,
      createdAt: now,
      updatedAt: now,
    })
    const saved = await this.repository.save(preset)

    return {
      id: saved.id,
      title: saved.title,
      durationMinutes: saved.durationMinutes,
      leadMinutes: saved.leadMinutes,
      createdAt: saved.createdAt,
      updatedAt: saved.updatedAt,
    }
  }
}
