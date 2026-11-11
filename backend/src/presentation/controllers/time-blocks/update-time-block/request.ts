import { ApiProperty } from '@nestjs/swagger'
import { IsDateString, IsInt, IsString, MaxLength, Min } from 'class-validator'

export class UpdateTimeBlockRequest {
  @ApiProperty({ example: 'Foco', maxLength: 120 })
  @IsString()
  @MaxLength(120)
  title: string

  @ApiProperty({ example: '2026-11-12T13:00:00.000Z' })
  @IsDateString()
  startTime: string

  @ApiProperty({ example: '2026-11-12T13:50:00.000Z' })
  @IsDateString()
  endTime: string

  @ApiProperty({ example: 10, minimum: 0 })
  @IsInt()
  @Min(0)
  leadMinutes: number
}
