import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserSchema } from '../../infra/database/schemas/user.schema'
import { PostgresUserRepository } from '../../infra/database/repositories/postgres-user-repository'
import { UserRepository } from '../../domain/repositories/user-repository'
import { JwtStrategy } from '../../infra/auth/jwt.strategy'
import { RegisterUser } from '../../data/use-cases/auth/register-user'
import { LoginUser } from '../../data/use-cases/auth/login-user'
import { Env } from 'src/shared/env'
import { UserLoginController } from '../controllers/auth/user-login/controller'
import { UserRegisterController } from '../controllers/auth/user-register/controller'

@Module({
  imports: [
    TypeOrmModule.forFeature([UserSchema]),
    PassportModule,
    JwtModule.register({
      secret: Env.jwtSecret,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [UserLoginController, UserRegisterController],
  providers: [
    JwtStrategy,
    RegisterUser,
    LoginUser,
    {
      provide: UserRepository,
      useClass: PostgresUserRepository,
    },
  ],
})
export class AuthModule {}
