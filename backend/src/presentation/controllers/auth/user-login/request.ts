import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString } from 'class-validator'

class LoginRequest {
  @ApiProperty({ example: 'joao@email.com' })
  @IsEmail()
  email: string

  @ApiProperty({ example: 'senha123' })
  @IsString()
  password: string
}
