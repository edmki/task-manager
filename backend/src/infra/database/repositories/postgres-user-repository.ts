import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from '../../../domain/entities/user'
import { UserRepository } from '../../../domain/repositories/user-repository'
import { UserSchema } from '../schemas/user.schema'

export class PostgresUserRepository implements UserRepository {
  constructor(
    @InjectRepository(UserSchema)
    private readonly repository: Repository<UserSchema>,
  ) {}

  async save(user: User): Promise<User> {
    const schema = this.toSchema(user)
    const saved = await this.repository.save(schema)
    return this.toDomain(saved)
  }

  async findById(userId: string): Promise<User | null> {
    const schema = await this.repository.findOneBy({ id: userId })
    if (!schema) return null
    return this.toDomain(schema)
  }

  async findByEmail(email: string): Promise<User | null> {
    const schema = await this.repository.findOneBy({ email })
    if (!schema) return null
    return this.toDomain(schema)
  }

  private toDomain(schema: UserSchema): User {
    return new User({
      id: schema.id,
      name: schema.name,
      email: schema.email,
      passwordHash: schema.passwordHash,
      createdAt: schema.createdAt,
      updatedAt: schema.updatedAt,
    })
  }

  private toSchema(user: User): UserSchema {
    const schema = new UserSchema()
    schema.id = user.id
    schema.name = user.name
    schema.email = user.email
    schema.passwordHash = user.passwordHash
    schema.createdAt = user.createdAt
    schema.updatedAt = user.updatedAt
    return schema
  }
}
