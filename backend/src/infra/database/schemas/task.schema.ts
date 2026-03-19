import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity('tasks')
export class TaskSchema {
  @PrimaryColumn('uuid')
  id: string

  @Column()
  title: string

  @Column({ nullable: true })
  description?: string

  @Column({ default: false })
  completed: boolean

  @Column('uuid')
  userId: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
