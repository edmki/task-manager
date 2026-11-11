import { Body, Controller, Param, Put, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { UpdateTimeBlock } from 'data/use-cases/time-blocks/update-time-block'
import { User } from 'presentation/decorators/user.decorator'
import { JwtAuthGuard } from 'presentation/guards/jwt-auth.guard'
import { AuthenticatedUser } from 'presentation/types/authenticated-user'
import { UpdateTimeBlockRequest } from './request'

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('Time Blocks')
@Controller('time-blocks')
export class UpdateTimeBlockController {
  constructor(private readonly updateTimeBlock: UpdateTimeBlock) {}

  @Put(':id')
  handle(
    @Param('id') timeBlockId: string,
    @Body() body: UpdateTimeBlockRequest,
    @User() user: AuthenticatedUser,
  ) {
    return this.updateTimeBlock.execute({
      timeBlockId,
      userId: user.id,
      title: body.title,
      startTime: new Date(body.startTime),
      endTime: new Date(body.endTime),
      leadMinutes: body.leadMinutes,
    })
  }
}
