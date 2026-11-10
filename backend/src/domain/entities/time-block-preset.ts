export interface TimeBlockPreset {
  id: string
  userId: string
  title: string
  durationMinutes: number
  leadMinutes: number
  deletedAt: Date | null
  createdAt: Date
  updatedAt: Date
}
