import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { TimeBlock } from 'domain/entities/time-block'
import { TimeBlockPresetRepository } from 'domain/repositories/time-block-preset-repository'
import { TimeBlockRepository } from 'domain/repositories/time-block-repository'
import { v4 as uuid } from 'uuid'

export interface CreateTimeBlockParams {
  userId: string
  startTime: Date
  presetId?: string
  title?: string
  endTime?: Date
  leadMinutes?: number
}

@Injectable()
export class CreateTimeBlock {
  constructor(
    private readonly timeBlockRepository: TimeBlockRepository,
    private readonly presetRepository: TimeBlockPresetRepository,
  ) {}

  async execute(params: CreateTimeBlockParams) {
    let timeBlock: TimeBlock

    if (params.presetId) {
      const preset = await this.presetRepository.findById(params.presetId)
      if (!preset || preset.userId !== params.userId) {
        throw new NotFoundException('Time block preset not found')
      }
      if (
        params.title !== undefined ||
        params.endTime !== undefined ||
        params.leadMinutes !== undefined
      ) {
        throw new BadRequestException(
          'title, endTime and leadMinutes cannot be set when using a preset',
        )
      }
      timeBlock = TimeBlock.fromPreset(preset, {
        id: uuid(),
        startTime: params.startTime,
      })
    } else {
      if (!params.title || !params.endTime) {
        throw new BadRequestException(
          'title and endTime are required when no preset is used',
        )
      }
      const now = new Date()
      timeBlock = new TimeBlock({
        id: uuid(),
        userId: params.userId,
        presetId: null,
        title: params.title,
        startTime: params.startTime,
        endTime: params.endTime,
        leadMinutes: params.leadMinutes ?? 0,
        createdAt: now,
        updatedAt: now,
      })
    }

    const saved = await this.timeBlockRepository.save(timeBlock)
    return {
      id: saved.id,
      presetId: saved.presetId,
      title: saved.title,
      startTime: saved.startTime,
      endTime: saved.endTime,
      durationMinutes: saved.durationMinutes,
      leadMinutes: saved.leadMinutes,
      leadStartTime: saved.leadStartTime,
      createdAt: saved.createdAt,
      updatedAt: saved.updatedAt,
    }
  }
}
