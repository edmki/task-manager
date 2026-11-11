import { Injectable, NotFoundException } from '@nestjs/common'
import { TimeBlockRepository } from 'domain/repositories/time-block-repository'

export interface DeleteTimeBlockParams {
  timeBlockId: string
  userId: string
}

@Injectable()
export class DeleteTimeBlock {
  constructor(private readonly repository: TimeBlockRepository) {}

  async execute(params: DeleteTimeBlockParams) {
    const timeBlock = await this.repository.findById(params.timeBlockId)
    if (!timeBlock || timeBlock.userId !== params.userId) {
      throw new NotFoundException('Time block not found')
    }

    await this.repository.delete(timeBlock.id)
    return {
      id: timeBlock.id,
      title: timeBlock.title,
      startTime: timeBlock.startTime,
      endTime: timeBlock.endTime,
    }
  }
}
