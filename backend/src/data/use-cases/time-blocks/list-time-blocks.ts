import { Injectable } from '@nestjs/common'
import { TimeBlockRepository } from 'domain/repositories/time-block-repository'

@Injectable()
export class ListTimeBlocks {
  constructor(private readonly repository: TimeBlockRepository) {}

  async execute(userId: string) {
    const timeBlocks = await this.repository.findByUser(userId)
    return timeBlocks.map((timeBlock) => ({
      id: timeBlock.id,
      presetId: timeBlock.presetId,
      title: timeBlock.title,
      startTime: timeBlock.startTime,
      endTime: timeBlock.endTime,
      durationMinutes: timeBlock.durationMinutes,
      leadMinutes: timeBlock.leadMinutes,
      leadStartTime: timeBlock.leadStartTime,
      createdAt: timeBlock.createdAt,
      updatedAt: timeBlock.updatedAt,
    }))
  }
}
