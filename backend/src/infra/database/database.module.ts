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
import { TimeBlockSchema } from './schemas/time-block.schema'
import { TimeBlockRepository } from 'domain/repositories/time-block-repository'
import { PostgresTimeBlockRepository } from './repositories/postgres-time-block-repository'

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
    TypeOrmModule.forFeature([
      TaskSchema,
      UserSchema,
      TimeBlockPresetSchema,
      TimeBlockSchema,
    ]),
  ],
  providers: [
    { provide: TaskRepository, useClass: PostgresTaskRepository },
    { provide: UserRepository, useClass: PostgresUserRepository },
    {
      provide: TimeBlockPresetRepository,
      useClass: PostgresTimeBlockPresetRepository,
    },
    { provide: TimeBlockRepository, useClass: PostgresTimeBlockRepository },
  ],
  exports: [
    TaskRepository,
    UserRepository,
    TimeBlockPresetRepository,
    TimeBlockRepository,
  ],
})
export class DatabaseModule {}
