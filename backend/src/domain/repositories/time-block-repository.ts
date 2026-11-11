import { TimeBlock } from '../entities/time-block'

export abstract class TimeBlockRepository {
  abstract save(timeBlock: TimeBlock): Promise<TimeBlock>
  abstract delete(timeBlockId: string): Promise<void>
  abstract findById(timeBlockId: string): Promise<TimeBlock | null>
  abstract findByUser(userId: string): Promise<TimeBlock[]>
}
