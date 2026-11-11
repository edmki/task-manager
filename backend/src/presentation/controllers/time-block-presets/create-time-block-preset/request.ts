import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsInt, IsOptional, IsString, MaxLength, Min } from 'class-validator'

export class CreateTimeBlockPresetRequest {
  @ApiProperty({ example: 'Foco', maxLength: 120 })
  @IsString()
  @MaxLength(120)
  title: string

  @ApiProperty({ example: 50, minimum: 1 })
  @IsInt()
  @Min(1)
  durationMinutes: number

  @ApiPropertyOptional({ example: 10, minimum: 0, default: 10 })
  @IsOptional()
  @IsInt()
  @Min(0)
  leadMinutes?: number
}
