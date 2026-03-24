import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { JwtStrategy } from '../../infra/auth/jwt.strategy'
import { RegisterUser } from '../../data/use-cases/auth/register-user'
import { LoginUser } from '../../data/use-cases/auth/login-user'
import { Env } from 'src/shared/env'
import { UserLoginController } from '../controllers/auth/login-user/controller'
import { UserRegisterController } from '../controllers/auth/register-user/controller'
import { DatabaseModule } from 'src/infra/database/database.module'

@Module({
  imports: [
    DatabaseModule,
    PassportModule,
    JwtModule.register({
      secret: Env.jwtSecret,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [UserLoginController, UserRegisterController],
  providers: [JwtStrategy, RegisterUser, LoginUser],
})
export class AuthModule {}
