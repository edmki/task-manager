import { Module } from '@nestjs/common'
import { CompleteTask } from './complete-task'
import { CreateTask } from './create-task'
import { DeleteTask } from './delete-task'
import { UpdateTask } from './update-task'
import { InfraModule } from 'src/infra/infra.module'
import { ListTasks } from './list-tasks'
import { UncompleteTask } from './uncomplete-task'

@Module({
  imports: [InfraModule],
  providers: [
    CompleteTask,
    CreateTask,
    DeleteTask,
    UpdateTask,
    ListTasks,
    UncompleteTask,
  ],
  exports: [
    CompleteTask,
    CreateTask,
    DeleteTask,
    UpdateTask,
    ListTasks,
    UncompleteTask,
  ],
})
export class TasksUseCasesModule {}
