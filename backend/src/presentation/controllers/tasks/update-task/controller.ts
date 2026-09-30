import { Body, Controller, Param, Put, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from 'presentation/guards/jwt-auth.guard'
import { User } from 'presentation/decorators/user.decorator'
import { AuthenticatedUser } from 'presentation/types/authenticated-user'
import { UpdateTask } from 'data/use-cases/tasks/update-task'
import { UpdateTaskRequest } from './request'

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('Tasks')
@Controller('tasks')
export class UpdateTaskController {
  constructor(private readonly updateTask: UpdateTask) {}

  @Put(':id')
  handle(
    @Param('id') taskId: string,
    @Body() body: UpdateTaskRequest,
    @User() user: AuthenticatedUser,
  ) {
    return this.updateTask.execute({
      taskId,
      title: body.title,
      description: body.description,
      userId: user.id,
    })
  }
}
