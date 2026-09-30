import { Body, Controller, Post } from '@nestjs/common'
import { ApiTags, ApiOperation } from '@nestjs/swagger'
import { RegisterRequest } from './request'
import { RegisterUser } from 'data/use-cases/auth/register-user'

@ApiTags('Auth')
@Controller('auth')
export class UserRegisterController {
  constructor(private readonly registerUser: RegisterUser) {}

  @Post('register')
  @ApiOperation({ summary: 'Registrar novo usuário' })
  handle(@Body() body: RegisterRequest) {
    return this.registerUser.execute(body)
  }
}
