import { Module } from '@nestjs/common'
import { InfraModule } from 'src/infra/infra.module'
import { LoginUser } from './login-user'
import { RegisterUser } from './register-user'

@Module({
  imports: [InfraModule],
  providers: [LoginUser, RegisterUser],
  exports: [LoginUser, RegisterUser],
})
export class AuthUseCasesModule {}
