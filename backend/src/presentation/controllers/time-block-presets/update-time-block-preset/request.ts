import { ApiProperty } from '@nestjs/swagger'
import { IsInt, IsString, MaxLength, Min } from 'class-validator'

export class UpdateTimeBlockPresetRequest {
  @ApiProperty({ example: 'Foco', maxLength: 120 })
  @IsString()
  @MaxLength(120)
  title: string

  @ApiProperty({ example: 50, minimum: 1 })
  @IsInt()
  @Min(1)
  durationMinutes: number

  @ApiProperty({ example: 10, minimum: 0 })
  @IsInt()
  @Min(0)
  leadMinutes: number
}
