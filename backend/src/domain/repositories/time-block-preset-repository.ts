import { TimeBlockPreset } from '../entities/time-block-preset'

export abstract class TimeBlockPresetRepository {
  abstract save(preset: TimeBlockPreset): Promise<TimeBlockPreset>
  abstract delete(presetId: string): Promise<void>
  abstract findById(presetId: string): Promise<TimeBlockPreset | null>
  abstract findAll(): Promise<TimeBlockPreset[]>
}
