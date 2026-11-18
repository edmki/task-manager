import { ApiProperty } from '@nestjs/swagger'
import { IsDateString } from 'class-validator'

export class ListTimeBlocksRequest {
  @ApiProperty({ example: '2026-11-12T00:00:00.000Z' })
  @IsDateString()
  from: string

  @ApiProperty({ example: '2026-11-13T00:00:00.000Z' })
  @IsDateString()
  to: string
}
