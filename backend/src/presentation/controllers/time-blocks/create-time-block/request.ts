import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import {
  IsDateString,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  Min,
  ValidateIf,
} from 'class-validator'

export class CreateTimeBlockRequest {
  @ApiPropertyOptional({ example: '550e8400-e29b-41d4-a716-446655440000' })
  @IsOptional()
  @IsUUID()
  presetId?: string

  @ApiProperty({ example: '2026-11-12T13:00:00.000Z' })
  @IsDateString()
  startTime: string

  @ApiPropertyOptional({ example: 'Foco', maxLength: 120 })
  @ValidateIf((request: CreateTimeBlockRequest) => !request.presetId)
  @IsString()
  @MaxLength(120)
  title?: string

  @ApiPropertyOptional({ example: '2026-11-12T13:50:00.000Z' })
  @ValidateIf((request: CreateTimeBlockRequest) => !request.presetId)
  @IsDateString()
  endTime?: string

  @ApiPropertyOptional({ example: 10, minimum: 0, default: 0 })
  @ValidateIf((request: CreateTimeBlockRequest) => !request.presetId)
  @IsOptional()
  @IsInt()
  @Min(0)
  leadMinutes?: number
}
