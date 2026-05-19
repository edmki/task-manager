import { Module } from '@nestjs/common'
import { UseCasesModule } from 'src/data/use-cases/use-cases.module'
import { CreateTaskController } from './create-task/controller'
import { DeleteTaskController } from './delete-task/controller'
import { UpdateTaskController } from './update-task/controller'

@Module({
  imports: [UseCasesModule],
  controllers: [
    CreateTaskController,
    DeleteTaskController,
    UpdateTaskController,
  ],
})
export class TasksControllersModule {}
