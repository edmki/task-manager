import { Injectable, NotFoundException } from '@nestjs/common'
import { TimeBlockRepository } from 'domain/repositories/time-block-repository'

export interface UpdateTimeBlockParams {
  timeBlockId: string
  userId: string
  title?: string
  startTime?: Date
  endTime?: Date
  leadMinutes?: number
}

@Injectable()
export class UpdateTimeBlock {
  constructor(private readonly repository: TimeBlockRepository) {}

  async execute(params: UpdateTimeBlockParams) {
    const timeBlock = await this.repository.findById(params.timeBlockId)
    if (!timeBlock || timeBlock.userId !== params.userId) {
      throw new NotFoundException('Time block not found')
    }

    if (params.title !== undefined) timeBlock.updateTitle(params.title)
    if (params.leadMinutes !== undefined) {
      timeBlock.updateLeadMinutes(params.leadMinutes)
    }
    if (params.startTime !== undefined || params.endTime !== undefined) {
      timeBlock.reschedule(
        params.startTime ?? timeBlock.startTime,
        params.endTime ?? timeBlock.endTime,
      )
    }

    const saved = await this.repository.save(timeBlock)
    return {
      id: saved.id,
      presetId: saved.presetId,
      title: saved.title,
      startTime: saved.startTime,
      endTime: saved.endTime,
      durationMinutes: saved.durationMinutes,
      leadMinutes: saved.leadMinutes,
      leadStartTime: saved.leadStartTime,
      updatedAt: saved.updatedAt,
    }
  }
}
