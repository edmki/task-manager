export interface TimeBlockPresetProps {
  id: string
  userId: string
  title: string
  durationMinutes: number
  leadMinutes: number
  createdAt: Date
  updatedAt: Date
}

const MAX_TITLE_LENGTH = 120

function assertTitle(title: string): void {
  if (!title || title.trim().length === 0) {
    throw new Error('TimeBlockPreset title cannot be empty')
  }
  if (title.length > MAX_TITLE_LENGTH) {
    throw new Error(
      `TimeBlockPreset title cannot exceed ${MAX_TITLE_LENGTH} characters`,
    )
  }
}

function assertDuration(minutes: number): void {
  if (!Number.isInteger(minutes) || minutes <= 0) {
    throw new Error('TimeBlockPreset duration must be a positive integer')
  }
}

function assertLead(minutes: number): void {
  if (!Number.isInteger(minutes) || minutes < 0) {
    throw new Error(
      'TimeBlockPreset lead minutes must be a non-negative integer',
    )
  }
}

export class TimeBlockPreset {
  private readonly props: TimeBlockPresetProps

  constructor(props: TimeBlockPresetProps) {
    assertTitle(props.title)
    assertDuration(props.durationMinutes)
    assertLead(props.leadMinutes)
    this.props = {
      ...props,
      createdAt: new Date(props.createdAt),
      updatedAt: new Date(props.updatedAt),
    }
  }

  get id() {
    return this.props.id
  }
  get userId() {
    return this.props.userId
  }
  get title() {
    return this.props.title
  }
  get durationMinutes() {
    return this.props.durationMinutes
  }
  get leadMinutes() {
    return this.props.leadMinutes
  }
  get createdAt() {
    return new Date(this.props.createdAt)
  }
  get updatedAt() {
    return new Date(this.props.updatedAt)
  }

  updateTitle(title: string): void {
    assertTitle(title)
    this.props.title = title
    this.props.updatedAt = new Date()
  }

  updateDuration(minutes: number): void {
    assertDuration(minutes)
    this.props.durationMinutes = minutes
    this.props.updatedAt = new Date()
  }

  updateLeadMinutes(minutes: number): void {
    assertLead(minutes)
    this.props.leadMinutes = minutes
    this.props.updatedAt = new Date()
  }

  toObject(): TimeBlockPresetProps {
    return {
      ...this.props,
      createdAt: new Date(this.props.createdAt),
      updatedAt: new Date(this.props.updatedAt),
    }
  }
}
