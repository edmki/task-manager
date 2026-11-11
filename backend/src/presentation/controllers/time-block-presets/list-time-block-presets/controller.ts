import { Controller, Get, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger'
import { ListTimeBlockPresets } from 'data/use-cases/time-block-presets/list-time-block-presets'
import { User } from 'presentation/decorators/user.decorator'
import { JwtAuthGuard } from 'presentation/guards/jwt-auth.guard'
import { AuthenticatedUser } from 'presentation/types/authenticated-user'
import { TimeBlockPresetResponse } from './response'

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('Time Block Presets')
@Controller('time-block-presets')
export class ListTimeBlockPresetsController {
  constructor(private readonly listPresets: ListTimeBlockPresets) {}

  @Get()
  @ApiResponse({ status: 200, type: [TimeBlockPresetResponse] })
  handle(@User() user: AuthenticatedUser): Promise<TimeBlockPresetResponse[]> {
    return this.listPresets.execute(user.id)
  }
}
