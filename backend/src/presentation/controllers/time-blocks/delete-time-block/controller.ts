import { Controller, Delete, Param, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { DeleteTimeBlock } from 'data/use-cases/time-blocks/delete-time-block'
import { User } from 'presentation/decorators/user.decorator'
import { JwtAuthGuard } from 'presentation/guards/jwt-auth.guard'
import { AuthenticatedUser } from 'presentation/types/authenticated-user'

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('Time Blocks')
@Controller('time-blocks')
export class DeleteTimeBlockController {
  constructor(private readonly deleteTimeBlock: DeleteTimeBlock) {}

  @Delete(':id')
  handle(@Param('id') timeBlockId: string, @User() user: AuthenticatedUser) {
    return this.deleteTimeBlock.execute({ timeBlockId, userId: user.id })
  }
}
