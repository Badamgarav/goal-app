import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { UserEntity } from '../../../../../users/infrastructure/persistence/relational/entities/user.entity';
import { Goal } from '../../../../domain/goal';

@Entity({
  name: 'goal',
})
export class GoalEntity extends EntityRelationalHelper implements Goal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  title: string;

  @Column({ length: 255, nullable: true })
  description?: string;

  @Column({ type: Date, nullable: true })
  startDate: Date;

  @Index()
  @Column({ type: Date, nullable: true })
  endDate: Date | null;

  @ManyToOne(() => UserEntity, {
    eager: true,
    nullable: false,
  })
  user: UserEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
