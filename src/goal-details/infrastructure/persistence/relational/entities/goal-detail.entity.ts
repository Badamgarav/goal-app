import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { GoalDetail } from '../../../../domain/goal-detail';
import { GoalEntity } from '../../../../../goals/infrastructure/persistence/relational/entities/goal.entity';

@Entity({
  name: 'goal_detail',
})
export class GoalDetailEntity
  extends EntityRelationalHelper
  implements GoalDetail
{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  title: string;

  @Column({ length: 255, nullable: true })
  description?: string;

  @ManyToOne(() => GoalEntity, {
    eager: true,
    nullable: false,
  })
  goal: GoalEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
