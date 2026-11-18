import {
  Controller,
  Get,
  Query,
  UseGuards,
  BadRequestException,
} from '@nestjs/common'
import { ApiBearerAuth, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger'
import { ListTimeBlocks } from 'data/use-cases/time-blocks/list-time-blocks'
import { User } from 'presentation/decorators/user.decorator'
import { JwtAuthGuard } from 'presentation/guards/jwt-auth.guard'
import { AuthenticatedUser } from 'presentation/types/authenticated-user'
import { TimeBlockResponse } from './response'
import { ListTimeBlocksRequest } from './request'

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('Time Blocks')
@Controller('time-blocks')
export class ListTimeBlocksController {
  constructor(private readonly listTimeBlocks: ListTimeBlocks) {}

  @Get()
  @ApiResponse({
    status: 200,
    type: [TimeBlockResponse],
    description:
      'List of time blocks overlapping the semi-open [from, to) date range. The range cannot exceed 7 days.',
  })
  @ApiQuery({
    name: 'from',
    required: true,
    type: String,
    format: 'date-time',
    example: '2026-11-12T00:00:00.000Z',
    description: 'Inclusive start of the range (ISO 8601).',
  })
  @ApiQuery({
    name: 'to',
    required: true,
    type: String,
    format: 'date-time',
    example: '2026-11-13T00:00:00.000Z',
    description:
      'Exclusive end of the range (ISO 8601), at most 7 days after from.',
  })
  handle(
    @User() user: AuthenticatedUser,
    @Query() query: ListTimeBlocksRequest,
  ): Promise<TimeBlockResponse[]> {
    const from = new Date(query.from)
    const to = new Date(query.to)

    if (from >= to) {
      throw new BadRequestException(
        'The from date must be earlier than the to date',
      )
    }

    const maxRangeMs = 7 * 24 * 60 * 60 * 1000
    if (to.getTime() - from.getTime() > maxRangeMs) {
      throw new BadRequestException('The date range cannot exceed 7 days')
    }

    return this.listTimeBlocks.execute({ userId: user.id, from, to })
  }
}
