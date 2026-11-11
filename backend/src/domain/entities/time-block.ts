import { TimeBlockPreset } from './time-block-preset'

export interface TimeBlockProps {
  id: string
  userId: string
  presetId: string | null
  title: string
  startTime: Date
  endTime: Date
  leadMinutes: number
  createdAt: Date
  updatedAt: Date
}

const MS_PER_MINUTE = 60_000
const MAX_TITLE_LENGTH = 120

function assertTitle(title: string): void {
  if (!title || title.trim().length === 0) {
    throw new Error('TimeBlock title cannot be empty')
  }
  if (title.length > MAX_TITLE_LENGTH) {
    throw new Error(
      `TimeBlock title cannot exceed ${MAX_TITLE_LENGTH} characters`,
    )
  }
}

function assertLead(minutes: number): void {
  if (!Number.isInteger(minutes) || minutes < 0) {
    throw new Error('TimeBlock lead minutes must be a non-negative integer')
  }
}

function assertValidDate(date: Date, name: string): void {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
    throw new Error(`TimeBlock ${name} must be a valid date`)
  }
}

function assertRange(startTime: Date, endTime: Date): void {
  assertValidDate(startTime, 'startTime')
  assertValidDate(endTime, 'endTime')
  if (endTime.getTime() <= startTime.getTime()) {
    throw new Error('TimeBlock endTime must be after startTime')
  }
}

export class TimeBlock {
  private readonly props: TimeBlockProps

  constructor(props: TimeBlockProps) {
    assertTitle(props.title)
    assertLead(props.leadMinutes)
    assertRange(props.startTime, props.endTime)
    this.props = {
      ...props,
      startTime: new Date(props.startTime),
      endTime: new Date(props.endTime),
      createdAt: new Date(props.createdAt),
      updatedAt: new Date(props.updatedAt),
    }
  }

  static fromPreset(
    preset: TimeBlockPreset,
    params: { id: string; startTime: Date },
  ): TimeBlock {
    assertValidDate(params.startTime, 'startTime')
    const now = new Date()
    return new TimeBlock({
      id: params.id,
      userId: preset.userId,
      presetId: preset.id,
      title: preset.title,
      startTime: params.startTime,
      endTime: new Date(
        params.startTime.getTime() + preset.durationMinutes * MS_PER_MINUTE,
      ),
      leadMinutes: preset.leadMinutes,
      createdAt: now,
      updatedAt: now,
    })
  }

  get id() {
    return this.props.id
  }
  get userId() {
    return this.props.userId
  }
  get presetId() {
    return this.props.presetId
  }
  get title() {
    return this.props.title
  }
  get startTime() {
    return new Date(this.props.startTime)
  }
  get endTime() {
    return new Date(this.props.endTime)
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

  get durationMinutes(): number {
    return (this.endTime.getTime() - this.startTime.getTime()) / MS_PER_MINUTE
  }

  get leadStartTime(): Date {
    return new Date(this.startTime.getTime() - this.leadMinutes * MS_PER_MINUTE)
  }

  updateTitle(title: string): void {
    assertTitle(title)
    this.props.title = title
    this.props.updatedAt = new Date()
  }

  updateLeadMinutes(minutes: number): void {
    assertLead(minutes)
    this.props.leadMinutes = minutes
    this.props.updatedAt = new Date()
  }

  reschedule(startTime: Date, endTime: Date): void {
    assertRange(startTime, endTime)
    this.props.startTime = new Date(startTime)
    this.props.endTime = new Date(endTime)
    this.props.updatedAt = new Date()
  }

  moveTo(startTime: Date): void {
    const durationMs = this.endTime.getTime() - this.startTime.getTime()
    this.reschedule(startTime, new Date(startTime.getTime() + durationMs))
  }

  toObject(): TimeBlockProps {
    return {
      ...this.props,
      startTime: new Date(this.props.startTime),
      endTime: new Date(this.props.endTime),
      createdAt: new Date(this.props.createdAt),
      updatedAt: new Date(this.props.updatedAt),
    }
  }
}
