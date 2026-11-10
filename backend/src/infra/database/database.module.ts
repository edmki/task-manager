import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TaskRepository } from 'domain/repositories/task-repository'
import { UserRepository } from 'domain/repositories/user-repository'
import { Env } from 'shared/env'
import { PostgresTaskRepository } from './repositories/postgres-task-repository'
import { PostgresTimeBlockPresetRepository } from './repositories/postgres-time-block-preset-repository'
import { PostgresUserRepository } from './repositories/postgres-user-repository'
import { TimeBlockPresetRepository } from 'domain/repositories/time-block-preset-repository'
import { TaskSchema } from './schemas/task.schema'
import { UserSchema } from './schemas/user.schema'
import { TimeBlockPresetSchema } from './schemas/time-block-preset.schema'

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        url: Env.databaseUrl,
        entities: [__dirname + '/schemas/*.schema{.ts,.js}'],
        migrations: [__dirname + '/migrations/*{.ts,.js}'],
        synchronize: false,
      }),
    }),
    TypeOrmModule.forFeature([TaskSchema, UserSchema, TimeBlockPresetSchema]),
  ],
  providers: [
    { provide: TaskRepository, useClass: PostgresTaskRepository },
    { provide: UserRepository, useClass: PostgresUserRepository },
    {
      provide: TimeBlockPresetRepository,
      useClass: PostgresTimeBlockPresetRepository,
    },
  ],
  exports: [TaskRepository, UserRepository, TimeBlockPresetRepository],
})
export class DatabaseModule {}
