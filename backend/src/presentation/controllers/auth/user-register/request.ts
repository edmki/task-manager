import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsEmail, MinLength } from 'class-validator'

export class RegisterRequest {
  @ApiProperty({ example: 'João Silva' })
  @IsString()
  name: string

  @ApiProperty({ example: 'joao@email.com' })
  @IsEmail()
  email: string

  @ApiProperty({ example: 'senha123', minLength: 6 })
  @IsString()
  @MinLength(6)
  password: string
}
