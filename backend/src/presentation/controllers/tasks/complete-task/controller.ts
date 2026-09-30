import { Controller, Param, Patch, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from 'presentation/guards/jwt-auth.guard'
import { User } from 'presentation/decorators/user.decorator'
import { AuthenticatedUser } from 'presentation/types/authenticated-user'
import { CompleteTask } from 'data/use-cases/tasks/complete-task'

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('Tasks')
@Controller('tasks')
export class CompleteTaskController {
  constructor(private readonly completeTask: CompleteTask) {}

  @Patch(':id/complete')
  handle(@Param('id') taskId: string, @User() user: AuthenticatedUser) {
    return this.completeTask.execute({
      taskId,
      userId: user.id,
    })
  }
}
