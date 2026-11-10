export interface TimeBlock {
  id: string
  userId: string
  presetId: string | null
  title: string
  startTime: Date
  endTime: Date
  leadMinutes: number
  deletedAt: Date | null
  createdAt: Date
  updatedAt: Date
}
