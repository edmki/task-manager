export interface TaskProps {
  id: string
  title: string
  description?: string
  completed: boolean
  userId: string
  createdAt: Date
  updatedAt: Date
}

export class Task {
  private readonly props: TaskProps

  constructor(props: TaskProps) {
    if (!props.title || props.title.trim().length === 0) {
      throw new Error('Task title cannot be empty')
    }
    this.props = props
  }

  get id() {
    return this.props.id
  }
  get title() {
    return this.props.title
  }
  get description() {
    return this.props.description
  }
  get completed() {
    return this.props.completed
  }
  get userId() {
    return this.props.userId
  }
  get createdAt() {
    return this.props.createdAt
  }
  get updatedAt() {
    return this.props.updatedAt
  }

  complete(): void {
    this.props.completed = true
    this.props.updatedAt = new Date()
  }

  updateTitle(title: string): void {
    if (!title || title.trim().length === 0) {
      throw new Error('Task title cannot be empty')
    }
    this.props.title = title
    this.props.updatedAt = new Date()
  }

  toObject(): TaskProps {
    return { ...this.props }
  }
}
