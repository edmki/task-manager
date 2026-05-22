import { Module } from '@nestjs/common'
import { UseCasesModule } from 'src/data/use-cases/use-cases.module'
import { CreateTaskController } from './create-task/controller'
import { DeleteTaskController } from './delete-task/controller'
import { UpdateTaskController } from './update-task/controller'
import { ListTasksController } from './list-tasks/controller'
import { CompleteTaskController } from './complete-task/controller'

@Module({
  imports: [UseCasesModule],
  controllers: [
    CreateTaskController,
    DeleteTaskController,
    UpdateTaskController,
    ListTasksController,
    CompleteTaskController,
  ],
})
export class TasksControllersModule {}
