import { Body, Controller, Post } from '@nestjs/common'
import { ApiTags, ApiOperation } from '@nestjs/swagger'
import { LoginRequest } from './request'
import { LoginUser } from 'data/use-cases/auth/login-user'

@ApiTags('Auth')
@Controller('auth')
export class UserLoginController {
  constructor(private readonly loginUser: LoginUser) {}

  @Post('login')
  @ApiOperation({ summary: 'Autenticar usuário' })
  handle(@Body() body: LoginRequest) {
    return this.loginUser.execute(body)
  }
}
