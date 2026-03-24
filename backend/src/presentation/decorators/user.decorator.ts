import { createParamDecorator } from '@nestjs/common'
import { AuthenticatedRequest } from '../types/authenticated-user'

export const User = createParamDecorator((_, ctx) => {
  const request = ctx.switchToHttp().getRequest<AuthenticatedRequest>()
  return request.user
})
