import { Module } from '@nestjs/common'
import { AuthControllersModule } from './auth/auth-controllers.module'
import { TasksControllersModule } from './tasks/tasks-controllers.module'
import { TimeBlockPresetsControllersModule } from './time-block-presets/time-block-presets-controllers.module'

@Module({
  imports: [
    AuthControllersModule,
    TasksControllersModule,
    TimeBlockPresetsControllersModule,
  ],
})
export class ControllersModule {}
