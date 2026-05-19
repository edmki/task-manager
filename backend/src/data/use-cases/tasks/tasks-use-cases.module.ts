import { Module } from '@nestjs/common'
import { CompleteTask } from './complete-task'
import { CreateTask } from './create-task'
import { DeleteTask } from './delete-task'
import { UpdateTask } from './update-task'
import { InfraModule } from 'src/infra/infra.module'

@Module({
  imports: [InfraModule],
  providers: [CompleteTask, CreateTask, DeleteTask, UpdateTask],
  exports: [CompleteTask, CreateTask, DeleteTask, UpdateTask],
})
export class TasksUseCasesModule {}
