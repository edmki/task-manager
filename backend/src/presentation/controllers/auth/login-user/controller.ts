import { Body, Controller, Post } from '@nestjs/common'
import { ApiTags, ApiOperation } from '@nestjs/swagger'
import { LoginUser } from 'src/data/use-cases/auth/login-user'
import { LoginRequest } from './request'

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
