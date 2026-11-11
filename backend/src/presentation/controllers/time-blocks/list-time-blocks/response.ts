import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class TimeBlockResponse {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  id: string

  @ApiPropertyOptional({
    example: '550e8400-e29b-41d4-a716-446655440000',
    nullable: true,
  })
  presetId: string | null

  @ApiProperty({ example: 'Foco' })
  title: string

  @ApiProperty({ example: '2026-11-12T13:00:00.000Z' })
  startTime: Date

  @ApiProperty({ example: '2026-11-12T13:50:00.000Z' })
  endTime: Date

  @ApiProperty({ example: 50 })
  durationMinutes: number

  @ApiProperty({ example: 10 })
  leadMinutes: number

  @ApiProperty({ example: '2026-11-12T12:50:00.000Z' })
  leadStartTime: Date

  @ApiProperty({ example: '2026-11-12T12:00:00.000Z' })
  createdAt: Date

  @ApiProperty({ example: '2026-11-12T12:00:00.000Z' })
  updatedAt: Date
}
