import { Module } from '@nestjs/common'
import { AuthControllersModule } from './auth/auth-controllers.module'
import { TasksControllersModule } from './tasks/tasks-controllers.module'

@Module({
  imports: [AuthControllersModule, TasksControllersModule],
})
export class ControllersModule {}
