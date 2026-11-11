import { Module } from '@nestjs/common'
import { InfraModule } from 'infra/infra.module'
import { CreateTimeBlockPreset } from './create-time-block-preset'
import { DeleteTimeBlockPreset } from './delete-time-block-preset'
import { ListTimeBlockPresets } from './list-time-block-presets'
import { UpdateTimeBlockPreset } from './update-time-block-preset'

@Module({
  imports: [InfraModule],
  providers: [
    CreateTimeBlockPreset,
    DeleteTimeBlockPreset,
    ListTimeBlockPresets,
    UpdateTimeBlockPreset,
  ],
  exports: [
    CreateTimeBlockPreset,
    DeleteTimeBlockPreset,
    ListTimeBlockPresets,
    UpdateTimeBlockPreset,
  ],
})
export class TimeBlockPresetsUseCasesModule {}
