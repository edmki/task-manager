import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm'
import { UserSchema } from './user.schema'

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

  @ManyToOne(() => UserSchema, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user?: UserSchema

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
