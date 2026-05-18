import { Module } from '@nestjs/common'
import { LoginUser } from './auth/login-user'
import { RegisterUser } from './auth/register-user'
import { InfraModule } from 'src/infra/infra.module'

@Module({
  imports: [InfraModule],
  providers: [LoginUser, RegisterUser],
  exports: [LoginUser, RegisterUser],
})
export class UseCasesModule {}
