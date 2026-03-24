import { Body, Controller, Param, Put, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from 'src/presentation/guards/jwt-auth.guard'
import { User } from 'src/presentation/decorators/user.decorator'
import { AuthenticatedUser } from 'src/presentation/types/authenticated-user'
import { UpdateTask } from 'src/data/use-cases/tasks/update-task'
import { UpdateTaskRequest } from './request'

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('auth')
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
