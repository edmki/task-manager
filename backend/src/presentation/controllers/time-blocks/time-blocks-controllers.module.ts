import { Module } from '@nestjs/common'
import { UseCasesModule } from 'data/use-cases/use-cases.module'
import { CreateTimeBlockController } from './create-time-block/controller'
import { DeleteTimeBlockController } from './delete-time-block/controller'
import { ListTimeBlocksController } from './list-time-blocks/controller'
import { UpdateTimeBlockController } from './update-time-block/controller'

@Module({
  imports: [UseCasesModule],
  controllers: [
    CreateTimeBlockController,
    DeleteTimeBlockController,
    ListTimeBlocksController,
    UpdateTimeBlockController,
  ],
})
export class TimeBlocksControllersModule {}
