import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'

export class UpdateTaskRequest {
  @ApiProperty({ example: 'Comprar leite' })
  @IsString()
  title: string

  @ApiProperty({ example: 'Comprar leite na padaria' })
  @IsString()
  @IsOptional()
  description?: string
}
