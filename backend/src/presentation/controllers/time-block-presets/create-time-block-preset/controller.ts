import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { CreateTimeBlockPreset } from 'data/use-cases/time-block-presets/create-time-block-preset'
import { User } from 'presentation/decorators/user.decorator'
import { JwtAuthGuard } from 'presentation/guards/jwt-auth.guard'
import { AuthenticatedUser } from 'presentation/types/authenticated-user'
import { CreateTimeBlockPresetRequest } from './request'

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('Time Block Presets')
@Controller('time-block-presets')
export class CreateTimeBlockPresetController {
  constructor(private readonly createPreset: CreateTimeBlockPreset) {}

  @Post()
  handle(
    @Body() body: CreateTimeBlockPresetRequest,
    @User() user: AuthenticatedUser,
  ) {
    return this.createPreset.execute({ ...body, userId: user.id })
  }
}
