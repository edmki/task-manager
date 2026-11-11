import {
  Check,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm'
import { TimeBlockPresetSchema } from './time-block-preset.schema'
import { TimeBlockProps } from 'domain/entities/time-block'

@Entity('time_blocks')
@Index('idx_time_blocks_user_start', ['userId', 'startTime'])
@Check('ck_time_blocks_range', '"endTime" > "startTime"')
@Check('ck_time_blocks_lead', '"leadMinutes" >= 0')
export class TimeBlockSchema implements TimeBlockProps {
  @PrimaryColumn('uuid')
  id: string

  @Column('uuid')
  userId: string

  @Column('uuid', { nullable: true })
  presetId: string | null

  @ManyToOne(() => TimeBlockPresetSchema, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'presetId' })
  preset?: TimeBlockPresetSchema | null

  @Column({ length: 120 })
  title: string

  @Column({ type: 'timestamptz' })
  startTime: Date

  @Column({ type: 'timestamptz' })
  endTime: Date

  @Column('int', { default: 0 })
  leadMinutes: number

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date

  @DeleteDateColumn({ type: 'timestamptz' })
  deletedAt: Date | null
}
