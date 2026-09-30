import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TaskRepository } from 'domain/repositories/task-repository'
import { UserRepository } from 'domain/repositories/user-repository'
import { Env } from 'shared/env'
import { PostgresTaskRepository } from './repositories/postgres-task-repository'
import { PostgresUserRepository } from './repositories/postgres-user-repository'
import { TaskSchema } from './schemas/task.schema'
import { UserSchema } from './schemas/user.schema'

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
    TypeOrmModule.forFeature([TaskSchema, UserSchema]),
  ],
  providers: [
    { provide: TaskRepository, useClass: PostgresTaskRepository },
    { provide: UserRepository, useClass: PostgresUserRepository },
  ],
  exports: [TaskRepository, UserRepository],
})
export class DatabaseModule {}
