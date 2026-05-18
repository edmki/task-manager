import { Module } from '@nestjs/common'
import { AuthControllersModule } from './presentation/controllers/auth/auth-controllers.module'

@Module({
  imports: [AuthControllersModule],
})
export class AppModule {}
