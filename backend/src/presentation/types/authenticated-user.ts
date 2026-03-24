import { Request } from 'express'

export class AuthenticatedUser {
  id: string
  email: string
}

export interface AuthenticatedRequest extends Request {
  user: AuthenticatedUser
}
