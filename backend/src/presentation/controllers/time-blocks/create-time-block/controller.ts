import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { CreateTimeBlock } from 'data/use-cases/time-blocks/create-time-block'
import { User } from 'presentation/decorators/user.decorator'
import { JwtAuthGuard } from 'presentation/guards/jwt-auth.guard'
import { AuthenticatedUser } from 'presentation/types/authenticated-user'
import { CreateTimeBlockRequest } from './request'

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('Time Blocks')
@Controller('time-blocks')
export class CreateTimeBlockController {
  constructor(private readonly createTimeBlock: CreateTimeBlock) {}

  @Post()
  handle(
    @Body() body: CreateTimeBlockRequest,
    @User() user: AuthenticatedUser,
  ) {
    return this.createTimeBlock.execute({
      presetId: body.presetId,
      title: body.title,
      startTime: new Date(body.startTime),
      endTime: body.endTime ? new Date(body.endTime) : undefined,
      leadMinutes: body.leadMinutes,
      userId: user.id,
    })
  }
}
