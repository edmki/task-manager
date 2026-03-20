import { Body, Controller, Post } from '@nestjs/common'
import { ApiTags, ApiOperation } from '@nestjs/swagger'
import { RegisterUser } from 'src/data/use-cases/auth/register-user'
import { RegisterRequest } from './request'

@ApiTags('auth')
@Controller('auth')
export class UserRegisterController {
  constructor(private readonly registerUser: RegisterUser) {}

  @Post('register')
  @ApiOperation({ summary: 'Registrar novo usuário' })
  register(@Body() body: RegisterRequest) {
    return this.registerUser.execute(body)
  }
}
