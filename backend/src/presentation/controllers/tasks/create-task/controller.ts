import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { CreateTask } from 'src/data/use-cases/tasks/create-task'
import { CreateTaskRequest } from './request'
import { JwtAuthGuard } from 'src/presentation/guards/jwt-auth.guard'
import { User } from 'src/presentation/decorators/user.decorator'
import { AuthenticatedUser } from 'src/presentation/types/authenticated-user'

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('Tasks')
@Controller('tasks')
export class CreateTaskController {
  constructor(private readonly createTask: CreateTask) {}

  @Post()
  handle(@Body() body: CreateTaskRequest, @User() user: AuthenticatedUser) {
    return this.createTask.execute({
      title: body.title,
      description: body.description,
      userId: user.id,
    })
  }
}
