import { Controller, Param, Patch, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from 'presentation/guards/jwt-auth.guard'
import { User } from 'presentation/decorators/user.decorator'
import { AuthenticatedUser } from 'presentation/types/authenticated-user'
import { UncompleteTask } from 'data/use-cases/tasks/uncomplete-task'

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('Tasks')
@Controller('tasks')
export class UncompleteTaskController {
  constructor(private readonly uncompleteTask: UncompleteTask) {}

  @Patch(':id/uncomplete')
  handle(@Param('id') taskId: string, @User() user: AuthenticatedUser) {
    return this.uncompleteTask.execute({
      taskId,
      userId: user.id,
    })
  }
}
