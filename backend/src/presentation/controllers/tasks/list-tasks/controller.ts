import { Controller, Get, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from 'src/presentation/guards/jwt-auth.guard'
import { User } from 'src/presentation/decorators/user.decorator'
import { AuthenticatedUser } from 'src/presentation/types/authenticated-user'
import { ListTasks } from 'src/data/use-cases/tasks/list-tasks'
import { ListTasksItemResponse } from './response'

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('Tasks')
@Controller('tasks')
export class ListTasksController {
  constructor(private readonly listTasks: ListTasks) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'List of tasks for the authenticated user.',
    type: [ListTasksItemResponse],
  })
  handle(@User() user: AuthenticatedUser): Promise<ListTasksItemResponse[]> {
    return this.listTasks.execute(user.id)
  }
}
