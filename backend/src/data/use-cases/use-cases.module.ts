import { Module } from '@nestjs/common'
import { TasksUseCasesModule } from './tasks/tasks-use-cases.module'
import { AuthUseCasesModule } from './auth/auth-use-cases.module'

@Module({
  imports: [AuthUseCasesModule, TasksUseCasesModule],
  exports: [AuthUseCasesModule, TasksUseCasesModule],
})
export class UseCasesModule {}
