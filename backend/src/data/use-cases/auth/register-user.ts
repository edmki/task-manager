import { ConflictException, Injectable } from '@nestjs/common'
import { UserRepository } from '../../../domain/repositories/user-repository'
import { User } from '../../../domain/entities/user'
import { v4 as uuid } from 'uuid'
import * as bcrypt from 'bcrypt'

export interface RegisterUserInput {
  name: string
  email: string
  password: string
}

export interface RegisterUserOutput {
  id: string
  name: string
  email: string
}

@Injectable()
export class RegisterUser {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(input: RegisterUserInput): Promise<RegisterUserOutput> {
    const existing = await this.userRepository.findByEmail(input.email)
    if (existing) {
      throw new ConflictException('Email already in use')
    }

    const passwordHash = await bcrypt.hash(input.password, 10)

    const user = new User({
      id: uuid(),
      name: input.name,
      email: input.email,
      passwordHash,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    const saved = await this.userRepository.save(user)

    return {
      id: saved.id,
      name: saved.name,
      email: saved.email,
    }
  }
}
