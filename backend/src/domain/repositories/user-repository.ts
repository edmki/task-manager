import { User } from '../entities/user'

export interface UserRepository {
  save(user: User): Promise<User>
  findById(userId: string): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
}
