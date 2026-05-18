import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { Env } from 'src/shared/env'

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: Env.jwtSecret,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  exports: [PassportModule, JwtModule],
})
export class AuthModule {}
