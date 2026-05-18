import { Module } from '@nestjs/common'
import { UseCasesModule } from 'src/data/use-cases/use-cases.module'
import { UserLoginController } from './login-user/controller'
import { UserRegisterController } from './register-user/controller'

@Module({
  imports: [UseCasesModule],
  controllers: [UserLoginController, UserRegisterController],
})
export class AuthControllersModule {}
