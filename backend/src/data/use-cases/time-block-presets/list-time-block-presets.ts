import { Injectable } from '@nestjs/common'
import { TimeBlockPresetRepository } from 'domain/repositories/time-block-preset-repository'

@Injectable()
export class ListTimeBlockPresets {
  constructor(private readonly repository: TimeBlockPresetRepository) {}

  async execute(userId: string) {
    const presets = await this.repository.findByUser(userId)

    return presets.map((preset) => ({
      id: preset.id,
      title: preset.title,
      durationMinutes: preset.durationMinutes,
      leadMinutes: preset.leadMinutes,
      createdAt: preset.createdAt,
      updatedAt: preset.updatedAt,
    }))
  }
}
