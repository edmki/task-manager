import { Module } from '@nestjs/common'
import { DatabaseModule } from './infra/database/database.module'
import { AuthModule } from './presentation/modules/auth.module'

@Module({
  imports: [DatabaseModule, AuthModule],
})
export class AppModule {}
