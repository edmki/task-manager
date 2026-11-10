import { TimeBlockPreset } from 'domain/entities/time-block-preset'
import {
  Check,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity('time_block_presets')
@Index('uq_time_block_presets_user_title_active', ['userId', 'title'], {
  unique: true,
  where: '"deletedAt" IS NULL',
})
@Check('ck_time_block_presets_duration', '"durationMinutes" > 0')
@Check('ck_time_block_presets_lead', '"leadMinutes" >= 0')
export class TimeBlockPresetSchema implements TimeBlockPreset {
  @PrimaryColumn('uuid')
  id: string

  @Column('uuid')
  userId: string

  @Column({ length: 120 })
  title: string

  @Column('int')
  durationMinutes: number

  @Column('int', { default: 10 })
  leadMinutes: number

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date

  @DeleteDateColumn({ type: 'timestamptz' })
  deletedAt: Date | null
}
