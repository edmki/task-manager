import { DataSource } from 'typeorm'
import * as dotenv from 'dotenv'
import { Env } from 'src/shared/env'

dotenv.config()

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: Env.databaseUrl,
  entities: [__dirname + '/schemas/*.schema{.ts,.js}'],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  synchronize: false,
})
