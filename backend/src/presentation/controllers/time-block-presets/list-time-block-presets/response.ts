import { ApiProperty } from '@nestjs/swagger'

export class TimeBlockPresetResponse {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  id: string

  @ApiProperty({ example: 'Foco' })
  title: string

  @ApiProperty({ example: 50 })
  durationMinutes: number

  @ApiProperty({ example: 10 })
  leadMinutes: number

  @ApiProperty({ example: '2026-01-01T12:00:00.000Z' })
  createdAt: Date

  @ApiProperty({ example: '2026-01-01T12:00:00.000Z' })
  updatedAt: Date
}
