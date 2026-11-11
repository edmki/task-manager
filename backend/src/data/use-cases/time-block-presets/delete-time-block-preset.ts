import { Injectable, NotFoundException } from '@nestjs/common'
import { TimeBlockPresetRepository } from 'domain/repositories/time-block-preset-repository'

export interface DeleteTimeBlockPresetParams {
  presetId: string
  userId: string
}

@Injectable()
export class DeleteTimeBlockPreset {
  constructor(private readonly repository: TimeBlockPresetRepository) {}

  async execute(params: DeleteTimeBlockPresetParams) {
    const preset = await this.repository.findById(params.presetId)
    if (!preset || preset.userId !== params.userId) {
      throw new NotFoundException('Time block preset not found')
    }

    await this.repository.delete(preset.id)
    return {
      id: preset.id,
      title: preset.title,
      durationMinutes: preset.durationMinutes,
      leadMinutes: preset.leadMinutes,
    }
  }
}
