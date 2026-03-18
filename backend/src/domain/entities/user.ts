export interface UserProps {
  id: string
  name: string
  email: string
  passwordHash: string
  createdAt: Date
  updatedAt: Date
}

export class User {
  private readonly props: UserProps

  constructor(props: UserProps) {
    if (!props.email?.includes('@')) {
      throw new Error('Invalid email')
    }
    this.props = props
  }

  get id() {
    return this.props.id
  }
  get name() {
    return this.props.name
  }
  get email() {
    return this.props.email
  }
  get passwordHash() {
    return this.props.passwordHash
  }
  get createdAt() {
    return this.props.createdAt
  }
  get updatedAt() {
    return this.props.updatedAt
  }

  toObject(): UserProps {
    return { ...this.props }
  }
}
