import { Controller, Delete, Param, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from 'src/presentation/guards/jwt-auth.guard'
import { User } from 'src/presentation/decorators/user.decorator'
import { AuthenticatedUser } from 'src/presentation/types/authenticated-user'
import { DeleteTask } from 'src/data/use-cases/tasks/delete-task'

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('auth')
@Controller('tasks')
export class DeleteTaskController {
  constructor(private readonly deleteTask: DeleteTask) {}

  @Delete(':id')
  handle(@Param('id') taskId: string, @User() user: AuthenticatedUser) {
    return this.deleteTask.execute({
      taskId,
      userId: user.id,
    })
  }
}
