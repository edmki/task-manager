import { Controller, Get, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger'
import { ListTimeBlocks } from 'data/use-cases/time-blocks/list-time-blocks'
import { User } from 'presentation/decorators/user.decorator'
import { JwtAuthGuard } from 'presentation/guards/jwt-auth.guard'
import { AuthenticatedUser } from 'presentation/types/authenticated-user'
import { TimeBlockResponse } from './response'

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('Time Blocks')
@Controller('time-blocks')
export class ListTimeBlocksController {
  constructor(private readonly listTimeBlocks: ListTimeBlocks) {}

  @Get()
  @ApiResponse({ status: 200, type: [TimeBlockResponse] })
  handle(@User() user: AuthenticatedUser): Promise<TimeBlockResponse[]> {
    return this.listTimeBlocks.execute(user.id)
  }
}
