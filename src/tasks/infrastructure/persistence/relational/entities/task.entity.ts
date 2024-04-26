import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { GoalDetailEntity } from '../../../../../goal-details/infrastructure/persistence/relational/entities/goal-detail.entity';
import { Task } from '../../../../domain/task';

@Entity({
  name: 'task',
})
export class TaskEntity extends EntityRelationalHelper implements Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  title: string;

  @Column({ length: 255, nullable: true })
  description?: string;

  @Column({ default: 0 })
  status: number;

  @ManyToOne(() => GoalDetailEntity, {
    eager: true,
    nullable: false,
  })
  goalDetail: GoalDetailEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
