import { Module } from '@nestjs/common'
import { InfraModule } from 'infra/infra.module'
import { CreateTimeBlock } from './create-time-block'
import { DeleteTimeBlock } from './delete-time-block'
import { ListTimeBlocks } from './list-time-blocks'
import { UpdateTimeBlock } from './update-time-block'

@Module({
  imports: [InfraModule],
  providers: [
    CreateTimeBlock,
    DeleteTimeBlock,
    ListTimeBlocks,
    UpdateTimeBlock,
  ],
  exports: [CreateTimeBlock, DeleteTimeBlock, ListTimeBlocks, UpdateTimeBlock],
})
export class TimeBlocksUseCasesModule {}
