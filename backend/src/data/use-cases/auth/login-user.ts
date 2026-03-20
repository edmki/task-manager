import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UserRepository } from '../../../domain/repositories/user-repository'
import * as bcrypt from 'bcrypt'

export interface LoginUserInput {
  email: string
  password: string
}

export interface LoginUserOutput {
  accessToken: string
}

@Injectable()
export class LoginUser {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(input: LoginUserInput): Promise<LoginUserOutput> {
    const user = await this.userRepository.findByEmail(input.email)
    if (!user) {
      throw new UnauthorizedException('Invalid credentials')
    }

    const passwordMatch = await bcrypt.compare(
      input.password,
      user.passwordHash,
    )
    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid credentials')
    }

    const accessToken = this.jwtService.sign({
      sub: user.id,
      email: user.email,
    })

    return { accessToken }
  }
}
