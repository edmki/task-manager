import { ApiProperty } from '@nestjs/swagger'

export class ListTasksItemResponse {
  @ApiProperty({ example: '1' })
  id: string

  @ApiProperty({ example: 'Comprar leite' })
  title: string

  @ApiProperty({ example: 'Comprar leite na padaria' })
  description?: string

  @ApiProperty({ example: '2023-06-01T00:00:00.000Z' })
  createdAt: Date
}
