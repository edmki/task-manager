import { Injectable, NotFoundException } from '@nestjs/common'
import { TimeBlockPresetRepository } from 'domain/repositories/time-block-preset-repository'

export interface UpdateTimeBlockPresetParams {
  presetId: string
  userId: string
  title?: string
  durationMinutes?: number
  leadMinutes?: number
}

@Injectable()
export class UpdateTimeBlockPreset {
  constructor(private readonly repository: TimeBlockPresetRepository) {}

  async execute(params: UpdateTimeBlockPresetParams) {
    const preset = await this.repository.findById(params.presetId)
    if (!preset || preset.userId !== params.userId) {
      throw new NotFoundException('Time block preset not found')
    }

    if (params.title !== undefined) preset.updateTitle(params.title)
    if (params.durationMinutes !== undefined) {
      preset.updateDuration(params.durationMinutes)
    }
    if (params.leadMinutes !== undefined) {
      preset.updateLeadMinutes(params.leadMinutes)
    }

    const saved = await this.repository.save(preset)
    return {
      id: saved.id,
      title: saved.title,
      durationMinutes: saved.durationMinutes,
      leadMinutes: saved.leadMinutes,
      updatedAt: saved.updatedAt,
    }
  }
}
