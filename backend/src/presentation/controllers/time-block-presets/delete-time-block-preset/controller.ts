import { Controller, Delete, Param, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { DeleteTimeBlockPreset } from 'data/use-cases/time-block-presets/delete-time-block-preset'
import { User } from 'presentation/decorators/user.decorator'
import { JwtAuthGuard } from 'presentation/guards/jwt-auth.guard'
import { AuthenticatedUser } from 'presentation/types/authenticated-user'

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('Time Block Presets')
@Controller('time-block-presets')
export class DeleteTimeBlockPresetController {
  constructor(private readonly deletePreset: DeleteTimeBlockPreset) {}

  @Delete(':id')
  handle(@Param('id') presetId: string, @User() user: AuthenticatedUser) {
    return this.deletePreset.execute({ presetId, userId: user.id })
  }
}
