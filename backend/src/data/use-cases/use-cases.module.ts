import { Module } from '@nestjs/common'
import { TasksUseCasesModule } from './tasks/tasks-use-cases.module'
import { AuthUseCasesModule } from './auth/auth-use-cases.module'
import { TimeBlockPresetsUseCasesModule } from './time-block-presets/time-block-presets-use-cases.module'

@Module({
  imports: [
    AuthUseCasesModule,
    TasksUseCasesModule,
    TimeBlockPresetsUseCasesModule,
  ],
  exports: [
    AuthUseCasesModule,
    TasksUseCasesModule,
    TimeBlockPresetsUseCasesModule,
  ],
})
export class UseCasesModule {}
