import { Module } from '@nestjs/common';
import { GoalRepository } from '../goal.repository';
import { GoalsRelationalRepository } from './repositories/goal.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoalEntity } from './entities/goal.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GoalEntity])],
  providers: [
    {
      provide: GoalRepository,
      useClass: GoalsRelationalRepository,
    },
  ],
  exports: [GoalRepository],
})
export class RelationalGoalPersistenceModule {}
