import { Module } from '@nestjs/common'
import { TasksUseCasesModule } from './tasks/tasks-use-cases.module'
import { AuthUseCasesModule } from './auth/auth-use-cases.module'
import { TimeBlockPresetsUseCasesModule } from './time-block-presets/time-block-presets-use-cases.module'
import { TimeBlocksUseCasesModule } from './time-blocks/time-blocks-use-cases.module'

@Module({
  imports: [
    AuthUseCasesModule,
    TasksUseCasesModule,
    TimeBlockPresetsUseCasesModule,
    TimeBlocksUseCasesModule,
  ],
  exports: [
    AuthUseCasesModule,
    TasksUseCasesModule,
    TimeBlockPresetsUseCasesModule,
    TimeBlocksUseCasesModule,
  ],
})
export class UseCasesModule {}
