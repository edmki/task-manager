import { Module } from '@nestjs/common'
import { UseCasesModule } from 'data/use-cases/use-cases.module'
import { CreateTimeBlockPresetController } from './create-time-block-preset/controller'
import { DeleteTimeBlockPresetController } from './delete-time-block-preset/controller'
import { ListTimeBlockPresetsController } from './list-time-block-presets/controller'
import { UpdateTimeBlockPresetController } from './update-time-block-preset/controller'

@Module({
  imports: [UseCasesModule],
  controllers: [
    CreateTimeBlockPresetController,
    DeleteTimeBlockPresetController,
    ListTimeBlockPresetsController,
    UpdateTimeBlockPresetController,
  ],
})
export class TimeBlockPresetsControllersModule {}
