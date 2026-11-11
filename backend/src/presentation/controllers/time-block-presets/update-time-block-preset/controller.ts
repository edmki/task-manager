import { Body, Controller, Param, Put, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { UpdateTimeBlockPreset } from 'data/use-cases/time-block-presets/update-time-block-preset'
import { User } from 'presentation/decorators/user.decorator'
import { JwtAuthGuard } from 'presentation/guards/jwt-auth.guard'
import { AuthenticatedUser } from 'presentation/types/authenticated-user'
import { UpdateTimeBlockPresetRequest } from './request'

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('Time Block Presets')
@Controller('time-block-presets')
export class UpdateTimeBlockPresetController {
  constructor(private readonly updatePreset: UpdateTimeBlockPreset) {}

  @Put(':id')
  handle(
    @Param('id') presetId: string,
    @Body() body: UpdateTimeBlockPresetRequest,
    @User() user: AuthenticatedUser,
  ) {
    return this.updatePreset.execute({ ...body, presetId, userId: user.id })
  }
}
